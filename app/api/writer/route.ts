import { generateText } from "ai";
import { openai } from "@/lib/openai";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const maxDuration = 30;

const channelInstructions: Record<string, string> = {
  email: `Generate 3 cold email variants. Each must include:
- A subject line (prefix with "Subject: "). Keep it 3-6 words, lowercase feels okay, curiosity > clickbait.
- Body: 60-90 words max. Shorter is better. Every sentence must earn its place.
- End with one soft CTA question.

VARIANT DIFFERENTIATION:
1. Lead with a specific observation about the prospect's company or role, then connect to a relevant pain point.
2. Lead with a trend or shift happening in their industry, then position the sender's product as relevant.
3. Lead with a provocative question or contrarian take that challenges a common assumption in their space.

Format: separate each with "--- Email 1 ---", "--- Email 2 ---", "--- Email 3 ---". Output ONLY the emails, no commentary.`,

  linkedin: `Generate 3 distinct LinkedIn message variants:

1. Connection request note (under 300 characters). One sharp reason to connect, no pitch. Reference something specific about them.
2. DM opener (30-50 words). Conversational, peer-to-peer. Start with an observation or question about their work, not about yourself.
3. Comment-to-DM transition. Write as if you've been engaging with their posts. Reference a theme they'd likely post about given their role, then pivot naturally to a conversation.

Each variant should feel like it was written by a real person who actually looked at their profile. No "I came across your profile" or "I'd love to connect."

Format: separate each with "--- LinkedIn 1 ---", "--- LinkedIn 2 ---", "--- LinkedIn 3 ---". Output ONLY the messages, no commentary.`,

  sms: `Generate 3 distinct SMS message variants for WARM follow-ups (post-call, post-meeting, post-connection). Each must be:
- 15-30 words maximum
- Ultra-casual and direct, like texting a colleague
- One punchy line + a soft CTA
- No links in the message body
- Emojis okay here (max 1 per message, only if natural)

VARIANT DIFFERENTIATION:
1. Reference something specific from a recent conversation.
2. Share a quick, relevant insight or stat that ties back to their situation.
3. Simple check-in that creates urgency without being pushy.

Format: separate each with "--- SMS 1 ---", "--- SMS 2 ---", "--- SMS 3 ---". Output ONLY the messages, no commentary.`,
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

  const systemPrompt = `You are a top-performing B2B SDR who consistently gets 40%+ open rates and 12%+ reply rates. You write outreach that sounds like a sharp, confident human, never like a template or a bot.

VOICE & STYLE:
- Write the way a smart 28-year-old talks over coffee. Natural, direct, zero fluff.
- Vary sentence length. Mix short punchy lines with one longer thought.
- Use contractions (you're, we've, isn't). Never sound formal or corporate.
- First line must earn the second line. No throwaways. No "I hope this finds you well." No "I wanted to reach out." No "My name is..."
- Never open with "I". Open with THEM: their company, their role, a trend in their space, or a specific observation.
- End with a question that's easy to answer, not a big ask. "Worth a look?" beats "Would you be available for a 30-minute call next Tuesday?"
- No buzzwords: "synergy," "leverage," "unlock," "empower," "revolutionize," "cutting-edge," "game-changing."
- No emojis unless writing SMS.

PERSONALIZATION:
- When prospect info is provided, weave it in naturally. Don't just namedrop their company, reference something specific about their situation.
- When the sender's product info is available, connect it to the prospect's likely pain, not as a pitch but as a relevant observation.
- Each variant should take a genuinely different angle, not just rephrase the same message three ways.${profileContext}${prospectInfo}

${channelInstructions[channel]}`;

  const result = await generateText({
    model: openai("gpt-4.1"),
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
