"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppShell, { AppLoading } from "@/components/AppShell";
import AnalysisCard from "@/components/AnalysisCard";
import { apiGet } from "@/lib/api";
import { useAppSession } from "@/lib/useAppSession";
import type { Analysis } from "@/types/analysis";

export default function PassportLibraryPage() {
  const auth = useAppSession();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.session) return;
    apiGet("/api/scan/history")
      .then((response) => setAnalyses(response.analyses || []))
      .finally(() => setLoading(false));
  }, [auth.session]);

  if (auth.loading) return <AppLoading label="Loading fabric library..." />;

  return (
    <AppShell title="Your fabric intelligence library." description="Every saved analysis also serves as a lightweight Fabric Passport—without duplicating its data." profile={auth.profile} email={auth.session?.user.email}>
      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[0, 1, 2].map((item) => <div key={item} className="h-80 animate-pulse rounded-2xl bg-white" />)}</div>
      ) : analyses.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{analyses.map((analysis) => <AnalysisCard key={analysis.id} analysis={analysis} showPdf />)}</div>
      ) : (
        <div className="rounded-3xl border border-dashed border-sage bg-white p-12 text-center"><h2 className="font-display text-3xl font-semibold text-deep">Your fabric library is empty.</h2><p className="mt-3 text-sm text-muted">A passport becomes available when an analysis is saved.</p><Link href="/scan" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">Analyze Fabric</Link></div>
      )}
    </AppShell>
  );
}
