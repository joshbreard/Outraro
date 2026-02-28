import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const { generationId, channel, variantIndex, content } = await req.json();

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await supabase.from("writer_copies").insert({
    user_id: user.id,
    generation_id: generationId || null,
    channel,
    variant_index: variantIndex,
    content,
  });

  return Response.json({ ok: true });
}
