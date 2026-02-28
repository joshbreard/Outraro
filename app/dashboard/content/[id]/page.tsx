import ContentDetail from "@/components/content-detail";
import { getPublishedContent } from "@/lib/notion";
import { categoryRouteMap, categoryLabelMap } from "@/lib/category-routes";

export const revalidate = 3600;

export default async function ContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const allContent = await getPublishedContent();
  const item = allContent.find((c) => c.id === id);
  const backHref = item
    ? (categoryRouteMap[item.category] ?? "/dashboard")
    : "/dashboard";
  const backLabel = item
    ? `Back to ${categoryLabelMap[item.category] ?? "Dashboard"}`
    : "Back";
  return <ContentDetail id={id} backHref={backHref} backLabel={backLabel} />;
}
