import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { DashboardNav } from "@/components/layout/dashboard-nav";
import { DashboardSessionProvider } from "@/components/layout/session-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { UserMenu } from "@/components/layout/user-menu";
import { Card } from "@/components/ui/card";
import { authConfig } from "@/lib/auth";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/signin");
  }

  return (
    <DashboardSessionProvider session={session}>
      <div className="flex min-h-screen flex-col bg-slate-100">
        <DashboardNav />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Welcome back, {session.user?.name ?? "Client"}</h1>
                <p className="text-sm text-slate-500">Here&apos;s a quick overview of your outbound performance.</p>
              </div>
              <div className="hidden lg:block">
                <UserMenu />
              </div>
            </div>
            <Suspense fallback={<Card>Loading dashboard...</Card>}>
              <div className="space-y-6">{children}</div>
            </Suspense>
          </main>
        </div>
      </div>
    </DashboardSessionProvider>
  );
}
