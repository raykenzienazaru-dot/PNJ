"use client";

import { useEffect } from "react";

type Analysis = {
  id: string;
  fabric_name: string;
  image_url: string | null;
  microplastic_shedding_index: number | null;
  fabric_durability_index: number | null;
  detections: any;
  recommendation: {
    material?: string;
    care?: string;
    alternative_composition?: string;
  } | null;
  result_source: string;
  created_at: string;
};

export default function ResultModal({
  analysis,
  onClose,
}: {
  analysis: Analysis | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!analysis) return null;

  const detectedClass = analysis.detections?.[0]?.class;
  const confidence = analysis.detections?.[0]?.confidence;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h3 className="font-display text-xl text-ink">{analysis.fabric_name}</h3>
            <p className="font-mono text-xs text-muted">
              {new Date(analysis.created_at).toLocaleString("id-ID")}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-full border border-border p-2 text-muted transition hover:border-gold hover:text-ink"
          >
            ✕
          </button>
        </div>

        {analysis.result_source === "mock" && (
          <div className="border-b border-border bg-teal/10 px-6 py-2 font-mono text-[11px] text-teal">
            Hasil demo (mock) — AI Service belum terhubung ke model final.
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1fr,1.2fr]">
          {analysis.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={analysis.image_url}
              alt={analysis.fabric_name}
              className="h-full w-full rounded-xl border border-border object-cover"
            />
          )}

          <div className="space-y-5">
            {detectedClass && (
              <div>
                <span className="font-mono text-xs text-muted">Kelas terdeteksi</span>
                <p className="font-body text-sm text-ink">
                  {detectedClass}{" "}
                  {confidence && (
                    <span className="text-muted">
                      · confidence {(confidence * 100).toFixed(1)}%
                    </span>
                  )}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Metric
                label="Microplastic Shedding Index"
                value={analysis.microplastic_shedding_index}
              />
              <Metric
                label="Fabric Durability Index"
                value={analysis.fabric_durability_index}
              />
            </div>

            {analysis.recommendation && (
              <div className="space-y-3 border-t border-border pt-4">
                {analysis.recommendation.material && (
                  <RecoRow label="Material" text={analysis.recommendation.material} />
                )}
                {analysis.recommendation.care && (
                  <RecoRow label="Perawatan" text={analysis.recommendation.care} />
                )}
                {analysis.recommendation.alternative_composition && (
                  <RecoRow
                    label="Alternatif Komposisi"
                    text={analysis.recommendation.alternative_composition}
                  />
                )}
              </div>
            )}

            <p className="border-t border-border pt-4 font-mono text-[11px] leading-relaxed text-muted">
              AI-assisted decision support — bukan pengganti pengujian laboratorium.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="rounded-lg border border-border bg-surface2 p-4">
      <span className="font-mono text-[10px] text-muted">{label}</span>
      <p className="mt-1 font-display text-2xl text-gold">
        {value !== null && value !== undefined ? value.toFixed(2) : "—"}
      </p>
    </div>
  );
}

function RecoRow({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <span className="font-mono text-xs text-teal">{label}</span>
      <p className="font-body text-sm leading-relaxed text-ink">{text}</p>
    </div>
  );
}
