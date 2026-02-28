"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MemoryViewer() {
  const [content, setContent] = useState("");
  const [original, setOriginal] = useState("");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch("/api/memory")
      .then((r) => r.json())
      .then((data) => {
        setContent(data.memory || "");
        setOriginal(data.memory || "");
        setUpdatedAt(data.updatedAt);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/memory", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setOriginal(content);
    setSaving(false);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setContent(original);
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="max-w-3xl">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-surface-100 rounded w-1/3" />
          <div className="h-4 bg-surface-100 rounded w-2/3" />
          <div className="h-64 bg-surface-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🧠</span>
          <h1 className="text-2xl font-bold text-surface-900">
            What Bolt Knows About You
          </h1>
        </div>
        <p className="text-surface-500 text-sm">
          Bolt accumulates context from your conversations to give better advice
          over time. You can see everything here and edit or remove anything you
          want.
        </p>
        {updatedAt && (
          <p className="text-surface-400 text-xs mt-2">
            Last updated:{" "}
            {new Date(updatedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>

      <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-surface-200 bg-surface-50">
          <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">
            Memory File
          </span>
          <div className="flex items-center gap-2">
            {saved && (
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Saved
              </span>
            )}
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="text-xs text-brand-600 hover:text-brand-700 font-medium cursor-pointer"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="text-xs text-surface-500 hover:text-surface-700 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || content === original}
                  className="text-xs bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-medium px-3 py-1 rounded-lg cursor-pointer transition-colors"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </>
            )}
          </div>
        </div>

        {content.trim() ? (
          editing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-5 text-sm text-surface-700 leading-relaxed font-mono resize-none focus:outline-none min-h-[400px]"
              placeholder="Bolt will add context here as you chat..."
            />
          ) : (
            <div className="p-5">
              {content.split("\n").map((line, i) => (
                <p
                  key={i}
                  className={`text-sm leading-relaxed ${
                    line.trim() ? "text-surface-700 mb-2" : "mb-4"
                  }`}
                >
                  {line || "\u00A0"}
                </p>
              ))}
            </div>
          )
        ) : (
          <div className="p-12 text-center">
            <span className="text-4xl mb-4 block">🧠</span>
            <p className="text-surface-500 text-sm mb-1">No memory yet</p>
            <p className="text-surface-400 text-xs">
              As you chat with Bolt about tools and strategies, key context will
              appear here.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 bg-surface-50 border border-surface-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-surface-700 mb-2">
          How memory works
        </h3>
        <ul className="text-xs text-surface-500 space-y-1.5">
          <li>
            When you chat with Bolt about tools, it extracts key signals (tools
            you are evaluating, challenges, preferences).
          </li>
          <li>
            This context gets appended here automatically so Bolt can give better
            advice in future sessions.
          </li>
          <li>You have full control. Edit or delete anything at any time.</li>
          <li>
            Memory is used alongside your sales profile to personalize tool
            guides.
          </li>
        </ul>
      </div>
    </div>
  );
}
