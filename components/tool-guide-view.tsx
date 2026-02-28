"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import Link from "next/link";
import FormattedMessage from "@/components/formatted-message";
import type { Tool } from "@/lib/tool-catalog";

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 21h6M12 3a6 6 0 0 0-4 10.5V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.5A6 6 0 0 0 12 3z"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 3l-.5 1.5L17 5l1.5.5L19 7l.5-1.5L21 5l-1.5-.5L19 3z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ToolGuideView({ tool }: { tool: Tool }) {
  const [guide, setGuide] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationId = useRef(crypto.randomUUID());
  const prevLoadingRef = useRef(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({
    body: { toolSlug: tool.slug, toolName: tool.name },
  });

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
          articleId: `tool:${tool.slug}`,
          articleTitle: `Tool Guide: ${tool.name}`,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
    }
    prevLoadingRef.current = isLoading;
  }, [isLoading, messages, tool]);

  const fetchGuide = async (refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const res = await fetch("/api/tool-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolSlug: tool.slug, refresh }),
      });

      if (!res.ok) throw new Error("Failed to generate guide");
      const data = await res.json();
      setGuide(data.guide);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGuide();
  }, [tool.slug]);

  const suggestedQuestions = [
    `How does ${tool.name} compare to alternatives?`,
    `What's the best way to set up ${tool.name} for my use case?`,
    `Is ${tool.name} worth it for a small team?`,
  ];

  return (
    <div className="max-w-3xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-surface-500 hover:text-surface-700 text-sm mb-6 transition-colors"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Tools
      </Link>

      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 mb-1">
            {tool.name}
          </h1>
          <p className="text-surface-500 text-sm">{tool.oneLiner}</p>
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-medium text-brand-600 border border-brand-200 bg-brand-50 hover:bg-brand-100 rounded-lg px-3 py-2 transition-colors"
        >
          Visit site ↗
        </a>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border bg-surface-50 text-surface-600 border-surface-200">
          {tool.category}
        </span>
        {guide && (
          <button
            onClick={() => fetchGuide(true)}
            disabled={refreshing}
            className="text-xs text-surface-400 hover:text-surface-600 transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-50"
          >
            <svg
              className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {refreshing ? "Regenerating..." : "Refresh guide"}
          </button>
        )}
      </div>

      {loading ? (
        <div className="bg-white border border-surface-200 rounded-2xl p-12 text-center">
          <div className="animate-pulse space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                <BoltIcon className="w-5 h-5 text-brand-600" />
              </div>
              <p className="text-surface-500 text-sm font-medium">
                Bolt is writing your personalized guide...
              </p>
            </div>
            <div className="h-4 bg-surface-100 rounded w-3/4 mx-auto" />
            <div className="h-4 bg-surface-100 rounded w-full" />
            <div className="h-4 bg-surface-100 rounded w-5/6 mx-auto" />
            <div className="h-4 bg-surface-100 rounded w-2/3 mx-auto" />
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-700 text-sm mb-3">{error}</p>
          <button
            onClick={() => fetchGuide()}
            className="text-sm text-red-600 underline cursor-pointer"
          >
            Try again
          </button>
        </div>
      ) : guide ? (
        <div className="bg-white border border-surface-200 rounded-2xl p-8 mb-10">
          <div
            className="prose prose-sm prose-surface max-w-none"
            dangerouslySetInnerHTML={{ __html: guide }}
          />
        </div>
      ) : null}

      {guide && (
        <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden">
          <div className="bg-brand-600 text-white px-5 py-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <BoltIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">
                Ask Bolt about {tool.name}
              </h3>
              <p className="text-xs text-white/70">
                Get personalized advice based on your profile and this guide
              </p>
            </div>
          </div>

          <div className="p-5 space-y-4 min-h-[200px] max-h-[500px] overflow-y-auto">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-surface-500 text-sm">
                  Ask me anything about {tool.name} and how it fits your
                  workflow.
                </p>
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
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-brand-600 text-white rounded-br-md"
                      : "bg-surface-100 text-surface-800 rounded-bl-md"
                  }`}
                >
                  <FormattedMessage content={m.content} />
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface-100 text-surface-500 px-3.5 py-2.5 rounded-2xl rounded-bl-md text-sm">
                  <span className="flex items-center gap-1">
                    <span
                      className="w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-surface-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-surface-200 p-3 flex gap-2"
          >
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
