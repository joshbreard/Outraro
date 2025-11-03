import { ActivityHeatmap } from "@/components/dashboard/charts/heatmap";
import { LineChart } from "@/components/dashboard/charts/line-chart";
import { DeliverabilityCard } from "@/components/dashboard/deliverability-card";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { LeadFeed } from "@/components/dashboard/lead-feed";
import { PipelineCard } from "@/components/dashboard/pipeline-card";
import { RoadmapWidget } from "@/components/dashboard/roadmap-widget";
import { getMockKpis } from "@/lib/utils/kpis";

export default async function DashboardOverviewPage() {
  const tiles = await getMockKpis();

  const labels = Array.from({ length: 12 }, (_, index) => `W${index + 1}`);
  const openRates = labels.map((_, index) => 0.38 + Math.sin(index / 2) * 0.05);

  return (
    <div className="space-y-6">
      <KpiGrid tiles={tiles} />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <LineChart title="Open rate" labels={labels} datasetLabel="Open rate" values={openRates} />
        <DeliverabilityCard />
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <ActivityHeatmap />
        <RoadmapWidget />
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <PipelineCard />
        <LeadFeed />
      </div>
    </div>
  );
}
