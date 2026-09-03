export type JsonObject = Record<string, unknown>;

export type Analysis = {
  id: string;
  user_id: string;
  fabric_name: string;
  image_path: string;
  image_url: string | null;
  composition: unknown | null;
  structure: unknown | null;
  washing_condition: unknown | null;
  detections: unknown | null;
  microplastic_shedding_index: number | null;
  fabric_durability_index: number | null;
  recommendation: unknown | null;
  raw_result: unknown | null;
  result_source: "ai_service" | "mock" | "unknown" | string;
  parent_analysis_id: string | null;
  created_at: string;
};

export type CompanyProfile = {
  user_id: string;
  company_name: string;
  industry: string | null;
  contact_name: string | null;
  created_at: string;
  updated_at: string;
};

export function hasValue(value: unknown): boolean {
  if (value === null || value === undefined || value === "") return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value as JsonObject).length > 0;
  return true;
}

export function formatValue(value: unknown): string {
  if (!hasValue(value)) return "Not Available";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map((item) => formatValue(item)).join(", ");
  }
  return Object.entries(value as JsonObject)
    .map(([key, item]) => `${humanize(key)}: ${formatValue(item)}`)
    .join("\n");
}

export function humanize(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function analysisDetectionLabel(analysis: Analysis): string | null {
  const detections = analysis.detections;
  if (!Array.isArray(detections) || detections.length === 0) return null;
  const first = detections[0];
  if (!first || typeof first !== "object") return null;
  const label = (first as JsonObject).class ?? (first as JsonObject).label;
  return typeof label === "string" ? humanize(label) : null;
}
