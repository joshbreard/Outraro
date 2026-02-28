"use client";

import { useMemo } from "react";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function markdownToHtml(text: string): string {
  let html = escapeHtml(text);

  // Bold: **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Italic: *text* (but not inside bold)
  html = html.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");

  // Inline code: `text`
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-black/10 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>'
  );

  // Line breaks
  html = html.replace(/\n/g, "<br/>");

  return html;
}

export default function FormattedMessage({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const html = useMemo(() => markdownToHtml(content), [content]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
