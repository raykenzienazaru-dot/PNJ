"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { apiGet, apiPostForm, apiPostJson } from "@/lib/api";
import CameraScanner from "@/components/CameraScanner";
import ResultModal from "@/components/ResultModal";

type Tab = "scan" | "history" | "compare";

export default function DashboardPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [companyName, setCompanyName] = useState<string>("");
  const [tab, setTab] = useState<Tab>("scan");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fabricName, setFabricName] = useState("");
  const [composition, setComposition] = useState("");
  const [structure, setStructure] = useState("");
  const [washing, setWashing] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [comparison, setComparison] = useState<any[] | null>(null);

  const [activeResult, setActiveResult] = useState<any | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
        return;
      }
      setCheckingAuth(false);
      apiGet("/api/auth/me")
        .then((res) => setCompanyName(res.profile?.company_name || res.user.email))
        .catch(() => {});
    });
  }, [router]);

  const loadHistory = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const res = await apiGet("/api/scan/history");
      setHistory(res.analyses || []);
    } catch (err) {
      // no-op, keep UI resilient
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    if (!checkingAuth) loadHistory();
  }, [checkingAuth, loadHistory]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  async function handleScan() {
    if (!imageFile) {
      setScanError("Ambil atau unggah gambar kain terlebih dahulu.");
      return;
    }
    setScanning(true);
    setScanError(null);

    try {
      const form = new FormData();
      form.append("image", imageFile);
      form.append("fabric_name", fabricName || "Untitled Fabric");
      if (composition) form.append("composition", JSON.stringify({ note: composition }));
      if (structure) form.append("structure", JSON.stringify({ note: structure }));
      if (washing) form.append("washing_condition", JSON.stringify({ note: washing }));

      const res = await apiPostForm("/api/scan", form);
      setActiveResult(res.analysis); // popup only — never shown inline
      setImageFile(null);
      setFabricName("");
      setComposition("");
      setStructure("");
      setWashing("");
      loadHistory();
    } catch (err: any) {
      setScanError(err.message || "Pemindaian gagal. Coba lagi.");
    } finally {
      setScanning(false);
    }
  }

  function toggleCompare(id: string) {
    setSelectedForCompare((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 5
        ? [...prev, id]
        : prev
    );
  }

  async function runComparison() {
    if (selectedForCompare.length < 2) return;
    const res = await apiPostJson("/api/scan/compare", { ids: selectedForCompare });
    setComparison(res.comparison || []);
  }

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-base">
        <p className="font-mono text-xs text-muted">Memeriksa sesi...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base bg-weave">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-base/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="font-display text-lg text-ink">
              FABRIX <span className="text-gold">AI</span>
            </p>
            <p className="font-mono text-[11px] text-muted">{companyName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-border px-4 py-2 font-body text-sm text-ink transition hover:border-gold"
          >
            Keluar
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <div className="flex gap-2 border-b border-border">
          {(
            [
              ["scan", "Pindai Kain"],
              ["history", "Riwayat"],
              ["compare", "Bandingkan"],
            ] as [Tab, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`-mb-px border-b-2 px-4 py-3 font-body text-sm transition ${
                tab === key
                  ? "border-gold text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {tab === "scan" && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <CameraScanner onCapture={setImageFile} disabled={scanning} />

            <div className="space-y-4">
              <Field label="Nama kain / kandidat" value={fabricName} onChange={setFabricName} />
              <Field
                label="Komposisi serat (opsional)"
                value={composition}
                onChange={setComposition}
                placeholder="mis. 80% cotton, 20% polyester"
              />
              <Field
                label="Struktur / anyaman (opsional)"
                value={structure}
                onChange={setStructure}
                placeholder="mis. plain weave, 200 gsm"
              />
              <Field
                label="Kondisi pencucian (opsional)"
                value={washing}
                onChange={setWashing}
                placeholder="mis. mesin, 30°C"
              />

              {scanError && (
                <p className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 font-body text-sm text-ink">
                  {scanError}
                </p>
              )}

              <button
                onClick={handleScan}
                disabled={scanning}
                className="w-full rounded-full bg-gold px-6 py-3 font-body text-sm font-medium text-base transition hover:bg-goldSoft disabled:opacity-60"
              >
                {scanning ? "Menganalisis..." : "Jalankan analisis"}
              </button>
              <p className="font-mono text-[11px] text-muted">
                Hasil akan muncul pada jendela pop-up, bukan di halaman ini.
              </p>
            </div>
          </div>
        )}

        {tab === "history" && (
          <div>
            {loadingHistory && <p className="font-mono text-xs text-muted">Memuat riwayat...</p>}
            {!loadingHistory && history.length === 0 && (
              <p className="font-body text-sm text-muted">
                Belum ada analisis. Mulai dari tab &ldquo;Pindai Kain&rdquo;.
              </p>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveResult(item)}
                  className="rounded-xl border border-border bg-surface p-4 text-left transition hover:border-gold"
                >
                  {item.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image_url}
                      alt={item.fabric_name}
                      className="mb-3 h-32 w-full rounded-lg object-cover"
                    />
                  )}
                  <p className="font-display text-base text-ink">{item.fabric_name}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "compare" && (
          <div>
            <p className="font-body text-sm text-muted">
              Pilih 2–5 hasil analisis dari riwayat untuk dibandingkan.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {history.map((item) => (
                <label
                  key={item.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    selectedForCompare.includes(item.id)
                      ? "border-gold bg-gold/10"
                      : "border-border bg-surface"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedForCompare.includes(item.id)}
                    onChange={() => toggleCompare(item.id)}
                    className="accent-gold"
                  />
                  <span className="font-body text-sm text-ink">{item.fabric_name}</span>
                </label>
              ))}
            </div>

            <button
              onClick={runComparison}
              disabled={selectedForCompare.length < 2}
              className="mt-6 rounded-full bg-gold px-6 py-3 font-body text-sm font-medium text-base transition hover:bg-goldSoft disabled:opacity-40"
            >
              Bandingkan
            </button>

            {comparison && (
              <div className="mt-8 overflow-x-auto rounded-xl border border-border">
                <table className="w-full border-collapse font-body text-sm">
                  <thead>
                    <tr className="bg-surface2 text-left text-muted">
                      <th className="px-4 py-3 font-mono text-xs">Kain</th>
                      <th className="px-4 py-3 font-mono text-xs">Shedding Index</th>
                      <th className="px-4 py-3 font-mono text-xs">Durability Index</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.id} className="border-t border-border">
                        <td className="px-4 py-3 text-ink">{row.fabric_name}</td>
                        <td className="px-4 py-3 text-gold">
                          {row.microplastic_shedding_index?.toFixed(2) ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-gold">
                          {row.fabric_durability_index?.toFixed(2) ?? "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      <ResultModal analysis={activeResult} onClose={() => setActiveResult(null)} />
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="font-body text-xs text-muted">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-border bg-surface2 px-4 py-2.5 font-body text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-gold"
      />
    </label>
  );
}
