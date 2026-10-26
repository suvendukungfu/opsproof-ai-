"use client";

import * as React from "react";
import {
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  Upload,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Download,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DocItem {
  id: string;
  name: string;
  type: "PDF" | "IMAGE" | "EXCEL" | "CSV";
  category: "Purchase Order" | "Bill of Lading" | "Invoice" | "Telemetry" | "Spec";
  investigation: string;
  size: string;
  entitiesExtracted: number;
  uploadedAt: string;
  status: "Parsed & Grounded" | "In Review";
}

const mockDocuments: DocItem[] = [
  {
    id: "DOC-001",
    name: "PO-2026-9041-Industrial-Sensors.pdf",
    type: "PDF",
    category: "Purchase Order",
    investigation: "INV-9041 (Apex Hardware)",
    size: "412 KB",
    entitiesExtracted: 18,
    uploadedAt: "Oct 24, 2026",
    status: "Parsed & Grounded",
  },
  {
    id: "DOC-002",
    name: "BOL-Receiving-Slip-Scanned-Stamp.png",
    type: "IMAGE",
    category: "Bill of Lading",
    investigation: "INV-9041 (Apex Hardware)",
    size: "2.4 MB",
    entitiesExtracted: 12,
    uploadedAt: "Oct 24, 2026",
    status: "Parsed & Grounded",
  },
  {
    id: "DOC-003",
    name: "Invoice-Apex-Consolidated-Q1.xlsx",
    type: "EXCEL",
    category: "Invoice",
    investigation: "INV-9041 (Apex Hardware)",
    size: "185 KB",
    entitiesExtracted: 34,
    uploadedAt: "Oct 24, 2026",
    status: "Parsed & Grounded",
  },
  {
    id: "DOC-004",
    name: "QualitySpec-ColdChain-Pharma-Alpha.pdf",
    type: "PDF",
    category: "Spec",
    investigation: "INV-8812 (Biopharma Reefer)",
    size: "520 KB",
    entitiesExtracted: 22,
    uploadedAt: "Oct 23, 2026",
    status: "Parsed & Grounded",
  },
  {
    id: "DOC-005",
    name: "Reefer-Chamber-Sensor-Telemetry-409.csv",
    type: "CSV",
    category: "Telemetry",
    investigation: "INV-8812 (Biopharma Reefer)",
    size: "64 KB",
    entitiesExtracted: 144,
    uploadedAt: "Oct 23, 2026",
    status: "Parsed & Grounded",
  },
  {
    id: "DOC-006",
    name: "Certified-Weighbridge-Scale-Ticket.jpg",
    type: "IMAGE",
    category: "Bill of Lading",
    investigation: "INV-7650 (Bulk Cement)",
    size: "1.8 MB",
    entitiesExtracted: 8,
    uploadedAt: "Oct 22, 2026",
    status: "Parsed & Grounded",
  },
];

export default function DocumentLibraryPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredDocs = mockDocuments.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.investigation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFormatIcon = (type: DocItem["type"]) => {
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
      title="Document Library"
      description="Central repository of operational documents, multimodal scans, and sensor spreadsheets indexed for reconciliation."
      badge={<Badge variant="secondary" className="text-xs">12 Assets</Badge>}
      actions={
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 shadow-sm">
          <Upload className="h-4 w-4" />
          <span>Upload Multimodal Package</span>
        </Button>
      }
    >
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search documents by filename or case..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 text-xs bg-white border-slate-200"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs text-slate-600 border-slate-200">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter by Type</span>
          </Button>
        </div>
      </div>

      {/* Tabs Layout */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Documents ({mockDocuments.length})</TabsTrigger>
          <TabsTrigger value="pdf">PDF Contracts & POs</TabsTrigger>
          <TabsTrigger value="scans">Scans & Images</TabsTrigger>
          <TabsTrigger value="data">Spreadsheets & Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="bg-white border-slate-200/90 shadow-subtle">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Associated Case</TableHead>
                    <TableHead>Entities Grounded</TableHead>
                    <TableHead>File Size</TableHead>
                    <TableHead>Indexing Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocs.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-slate-50/70">
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded bg-slate-100 border border-slate-200/60">
                            {getFormatIcon(doc.type)}
                          </div>
                          <div>
                            <p className="font-medium text-xs text-slate-900 leading-tight">
                              {doc.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {doc.id} • {doc.uploadedAt}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[11px] font-normal text-slate-600">
                          {doc.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 font-medium">
                        {doc.investigation}
                      </TableCell>
                      <TableCell className="text-xs text-slate-600">
                        <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px] border border-blue-200/50">
                          {doc.entitiesExtracted} fields
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 font-mono">
                        {doc.size}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>{doc.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500" title="Inspect">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500" title="Download">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pdf">
          <Card className="bg-white border-slate-200/90 shadow-subtle p-6 text-center text-xs text-slate-500">
            Filtered view for PDF Contracts and Purchase Orders.
          </Card>
        </TabsContent>
        <TabsContent value="scans">
          <Card className="bg-white border-slate-200/90 shadow-subtle p-6 text-center text-xs text-slate-500">
            Filtered view for Scanned Receipts and Waybill Images.
          </Card>
        </TabsContent>
        <TabsContent value="data">
          <Card className="bg-white border-slate-200/90 shadow-subtle p-6 text-center text-xs text-slate-500">
            Filtered view for Excel Invoices and CSV Telemetry Logs.
          </Card>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
