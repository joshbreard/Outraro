import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export interface ContentItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  videoUrl: string | null;
  publishedDate: string;
}

export async function getPublishedContent(): Promise<ContentItem[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Status",
      select: { equals: "Published" },
    },
    sorts: [{ property: "Date Published", direction: "descending" }],
  });

  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties["Title"]?.title?.[0]?.plain_text ?? "Untitled",
    category: page.properties["Category"]?.select?.name ?? "General",
    summary: page.properties["Summary"]?.rich_text?.[0]?.plain_text ?? "",
    videoUrl: page.properties["Video URL"]?.url ?? null,
    publishedDate: page.properties["Date Published"]?.date?.start ?? "",
  }));
}
