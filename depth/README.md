# Periscope — Depth Edition

**Submerged operating model.** Framework Builder for each BU: steps (doubly linked), hooks for cross-BU info requests.

## What Depth does

- Framework Builder (per-BU)
- Add steps (doubly linked list)
- Add hooks on steps
- Hook connections: request → approve → publish
- Published info becomes visible on Surface

## Run

```bash
cd depth/frontend && npm i && npm run dev
cd depth/backend && functions-framework --target=periscope_api --debug
```

GCP project: `intelligentmachines`
