"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TOOL_CATALOG, TOOL_CATEGORIES, CATEGORY_COLORS, type Tool } from "@/lib/tool-catalog";

export default function ToolDiscovery({
  recommendations,
}: {
  recommendations?: Tool[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let tools = TOOL_CATALOG;
    if (activeCategory !== "All") {
      tools = tools.filter((t) => t.category === activeCategory);
    }
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
      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h2 className="text-lg font-bold text-surface-900">Recommended for you</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((tool) => {
              const colorClass = CATEGORY_COLORS[tool.category] ?? "bg-surface-100 text-surface-600 border-surface-200";
              return (
                <Link key={tool.slug} href={`/dashboard/tools/${tool.slug}`} className="block no-underline">
                  <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-200 rounded-xl p-5 hover:shadow-md transition-all cursor-pointer h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colorClass}`}>
                        {tool.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-surface-900 text-sm mb-1">{tool.name}</h3>
                    <p className="text-surface-500 text-xs leading-relaxed">{tool.oneLiner}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Header + Search */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-surface-900 mb-2">Discover Tools</h2>
        <p className="text-surface-500 text-sm mb-4">
          Click any tool to get a personalized guide based on your profile and sales stack.
        </p>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tools..."
          className="w-full max-w-md text-sm bg-white border border-surface-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-surface-800 placeholder-surface-400"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            activeCategory === "All"
              ? "bg-brand-600 text-white"
              : "bg-surface-100 text-surface-600 hover:bg-surface-200"
          }`}
        >
          All ({TOOL_CATALOG.length})
        </button>
        {TOOL_CATEGORIES.map((cat) => {
          const count = TOOL_CATALOG.filter((t) => t.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-brand-600 text-white"
                  : "bg-surface-100 text-surface-600 hover:bg-surface-200"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Tool Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-surface-200 rounded-2xl p-8 text-center">
          <p className="text-surface-500 text-sm">No tools match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => {
            const colorClass = CATEGORY_COLORS[tool.category] ?? "bg-surface-100 text-surface-600 border-surface-200";
            return (
              <Link key={tool.slug} href={`/dashboard/tools/${tool.slug}`} className="block no-underline">
                <div className="bg-white border border-surface-200 rounded-xl p-5 hover:shadow-md hover:border-surface-300 transition-all cursor-pointer h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colorClass}`}>
                      {tool.category}
                    </span>
                    <svg className="w-4 h-4 text-surface-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-surface-900 text-sm mb-1">{tool.name}</h3>
                  <p className="text-surface-500 text-xs leading-relaxed flex-1">{tool.oneLiner}</p>
                  <div className="mt-3 pt-3 border-t border-surface-100">
                    <span className="text-[10px] text-brand-600 font-medium">View personalized guide &rarr;</span>
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
