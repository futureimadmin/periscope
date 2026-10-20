# Periscope

> **See what others can't.**

Periscope is a scalable partnership collaboration platform that enables business units — Sales, Marketing, Product, and Development — to formalize, manage, and gain deep visibility into partnerships. One team can look through the Periscope and see the full picture that would otherwise remain hidden.

## Vision

Accelerate business growth, enhance market position, and drive customer satisfaction by creating an effective, scalable partnership model. Periscope provides a formal framework for partnership lifecycle management while delivering AI-powered insights that surface opportunities, risks, and cross-functional alignment gaps.

### Core Capabilities

- **Partnership Formalization Framework**  
  Standardized templates, workflows, SLAs, and governance models for internal cross-functional collaboration and external partner programs.

- **Cross-Team Visibility ("The Periscope")**  
  Unified views so Sales can see Product roadmaps, Marketing can see Development capacity, Product can see Sales pipeline signals, etc.

- **AI Insights powered by Gemini**  
  Partnership health scoring, opportunity detection, risk flags, recommendation engine, and natural-language queries over partnership data.

- **Growth & Satisfaction Metrics**  
  Dashboards linking partnership activities to revenue impact, market share indicators, and customer satisfaction (CSAT/NPS) signals.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + Tailwind CSS |
| Theme | Golden Yellow (`#FFDF00`) primary with dark charcoal base |
| Backend | Google Cloud Functions (Python 3.12) |
| AI | Gemini (Vertex AI / google-generativeai) via Application Default Credentials (ADC) |
| Data | Cloud Firestore |
| GCP Project | `intelligentmachines` |
| Auth | Firebase Auth / Identity Platform (planned) |

## Golden Yellow Theme

Primary brand color: **Golden Yellow** `#FFDF00`

Supporting palette:
- Primary: `#FFDF00`
- Primary Dark: `#CCB200`
- Primary Light: `#FFF299`
- Background Dark: `#0f0f0f`
- Surface: `#1a1a1a`
- Text Primary: `#f5f5f5`
- Text Muted: `#a3a3a3`
- Accent Charcoal: `#262626`

## Repository Structure

```
periscope/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── styles/
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Cloud Functions
│   ├── main.py
│   ├── requirements.txt
│   ├── ai/
│   │   └── gemini_service.py
│   └── functions/
│       ├── partnerships.py
│       └── insights.py
├── docs/
│   └── partnership-framework.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.12+
- Google Cloud SDK
- GCP project: `intelligentmachines`
- Application Default Credentials configured (`gcloud auth application-default login`)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend (local)

```bash
cd backend
pip install -r requirements.txt
functions-framework --target=periscope_api --debug
```

### Deploy Cloud Functions

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
  --project=intelligentmachines \
  --set-env-vars=GCP_PROJECT=intelligentmachines
```

## AI Features (Gemini + ADC)

All AI calls use Application Default Credentials. In Cloud Functions the service account provides credentials automatically. Locally, run:

```bash
gcloud auth application-default login
```

Key AI endpoints:

- `POST /insights/health` – Partnership health score + narrative
- `POST /insights/opportunities` – Detect growth opportunities
- `POST /insights/cross-team` – Generate Periscope view for a requesting team
- `POST /partnerships/recommend-framework` – Suggest formalization structure

## Product Principles

1. **Visibility over assumptions** – Surface the invisible.
2. **Formalize without friction** – Frameworks that scale, not bureaucracy.
3. **AI as co-pilot** – Gemini surfaces signals; humans decide.
4. **Cross-functional by design** – Every view is multi-team aware.

---

Built for intelligentmachines · Powered by Gemini
