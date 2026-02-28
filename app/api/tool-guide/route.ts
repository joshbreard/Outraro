import { streamText } from "ai";
import { openai } from "@/lib/openai";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getToolBySlug } from "@/lib/tool-catalog";

export const maxDuration = 60;

function buildProfileContext(profile: any): string {
  const parts: string[] = [];
  if (profile.product_description) parts.push(`Product: ${profile.product_description}`);
  if (profile.industry) parts.push(`Industry: ${profile.industry}`);
  if (profile.target_titles) parts.push(`Target buyers: ${profile.target_titles}`);
  if (profile.company_size) parts.push(`Target company size: ${profile.company_size}`);
  if (profile.outreach_channels) parts.push(`Outreach channels: ${profile.outreach_channels}`);
  if (profile.experience_level) {
    const levels: Record<string, string> = {
      new: "Brand new SDR (0-3 months)",
      getting_started: "Getting started (3-12 months)",
      experienced: "Experienced SDR (1-3 years)",
      veteran: "Veteran SDR (3+ years)",
    };
    parts.push(`Experience: ${levels[profile.experience_level] || profile.experience_level}`);
  }
  if (profile.biggest_challenge) parts.push(`Biggest challenge: ${profile.biggest_challenge}`);
  if (profile.tools_used) parts.push(`Tools they use: ${profile.tools_used}`);
  if (profile.crm_used) parts.push(`CRM: ${profile.crm_used}`);
  if (profile.team_size) parts.push(`Team size: ${profile.team_size}`);
  return parts.join("\n");
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { toolSlug, refresh } = await req.json();
  const tool = getToolBySlug(toolSlug);
  if (!tool) return Response.json({ error: "Tool not found" }, { status: 404 });

  // Check cache (unless refresh requested)
  if (!refresh) {
    const { data: cached } = await supabase
      .from("tool_guides")
      .select("guide_content, updated_at")
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

  // Load profile + memory for personalization
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

  const profileContext = profile ? buildProfileContext(profile) : "No profile set up yet.";
  const memoryContext = memory?.content || "No memory context yet.";

  const systemPrompt = `You are Bolt, the AI sales coach inside Outraro. Generate a comprehensive, personalized guide for the tool "${tool.name}" (${tool.url}).

Tool description: ${tool.oneLiner}
Category: ${tool.category}

User's Sales Profile:
${profileContext}

User's Memory/Context:
${memoryContext}

Write a guide with the following sections in markdown:

## What ${tool.name} Does
A 2-3 sentence overview tailored to their role and experience level.

## Why It Matters for You
Explain specifically why this tool is relevant given their product, ICP, outreach channels, and challenges. Reference their specific situation.

## Getting Started
Step-by-step setup instructions. If they already use tools that integrate with this one (check their tools_used and CRM), mention those integrations specifically.

## Pro Tips for Your Use Case
3-5 actionable tips tailored to their industry, target buyers, and experience level. Be specific, not generic.

## How It Fits Your Stack
Explain how this tool works alongside the other tools they already use. Mention specific integrations and workflows.

Keep it concise but actionable. Use short paragraphs. Write like a senior sales ops person advising a colleague, not a marketing page.`;

  const result = await streamText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    messages: [{ role: "user", content: `Generate my personalized guide for ${tool.name}.` }],
  });

  // Collect the full text to cache it
  let fullText = "";
  const stream = result.toDataStream();
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  const chunks: Uint8Array[] = [];

  // We need to tee the stream: one for caching, one for the response
  // Instead, collect full text after streaming
  const transformStream = new TransformStream({
    transform(chunk, controller) {
      chunks.push(chunk);
      controller.enqueue(chunk);
    },
    async flush() {
      const fullResponse = chunks.map((c) => decoder.decode(c, { stream: true })).join("");
      // Extract just the text content from the data stream format
      const textParts = fullResponse
        .split("\n")
        .filter((line) => line.startsWith('0:"'))
        .map((line) => {
          try {
            return JSON.parse(line.slice(2));
          } catch {
            return "";
          }
        })
        .join("");

      if (textParts) {
        await supabase.from("tool_guides").upsert(
          {
            user_id: user.id,
            tool_slug: toolSlug,
            tool_name: tool.name,
            guide_content: textParts,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,tool_slug" }
        );
      }
    },
  });

  return new Response(stream.pipeThrough(transformStream), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Vercel-AI-Data-Stream": "v1",
    },
  });
}
