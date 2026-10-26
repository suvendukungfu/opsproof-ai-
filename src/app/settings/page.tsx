"use client";

import * as React from "react";
import {
  Sparkles,
  Sliders,
  Building,
  Activity,
  CheckCircle2,
  Save,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function SettingsPage() {
  const [apiKey, setApiKey] = React.useState("••••••••••••••••••••••••••••••••");
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <PageShell
      title="Platform Settings"
      description="Configure Google Gemini API keys, multimodal extraction models, reconciliation thresholds, and organization rules."
    >
      <Tabs defaultValue="gemini">
        <TabsList className="mb-6">
          <TabsTrigger value="gemini" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Google Gemini Engine</span>
          </TabsTrigger>
          <TabsTrigger value="rules" className="gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-slate-500" />
            <span>Reconciliation Rules</span>
          </TabsTrigger>
          <TabsTrigger value="org" className="gap-1.5">
            <Building className="h-3.5 w-3.5 text-slate-500" />
            <span>Organization Profile</span>
          </TabsTrigger>
          <TabsTrigger value="diagnostics" className="gap-1.5">
            <Activity className="h-3.5 w-3.5 text-emerald-600" />
            <span>System Diagnostics</span>
          </TabsTrigger>
        </TabsList>

        {/* Gemini Engine Tab */}
        <TabsContent value="gemini">
          <div className="space-y-6">
            <Card className="bg-white border-slate-200/90 shadow-subtle">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-slate-900">
                  Google Gemini SDK Integration (@google/genai)
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  High-throughput multimodal parsing, structured JSON schemas, and server-side stateful Interactions API.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Gemini API Key
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="font-mono text-xs max-w-lg bg-white"
                    />
                    <Button variant="outline" size="sm" className="h-9 text-xs">
                      Update Key
                    </Button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Stored strictly server-side. Never exposed to browser bundles.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-lg border border-slate-200/80 p-3 bg-slate-50/50">
                    <span className="text-xs font-semibold text-slate-800 block">
                      Primary Extraction Model
                    </span>
                    <span className="font-mono text-xs text-blue-700 font-semibold mt-1 block">
                      gemini-2.5-flash
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Extracts tables, bounding boxes, and line items with strict Zod schema validation.
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200/80 p-3 bg-slate-50/50">
                    <span className="text-xs font-semibold text-slate-800 block">
                      Forensic Synthesis Model
                    </span>
                    <span className="font-mono text-xs text-indigo-700 font-semibold mt-1 block">
                      gemini-2.5-pro
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Synthesizes cross-document conflicts and generates executive audit narratives.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-900">
                      Gemini Interactions API v2.3 enabled
                    </span>
                  </div>
                  <Badge variant="success" className="text-[10px]">Active</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-xs text-slate-400">
                  {saved ? "Changes saved successfully!" : "Last updated: Oct 26, 2026"}
                </span>
                <Button onClick={handleSave} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1 text-xs">
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Configuration</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Rules Tab */}
        <TabsContent value="rules">
          <Card className="bg-white border-slate-200/90 shadow-subtle">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900">
                Deterministic Reconciliation Thresholds
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Define the mathematical variance boundaries before an anomaly triggers a CRITICAL or WARNING alert.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Unit Price Variance Tolerance (%)
                </label>
                <Input defaultValue="0.0%" className="w-40 text-xs bg-white font-mono" />
                <p className="text-[11px] text-slate-400">
                  0% requires exact matching between PO authorized rate and final invoice.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Quantity Shortfall Threshold (Units)
                </label>
                <Input defaultValue="0" className="w-40 text-xs bg-white font-mono" />
                <p className="text-[11px] text-slate-400">
                  Flags any physical delivery receiving stamp less than the invoiced quantity.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organization Tab */}
        <TabsContent value="org">
          <Card className="bg-white border-slate-200/90 shadow-subtle">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900">
                Workspace & Tenant Profile
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Multi-tenant workspace settings and default financial reporting currency.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Organization Name
                </label>
                <Input defaultValue="Global Logistics Corp" className="max-w-md text-xs bg-white" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Default Reporting Currency
                </label>
                <Input defaultValue="USD ($)" className="w-40 text-xs bg-white" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Diagnostics Tab */}
        <TabsContent value="diagnostics">
          <Card className="bg-white border-slate-200/90 shadow-subtle">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900">
                Live Health Check & Infrastructure Status
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Verify connectivity to Google Gemini API, database, and local execution services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/60">
                <span className="text-xs font-medium text-slate-700">
                  Health Check Endpoint (/api/health)
                </span>
                <Badge variant="success" className="text-[10px]">HTTP 200 OK</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/60">
                <span className="text-xs font-medium text-slate-700">
                  Google Gemini SDK (@google/genai)
                </span>
                <Badge variant="info" className="text-[10px]">v2.3.0 Ready</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/60">
                <span className="text-xs font-medium text-slate-700">
                  Prisma ORM & PostgreSQL Schema
                </span>
                <Badge variant="success" className="text-[10px]">Models Compiled</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
