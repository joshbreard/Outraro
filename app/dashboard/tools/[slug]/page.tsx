import { getToolBySlug, toolCatalog } from "@/lib/tool-catalog";
import ToolGuideView from "@/components/tool-guide-view";
import Link from "next/link";

export function generateStaticParams() {
  return toolCatalog.map((tool) => ({ slug: tool.slug }));
}

export default async function ToolGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="max-w-3xl text-center py-20">
        <h1 className="text-2xl font-bold text-surface-900 mb-4">
          Tool not found
        </h1>
        <Link href="/dashboard" className="text-brand-600 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return <ToolGuideView tool={tool} />;
}
