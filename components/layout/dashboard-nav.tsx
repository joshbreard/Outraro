"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

import { UserMenu } from "./user-menu";

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

export function DashboardNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 bg-white p-4 lg:hidden">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-slate-900">Outraro</span>
        <div className="flex items-center gap-2">
          <UserMenu />
          <Button variant="ghost" size="icon" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {open && (
        <nav className="mt-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium text-slate-600",
                pathname === item.href && "bg-slate-900 text-white"
              )}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
