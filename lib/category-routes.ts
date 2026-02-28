export const categoryRouteMap: Record<string, string> = {
  "Tool Breakdown": "/dashboard/content",
  Workflow: "/dashboard/content",
  "News Brief": "/dashboard/content",
  "Prompt Library": "/dashboard/content",
};

export const categoryLabelMap: Record<string, string> = {
  "Tool Breakdown": "Tools",
  Workflow: "Workflows",
  "News Brief": "News",
  "Prompt Library": "Prompts",
};

export function getCategoryRoute(category: string, id: string): string {
  return `/dashboard/content/${id}`;
}
