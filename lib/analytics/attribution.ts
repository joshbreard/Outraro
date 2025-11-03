export interface AttributionRow {
  dealId: string;
  dealName: string;
  value: number;
  status: string;
}

export async function getAttributionLedger(clientAccountId: string): Promise<AttributionRow[]> {
  // TODO: fetch from attribution ledger
  return [
    { dealId: "1", dealName: "Acme", value: 52000, status: "Closed Won" },
    { dealId: "2", dealName: "Globex", value: 34000, status: "Negotiation" }
  ];
}
