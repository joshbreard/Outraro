import { CallCard } from "@/components/call-library/call-card";
import { CallUpload } from "@/components/call-library/call-upload";
import { Card } from "@/components/ui/card";

const calls = [
  {
    id: "1",
    title: "Discovery with Atlas Robotics",
    summary: "Great fit. Interested in pilot focused on outbound to mid-market.",
    duration: "32m"
  },
  {
    id: "2",
    title: "Demo with Zephyr Labs",
    summary: "Strong need around data enrichment. Next steps scheduled.",
    duration: "27m"
  }
];

export default function CallsPage() {
  return (
    <div className="space-y-6">
      <Card className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">Calls booked</h2>
        <p className="text-sm text-slate-500">
          Track total calls, listen to recordings, and review AI-generated insights before next steps.
        </p>
      </Card>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {calls.map((call) => (
            <CallCard key={call.id} title={call.title} summary={call.summary} duration={call.duration} />
          ))}
        </div>
        <CallUpload />
      </div>
    </div>
  );
}
