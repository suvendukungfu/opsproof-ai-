import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OpsProof AI — Multimodal Operations Intelligence Platform",
  description:
    "Cross-document operations reconciliation, discrepancy detection, and evidence-backed audit reports powered by Google Gemini.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        <div className="relative flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col md:pl-64">
            <Header />
            <main className="flex-1 bg-slate-50/60 pb-12">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
