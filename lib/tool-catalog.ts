export interface Tool {
  slug: string;
  name: string;
  category: string;
  oneLiner: string;
  url: string;
  icon?: string;
}

export const TOOL_CATEGORIES = [
  "Email Infrastructure",
  "Sequencing & Outreach",
  "Data & Enrichment",
  "CRM",
  "Dialers & Calling",
  "Social Selling",
  "AI SDR",
  "Productivity",
] as const;

export type ToolCategory = (typeof TOOL_CATEGORIES)[number];

export const CATEGORY_COLORS: Record<string, string> = {
  "Email Infrastructure": "bg-sky-50 text-sky-700 border-sky-200",
  "Sequencing & Outreach": "bg-violet-50 text-violet-700 border-violet-200",
  "Data & Enrichment": "bg-emerald-50 text-emerald-700 border-emerald-200",
  CRM: "bg-orange-50 text-orange-700 border-orange-200",
  "Dialers & Calling": "bg-rose-50 text-rose-700 border-rose-200",
  "Social Selling": "bg-blue-50 text-blue-700 border-blue-200",
  "AI SDR": "bg-purple-50 text-purple-700 border-purple-200",
  Productivity: "bg-amber-50 text-amber-700 border-amber-200",
};

export const TOOL_CATALOG: Tool[] = [
  // Email Infrastructure
  { slug: "instantly", name: "Instantly.ai", category: "Email Infrastructure", oneLiner: "Unlimited email sending accounts with built-in warmup and deliverability tools.", url: "https://instantly.ai" },
  { slug: "smartlead", name: "Smartlead", category: "Email Infrastructure", oneLiner: "Cold email infrastructure with unlimited mailboxes and auto-rotation.", url: "https://smartlead.ai" },
  { slug: "mailforge", name: "Mailforge", category: "Email Infrastructure", oneLiner: "Bulk domain and mailbox provisioning for cold outreach at scale.", url: "https://mailforge.ai" },
  { slug: "google-postmaster", name: "Google Postmaster Tools", category: "Email Infrastructure", oneLiner: "Free deliverability monitoring for Gmail-bound email traffic.", url: "https://postmaster.google.com" },
  { slug: "mail-tester", name: "Mail-tester", category: "Email Infrastructure", oneLiner: "Instant spam score checker for your outbound emails.", url: "https://mail-tester.com" },

  // Sequencing & Outreach
  { slug: "apollo", name: "Apollo.io", category: "Sequencing & Outreach", oneLiner: "All-in-one prospecting, sequencing, and analytics platform.", url: "https://apollo.io" },
  { slug: "salesloft", name: "Salesloft", category: "Sequencing & Outreach", oneLiner: "Enterprise sales engagement platform with multi-channel cadences.", url: "https://salesloft.com" },
  { slug: "outreach", name: "Outreach.io", category: "Sequencing & Outreach", oneLiner: "Sales execution platform for managing sequences, calls, and meetings.", url: "https://outreach.io" },
  { slug: "lemlist", name: "Lemlist", category: "Sequencing & Outreach", oneLiner: "Personalized cold outreach with image and video personalization built in.", url: "https://lemlist.com" },
  { slug: "reply-io", name: "Reply.io", category: "Sequencing & Outreach", oneLiner: "Multichannel outreach automation with AI-powered email writing.", url: "https://reply.io" },

  // Data & Enrichment
  { slug: "zoominfo", name: "ZoomInfo", category: "Data & Enrichment", oneLiner: "Enterprise B2B contact and company intelligence database.", url: "https://zoominfo.com" },
  { slug: "cognism", name: "Cognism", category: "Data & Enrichment", oneLiner: "GDPR-compliant B2B data with phone-verified mobile numbers.", url: "https://cognism.com" },
  { slug: "lusha", name: "Lusha", category: "Data & Enrichment", oneLiner: "Quick contact enrichment with direct dials and verified emails.", url: "https://lusha.com" },
  { slug: "clay", name: "Clay", category: "Data & Enrichment", oneLiner: "Waterfall enrichment engine that chains 75+ data providers together.", url: "https://clay.com" },
  { slug: "clearbit", name: "Clearbit", category: "Data & Enrichment", oneLiner: "Real-time company and contact enrichment APIs for your CRM.", url: "https://clearbit.com" },
  { slug: "phantom-buster", name: "PhantomBuster", category: "Data & Enrichment", oneLiner: "No-code scraping and automation for LinkedIn, Google Maps, and more.", url: "https://phantombuster.com" },

  // CRM
  { slug: "hubspot", name: "HubSpot CRM", category: "CRM", oneLiner: "Free CRM with built-in email tracking, pipeline management, and reporting.", url: "https://hubspot.com" },
  { slug: "salesforce", name: "Salesforce", category: "CRM", oneLiner: "The enterprise CRM standard with endless customization and app ecosystem.", url: "https://salesforce.com" },
  { slug: "pipedrive", name: "Pipedrive", category: "CRM", oneLiner: "Visual, deal-focused CRM built for small sales teams.", url: "https://pipedrive.com" },
  { slug: "close", name: "Close CRM", category: "CRM", oneLiner: "CRM with built-in calling, SMS, and email for inside sales teams.", url: "https://close.com" },
  { slug: "attio", name: "Attio", category: "CRM", oneLiner: "Modern, flexible CRM that syncs and enriches your relationship data.", url: "https://attio.com" },

  // Dialers & Calling
  { slug: "orum", name: "Orum", category: "Dialers & Calling", oneLiner: "AI-powered parallel dialer that connects you to live prospects faster.", url: "https://orum.com" },
  { slug: "nooks", name: "Nooks", category: "Dialers & Calling", oneLiner: "AI dialer with a virtual sales floor for team-based cold calling.", url: "https://nooks.ai" },
  { slug: "aircall", name: "Aircall", category: "Dialers & Calling", oneLiner: "Cloud phone system with CRM integrations and call analytics.", url: "https://aircall.io" },
  { slug: "dialpad", name: "Dialpad", category: "Dialers & Calling", oneLiner: "AI-powered business phone with real-time transcription and coaching.", url: "https://dialpad.com" },
  { slug: "gong", name: "Gong", category: "Dialers & Calling", oneLiner: "Revenue intelligence that records and analyzes every sales conversation.", url: "https://gong.io" },

  // Social Selling
  { slug: "linkedin-sales-navigator", name: "LinkedIn Sales Navigator", category: "Social Selling", oneLiner: "Advanced LinkedIn search and lead tracking for targeted social selling.", url: "https://linkedin.com/sales" },
  { slug: "taplio", name: "Taplio", category: "Social Selling", oneLiner: "LinkedIn personal branding tool with AI content generation and scheduling.", url: "https://taplio.com" },
  { slug: "shield", name: "Shield Analytics", category: "Social Selling", oneLiner: "LinkedIn analytics dashboard tracking reach, engagement, and follower growth.", url: "https://shieldapp.ai" },
  { slug: "dripify", name: "Dripify", category: "Social Selling", oneLiner: "LinkedIn automation for connection requests, messages, and profile views.", url: "https://dripify.io" },

  // AI SDR
  { slug: "11x-ai", name: "11x.ai", category: "AI SDR", oneLiner: "Autonomous AI SDR that researches, writes, and sends personalized outreach.", url: "https://11x.ai" },
  { slug: "artisan", name: "Artisan", category: "AI SDR", oneLiner: "AI sales agent (Ava) that automates prospecting and outbound from end to end.", url: "https://artisan.co" },
  { slug: "regie-ai", name: "Regie.ai", category: "AI SDR", oneLiner: "Generative AI for sales that auto-drafts sequences and personalizes at scale.", url: "https://regie.ai" },
  { slug: "lavender", name: "Lavender", category: "AI SDR", oneLiner: "AI email coach that scores and rewrites your cold emails in real time.", url: "https://lavender.ai" },
  { slug: "jasper", name: "Jasper", category: "AI SDR", oneLiner: "AI content platform for generating marketing and sales copy fast.", url: "https://jasper.ai" },

  // Productivity
  { slug: "notion", name: "Notion", category: "Productivity", oneLiner: "All-in-one workspace for notes, wikis, tasks, and sales playbooks.", url: "https://notion.so" },
  { slug: "loom", name: "Loom", category: "Productivity", oneLiner: "Async video messaging for prospecting, demos, and internal updates.", url: "https://loom.com" },
  { slug: "calendly", name: "Calendly", category: "Productivity", oneLiner: "Automated scheduling that eliminates back-and-forth meeting booking.", url: "https://calendly.com" },
  { slug: "zapier", name: "Zapier", category: "Productivity", oneLiner: "No-code automation connecting your sales stack apps together.", url: "https://zapier.com" },
  { slug: "superhuman", name: "Superhuman", category: "Productivity", oneLiner: "Blazing-fast email client with AI triage, snippets, and read tracking.", url: "https://superhuman.com" },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOL_CATALOG.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return TOOL_CATALOG.filter((t) => t.category === category);
}
