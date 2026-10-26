"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  PlusCircle,
  Files,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface InvestigationItem {
  id: string;
  title: string;
  scenario: string;
  counterparty: string;
  date: string;
  exposure: string;
  discrepanciesCount: number;
  severity: "CRITICAL" | "WARNING" | "INFO";
  status: "OPEN" | "IN_REVIEW" | "RESOLVED";
  documentsCount: number;
  summary: string;
}

const mockInvestigations: InvestigationItem[] = [
  {
    id: "INV-9041",
    title: "Apex Hardware PO-9041 3-Way Match Investigation",
    scenario: "3-Way Match Anomaly",
    counterparty: "Apex Industrial Solutions Inc.",
    date: "Oct 24, 2026",
    exposure: "$12,650.00",
    discrepanciesCount: 3,
    severity: "CRITICAL",
    status: "OPEN",
    documentsCount: 3,
    summary:
      "Cross-document reconciliation detected 80-unit delivery shortfall against billed quantity, unauthorized $15/unit rate drift, and unapproved $1,850 fuel surcharge.",
  },
  {
    id: "INV-8812",
    title: "Biopharma Cold-Chain Reefer Excursion Batch #409",
    scenario: "Cold-Chain Quality Violation",
    counterparty: "Polar Express Cold Logistics",
    date: "Oct 23, 2026",
    exposure: "$4,200.00",
    discrepanciesCount: 2,
    severity: "CRITICAL",
    status: "IN_REVIEW",
    documentsCount: 3,
    summary:
      "Cargo temperature log in CSV reveals an 8.6°C excursion for 180 consecutive minutes, directly violating the 4.0°C maximum threshold declared in the Quality Spec PDF.",
  },
  {
    id: "INV-7650",
    title: "Bulk Cement Freight Tare Weight Variance",
    scenario: "Tare Weight Discrepancy",
    counterparty: "Titan Haulage Ltd.",
    date: "Oct 22, 2026",
    exposure: "$950.00",
    discrepanciesCount: 1,
    severity: "WARNING",
    status: "OPEN",
    documentsCount: 2,
    summary:
      "Waybill stated gross weight of 1,200 kg is refuted by the automated certified weighbridge ticket photo showing 1,740 kg (+540 kg overload risk).",
  },
  {
    id: "INV-5120",
    title: "Quarterly Hardware Fasteners Routine Reconciliation",
    scenario: "Standard Compliance Pass",
    counterparty: "Pacific Fasteners Corp.",
    date: "Oct 19, 2026",
    exposure: "$0.00",
    discrepanciesCount: 0,
    severity: "INFO",
    status: "RESOLVED",
    documentsCount: 4,
    summary:
      "All line items, receiving quantities, unit prices, and sales taxes reconciled with 100% agreement. Zero discrepancies flagged.",
  },
];

export default function InvestigationsPage() {
  const [filter, setFilter] = React.useState<"ALL" | "CRITICAL" | "RESOLVED">("ALL");

  const filteredItems = mockInvestigations.filter((item) => {
    if (filter === "CRITICAL") return item.severity === "CRITICAL";
    if (filter === "RESOLVED") return item.status === "RESOLVED";
    return true;
  });

  return (
    <PageShell
      title="Investigation Cases"
      description="Active multimodal investigation dossiers reconciling cross-document claims, provenance coordinates, and financial exposure."
      badge={<Badge variant="warning" className="text-xs">3 Action Required</Badge>}
      actions={
        <Link href="/investigations/new">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 shadow-sm">
            <PlusCircle className="h-4 w-4" />
            <span>New Investigation</span>
          </Button>
        </Link>
      }
    >
      {/* Filter Chips */}
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant={filter === "ALL" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("ALL")}
          className="h-8 text-xs font-medium"
        >
          All Cases ({mockInvestigations.length})
        </Button>
        <Button
          variant={filter === "CRITICAL" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("CRITICAL")}
          className="h-8 text-xs font-medium gap-1 text-red-700 hover:text-red-800"
        >
          <AlertTriangle className="h-3 w-3 text-red-600" />
          <span>Critical Exposure (2)</span>
        </Button>
        <Button
          variant={filter === "RESOLVED" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("RESOLVED")}
          className="h-8 text-xs font-medium gap-1 text-emerald-700"
        >
          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
          <span>Resolved / Clean (1)</span>
        </Button>
      </div>

      {/* Investigation Dossier Cards */}
      <div className="space-y-4">
        {filteredItems.map((inv) => (
          <Card
            key={inv.id}
            className="bg-white border-slate-200/90 shadow-subtle hover:border-slate-300 hover:shadow-hover transition-all"
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Left: Metadata & Summary */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {inv.id}
                    </span>
                    <Badge
                      variant={
                        inv.severity === "CRITICAL"
                          ? "destructive"
                          : inv.severity === "WARNING"
                          ? "warning"
                          : "success"
                      }
                      className="text-[11px]"
                    >
                      {inv.severity}
                    </Badge>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {inv.scenario}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900">
                    {inv.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {inv.summary}
                  </p>

                  <div className="flex items-center gap-4 pt-2 text-xs text-slate-500">
                    <span>Counterparty: <strong className="text-slate-700">{inv.counterparty}</strong></span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Files className="h-3.5 w-3.5 text-slate-400" />
                      {inv.documentsCount} Documents
                    </span>
                    <span>•</span>
                    <span>{inv.date}</span>
                  </div>
                </div>

                {/* Right: Financial Exposure & Action Button */}
                <div className="flex md:flex-col items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 min-w-[180px]">
                  <div className="text-left md:text-right mb-2">
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                      Financial Exposure
                    </span>
                    <span
                      className={`text-xl font-bold tracking-tight ${
                        inv.exposure !== "$0.00" ? "text-red-600" : "text-emerald-600"
                      }`}
                    >
                      {inv.exposure}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {inv.discrepanciesCount} Discrepanc{inv.discrepanciesCount === 1 ? "y" : "ies"}
                    </span>
                  </div>

                  <Link href={`/investigations/${inv.id}`}>
                    <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white text-xs gap-1.5 h-8">
                      <span>Investigate</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
