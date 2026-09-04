"use client";

import Link from "next/link";
import ReportButton from "./ReportButton";
import type { Analysis } from "@/types/analysis";
import { analysisDetectionLabel } from "@/types/analysis";

export default function AnalysisCard({
  analysis,
  selectable = false,
  selected = false,
  onSelect,
  showPdf = false,
}: {
  analysis: Analysis;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  showPdf?: boolean;
}) {
  const detected = analysisDetectionLabel(analysis);

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover ${
        selected ? "border-primary ring-2 ring-sage/40" : "border-border"
      }`}
    >
      <div className="relative aspect-[16/10] bg-pale">
        {analysis.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={analysis.image_url}
            alt={`Captured ${analysis.fabric_name}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center text-xs text-muted">No captured image</div>
        )}
        {analysis.result_source === "mock" && (
          <span className="absolute left-3 top-3 rounded-full bg-pale px-2.5 py-1 font-mono text-[10px] font-semibold text-primary shadow-sm">
            DEMO RESULT
          </span>
        )}
        {selectable && (
          <label className="absolute right-3 top-3 flex cursor-pointer items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-deep shadow-sm">
            <input
              type="checkbox"
              checked={selected}
              onChange={onSelect}
              className="h-4 w-4 accent-primary"
              aria-label={`Select ${analysis.fabric_name}`}
            />
            Select
          </label>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate font-display text-xl font-semibold text-deep">
              {analysis.fabric_name}
            </h2>
            <p className="mt-1 text-xs text-muted">
              {new Date(analysis.created_at).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
          <span className="rounded-full bg-surface2 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-secondary">
            {analysis.result_source === "ai_service" ? "AI Service" : analysis.result_source}
          </span>
        </div>

        {detected && <p className="mt-3 text-sm text-muted">Detected: {detected}</p>}

        <div className="mt-4">
          <MiniMetric label="Durability" value={analysis.fabric_durability_index} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
          <Link
            href={`/analysis/${analysis.id}`}
            className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-secondary"
          >
            View Result
          </Link>
          <Link
            href={`/passport/${analysis.id}`}
            className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-primary transition hover:border-primary"
          >
            Passport
          </Link>
          {showPdf && <ReportButton analysis={analysis} compact label="PDF" />}
        </div>
      </div>
    </article>
  );
}

function MiniMetric({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="rounded-xl bg-surface2 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 font-mono text-sm font-semibold text-primary">
        {value === null || value === undefined ? "Not Available" : value.toFixed(2)}
      </p>
    </div>
  );
}
