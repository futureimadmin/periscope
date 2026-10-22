# Periscope

> **See things that cannot be seen otherwise.**

Partnership intelligence platform for Sales, Marketing, Product and Development.

A periscope lets you see what is blocked from direct view. **Surface Edition** brings that view up. **Depth Edition** holds the submerged operating model — how partnerships are formalised and run.

---

## Repository layout

```
periscope/
├── surface/                 # Surface Edition
│   ├── frontend/            # Visibility UI (Looking from / Looking into)
│   └── backend/             # Cloud Functions — insights & cross-team visibility
├── depth/                   # Depth Edition
│   ├── frontend/            # Framework Builder & formalisation UI
│   └── backend/             # Cloud Functions — framework recommend & assist
└── README.md
```

| Edition | Folder | Job |
|--------|--------|-----|
| **Surface** | `surface/` | Visibility — Partner & cross-BU data that cannot be seen otherwise |
| **Depth** | `depth/` | Structure — Framework Builder, stages, RACI (submerged operating model) |

---

## Surface Edition

```bash
cd surface/frontend && npm install && npm run dev
cd surface/backend && pip install -r requirements.txt
functions-framework --target=periscope_api --debug
```

Screens: Command Centre, Periscope View, Collaboration Spaces, Partnerships, Insights.

## Depth Edition

```bash
cd depth/frontend && npm install && npm run dev
cd depth/backend && pip install -r requirements.txt
functions-framework --target=periscope_api --debug
```

Screens: Framework Builder (primary), Partnerships, Operating Overview.

---

## Tech

- Frontend: React + Vite + Tailwind (Golden Yellow)
- Backend: Cloud Functions (Python 3.12), Gemini via ADC
- GCP project: `intelligentmachines`

Branch `surface` carries this dual-folder layout. `main` remains the clean baseline.

Built for intelligentmachines · Powered by Gemini
