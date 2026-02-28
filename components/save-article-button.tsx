"use client";

import { useState, useEffect } from "react";

export default function SaveArticleButton({
  articleId,
  articleTitle,
  articleCategory,
  articleImageUrl,
}: {
  articleId: string;
  articleTitle: string;
  articleCategory: string;
  articleImageUrl: string | null;
}) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/saved-articles?articleId=${articleId}`)
      .then((r) => r.json())
      .then((data) => {
        setSaved(data.saved);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [articleId]);

  const toggle = async () => {
    const newSaved = !saved;
    setSaved(newSaved);
    await fetch("/api/saved-articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        articleId,
        articleTitle,
        articleCategory,
        articleImageUrl,
        action: newSaved ? "save" : "unsave",
      }),
    });
  };

  if (loading) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={toggle}
      className={`transition-all duration-200 cursor-pointer p-2 rounded-lg active:scale-90 ${
        saved
          ? "text-brand-600 hover:text-brand-700 hover:bg-brand-50"
          : "text-surface-400 hover:text-brand-600 hover:bg-brand-50"
      }`}
      title={saved ? "Remove from saved" : "Save article"}
    >
      <svg
        className="w-6 h-6"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={saved ? 0 : 1.5}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
}
