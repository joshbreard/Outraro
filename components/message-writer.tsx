"use client";

import { useState } from "react";

type Channel = "email" | "linkedin" | "sms";

const channels: { key: Channel; label: string; icon: string }[] = [
  {
    key: "email",
    label: "Email",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    key: "sms",
    label: "SMS",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
];

function parseVariants(text: string, channel: Channel): string[] {
  const prefixes: Record<Channel, string> = {
    email: "--- Email",
    linkedin: "--- LinkedIn",
    sms: "--- SMS",
  };
  const prefix = prefixes[channel];
  const parts = text.split(new RegExp(`${prefix} \\d+ ---`)).filter((s) => s.trim());
  if (parts.length >= 2) return parts.map((p) => p.trim());
  return [text.trim()];
}

export default function MessageWriter() {
  const [channel, setChannel] = useState<Channel>("email");
  const [prospectName, setProspectName] = useState("");
  const [prospectCompany, setProspectCompany] = useState("");
  const [prospectRole, setProspectRole] = useState("");
  const [prospectContext, setProspectContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prospectCompany.trim() && !prospectName.trim()) {
      setError("Add at least a prospect name or company.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    setCopiedIndex(null);

    try {
      const res = await fetch("/api/writer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, prospectName, prospectCompany, prospectRole, prospectContext }),
      });

      if (!res.ok) throw new Error("Generation failed");

      const data = await res.json();
      setResult(data.content);
      setGenerationId(data.generationId);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);

    fetch("/api/writer/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        generationId,
        channel,
        variantIndex: index,
        content: text,
      }),
    });
  };

  const variants = result ? parseVariants(result, channel) : [];

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900 mb-1">Message Writer</h1>
        <p className="text-surface-500 text-sm">
          Generate personalized outreach across channels. Powered by your Sales Profile.
        </p>
      </div>

      {/* Channel Toggle */}
      <div className="flex gap-1 bg-surface-100 p-1 rounded-xl mb-6 w-fit">
        {channels.map((ch) => (
          <button
            key={ch.key}
            onClick={() => {
              setChannel(ch.key);
              setResult(null);
              setCopiedIndex(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              channel === ch.key
                ? "bg-white text-surface-900 shadow-sm"
                : "text-surface-500 hover:text-surface-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ch.icon} />
            </svg>
            {ch.label}
          </button>
        ))}
      </div>

      {/* SMS Disclaimer */}
      {channel === "sms" && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
          <p className="text-amber-800 text-xs">
            <span className="font-semibold">Heads up:</span> These are for warm follow-ups (post-call, post-meeting). Ensure you have consent before texting prospects. Cold SMS may violate TCPA regulations.
          </p>
        </div>
      )}

      {/* Prospect Input */}
      <div className="bg-white border border-surface-200 rounded-2xl p-6 mb-6">
        <h3 className="text-sm font-semibold text-surface-900 mb-4">Prospect Details</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Name</label>
            <input
              type="text"
              value={prospectName}
              onChange={(e) => setProspectName(e.target.value)}
              placeholder="e.g., Sarah Chen"
              className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Company</label>
            <input
              type="text"
              value={prospectCompany}
              onChange={(e) => setProspectCompany(e.target.value)}
              placeholder="e.g., Stripe"
              className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-surface-700 mb-1.5">Role / Title</label>
          <input
            type="text"
            value={prospectRole}
            onChange={(e) => setProspectRole(e.target.value)}
            placeholder="e.g., VP of Sales"
            className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-1.5">
            Context <span className="text-surface-400 font-normal">(optional but makes it better)</span>
          </label>
          <textarea
            value={prospectContext}
            onChange={(e) => setProspectContext(e.target.value)}
            placeholder="e.g., They just raised a Series B, hiring 10 SDRs, currently using Outreach but looking to switch"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-surface-300 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all text-sm resize-none"
          />
        </div>
      </div>

      {/* Generate Button */}
      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-2 mb-4">
          {error}
        </p>
      )}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 px-6 rounded-xl text-sm glow-btn transition-all disabled:opacity-50 cursor-pointer mb-8"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating...
          </span>
        ) : (
          `Generate ${channel === "email" ? "Emails" : channel === "linkedin" ? "LinkedIn Messages" : "Texts"}`
        )}
      </button>

      {/* Results */}
      {variants.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-surface-900">
            {variants.length} Variant{variants.length !== 1 ? "s" : ""} Generated
          </h3>
          {variants.map((variant, i) => (
            <div
              key={i}
              className="bg-white border border-surface-200 rounded-2xl p-5 relative group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-surface-400">
                  {channel === "email" ? "Email" : channel === "linkedin" ? "LinkedIn" : "SMS"} {i + 1}
                </span>
                <button
                  onClick={() => handleCopy(variant, i)}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer bg-surface-100 hover:bg-brand-50 text-surface-600 hover:text-brand-700"
                >
                  {copiedIndex === i ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="text-sm text-surface-800 leading-relaxed whitespace-pre-wrap">
                {variant}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
