import { Card } from "@/components/ui/card";

interface CallCardProps {
  title: string;
  summary: string;
  duration: string;
}

export function CallCard({ title, summary, duration }: CallCardProps) {
  return (
    <Card className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <span className="text-xs text-slate-500">{duration}</span>
      </div>
      <p className="text-sm text-slate-600">{summary}</p>
    </Card>
  );
}
