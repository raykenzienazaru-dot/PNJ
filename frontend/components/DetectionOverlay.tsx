"use client";

import { useState } from "react";
import { humanize } from "@/types/analysis";

type RoboflowDetection = {
  class?: string;
  confidence?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

type ImageMeta = { width?: number; height?: number } | null | undefined;

/**
 * Renders the captured fabric image with the defect bounding boxes returned
 * by the Roboflow "fabric-defect-detection" workflow drawn on top of it.
 *
 * Detections use Roboflow's coordinate convention: (x, y) is the CENTER of
 * the box, in pixels relative to the original image dimensions
 * (image_meta.width/height, i.e. raw_result.image_meta). If image_meta is
 * unavailable (e.g. mock results), the box falls back to the image's own
 * natural size once it loads.
 */
export default function DetectionOverlay({
  src,
  alt,
  detections,
  imageMeta,
}: {
  src: string;
  alt: string;
  detections: unknown;
  imageMeta?: unknown;
}) {
  const [natural, setNatural] = useState<{ width: number; height: number } | null>(null);

  const list = Array.isArray(detections) ? (detections as RoboflowDetection[]) : [];
  const meta = imageMeta && typeof imageMeta === "object" ? (imageMeta as ImageMeta) : null;

  const refWidth = meta?.width || natural?.width;
  const refHeight = meta?.height || natural?.height;

  const boxes = list.filter(
    (detection) =>
      typeof detection.x === "number" &&
      typeof detection.y === "number" &&
      typeof detection.width === "number" &&
      typeof detection.height === "number"
  );

  const canDrawBoxes = Boolean(refWidth && refHeight) && boxes.length > 0;

  return (
    <div className="relative h-full w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain bg-surface2"
        onLoad={(event) => {
          const img = event.currentTarget;
          setNatural({ width: img.naturalWidth, height: img.naturalHeight });
        }}
      />
      {canDrawBoxes && (
        <svg
          viewBox={`0 0 ${refWidth} ${refHeight}`}
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {boxes.map((detection, index) => {
            const width = detection.width as number;
            const height = detection.height as number;
            const left = (detection.x as number) - width / 2;
            const top = (detection.y as number) - height / 2;
            const strokeWidth = Math.max(refWidth!, refHeight!) * 0.004;
            const fontSize = Math.max(refWidth!, refHeight!) * 0.028;
            const label = `${humanize(detection.class || "defect")}${
              typeof detection.confidence === "number" ? ` ${Math.round(detection.confidence * 100)}%` : ""
            }`;

            return (
              <g key={detection.class ? `${detection.class}-${index}` : index}>
                <rect
                  x={left}
                  y={top}
                  width={width}
                  height={height}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth={strokeWidth}
                  rx={Math.max(2, strokeWidth)}
                />
                <text
                  x={left}
                  y={Math.max(top - strokeWidth * 2, fontSize)}
                  fill="#ef4444"
                  fontSize={fontSize}
                  fontWeight={700}
                  style={{ paintOrder: "stroke", stroke: "#ffffff", strokeWidth: strokeWidth * 1.5 }}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
