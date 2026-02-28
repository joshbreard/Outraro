import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("user_memory")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return Response.json({
    memory: data?.content ?? "",
    updatedAt: data?.updated_at ?? null,
  });
}

export async function PUT(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { content } = await req.json();

  const { error } = await supabase.from("user_memory").upsert(
    {
      user_id: user.id,
      content: content || "",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { entry } = await req.json();
  if (!entry?.trim())
    return Response.json({ error: "Empty entry" }, { status: 400 });

  const { data: existing } = await supabase
    .from("user_memory")
    .select("content")
    .eq("user_id", user.id)
    .maybeSingle();

  const timestamp = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const newContent = existing?.content
    ? `${existing.content}\n\n[${timestamp}] ${entry.trim()}`
    : `[${timestamp}] ${entry.trim()}`;

  const { error } = await supabase.from("user_memory").upsert(
    {
      user_id: user.id,
      content: newContent,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
