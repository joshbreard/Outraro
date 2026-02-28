import { getPublishedContent } from "@/lib/notion";
import ContentLibrary from "@/components/content-library";

export const revalidate = 3600;

export default async function LibraryPage() {
  const articles = await getPublishedContent();
  return <ContentLibrary articles={articles} />;
}
