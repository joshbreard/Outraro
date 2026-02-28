import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("ro_conversations")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  return Response.json({ conversations: data ?? [] });
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { conversationId, articleId, articleTitle, messages } =
    await req.json();

  const { error } = await supabase.from("ro_conversations").upsert(
    {
      id: conversationId,
      user_id: user.id,
      article_id: articleId ?? null,
      article_title: articleTitle ?? null,
      messages,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
