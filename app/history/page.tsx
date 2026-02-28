import { createSupabaseServerClient } from "@/lib/supabase-server";
import HistoryView from "@/components/history-view";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: savedArticles } = await supabase
    .from("saved_articles")
    .select("*")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false });

  const { data: conversations } = await supabase
    .from("ro_conversations")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  return (
    <HistoryView
      savedArticles={savedArticles ?? []}
      conversations={conversations ?? []}
    />
  );
}
