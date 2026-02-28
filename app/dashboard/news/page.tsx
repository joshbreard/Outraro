import { getPublishedContent } from "@/lib/notion";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600;

const categoryColors: Record<string, string> = {
  "Tool Breakdown": "bg-blue-50 text-blue-700 border-blue-200",
  "Prompt Library": "bg-purple-50 text-purple-700 border-purple-200",
  Workflow: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "News Brief": "bg-amber-50 text-amber-700 border-amber-200",
  General: "bg-surface-100 text-surface-600 border-surface-200",
};

export default async function NewsPage() {
  const allContent = await getPublishedContent();
  const content = allContent.filter((item) => item.category === "News Brief");

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-surface-900 mb-2">News Brief</h2>
        <p className="text-surface-500 text-sm">What changed this week in AI for sales.</p>
      </div>

      {content.length === 0 ? (
        <div className="bg-white border border-surface-200 rounded-2xl p-8 text-center">
          <p className="text-surface-500 text-sm">No content yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {content.map((item) => (
            <Link key={item.id} href={`/dashboard/news/${item.id}`} className="block no-underline">
              <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden hover:shadow-md transition-all cursor-pointer">
                {item.imageUrl && (
                  <div className="relative w-full aspect-[2/1]">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="100vw" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[item.category] ?? categoryColors["General"]}`}>{item.category}</span>
                    <span className="text-xs text-surface-400">
                      {new Date(item.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-surface-900 mb-2">{item.title}</h3>
                  {item.summary && <p className="text-surface-500 text-sm leading-relaxed">{item.summary}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
