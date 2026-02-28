import { streamText } from "ai";
import { openai } from "@/lib/openai";
import { generateEmbedding, searchSimilarChunks } from "@/lib/embeddings";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, articleId, articleTitle } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  const queryEmbedding = await generateEmbedding(lastMessage);

  // If on an article page, get chunks from that article + global
  const articleChunks = articleId
    ? await searchSimilarChunks(queryEmbedding, 3, articleId)
    : [];
  const globalChunks = await searchSimilarChunks(
    queryEmbedding,
    articleId ? 3 : 6
  );

  // Deduplicate
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
    ? `You are Ro, the AI sales coach built into Outraro. The user is currently reading "${articleTitle}". Answer their questions using the article context below. Prioritize information from the current article, but you can reference other Outraro articles when relevant. Be concise, actionable, and specific. Use short paragraphs. If the context doesn't contain the answer, say so honestly. When you reference information, mention which article it comes from.\n\nContext:\n${context}`
    : `You are Ro, the AI sales coach built into Outraro. Answer questions using ONLY the article context below. Be concise, actionable, and specific. Use short paragraphs. Cite which article your answer comes from. If the context doesn't contain the answer, say so honestly.\n\nContext:\n${context}`;

  const result = streamText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
