"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useChat } from "ai/react";
import Link from "next/link";
import FormattedMessage from "@/components/formatted-message";
import { TOOL_CATALOG, CATEGORY_COLORS } from "@/lib/tool-catalog";

export default function ToolGuidePage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = TOOL_CATALOG.find((t) => t.slug === slug);

  const [guide, setGuide] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cached, setCached] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationId = useRef(crypto.randomUUID());
  const prevLoadingRef = useRef(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } =
    useChat({
      body: { toolSlug: slug, toolName: tool?.name },
    });

  const fetchGuide = async (refresh = false) => {
    if (refresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch("/api/tool-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolSlug: slug, refresh }),
      });
      const data = await res.json();
      setGuide(data.guide);
      setCached(data.cached);
      setUpdatedAt(data.updatedAt);
    } catch (e) {
      console.error("Failed to load guide:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (slug) fetchGuide();
  }, [slug]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (prevLoadingRef.current && !isLoading && messages.length >= 2) {
      fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: conversationId.current,
          articleId: `tool:${slug}`,
          articleTitle: `Tool Guide: ${tool?.name}`,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
    }
    prevLoadingRef.current = isLoading;
  }, [isLoading, messages, slug, tool?.name]);

  if (!tool) {
    return (
      <div className="max-w-3xl text-center py-20">
        <h1 className="text-2xl font-bold text-surface-900 mb-4">Tool not found</h1>
        <Link href="/dashboard" className="text-brand-600 hover:underline">Back to Dashboard</Link>
      </div>
    );
  }

  const colorClass = CATEGORY_COLORS[tool.category] ?? "bg-surface-100 text-surface-600 border-surface-200";

  const suggestedQuestions = [
    `How does ${tool.name} compare to alternatives?`,
    `What's the best way to set up ${tool.name} for my use case?`,
    `What integrations should I connect first?`,
  ];

  return (
    <div className="max-w-3xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-surface-500 hover:text-surface-700 text-sm mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Tools
      </Link>

      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${colorClass}`}>
            {tool.category}
          </span>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-600 hover:text-brand-700 font-medium"
          >
            Visit website &rarr;
          </a>
        </div>
        <h1 className="text-3xl font-bold text-surface-900 mb-2">{tool.name}</h1>
        <p className="text-lg text-surface-500">{tool.oneLiner}</p>
      </div>

      {/* Guide Content */}
      {loading ? (
        <div className="space-y-4">
          <div className="bg-white border border-surface-200 rounded-2xl p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-surface-100 rounded w-48" />
              <div className="h-4 bg-surface-100 rounded w-full" />
              <div className="h-4 bg-surface-100 rounded w-5/6" />
              <div className="h-4 bg-surface-100 rounded w-4/6" />
              <div className="h-6 bg-surface-100 rounded w-40 mt-6" />
              <div className="h-4 bg-surface-100 rounded w-full" />
              <div className="h-4 bg-surface-100 rounded w-3/4" />
            </div>
            <p className="text-sm text-surface-400 mt-6 text-center">
              Generating your personalized guide...
            </p>
          </div>
        </div>
      ) : guide ? (
        <>
          <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden mb-8">
            <div className="px-6 py-3 border-b border-surface-200 bg-surface-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-surface-500">Your personalized guide</span>
                {cached && (
                  <span className="text-xs text-surface-400">Cached</span>
                )}
                {updatedAt && (
                  <span className="text-xs text-surface-400">
                    {new Date(updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                )}
              </div>
              <button
                onClick={() => fetchGuide(true)}
                disabled={refreshing}
                className="text-xs font-medium text-brand-600 hover:text-brand-700 disabled:opacity-50 transition-colors cursor-pointer flex items-center gap-1"
              >
                <svg className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {refreshing ? "Refreshing..." : "Refresh guide"}
              </button>
            </div>
            <div
              className="p-6 prose prose-sm prose-surface max-w-none"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(guide) }}
            />
          </div>

          {/* Inline Bolt Chat */}
          <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-200 bg-surface-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-brand-600" viewBox="0 0 24 24" fill="none">
                    <path d="M9 21h6M12 3a6 6 0 0 0-4 10.5V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.5A6 6 0 0 0 12 3z" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-surface-900">Ask Bolt about {tool.name}</h3>
                  <p className="text-xs text-surface-500">Get personalized answers based on your profile and this guide</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4 min-h-[100px] max-h-[500px] overflow-y-auto">
              {messages.length === 0 && (
                <div className="space-y-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => append({ role: "user", content: q })}
                      className="block w-full text-left text-xs bg-surface-50 hover:bg-surface-100 text-surface-700 px-3 py-2 rounded-lg transition-colors border border-surface-200 cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-brand-600 text-white rounded-br-md" : "bg-surface-100 text-surface-800 rounded-bl-md"}`}>
                    <FormattedMessage content={m.content} />
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface-100 text-surface-500 px-3.5 py-2.5 rounded-2xl rounded-bl-md text-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-surface-200 p-3 flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder={`Ask about ${tool.name}...`}
                className="flex-1 text-sm bg-surface-50 border border-surface-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-surface-800 placeholder-surface-400"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="bg-white border border-surface-200 rounded-2xl p-8 text-center">
          <p className="text-surface-500 text-sm">Failed to generate guide. Please try again.</p>
          <button onClick={() => fetchGuide()} className="mt-4 text-brand-600 hover:text-brand-700 text-sm font-medium cursor-pointer">
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

function formatMarkdown(md: string): string {
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-surface-900 mt-6 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-surface-900 mt-8 mb-3">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold text-surface-900 mt-8 mb-3">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");

  // Bullet lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-surface-700">$1</li>');
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-surface-700">$1</li>');

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p class="text-surface-700 leading-relaxed mb-3">');
  html = `<p class="text-surface-700 leading-relaxed mb-3">${html}</p>`;

  return html;
}
