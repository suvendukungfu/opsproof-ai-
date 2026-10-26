"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ShieldAlert,
  ArrowLeft,
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  CheckCircle2,
  MessageSquare,
  Printer,
  ChevronRight,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function InvestigationDetailPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "INV-9041";
  const [activeDocTab, setActiveDocTab] = React.useState<"po" | "bol" | "inv">("bol");
  const [selectedAlert, setSelectedAlert] = React.useState<number>(0);

  const alerts = [
    {
      id: "ALT-01",
      category: "QUANTITY_MISMATCH",
      severity: "CRITICAL",
      title: "Physical Delivery Shortfall: 80 Units Missing",
      financialExposure: "$10,800.00",
      description:
        "The vendor invoice billed for 500 units @ $135.00 ($67,500.00), but the physical receiving clerk stamp on the Bill of Lading scan certifies only 420 units were received (80 units short).",
      provenance: {
        docName: "BOL-Scan-Receiving-Slip.png",
        page: 1,
        coordinates: "Box [320, 150, 410, 520]",
        snippet: "DELIVERED: 420 UNITS / STAMPED & SIGNED BY WAREHOUSE CLERK M.T.",
      },
      docTab: "bol" as const,
    },
    {
      id: "ALT-02",
      category: "UNIT_PRICE_VARIANCE",
      severity: "CRITICAL",
      title: "Unauthorized Unit Price Drift: +$15.00/unit",
      financialExposure: "$7,500.00",
      description:
        "Authorized Purchase Order PO-9041 stipulates an agreed contract rate of $120.00 per unit. Vendor billing spreadsheet quietly billed at $135.00 per unit without an approved change order.",
      provenance: {
        docName: "Invoice-Apex-Consolidated.xlsx",
        page: 1,
        coordinates: "Cell Sheet1!D14",
        snippet: "Industrial Sensor Module X1 | Qty: 500 | Rate: $135.00 | Total: $67,500.00",
      },
      docTab: "inv" as const,
    },
    {
      id: "ALT-03",
      category: "UNAPPROVED_SURCHARGE",
      severity: "WARNING",
      title: "Unapproved Freight Expedite Fee: $1,850.00",
      financialExposure: "$1,850.00",
      description:
        "Vendor added line item 'Fuel & Expedite Emergency Surcharge'. Master purchase order terms specify FOB Destination with freight included.",
      provenance: {
        docName: "Invoice-Apex-Consolidated.xlsx",
        page: 1,
        coordinates: "Cell Sheet1!D18",
        snippet: "Fuel & Expedite Surcharge | Rate: $1,850.00",
      },
      docTab: "inv" as const,
    },
  ];

  return (
    <PageShell
      title={`Investigation Studio: ${caseId}`}
      description="Multimodal evidence provenance canvas reconciling Purchase Order, Bill of Lading, and Invoice claims."
      badge={<Badge variant="destructive" className="text-xs">CRITICAL RISK</Badge>}
      actions={
        <div className="flex items-center gap-2">
          <Link href="/investigations">
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1 border-slate-200">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Cases</span>
            </Button>
          </Link>
          <Link href="/reports">
            <Button size="sm" className="h-8 text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium">
              <Printer className="h-3.5 w-3.5" />
              <span>Export Dossier</span>
            </Button>
          </Link>
        </div>
      }
    >
      {/* Financial Leakage Banner */}
      <div className="mb-6 rounded-xl border border-red-200 bg-red-50/60 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-600 text-white shadow-sm">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-red-900 uppercase tracking-wider">
                  Total Financial Exposure
                </span>
                <span className="text-lg font-bold text-red-600">
                  $12,650.00
                </span>
              </div>
              <p className="text-xs text-red-700 mt-0.5">
                3 high-confidence discrepancies detected between supplier invoice and warehouse receipts.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              className="bg-slate-900 text-white hover:bg-slate-800 text-xs h-8 gap-1.5"
            >
              <MessageSquare className="h-3.5 w-3.5 text-blue-400" />
              <span>Ask Gemini Copilot</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Split Studio: Discrepancy Ledger (Left) vs. Multimodal Viewer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Discrepancy Ledger (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-sm font-semibold text-slate-900">
              Detected Discrepancies ({alerts.length})
            </h3>
            <span className="text-xs text-slate-400">Click to locate evidence</span>
          </div>

          {alerts.map((alert, index) => {
            const isSelected = selectedAlert === index;
            return (
              <Card
                key={alert.id}
                onClick={() => {
                  setSelectedAlert(index);
                  setActiveDocTab(alert.docTab);
                }}
                className={`cursor-pointer transition-all bg-white border ${
                  isSelected
                    ? "border-blue-500 ring-2 ring-blue-500/10 shadow-sm"
                    : "border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={alert.severity === "CRITICAL" ? "destructive" : "warning"}
                      className="text-[10px]"
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-xs font-bold text-red-600">
                      {alert.financialExposure}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {alert.title}
                  </h4>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {alert.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono text-slate-400">{alert.provenance.coordinates}</span>
                    <span className="text-blue-600 font-medium flex items-center gap-0.5">
                      <span>View in {alert.provenance.docName.split(".")[0]}</span>
                      <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Right: Multimodal Evidence Viewer (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <Card className="bg-white border-slate-200/90 shadow-subtle flex flex-col h-[640px]">
            {/* Viewer Header Tabs */}
            <div className="border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-1.5">
                <Button
                  variant={activeDocTab === "bol" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveDocTab("bol")}
                  className="h-7 text-xs gap-1.5 font-medium"
                >
                  <ImageIcon className="h-3.5 w-3.5 text-purple-600" />
                  <span>BOL Scan (Receiving Slip)</span>
                </Button>
                <Button
                  variant={activeDocTab === "po" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveDocTab("po")}
                  className="h-7 text-xs gap-1.5 font-medium"
                >
                  <FileText className="h-3.5 w-3.5 text-red-500" />
                  <span>PO-9041.pdf</span>
                </Button>
                <Button
                  variant={activeDocTab === "inv" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveDocTab("inv")}
                  className="h-7 text-xs gap-1.5 font-medium"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Invoice.xlsx</span>
                </Button>
              </div>

              <div className="text-[11px] text-slate-400 font-mono">
                100% Provenance Match
              </div>
            </div>

            {/* Document Content Simulation Canvas */}
            <div className="flex-1 overflow-auto p-6 bg-slate-100/70 flex items-center justify-center">
              {activeDocTab === "bol" && (
                <div className="relative w-full max-w-md bg-white border border-slate-300 rounded shadow-md p-6 font-mono text-[11px] text-slate-700 space-y-3">
                  <div className="border-b border-slate-200 pb-2">
                    <p className="font-bold text-xs text-slate-900">GLOBAL FREIGHT LOGISTICS - BILL OF LADING</p>
                    <p className="text-[10px] text-slate-400">Waybill #BOL-9041-A | Date: Oct 21, 2026</p>
                  </div>
                  <div>
                    <p>SHIP TO: Global Logistics Corp, Dock 4</p>
                    <p>VENDOR: Apex Industrial Solutions Inc.</p>
                  </div>
                  <div className="py-2 border-y border-slate-200">
                    <p>Item: Industrial Sensor Module X1</p>
                    <p>Manifest Declared Qty: 500 units</p>
                  </div>

                  {/* Pulsing Highlight Box around receiving stamp */}
                  <div className="p-3 rounded border-2 border-red-500 bg-red-50/70 relative ring-4 ring-red-500/20">
                    <span className="absolute -top-2.5 right-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                      Evidence Highlight
                    </span>
                    <p className="font-bold text-red-900">PHYSICAL RECEIVING CLERK STAMP:</p>
                    <p className="text-red-800">&quot;RECEIVED ONLY 420 UNITS ON PALLET #1-4.&quot;</p>
                    <p className="text-red-700 text-[10px]">Shortfall: 80 units damaged/unloaded.</p>
                    <p className="text-slate-500 text-[10px] mt-1">Verified Clerk: M. Torres | 14:15 PM</p>
                  </div>

                  <p className="text-[10px] text-slate-400 text-center pt-2">
                    Source: Scanned delivery slip camera image (SHA-256 verified)
                  </p>
                </div>
              )}

              {activeDocTab === "po" && (
                <div className="w-full max-w-md bg-white border border-slate-300 rounded shadow-md p-6 text-xs text-slate-700 space-y-3">
                  <div className="border-b border-slate-200 pb-2">
                    <p className="font-bold text-slate-900">AUTHORIZED PURCHASE ORDER</p>
                    <p className="text-[11px] text-slate-400">PO Number: PO-2026-9041</p>
                  </div>
                  <p>Authorized Rate: <strong>$120.00 / unit</strong></p>
                  <p>Authorized Quantity: <strong>500 units</strong></p>
                  <p>Authorized Total: <strong>$60,000.00</strong></p>
                  <p className="text-slate-500 text-[11px]">Freight Terms: FOB Destination (Included)</p>
                </div>
              )}

              {activeDocTab === "inv" && (
                <div className="w-full max-w-lg bg-white border border-slate-300 rounded shadow-md p-4 text-xs">
                  <p className="font-bold text-slate-900 mb-2">Invoice-Apex-Consolidated.xlsx (Sheet1)</p>
                  <div className="border border-slate-200 rounded divide-y divide-slate-100 font-mono text-[11px]">
                    <div className="grid grid-cols-4 p-2 bg-slate-50 font-bold text-slate-600">
                      <span>Row</span>
                      <span>Item</span>
                      <span>Qty</span>
                      <span>Rate</span>
                    </div>
                    <div className="grid grid-cols-4 p-2 bg-red-50/80 text-red-900 font-semibold border-l-4 border-red-500">
                      <span>Row 14</span>
                      <span>Sensor X1</span>
                      <span>500</span>
                      <span>$135.00 *</span>
                    </div>
                    <div className="grid grid-cols-4 p-2 bg-amber-50/80 text-amber-900 font-semibold border-l-4 border-amber-500">
                      <span>Row 18</span>
                      <span>Fuel Surcharge</span>
                      <span>1</span>
                      <span>$1,850.00 *</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">* Flagged by OpsProof AI reconciliation rules.</p>
                </div>
              )}
            </div>

            {/* Bottom Provenance Footnote */}
            <div className="border-t border-slate-200 px-4 py-2.5 text-xs text-slate-500 bg-white flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Active Anchor: {alerts[selectedAlert].provenance.coordinates}</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                gemini-2.5-flash verified
              </span>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
