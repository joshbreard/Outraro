import { LineChart } from "@/components/dashboard/charts/line-chart";
import { PieChart } from "@/components/dashboard/charts/pie-chart";

const labels = Array.from({ length: 12 }, (_, index) => `Week ${index + 1}`);
const replyRates = labels.map((_, index) => 0.12 + Math.sin(index / 3) * 0.03);
const positiveRates = labels.map((_, index) => 0.04 + Math.cos(index / 3) * 0.01);

export default function EmailPage() {
  return (
    <div className="space-y-6">
      <LineChart title="Reply rate over time" labels={labels} datasetLabel="Reply rate" values={replyRates} />
      <PieChart
        title="Positive reply mix"
        labels={["C-Suite", "VP", "Director", "Manager", "IC"]}
        values={[22, 28, 26, 16, 8]}
      />
      <LineChart title="Positive replies over time" labels={labels} datasetLabel="Positive replies" values={positiveRates} />
    </div>
  );
}
