import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("sales_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return Response.json({ profile: data });
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const { error } = await supabase.from("sales_profiles").upsert(
    {
      user_id: user.id,
      product_description: body.product_description || null,
      industry: body.industry || null,
      target_titles: body.target_titles || null,
      company_size: body.company_size || null,
      outreach_channels: body.outreach_channels || null,
      experience_level: body.experience_level || null,
      biggest_challenge: body.biggest_challenge || null,
      tools_used: body.tools_used || null,
      crm_used: body.crm_used || null,
      team_size: body.team_size || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
