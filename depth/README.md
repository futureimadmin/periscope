# Periscope — Depth Edition

**Submerged operating model.** Framework Builder for each BU: steps (doubly linked), hooks for cross-BU info requests. Published hook data is what Surface shows via Looking from / Looking into.

## What Depth does

- Framework Builder (per-BU)
- Add steps (doubly linked list)
- Add hooks on steps
- Hook connections: request → approve → publish
- Published info becomes visible on Surface

## Layout

```
depth/
├── frontend/     # Framework Builder UI
└── backend/      # Cloud Function API + workflow models
```

## Run

```bash
# UI
cd depth/frontend && npm i && npm run dev

# API
cd depth/backend && pip install -r requirements.txt
functions-framework --target=periscope_api --debug
```

GCP project: `intelligentmachines`
