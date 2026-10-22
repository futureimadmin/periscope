# Depth backend — Framework Builder + custom Python FSM

Lightweight **Python** Cloud Function backend for Depth Edition.
No Spring. Custom finite state machine for partnership stages.

## Layout

```
depth/backend/
├── main.py              # HTTP entrypoint (periscope_api)
├── requirements.txt
├── ai/                  # Gemini (ADC)
└── workflow/
    ├── models.py        # Framework, Stage, RACI, PartnershipRun
    ├── fsm.py           # PartnershipFSM + guards
    └── store.py         # In-memory store (swap for Firestore later)
```

## Stage spine

`discovery → negotiation → formalization → activation → value_realization → renewal`

Rework edges: activation → formalization; renewal → negotiation.

## APIs

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/health` | Service health |
| GET/POST | `/frameworks` | List / create frameworks |
| POST | `/frameworks/{id}/publish` | Publish draft |
| POST | `/frameworks/{id}/stages` | Update stage (draft only) |
| POST | `/frameworks/assist-stage` | Gemini stage assist |
| POST | `/frameworks/validate` | Validate framework |
| POST | `/partnerships/recommend-framework` | Gemini recommend |
| GET/POST | `/runs` | List / start partnership run |
| POST | `/runs/{id}/advance` | Next stage |
| POST | `/runs/{id}/transition` | Explicit `to_stage` |

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
