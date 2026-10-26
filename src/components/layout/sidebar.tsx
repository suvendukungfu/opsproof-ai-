"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Files,
  ShieldAlert,
  BarChart3,
  FileText,
  Settings,
  PlusCircle,
  Sparkles,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: "info" | "warning" | "default";
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Document Library",
    href: "/documents",
    icon: Files,
    badge: "12",
  },
  {
    title: "Investigations",
    href: "/investigations",
    icon: ShieldAlert,
    badge: "3 Open",
    badgeVariant: "warning",
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Close mobile sidebar on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between">
      {/* Brand & Main Nav */}
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm ring-1 ring-blue-700/20">
              <Sparkles className="h-4.5 w-4.5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-900 tracking-tight text-base">
                  OpsProof
                </span>
                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-200/60">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium -mt-0.5">
                Operations Intelligence
              </p>
            </div>
          </Link>
          <button
            type="button"
            className="md:hidden text-slate-500 hover:text-slate-900"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="px-4">
          <Link href="/investigations/new">
            <Button
              className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-medium text-xs h-9"
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Investigation</span>
            </Button>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="px-3">
          <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Platform
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />
                    <span>{item.title}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[10px] font-medium leading-none",
                        item.badgeVariant === "warning"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-600"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer / System Status */}
      <div className="border-t border-slate-100 p-4 space-y-3">
        {/* Gemini Engine Status Pill */}
        <div className="rounded-lg border border-slate-200/80 bg-slate-50/80 p-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-700">
                Gemini 2.5 Active
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">v2.3 SDK</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 leading-tight">
            Files API & Interactions enabled
          </p>
        </div>

        {/* User / Workspace profile */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
              EA
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-800">
                Enterprise Auditor
              </p>
              <p className="text-[11px] text-slate-400">audit@opsproof.internal</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Trigger Header */}
      <div className="md:hidden flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 text-white">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span className="font-semibold text-slate-900">OpsProof AI</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white transition-transform duration-200 ease-in-out md:hidden shadow-xl",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-slate-200/90 bg-white z-20">
        {sidebarContent}
      </aside>
    </>
  );
}
