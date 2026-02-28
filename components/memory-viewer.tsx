"use client";

import { useState, useEffect } from "react";

export default function MemoryViewer() {
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState("");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch("/api/memory")
      .then((r) => r.json())
      .then((d) => {
        setContent(d.content || "");
        setSaved(d.content || "");
        setUpdatedAt(d.updatedAt);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/memory", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setSaved(content);
    setUpdatedAt(new Date().toISOString());
    setSaving(false);
    setEditing(false);
  };

  const handleCancel = () => {
    setContent(saved);
    setEditing(false);
  };

  const hasChanges = content !== saved;

  if (loading) {
    return (
      <div className="max-w-3xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface-200 rounded w-1/3" />
          <div className="h-64 bg-surface-100 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900 mb-1">
          What Bolt Knows About You
        </h1>
        <p className="text-surface-500 text-sm">
          Bolt builds this context from your conversations and profile. You can
          edit or delete anything here. This helps Bolt personalize tool guides
          and advice to your specific situation.
        </p>
      </div>

      <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-surface-200 bg-surface-50">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-surface-700">
              Memory File
            </span>
            {updatedAt && (
              <span className="text-xs text-surface-400">
                Last updated{" "}
                {new Date(updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {editing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="text-sm text-surface-500 hover:text-surface-700 px-3 py-1.5 rounded-lg hover:bg-surface-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  className="text-sm bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="text-sm text-brand-600 hover:text-brand-700 px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {editing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[400px] p-5 text-sm text-surface-800 font-mono leading-relaxed focus:outline-none resize-y"
            placeholder="No memories yet. As you chat with Bolt and explore tool guides, context will be added here automatically."
          />
        ) : (
          <div className="p-5 min-h-[200px]">
            {content ? (
              <pre className="text-sm text-surface-700 font-mono leading-relaxed whitespace-pre-wrap">
                {content}
              </pre>
            ) : (
              <div className="text-center py-12">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <p className="text-surface-500 text-sm mb-1">
                  No memories yet
                </p>
                <p className="text-surface-400 text-xs">
                  Chat with Bolt or explore tool guides to start building
                  context.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
