import ContentDetail from "@/components/content-detail";

export const revalidate = 3600;

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <ContentDetail
      id={id}
      backHref="/library"
      backLabel="Back to Library"
    />
  );
}
