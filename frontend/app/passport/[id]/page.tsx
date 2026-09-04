"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AppShell, { AppLoading } from "@/components/AppShell";
import AnalysisDetail from "@/components/AnalysisDetail";
import { apiGet } from "@/lib/api";
import { useAppSession } from "@/lib/useAppSession";
import type { Analysis } from "@/types/analysis";

export default function PassportDetailPage() {
  const auth = useAppSession();
  const params = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.session || !params.id) return;
    apiGet(`/api/scan/${params.id}`)
      .then((response) => setAnalysis(response.analysis))
      .catch((requestError) => setError(requestError.message || "Fabric Passport could not be loaded."))
      .finally(() => setLoading(false));
  }, [auth.session, params.id]);

  if (auth.loading || loading) return <AppLoading label="Opening fabric passport..." />;

  return (
    <AppShell title="Fabric Passport" description="A reusable view of the associated saved fabric analysis." profile={auth.profile} email={auth.session?.user.email}>
      {analysis ? <AnalysisDetail analysis={analysis} passport onUpdated={setAnalysis} /> : <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center"><p className="text-sm text-red-700">{error || "Fabric Passport not found."}</p><Link href="/passport" className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">Back to Library</Link></div>}
    </AppShell>
  );
}
