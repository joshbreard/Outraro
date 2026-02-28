import { createSupabaseServerClient } from "@/lib/supabase-server";
import { openai } from "@/lib/openai";
import { generateText } from "ai";
import { getToolBySlug } from "@/lib/tool-catalog";

export const maxDuration = 60;

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { toolSlug, refresh } = await req.json();
  const tool = getToolBySlug(toolSlug);
  if (!tool) return Response.json({ error: "Tool not found" }, { status: 404 });

  // Check cache first (unless refresh requested)
  if (!refresh) {
    const { data: cached } = await supabase
      .from("tool_guides")
      .select("*")
      .eq("user_id", user.id)
      .eq("tool_slug", toolSlug)
      .maybeSingle();

    if (cached) {
      return Response.json({
        guide: cached.guide_content,
        cached: true,
        updatedAt: cached.updated_at,
      });
    }
  }

  // Load user profile
  const { data: profile } = await supabase
    .from("sales_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  // Load user memory
  const { data: memory } = await supabase
    .from("user_memory")
    .select("content")
    .eq("user_id", user.id)
    .maybeSingle();

  const profileParts: string[] = [];
  if (profile) {
    if (profile.product_description) profileParts.push(`Product: ${profile.product_description}`);
    if (profile.industry) profileParts.push(`Industry: ${profile.industry}`);
    if (profile.target_titles) profileParts.push(`Target buyers: ${profile.target_titles}`);
    if (profile.company_size) profileParts.push(`Target company size: ${profile.company_size}`);
    if (profile.outreach_channels) profileParts.push(`Outreach channels: ${profile.outreach_channels}`);
    if (profile.experience_level) {
      const levels: Record<string, string> = {
        new: "Brand new SDR (0-3 months)",
        getting_started: "Getting started (3-12 months)",
        experienced: "Experienced SDR (1-3 years)",
        veteran: "Veteran SDR (3+ years)",
      };
      profileParts.push(`Experience: ${levels[profile.experience_level] || profile.experience_level}`);
    }
    if (profile.biggest_challenge) profileParts.push(`Biggest challenge: ${profile.biggest_challenge}`);
    if (profile.tools_used) profileParts.push(`Current tools: ${profile.tools_used}`);
    if (profile.crm_used) profileParts.push(`CRM: ${profile.crm_used}`);
  }

  const profileContext = profileParts.length > 0
    ? `\n\nUser Profile:\n${profileParts.join("\n")}`
    : "";

  const memoryContext = memory?.content
    ? `\n\nUser Memory (accumulated context from past interactions):\n${memory.content}`
    : "";

  const prompt = `You are Bolt, the AI sales coach inside Outraro. Generate a personalized guide for the tool "${tool.name}" (${tool.url}).

Tool description: ${tool.oneLiner}
Category: ${tool.category}${profileContext}${memoryContext}

Write a comprehensive but scannable guide in markdown format. Include:

1. **What it does** - 2-3 sentence overview tailored to their role/industry
2. **Why it matters for you** - Specific to their product, ICP, and challenges. If no profile, give general SDR advice.
3. **Getting started** - 3-5 actionable first steps they should take
4. **Pro tips** - 3-4 power-user tactics most SDRs miss
5. **How it fits your stack** - How this integrates with tools they already use (reference their current tools if known)
6. **Watch out for** - 2-3 common mistakes or gotchas

Be specific, opinionated, and actionable. Use short paragraphs. Reference their specific product, buyers, and challenges when available. Do not use generic filler. If you lack context, be honest and give your best general SDR advice.`;

  const result = await generateText({
    model: openai("gpt-4o"),
    prompt,
  });

  const guide = result.text;

  // Cache the generated guide
  const { error } = await supabase.from("tool_guides").upsert(
    {
      user_id: user.id,
      tool_slug: toolSlug,
      tool_name: tool.name,
      guide_content: guide,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,tool_slug" }
  );

  if (error) console.error("Failed to cache guide:", error);

  return Response.json({
    guide,
    cached: false,
    updatedAt: new Date().toISOString(),
  });
}
