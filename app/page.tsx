import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-widest text-slate-300">Outraro</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Client Dashboard</h1>
        <p className="mt-4 text-lg text-slate-300">
          Monitor outbound performance, review messaging, and stay aligned on pipeline impact—all in one place.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild size="lg" variant="default">
          <Link href="/dashboard">Enter dashboard</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/dashboard/templates">Review messaging</Link>
        </Button>
      </div>
    </main>
  );
}
