import { LeadFeed } from "@/components/dashboard/lead-feed";
import { RoadmapWidget } from "@/components/dashboard/roadmap-widget";

export default function FeedPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <LeadFeed />
      <RoadmapWidget />
    </div>
  );
}
