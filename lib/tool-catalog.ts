export interface Tool {
  slug: string;
  name: string;
  category: string;
  oneLiner: string;
  url: string;
}

export const TOOL_CATEGORIES = [
  "Email Infrastructure",
  "Sequencing",
  "Data Enrichment",
  "CRM",
  "Dialers",
  "Social Selling",
  "AI SDR",
  "Productivity",
] as const;

export type ToolCategory = (typeof TOOL_CATEGORIES)[number];

export const CATEGORY_META: Record<ToolCategory, { icon: string; color: string }> = {
  "Email Infrastructure": { icon: "📧", color: "bg-blue-50 text-blue-700 border-blue-200" },
  Sequencing: { icon: "🔄", color: "bg-purple-50 text-purple-700 border-purple-200" },
  "Data Enrichment": { icon: "🔍", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  CRM: { icon: "💼", color: "bg-amber-50 text-amber-700 border-amber-200" },
  Dialers: { icon: "📞", color: "bg-red-50 text-red-700 border-red-200" },
  "Social Selling": { icon: "🤝", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  "AI SDR": { icon: "🤖", color: "bg-pink-50 text-pink-700 border-pink-200" },
  Productivity: { icon: "⚡", color: "bg-orange-50 text-orange-700 border-orange-200" },
};

export const TOOLS: Tool[] = [
  // Email Infrastructure
  { slug: "instantly", name: "Instantly.ai", category: "Email Infrastructure", oneLiner: "Scale cold email with unlimited sender accounts and automated warmup.", url: "https://instantly.ai" },
  { slug: "smartlead", name: "Smartlead", category: "Email Infrastructure", oneLiner: "Cold email at scale with auto-rotating inboxes and unified master inbox.", url: "https://smartlead.ai" },
  { slug: "mailforge", name: "Mailforge", category: "Email Infrastructure", oneLiner: "Spin up dozens of sending domains and mailboxes in minutes.", url: "https://mailforge.ai" },
  { slug: "emailguard", name: "EmailGuard", category: "Email Infrastructure", oneLiner: "Monitor deliverability and keep your emails out of spam.", url: "https://emailguard.io" },
  { slug: "maildoso", name: "Maildoso", category: "Email Infrastructure", oneLiner: "Bulk email infrastructure setup with instant DNS configuration.", url: "https://maildoso.com" },

  // Sequencing
  { slug: "outreach", name: "Outreach", category: "Sequencing", oneLiner: "Enterprise sales engagement platform for multi-channel sequences.", url: "https://outreach.io" },
  { slug: "salesloft", name: "SalesLoft", category: "Sequencing", oneLiner: "Revenue orchestration with cadences, calls, and pipeline management.", url: "https://salesloft.com" },
  { slug: "apollo", name: "Apollo.io", category: "Sequencing", oneLiner: "All-in-one prospecting, sequencing, and enrichment for outbound.", url: "https://apollo.io" },
  { slug: "lemlist", name: "Lemlist", category: "Sequencing", oneLiner: "Personalized cold outreach with image and video placeholders.", url: "https://lemlist.com" },
  { slug: "reply", name: "Reply.io", category: "Sequencing", oneLiner: "Multichannel outreach automation with AI-powered email writing.", url: "https://reply.io" },

  // Data Enrichment
  { slug: "clay", name: "Clay", category: "Data Enrichment", oneLiner: "Waterfall enrichment across 75+ data providers in a spreadsheet UI.", url: "https://clay.com" },
  { slug: "zoominfo", name: "ZoomInfo", category: "Data Enrichment", oneLiner: "B2B contact and company intelligence at enterprise scale.", url: "https://zoominfo.com" },
  { slug: "lusha", name: "Lusha", category: "Data Enrichment", oneLiner: "Quick phone and email lookups with a simple Chrome extension.", url: "https://lusha.com" },
  { slug: "cognism", name: "Cognism", category: "Data Enrichment", oneLiner: "GDPR-compliant B2B data with phone-verified mobile numbers.", url: "https://cognism.com" },
  { slug: "prospeo", name: "Prospeo", category: "Data Enrichment", oneLiner: "Email finder and verifier built for high-volume outbound.", url: "https://prospeo.io" },
  { slug: "ocean", name: "Ocean.io", category: "Data Enrichment", oneLiner: "AI lookalike search to find companies that match your best customers.", url: "https://ocean.io" },
  { slug: "phantombuster", name: "PhantomBuster", category: "Data Enrichment", oneLiner: "Scrape leads from LinkedIn, Google Maps, and other sources automatically.", url: "https://phantombuster.com" },

  // CRM
  { slug: "salesforce", name: "Salesforce", category: "CRM", oneLiner: "The enterprise CRM standard for pipeline and account management.", url: "https://salesforce.com" },
  { slug: "hubspot", name: "HubSpot CRM", category: "CRM", oneLiner: "Free-to-start CRM with built-in marketing and sales tools.", url: "https://hubspot.com" },
  { slug: "pipedrive", name: "Pipedrive", category: "CRM", oneLiner: "Visual pipeline CRM designed for small sales teams.", url: "https://pipedrive.com" },
  { slug: "close", name: "Close CRM", category: "CRM", oneLiner: "CRM with built-in calling, email, and SMS for inside sales teams.", url: "https://close.com" },
  { slug: "attio", name: "Attio", category: "CRM", oneLiner: "Modern relationship-first CRM that syncs with your email and calendar.", url: "https://attio.com" },

  // Dialers
  { slug: "orum", name: "Orum", category: "Dialers", oneLiner: "AI-powered parallel dialer that connects you to live prospects.", url: "https://orum.com" },
  { slug: "nooks", name: "Nooks", category: "Dialers", oneLiner: "Virtual sales floor with AI dialer and real-time coaching.", url: "https://nooks.ai" },
  { slug: "aircall", name: "Aircall", category: "Dialers", oneLiner: "Cloud phone system with CRM integrations for sales teams.", url: "https://aircall.io" },
  { slug: "dialpad", name: "Dialpad", category: "Dialers", oneLiner: "AI-powered calling with real-time transcription and coaching.", url: "https://dialpad.com" },

  // Social Selling
  { slug: "linkedin-sales-navigator", name: "LinkedIn Sales Navigator", category: "Social Selling", oneLiner: "Advanced LinkedIn search and lead tracking for social selling.", url: "https://business.linkedin.com/sales-solutions" },
  { slug: "taplio", name: "Taplio", category: "Social Selling", oneLiner: "LinkedIn personal branding with AI post generation and scheduling.", url: "https://taplio.com" },
  { slug: "shield", name: "Shield Analytics", category: "Social Selling", oneLiner: "LinkedIn analytics dashboard to track content performance.", url: "https://shieldapp.ai" },
  { slug: "heyreach", name: "HeyReach", category: "Social Selling", oneLiner: "LinkedIn outreach automation with team inbox and campaign management.", url: "https://heyreach.io" },
  { slug: "dripify", name: "Dripify", category: "Social Selling", oneLiner: "LinkedIn automation with drip campaigns and smart inbox.", url: "https://dripify.io" },

  // AI SDR
  { slug: "11x", name: "11x.ai", category: "AI SDR", oneLiner: "AI digital worker that autonomously prospects and books meetings.", url: "https://11x.ai" },
  { slug: "aisdr", name: "AiSDR", category: "AI SDR", oneLiner: "AI that writes and sends personalized outbound on autopilot.", url: "https://aisdr.com" },
  { slug: "regie", name: "Regie.ai", category: "AI SDR", oneLiner: "AI content and sequence generation for sales development teams.", url: "https://regie.ai" },
  { slug: "artisan", name: "Artisan", category: "AI SDR", oneLiner: "AI BDR named Ava that handles outbound from research to send.", url: "https://artisan.co" },
  { slug: "jasper", name: "Jasper", category: "AI SDR", oneLiner: "AI copywriting for sales emails, scripts, and marketing content.", url: "https://jasper.ai" },

  // Productivity
  { slug: "gong", name: "Gong", category: "Productivity", oneLiner: "Conversation intelligence that records, transcribes, and coaches calls.", url: "https://gong.io" },
  { slug: "chorus", name: "Chorus (ZoomInfo)", category: "Productivity", oneLiner: "Call recording and AI analysis for sales team coaching.", url: "https://chorus.ai" },
  { slug: "lavender", name: "Lavender", category: "Productivity", oneLiner: "AI email coach that scores and improves your cold emails in real-time.", url: "https://lavender.ai" },
  { slug: "calendly", name: "Calendly", category: "Productivity", oneLiner: "Scheduling automation that eliminates the back-and-forth.", url: "https://calendly.com" },
  { slug: "loom", name: "Loom", category: "Productivity", oneLiner: "Quick video recordings for personalized prospecting and follow-ups.", url: "https://loom.com" },
  { slug: "notion", name: "Notion", category: "Productivity", oneLiner: "All-in-one workspace for playbooks, templates, and team knowledge.", url: "https://notion.so" },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}
