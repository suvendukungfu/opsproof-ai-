"use client";

import * as React from "react";
import {
  FileText,
  Download,
  Printer,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
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

interface ReportItem {
  id: string;
  title: string;
  caseId: string;
  targetVendor: string;
  exposureAmount: string;
  discrepancies: number;
  generatedDate: string;
  format: "PDF Dossier" | "JSON Package";
  status: "Certified" | "Draft";
}

const mockReports: ReportItem[] = [
  {
    id: "REP-9041-A",
    title: "Forensic Audit Dossier: Apex Industrial Solutions PO-9041 Reconciliation",
    caseId: "INV-9041",
    targetVendor: "Apex Industrial Solutions Inc.",
    exposureAmount: "$12,650.00",
    discrepancies: 3,
    generatedDate: "Oct 24, 2026, 14:32",
    format: "PDF Dossier",
    status: "Certified",
  },
  {
    id: "REP-8812-B",
    title: "Quality Excursion Incident Report: Reefer Telemetry Log #409",
    caseId: "INV-8812",
    targetVendor: "Polar Express Cold Logistics",
    exposureAmount: "$4,200.00",
    discrepancies: 2,
    generatedDate: "Oct 23, 2026, 09:15",
    format: "PDF Dossier",
    status: "Certified",
  },
  {
    id: "REP-7650-C",
    title: "Weighbridge Tare Variance Memorandum: Haulage Waybill #7650",
    caseId: "INV-7650",
    targetVendor: "Titan Haulage Ltd.",
    exposureAmount: "$950.00",
    discrepancies: 1,
    generatedDate: "Oct 22, 2026, 17:40",
    format: "PDF Dossier",
    status: "Certified",
  },
];

export default function ReportsPage() {
  return (
    <PageShell
      title="Audit Reports & Evidence Dossiers"
      description="Legally defensible, exportable investigation dossiers containing itemized discrepancies, pixel-level provenance coordinates, and executive summaries."
      badge={<Badge variant="secondary" className="text-xs">3 Generated</Badge>}
      actions={
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 shadow-sm">
          <FileText className="h-4 w-4" />
          <span>Generate Dossier</span>
        </Button>
      }
    >
      <Card className="bg-white border-slate-200/90 shadow-subtle">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Title</TableHead>
                <TableHead>Related Case</TableHead>
                <TableHead>Target Vendor</TableHead>
                <TableHead>Exposure Cited</TableHead>
                <TableHead>Discrepancies</TableHead>
                <TableHead>Date Certified</TableHead>
                <TableHead className="text-right">Export</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-slate-50/70">
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-xs text-slate-900 leading-tight">
                          {report.title}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {report.id} • {report.format}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs font-semibold text-slate-600">
                    {report.caseId}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 font-medium">
                    {report.targetVendor}
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-red-600">
                    {report.exposureAmount}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">
                    {report.discrepancies} flagged
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {report.generatedDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1 border-slate-200 text-slate-700">
                        <Printer className="h-3 w-3 text-slate-500" />
                        <span>Print</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1 border-slate-200 text-slate-700">
                        <Download className="h-3 w-3 text-slate-500" />
                        <span>JSON</span>
                      </Button>
                    </div>
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
