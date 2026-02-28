import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export interface ContentItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  videoUrl: string | null;
  imageUrl: string | null;
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
    category: page.properties["Catagory"]?.select?.name ?? page.properties["Category"]?.select?.name ?? "General",
    summary: page.properties["Summary"]?.rich_text?.[0]?.plain_text ?? "",
    videoUrl: page.properties["Video URL"]?.url ?? null,
    imageUrl: page.properties["Image URL"]?.url ?? null,
    publishedDate: page.properties["Date Published"]?.date?.start ?? "",
  }));
}

export async function getPageContent(pageId: string): Promise<string> {
  const blocks = await notion.blocks.children.list({ block_id: pageId });
  const parts: string[] = [];

  for (const block of blocks.results as any[]) {
    switch (block.type) {
      case "paragraph":
        parts.push(richTextToHtml(block.paragraph.rich_text));
        break;
      case "heading_1":
        parts.push(`<h1 class="text-3xl font-bold text-surface-900 mt-8 mb-4">${richTextToHtml(block.heading_1.rich_text)}</h1>`);
        break;
      case "heading_2":
        parts.push(`<h2 class="text-2xl font-bold text-surface-900 mt-8 mb-3">${richTextToHtml(block.heading_2.rich_text)}</h2>`);
        break;
      case "heading_3":
        parts.push(`<h3 class="text-xl font-semibold text-surface-900 mt-6 mb-2">${richTextToHtml(block.heading_3.rich_text)}</h3>`);
        break;
      case "bulleted_list_item":
        parts.push(`<li class="text-surface-700 ml-4 list-disc">${richTextToHtml(block.bulleted_list_item.rich_text)}</li>`);
        break;
      case "numbered_list_item":
        parts.push(`<li class="text-surface-700 ml-4 list-decimal">${richTextToHtml(block.numbered_list_item.rich_text)}</li>`);
        break;
      case "image": {
        const url = block.image.type === "external" ? block.image.external.url : block.image.file.url;
        parts.push(`<img src="${url}" alt="" class="rounded-xl my-6 w-full" />`);
        break;
      }
      case "divider":
        parts.push(`<hr class="my-6 border-surface-200" />`);
        break;
      case "quote":
        parts.push(`<blockquote class="border-l-4 border-brand-500 pl-4 italic text-surface-600 my-4">${richTextToHtml(block.quote.rich_text)}</blockquote>`);
        break;
      default:
        break;
    }
  }

  return parts.join("\n");
}

function richTextToHtml(richText: any[]): string {
  if (!richText || richText.length === 0) return "";
  return `<p class="text-surface-700 leading-relaxed mb-4">${richText
    .map((t: any) => {
      let text = t.plain_text;
      if (t.annotations.bold) text = `<strong>${text}</strong>`;
      if (t.annotations.italic) text = `<em>${text}</em>`;
      if (t.annotations.code) text = `<code class="bg-surface-100 px-1.5 py-0.5 rounded text-sm">${text}</code>`;
      if (t.href) text = `<a href="${t.href}" class="text-brand-600 hover:underline" target="_blank">${text}</a>`;
      return text;
    })
    .join("")}</p>`;
}
