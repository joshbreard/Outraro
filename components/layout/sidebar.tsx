"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/calls", label: "Calls" },
  { href: "/dashboard/email", label: "Email" },
  { href: "/dashboard/deliverability", label: "Deliverability" },
  { href: "/dashboard/personas", label: "Personas" },
  { href: "/dashboard/templates", label: "Messaging" },
  { href: "/dashboard/feed", label: "Feed" },
  { href: "/dashboard/revenue", label: "Revenue" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-6 lg:flex">
      <div className="text-lg font-semibold text-slate-900">Outraro</div>
      <nav className="mt-8 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100",
              pathname === item.href && "bg-slate-900 text-white hover:bg-slate-900"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
