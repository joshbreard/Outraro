export const categoryRouteMap: Record<string, string> = {
  "Tool Breakdown": "/dashboard/tools",
  Workflow: "/dashboard/workflows",
  "News Brief": "/dashboard/news",
  "Prompt Library": "/dashboard/prompts",
};

export const categoryLabelMap: Record<string, string> = {
  "Tool Breakdown": "Tools",
  Workflow: "Workflows",
  "News Brief": "News",
  "Prompt Library": "Prompts",
};

export function getCategoryRoute(category: string, id: string): string {
  const base = categoryRouteMap[category] ?? "/dashboard";
  return `${base}/${id}`;
}
