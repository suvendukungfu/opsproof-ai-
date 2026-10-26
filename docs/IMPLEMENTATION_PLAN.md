# Implementation Plan & Hackathon Demonstration Strategy

## OpsProof AI — Multimodal Operations Intelligence Platform

**Document Version:** 1.0.0  
**Target Delivery Window:** 48-Hour Hackathon Execution  
**Role:** Technical Product Lead & Principal Architect  

---

## Part 1: Milestone-Based Implementation Plan

The implementation is broken down into structured, sequential milestones designed to maximize velocity while guaranteeing verifiable, tested quality at every step.

```
Milestone 0 ➔ Milestone 1 ➔ Milestone 2 ➔ Milestone 3 ➔ Milestone 4 ➔ Milestone 5 ➔ Milestone 6 ➔ Milestone 7 ➔ Milestone 8
(Scaffold)    (DB & Seeds)   (Ingestion)   (Gemini SDK)  (Recon Engine)(Interactions) (UI/UX Viewer)(Reports/Export)(Deploy & Polish)
```

---

### Milestone 0: Project Inception & Technical Scaffolding (Hours 0 - 3)
- **Goal:** Initialize high-performance Next.js 15 App Router codebase with Tailwind CSS, shadcn/ui components, and strict TypeScript types.
- **Tasks:**
  1. Initialize Next.js project with App Router, TypeScript, ESLint, and Tailwind CSS.
  2. Install foundational dependencies:
     - `@google/genai` (official Google Gen AI SDK v2.3+)
     - `@prisma/client`, `prisma`
     - `zod`, `zod-to-json-schema`
     - `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`
     - `recharts` (analytics charts)
     - `xlsx` (Excel parsing)
     - `pdf-lib` / `canvas` or visual PDF renderers for bounding-box preview
  3. Configure shadcn/ui design tokens, dark-mode CSS variables in `src/app/globals.css`.
  4. Set up `.env.example` with `GEMINI_API_KEY`, `DATABASE_URL`, and `NEXT_PUBLIC_APP_URL`.
- **Exit Criteria:** Clean build (`npm run build`) and lint passing with zero errors.

---

### Milestone 1: Database Foundation & Synthetic Domain Assets (Hours 3 - 6)
- **Goal:** Configure PostgreSQL with Prisma and create realistic synthetic operational assets.
- **Tasks:**
  1. Create `prisma/schema.prisma` with all 10 core models:
     - `Workspace`, `Investigation`, `Document`, `ExtractedEntity`, `DiscrepancyAlert`, `EvidenceProvenance`, `ChatSession`, `ChatMessage`, `AuditLog`.
  2. Run initial migration and generate Prisma Client.
  3. Author the **3 Canonical Synthetic Scenario Bundles** in `public/demo-data/`:
     - **Scenario 1:** 3-Way Reconciliation (`PO-9041.pdf`, `BOL-Scan-9041.png`, `Invoice-Apex-1142.xlsx`).
     - **Scenario 2:** Cold-Chain Excursion (`QualitySpec-ColdChain.pdf`, `Reefer-Sensor-Log.csv`, `Delivery-Cert.pdf`).
     - **Scenario 3:** Tare Weight Variance (`Waybill-Scan.pdf`, `Weighbridge-Scale-Ticket.jpg`).
  4. Implement `prisma/seed.ts` to allow instant DB re-seeding with realistic ground-truth data.
- **Exit Criteria:** `npx prisma db push` and `npx prisma db seed` populate synthetic scenarios successfully.

---

### Milestone 2: Multimodal Ingestion & Document Parser (Hours 6 - 11)
- **Goal:** Build the file upload pipeline and multi-format document preprocessors.
- **Tasks:**
  1. Build `DropzoneUploader` component with drag-and-drop support for PDF, PNG/JPEG, and XLSX/CSV.
  2. Implement `src/app/api/investigations/[id]/documents/upload/route.ts`:
     - Validate MIME types and file sizes.
     - Compute SHA-256 checksums to ensure file integrity.
     - Persist files to storage and create `Document` database records.
  3. Build `src/lib/pipeline/excel-parser.ts`:
     - Ingest CSV and multi-sheet XLSX spreadsheets.
     - Extract tabular data into structured row/cell matrices (`Sheet1!A1:D10`).
  4. Build image and PDF preview generator for visual canvas display.
- **Exit Criteria:** User can upload a mixed batch of PDF, PNG, and XLSX files; documents render cleanly in the UI.

---

### Milestone 3: Google Gen AI Multimodal Extraction Engine (Hours 11 - 18)
- **Goal:** Integrate `@google/genai` to extract structured JSON entities with coordinate provenance.
- **Tasks:**
  1. Configure `GoogleGenAI` singleton in `src/lib/gemini/client.ts`.
  2. Implement Gemini Files API integration (`ai.files.upload`) for large PDFs and high-res scans in `src/lib/gemini/file-manager.ts`.
  3. Build `src/lib/gemini/extraction.ts`:
     - Use `gemini-2.5-flash` with `responseMimeType: "application/json"` and `responseJsonSchema`.
     - Extract document numbers, line items, pricing, quantities, timestamps, and bounding boxes `[ymin, xmin, ymax, xmax]`.
  4. Store parsed results in `ExtractedEntity` table with high confidence scores.
- **Exit Criteria:** Invoking extraction on `PO-9041.pdf` and `BOL-Scan-9041.png` produces valid, typed JSON matching the Zod schema with zero validation failures.

---

### Milestone 4: Cross-Document Reconciliation & Provenance Engine (Hours 18 - 25)
- **Goal:** Detect cross-document discrepancies and attach pixel/cell coordinates.
- **Tasks:**
  1. Build `src/lib/pipeline/reconciliation-engine.ts`:
     - **Rule 1 (Quantity Reconciliation):** Compare ordered PO quantity vs. delivered BOL quantity vs. billed Invoice quantity.
     - **Rule 2 (Unit Price Drift):** Flag any difference between authorized PO unit rate and billed invoice unit rate.
     - **Rule 3 (Unauthorized Fees):** Flag line items present on invoice that do not match PO line items or contracts.
     - **Rule 4 (Telemetry Excursion):** Parse time-series sensor readings against maximum specification thresholds.
  2. Build `src/lib/pipeline/provenance-mapper.ts`:
     - Map every detected discrepancy to an `EvidenceProvenance` record.
     - Bind normalized bounding boxes `[ymin, xmin, ymax, xmax]` for visual docs and cell addresses (`Sheet1!C14`) for spreadsheets.
  3. Compute `totalFinancialRisk` and assign severity levels (`CRITICAL`, `WARNING`, `INFO`).
  4. Build `src/lib/gemini/forensic-reasoner.ts`:
     - Call `gemini-2.5-pro` to synthesize an executive summary articulating the business impact and recommending operational remediation.
- **Exit Criteria:** Automatic detection of the $10,800.00 quantity shortfall and $1,850.00 unauthorized surcharge in Scenario 1, with bounding box references.

---

### Milestone 5: Stateful Investigation Copilot (Gemini Interactions API) (Hours 25 - 31)
- **Goal:** Build an interactive auditor copilot using the new Gemini Interactions API (`ai.interactions.create`).
- **Tasks:**
  1. Implement `src/lib/gemini/interactions-chat.ts`:
     - Call `ai.interactions.create` with `model: "gemini-2.5-flash"`.
     - Pass `previous_interaction_id` to maintain multi-turn investigation history without re-sending massive document payloads.
  2. Implement `src/app/api/investigations/[id]/chat/route.ts`:
     - Manage session state in `ChatSession` and `ChatMessage`.
     - Extract cited evidence references from the copilot's answers.
  3. Build `InvestigationChat` UI component:
     - Sliding chat drawer with suggested auditor prompt chips (e.g., *"Break down the $10,800 shortfall"*, *"Show me the delivery stamp"*).
     - Render evidence citation chips that interactively jump to document coordinates when clicked.
- **Exit Criteria:** Auditor can hold a continuous, context-aware conversation about the case; clicking a cited evidence chip focuses the document viewer.

---

### Milestone 6: UI/UX Studio & Interactive Provenance Viewer (Hours 31 - 38)
- **Goal:** Deliver an inspiring, high-polish visual interface featuring the split-view provenance canvas.
- **Tasks:**
  1. Build the **Executive Operations Dashboard**:
     - Key Metrics: Total Financial Exposure, Open Discrepancies, Documents Reconciled, Compliance Score.
     - Recharts Components: Severity distribution donut, line-item price variance waterfall.
  2. Build the **Split-Screen Provenance Studio**:
     - Left pane: Filterable Discrepancy Ledger with severity badges, financial leakage badges, and status toggles.
     - Right pane: Interactive Multimodal Document Viewer.
  3. Implement `BoundingBoxOverlay`:
     - Render SVG highlights over active document canvas based on `[ymin, xmin, ymax, xmax]` coordinates.
     - Pulsing focus animation when a user clicks a discrepancy card.
  4. Implement `SpreadsheetGrid`:
     - Clean, responsive tabular grid highlighting flagged discrepancy cells (e.g., cell `C14` highlighted in red).
- **Exit Criteria:** Flawless split-screen interaction: clicking an alert instantly scrolls to the page and draws a glowing highlight box over the evidence.

---

### Milestone 7: Audit Report Generator, Export & Demo Presets (Hours 38 - 43)
- **Goal:** Provide one-click audit report export and instant demo scenario loading.
- **Tasks:**
  1. Implement `src/app/investigations/[id]/report/page.tsx`:
     - Formal, printable investigation dossier with executive summary, discrepancy ledger, financial impact breakdown, and evidence attachments.
  2. Implement `GET /api/investigations/[id]/export`:
     - Downloadable JSON audit package and print-ready HTML/PDF formatting.
  3. Build `src/app/api/demo/seed/route.ts` and `SyntheticPresetBar`:
     - Top navigation bar allowing judges to switch between Scenario 1, Scenario 2, and Scenario 3 in 1 click.
- **Exit Criteria:** Clean printable report renders; instant demo buttons load complete cases in < 1 second.

---

### Milestone 8: Testing, Polish, Vercel Deployment & Demo Rehearsal (Hours 43 - 48)
- **Goal:** Final quality assurance, automated test execution, production deployment, and presentation rehearsal.
- **Tasks:**
  1. Run unit test suite (Vitest) and Playwright E2E smoke tests.
  2. Deploy to **Vercel** with Neon / Supabase PostgreSQL.
  3. Verify all environment variables and API keys on production URL.
  4. Record backup demo video (60 FPS, high-res) as a contingency.
- **Exit Criteria:** Public live URL working flawlessly, demo rehearsed under 3 minutes.

---

## Part 2: Hackathon Demonstration Strategy

### 1. The 3-Minute Pitch Script

```
[0:00 - 0:30] THE HOOK (The Problem)
"Every day, global enterprises lose billions because paper receipts, PDF invoices, and spreadsheets disagree.
Accounts payable teams manually sample less than 5% of documents. The result? Unapproved price increases, 
short shipments, and phantom fees slip through unnoticed.
Meet OpsProof AI: the first multimodal operations intelligence platform that cross-references all your 
operational paperwork and gives you undeniable, pixel-accurate evidence in seconds."

[0:30 - 1:15] THE MULTIMODAL INGESTION & RECONCILIATION
"Watch this live. We have an operational package: an authorized Purchase Order for 500 sensors at $120 each, 
a messy scanned paper Bill of Lading with a physical receiving stamp, and an Excel invoice from the supplier.
With one click, OpsProof AI ingests all three multimodal formats into Gemini 2.5 Flash using the official 
@google/genai SDK with strict JSON schema enforcement.
In under four seconds, our cross-document engine detects $12,650 in unauthorized financial exposure."

[1:15 - 2:00] THE MAGIC: EVIDENCE PROVENANCE (Traceability)
"Here is where OpsProof AI destroys black-box hallucination. When I click on this Critical Alert: 
'Quantity Mismatch: 80 Units Short', look at the right screen:
OpsProof AI instantly takes us to Page 1 of the scanned Bill of Lading, highlighting the exact physical 
receiving clerk stamp showing only 420 units delivered!
Then, clicking on the 'Unit Price Drift' alert highlights row 14 in the vendor's spreadsheet, where they 
quietly bumped the unit price from $120 to $135. Every single claim has a coordinate-level receipt."

[2:00 - 2:30] GEMINI INTERACTIONS COPILOT
"Now, let's open our Auditor Copilot. Powered by the new Gemini Interactions API, it maintains server-side 
investigation state without re-uploading documents.
Let's ask: 'Why does the Apex invoice show $135 and did they charge freight?'
The copilot streams back an answer citing the exact contract clauses, with interactive evidence chips 
that jump straight to the source when clicked."

[2:30 - 3:00] THE CLOSE & BUSINESS IMPACT
"With one click, we generate an executive-ready, legally defensible Audit Report for our supplier dispute.
OpsProof AI turns days of painful forensic auditing into seconds of automated proof.
Built with Next.js, React 19, Prisma, PostgreSQL, and Google Gemini. Thank you!"
```

---

### 2. Live Demo Risk Mitigation & Fallback Matrix

| Potential Failure Point | Risk Level | Mitigation Strategy |
|---|---|---|
| **Google Gemini API Rate Limit / Network Lag** | Medium | The platform features an intelligent client/server cache. If an external API call times out, pre-processed fallback synthetic fixtures in `/prisma/seed.ts` seamlessly hydrate the state without UI disruption. |
| **Judge Uploads Unsupported File Format** | Low | Dropzone features strict client-side MIME rejection with intuitive badge feedback, while the top bar provides instant 1-click synthetic presets. |
| **Vercel Database Connection Spike** | Low | Prisma Client uses connection pooling (`pgbouncer` compatible connection string) and connection limit caps. |
| **Live Internet Outage during Pitch** | Medium | Full local development build (`npm run dev`) runs concurrently on the presenter laptop; 1080p 60fps walkthrough video stored locally on desktop. |

---

### 3. Hackathon Evaluation Rubric Alignment

| Judging Criterion | How OpsProof AI Wins |
|---|---|
| **Technical Excellence & Innovation** | Official `@google/genai` SDK usage, multi-model tiering (`gemini-2.5-flash` for extraction, `gemini-2.5-pro` for forensic reasoning), and cutting-edge **Gemini Interactions API** for server-side stateful chat. |
| **Multimodal Depth** | Ingests PDF documents, scanned images, handwritten receiving stamps, and multi-sheet spreadsheets simultaneously—not just a text prompt wrapper. |
| **Real-World Business Utility** | Solves a multi-billion-dollar enterprise pain point (3-way matching and logistics compliance) with measurable financial risk calculations. |
| **Zero Hallucination / Provenance** | Unprecedented auditability: every alert links directly to pixel coordinates `[ymin, xmin, ymax, xmax]` or spreadsheet cells. |
| **Design, Polish & Execution** | Premium dark-mode aesthetic, micro-animations, Recharts financial telemetry, and instant 1-click demo buttons. |
