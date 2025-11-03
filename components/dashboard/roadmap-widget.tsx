import { Card } from "@/components/ui/card";

const roadmap = [
  {
    label: "Next experiment",
    description: "A/B test personalization snippet for enterprise CTOs",
    eta: "Launching next week"
  },
  {
    label: "Upcoming test",
    description: "Warm up new sending domain for APAC",
    eta: "Queued for July"
  },
  {
    label: "Deliverability alert",
    description: "Inbox B trending towards spam in Outlook",
    eta: "Monitoring daily"
  }
];

export function RoadmapWidget() {
  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Roadmap</h3>
        <p className="text-sm text-slate-500">Retention experiments and alerts.</p>
      </div>
      <div className="space-y-4">
        {roadmap.map((item) => (
          <div key={item.label} className="rounded-lg border border-slate-200 p-3">
            <div className="text-sm font-semibold text-slate-900">{item.label}</div>
            <div className="text-sm text-slate-600">{item.description}</div>
            <div className="text-xs text-slate-400">{item.eta}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
