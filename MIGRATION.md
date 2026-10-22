# Migration — Surface & Depth folders

The product is split into two editions under the repo root:

```
surface/     # Surface Edition — visibility
depth/       # Depth Edition — submerged structure (Framework Builder)
```

## Current state on branch `surface`

- Root `README.md` describes the dual-edition layout.
- `surface/backend/` — visibility Cloud Functions (`/insights/*`).
- `depth/backend/` — framework Cloud Functions (`/partnerships/recommend-framework`, `/frameworks/*`).
- `depth/frontend/src/App.tsx` — Depth nav (Framework Builder primary).
- Legacy root `frontend/` and `backend/` may still exist during transition.

## Completing the frontend copy

If `surface/frontend` or `depth/frontend` is incomplete on remote, from a local clone:

```bash
git checkout surface
# From a full local restructure (or extract archive):
# cp -a surface/frontend depth/frontend as needed

# Surface: no Framework.tsx in pages; App without Framework route
# Depth: Framework.tsx present; App default route = Framework Builder

cd surface/frontend && npm install && npm run dev
cd depth/frontend && npm install && npm run dev
```

## Edition rules

| Path | Contains |
|------|----------|
| `surface/` | Looking from / Looking into, Command Centre, Insights, Collaboration |
| `depth/` | Framework Builder, formal stages, RACI, publish/governance APIs |

Legacy root `frontend/` / `backend/` can be removed once both edition folders are verified.
