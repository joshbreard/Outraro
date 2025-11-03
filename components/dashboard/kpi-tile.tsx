import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import type { KpiTileData } from "@/lib/utils/kpis";

function formatValue(value: number, format: KpiTileData["format"]) {
  if (format === "currency") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  }
  if (format === "percent") {
    return `${(value * 100).toFixed(1)}%`;
  }
  return new Intl.NumberFormat("en-US").format(value);
}

export function KpiTile({ tile }: { tile: KpiTileData }) {
  const delta = tile.previousValue ? tile.currentValue - tile.previousValue : 0;
  const deltaPercent = tile.previousValue ? (delta / tile.previousValue) * 100 : 0;
  const isPositive = delta >= 0;

  return (
    <Card className="space-y-4">
      <div className="text-sm font-medium text-slate-500">{tile.label}</div>
      <div className="text-3xl font-semibold text-slate-900">{formatValue(tile.currentValue, tile.format)}</div>
      {tile.previousValue !== undefined && (
        <div className="flex items-center gap-2 text-sm">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-1",
              isPositive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"
            )}
          >
            {isPositive ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
            {deltaPercent.toFixed(1)}%
          </span>
          <span className="text-slate-500">vs previous period</span>
        </div>
      )}
    </Card>
  );
}
