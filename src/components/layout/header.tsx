"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Bell, Sparkles, Building2, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b border-slate-200/90 bg-white/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Left: Organization / Workspace context */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Building2 className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Global Logistics Corp</span>
          <span className="text-slate-300">/</span>
          <span>North America Supply Chain</span>
        </div>
      </div>

      {/* Middle: Universal Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search POs, invoices, shipments, or SKUs... (⌘K)"
            className="w-full bg-slate-50/70 pl-9 text-xs h-9 border-slate-200 focus-visible:bg-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right: Quick actions and notifications */}
      <div className="flex items-center gap-2.5">
        {/* Fast Synthetic Demo Trigger */}
        <Link href="/investigations/new">
          <Button
            variant="subtle"
            size="sm"
            className="hidden sm:inline-flex gap-1.5 h-8 text-xs font-semibold"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Load Demo Package</span>
          </Button>
        </Link>

        {/* Documentation Link */}
        <Link
          href="https://ai.google.dev/gemini-api/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-500 hover:text-slate-900"
            title="Google Gemini API Docs"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </Link>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-500 hover:text-slate-900"
            title="Operational Alerts"
          >
            <Bell className="h-4 w-4" />
          </Button>
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
        </div>
      </div>
    </header>
  );
}
