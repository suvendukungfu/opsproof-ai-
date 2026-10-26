# Product Requirements Document (PRD)

## OpsProof AI — Multimodal Operations Intelligence & Evidence Traceability Platform

**Document Version:** 1.0.0  
**Status:** Approved for Implementation Planning  
**Target Milestone:** Hackathon MVP  
**Authors:** Senior Staff AI Engineer, Principal Full-Stack Architect, Technical Product Lead  

---

## 1. Executive Summary

Enterprise logistics, manufacturing, and supply-chain operations run on disconnected, heterogeneous documentation: purchase orders (PDFs), bills of lading (scanned paper receipts/images), freight invoices (spreadsheets/PDFs), and telemetry logs (sensor CSVs). Today, discrepancies across these records—such as short shipments, pricing drift, unapproved surcharges, or cold-chain temperature violations—cost global businesses an estimated **$140+ billion annually** in leakage, delayed settlements, and audit penalties.

Existing Optical Character Recognition (OCR) and robotic process automation (RPA) tools fail because they are brittle, single-document focused, and produce flat text without cross-document reasoning.

**OpsProof AI** is an intelligent, multimodal operations platform powered by **Google Gemini 2.5 Flash / Pro** and the **Gemini Interactions API**. It ingests multimodal operational packages (PDFs, images, spreadsheets), extracts canonical structured entities with strict schema guarantees, executes automated cross-document reconciliation, pinpoints discrepancies with verifiable evidence provenance (page numbers, bounding boxes, cell coordinates), and enables compliance auditors to interrogate discrepancies via a stateful, grounded AI copilot.

---

## 2. Problem Statement & Market Pain Points

| Persona | Current Workflow Pain | Consequence |
| --- | --- | --- |
| **Operations & Logistics Director** | Manually samples <5% of Bills of Lading against Purchase Orders. | Missing inventory is only discovered weeks later during physical warehouse reconciliation. |
| **Accounts Payable Lead** | Performs 3-way matching by toggling between ERP spreadsheets and scanned invoice PDFs. | Erroneous invoices, double-billed line items, and unapproved freight fees slip through unnoticed. |
| **Compliance & Quality Auditor** | Manually reviews sensor logs and shipping certificates for cold-chain or regulated goods. | Excursions (e.g. food/pharma spoilage temps) are buried in hundreds of PDF pages and inspection photos. |

### The Core Failure of Legacy Tools

1. **Unimodal Isolation:** Legacy tools read an invoice or a shipping slip in isolation; they lack multimodal cross-referencing across diverse file formats simultaneously.
2. **Hallucination & Lack of Auditability:** Standard Large Language Model (LLM) wrappers produce ungrounded summaries. Regulated enterprises require an **immutable audit trail** linking every claimed mismatch directly to source pixel coordinates or spreadsheet cells.
3. **Stateless Disconnection:** Auditor follow-up questions require re-uploading and re-analyzing documents from scratch, causing exorbitant latency and token costs.

---

## 3. Product Vision & Value Proposition

OpsProof AI transforms raw, unstructured operational paperwork into **actionable, evidence-backed proof** in seconds:

- **Instant Cross-Document Reconciliation:** Reconciles multi-document operational sets (PO + Bill of Lading + Invoice + Telemetry) simultaneously.
- **100% Provenance & Zero Blind Faith:** Every alert is paired with a visual bounding box, table row, or page reference for instant human verification.
- **Stateful Audit Conversations:** Uses the **Gemini Interactions API** to provide auditors with a fast, conversational copilot that remembers investigation context without token re-ingestion.
- **Financial & Operational Impact Dashboard:** Real-time calculation of monetary exposure, anomaly severity, and vendor risk profiles.

---

## 4. User Personas

### Persona A: Elena Vance — Senior Logistics Operations Director

- **Goal:** Fast clearance of inbound vendor shipments without inventory leakage.
- **Pain Point:** Cannot inspect every delivery note; suppliers frequently ship partial quantities while invoices demand full payment.
- **OpsProof Solution:** Automatic cross-matching between Purchase Orders, Packing Lists, and Receiving Slips with flagged quantity shortfalls.

### Persona B: Marcus Chen — Forensic Compliance & Audit Manager

- **Goal:** Ensure regulatory compliance, SLA enforcement, and error-free external audits.
- **Pain Point:** Proving non-compliance takes hours of digging through scans and contract clauses.
- **OpsProof Solution:** Automated generation of tamper-evident, exportable investigation reports with pixel-level evidence citations.

### Persona C: Priya Patel — Procurement & Accounts Payable Lead

- **Goal:** Stop unauthorized pricing drift and vendor surcharge creep before issuing payment.
- **Pain Point:** Contract unit prices drift between the original master PO and final consolidated invoice.
- **OpsProof Solution:** Automated line-item unit price comparison, detecting unit rate variance, currency mismatches, and phantom line items.

---

## 5. Synthetic Operational Test Domain

To respect enterprise confidentiality and guarantee reproducible hackathon evaluation, OpsProof AI standardizes on **three rich, realistic synthetic enterprise scenarios**:

### Scenario 1: The "Phantom Invoiced Goods" (3-Way Match Discrepancy)

- **Document A (PO):** `PO-2026-9041.pdf` — 500 units of Industrial Sensor Module X1 @ $120.00/unit ($60,000 total).
- **Document B (Bill of Lading / Packing Slip):** `BOL-Scan-9041.png` — Handwritten and stamped receiving slip showing only 420 units delivered (80 units backordered).
- **Document C (Supplier Invoice):** `INV-Apex-1142.xlsx` — Billed for 500 units @ $135.00/unit ($67,500 total) + unapproved "Fuel Expedite Surcharge" of $1,850.
- **Detected Discrepancies:**
  1. *Quantity Mismatch:* Invoiced 500 units vs. 420 units physically delivered (Leakage: $10,800.00).
  2. *Unit Price Drift:* Invoiced @ $135.00 vs. PO authorized rate @ $120.00 (Variance: +$15.00/unit).
  3. *Unapproved Surcharge:* Fuel Expedite fee not authorized in master PO.

### Scenario 2: Cold-Chain Temperature Excursion (Pharma/Perishable Logistics)

- **Document A (Quality Standard Specification):** `ColdChain-Spec-Alpha.pdf` — Maximum temperature limit strictly 4.0°C; maximum cumulative excursion limit 60 minutes.
- **Document B (Telemetry Log):** `Reefer-Sensor-Log-409.csv` — Time-series data showing cargo chamber rose to 8.6°C for 180 consecutive minutes.
- **Document C (Carrier Delivery Certificate):** `Carrier-Acceptance-Certificate.pdf` — Clean receipt claiming "Shipment maintained in compliant environmental range".
- **Detected Discrepancy:** Direct violation of Quality Standard with evidence points correlated between sensor CSV timestamp and carrier document declarations.

### Scenario 3: Weight & Freight Tier Discrepancy

- **Document A (Freight Waybill Scan):** Stated gross weight 1,200 kg.
- **Document B (Weighbridge Scale Photo / Ticket):** Certified automated weighbridge reading 1,740 kg.
- **Detected Discrepancy:** 540 kg underweight declaration causing safety violation and carrier penalty exposure.

---

## 6. Functional Requirements (FR)

### FR-1: Multimodal Ingestion Engine

- **FR-1.1:** Support file uploads of PDF (`application/pdf`), images (`image/png`, `image/jpeg`, `image/webp`), and spreadsheets (`text/csv`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`).
- **FR-1.2:** Multi-file drag-and-drop packaging into an isolated "Investigation Case".
- **FR-1.3:** Instant synthetic preset loader: A 1-click button to load pre-packaged scenarios (Scenario 1, Scenario 2, Scenario 3) for instant hackathon evaluation.

### FR-2: Schema-Enforced Information Extraction

- **FR-2.1:** Utilize Google Gemini 2.5 Flash via `@google/genai` with `responseMimeType: "application/json"` and strict `responseJsonSchema`.
- **FR-2.2:** Extract canonical operational entities:
  - Document metadata (Number, Date, Counterparties, Currency).
  - Line items (SKU, Description, Quantity, Unit, Unit Price, Total Price, Tax).
  - Terms & Logistics (Payment Terms, Shipping Method, Incoterms, Tracking IDs).
  - Sensor/Metric Readings (Timestamp, Metric Type, Value, Unit, Threshold).

### FR-3: Cross-Document Discrepancy Analysis

- **FR-3.1:** Execute deterministic cross-document reconciliation rules:
  - PO Quantity vs. BOL Received Quantity vs. Invoice Billed Quantity.
  - PO Agreed Unit Price vs. Invoice Unit Price.
  - Total Sum Reconciliation (Sum of line items + taxes vs. Invoice Total).
  - Telemetry Log Values vs. Quality Specification Thresholds.
- **FR-3.2:** Execute semantic discrepancy reasoning using Gemini 2.5 Pro for subtle clause conflicts (e.g., conflicting delivery terms or missing return authorizations).
- **FR-3.3:** Categorize discrepancies by severity: `CRITICAL` (direct financial loss or regulatory violation), `WARNING` (potential delay or documentation mismatch), `INFO` (minor formatting differences).

### FR-4: Pinpoint Evidence Traceability & Provenance

- **FR-4.1:** Every extracted entity and discrepancy alert must retain provenance metadata:
  - `documentId`: ID of source file.
  - `pageNumber`: 1-based page index (for PDFs).
  - `boundingBox`: Normalized pixel coordinates `[ymin, xmin, ymax, xmax]` (for images and visual PDFs).
  - `cellReference`: Cell address e.g. `Sheet1!C14` (for spreadsheets).
  - `verbatimSnippet`: Exact textual phrase in the original source.
- **FR-4.2:** Interactive UI document viewer: Clicking an alert automatically scrolls the viewer to the exact page and highlights the corresponding bounding box/row.

### FR-5: Conversational Investigation Copilot (Gemini Interactions API)

- **FR-5.1:** Embedded investigative chat drawer allowing auditors to query the case (e.g., *"Why was the Apex invoice flagged?"*, *"Did the driver report the temperature spike?"*).
- **FR-5.2:** Implement with the **Gemini Interactions API** (`ai.interactions.create`) using `previous_interaction_id` to manage conversation state seamlessly on the server.
- **FR-5.3:** The copilot responses must cite specific document names and line items as hyperlinked evidence chips.

### FR-6: Analytics & Financial Exposure Dashboard

- **FR-6.1:** Real-time visual metrics powered by **Recharts**:
  - Total Financial Exposure ($ flagged across all open cases).
  - Discrepancy Severity Distribution (Donut / Bar chart).
  - Line-Item Price Variance Analysis (Waterfall / Bar chart).
  - Document Quality & Confidence Distribution.

### FR-7: Exportable Audit Investigation Report

- **FR-7.1:** Generate an executive-ready Investigation Summary Report.
- **FR-7.2:** Include case metadata, financial exposure breakdown, itemized discrepancy ledger, and full evidence provenance logs.
- **FR-7.3:** Support client-side print/PDF export and JSON export.

---

## 7. Non-Functional Requirements (NFR)

- **NFR-1 (Processing Speed):** Full multi-document package extraction (3-5 documents) completes in < 15 seconds using parallel Gemini 2.5 Flash invocations.
- **NFR-2 (Accuracy & Hallucination Prevention):** Zero ungrounded alerts. If an entity cannot be traced to source text or visual pixels, it cannot be asserted as a discrepancy.
- **NFR-3 (Data Privacy & Synthetic Rigor):** Zero real PII or customer data processed. Pure synthetic data generation with strict schema enforcement.
- **NFR-4 (UI/UX Aesthetics):** Designed to top-tier enterprise standards: dark-mode primary, glassmorphic accents, high-contrast badges for alert severity, silky smooth micro-interactions, responsive layout.
- **NFR-5 (Resilience):** Graceful fallbacks for network interruptions; clear error toasts; idempotent processing jobs.

---

## 8. Success Criteria for Hackathon Submission

1. **Instant First-Click Delight:** Judges can click "Load 3-Way Match Anomaly Demo" and view a fully analyzed, multi-document investigation with 0 manual uploads required.
2. **Deep Multimodal Evidence:** Visual bounding-box proof on both scanned images and PDFs, paired with spreadsheet row highlighting.
3. **Advanced Gemini Feature Adoption:**
   - Unified official `@google/genai` SDK.
   - Structured JSON outputs via `responseJsonSchema`.
   - Native Gemini Files API for large multi-page PDFs.
   - Stateful multi-turn investigation dialogue using the **Gemini Interactions API**.
4. **Production-Grade Engineering:** Strict TypeScript types, comprehensive Zod validation, Prisma schema with foreign key integrity, and a clean test suite.
