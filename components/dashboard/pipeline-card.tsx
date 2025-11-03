import { Card } from "@/components/ui/card";

export function PipelineCard() {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Pipeline created this quarter</h3>
          <p className="text-sm text-slate-500">Attributed to Outraro outreach</p>
        </div>
        <span className="text-3xl font-semibold text-slate-900">$325K</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <div className="text-xs uppercase text-slate-500">Meetings</div>
          <div className="text-lg font-semibold text-slate-900">48</div>
        </div>
        <div>
          <div className="text-xs uppercase text-slate-500">SQLs</div>
          <div className="text-lg font-semibold text-slate-900">26</div>
        </div>
        <div>
          <div className="text-xs uppercase text-slate-500">Opportunities</div>
          <div className="text-lg font-semibold text-slate-900">12</div>
        </div>
      </div>
    </Card>
  );
}
