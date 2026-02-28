"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { toolCatalog, TOOL_CATEGORIES, type Tool } from "@/lib/tool-catalog";

const categoryIcons: Record<string, string> = {
  "Email Infrastructure": "📧",
  Sequencing: "🔄",
  "Data Enrichment": "🔍",
  CRM: "💼",
  Dialers: "📞",
  "Social Selling": "🤝",
  "AI SDR": "🤖",
  Productivity: "⚡",
};

const categoryColors: Record<string, string> = {
  "Email Infrastructure": "bg-blue-50 text-blue-700 border-blue-200",
  Sequencing: "bg-purple-50 text-purple-700 border-purple-200",
  "Data Enrichment": "bg-emerald-50 text-emerald-700 border-emerald-200",
  CRM: "bg-amber-50 text-amber-700 border-amber-200",
  Dialers: "bg-red-50 text-red-700 border-red-200",
  "Social Selling": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "AI SDR": "bg-violet-50 text-violet-700 border-violet-200",
  Productivity: "bg-orange-50 text-orange-700 border-orange-200",
};

interface ToolDiscoveryProps {
  recommendations: Tool[];
  profileComplete: boolean;
}

export default function ToolDiscovery({
  recommendations,
  profileComplete,
}: ToolDiscoveryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let tools =
      activeCategory === "All"
        ? toolCatalog
        : toolCatalog.filter((t) => t.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.oneLiner.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    return tools;
  }, [activeCategory, search]);

  return (
    <div className="max-w-6xl">
      {recommendations.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">✨</span>
            <h2 className="text-lg font-bold text-surface-900">
              Recommended for You
            </h2>
          </div>
          <p className="text-surface-500 text-sm mb-4">
            Based on your profile, these tools could fill gaps in your stack.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((tool) => (
              <Link
                key={tool.slug}
                href={`/dashboard/tools/${tool.slug}`}
                className="no-underline"
              >
                <div className="bg-gradient-to-br from-brand-50 to-white border-2 border-brand-200 rounded-xl p-5 hover:shadow-md hover:border-brand-300 transition-all cursor-pointer h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span>{categoryIcons[tool.category] ?? "🔧"}</span>
                    <span className="text-xs font-medium text-brand-600">
                      {tool.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-surface-900 text-sm mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-surface-500 text-xs leading-relaxed">
                    {tool.oneLiner}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!profileComplete && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <span className="text-amber-500 text-lg">💡</span>
          <div>
            <p className="text-sm font-medium text-amber-800">
              Complete your profile for personalized recommendations
            </p>
            <p className="text-xs text-amber-600 mt-1">
              Go to{" "}
              <Link
                href="/dashboard/profile"
                className="underline font-medium"
              >
                Your Profile
              </Link>{" "}
              to tell Bolt about your role, tools, and challenges.
            </p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🧰</span>
          <h2 className="text-lg font-bold text-surface-900">Tool Catalog</h2>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tools..."
          className="w-full max-w-md bg-white border border-surface-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-surface-800 placeholder-surface-400 mb-4"
        />
        <div className="flex flex-wrap gap-2">
          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-surface-900 text-white border-surface-900"
                  : "bg-white text-surface-600 border-surface-200 hover:bg-surface-50"
              }`}
            >
              {cat !== "All" && (
                <span className="mr-1">{categoryIcons[cat]}</span>
              )}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-surface-200 rounded-2xl p-12 text-center">
          <p className="text-surface-500 text-sm">No tools match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => {
            const colorClass =
              categoryColors[tool.category] ??
              "bg-surface-50 text-surface-700 border-surface-200";
            return (
              <Link
                key={tool.slug}
                href={`/dashboard/tools/${tool.slug}`}
                className="no-underline"
              >
                <div className="bg-white border border-surface-200 rounded-xl p-5 hover:shadow-md hover:border-surface-300 transition-all cursor-pointer h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${colorClass}`}
                    >
                      {tool.category}
                    </span>
                    <span className="text-surface-400">
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="font-bold text-surface-900 text-sm mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-surface-500 text-xs leading-relaxed flex-1">
                    {tool.oneLiner}
                  </p>
                  <div className="mt-3 pt-3 border-t border-surface-100">
                    <span className="text-xs text-brand-600 font-medium">
                      Get personalized guide →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
