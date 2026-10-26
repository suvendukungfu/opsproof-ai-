"use client";

import * as React from "react";
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart2,
  Download,
  Calendar,
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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const exposureTrendData = [
  { month: "May", leakageDetected: 4200, leakagePrevented: 4200 },
  { month: "Jun", leakageDetected: 7800, leakagePrevented: 7600 },
  { month: "Jul", leakageDetected: 11400, leakagePrevented: 11400 },
  { month: "Aug", leakageDetected: 9200, leakagePrevented: 9000 },
  { month: "Sep", leakageDetected: 16800, leakagePrevented: 16500 },
  { month: "Oct", leakageDetected: 14500, leakagePrevented: 14500 },
];

const vendorRiskScores = [
  {
    vendor: "Apex Industrial Solutions Inc.",
    discrepancyRate: "28.4%",
    totalVariance: "$12,650.00",
    riskTier: "HIGH",
    accuracyTrend: "Degrading",
  },
  {
    vendor: "Polar Express Cold Logistics",
    discrepancyRate: "16.2%",
    totalVariance: "$4,200.00",
    riskTier: "HIGH",
    accuracyTrend: "Volatile",
  },
  {
    vendor: "Titan Haulage Ltd.",
    discrepancyRate: "8.5%",
    totalVariance: "$950.00",
    riskTier: "MEDIUM",
    accuracyTrend: "Stable",
  },
  {
    vendor: "Pacific Fasteners Corp.",
    discrepancyRate: "0.2%",
    totalVariance: "$0.00",
    riskTier: "LOW",
    accuracyTrend: "Excellent",
  },
];

export default function AnalyticsPage() {
  return (
    <PageShell
      title="Operations & Financial Telemetry"
      description="Holistic performance indicators, supplier risk profiling, and cumulative leakage prevention analytics."
      badge={<Badge variant="info" className="text-xs">Continuous Telemetry</Badge>}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-slate-200">
            <Calendar className="h-3.5 w-3.5 text-slate-500" />
            <span>Last 6 Months</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-slate-200">
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export CSV</span>
          </Button>
        </div>
      }
    >
      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white border-slate-200/90 shadow-subtle">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Cumulative Leakage Prevented</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              $63,200.00
            </div>
            <div className="mt-1 text-xs text-emerald-600 font-medium">
              100% recovered on vendor audits
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/90 shadow-subtle">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Mean Processing Time</span>
              <Zap className="h-4 w-4 text-blue-600" />
            </div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              3.8 Seconds
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Per 3-document multimodal package
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/90 shadow-subtle">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Coordinate Provenance Rate</span>
              <BarChart2 className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              100.0%
            </div>
            <div className="mt-1 text-xs text-indigo-600 font-medium">
              Zero ungrounded hallucinations
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/90 shadow-subtle">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Active Supplier Watchlist</span>
              <TrendingUp className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              2 High-Risk
            </div>
            <div className="mt-1 text-xs text-amber-600 font-medium">
              Apex & Polar Express flagged
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-white border-slate-200/90 shadow-subtle">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900">
              Financial Leakage Intercepted Over Time
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Monthly unauthorized fees and quantity shortfalls flagged vs. recovered.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={exposureTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="leakageGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "#e2e8f0" }} />
                  <YAxis
                    tickFormatter={(val) => `$${val / 1000}k`}
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={{ stroke: "#e2e8f0" }}
                  />
                  <Tooltip
                    formatter={(val) => [`$${Number(val).toLocaleString()}`, "Amount"]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="leakageDetected"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#leakageGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Risk Profile Table */}
        <Card className="bg-white border-slate-200/90 shadow-subtle">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900">
              Vendor Reliability & Error Matrix
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Reconciliation error rates and billing variance tracked by supplier.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Error Rate</TableHead>
                  <TableHead>Variance</TableHead>
                  <TableHead>Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendorRiskScores.map((row) => (
                  <TableRow key={row.vendor} className="hover:bg-slate-50/70">
                    <TableCell className="font-medium text-xs text-slate-800">
                      {row.vendor}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600 font-mono">
                      {row.discrepancyRate}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-red-600">
                      {row.totalVariance}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.riskTier === "HIGH"
                            ? "destructive"
                            : row.riskTier === "MEDIUM"
                            ? "warning"
                            : "success"
                        }
                        className="text-[10px]"
                      >
                        {row.riskTier}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
