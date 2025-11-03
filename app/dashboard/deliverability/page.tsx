import { BarChart } from "@/components/dashboard/charts/bar-chart";
import { DeliverabilityCard } from "@/components/dashboard/deliverability-card";

const labels = ["Domain A", "Domain B", "Domain C", "Domain D"];
const values = [98, 92, 88, 81];

export default function DeliverabilityPage() {
  return (
    <div className="space-y-6">
      <DeliverabilityCard />
      <BarChart title="Inbox health score" labels={labels} values={values} />
    </div>
  );
}
