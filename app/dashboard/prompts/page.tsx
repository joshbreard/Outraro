import { getPublishedContent } from "@/lib/notion";

export const revalidate = 3600;

const categoryColors: Record<string, string> = {
  "Tool Breakdown": "bg-blue-50 text-blue-700 border-blue-200",
  "Prompt Library": "bg-purple-50 text-purple-700 border-purple-200",
  "Workflow": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "News Brief": "bg-amber-50 text-amber-700 border-amber-200",
  General: "bg-surface-100 text-surface-600 border-surface-200",
};

export default async function PromptsPage() {
  const allContent = await getPublishedContent();
  const content = allContent.filter((item) => item.category === "Prompt Library");

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-surface-900 mb-2">Prompt Library</h2>
        <p className="text-surface-500 text-sm">Copy-paste prompt templates built for SDRs and AEs.</p>
      </div>

      {content.length === 0 ? (
        <div className="bg-white border border-surface-200 rounded-2xl p-8 text-center">
          <p className="text-surface-500 text-sm">No content yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {content.map((item) => (
            <div key={item.id} className="bg-white border border-surface-200 rounded-2xl p-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[item.category] ?? categoryColors["General"]}`}>{item.category}</span>
                <span className="text-xs text-surface-400">
                  {new Date(item.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <h3 className="text-lg font-bold text-surface-900 mb-2">{item.title}</h3>
              {item.summary && <p className="text-surface-500 text-sm leading-relaxed">{item.summary}</p>}
              {item.videoUrl && (
                <a href={item.videoUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 text-sm font-medium mt-3 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch walkthrough
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
