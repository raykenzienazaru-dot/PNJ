# Roboflow Published API — `fabric-defect-detection`

Reference for the workflow consumed by `backend/services/yoloService.js`.
This is the exact API Roboflow publishes from the **Deploy Workflow** panel
for:

- Workspace: `evelly-khanza`
- Workflow ID: `fabric-defect-detection_2025-tw6ok-ll8oy`
- Classes: `hole`, `Stain`, `seam`, `Thread`, `Warp_Weft`

## 1. Python (`inference-sdk`)

```bash
pip install inference-sdk
```

```python
from inference_sdk import InferenceHTTPClient, InferenceConfiguration

client = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key="ROBOFLOW_API_KEY",
).configure(InferenceConfiguration(api_key_transport="header"))

result = client.run_workflow(
    workspace_name="evelly-khanza",
    workflow_id="fabric-defect-detection_2025-tw6ok-ll8oy",
    images={"image": "YOUR_IMAGE.jpg"},
)

print(result)
```

## 2. Raw HTTP (what the Node.js backend actually calls)

```bash
curl --location 'https://serverless.roboflow.com/infer/workflows/evelly-khanza/fabric-defect-detection_2025-tw6ok-ll8oy' \
  --header 'Content-Type: application/json' \
  --data '{
    "api_key": "ROBOFLOW_API_KEY",
    "inputs": {
      "image": { "type": "base64", "value": "<BASE64_IMAGE>" }
    }
  }'
```

You can also pass `"type": "url"` instead of `"base64"` if you already have a
public image URL (e.g. the Supabase Storage public URL) instead of raw bytes.

## 3. Response shape

```json
{
  "outputs": [
    {
      "predictions": {
        "image": { "width": 1280, "height": 960 },
        "predictions": [
          {
            "x": 512.4,
            "y": 331.9,
            "width": 84.2,
            "height": 60.7,
            "confidence": 0.91,
            "class": "hole",
            "class_id": 0,
            "detection_id": "b5b6b8f0-....."
          }
        ]
      }
    }
  ]
}
```

`backend/services/yoloService.js` normalizes this into
`{ detections: [...], image_meta, prediction, recommendation }` and stores
it on the `fabric_analyses` row (`raw_result`, `detections`,
`microplastic_shedding_index`, `fabric_durability_index`, `recommendation`).

## 4. Environment variables

| Variable               | Default                             | Notes                                   |
| ----------------------- | ------------------------------------ | ---------------------------------------- |
| `ROBOFLOW_API_BASE`      | `https://serverless.roboflow.com`    | Serverless Hosted API V2 host            |
| `ROBOFLOW_WORKSPACE`     | `evelly-khanza`                      | Workspace ID                             |
| `ROBOFLOW_WORKFLOW_ID`   | `fabric-defect-detection_2025-tw6ok-ll8oy` | Workflow ID                       |
| `ROBOFLOW_API_KEY`       | _(none)_                             | Required for real inference              |
| `ROBOFLOW_TIMEOUT_MS`    | `20000`                              | Request timeout                          |
| `ALLOW_MOCK_INFERENCE`   | `true`                               | Falls back to a local mock if unset/down |

Set `ALLOW_MOCK_INFERENCE=false` once `ROBOFLOW_API_KEY` is configured for
production, so a failed Roboflow call surfaces as an error instead of
silently returning mock data.
