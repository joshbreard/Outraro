import { getPublishedContent, getPageContent } from "@/lib/notion";
import {
  generateEmbedding,
  chunkText,
  stripHtml,
} from "@/lib/embeddings";
import { createSupabaseAdmin } from "@/lib/supabase-server";

export const maxDuration = 60;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.INGEST_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const articles = await getPublishedContent();
  let newChunks = 0;
  let skipped = 0;

  for (const article of articles) {
    // Skip if already embedded
    const { data: existing } = await supabase
      .from("article_embeddings")
      .select("id")
      .eq("article_id", article.id)
      .limit(1);

    if (existing && existing.length > 0) {
      skipped++;
      continue;
    }

    const html = await getPageContent(article.id);
    const plainText = stripHtml(html);

    if (!plainText || plainText.length < 50) continue;

    const fullText = `${article.title}\n\n${article.summary}\n\n${plainText}`;
    const chunks = chunkText(fullText);

    for (let i = 0; i < chunks.length; i++) {
      const embedding = await generateEmbedding(chunks[i]);

      const { error } = await supabase.from("article_embeddings").upsert(
        {
          article_id: article.id,
          article_title: article.title,
          article_category: article.category,
          chunk_index: i,
          content: chunks[i],
          embedding,
        },
        { onConflict: "article_id,chunk_index" }
      );

      if (error) {
        console.error(`Error embedding chunk ${i} of ${article.title}:`, error);
      } else {
        newChunks++;
      }
    }
  }

  return Response.json({
    success: true,
    totalArticles: articles.length,
    skippedExisting: skipped,
    newChunksEmbedded: newChunks,
  });
}
