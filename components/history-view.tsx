"use client";

import { useState } from "react";
import Link from "next/link";

interface SavedArticle {
  id: number;
  article_id: string;
  article_title: string;
  article_category: string;
  article_image_url: string | null;
  saved_at: string;
}

interface Conversation {
  id: string;
  article_id: string | null;
  article_title: string | null;
  messages: { role: string; content: string }[];
  created_at: string;
  updated_at: string;
}

const categoryColors: Record<string, string> = {
  "Tool Breakdown": "bg-blue-50 text-blue-700 border-blue-200",
  "Prompt Library": "bg-purple-50 text-purple-700 border-purple-200",
  Workflow: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "News Brief": "bg-amber-50 text-amber-700 border-amber-200",
  General: "bg-surface-100 text-surface-600 border-surface-200",
};

function timeAgo(date: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function HistoryView({
  savedArticles,
  conversations,
}: {
  savedArticles: SavedArticle[];
  conversations: Conversation[];
}) {
  const [activeTab, setActiveTab] = useState<"saved" | "conversations">(
    "saved"
  );
  const [expandedConvo, setExpandedConvo] = useState<string | null>(null);
  const [articles, setArticles] = useState(savedArticles);

  const handleUnsave = async (articleId: string) => {
    setArticles((prev) => prev.filter((a) => a.article_id !== articleId));
    await fetch("/api/saved-articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId, action: "unsave" }),
    });
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900 mb-1">History</h1>
        <p className="text-surface-500 text-sm">
          Your saved articles and past conversations with Ro.
        </p>
      </div>

      <div className="flex gap-1 bg-surface-100 p-1 rounded-xl mb-8 w-fit">
        <button
          onClick={() => setActiveTab("saved")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === "saved"
              ? "bg-white text-surface-900 shadow-sm"
              : "text-surface-500 hover:text-surface-700"
          }`}
        >
          Saved Articles ({articles.length})
        </button>
        <button
          onClick={() => setActiveTab("conversations")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === "conversations"
              ? "bg-white text-surface-900 shadow-sm"
              : "text-surface-500 hover:text-surface-700"
          }`}
        >
          Ro Conversations ({conversations.length})
        </button>
      </div>

      {activeTab === "saved" && (
        <>
          {articles.length === 0 ? (
            <div className="bg-white border border-surface-200 rounded-2xl p-12 text-center">
              <svg
                className="w-12 h-12 text-surface-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <p className="text-surface-500 text-sm mb-1">
                No saved articles yet
              </p>
              <p className="text-surface-400 text-xs">
                Bookmark articles from the library to revisit them here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {articles.map((article) => {
                const colorClass =
                  categoryColors[article.article_category] ??
                  categoryColors["General"];
                return (
                  <div
                    key={article.id}
                    className="bg-white border border-surface-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-all"
                  >
                    <Link
                      href={`/library/${article.article_id}`}
                      className="flex-1 min-w-0 no-underline"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${colorClass}`}
                        >
                          {article.article_category}
                        </span>
                        <span className="text-xs text-surface-400">
                          Saved {timeAgo(article.saved_at)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-surface-900 text-sm truncate">
                        {article.article_title}
                      </h3>
                    </Link>
                    <button
                      onClick={() => handleUnsave(article.article_id)}
                      className="text-surface-400 hover:text-red-500 transition-colors cursor-pointer shrink-0 p-2 rounded-lg hover:bg-red-50"
                      title="Remove from saved"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {activeTab === "conversations" && (
        <>
          {conversations.length === 0 ? (
            <div className="bg-white border border-surface-200 rounded-2xl p-12 text-center">
              <svg
                className="w-12 h-12 text-surface-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-surface-500 text-sm mb-1">
                No conversations yet
              </p>
              <p className="text-surface-400 text-xs">
                Chat with Ro on any article to see your history here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {conversations.map((convo) => {
                const firstUserMsg = convo.messages.find(
                  (m: { role: string }) => m.role === "user"
                );
                const isExpanded = expandedConvo === convo.id;
                return (
                  <div
                    key={convo.id}
                    className="bg-white border border-surface-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedConvo(isExpanded ? null : convo.id)
                      }
                      className="w-full p-4 text-left cursor-pointer hover:bg-surface-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-brand-600">
                          {convo.article_title ?? "General Chat"}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-surface-400">
                            {convo.messages.length} messages
                          </span>
                          <span className="text-xs text-surface-400">
                            {timeAgo(convo.updated_at)}
                          </span>
                          <svg
                            className={`w-4 h-4 text-surface-400 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                      {firstUserMsg && (
                        <p className="text-sm text-surface-600 truncate">
                          &ldquo;{firstUserMsg.content}&rdquo;
                        </p>
                      )}
                    </button>

                    {isExpanded && (
                      <div className="border-t border-surface-200 p-4 space-y-3 bg-surface-50">
                        {convo.messages.map(
                          (
                            m: { role: string; content: string },
                            i: number
                          ) => (
                            <div
                              key={i}
                              className={`flex ${
                                m.role === "user"
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >
                              <div
                                className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                                  m.role === "user"
                                    ? "bg-brand-600 text-white rounded-br-md"
                                    : "bg-white text-surface-800 rounded-bl-md border border-surface-200"
                                }`}
                              >
                                {m.content}
                              </div>
                            </div>
                          )
                        )}
                        {convo.article_id && (
                          <div className="pt-2">
                            <Link
                              href={`/library/${convo.article_id}`}
                              className="text-xs text-brand-600 hover:text-brand-700 font-medium no-underline hover:underline"
                            >
                              View article &rarr;
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
