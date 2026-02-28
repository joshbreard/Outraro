"use client";

import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";

function RoIcon({ className }: { className?: string }) {
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
      <path
        d="M5 7l-.3.9L4 8.2l.7.3.3.9.3-.9.7-.3-.7-.3L5 7z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function RoChat({
  articleId,
  articleTitle,
}: {
  articleId?: string;
  articleTitle?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationId = useRef(crypto.randomUUID());
  const prevLoadingRef = useRef(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } =
    useChat({
      body: { articleId, articleTitle },
    });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save conversation to Supabase when assistant finishes responding
  useEffect(() => {
    if (prevLoadingRef.current && !isLoading && messages.length >= 2) {
      fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: conversationId.current,
          articleId,
          articleTitle,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
    }
    prevLoadingRef.current = isLoading;
  }, [isLoading, messages, articleId, articleTitle]);

  const suggestedQuestions = articleTitle
    ? [
        "Summarize this article in 3 bullet points",
        "How do I apply this to my outreach?",
        "What are the key takeaways?",
      ]
    : [
        "What cold email frameworks do you recommend?",
        "How should I handle the 'not interested' objection?",
        "What AI tools should an SDR use?",
      ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-brand-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg cursor-pointer transition-all duration-200 ease-out hover:bg-brand-700 hover:scale-110 hover:shadow-xl hover:shadow-brand-600/25 active:scale-95 active:shadow-md"
        aria-label="Ask Ro"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <RoIcon className="w-7 h-7" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[22rem] sm:w-96 h-[32rem] bg-white border border-surface-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-brand-600 text-white px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <RoIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm">Ro</h3>
              <p className="text-xs text-white/70 truncate">
                {articleTitle
                  ? `Reading: ${articleTitle}`
                  : "Your AI sales coach"}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-surface-500 text-sm">
                  Hey! I&apos;m Ro, your AI sales coach. Ask me anything about{" "}
                  {articleTitle ? "this article" : "our content library"}.
                </p>
                <div className="space-y-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => append({ role: "user", content: q })}
                      className="block w-full text-left text-xs bg-surface-50 hover:bg-surface-100 text-surface-700 px-3 py-2 rounded-lg transition-colors border border-surface-200"
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
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-brand-600 text-white rounded-br-md"
                      : "bg-surface-100 text-surface-800 rounded-bl-md"
                  }`}
                >
                  {m.content}
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
            className="border-t border-surface-200 p-3 flex gap-2 shrink-0"
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Ro anything..."
              className="flex-1 text-sm bg-surface-50 border border-surface-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-surface-800 placeholder-surface-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl px-3.5 py-2.5 transition-colors"
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
    </>
  );
}
