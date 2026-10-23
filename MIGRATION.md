# Surface vs Depth layout

| Path | Role |
|------|------|
| `surface/frontend` | Surface UI — self-contained (pages, public assets) |
| `surface/backend` | Surface Cloud Functions (visibility / Gemini) |
| `depth/frontend` | Depth UI — Framework Builder (full Framework.tsx) |
| `depth/backend` | Depth Cloud Functions (frameworks, steps, hooks) |
| `frontend/` | Shared reference UI (same Golden Yellow theme) |
| `backend/` | Legacy shared entry (prefer surface/ and depth/) |

## Product flow

1. Depth: BU builds framework → adds steps → adds hooks → publish
2. Other BU connects to hook → approve → publish info
3. Surface: Looking from / Looking into → sees published hook data

Branch: **surface** (keep **main** clean).
