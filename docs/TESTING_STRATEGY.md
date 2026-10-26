# Automated Testing & AI Evaluation Strategy

## OpsProof AI — Multimodal Operations Intelligence Platform

**Document Version:** 1.0.0  
**Status:** Approved for Implementation  
**Role:** Principal QA Architect & Senior Staff AI Engineer  

---

## 1. Testing Pyramid Overview

To ensure rock-solid stability during live hackathon judging and continuous integration, OpsProof AI implements a comprehensive testing pyramid across four distinct tiers:

```
          ▲
         / \
        / E2E \         Playwright User Flows & Critical Demos (10%)
       /-------\
      / AI Eval \       Golden Ground-Truth Extraction & Reconciliation (20%)
     /-----------\
    / Integration \     API Route Handlers, Database & Storage (30%)
   /---------------\
  /    Unit Tests   \   Zod Schemas, Reconciliation Math, Coordinates (40%)
 /-------------------\
```

---

## 2. Unit Testing Strategy (Vitest)

Unit tests focus on isolated, deterministic business logic with zero external network or database dependencies:

### 2.1. Key Test Suites (`tests/unit/`)
1. **Reconciliation Engine Rules (`reconciliation-engine.test.ts`):**
   - **Quantity Mismatch Rule:** Verifies calculation of short-shipment leakage ($L = (Q_{\text{billed}} - Q_{\text{delivered}}) \times P_{\text{unit}}$).
   - **Unit Price Drift Rule:** Verifies detection of unauthorized price bumps.
   - **Unapproved Surcharge Rule:** Verifies flagging of phantom line items not present in original PO.
   - **Threshold Excursion Rule:** Verifies detection of temperature/environmental violations against max/min specifications.
2. **Schema & Validator Tests (`schemas.test.ts`):**
   - Validates that canonical JSON structures conform strictly to Zod schemas.
   - Tests boundary conditions (missing tax, nullable SKUs, negative quantities).
3. **Evidence Coordinate Normalizer (`provenance-mapper.test.ts`):**
   - Verifies translation of Gemini normalized coordinates ($0 - 1000$ scale) to SVG canvas viewport percentages ($0\% - 100\%$).
   - Verifies spreadsheet cell coordinate parsing (`Sheet1!C14` -> row 14, column 3).
4. **Currency & Financial Math (`currency.test.ts`):**
   - Tests high-precision floating-point rounding to prevent rounding errors in multi-line invoice reconciliations.

---

## 3. Integration Testing Strategy

Integration tests evaluate the coordination between Next.js Route Handlers, the Prisma ORM layer, and mock AI services:

### 3.1. Gemini Mock & Fixture System (`tests/mocks/`)
To eliminate API billing during CI and prevent test flakiness due to network throttling, all AI calls are intercepted by deterministic mock fixtures:

```typescript
// tests/mocks/gemini-mock.ts
export const mockPOExtractionResponse = {
  documentType: "PURCHASE_ORDER",
  documentNumber: "PO-2026-9041",
  currency: "USD",
  totalAmount: 60000.0,
  lineItems: [
    {
      sku: "SKU-SENS-X1",
      description: "Industrial Sensor Module X1",
      quantity: 500,
      unitPrice: 120.0,
      totalPrice: 60000.0,
      pageNumber: 1,
      boundingBox: { ymin: 320, xmin: 150, ymax: 360, xmax: 850 },
    },
  ],
};

export const mockInteractionsResponse = {
  id: "mock-interaction-id-9982",
  outputText: "The Apex invoice lists a unit price of $135.00, which exceeds the authorized PO rate of $120.00 by $15.00 per unit.",
};
```

### 3.2. Route Handler Integration Tests (`tests/integration/`)
- `POST /api/investigations`: Verifies creation of investigation records in the test database.
- `POST /api/investigations/[id]/documents/upload`: Verifies MIME type checking, SHA-256 calculation, and database record creation.
- `POST /api/investigations/[id]/process`: Verifies the full pipeline with mocked Gemini responses, ensuring alerts and `EvidenceProvenance` rows are written correctly.
- `POST /api/investigations/[id]/chat`: Verifies interaction session persistence and message appending.
- `POST /api/demo/seed`: Verifies that pre-bundled synthetic scenarios populate in under 500ms.

---

## 4. AI Evaluation (Eval) Harness: Golden Ground-Truth Benchmarks

In an operations intelligence platform, assessing AI accuracy is critical. OpsProof AI features an automated Evaluation Harness (`tests/evals/`) that tests the real Gemini models against synthetic "Golden Ground-Truth" datasets:

### 4.1. Evaluation Metrics
1. **Entity Extraction Recall:**
   $$\text{Recall} = \frac{\text{Correctly Extracted Line Items}}{\text{Total Ground-Truth Line Items}}$$
   *Target: $\ge 98\%$ on standard operational documents.*
2. **Discrepancy Detection Precision & Recall:**
   $$\text{Precision} = \frac{\text{True Discrepancies Flagged}}{\text{Total Flagged Alerts}}$$
   *Target: $100\%$ precision on synthetic benchmark scenarios (zero false alarms).*
3. **Coordinate Alignment Error (IoU):**
   - For visual bounding boxes, measures Intersection-over-Union (IoU) against annotated ground-truth boxes.
   *Target: $\text{IoU} \ge 0.70$ on key fields (quantity, total, stamps).*

### 4.2. Benchmark Scenario Matrix

| Scenario Name | Test Documents | Expected Ground-Truth Discrepancies |
|---|---|---|
| **Benchmark 1: 3-Way Match** | `PO-9041.pdf`, `BOL-9041.png`, `INV-1142.xlsx` | 1. Qty Shortfall (420 vs 500)<br>2. Unit Price Drift ($135 vs $120)<br>3. Unapproved Surcharge ($1,850) |
| **Benchmark 2: Cold Chain** | `Spec-ColdChain.pdf`, `Sensor-Log.csv`, `Acceptance.pdf` | 1. Temperature Excursion (8.6°C > 4.0°C max)<br>2. Conflicting Acceptance Declaration |
| **Benchmark 3: Clean Audit** | `Clean-PO.pdf`, `Clean-BOL.png`, `Clean-INV.xlsx` | 0 Discrepancies (Clean pass, zero false positives) |

---

## 5. End-to-End (E2E) Testing Strategy (Playwright)

Playwright runs against the deployed local/staging web app to ensure zero UI regressions before judge demonstration.

### 5.1. E2E Test Suite (`tests/e2e/`)
1. **Instant Demo Journey (`demo-flow.spec.ts`):**
   - Navigate to `/`.
   - Click "Load 3-Way Match Anomaly Demo" button.
   - Assert navigation to `/investigations/[id]`.
   - Assert Financial Exposure card displays `"$12,650.00"`.
   - Assert Recharts donut chart displays 2 Critical and 1 Warning alerts.
2. **Interactive Provenance Inspection (`provenance-viewer.spec.ts`):**
   - Click the "Quantity Mismatch: 80 Units Short" alert card.
   - Verify that the right-hand document viewer switches active tab to the Bill of Lading scan.
   - Verify that the SVG bounding box element becomes visible and active in the viewport.
3. **Auditor Copilot Multi-Turn Chat (`copilot-chat.spec.ts`):**
   - Open the Copilot Drawer.
   - Click suggested prompt: *"Why was the Apex invoice flagged?"*.
   - Verify streaming response contains evidence citation chips.
   - Click evidence citation chip and verify canvas scroll.
4. **Report Export & Print (`report-export.spec.ts`):**
   - Click "Generate Investigation Report".
   - Verify printable summary page loads with all evidence coordinates and executive summary.

---

## 6. Continuous Integration (CI/CD) Workflow

Every commit to `main` executes a multi-stage GitHub Actions pipeline:

```yaml
# .github/workflows/ci.yml (Specification)
name: OpsProof AI CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install Dependencies
        run: npm ci

      - name: TypeScript Typecheck
        run: npx tsc --noEmit

      - name: ESLint Check
        run: npm run lint

      - name: Unit & Integration Tests (Vitest with Gemini Mocks)
        run: npm run test:unit
        env:
          DATABASE_URL: "file:./test.db"

      - name: Build Check
        run: npm run build
        env:
          GEMINI_API_KEY: "mock-build-key"
          DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/opsproof_test"
```
