import { generateText } from "ai";
import { openai } from "@/lib/openai";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getToolBySlug } from "@/lib/tool-catalog";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { toolSlug, refresh } = await req.json();
  const tool = getToolBySlug(toolSlug);
  if (!tool) return Response.json({ error: "Tool not found" }, { status: 404 });

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  if (!refresh) {
    const { data: cached } = await supabase
      .from("tool_guides")
      .select("guide_content")
      .eq("user_id", user.id)
      .eq("tool_slug", toolSlug)
      .maybeSingle();

    if (cached) {
      return Response.json({ guide: cached.guide_content, cached: true });
    }
  }

  const { data: profile } = await supabase
    .from("sales_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: memory } = await supabase
    .from("user_memory")
    .select("content")
    .eq("user_id", user.id)
    .maybeSingle();

  const profileParts: string[] = [];
  if (profile) {
    if (profile.product_description)
      profileParts.push(`Product: ${profile.product_description}`);
    if (profile.industry) profileParts.push(`Industry: ${profile.industry}`);
    if (profile.target_titles)
      profileParts.push(`Target buyers: ${profile.target_titles}`);
    if (profile.company_size)
      profileParts.push(`Target company size: ${profile.company_size}`);
    if (profile.outreach_channels)
      profileParts.push(`Outreach channels: ${profile.outreach_channels}`);
    if (profile.experience_level) {
      const levels: Record<string, string> = {
        new: "Brand new SDR (0-3 months)",
        getting_started: "Getting started (3-12 months)",
        experienced: "Experienced SDR (1-3 years)",
        veteran: "Veteran SDR (3+ years)",
      };
      profileParts.push(
        `Experience: ${
          levels[profile.experience_level] || profile.experience_level
        }`
      );
    }
    if (profile.biggest_challenge)
      profileParts.push(`Biggest challenge: ${profile.biggest_challenge}`);
    if (profile.tools_used)
      profileParts.push(`Current tools: ${profile.tools_used}`);
    if (profile.crm_used) profileParts.push(`CRM: ${profile.crm_used}`);
  }

  const systemPrompt = `You are Bolt, the AI sales coach inside Outraro. Generate a personalized guide for the SDR tool "${tool.name}" (${tool.url}).

Tool: ${tool.name}
Category: ${tool.category}
Description: ${tool.oneLiner}
${profileParts.length > 0 ? `\nUser Profile:\n${profileParts.join("\n")}` : "\nNo profile data available. Write a general guide."}
${memory?.content ? `\nUser Memory (accumulated context from past interactions):\n${memory.content}` : ""}

Write a comprehensive, personalized guide in HTML format. Use clean semantic HTML with h2, h3, p, ul, li, strong tags.

Structure the guide with these sections:
1. <h2>What ${tool.name} Does</h2> - brief overview tailored to their situation
2. <h2>Why It Matters for You</h2> - reference their specific product, ICP, channels, and challenges
3. <h2>How to Get Started</h2> - step-by-step setup specific to their workflow
4. <h2>Pro Tips</h2> - 3-4 actionable tips based on their experience level
5. <h2>How It Fits Your Stack</h2> - reference their existing tools and how ${tool.name} integrates

Keep it concise and actionable. Use <strong> for emphasis. Use <ul> and <li> for lists. No fluff. Every sentence should be useful. If profile is sparse, write a strong general guide.`;

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: systemPrompt,
  });

  await supabase.from("tool_guides").upsert(
    {
      user_id: user.id,
      tool_slug: toolSlug,
      tool_name: tool.name,
      guide_content: text,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,tool_slug" }
  );

  return Response.json({ guide: text, cached: false });
}
