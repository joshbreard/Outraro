export interface Tool {
  slug: string;
  name: string;
  category: string;
  oneLiner: string;
  url: string;
}

export const TOOL_CATEGORIES = [
  "All",
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

export const toolCatalog: Tool[] = [
  { slug: "instantly", name: "Instantly.ai", category: "Email Infrastructure", oneLiner: "Scale cold email with unlimited sender accounts and built-in warmup.", url: "https://instantly.ai" },
  { slug: "smartlead", name: "Smartlead", category: "Email Infrastructure", oneLiner: "Multi-channel cold outreach with unlimited mailboxes and auto-rotation.", url: "https://smartlead.ai" },
  { slug: "mailforge", name: "Mailforge", category: "Email Infrastructure", oneLiner: "Bulk create and manage cold email sending domains at scale.", url: "https://mailforge.ai" },
  { slug: "emailguard", name: "EmailGuard", category: "Email Infrastructure", oneLiner: "Monitor deliverability and inbox placement across providers.", url: "https://emailguard.io" },
  { slug: "apollo", name: "Apollo.io", category: "Sequencing", oneLiner: "All-in-one prospecting, sequencing, and data enrichment for outbound.", url: "https://apollo.io" },
  { slug: "salesloft", name: "SalesLoft", category: "Sequencing", oneLiner: "Enterprise sales engagement with multi-step cadences and analytics.", url: "https://salesloft.com" },
  { slug: "outreach", name: "Outreach.io", category: "Sequencing", oneLiner: "Revenue execution platform for multi-channel sales sequences.", url: "https://outreach.io" },
  { slug: "lemlist", name: "Lemlist", category: "Sequencing", oneLiner: "Personalized cold outreach with image and video prospecting.", url: "https://lemlist.com" },
  { slug: "reply", name: "Reply.io", category: "Sequencing", oneLiner: "AI-powered multichannel sequences with LinkedIn automation.", url: "https://reply.io" },
  { slug: "zoominfo", name: "ZoomInfo", category: "Data Enrichment", oneLiner: "Enterprise B2B contact and company intelligence database.", url: "https://zoominfo.com" },
  { slug: "lusha", name: "Lusha", category: "Data Enrichment", oneLiner: "Direct phone numbers and emails from LinkedIn profiles.", url: "https://lusha.com" },
  { slug: "clay", name: "Clay", category: "Data Enrichment", oneLiner: "Waterfall enrichment across 75+ data providers with AI workflows.", url: "https://clay.com" },
  { slug: "cognism", name: "Cognism", category: "Data Enrichment", oneLiner: "GDPR-compliant B2B contact data with verified mobile numbers.", url: "https://cognism.com" },
  { slug: "rocketreach", name: "RocketReach", category: "Data Enrichment", oneLiner: "Find emails and direct dials for any professional.", url: "https://rocketreach.co" },
  { slug: "clearbit", name: "Clearbit", category: "Data Enrichment", oneLiner: "Real-time company and contact enrichment integrated with your CRM.", url: "https://clearbit.com" },
  { slug: "hubspot", name: "HubSpot CRM", category: "CRM", oneLiner: "Free CRM with sales pipeline, contact management, and reporting.", url: "https://hubspot.com" },
  { slug: "salesforce", name: "Salesforce", category: "CRM", oneLiner: "Enterprise CRM with deep customization and ecosystem integrations.", url: "https://salesforce.com" },
  { slug: "pipedrive", name: "Pipedrive", category: "CRM", oneLiner: "Visual deal pipeline CRM built for small sales teams.", url: "https://pipedrive.com" },
  { slug: "attio", name: "Attio", category: "CRM", oneLiner: "Next-gen CRM with flexible data models and real-time collaboration.", url: "https://attio.com" },
  { slug: "orum", name: "Orum", category: "Dialers", oneLiner: "AI-powered parallel dialer that connects you to live prospects.", url: "https://orum.com" },
  { slug: "nooks", name: "Nooks", category: "Dialers", oneLiner: "AI dialer and virtual sales floor for high-volume cold calling.", url: "https://nooks.ai" },
  { slug: "aircall", name: "Aircall", category: "Dialers", oneLiner: "Cloud phone system with CRM integrations and call analytics.", url: "https://aircall.io" },
  { slug: "dialpad", name: "Dialpad", category: "Dialers", oneLiner: "AI-powered business phone with real-time call transcription.", url: "https://dialpad.com" },
  { slug: "linkedin-sales-nav", name: "LinkedIn Sales Navigator", category: "Social Selling", oneLiner: "Advanced LinkedIn search and lead tracking for B2B prospecting.", url: "https://business.linkedin.com/sales-solutions" },
  { slug: "taplio", name: "Taplio", category: "Social Selling", oneLiner: "AI-powered LinkedIn content creation and engagement tool.", url: "https://taplio.com" },
  { slug: "shield", name: "Shield Analytics", category: "Social Selling", oneLiner: "LinkedIn analytics dashboard for tracking content performance.", url: "https://shieldapp.ai" },
  { slug: "dripify", name: "Dripify", category: "Social Selling", oneLiner: "LinkedIn automation with drip campaigns and team management.", url: "https://dripify.io" },
  { slug: "11x", name: "11x.ai", category: "AI SDR", oneLiner: "AI digital workers that autonomously prospect and book meetings.", url: "https://11x.ai" },
  { slug: "artisan", name: "Artisan", category: "AI SDR", oneLiner: "AI BDR named Ava that writes and sends outbound autonomously.", url: "https://artisan.co" },
  { slug: "regie", name: "Regie.ai", category: "AI SDR", oneLiner: "Generative AI for sales content, sequences, and prospecting.", url: "https://regie.ai" },
  { slug: "jasper", name: "Jasper", category: "AI SDR", oneLiner: "Enterprise AI content platform for marketing and sales copy.", url: "https://jasper.ai" },
  { slug: "lavender", name: "Lavender", category: "AI SDR", oneLiner: "AI email coach that scores and improves your cold emails in real time.", url: "https://lavender.ai" },
  { slug: "notion", name: "Notion", category: "Productivity", oneLiner: "All-in-one workspace for notes, docs, wikis, and project management.", url: "https://notion.so" },
  { slug: "loom", name: "Loom", category: "Productivity", oneLiner: "Async video messaging for personalized prospect outreach.", url: "https://loom.com" },
  { slug: "calendly", name: "Calendly", category: "Productivity", oneLiner: "Scheduling automation that eliminates the back-and-forth.", url: "https://calendly.com" },
  { slug: "gong", name: "Gong", category: "Productivity", oneLiner: "Revenue intelligence from call recordings and deal analytics.", url: "https://gong.io" },
  { slug: "vidyard", name: "Vidyard", category: "Productivity", oneLiner: "Video prospecting platform for personalized sales outreach.", url: "https://vidyard.com" },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return toolCatalog.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  if (category === "All") return toolCatalog;
  return toolCatalog.filter((t) => t.category === category);
}
