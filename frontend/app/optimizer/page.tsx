"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AppShell, { AppLoading } from "@/components/AppShell";
import { apiGet } from "@/lib/api";
import { useAppSession } from "@/lib/useAppSession";
import type { Analysis } from "@/types/analysis";
import { analysisDetectionLabel } from "@/types/analysis";

export default function OptimizerPage() {
  const auth = useAppSession();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.session) return;
    const preset = new URLSearchParams(window.location.search).get("analysis") || "";
    apiGet("/api/scan/history")
      .then((response) => {
        const items: Analysis[] = response.analyses || [];
        setAnalyses(items);
        setSelectedId(items.some((item) => item.id === preset) ? preset : items[0]?.id || "");
      })
      .finally(() => setLoading(false));
  }, [auth.session]);

  const selected = useMemo(() => analyses.find((analysis) => analysis.id === selectedId) || null, [analyses, selectedId]);

  if (auth.loading) return <AppLoading label="Loading optimizer..." />;

  return (
    <AppShell title="Explore better material possibilities." description="Choose a saved analysis as the baseline for a future what-if scenario." profile={auth.profile} email={auth.session?.user.email}>
      {loading ? <div className="h-80 animate-pulse rounded-3xl bg-white" /> : analyses.length ? (
        <div className="grid gap-6 lg:grid-cols-[0.85fr,1.15fr]">
          <section className="rounded-3xl border border-border bg-white p-6 shadow-card">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-secondary">Baseline analysis</p>
            <label className="mt-5 block"><span className="text-xs font-semibold text-deep">Select a saved fabric</span><select value={selectedId} onChange={(event) => setSelectedId(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-base px-4 py-3 text-sm text-deep focus:border-primary">{analyses.map((analysis) => <option key={analysis.id} value={analysis.id}>{analysis.fabric_name}</option>)}</select></label>
            {selected && <div className="mt-5 overflow-hidden rounded-2xl border border-border"><div className="aspect-[16/10] bg-surface2">{selected.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selected.image_url} alt={selected.fabric_name} className="h-full w-full object-cover" />
            )}</div><div className="p-4"><h2 className="font-display text-xl font-semibold text-deep">{selected.fabric_name}</h2><p className="mt-1 text-xs text-muted">{analysisDetectionLabel(selected) || "No detected characteristic available"}</p><Link href={`/analysis/${selected.id}`} className="mt-4 inline-flex text-xs font-semibold text-primary underline decoration-sage underline-offset-4">View baseline result</Link></div></div>}
          </section>

          <section className="rounded-3xl border border-border bg-deep p-7 text-white shadow-card sm:p-9">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-sage">Schema pending</span>
            <h2 className="mt-5 font-display text-3xl font-semibold">Scenario controls will follow the final AI input schema.</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">The baseline selection is functional and ready. Composition, structure, and washing controls are intentionally not invented before the AI service confirms its supported fields, units, and validation rules.</p>
            <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-xs font-semibold uppercase tracking-wide text-sage">Planned saved relationship</p><p className="mt-2 font-mono text-xs text-white/70">parent_analysis_id → {selected?.id || "select a baseline"}</p></div>
          </section>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-sage bg-white p-12 text-center"><h2 className="font-display text-3xl font-semibold text-deep">No baseline analysis available.</h2><p className="mt-3 text-sm text-muted">Scan and save a fabric before opening the optimizer.</p><Link href="/scan" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">Scan Fabric</Link></div>
      )}
    </AppShell>
  );
}
