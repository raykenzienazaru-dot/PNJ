"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell, { AppLoading } from "@/components/AppShell";
import CameraScanner from "@/components/CameraScanner";
import { apiPostForm } from "@/lib/api";
import { useAppSession } from "@/lib/useAppSession";

const processingSteps = [
  "Preparing image",
  "Detecting visual features",
  "Running material analysis",
  "Preparing result",
];

export default function ScanPage() {
  const auth = useAppSession();
  const router = useRouter();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cameraKey, setCameraKey] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  async function analyze() {
    if (!imageFile || processing) return;
    setProcessing(true);
    setProcessingStep(0);
    setError(null);
    intervalRef.current = setInterval(() => {
      setProcessingStep((current) => Math.min(current + 1, processingSteps.length - 1));
    }, 950);

    try {
      const form = new FormData();
      form.append("image", imageFile);
      form.append("fabric_name", "Untitled Fabric");
      const response = await apiPostForm("/api/scan", form);
      router.push(`/analysis/${response.analysis.id}`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Analysis could not be completed.");
      setProcessing(false);
    } finally {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function retakeAfterError() {
    setError(null);
    setImageFile(null);
    setCameraKey((current) => current + 1);
  }

  if (auth.loading) return <AppLoading label="Preparing camera..." />;

  return (
    <AppShell
      title="Scan Fabric"
      description="Position the material inside the frame, capture one clear image, and analyze it immediately."
      profile={auth.profile}
      email={auth.session?.user.email}
    >
      <div className="mx-auto max-w-4xl">
        <CameraScanner key={cameraKey} onCapture={setImageFile} disabled={processing} />

        {imageFile && !processing && (
          <div className="mt-5 rounded-2xl border border-sage bg-pale/60 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="font-semibold text-deep">Capture ready</p>
              <p className="mt-1 text-xs leading-5 text-muted">Review the image above. Retake it if the texture is blurred or poorly lit.</p>
            </div>
            <button type="button" onClick={analyze} className="mt-4 min-h-12 w-full rounded-xl bg-primary px-7 text-sm font-semibold text-white transition hover:bg-secondary sm:mt-0 sm:w-auto">
              Analyze Fabric
            </button>
          </div>
        )}

        {error && !processing && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5" role="alert">
            <h2 className="font-display text-xl font-semibold text-red-900">Analysis could not be completed.</h2>
            <p className="mt-2 text-sm text-red-700">{error}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={analyze} disabled={!imageFile} className="min-h-11 rounded-xl bg-red-700 px-5 text-sm font-semibold text-white disabled:opacity-50">Try Again</button>
              <button type="button" onClick={retakeAfterError} className="min-h-11 rounded-xl border border-red-300 px-5 text-sm font-semibold text-red-800">Retake</button>
            </div>
          </div>
        )}
      </div>

      {processing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-deep/90 px-5 text-white backdrop-blur-lg" role="status" aria-live="polite">
          <div className="w-full max-w-md text-center">
            <div className="relative mx-auto h-20 w-20 rounded-full border border-white/15 bg-white/5">
              <span className="absolute inset-2 animate-spin rounded-full border-2 border-sage/20 border-t-sage" />
              <span className="absolute inset-7 rounded-full bg-sage" />
            </div>
            <h2 className="mt-7 font-display text-3xl font-semibold">Analyzing Fabric...</h2>
            <div className="mt-7 space-y-3 text-left">
              {processingSteps.map((step, index) => (
                <div key={step} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${index === processingStep ? "bg-white/10 text-white" : index < processingStep ? "text-sage" : "text-white/35"}`}>
                  <span className={`h-2 w-2 rounded-full ${index <= processingStep ? "bg-sage" : "bg-white/20"}`} />
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
