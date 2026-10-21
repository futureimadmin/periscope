# Periscope — Surface Edition

> **See things that cannot be seen otherwise.**  
> One business unit can look through the Periscope and gain visibility into **Partner data** and **other business units’ data** — information that is normally invisible due to organisational silos.

Periscope is a scalable partnership collaboration platform that enables Sales, Marketing, Product, and Development teams to formalize, manage, and gain deep visibility into partnerships. The core value is simple: data and signals that cannot be seen otherwise become visible when you look through the Periscope.

**Branch strategy**  
- `main` — clean, stable baseline  
- `surface` — Surface Edition: polished UI matching the product prototypes, light Holden Yellow theme, full feature screens

## Benefits of using Periscope

- **See Data That Cannot Be Seen Otherwise** — One business unit looks through the Periscope and gains visibility into Partner data and other business units’ data that is normally locked behind silos.
- **Partner + Cross-BU Visibility** — Sales can see Product signals. Marketing can see Development capacity. Product can see pipeline intent. Everyone can see relevant Partner data in context.
- **Formalise Without Friction** — Scalable framework with templates, stages, RACI, success metrics and governance.
- **True Cross-Team Collaboration** — Shared partnership canvas for Sales, Marketing, Product and Development.
- **Gemini-Powered Insights** — AI surfaces opportunities and risks that only become visible when Partner data is combined with cross-team signals.
- **Accelerate Growth & Satisfaction** — Link partnership activity to revenue, pipeline velocity, market position and Partner CSAT.

## Core Screens (Surface Edition)

| Screen | Purpose |
|--------|---------|
| **Landing** | Explains the core value: visibility into Partner & other BU data that cannot be seen otherwise |
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

**Surface Edition** — bringing Periscope to the surface so any business unit can see Partner data and other business units’ data that cannot be seen otherwise.  
Built for intelligentmachines · Powered by Gemini
