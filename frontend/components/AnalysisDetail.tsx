"use client";

import Link from "next/link";
import { useState } from "react";
import { apiPatchJson } from "@/lib/api";
import type { Analysis, JsonObject } from "@/types/analysis";
import {
  analysisDetectionSummaries,
  analysisImageMeta,
  formatValue,
  hasValue,
  humanize,
} from "@/types/analysis";
import DetectionOverlay from "./DetectionOverlay";
import ReportButton from "./ReportButton";

export default function AnalysisDetail({
  analysis,
  passport = false,
  onUpdated,
}: {
  analysis: Analysis;
  passport?: boolean;
  onUpdated?: (analysis: Analysis) => void;
}) {
  const [name, setName] = useState(analysis.fabric_name);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const detections = analysisDetectionSummaries(analysis);
  const imageMeta = analysisImageMeta(analysis);

  async function saveName() {
    const nextName = name.trim() || "Untitled Fabric";
    setSaving(true);
    setMessage(null);
    try {
      const response = await apiPatchJson(`/api/scan/${analysis.id}`, {
        fabric_name: nextName,
      });
      setName(response.analysis.fabric_name);
      onUpdated?.(response.analysis);
      setMessage("Analysis saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We couldn't save this analysis.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {analysis.result_source === "mock" && (
        <div className="flex flex-col gap-2 rounded-2xl border border-sage bg-pale px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-xs font-bold tracking-wide text-primary">DEMO RESULT</span>
          <p className="text-xs text-secondary">
            This result came from the development fallback, not the final AI model.
          </p>
        </div>
      )}

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr),minmax(22rem,0.95fr)]">
        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-card">
          <div className="aspect-[4/3] bg-surface2">
            {analysis.image_url ? (
              <DetectionOverlay
                src={analysis.image_url}
                alt={`Captured ${analysis.fabric_name}`}
                detections={analysis.detections}
                imageMeta={imageMeta}
              />
            ) : (
              <div className="grid h-full place-items-center text-sm text-muted">Captured image unavailable</div>
            )}
          </div>
          <div className="border-t border-border p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {passport ? "Fabric Passport" : "Captured Fabric"}
            </p>
            <p className="mt-2 break-all font-mono text-xs text-secondary">ID · {analysis.id}</p>
            <p className="mt-1 text-xs text-muted">
              {new Date(analysis.created_at).toLocaleString("en-GB", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-white p-6 shadow-card sm:p-8">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Fabric Name</span>
            <input
              value={name}
              maxLength={120}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-base px-4 py-3 font-display text-xl font-semibold text-deep transition focus:border-primary"
            />
          </label>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Metric label="Microplastic Shedding" value={analysis.microplastic_shedding_index} />
            <Metric label="Fabric Durability Index" value={analysis.fabric_durability_index} />
          </div>

          <p className="mt-5 rounded-xl bg-surface2 px-4 py-3 text-xs leading-5 text-muted">
            AI-assisted decision support. Results do not replace laboratory testing or certification.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/scan"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary"
            >
              Scan Again
            </Link>
            <button
              type="button"
              onClick={saveName}
              disabled={saving}
              className="min-h-11 rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Analysis"}
            </button>
            <ReportButton analysis={analysis} />
            <Link
              href={`/comparison?selected=${analysis.id}`}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-primary"
            >
              Compare
            </Link>
            <Link
              href={`/optimizer?analysis=${analysis.id}`}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-primary sm:col-span-2"
            >
              Explore What-If
            </Link>
          </div>
          {message && <p className="mt-3 text-center text-xs text-secondary" aria-live="polite">{message}</p>}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <DetectedDefectsSection detections={detections} />
        <DataSection title="Recommendation" value={analysis.recommendation} />
        <DataSection title="Fabric Composition" value={analysis.composition} />
        <DataSection title="Fabric Structure" value={analysis.structure} />
        <DataSection title="Washing Condition" value={analysis.washing_condition} />
      </section>
    </div>
  );
}

function DetectedDefectsSection({
  detections,
}: {
  detections: { class: string; confidence: number | null }[];
}) {
  return (
    <article className="rounded-2xl border border-border bg-white p-6 shadow-card">
      <h2 className="font-display text-xl font-semibold text-deep">Detected Defects</h2>
      {detections.length === 0 ? (
        <p className="mt-4 text-sm text-muted">No defects were detected on this fabric.</p>
      ) : (
        <ul className="mt-4 flex flex-wrap gap-2">
          {detections.map((detection, index) => (
            <li
              key={`${detection.class}-${index}`}
              className="flex items-center gap-2 rounded-full border border-border bg-surface2 px-3 py-1.5 text-xs font-semibold text-deep"
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              {humanize(detection.class)}
              {detection.confidence !== null && (
                <span className="font-mono text-[10px] text-muted">
                  {Math.round(detection.confidence * 100)}%
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function DataSection({ title, value }: { title: string; value: unknown }) {
  if (!hasValue(value)) return null;

  const rows = Array.isArray(value)
    ? value.map((item, index) => [`Item ${index + 1}`, item] as const)
    : typeof value === "object" && value !== null
      ? Object.entries(value as JsonObject)
      : [[title, value] as const];

  return (
    <article className="rounded-2xl border border-border bg-white p-6 shadow-card">
      <h2 className="font-display text-xl font-semibold text-deep">{title}</h2>
      <dl className="mt-4 space-y-3">
        {rows.map(([key, rowValue], index) => (
          <div key={`${key}-${index}`} className="border-t border-border pt-3 first:border-0 first:pt-0">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              {humanize(String(key))}
            </dt>
            <dd className="mt-1 whitespace-pre-line text-sm leading-6 text-deep">{formatValue(rowValue)}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="rounded-2xl border border-border bg-base p-5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-primary">
        {value === null || value === undefined ? "N/A" : value.toFixed(2)}
      </p>
    </div>
  );
}
