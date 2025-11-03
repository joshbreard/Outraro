import { Card } from "@/components/ui/card";

export function PersonaSummary() {
  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Persona highlights</h3>
        <p className="text-sm text-slate-500">See who&apos;s responding most.</p>
      </div>
      <ul className="space-y-2 text-sm text-slate-600">
        <li>
          <strong>38%</strong> Director-level ICs in SaaS
        </li>
        <li>
          <strong>27%</strong> VP Sales / Revenue
        </li>
        <li>
          <strong>19%</strong> Marketing leaders in B2B tech
        </li>
      </ul>
    </Card>
  );
}
