import { embed } from "ai";
import { openai } from "@/lib/openai";
import { createSupabaseAdmin } from "@/lib/supabase-server";

export async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: text,
  });
  return embedding;
}

export function chunkText(text: string, maxChars = 1500): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + " " + sentence).length > maxChars && current.length > 0) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current += (current ? " " : "") + sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export async function searchSimilarChunks(
  queryEmbedding: number[],
  limit = 5,
  articleId?: string
) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase.rpc("match_article_chunks", {
    query_embedding: queryEmbedding,
    match_threshold: 0.5,
    match_count: limit,
    filter_article_id: articleId ?? null,
  });

  if (error) throw error;
  return data ?? [];
}
