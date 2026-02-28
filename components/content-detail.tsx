import { getPublishedContent, getPageContent } from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";
import BoltChat from "@/components/bolt-chat";
import SaveArticleButton from "@/components/save-article-button";

const categoryColors: Record<string, string> = {
  "Tool Breakdown": "bg-blue-50 text-blue-700 border-blue-200",
  "Prompt Library": "bg-purple-50 text-purple-700 border-purple-200",
  Workflow: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "News Brief": "bg-amber-50 text-amber-700 border-amber-200",
  General: "bg-surface-100 text-surface-600 border-surface-200",
};

export default async function ContentDetail({
  id,
  backHref,
  backLabel,
}: {
  id: string;
  backHref: string;
  backLabel: string;
}) {
  const allContent = await getPublishedContent();
  const item = allContent.find((c) => c.id === id);

  if (!item) {
    return (
      <div className="max-w-3xl text-center py-20">
        <h1 className="text-2xl font-bold text-surface-900 mb-4">
          Content not found
        </h1>
        <Link href="/library" className="text-brand-600 hover:underline">
          Back to Library
        </Link>
      </div>
    );
  }

  const bodyHtml = await getPageContent(id);
  const colorClass = categoryColors[item.category] ?? categoryColors["General"];

  return (
    <>
      <div className="max-w-3xl">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-surface-500 hover:text-surface-700 text-sm mb-6 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {backLabel}
        </Link>

        {item.imageUrl && (
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-8">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${colorClass}`}
          >
            {item.category}
          </span>
          <span className="text-xs text-surface-400">
            {new Date(item.publishedDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-3xl font-bold text-surface-900">
            {item.title}
          </h1>
          <SaveArticleButton
            articleId={id}
            articleTitle={item.title}
            articleCategory={item.category}
            articleImageUrl={item.imageUrl}
          />
        </div>

        {item.summary && (
          <p className="text-lg text-surface-500 leading-relaxed mb-8">
            {item.summary}
          </p>
        )}

        <div
          className="border-t border-surface-200 pt-8"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </div>

      <BoltChat articleId={id} articleTitle={item.title} />
    </>
  );
}
