import { PersonaChart } from "@/components/personas/persona-chart";
import { PersonaSummary } from "@/components/personas/persona-summary";

export default function PersonasPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <PersonaChart />
      <PersonaSummary />
    </div>
  );
}
