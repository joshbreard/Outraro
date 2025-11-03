import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DeliverabilityCard() {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Deliverability health</h3>
          <p className="text-sm text-slate-500">Across all sending domains</p>
        </div>
        <Badge variant="secondary">Healthy</Badge>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <div className="text-xs uppercase text-slate-500">Spam rate</div>
          <div className="text-lg font-semibold text-emerald-600">0.9%</div>
        </div>
        <div>
          <div className="text-xs uppercase text-slate-500">Bounce rate</div>
          <div className="text-lg font-semibold text-emerald-600">1.3%</div>
        </div>
        <div>
          <div className="text-xs uppercase text-slate-500">Authentication</div>
          <div className="text-lg font-semibold text-slate-900">SPF / DKIM / DMARC valid</div>
        </div>
      </div>
    </Card>
  );
}
