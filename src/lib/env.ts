import { z } from "zod";

/**
 * Server-side environment variables schema.
 */
const serverEnvSchema = z.object({
  GEMINI_API_KEY: z.string().default("dev-placeholder-key"),
  DATABASE_URL: z.string().optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

/**
 * Client-side environment variables schema.
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
});

export const env = {
  // Server-only variables
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "dev-placeholder-key",
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
  // Client-safe variables
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  // Diagnostics
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV !== "production",
  hasGeminiKey:
    Boolean(process.env.GEMINI_API_KEY) &&
    process.env.GEMINI_API_KEY !== "your-gemini-api-key-here" &&
    process.env.GEMINI_API_KEY !== "dev-placeholder-key",
};

/**
 * Validates environment variables at application boot.
 */
export function validateEnv() {
  if (typeof window === "undefined") {
    const serverResult = serverEnvSchema.safeParse(process.env);
    if (!serverResult.success) {
      console.warn("Server environment variable warnings:", serverResult.error.format());
    }
  } else {
    const clientResult = clientEnvSchema.safeParse({
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    });
    if (!clientResult.success) {
      console.warn("Client environment variable warnings:", clientResult.error.format());
    }
  }
}
