import type { KpiTileData } from "@/lib/utils/kpis";
import { KpiTile } from "./kpi-tile";

export function KpiGrid({ tiles }: { tiles: KpiTileData[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {tiles.map((tile) => (
        <KpiTile key={tile.key} tile={tile} />
      ))}
    </div>
  );
}
