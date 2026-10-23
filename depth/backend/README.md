# Depth backend — Framework Builder (Steps + Hooks)

Lightweight **Python** Cloud Function backend for Depth Edition.
No Spring. Per-BU frameworks with doubly linked steps and cross-BU hooks.

## Layout

```
depth/backend/
├── main.py              # HTTP entrypoint (periscope_api)
├── requirements.txt
├── ai/
│   └── gemini_service.py   # Gemini assist (ADC)
└── workflow/
    ├── models.py        # Framework, Step, Hook, HookConnection
    ├── fsm.py           # prev/next step traversal helpers
    └── store.py         # In-memory store (Firestore-ready)
```

## Model

```
Framework (owned by BU)
  └── Step ↔ Step ↔ Step   (doubly linked)
        └── Hook[]
              └── HookConnection (requested → approved → active)
                    └── published_info → visible on Surface
```

## APIs

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/health` | Service health |
| GET/POST | `/frameworks` | List / create (query `?bu=`) |
| POST | `/frameworks/{id}/publish` | Publish draft |
| POST | `/frameworks/{id}/steps` | Add step |
| POST | `/frameworks/{id}/steps/{stepId}/hooks` | Add hook |
| POST | `/hooks/connect` | Request hook connection |
| POST | `/hooks/connections/{id}/approve` | Approve |
| POST | `/hooks/connections/{id}/publish` | Publish info payload |
| GET | `/hooks/connections` | List connections |
| GET | `/surface/visibility?looking_from=` | Feed for Surface Looking into |

## Local run

```bash
cd depth/backend
pip install -r requirements.txt
functions-framework --target=periscope_api --debug
```

## Deploy (intelligentmachines)

```bash
gcloud functions deploy periscope-depth-api \
  --gen2 --runtime=python312 --region=us-central1 \
  --source=. --entry-point=periscope_api \
  --trigger-http --allow-unauthenticated \
  --project=intelligentmachines
```
