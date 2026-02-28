export const categoryRouteMap: Record<string, string> = {
  "Tool Breakdown": "/library",
  Workflow: "/library",
  "News Brief": "/library",
  "Prompt Library": "/library",
};

export const categoryLabelMap: Record<string, string> = {
  "Tool Breakdown": "Tools",
  Workflow: "Workflows",
  "News Brief": "News",
  "Prompt Library": "Prompts",
};

export function getCategoryRoute(category: string, id: string): string {
  return `/library/${id}`;
}
