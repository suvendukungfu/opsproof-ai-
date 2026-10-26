"use client";

import * as React from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  Sparkles,
  Trash2,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StagedFile {
  name: string;
  size: string;
  type: "PDF" | "IMAGE" | "EXCEL" | "CSV";
  role: string;
}

export default function NewInvestigationPage() {
  const [title, setTitle] = React.useState("Apex Hardware PO-9041 Reconciliation");
  const [description, setDescription] = React.useState(
    "Cross-reconcile Purchase Order PO-9041 against receiving note scans and supplier invoice."
  );
  const [stagedFiles, setStagedFiles] = React.useState<StagedFile[]>([
    {
      name: "PO-2026-9041.pdf",
      size: "412 KB",
      type: "PDF",
      role: "Authorized Purchase Order",
    },
    {
      name: "BOL-Scan-Receiving-Slip.png",
      size: "2.4 MB",
      type: "IMAGE",
      role: "Physical Receiving Slip Scan",
    },
    {
      name: "Invoice-Apex-Consolidated.xlsx",
      size: "185 KB",
      type: "EXCEL",
      role: "Supplier Invoice Spreadsheet",
    },
  ]);

  const loadScenario = (scenarioNum: number) => {
    if (scenarioNum === 1) {
      setTitle("Apex Hardware PO-9041 Reconciliation");
      setDescription("Cross-reconcile Purchase Order PO-9041 against receiving note scans and supplier invoice.");
      setStagedFiles([
        {
          name: "PO-2026-9041.pdf",
          size: "412 KB",
          type: "PDF",
          role: "Authorized Purchase Order",
        },
        {
          name: "BOL-Scan-Receiving-Slip.png",
          size: "2.4 MB",
          type: "IMAGE",
          role: "Physical Receiving Slip Scan",
        },
        {
          name: "Invoice-Apex-Consolidated.xlsx",
          size: "185 KB",
          type: "EXCEL",
          role: "Supplier Invoice Spreadsheet",
        },
      ]);
    } else if (scenarioNum === 2) {
      setTitle("Cold-Chain Reefer Logistics Incident #409");
      setDescription("Audit temperature compliance during transit against pharmaceutical quality standards.");
      setStagedFiles([
        {
          name: "QualitySpec-ColdChain-Pharma.pdf",
          size: "520 KB",
          type: "PDF",
          role: "Product Quality Specification",
        },
        {
          name: "Reefer-Chamber-Telemetry-409.csv",
          size: "64 KB",
          type: "CSV",
          role: "Temperature Sensor Series",
        },
        {
          name: "Carrier-Acceptance-Receipt.pdf",
          size: "340 KB",
          type: "PDF",
          role: "Carrier Clean Receipt",
        },
      ]);
    }
  };

  const removeFile = (index: number) => {
    setStagedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFormatIcon = (type: StagedFile["type"]) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "IMAGE":
        return <ImageIcon className="h-4 w-4 text-purple-500" />;
      case "EXCEL":
      case "CSV":
        return <FileSpreadsheet className="h-4 w-4 text-emerald-600" />;
    }
  };

  return (
    <PageShell
      title="Create Investigation Dossier"
      description="Upload a multimodal package of operational paperwork or choose a synthetic benchmark scenario for instant evaluation."
    >
      {/* 1-Click Synthetic Scenario Presets */}
      <div className="mb-6 rounded-xl border border-blue-200/80 bg-blue-50/50 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-blue-950">
                Hackathon Synthetic Benchmark Presets
              </h4>
              <p className="text-[11px] text-blue-800">
                Instantly populate pre-configured operational document packages for instant judging.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadScenario(1)}
              className="h-8 text-xs bg-white text-blue-700 border-blue-300 hover:bg-blue-100/60"
            >
              Load Scenario 1 (3-Way Match)
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadScenario(2)}
              className="h-8 text-xs bg-white text-blue-700 border-blue-300 hover:bg-blue-100/60"
            >
              Load Scenario 2 (Cold Chain)
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Details & Uploader (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-slate-200/90 shadow-subtle">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-slate-900">
                Investigation Details
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Define the case parameters and context for Google Gemini cross-examination.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Case Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Apex Hardware PO-9041 Reconciliation"
                  className="text-xs bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Audit Objective & Scope
                </label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Specify counterparty, order numbers, or compliance rules..."
                  className="text-xs bg-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Multimodal Drag-and-Drop Area */}
          <Card className="bg-white border-slate-200/90 shadow-subtle">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">
                Multimodal Document Package
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Drop PDF purchase orders, paper delivery scans, carrier waybills, or billing spreadsheets.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center hover:border-blue-300 hover:bg-blue-50/20 transition-all cursor-pointer">
                <div className="p-3 rounded-full bg-blue-50 text-blue-600 mb-3 ring-8 ring-blue-50/50">
                  <UploadCloud className="h-6 w-6 stroke-[1.75]" />
                </div>
                <p className="text-xs font-semibold text-slate-800">
                  Click to browse or drag and drop document package
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Supported formats: PDF, PNG, JPEG, XLSX, CSV (Max 15MB each, up to 5 files)
                </p>
              </div>

              {/* Staged File Ledger */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-700 block">
                  Package Files ({stagedFiles.length})
                </span>
                <div className="divide-y divide-slate-100 rounded-lg border border-slate-200/80 bg-white">
                  {stagedFiles.map((file, idx) => (
                    <div
                      key={file.name + idx}
                      className="flex items-center justify-between p-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded bg-slate-100 border border-slate-200/60">
                          {getFormatIcon(file.type)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 leading-tight">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {file.role} • {file.size}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                        title="Remove file"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Execution Summary & Launch (1 Col) */}
        <div className="space-y-6">
          <Card className="bg-white border-slate-200/90 shadow-subtle">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">
                Gemini Pipeline Execution
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Automated stages triggered on submission.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2.5 text-xs">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                  1
                </div>
                <div>
                  <strong className="text-slate-800">Files API Ingestion</strong>
                  <p className="text-[11px] text-slate-500">
                    Uploads multi-page PDFs & images via @google/genai Files API.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                  2
                </div>
                <div>
                  <strong className="text-slate-800">Structured OCR & Schemas</strong>
                  <p className="text-[11px] text-slate-500">
                    Extracts tables and bounding boxes using gemini-2.5-flash with Zod schema.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                  3
                </div>
                <div>
                  <strong className="text-slate-800">Cross-Document Reconciliation</strong>
                  <p className="text-[11px] text-slate-500">
                    Matches quantities, rates, and sensor limits to pinpoint evidence.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4 flex flex-col gap-2">
              <Link href="/investigations" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium gap-2 shadow-sm h-10 text-xs">
                  <Sparkles className="h-4 w-4" />
                  <span>Start Reconciliation Analysis</span>
                </Button>
              </Link>
              <Link href="/investigations" className="w-full">
                <Button variant="ghost" className="w-full text-xs text-slate-500 hover:text-slate-900">
                  Cancel
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
