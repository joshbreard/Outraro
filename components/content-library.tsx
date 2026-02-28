"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

interface ContentItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  videoUrl: string | null;
  imageUrl: string | null;
  publishedDate: string;
}

const categoryColors: Record<string, string> = {
  "Tool Breakdown": "bg-blue-50 text-blue-700 border-blue-200",
  "Prompt Library": "bg-purple-50 text-purple-700 border-purple-200",
  Workflow: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "News Brief": "bg-amber-50 text-amber-700 border-amber-200",
  General: "bg-surface-100 text-surface-600 border-surface-200",
};

const categoryFilters = [
  { label: "All", value: "all" },
  { label: "Tools", value: "Tool Breakdown" },
  { label: "Workflows", value: "Workflow" },
  { label: "Prompts", value: "Prompt Library" },
  { label: "News", value: "News Brief" },
];

export default function ContentLibrary({
  articles,
}: {
  articles: ContentItem[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    return articles.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        search.trim() === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.summary.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, search, activeCategory]);

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900 mb-1">Library</h1>
        <p className="text-surface-500 text-sm">
          Browse all playbooks, prompts, tools, and news.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-surface-200 rounded-xl text-sm text-surface-800 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors cursor-pointer"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categoryFilters.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer ${
              activeCategory === cat.value
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white border border-surface-200 text-surface-600 hover:border-surface-300 hover:text-surface-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-surface-200 rounded-2xl p-12 text-center">
          <p className="text-surface-500 text-sm">
            {search
              ? `No articles matching "${search}"`
              : "No articles in this category yet."}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function ContentCard({ item }: { item: ContentItem }) {
  const colorClass =
    categoryColors[item.category] ?? categoryColors["General"];

  return (
    <Link href={`/library/${item.id}`} className="block no-underline">
      <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
        {item.imageUrl && (
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-contain bg-surface-900"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${colorClass}`}
            >
              {item.category}
            </span>
            <span className="text-xs text-surface-400">
              {new Date(item.publishedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h3 className="font-bold text-surface-900 mb-2 text-base leading-snug">
            {item.title}
          </h3>
          {item.summary && (
            <p className="text-surface-500 text-xs leading-relaxed line-clamp-2">
              {item.summary}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
