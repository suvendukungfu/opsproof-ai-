import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET() {
  const healthData = {
    status: "ok",
    service: "opsproof-ai",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    gemini: {
      provider: "Google Gemini 2.5",
      sdk: "@google/genai",
      configured: env.hasGeminiKey,
      status: env.hasGeminiKey ? "ready" : "fallback_mock_ready",
      models: ["gemini-2.5-flash", "gemini-2.5-pro"],
      interactionsApi: "enabled",
    },
    database: {
      provider: "PostgreSQL",
      orm: "Prisma",
      status: env.DATABASE_URL ? "configured" : "pending_connection",
    },
    system: {
      uptimeSeconds: process.uptime(),
      nodeVersion: process.version,
    },
  };

  return NextResponse.json(healthData, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
