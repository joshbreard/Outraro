"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { TOOLS, CATEGORY_META, type Tool } from "@/lib/tool-catalog";
import Link from "next/link";
import FormattedMessage from "@/components/formatted-message";
import { useChat } from "ai/react";

function ToolGuideContent({ tool }: { tool: Tool }) {
  const [guide, setGuide] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [streaming, setStreaming] = useState(false);
  const [cached, setCached] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const loadGuide = async (refresh = false) => {
    setLoading(true);
    setStreaming(false);
    setGuide(null);

    const res = await fetch("/api/tool-guide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolSlug: tool.slug, refresh }),
    });

    if (!res.ok) {
      setGuide("Failed to load guide. Please try again.");
      setLoading(false);
      return;
    }

    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await res.json();
      setGuide(data.guide);
      setCached(data.cached || false);
      setUpdatedAt(data.updatedAt);
      setLoading(false);
    } else {
      setStreaming(true);
      setLoading(false);
      setCached(false);
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((l) => l.startsWith('0:"'));
          for (const line of lines) {
            try {
              accumulated += JSON.parse(line.slice(2));
            } catch {}
          }
          setGuide(accumulated);
        }
      }
      setStreaming(false);
      setUpdatedAt(new Date().toISOString());
    }
  };

  useEffect(() => {
    loadGuide();
  }, [tool.slug]);

  const meta = CATEGORY_META[tool.category as keyof typeof CATEGORY_META];

  return (
    <div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-surface-500 hover:text-surface-700 text-sm mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Tools
      </Link>

      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <div className="flex items-center gap-3 mb-3">
            {meta && (
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${meta.color}`}>
                {meta.icon} {tool.category}
              </span>
            )}
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-600 hover:text-brand-700"
            >
              Visit site ↗
            </a>
          </div>
          <h1 className="text-3xl font-bold text-surface-900 mb-2">{tool.name}</h1>
          <p className="text-surface-500 text-base">{tool.oneLiner}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4 mb-8">
        {cached && updatedAt && (
          <span className="text-xs text-surface-400">
            Generated{" "}
            {new Date(updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
        <button
          onClick={() => loadGuide(true)}
          disabled={loading || streaming}
          className="text-xs text-brand-600 hover:text-brand-700 disabled:opacity-50 cursor-pointer"
        >
          ↻ Refresh Guide
        </button>
      </div>

      {loading ? (
        <div className="bg-white border border-surface-200 rounded-2xl p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-surface-200 rounded w-1/3" />
            <div className="h-4 bg-surface-100 rounded w-full" />
            <div className="h-4 bg-surface-100 rounded w-5/6" />
            <div className="h-4 bg-surface-100 rounded w-4/6" />
            <div className="h-6 bg-surface-200 rounded w-1/4 mt-6" />
            <div className="h-4 bg-surface-100 rounded w-full" />
            <div className="h-4 bg-surface-100 rounded w-3/4" />
          </div>
          <p className="text-sm text-surface-400 mt-6 text-center">
            Generating your personalized guide...
          </p>
        </div>
      ) : guide ? (
        <div className="bg-white border border-surface-200 rounded-2xl p-8 prose prose-sm max-w-none prose-headings:text-surface-900 prose-p:text-surface-700 prose-li:text-surface-700 prose-strong:text-surface-900">
          <FormattedGuide content={guide} />
          {streaming && (
            <span className="inline-block w-2 h-4 bg-brand-600 animate-pulse ml-0.5" />
          )}
        </div>
      ) : null}
    </div>
  );
}

function FormattedGuide({ content }: { content: string }) {
  const html = content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-3">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code class="bg-surface-100 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$2</li>')
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");

  return <div dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }} />;
}

function ToolChat({ tool }: { tool: Tool }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationId = useRef(crypto.randomUUID());
  const prevLoadingRef = useRef(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } =
    useChat({
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

      // Extract memory signals from the last exchange
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      if (lastUser) {
        fetch("/api/memory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            entry: `Asked about ${tool.name}: "${lastUser.content.slice(0, 100)}"`,
          }),
        });
      }
    }
    prevLoadingRef.current = isLoading;
  }, [isLoading, messages, tool]);

  const suggestedQuestions = [
    `How does ${tool.name} compare to alternatives?`,
    `What's the best way to set up ${tool.name} for my use case?`,
    `How much does ${tool.name} cost?`,
  ];

  return (
    <div className="mt-12 border-t border-surface-200 pt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 21h6M12 3a6 6 0 0 0-4 10.5V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.5A6 6 0 0 0 12 3z"
              stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-surface-900 text-sm">Ask Bolt about {tool.name}</h3>
          <p className="text-xs text-surface-500">Get personalized advice based on your profile</p>
        </div>
      </div>

      {messages.length === 0 && (
        <div className="space-y-2 mb-6">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => append({ role: "user", content: q })}
              className="block w-full text-left text-sm bg-surface-50 hover:bg-surface-100 text-surface-700 px-4 py-3 rounded-xl transition-colors border border-surface-200 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4 mb-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
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
            <div className="bg-surface-100 text-surface-500 px-4 py-3 rounded-2xl rounded-bl-md text-sm">
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

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder={`Ask about ${tool.name}...`}
          className="flex-1 text-sm bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-surface-800 placeholder-surface-400"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl px-4 py-3 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default function ToolGuidePage() {
  const params = useParams();
  const slug = params.slug as string;
  const tool = TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    return (
      <div className="max-w-3xl text-center py-20">
        <h1 className="text-2xl font-bold text-surface-900 mb-4">Tool not found</h1>
        <Link href="/dashboard" className="text-brand-600 hover:underline">Back to Tools</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <ToolGuideContent tool={tool} />
      <ToolChat tool={tool} />
    </div>
  );
}
