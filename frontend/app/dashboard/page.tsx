"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AppShell, { AppLoading } from "@/components/AppShell";
import AnalysisCard from "@/components/AnalysisCard";
import { apiGet } from "@/lib/api";
import { useAppSession } from "@/lib/useAppSession";
import type { Analysis } from "@/types/analysis";

const RECENT_CUTOFF = Date.now() - 7 * 24 * 60 * 60 * 1000;

export default function DashboardPage() {
  const auth = useAppSession();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.session) return;
    apiGet("/api/scan/history")
      .then((response) => setAnalyses(response.analyses || []))
      .catch((requestError) => setError(requestError.message || "Dashboard data could not be loaded."))
      .finally(() => setLoading(false));
  }, [auth.session]);

  const stats = useMemo(() => {
    const recent = analyses.filter((item) => new Date(item.created_at).getTime() >= RECENT_CUTOFF).length;
    const saved = new Set(analyses.map((item) => item.fabric_name.trim().toLowerCase())).size;
    return [
      ["Total Analyses", analyses.length],
      ["Recent Analyses", recent],
      ["Saved Fabrics", saved],
    ] as const;
  }, [analyses]);

  if (auth.loading) return <AppLoading />;

  return (
    <AppShell
      title="Make smarter material decisions."
      description="Capture a fabric, review the available analysis, and keep every result ready for your next decision."
      profile={auth.profile}
      email={auth.session?.user.email}
      action={<Link href="/scan" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-secondary">Scan Fabric</Link>}
    >
      {error && <p role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</p>}

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map(([label, value]) => (
          <article key={label} className="rounded-2xl border border-border bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
            <p className="mt-3 font-display text-4xl font-semibold text-primary">{loading ? "—" : value}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-3xl bg-deep p-6 text-white shadow-card sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-sage">Primary workflow</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Open camera. Capture fabric. Get insight.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">No multi-step form and no manual upload. FABRIX opens directly into a guided camera experience.</p>
          </div>
          <Link href="/scan" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-deep transition hover:bg-pale">Start New Scan</Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-deep">Recent Analyses</h2>
            <p className="mt-1 text-sm text-muted">Your latest saved material results.</p>
          </div>
          <Link href="/history" className="text-sm font-semibold text-primary">View all</Link>
        </div>

        {loading ? (
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {[0, 1, 2].map((item) => <div key={item} className="h-72 animate-pulse rounded-2xl border border-border bg-white" />)}
          </div>
        ) : analyses.length > 0 ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {analyses.slice(0, 3).map((analysis) => <AnalysisCard key={analysis.id} analysis={analysis} />)}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-sage bg-white p-10 text-center">
            <h3 className="font-display text-2xl font-semibold text-deep">No analyses yet.</h3>
            <p className="mt-2 text-sm text-muted">Your first saved result will appear here.</p>
            <Link href="/scan" className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">Analyze Your First Fabric</Link>
          </div>
        )}
      </section>
    </AppShell>
  );
}
