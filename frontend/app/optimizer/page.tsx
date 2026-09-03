"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AppShell, { AppLoading } from "@/components/AppShell";
import { apiGet } from "@/lib/api";
import { useAppSession } from "@/lib/useAppSession";
import type { Analysis } from "@/types/analysis";
import { analysisDetectionLabel, fabricDisplayName } from "@/types/analysis";

function scanDate(value: string) {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

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

  if (auth.loading) return <AppLoading label="Menyiapkan optimizer..." />;

  return (
    <AppShell
      title="Eksplorasi kain dengan lebih leluasa."
      description="Pilih hasil scan yang ingin dijadikan acuan untuk mencoba skenario berikutnya."
      profile={auth.profile}
      email={auth.session?.user.email}
    >
      {loading ? <div className="h-80 animate-pulse rounded-3xl bg-white" /> : analyses.length ? (
        <div className="grid gap-6 lg:grid-cols-[0.85fr,1.15fr]">
          <section className="rounded-[2rem] border border-border bg-white p-5 shadow-card sm:p-6">
            <div>
              <span className="inline-flex rounded-full bg-pale px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                Kain acuan
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold text-deep">Mau mulai dari kain yang mana?</h2>
              <p className="mt-2 text-sm leading-6 text-muted">Ketuk salah satu hasil scan di bawah ini.</p>
            </div>

            <div className="mt-5 grid max-h-[26rem] gap-3 overflow-y-auto pr-0.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {analyses.map((analysis) => {
                const active = analysis.id === selectedId;
                const detected = analysisDetectionLabel(analysis);

                return (
                  <button
                    key={analysis.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedId(analysis.id)}
                    className={`group rounded-2xl border p-3 text-left transition duration-200 ${
                      active
                        ? "border-primary bg-pale shadow-sm"
                        : "border-border bg-base hover:-translate-y-0.5 hover:border-sage hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface2">
                        {analysis.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={analysis.image_url}
                            alt={`Foto ${fabricDisplayName(analysis.fabric_name)}`}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="grid h-full place-items-center font-display text-xl text-sage">F</div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1 py-0.5">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-semibold text-deep">{fabricDisplayName(analysis.fabric_name)}</p>
                          <span
                            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                              active ? "bg-primary text-white" : "border border-sage bg-white text-transparent"
                            }`}
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                        </div>
                        <p className="mt-1 truncate text-xs text-secondary">{detected || "Belum ada cacat terdeteksi"}</p>
                        <p className="mt-1.5 font-mono text-[10px] text-muted">{scanDate(analysis.created_at)}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {selected && (
              <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-base">
                <div className="aspect-[16/9] bg-surface2">
                  {selected.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selected.image_url}
                      alt={`Foto ${fabricDisplayName(selected.fabric_name)}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-sm text-muted">Gambar tidak tersedia</div>
                  )}
                </div>
                <div className="flex items-end justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-secondary">Pilihanmu</p>
                    <h3 className="mt-1 truncate font-display text-xl font-semibold text-deep">
                      {fabricDisplayName(selected.fabric_name)}
                    </h3>
                  </div>
                  <Link
                    href={`/analysis/${selected.id}`}
                    className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm transition hover:bg-pale"
                  >
                    Lihat hasil →
                  </Link>
                </div>
              </div>
            )}
          </section>

          <section className="relative overflow-hidden rounded-[2rem] bg-deep p-7 text-white shadow-card sm:p-9">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-secondary/30 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-sage">
                Segera hadir
              </span>
              <h2 className="mt-5 max-w-lg font-display text-3xl font-semibold leading-tight">
                Coba skenario baru dari kain pilihanmu.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
                Kain acuan sudah bisa dipilih. Pengaturan komposisi, struktur, dan pencucian akan ditambahkan setelah format input AI selesai divalidasi.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-sage text-sm font-bold text-deep">✓</span>
                  <p className="mt-4 text-sm font-semibold">Kain acuan siap</p>
                  <p className="mt-1 text-xs leading-5 text-white/55">Pilihan tersambung ke hasil scan yang sudah tersimpan.</p>
                </div>
                <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-5">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-sm text-sage">2</span>
                  <p className="mt-4 text-sm font-semibold">Atur skenario</p>
                  <p className="mt-1 text-xs leading-5 text-white/55">Kontrol simulasi akan hadir pada tahap berikutnya.</p>
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-sage">Relasi data</p>
                <p className="mt-2 truncate font-mono text-xs text-white/70">
                  parent_analysis_id → {selected?.id || "belum dipilih"}
                </p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-sage bg-white p-12 text-center">
          <h2 className="font-display text-3xl font-semibold text-deep">Belum ada kain untuk dicoba.</h2>
          <p className="mt-3 text-sm text-muted">Scan dan simpan kain terlebih dahulu, lalu kembali ke halaman ini.</p>
          <Link href="/scan" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white">
            Scan kain
          </Link>
        </div>
      )}
    </AppShell>
  );
}
