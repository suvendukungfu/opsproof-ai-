"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Files,
  DollarSign,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Synthetic Dashboard Telemetry Data
const financialMetrics = [
  {
    title: "Financial Exposure Flagged",
    value: "$14,500.00",
    change: "+$2,850 this week",
    trend: "up",
    icon: DollarSign,
    color: "text-red-600 bg-red-50 border-red-200",
  },
  {
    title: "Active Investigations",
    value: "3 Active",
    change: "1 Critical, 2 Review",
    trend: "neutral",
    icon: ShieldAlert,
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    title: "Reconciled Documents",
    value: "12 Files",
    change: "PDFs, Scans, Spreadsheets",
    trend: "up",
    icon: Files,
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    title: "Audit Provenance Rate",
    value: "100%",
    change: "Zero ungrounded claims",
    trend: "up",
    icon: CheckCircle2,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
];

const discrepancyCategoryData = [
  { category: "Qty Mismatch", exposure: 10800, count: 2 },
  { category: "Price Drift", exposure: 6300, count: 3 },
  { category: "Unapproved Fee", exposure: 1850, count: 1 },
  { category: "Temp Excursion", exposure: 4200, count: 1 },
  { category: "Tare Weight", exposure: 950, count: 1 },
];

const activeInvestigations = [
  {
    id: "INV-9041",
    title: "Apex Hardware PO-9041 3-Way Match",
    vendor: "Apex Industrial Solutions Inc.",
    scenario: "3-Way Match Discrepancy",
    documents: 3,
    exposure: "$12,650.00",
    severity: "CRITICAL",
    updated: "10 mins ago",
  },
  {
    id: "INV-8812",
    title: "Biopharma Reefer Logistics Batch #409",
    vendor: "Polar Express Cold Logistics",
    scenario: "Cold-Chain Excursion",
    documents: 3,
    exposure: "$4,200.00",
    severity: "CRITICAL",
    updated: "2 hours ago",
  },
  {
    id: "INV-7650",
    title: "Bulk Cement Freight Tare Weight Drift",
    vendor: "Titan Haulage Ltd.",
    scenario: "Weight Tier Variance",
    documents: 2,
    exposure: "$950.00",
    severity: "WARNING",
    updated: "1 day ago",
  },
];

export default function DashboardPage() {
  return (
    <PageShell
      title="Operations Command Center"
      description="Multimodal operations intelligence, automated 3-way reconciliation, and evidence-backed discrepancy audit."
      actions={
        <div className="flex items-center gap-2">
          <Link href="/investigations/new">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium gap-1.5 shadow-sm">
              <Sparkles className="h-4 w-4" />
              <span>Launch Investigation</span>
            </Button>
          </Link>
        </div>
      }
    >
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="bg-white border-slate-200/90 shadow-subtle hover:shadow-hover transition-all">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    {metric.title}
                  </span>
                  <div className={`p-2 rounded-lg border ${metric.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2.5">
                  <div className="text-2xl font-bold tracking-tight text-slate-900">
                    {metric.value}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                    <span>{metric.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Visual Analytics + Hackathon Scenarios */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Exposure by Discrepancy Category Chart (2 Cols) */}
        <Card className="lg:col-span-2 bg-white border-slate-200/90 shadow-subtle">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold text-slate-900">
                  Financial Exposure by Anomaly Category
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Dollar value of detected mismatches between POs, physical delivery notes, and supplier invoices.
                </CardDescription>
              </div>
              <Badge variant="info">Live Gemini Analysis</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={discrepancyCategoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="category" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "#e2e8f0" }} />
                  <YAxis
                    tickFormatter={(val) => `$${val / 1000}k`}
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={{ stroke: "#e2e8f0" }}
                  />
                  <Tooltip
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Financial Exposure"]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      fontSize: "12px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                  <Bar dataKey="exposure" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hackathon Preset Scenarios Quick Launch (1 Col) */}
        <Card className="bg-white border-slate-200/90 shadow-subtle">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
                <Sparkles className="h-4 w-4" />
              </div>
              <CardTitle className="text-base font-semibold text-slate-900">
                Synthetic Scenarios
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              One-click instant demonstration cases with multimodal files.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-1">
            <Link href="/investigations" className="block group">
              <div className="rounded-lg border border-slate-200/80 p-3 hover:border-blue-300 hover:bg-blue-50/40 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">
                    The $12,650 3-Way Match Anomaly
                  </span>
                  <Badge variant="destructive" className="text-[10px]">Critical</Badge>
                </div>
                <p className="mt-1 text-[11px] text-slate-500 leading-snug">
                  PO PDF (500 units) vs. BOL Scan (420 units) vs. Invoice Excel ($135 vs $120).
                </p>
              </div>
            </Link>

            <Link href="/investigations" className="block group">
              <div className="rounded-lg border border-slate-200/80 p-3 hover:border-blue-300 hover:bg-blue-50/40 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">
                    Cold-Chain Reefer Excursion
                  </span>
                  <Badge variant="destructive" className="text-[10px]">Critical</Badge>
                </div>
                <p className="mt-1 text-[11px] text-slate-500 leading-snug">
                  8.6°C sensor spike in CSV violates 4.0°C pharma specification PDF.
                </p>
              </div>
            </Link>

            <Link href="/investigations" className="block group">
              <div className="rounded-lg border border-slate-200/80 p-3 hover:border-blue-300 hover:bg-blue-50/40 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">
                    Freight Tare Weight Variance
                  </span>
                  <Badge variant="warning" className="text-[10px]">Warning</Badge>
                </div>
                <p className="mt-1 text-[11px] text-slate-500 leading-snug">
                  Waybill 1,200 kg vs. Weighbridge certified scale photo 1,740 kg.
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Active Investigations Table */}
      <Card className="bg-white border-slate-200/90 shadow-subtle mt-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-base font-semibold text-slate-900">
                Recent Reconciliation Investigations
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Active packages currently under multimodal cross-examination.
              </CardDescription>
            </div>
            <Link href="/investigations">
              <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700 gap-1 h-8">
                <span>View All Investigations</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Case ID</TableHead>
                <TableHead>Investigation Title</TableHead>
                <TableHead>Counterparty</TableHead>
                <TableHead>Docs</TableHead>
                <TableHead>Financial Risk</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeInvestigations.map((inv) => (
                <TableRow key={inv.id} className="hover:bg-slate-50/70">
                  <TableCell className="font-mono text-xs font-semibold text-slate-700">
                    {inv.id}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900 text-sm">
                      {inv.title}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Scenario: {inv.scenario}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">
                    {inv.vendor}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <Files className="h-3.5 w-3.5 text-slate-400" />
                      {inv.documents}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-sm text-red-600">
                    {inv.exposure}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={inv.severity === "CRITICAL" ? "destructive" : "warning"}
                      className="text-[10px]"
                    >
                      {inv.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/investigations`}>
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1 border-slate-200">
                        <span>Inspect Evidence</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageShell>
  );
}
