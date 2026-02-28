"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import Link from "next/link";
import FormattedMessage from "@/components/formatted-message";

interface Conversation {
  id: string;
  article_id: string | null;
  article_title: string | null;
  messages: { role: string; content: string }[];
  created_at: string;
  updated_at: string;
}

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

function ConversationThread({ convo }: { convo: Conversation }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevLoadingRef = useRef(false);

  const isToolGuide = convo.article_id?.startsWith("tool:");
  const toolSlug = isToolGuide ? convo.article_id?.replace("tool:", "") : null;

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: convo.messages.map((m, i) => ({
        id: `history-${i}`,
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      body: isToolGuide
        ? { toolSlug, toolName: convo.article_title?.replace("Tool Guide: ", "") }
        : { articleId: convo.article_id, articleTitle: convo.article_title },
    });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (
      prevLoadingRef.current &&
      !isLoading &&
      messages.length > convo.messages.length
    ) {
      fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: convo.id,
          articleId: convo.article_id,
          articleTitle: convo.article_title,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
    }
    prevLoadingRef.current = isLoading;
  }, [isLoading, messages, convo]);

  return (
    <div className="border-t border-surface-200 bg-surface-50">
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
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
                  : "bg-white text-surface-800 rounded-bl-md border border-surface-200"
              }`}
            >
              <FormattedMessage content={m.content} />
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-surface-500 px-3.5 py-2.5 rounded-2xl rounded-bl-md text-sm border border-surface-200">
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

      {isToolGuide && toolSlug && (
        <div className="px-4 pb-2">
          <Link
            href={`/dashboard/tools/${toolSlug}`}
            className="text-xs text-brand-600 hover:text-brand-700 font-medium no-underline hover:underline"
          >
            View tool guide &rarr;
          </Link>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="border-t border-surface-200 p-3 flex gap-2"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Continue the conversation..."
          className="flex-1 text-sm bg-white border border-surface-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-surface-800 placeholder-surface-400"
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
  );
}

export default function HistoryView({
  conversations,
}: {
  conversations: Conversation[];
}) {
  const [expandedConvo, setExpandedConvo] = useState<string | null>(null);

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900 mb-1">History</h1>
        <p className="text-surface-500 text-sm">
          Your past conversations with Bolt.
        </p>
      </div>

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
            Chat with Bolt on any tool guide to see your history here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((convo) => {
            const firstUserMsg = convo.messages.find(
              (m: { role: string }) => m.role === "user"
            );
            const isExpanded = expandedConvo === convo.id;
            const isToolGuide = convo.article_id?.startsWith("tool:");
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
                    <div className="flex items-center gap-2">
                      {isToolGuide && (
                        <span className="text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-medium border border-brand-200">
                          Tool Guide
                        </span>
                      )}
                      <span className="text-xs font-medium text-brand-600">
                        {convo.article_title ?? "General Chat"}
                      </span>
                    </div>
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

                {isExpanded && <ConversationThread convo={convo} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
