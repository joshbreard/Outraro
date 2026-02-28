import { redirect } from "next/navigation";

export default async function OldContentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/library/${id}`);
}
