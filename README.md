# Periscope \u2014 Surface Edition

> **See things that cannot be seen otherwise.**

## What is Periscope?

Periscope is a partnership intelligence platform that allows **one business unit to look through a shared lens** and gain visibility into:

- **Partner data** (information that partners hold or generate)
- **Other business units\u2019 data** (Sales, Marketing, Product, Development signals)

This is data that is **normally invisible** because of organisational silos.  
Looking through the Periscope makes it visible.

The name comes from the idea of a periscope: an instrument that lets you see things that cannot be seen otherwise.

---

## Why it matters

Without Periscope:
- Sales cannot see Product roadmap constraints or Development capacity
- Marketing cannot see real Partner engagement signals
- Product cannot see early pipeline intent from Sales
- No single team has a clear view of Partner health across the organisation

With Periscope:
- Any business unit can look through the Periscope and see Partner data + cross-team data in context
- Partnerships can be formalised with a scalable framework
- AI (Gemini) surfaces opportunities and risks that only become visible when these data sources are combined

---

## Benefits of using Periscope

- **See Data That Cannot Be Seen Otherwise** \u2014 Partner data and other business units\u2019 data become visible through a single lens.
- **Partner + Cross-BU Visibility** \u2014 Sales sees Product signals. Marketing sees Development capacity. Product sees pipeline intent. Everyone sees relevant Partner data.
- **Formalise Without Friction** \u2014 Scalable framework with templates, stages, RACI, success metrics and governance.
- **True Cross-Team Collaboration** \u2014 Shared partnership canvas for Sales, Marketing, Product and Development.
- **Gemini-Powered Insights** \u2014 AI surfaces opportunities and risks that only appear when Partner data is combined with cross-team signals.
- **Accelerate Growth & Satisfaction** \u2014 Link partnership activity to revenue, pipeline velocity, market position and Partner CSAT.

---

## Branch Strategy

- `main` \u2014 clean, stable baseline
- `surface` \u2014 **Surface Edition**: polished UI matching the product prototypes, light Golden Yellow theme, full feature screens

The Surface Edition represents bringing Periscope to the surface so teams can finally see Partner data and other business units\u2019 data that cannot be seen otherwise.

---

## Core Screens (Surface Edition)

| Screen | Purpose |
|--------|---------|
| **Landing** | Explains the core value: visibility into Partner & other BU data that cannot be seen otherwise |
| **Periscope View (Dashboard)** | Real-time metrics, health heatmap, AI opportunities, Gemini insights |
| **Framework Builder** | Design and publish partnership frameworks with stage templates and AI assist |
| **Partnerships** | Manage formalized and emerging partnerships across teams |
| **Opportunity Radar (Insights)** | Gemini-powered radar of hidden opportunities, risks and recommended actions |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + Tailwind CSS |
| Theme | **Golden Yellow** light theme (`#FFDF00` primary, cream backgrounds) |
| Backend | Google Cloud Functions (Python 3.12) |
| AI | Gemini via Application Default Credentials (ADC) |
| GCP Project | `intelligentmachines` |

---

## Theme \u2014 Golden Yellow (Surface)

- Primary: `#FFDF00` (Golden Yellow)
- Cream background: `#FFF8E7`
- Charcoal text/surfaces for contrast
- Clean, airy SaaS aesthetic matching the product prototypes

---

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

---

## AI Features (Gemini + ADC)

All AI calls use Application Default Credentials.  
Locally run: `gcloud auth application-default login`.

---

**Surface Edition** \u2014 bringing Periscope to the surface so any business unit can see Partner data and other business units\u2019 data that cannot be seen otherwise.  

Built for intelligentmachines \u00b7 Powered by Gemini
