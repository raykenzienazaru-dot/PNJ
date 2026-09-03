const fetch = require("node-fetch");

const YOLO_SERVICE_URL = process.env.YOLO_SERVICE_URL;
const YOLO_SERVICE_API_KEY = process.env.YOLO_SERVICE_API_KEY;
const ALLOW_MOCK_INFERENCE =
  (process.env.ALLOW_MOCK_INFERENCE || "true").toLowerCase() === "true";

const FABRIC_CLASSES = [
  "cotton_weave",
  "polyester_blend",
  "denim",
  "knit_jersey",
  "linen",
  "synthetic_fleece",
];

/**
 * Deterministic-ish mock inference so a demo/dev environment can exercise the
 * full flow (camera -> capture -> backend -> "AI Service" -> result popup)
 * without a trained model attached yet. Every mock response is explicitly
 * flagged with source: "mock" so the frontend can show a disclaimer badge.
 */
function mockInference(imageBuffer) {
  const seed = imageBuffer ? imageBuffer.length : Math.floor(Math.random() * 999999);
  const rand = (min, max, salt = 0) => {
    const x = Math.sin(seed + salt) * 10000;
    const frac = x - Math.floor(x);
    return +(min + frac * (max - min)).toFixed(2);
  };

  const detectedClass = FABRIC_CLASSES[seed % FABRIC_CLASSES.length];

  return {
    source: "mock",
    detections: [
      {
        class: detectedClass,
        confidence: rand(0.72, 0.97, 1),
        bbox: [
          rand(0, 0.2, 2),
          rand(0, 0.2, 3),
          rand(0.6, 0.95, 4),
          rand(0.6, 0.95, 5),
        ],
      },
    ],
    visual_features_summary: {
      texture_uniformity: rand(0.4, 0.95, 6),
      surface_roughness: rand(0.1, 0.8, 7),
      weave_pattern_confidence: rand(0.5, 0.9, 8),
    },
    prediction: {
      microplastic_shedding_index: rand(0.1, 0.9, 9),
      fabric_durability_index: rand(0.3, 0.95, 10),
      note:
        "Nilai ini adalah hasil MOCK untuk keperluan pengembangan. Model EfficientNet-B0 + XGBoost belum terhubung.",
    },
    recommendation: {
      material: `Pertimbangkan alternatif komposisi untuk kelas terdeteksi (${detectedClass}) guna menyeimbangkan durability dan shedding.`,
      care: "Cuci pada suhu rendah dan hindari pengeringan mesin suhu tinggi untuk mengurangi pelepasan serat.",
      alternative_composition:
        "Evaluasi campuran serat alami-sintetis dengan rasio berbeda sebagai skenario what-if.",
    },
  };
}

/**
 * Calls the external AI Service (YOLO / EfficientNet+XGBoost late-fusion pipeline).
 * Falls back to mockInference() if the service isn't configured/reachable and
 * ALLOW_MOCK_INFERENCE=true.
 *
 * @param {Buffer} imageBuffer - raw image bytes from multer
 * @param {Object} fabricData - structured fabric data (composition, structure, washing condition)
 */
async function runInference(imageBuffer, fabricData = {}) {
  if (!YOLO_SERVICE_URL) {
    if (ALLOW_MOCK_INFERENCE) return mockInference(imageBuffer);
    throw new Error("YOLO_SERVICE_URL is not configured");
  }

  try {
    const base64Image = imageBuffer.toString("base64");

    const response = await fetch(YOLO_SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(YOLO_SERVICE_API_KEY
          ? { Authorization: `Bearer ${YOLO_SERVICE_API_KEY}` }
          : {}),
      },
      body: JSON.stringify({
        image_base64: base64Image,
        fabric_data: fabricData,
      }),
      timeout: 20000,
    });

    if (!response.ok) {
      throw new Error(`AI Service responded with status ${response.status}`);
    }

    const result = await response.json();
    return { source: "ai_service", ...result };
  } catch (err) {
    console.error("[yoloService] AI Service call failed:", err.message);
    if (ALLOW_MOCK_INFERENCE) {
      console.warn("[yoloService] Falling back to mock inference.");
      return mockInference(imageBuffer);
    }
    throw err;
  }
}

module.exports = { runInference, FABRIC_CLASSES };
