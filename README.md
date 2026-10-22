# Periscope

> **See things that cannot be seen otherwise.**

Periscope is a partnership intelligence platform. One business unit looks through a shared lens and gains visibility into **Partner data** and **other business units’ data** — information that is normally invisible because of organisational silos.

The name comes from a periscope: an instrument that lets you see what is blocked from direct view. You do not look straight through; you see what would otherwise stay hidden.

---

## Editions

| Edition | Metaphor | Job |
|--------|----------|-----|
| **Surface Edition** | What breaks the waterline | **Visibility** — Looking from / Looking into Partner and cross-BU data |
| **Depth Edition** | What stays submerged | **Structure** — Framework Builder, formal partnership stages, operating model |

**Surface** brings the periscope up so teams can *see*.  
**Depth** is the submerged machinery: how Sales, Marketing, Product and Development *run* partnerships once they can see.

> Periscope surfaces what silos hide; Depth formalises how teams act on what they see — the submerged operating model of cross-BU collaboration.

---

## Surface Edition (this branch)

Surface is focused on visibility only.

### What is included

| Screen | Purpose |
|--------|---------|
| **Landing** | Product value: visibility into Partner & other BU data |
| **Command Centre** | Partnership health, growth signals, cross-team snapshot |
| **Periscope View** | **Looking from** (which BU) → **Looking into** (Partner or peer-unit data) |
| **Collaboration Spaces** | Shared canvas, signals, light day-to-day collaboration |
| **Partnerships** | List and health of formalised / emerging partnerships |
| **Insights** | Gemini-powered opportunity radar and blind spots |

### What is *not* in Surface

**Framework Builder** (templates, six-stage pipeline, RACI, publish control) belongs to **Depth Edition**. It is the submerged structure — formalisation of how partnerships are run — not the surface view.

---

## Depth Edition (roadmap)

Depth Edition holds what stays submerged:

- **Framework Builder** — design and publish partnership frameworks (Strategic Alliance, Channel, Co-Sell, Technology Partner)
- Stage model (Discovery → Renewal) with activities, success metrics and key risks
- Stage-level RACI across Sales, Marketing, Product and Development
- Framework versioning and admin publish controls
- Deeper governance for cross-BU operating models

Surface answers: *What can we see that we could not see otherwise?*  
Depth answers: *How do we formalise and run partnerships together?*

---

## Why it matters

Without Periscope:
- Sales cannot see Product roadmap constraints or Development capacity
- Marketing cannot see real Partner engagement signals
- Product cannot see early pipeline intent from Sales
- No single team has a clear view of Partner health across the organisation

With **Surface**:
- Any business unit can look through the Periscope and see Partner data + cross-team data in context
- AI (Gemini) surfaces opportunities and risks that only become visible when these data sources are combined

With **Depth** (submerged structure):
- Partnerships are formalised with a scalable framework shared by all BUs
- Stages, metrics and ownership are explicit — collaboration becomes designed execution, not parallel activity

---

## Benefits

**Surface**
- See data that cannot be seen otherwise (Partner + other BU data)
- Partner and cross-BU visibility in one lens
- Gemini-powered insights from combined signals
- Accelerate growth and partner satisfaction with shared visibility

**Depth** (submerged)
- Formalise without friction — templates, stages, RACI, success metrics
- True cross-team operating model for Sales, Marketing, Product and Development

---

## Branch strategy

- `main` — clean, stable baseline
- `surface` — **Surface Edition** UI: visibility screens, Golden Yellow theme (no Framework Builder in nav)

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + Tailwind CSS |
| Theme | Golden Yellow (`#FFDF00`), cream backgrounds |
| Backend | Google Cloud Functions (Python 3.12) |
| AI | Gemini via Application Default Credentials (ADC) |
| GCP Project | `intelligentmachines` |

---

## Getting started (Surface)

```bash
git checkout surface
cd frontend
npm install
npm run dev
```

Backend (local):

```bash
cd backend
pip install -r requirements.txt
functions-framework --target=periscope_api --debug
```

Deploy Cloud Functions (GCP project `intelligentmachines`):

```bash
cd backend
gcloud functions deploy periscope-api \
  --gen2 \
  --runtime=python312 \
  --region=us-central1 \
  --source=. \
  --entry-point=periscope_api \
  --trigger-http \
  --allow-unauthenticated \
  --project=intelligentmachines
```

---

## AI (Gemini + ADC)

All AI calls use Application Default Credentials.  
Locally: `gcloud auth application-default login`.

---

**Surface Edition** — bring the periscope to the surface to see Partner data and other business units’ data that cannot be seen otherwise.  
**Depth Edition** — the submerged operating model: Framework Builder and formal cross-BU partnership structure.

Built for intelligentmachines · Powered by Gemini
