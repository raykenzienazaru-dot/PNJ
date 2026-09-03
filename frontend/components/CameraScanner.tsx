"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  onCapture: (file: File) => void;
  disabled?: boolean;
};

export default function CameraScanner({ onCapture, disabled }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<"idle" | "starting" | "live" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    setStatus("starting");
    setErrorMsg(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStatus("live");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(
        err?.name === "NotAllowedError"
          ? "Izin kamera ditolak. Aktifkan akses kamera pada browser Anda."
          : "Tidak dapat mengakses kamera. Anda tetap bisa mengunggah gambar."
      );
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStatus("idle");
  }, []);

  useEffect(() => {
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function capture() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `fabric-scan-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        setPreview(URL.createObjectURL(blob));
        onCapture(file);
      },
      "image/jpeg",
      0.92
    );
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onCapture(file);
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface2">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Fabric preview" className="h-full w-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            className={`h-full w-full object-cover ${status === "live" ? "block" : "hidden"}`}
            playsInline
            muted
          />
        )}

        {status !== "live" && !preview && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-mono text-xs text-muted">
              {status === "starting" ? "Mengaktifkan kamera..." : "Kamera belum aktif"}
            </p>
            {errorMsg && <p className="font-body text-xs text-goldSoft">{errorMsg}</p>}
          </div>
        )}

        {status === "live" && !preview && <div className="scan-line" />}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {status !== "live" && !preview && (
          <button
            type="button"
            onClick={startCamera}
            disabled={disabled}
            className="rounded-full bg-gold px-5 py-2 font-body text-sm font-medium text-base transition hover:bg-goldSoft disabled:opacity-60"
          >
            Aktifkan kamera
          </button>
        )}

        {status === "live" && !preview && (
          <button
            type="button"
            onClick={capture}
            disabled={disabled}
            className="rounded-full bg-gold px-5 py-2 font-body text-sm font-medium text-base transition hover:bg-goldSoft disabled:opacity-60"
          >
            Ambil gambar
          </button>
        )}

        {preview && (
          <button
            type="button"
            onClick={() => {
              setPreview(null);
            }}
            className="rounded-full border border-border px-5 py-2 font-body text-sm text-ink transition hover:border-gold"
          >
            Ambil ulang
          </button>
        )}

        <label className="cursor-pointer rounded-full border border-border px-5 py-2 font-body text-sm text-ink transition hover:border-gold">
          Unggah file
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={disabled}
          />
        </label>
      </div>
    </div>
  );
}
