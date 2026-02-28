"use client";

import { useState, useEffect } from "react";

export default function MemoryViewer() {
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState("");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  useEffect(() => {
    fetch("/api/memory")
      .then((r) => r.json())
      .then((data) => {
        setContent(data.content || "");
        setSavedContent(data.content || "");
        setUpdatedAt(data.updatedAt);
      })
      .finally(() => setLoading(false));
  }, []);

  const hasChanges = content !== savedContent;

  const handleSave = async () => {
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/memory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setSavedContent(content);
        setUpdatedAt(new Date().toISOString());
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 2500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setContent(savedContent);
    setStatus("idle");
  };

  if (loading) {
    return (
      <div className="max-w-3xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface-100 rounded w-64" />
          <div className="h-4 bg-surface-100 rounded w-96" />
          <div className="h-64 bg-surface-100 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-surface-900">What Bolt knows about you</h1>
            <p className="text-surface-500 text-sm">
              Bolt builds this context over time from your chats and profile. You can edit or delete anything here.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-surface-200 bg-surface-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-surface-500">Memory File</span>
            {updatedAt && (
              <span className="text-xs text-surface-400">
                Last updated {new Date(updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {status === "saved" && (
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Saved
              </span>
            )}
            {status === "error" && (
              <span className="text-xs text-red-600 font-medium">Failed to save</span>
            )}
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nothing here yet. As you chat with Bolt and explore tool guides, context will accumulate here automatically.\n\nYou can also add your own notes, like:\n- I prefer cold email over cold calling\n- My ICP is VP of Engineering at Series B startups\n- I use Apollo + Instantly stack"
          className="w-full min-h-[400px] p-5 text-sm text-surface-800 leading-relaxed font-mono resize-y focus:outline-none placeholder-surface-400"
          spellCheck={false}
        />

        {hasChanges && (
          <div className="px-5 py-3 border-t border-surface-200 bg-surface-50 flex items-center justify-between">
            <span className="text-xs text-surface-500">You have unsaved changes</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-4 py-1.5 text-xs font-medium text-surface-600 hover:text-surface-800 transition-colors cursor-pointer"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-1.5 text-xs font-medium bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 transition-colors cursor-pointer"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">How this works</p>
            <p className="text-amber-700 leading-relaxed">
              When you chat with Bolt or read a personalized tool guide, Bolt extracts useful signals (tools you are evaluating, challenges you mention, preferences you express) and appends them here. This context makes every future recommendation more relevant. You are always in control and can edit or clear anything.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
