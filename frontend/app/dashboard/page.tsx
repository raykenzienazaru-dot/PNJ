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
      .catch((requestError) => setError(requestError.message || "Data ringkasan belum dapat dimuat."))
      .finally(() => setLoading(false));
  }, [auth.session]);

  const stats = useMemo(() => {
    const recent = analyses.filter((item) => new Date(item.created_at).getTime() >= RECENT_CUTOFF).length;
    const saved = new Set(analyses.map((item) => item.fabric_name.trim().toLowerCase())).size;
    return [
      ["Total analisis", analyses.length],
      ["Analisis 7 hari terakhir", recent],
      ["Kain tersimpan", saved],
    ] as const;
  }, [analyses]);

  if (auth.loading) return <AppLoading />;

  return (
    <AppShell
      title="Ambil keputusan kain dengan lebih yakin."
      description="Foto kain, periksa hasil deteksi, dan simpan setiap analisis untuk keputusan berikutnya."
      profile={auth.profile}
      email={auth.session?.user.email}
      action={<Link href="/scan" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-secondary">Scan Kain</Link>}
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
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-sage">Alur utama</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Buka kamera, foto kain, lalu periksa hasilnya.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">Tanpa formulir panjang atau unggah manual. FABRIX langsung memandu proses pengambilan foto kain.</p>
          </div>
          <Link href="/scan" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-deep transition hover:bg-pale">Mulai Scan Baru</Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-deep">Analisis Terbaru</h2>
            <p className="mt-1 text-sm text-muted">Hasil pemeriksaan kain yang terakhir disimpan.</p>
          </div>
          <Link href="/history" className="text-sm font-semibold text-primary">Lihat semua</Link>
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
            <h3 className="font-display text-2xl font-semibold text-deep">Belum ada hasil analisis.</h3>
            <p className="mt-2 text-sm text-muted">Hasil pertama yang disimpan akan muncul di sini.</p>
            <Link href="/scan" className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">Scan Kain Pertama</Link>
          </div>
        )}
      </section>
    </AppShell>
  );
}
