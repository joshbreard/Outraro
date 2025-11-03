import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ledger = [
  { id: "1", deal: "Acme Co.", owner: "Taylor", value: 48000, stage: "Closed Won" },
  { id: "2", deal: "Northwind", owner: "Jordan", value: 36000, stage: "Negotiation" },
  { id: "3", deal: "Globex", owner: "Riley", value: 54000, stage: "Proposal" }
];

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Revenue attribution</h2>
            <p className="text-sm text-slate-500">Track closed won deals influenced by outbound.</p>
          </div>
          <div className="text-2xl font-semibold text-slate-900">$138K</div>
        </div>
        <div className="rounded-lg border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Stage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ledger.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium text-slate-900">{entry.deal}</TableCell>
                  <TableCell>{entry.owner}</TableCell>
                  <TableCell>${entry.value.toLocaleString()}</TableCell>
                  <TableCell>{entry.stage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
