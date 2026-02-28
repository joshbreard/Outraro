import { generateText } from "ai";
import { openai } from "@/lib/openai";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const maxDuration = 30;

const channelInstructions: Record<string, string> = {
  email: `Generate 3 distinct cold email variants. Each must include:
- A compelling subject line (prefix with "Subject: ")
- Body text of 80-120 words
- A clear, low-friction CTA

Use proven frameworks across the 3 variants:
1. Pain-Agitate-Solve (PAS)
2. Before-After-Bridge (BAB)
3. AIDA (Attention-Interest-Desire-Action)

Format each variant with a blank line between them, prefixed with "--- Email 1 ---", "--- Email 2 ---", "--- Email 3 ---".`,

  linkedin: `Generate 3 distinct LinkedIn message variants. Include a mix of:
1. Connection request note (under 300 characters)
2. InMail or DM opener (30-50 words, conversational peer-to-peer tone)
3. Comment-to-DM transition (references engaging with their content first, then pivots)

Keep the tone casual and human. No corporate jargon. Write like a real person, not a bot.

Format each variant with a blank line between them, prefixed with "--- LinkedIn 1 ---", "--- LinkedIn 2 ---", "--- LinkedIn 3 ---".`,

  sms: `Generate 3 distinct SMS message variants. Each must be:
- 15-30 words maximum
- Ultra-casual and direct
- One punchy line + a soft CTA
- No links in the message body

These are for WARM follow-ups (post-call, post-meeting, post-connection), not cold outreach.

Format each variant with a blank line between them, prefixed with "--- SMS 1 ---", "--- SMS 2 ---", "--- SMS 3 ---".`,
};

export async function POST(req: Request) {
  const { channel, prospectName, prospectCompany, prospectRole, prospectContext } = await req.json();

  if (!channel || !channelInstructions[channel]) {
    return Response.json({ error: "Invalid channel" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch sales profile for personalization
  let profileContext = "";
  const { data: profile } = await supabase
    .from("sales_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profile) {
    const parts: string[] = [];
    if (profile.product_description) parts.push(`Product/Service: ${profile.product_description}`);
    if (profile.industry) parts.push(`Industry: ${profile.industry}`);
    if (profile.target_titles) parts.push(`Typical target buyers: ${profile.target_titles}`);
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
    profileContext = `\n\nSender's Sales Profile (use this to write FROM their perspective, selling THEIR product):\n${parts.join("\n")}`;
  }

  let prospectInfo = "";
  if (prospectName || prospectCompany || prospectRole || prospectContext) {
    const prospectParts: string[] = [];
    if (prospectName) prospectParts.push(`Name: ${prospectName}`);
    if (prospectCompany) prospectParts.push(`Company: ${prospectCompany}`);
    if (prospectRole) prospectParts.push(`Role/Title: ${prospectRole}`);
    if (prospectContext) prospectParts.push(`Additional context: ${prospectContext}`);
    prospectInfo = `\n\nProspect Info:\n${prospectParts.join("\n")}`;
  }

  const systemPrompt = `You are an expert B2B sales copywriter. Your job is to write outreach messages that get replies.

Rules:
- Be specific, not generic. Reference the prospect's company and role when provided.
- Never use filler phrases like "I hope this finds you well" or "I wanted to reach out."
- Never use emojis unless writing SMS.
- Sound human. Vary sentence lengths. Use contractions.
- Tie everything back to the sender's product and the prospect's likely pain points.
- Do not include any commentary, explanations, or tips. Output ONLY the message variants.${profileContext}${prospectInfo}

${channelInstructions[channel]}`;

  const result = await generateText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    prompt: `Write ${channel} outreach messages for ${prospectName || "this prospect"}${prospectCompany ? ` at ${prospectCompany}` : ""}${prospectRole ? ` (${prospectRole})` : ""}.${prospectContext ? ` Context: ${prospectContext}` : ""}`,
  });

  // Log the generation
  const { data: generation } = await supabase
    .from("writer_generations")
    .insert({
      user_id: user.id,
      channel,
      prospect_name: prospectName || null,
      prospect_company: prospectCompany || null,
      prospect_role: prospectRole || null,
      prospect_context: prospectContext || null,
      variant_count: 3,
    })
    .select("id")
    .single();

  return Response.json({
    content: result.text,
    generationId: generation?.id || null,
  });
}
