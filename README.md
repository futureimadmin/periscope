# Periscope — Surface Edition

> **See what others can't.**  
> The Surface Edition brings Periscope into clear view so every business unit can collaborate and look through a shared lens.

Periscope is a scalable partnership collaboration platform that enables Sales, Marketing, Product, and Development teams to formalize, manage, and gain deep visibility into partnerships. One team can look through the Periscope and see the full picture that would otherwise remain hidden.

**Branch strategy**  
- `main` — clean, stable baseline  
- `surface` — Surface Edition: polished UI matching the product prototypes, light Holden Yellow theme, full feature screens

## Benefits of using Periscope

- **See What Others Can't** — One business unit looks through the Periscope and instantly gains visibility into partnership health, cross-team signals, and opportunities hidden in silos.
- **Formalise Without Friction** — Scalable framework with templates, stages, RACI, success metrics and governance that grow with you.
- **True Cross-Team Collaboration** — Shared partnership canvas for Sales, Marketing, Product and Development. Raise signals, log decisions, stay aligned.
- **Gemini-Powered Insights** — AI surfaces hidden opportunities, risks and blind spots that only appear when data is combined across teams.
- **Accelerate Growth** — Link partnership activity to revenue impact, pipeline velocity and market-position indicators.
- **Drive Customer Satisfaction** — Partner CSAT, relationship strength and operational alignment stay visible so you can intervene early.

## Core Screens (Surface Edition)

| Screen | Purpose |
|--------|---------|
| **Landing** | Benefits-focused index page explaining why Periscope matters |
| **Periscope View (Dashboard)** | Real-time metrics, health heatmap, AI opportunities, Gemini insights |
| **Framework Builder** | Design and publish partnership frameworks with stage templates and AI assist |
| **Partnerships** | Manage formalized and emerging partnerships across teams |
| **Opportunity Radar (Insights)** | Gemini-powered radar of hidden opportunities, risks and recommended actions |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + Tailwind CSS |
| Theme | **Holden Yellow** light theme (`#F5A600` primary, cream backgrounds) |
| Backend | Google Cloud Functions (Python 3.12) |
| AI | Gemini via Application Default Credentials (ADC) |
| GCP Project | `intelligentmachines` |

## Theme — Holden Yellow (Surface)

- Primary: `#F5A600` / `#FFC107`
- Cream background: `#FFF8E7`
- Charcoal text/surfaces for contrast
- Clean, airy SaaS aesthetic matching the product prototypes

## Getting Started

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

## AI Features (Gemini + ADC)

All AI calls use Application Default Credentials. Locally: `gcloud auth application-default login`.

---

**Surface Edition** — bringing Periscope to the surface so teams can see things that cannot be seen otherwise.  
Built for intelligentmachines · Powered by Gemini
