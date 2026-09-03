"use client";

import { useState } from "react";
import { downloadAnalysisPdf } from "@/lib/reportPdf";
import type { Analysis } from "@/types/analysis";

export default function ReportButton({
  analysis,
  compact = false,
  label = "Unduh PDF",
}: {
  analysis: Analysis;
  compact?: boolean;
  label?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  async function download() {
    if (status === "loading") return;
    setStatus("loading");
    try {
      await downloadAnalysisPdf(analysis);
      setStatus("ready");
      window.setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("[report]", error);
      setStatus("error");
    }
  }

  const text =
    status === "loading"
      ? "Membuat Laporan..."
      : status === "ready"
        ? "Laporan Siap"
        : status === "error"
          ? "Coba Lagi"
          : label;

  return (
    <button
      type="button"
      onClick={download}
      disabled={status === "loading"}
      aria-live="polite"
      title={status === "error" ? "Laporan analisis belum dapat dibuat." : undefined}
      className={
        compact
          ? "rounded-lg border border-border bg-white px-3 py-2 text-xs font-semibold text-primary transition hover:border-primary disabled:opacity-60"
          : "inline-flex min-h-11 items-center justify-center rounded-xl border border-primary bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-pale disabled:opacity-60"
      }
    >
      {text}
    </button>
  );
}
