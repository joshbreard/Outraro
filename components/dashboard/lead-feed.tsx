import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const entries = [
  {
    id: "1",
    title: "VP of Marketing",
    company: "Zephyr Labs",
    type: "Positive reply",
    time: "5 minutes ago"
  },
  {
    id: "2",
    title: "Head of Sales",
    company: "Atlas Robotics",
    type: "Meeting booked",
    time: "18 minutes ago"
  },
  {
    id: "3",
    title: "Director of RevOps",
    company: "Northwind",
    type: "Positive reply",
    time: "36 minutes ago"
  }
];

export function LeadFeed() {
  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Live lead feed</h3>
        <p className="text-sm text-slate-500">Latest positive replies and meetings.</p>
      </div>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                {entry.type} with {entry.title} at {entry.company}
              </div>
              <div className="text-xs text-slate-500">{entry.time}</div>
            </div>
            <Badge variant="secondary">Inbox A</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
