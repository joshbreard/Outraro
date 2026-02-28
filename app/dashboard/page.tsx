import { createSupabaseServerClient } from "@/lib/supabase-server";
import ToolDiscovery from "@/components/tool-discovery";
import { TOOL_CATALOG, type Tool } from "@/lib/tool-catalog";

export const dynamic = "force-dynamic";

function getRecommendations(profile: any): Tool[] {
  const recs: Tool[] = [];

  const channels = (profile?.outreach_channels || "").toLowerCase();
  const tools = (profile?.tools_used || "").toLowerCase();
  const challenge = (profile?.biggest_challenge || "").toLowerCase();
  const crm = (profile?.crm_used || "").toLowerCase();

  // If they do cold email but don't have an email infra tool
  if (
    channels.includes("email") &&
    !tools.includes("instantly") &&
    !tools.includes("smartlead")
  ) {
    const t = TOOL_CATALOG.find((t) => t.slug === "instantly");
    if (t) recs.push(t);
  }

  // If they do LinkedIn but don't mention Sales Nav
  if (
    channels.includes("linkedin") &&
    !tools.includes("sales nav") &&
    !tools.includes("navigator")
  ) {
    const t = TOOL_CATALOG.find((t) => t.slug === "linkedin-sales-navigator");
    if (t) recs.push(t);
  }

  // If challenge mentions data or leads
  if (
    challenge.includes("data") ||
    challenge.includes("lead") ||
    challenge.includes("prospect")
  ) {
    const t = TOOL_CATALOG.find((t) => t.slug === "clay");
    if (t && !recs.find((r) => r.slug === t.slug)) recs.push(t);
  }

  // If challenge mentions personalization or response rates
  if (
    challenge.includes("personal") ||
    challenge.includes("response") ||
    challenge.includes("reply")
  ) {
    const t = TOOL_CATALOG.find((t) => t.slug === "lavender");
    if (t && !recs.find((r) => r.slug === t.slug)) recs.push(t);
  }

  // If they do calling but don't have a dialer
  if (
    channels.includes("call") &&
    !tools.includes("orum") &&
    !tools.includes("nooks")
  ) {
    const t = TOOL_CATALOG.find((t) => t.slug === "nooks");
    if (t && !recs.find((r) => r.slug === t.slug)) recs.push(t);
  }

  // If no CRM mentioned, suggest HubSpot
  if (!crm && !tools.includes("hubspot") && !tools.includes("salesforce")) {
    const t = TOOL_CATALOG.find((t) => t.slug === "hubspot");
    if (t && !recs.find((r) => r.slug === t.slug)) recs.push(t);
  }

  // Default recommendations if profile is sparse
  if (recs.length === 0) {
    const defaults = ["apollo", "clay", "instantly", "lavender"];
    for (const slug of defaults) {
      const t = TOOL_CATALOG.find((t) => t.slug === slug);
      if (t) recs.push(t);
      if (recs.length >= 4) break;
    }
  }

  return recs.slice(0, 4);
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let recommendations: Tool[] = [];

  if (user) {
    const { data: profile } = await supabase
      .from("sales_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    recommendations = getRecommendations(profile);
  }

  return <ToolDiscovery recommendations={recommendations} />;
}
