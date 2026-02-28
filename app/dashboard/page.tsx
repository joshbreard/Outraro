import { createSupabaseServerClient } from "@/lib/supabase-server";
import ToolDiscovery from "@/components/tool-discovery";
import { toolCatalog, type Tool } from "@/lib/tool-catalog";

export const dynamic = "force-dynamic";

function getRecommendations(profile: any): Tool[] {
  if (!profile) return [];
  const recs: Tool[] = [];
  const toolsUsed = (profile.tools_used || "").toLowerCase();
  const channels = (profile.outreach_channels || "").toLowerCase();
  const challenge = (profile.biggest_challenge || "").toLowerCase();

  if (
    !toolsUsed.includes("apollo") &&
    !toolsUsed.includes("salesloft") &&
    !toolsUsed.includes("outreach") &&
    !toolsUsed.includes("lemlist")
  ) {
    const rec = toolCatalog.find((t) => t.slug === "apollo");
    if (rec) recs.push(rec);
  }

  if (
    channels.includes("email") &&
    !toolsUsed.includes("instantly") &&
    !toolsUsed.includes("smartlead")
  ) {
    const rec = toolCatalog.find((t) => t.slug === "instantly");
    if (rec) recs.push(rec);
  }

  if (
    channels.includes("linkedin") &&
    !toolsUsed.includes("taplio") &&
    !toolsUsed.includes("sales nav")
  ) {
    const rec = toolCatalog.find((t) => t.slug === "linkedin-sales-nav");
    if (rec) recs.push(rec);
  }

  if (
    channels.includes("call") &&
    !toolsUsed.includes("orum") &&
    !toolsUsed.includes("nooks")
  ) {
    const rec = toolCatalog.find((t) => t.slug === "nooks");
    if (rec) recs.push(rec);
  }

  if (
    challenge.includes("data") ||
    challenge.includes("contact") ||
    challenge.includes("lead")
  ) {
    const rec = toolCatalog.find((t) => t.slug === "clay");
    if (rec && !recs.find((r) => r.slug === rec.slug)) recs.push(rec);
  }

  if (challenge.includes("personal") || challenge.includes("relevance")) {
    const rec = toolCatalog.find((t) => t.slug === "lavender");
    if (rec && !recs.find((r) => r.slug === rec.slug)) recs.push(rec);
  }

  if (
    !toolsUsed.includes("hubspot") &&
    !toolsUsed.includes("salesforce") &&
    !toolsUsed.includes("pipedrive")
  ) {
    const rec = toolCatalog.find((t) => t.slug === "hubspot");
    if (rec && !recs.find((r) => r.slug === rec.slug)) recs.push(rec);
  }

  return recs.slice(0, 4);
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("sales_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
    profile = data;
  }

  const recommendations = getRecommendations(profile);
  const profileComplete = !!(
    profile &&
    profile.product_description &&
    profile.target_titles
  );

  return (
    <ToolDiscovery
      recommendations={recommendations}
      profileComplete={profileComplete}
    />
  );
}
