const fetch = require("node-fetch");

/**
 * ---------------------------------------------------------------------------
 * Roboflow Workflow integration ("fabric-defect-detection")
 * ---------------------------------------------------------------------------
 * This service calls the PUBLISHED Roboflow Workflow API for the workflow
 * defined at backend/config/roboflow.workflow.json:
 *
 *   workspace : evelly-khanza
 *   workflow  : fabric-defect-detection_2025-tw6ok-ll8oy
 *   output    : "predictions" -> $steps.model.predictions (object detection)
 *
 * Roboflow's "Deploy Workflow" panel publishes this exact call:
 *
 *   from inference_sdk import InferenceHTTPClient
 *   client = InferenceHTTPClient(
 *     api_url="https://serverless.roboflow.com",
 *     api_key="ROBOFLOW_API_KEY",
 *   )
 *   result = client.run_workflow(
 *     workspace_name="evelly-khanza",
 *     workflow_id="fabric-defect-detection_2025-tw6ok-ll8oy",
 *     images={ "image": "YOUR_IMAGE.jpg" },
 *   )
 *
 * Its raw HTTP equivalent (what this file actually calls) is:
 *
 *   POST https://serverless.roboflow.com/infer/workflows/evelly-khanza/fabric-defect-detection_2025-tw6ok-ll8oy
 *   Content-Type: application/json
 *   {
 *     "api_key": "ROBOFLOW_API_KEY",
 *     "inputs": { "image": { "type": "base64", "value": "<base64 image>" } }
 *   }
 *
 * Response shape:
 *   {
 *     "outputs": [
 *       {
 *         "predictions": {
 *           "image": { "width": <int>, "height": <int> },
 *           "predictions": [
 *             {
 *               "x": <number>, "y": <number>,
 *               "width": <number>, "height": <number>,
 *               "confidence": <number 0-1>,
 *               "class": "<defect_class>",
 *               "class_id": <int>,
 *               "detection_id": "<uuid>"
 *             }
 *           ]
 *         }
 *       }
 *     ]
 *   }
 *
 * IMPORTANT — if only "hole" ever comes back for every image:
 * This backend does NOT filter, sort, or drop any class returned by
 * Roboflow — every detection object in the response is mapped through
 * as-is (see `detections` below), and DEBUG_ROBOFLOW=true (see below) will
 * log the exact class list Roboflow returned for each request. If the log
 * shows Roboflow itself only ever returning "hole", the cause is on the
 * Roboflow project side, not this integration — typically one of:
 *   1. The model's per-class confidence threshold is too high for the
 *      other classes (check the "Model" block's confidence slider in the
 *      Workflow editor, or lower it and republish).
 *   2. The training set for "Stain" / "seam" / "Thread" / "Warp_Weft" is
 *      small/imbalanced relative to "hole", so the model just hasn't
 *      learned them well yet (needs more/better annotated examples).
 *   3. You're testing with images that genuinely only contain a hole.
 * Testing the same image directly in Roboflow's "Deploy Workflow" preview
 * panel (outside this app) is the fastest way to confirm which of the
 * above it is.
 * ---------------------------------------------------------------------------
 */

// Serverless Hosted API V2 is Roboflow's current single endpoint for running
// both models and Workflows (replaces the older detect.roboflow.com host).
const ROBOFLOW_API_BASE = (process.env.ROBOFLOW_API_BASE || "https://serverless.roboflow.com").replace(/\/+$/, "");
const ROBOFLOW_WORKSPACE = process.env.ROBOFLOW_WORKSPACE || "evelly-khanza";
const ROBOFLOW_WORKFLOW_ID = process.env.ROBOFLOW_WORKFLOW_ID || "fabric-defect-detection_2025-tw6ok-ll8oy";
const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;
const ROBOFLOW_TIMEOUT_MS = Number(process.env.ROBOFLOW_TIMEOUT_MS || 20000);

const ALLOW_MOCK_INFERENCE =
  (process.env.ALLOW_MOCK_INFERENCE || "true").toLowerCase() === "true";

// Set DEBUG_ROBOFLOW=true in .env to log the raw class list Roboflow
// returns for every request — useful for diagnosing "only one class ever
// comes back" style issues without dumping the full image/response.
const DEBUG_ROBOFLOW = (process.env.DEBUG_ROBOFLOW || "false").toLowerCase() === "true";

// Real class names published by the "fabric-defect-detection" Roboflow
// project this workflow wraps. Used both to label the mock fallback and to
// weight the derived durability index below.
const FABRIC_CLASSES = ["hole", "Stain", "seam", "Thread", "Warp_Weft"];

// Per-class severity table that directly drives fabric_durability_index
// (see deriveDurabilityIndex below): fabric_durability_index = 1 - the
// confidence-weighted average severity of the detected classes. The
// Roboflow model only returns bounding-box detections (class + confidence
// + geometry); it does NOT natively output a durability score, so this
// table is the single, transparent source of truth used to derive it.
// Keys are lowercased to match case-insensitively against whatever casing
// Roboflow returns (e.g. "Stain" -> "stain").
const DEFECT_SEVERITY = {
  hole: 0.9,
  stain: 0.5,
  seam: 0.55,
  thread: 0.35,
  warp_weft: 0.65,
  default: 0.4,
};

function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function humanizeClass(cls) {
  return String(cls || "unknown").replace(/[_-]+/g, " ");
}

function buildWorkflowUrl() {
  return `${ROBOFLOW_API_BASE}/infer/workflows/${ROBOFLOW_WORKSPACE}/${ROBOFLOW_WORKFLOW_ID}`;
}

/**
 * Cheap, dependency-free string hash (djb2) so the mock fallback picks a
 * class based on actual image BYTE CONTENT rather than just buffer length.
 * Using plain buffer length as the seed meant visually different photos
 * that happen to encode to a similar file size could all land on the same
 * "detected" class — this fixes that for the mock/demo path.
 */
function hashBuffer(buffer) {
  let hash = 5381;
  const step = Math.max(1, Math.floor(buffer.length / 2048)); // sample, don't hash multi-MB images byte-by-byte
  for (let i = 0; i < buffer.length; i += step) {
    hash = ((hash << 5) + hash + buffer[i]) | 0; // hash * 33 + byte
  }
  return Math.abs(hash);
}

/**
 * Deterministic-ish mock inference so a demo/dev environment can exercise
 * the full flow (camera -> capture -> backend -> Roboflow -> result popup)
 * without ROBOFLOW_API_KEY configured yet. Every mock response is explicitly
 * flagged with source: "mock" so the frontend can show a disclaimer badge.
 * Mock detections use the SAME class names as the real Roboflow model
 * (see FABRIC_CLASSES) so the UI behaves identically either way, and the
 * class is picked from the image's actual byte content (see hashBuffer)
 * so different photos reliably produce different mock classes.
 */
function mockInference(imageBuffer) {
  const buffer = imageBuffer && imageBuffer.length ? imageBuffer : Buffer.from(String(Math.random()));
  const seed = hashBuffer(buffer);
  const rand = (min, max, salt = 0) => {
    const x = Math.sin(seed + salt) * 10000;
    const frac = x - Math.floor(x);
    return +(min + frac * (max - min)).toFixed(2);
  };

  const detectedClass = FABRIC_CLASSES[seed % FABRIC_CLASSES.length];
  const detections = [
    {
      class: detectedClass,
      class_id: seed % FABRIC_CLASSES.length,
      confidence: rand(0.55, 0.95, 3),
      x: rand(80, 400, 4),
      y: rand(80, 300, 5),
      width: rand(30, 120, 6),
      height: rand(30, 120, 7),
      detection_id: `mock-${seed}`,
    },
  ];

  const fabric_durability_index = deriveDurabilityIndex(detections);

  if (DEBUG_ROBOFLOW) {
    console.log("[yoloService] MOCK detection ->", detectedClass, "(no ROBOFLOW_API_KEY configured)");
  }

  return {
    source: "mock",
    model: {
      provider: "roboflow",
      workspace: ROBOFLOW_WORKSPACE,
      workflow_id: ROBOFLOW_WORKFLOW_ID,
    },
    image_meta: null,
    detections,
    prediction: {
      fabric_durability_index,
      note:
        "This is a MOCK result for development purposes. The Roboflow workflow is not connected yet (ROBOFLOW_API_KEY is not set).",
    },
    recommendation: buildRecommendation(detections),
  };
}

/**
 * Normalizes whatever shape Roboflow returns for the "predictions" output
 * field into a flat array of detections. Handles both:
 *   outputs[0].predictions.predictions  (image + predictions object)
 *   outputs[0].predictions              (already a flat array)
 * Every detection Roboflow returns is kept — nothing here filters by
 * class or confidence, so if Roboflow sends 5 different classes, all 5
 * come through.
 */
function extractPredictions(payload) {
  const outputs = payload && payload.outputs;
  const firstOutput = Array.isArray(outputs) ? outputs[0] : outputs;
  const predictionsField = firstOutput ? firstOutput.predictions : payload && payload.predictions;

  if (Array.isArray(predictionsField)) return predictionsField;
  if (predictionsField && Array.isArray(predictionsField.predictions)) {
    return predictionsField.predictions;
  }
  return [];
}

function extractImageMeta(payload) {
  const outputs = payload && payload.outputs;
  const firstOutput = Array.isArray(outputs) ? outputs[0] : outputs;
  const predictionsField = firstOutput && firstOutput.predictions;
  return (predictionsField && predictionsField.image) || null;
}

// Baseline used only when NO defects are detected (severity table doesn't
// apply since there is no class to look up).
const NO_DEFECT_DURABILITY_INDEX = 0.95;

/**
 * fabric_durability_index is derived DIRECTLY from DEFECT_SEVERITY:
 * confidence-weighted average of DEFECT_SEVERITY[class] across all
 * detections, inverted (1 - avgSeverity) so a higher-severity class means
 * lower durability. This keeps the metric driven by a single, transparent
 * per-class table instead of an arbitrary constant.
 */
function deriveDurabilityIndex(detections) {
  if (!detections.length) return NO_DEFECT_DURABILITY_INDEX;

  let weightedSeveritySum = 0;
  let confidenceSum = 0;

  detections.forEach((det) => {
    const key = String(det.class || "").toLowerCase().trim().replace(/\s+/g, "_");
    const severity = DEFECT_SEVERITY[key] ?? DEFECT_SEVERITY.default;
    const confidence = typeof det.confidence === "number" ? det.confidence : 0.5;
    weightedSeveritySum += severity * confidence;
    confidenceSum += confidence;
  });

  const avgSeverity = confidenceSum > 0 ? weightedSeveritySum / confidenceSum : DEFECT_SEVERITY.default;
  return round2(clamp01(1 - avgSeverity));
}

function buildRecommendation(detections) {
  if (!detections.length) {
    return {
      material: "No fabric defects were detected in this image.",
      care: "Follow standard care guidelines for this fabric type.",
      alternative_composition: null,
    };
  }

  const classes = [...new Set(detections.map((d) => humanizeClass(d.class)))];
  return {
    material: `Detected defect type(s): ${classes.join(", ")}. Inspect the flagged area(s) before use or shipment.`,
    care: "Handle gently around the flagged defect area(s); avoid high-tension or high-temperature washing/drying that could worsen the damage.",
    alternative_composition: "Re-scan after remediation (e.g. mending, re-weaving) to confirm the defect is no longer detected.",
  };
}

/**
 * Calls the Roboflow Workflow ("fabric-defect-detection") described above.
 * Falls back to mockInference() if ROBOFLOW_API_KEY isn't configured or the
 * request fails, and ALLOW_MOCK_INFERENCE=true.
 *
 * @param {Buffer} imageBuffer - raw image bytes from multer
 * @param {Object} fabricData - structured fabric data (composition, structure, washing condition)
 */
async function runInference(imageBuffer, fabricData = {}) {
  if (!ROBOFLOW_API_KEY) {
    if (ALLOW_MOCK_INFERENCE) return mockInference(imageBuffer);
    throw new Error("ROBOFLOW_API_KEY is not configured");
  }

  try {
    const base64Image = imageBuffer.toString("base64");

    const response = await fetch(buildWorkflowUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: ROBOFLOW_API_KEY,
        inputs: {
          image: { type: "base64", value: base64Image },
        },
      }),
      timeout: ROBOFLOW_TIMEOUT_MS,
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      throw new Error(`Roboflow workflow responded with status ${response.status}: ${errText}`);
    }

    const payload = await response.json();
    const rawDetections = extractPredictions(payload);
    const imageMeta = extractImageMeta(payload);

    // Every detection Roboflow returns is kept as-is — no class or
    // confidence filtering happens here.
    const detections = rawDetections.map((det) => ({
      class: det.class,
      class_id: det.class_id,
      confidence: typeof det.confidence === "number" ? round2(det.confidence) : det.confidence,
      x: det.x,
      y: det.y,
      width: det.width,
      height: det.height,
      detection_id: det.detection_id,
    }));

    if (DEBUG_ROBOFLOW) {
      console.log(
        "[yoloService] Roboflow returned",
        detections.length,
        "detection(s):",
        detections.map((d) => `${d.class} (${d.confidence})`).join(", ") || "none"
      );
    }

    const fabric_durability_index = deriveDurabilityIndex(detections);

    return {
      source: "ai_service",
      model: {
        provider: "roboflow",
        workspace: ROBOFLOW_WORKSPACE,
        workflow_id: ROBOFLOW_WORKFLOW_ID,
      },
      image_meta: imageMeta,
      detections,
      prediction: {
        fabric_durability_index,
        note:
          detections.length > 0
            ? "Durability index is a heuristic derived from the fabric defects Roboflow detected (not a direct model output)."
            : "No fabric defects were detected in this image.",
      },
      recommendation: buildRecommendation(detections),
      fabric_data: fabricData,
    };
  } catch (err) {
    console.error("[yoloService] Roboflow workflow call failed:", err.message);
    if (ALLOW_MOCK_INFERENCE) {
      console.warn("[yoloService] Falling back to mock inference.");
      return mockInference(imageBuffer);
    }
    throw err;
  }
}

module.exports = {
  runInference,
  FABRIC_CLASSES,
  ROBOFLOW_WORKSPACE,
  ROBOFLOW_WORKFLOW_ID,
};
