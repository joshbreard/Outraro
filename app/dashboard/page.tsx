import { getPublishedContent } from "@/lib/notion";
import { getCategoryRoute } from "@/lib/category-routes";
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

export default async function DashboardPage() {
  const content = await getPublishedContent();

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const thisWeek = content.filter((item) => new Date(item.publishedDate) >= oneWeekAgo);
  const older = content.filter((item) => new Date(item.publishedDate) < oneWeekAgo);

  return (
    <div className="max-w-5xl">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <h2 className="text-xl font-bold text-surface-900">New This Week</h2>
        </div>
        {thisWeek.length === 0 ? (
          <div className="bg-white border border-surface-200 rounded-2xl p-8 text-center">
            <p className="text-surface-500 text-sm">New content drops every week. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {thisWeek.map((item) => <ContentCard key={item.id} item={item} />)}
          </div>
        )}
      </div>

      {older.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-surface-900 mb-6">Library</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {older.map((item) => <ContentCard key={item.id} item={item} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function ContentCard({
  item,
}: {
  item: { id: string; title: string; category: string; summary: string; videoUrl: string | null; imageUrl: string | null; publishedDate: string };
}) {
  const colorClass = categoryColors[item.category] ?? categoryColors["General"];

  return (
    <Link href={getCategoryRoute(item.category, item.id)} className="block no-underline">
      <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
        {item.imageUrl && (
          <div className="relative w-full aspect-[16/9]">
            <Image src={item.imageUrl} alt={item.title} fill className="object-contain bg-surface-900" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        )}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${colorClass}`}>{item.category}</span>
            <span className="text-xs text-surface-400">
              {new Date(item.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <h3 className="font-bold text-surface-900 mb-2 text-base leading-snug">{item.title}</h3>
          {item.summary && <p className="text-surface-500 text-xs leading-relaxed line-clamp-2">{item.summary}</p>}
        </div>
      </div>
    </Link>
  );
}
