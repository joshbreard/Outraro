export type KpiKey =
  | "callsBooked"
  | "sqls"
  | "pipelineValue"
  | "conversionRate"
  | "openRate"
  | "replyRate"
  | "positiveRate"
  | "meetingsBooked";

export interface KpiTileData {
  key: KpiKey;
  label: string;
  currentValue: number;
  previousValue?: number;
  format: "currency" | "percent" | "number";
}

export async function getMockKpis(): Promise<KpiTileData[]> {
  return [
    {
      key: "pipelineValue",
      label: "Pipeline value",
      currentValue: 325000,
      previousValue: 280000,
      format: "currency"
    },
    {
      key: "callsBooked",
      label: "Calls booked (30d)",
      currentValue: 42,
      previousValue: 36,
      format: "number"
    },
    {
      key: "sqls",
      label: "SQLs generated",
      currentValue: 18,
      previousValue: 14,
      format: "number"
    },
    {
      key: "conversionRate",
      label: "SQL to opp conversion",
      currentValue: 0.34,
      previousValue: 0.28,
      format: "percent"
    }
  ];
}
