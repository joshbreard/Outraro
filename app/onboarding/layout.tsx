import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("subscription_status")
    .eq("id", user.id)
    .single();

  if (profile?.subscription_status !== "active") redirect("/#pricing");

  const { data: salesProfile } = await supabase
    .from("sales_profiles")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (salesProfile) redirect("/library");

  return <>{children}</>;
}
