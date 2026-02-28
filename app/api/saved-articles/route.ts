import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("articleId");

  if (articleId) {
    const { data } = await supabase
      .from("saved_articles")
      .select("id")
      .eq("user_id", user.id)
      .eq("article_id", articleId)
      .maybeSingle();
    return Response.json({ saved: !!data });
  }

  const { data } = await supabase
    .from("saved_articles")
    .select("*")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false });

  return Response.json({ articles: data ?? [] });
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { articleId, articleTitle, articleCategory, articleImageUrl, action } =
    await req.json();

  if (action === "save") {
    const { error } = await supabase.from("saved_articles").upsert(
      {
        user_id: user.id,
        article_id: articleId,
        article_title: articleTitle,
        article_category: articleCategory,
        article_image_url: articleImageUrl,
      },
      { onConflict: "user_id,article_id" }
    );
    if (error) return Response.json({ error: error.message }, { status: 500 });
  } else if (action === "unsave") {
    const { error } = await supabase
      .from("saved_articles")
      .delete()
      .eq("user_id", user.id)
      .eq("article_id", articleId);
    if (error) return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
