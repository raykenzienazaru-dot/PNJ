"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AppShell, { AppLoading } from "@/components/AppShell";
import AnalysisCard from "@/components/AnalysisCard";
import { apiGet } from "@/lib/api";
import { useAppSession } from "@/lib/useAppSession";
import type { Analysis } from "@/types/analysis";

export default function HistoryPage() {
  const auth = useAppSession();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.session) return;
    apiGet("/api/scan/history")
      .then((response) => setAnalyses(response.analyses || []))
      .catch((requestError) => setError(requestError.message || "Riwayat analisis belum dapat dimuat."))
      .finally(() => setLoading(false));
  }, [auth.session]);

  const filtered = useMemo(
    () => analyses.filter((analysis) => analysis.fabric_name.toLowerCase().includes(query.trim().toLowerCase())),
    [analyses, query]
  );

  if (auth.loading) return <AppLoading label="Memuat riwayat..." />;

  return (
    <AppShell
      title="Semua analisis tersusun rapi."
      description="Buka kembali hasil tersimpan, lihat paspor kain, atau unduh PDF tanpa menjalankan ulang model AI."
      profile={auth.profile}
      email={auth.session?.user.email}
      action={<Link href="/scan" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white">Scan Kain</Link>}
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full max-w-md">
          <span className="sr-only">Cari analisis</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari berdasarkan nama kain" className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-deep shadow-card transition focus:border-primary" />
        </label>
        <p className="text-xs text-muted">{filtered.length} analisis tersimpan</p>
      </div>

      {error && <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</p>}
      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[0, 1, 2].map((item) => <div key={item} className="h-80 animate-pulse rounded-2xl border border-border bg-white" />)}</div>
      ) : filtered.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((analysis) => <AnalysisCard key={analysis.id} analysis={analysis} showPdf />)}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-sage bg-white p-12 text-center">
          <h2 className="font-display text-3xl font-semibold text-deep">{query ? "Analisis tidak ditemukan." : "Belum ada hasil analisis."}</h2>
          <p className="mt-3 text-sm text-muted">{query ? "Coba nama kain yang lain." : "Scan kain pertama untuk mulai membangun riwayat pemeriksaan."}</p>
          {!query && <Link href="/scan" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">Scan Kain Pertama</Link>}
        </div>
      )}
    </AppShell>
  );
}
