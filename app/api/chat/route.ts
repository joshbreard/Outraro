import { streamText } from "ai";
import { openai } from "@/lib/openai";
import { generateEmbedding, searchSimilarChunks } from "@/lib/embeddings";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, articleId, articleTitle } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  // Fetch user's sales profile for personalization
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profileContext = "";
  if (user) {
    const { data: profile } = await supabase
      .from("sales_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profile) {
      const parts: string[] = [];
      if (profile.product_description)
        parts.push(`Product: ${profile.product_description}`);
      if (profile.industry) parts.push(`Industry: ${profile.industry}`);
      if (profile.target_titles)
        parts.push(`Target buyers: ${profile.target_titles}`);
      if (profile.company_size)
        parts.push(`Target company size: ${profile.company_size}`);
      if (profile.outreach_channels)
        parts.push(`Outreach channels: ${profile.outreach_channels}`);
      if (profile.experience_level) {
        const levels: Record<string, string> = {
          new: "Brand new SDR (0-3 months)",
          getting_started: "Getting started (3-12 months)",
          experienced: "Experienced SDR (1-3 years)",
          veteran: "Veteran SDR (3+ years)",
        };
        parts.push(
          `Experience: ${
            levels[profile.experience_level] || profile.experience_level
          }`
        );
      }
      if (profile.biggest_challenge)
        parts.push(`Biggest challenge: ${profile.biggest_challenge}`);
      if (profile.tools_used)
        parts.push(`Tools they use: ${profile.tools_used}`);

      profileContext = `\n\nUser Profile (personalize your advice using this context - reference their product, ICP, and challenges specifically):\n${parts.join(
        "\n"
      )}`;
    }
  }

  const queryEmbedding = await generateEmbedding(lastMessage);

  const articleChunks = articleId
    ? await searchSimilarChunks(queryEmbedding, 3, articleId)
    : [];
  const globalChunks = await searchSimilarChunks(
    queryEmbedding,
    articleId ? 3 : 6
  );

  const seenKeys = new Set(
    articleChunks.map(
      (c: any) => `${c.article_id}::${c.content.slice(0, 80)}`
    )
  );
  const allChunks = [
    ...articleChunks,
    ...globalChunks.filter(
      (c: any) => !seenKeys.has(`${c.article_id}::${c.content.slice(0, 80)}`)
    ),
  ].slice(0, 6);

  const context = allChunks
    .map((c: any) => `[${c.article_title}]: ${c.content}`)
    .join("\n\n");

  const systemPrompt = articleId
    ? `You are Bolt, the AI sales coach built into Outraro. The user is currently reading "${articleTitle}". Answer their questions using the article context below. Prioritize information from the current article, but you can reference other Outraro articles when relevant. Be concise, actionable, and specific to the user's situation. Use short paragraphs. If the context doesn't contain the answer, say so honestly. When you reference information, mention which article it comes from. Always tie advice back to the user's specific product, buyers, and challenges when their profile is available.${profileContext}\n\nContext:\n${context}`
    : `You are Bolt, the AI sales coach built into Outraro. Answer questions using ONLY the article context below. Be concise, actionable, and specific to the user's situation. Use short paragraphs. Cite which article your answer comes from. If the context doesn't contain the answer, say so honestly. Always tie advice back to the user's specific product, buyers, and challenges when their profile is available.${profileContext}\n\nContext:\n${context}`;

  const result = streamText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
