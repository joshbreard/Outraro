import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("user_memory")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return Response.json({
    content: data?.content ?? "",
    updatedAt: data?.updated_at ?? null,
  });
}

// Full replace of memory content
export async function PUT(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { content } = await req.json();

  const { error } = await supabase.from("user_memory").upsert(
    {
      user_id: user.id,
      content: content ?? "",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}

// Append to memory (used by chat API after conversations)
export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { entry } = await req.json();
  if (!entry) return Response.json({ error: "No entry provided" }, { status: 400 });

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
  const newLine = `- [${timestamp}] ${entry}`;
  const updated = existing?.content
    ? `${existing.content}\n${newLine}`
    : newLine;

  const { error } = await supabase.from("user_memory").upsert(
    {
      user_id: user.id,
      content: updated,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
