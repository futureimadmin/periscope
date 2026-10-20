"""
Gemini service for Periscope AI features.
Uses Application Default Credentials (ADC).
Works both locally (after gcloud auth application-default login)
and in Cloud Functions (service account).
"""

import os
import json
from typing import Any, Dict, List, Optional

import google.generativeai as genai
from google.auth import default

# Project configuration
GCP_PROJECT = os.getenv("GCP_PROJECT", "intelligentmachines")
LOCATION = os.getenv("GCP_LOCATION", "us-central1")
MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")


def _init_gemini() -> None:
    """Initialize Gemini with ADC."""
    credentials, project = default()
    # Prefer Vertex AI style when possible; fall back to generativeai with ADC
    genai.configure(credentials=credentials)


_init_gemini()


class GeminiService:
    """High-level AI operations for partnership management."""

    def __init__(self, model_name: str = MODEL_NAME):
        self.model = genai.GenerativeModel(model_name)

    def _generate(self, prompt: str, system: Optional[str] = None) -> str:
        full_prompt = f"{system}\n\n{prompt}" if system else prompt
        response = self.model.generate_content(
            full_prompt,
            generation_config={
                "temperature": 0.4,
                "top_p": 0.95,
                "max_output_tokens": 2048,
            },
        )
        return response.text.strip()

    def partnership_health(
        self,
        partnership: Dict[str, Any],
        recent_activity: Optional[List[Dict[str, Any]]] = None,
    ) -> Dict[str, Any]:
        """Score partnership health and produce a narrative."""
        system = (
            "You are Periscope AI, an expert in B2B and cross-functional partnership "
            "health. Return concise, actionable insights in JSON format."
        )
        prompt = f"""
Analyze the following partnership and return a JSON object with keys:
- score (0-100 integer)
- status ("healthy" | "at_risk" | "critical" | "emerging")
- summary (2-3 sentence narrative)
- strengths (list of strings)
- risks (list of strings)
- recommended_actions (list of strings, prioritized)

Partnership data:
{json.dumps(partnership, indent=2)}

Recent activity:
{json.dumps(recent_activity or [], indent=2)}
"""
        raw = self._generate(prompt, system)
        try:
            # Extract JSON if model wraps it
            start = raw.find("{")
            end = raw.rfind("}") + 1
            return json.loads(raw[start:end])
        except Exception:
            return {
                "score": 50,
                "status": "emerging",
                "summary": raw,
                "strengths": [],
                "risks": [],
                "recommended_actions": [],
            }

    def cross_team_periscope(
        self,
        requesting_team: str,
        teams_data: Dict[str, Any],
        context: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Generate a "Periscope" view: what one business unit should see
        about the others to improve collaboration.
        """
        system = (
            "You are Periscope. Your job is to let one business unit see what "
            "is normally invisible — the priorities, constraints, signals and "
            "opportunities of peer teams (Sales, Marketing, Product, Development). "
            "Be specific, practical and balanced. Return JSON."
        )
        prompt = f"""
Requesting team: {requesting_team}

Team data:
{json.dumps(teams_data, indent=2)}

Additional context: {context or "None"}

Return a JSON object with:
- headline (one powerful sentence)
- visibility_gaps (list of things this team currently cannot see but should)
- key_signals (list of important signals from other teams)
- collaboration_opportunities (list of concrete joint actions)
- recommended_questions (questions this team should ask the others)
- risk_of_misalignment (short paragraph)
"""
        raw = self._generate(prompt, system)
        try:
            start = raw.find("{")
            end = raw.rfind("}") + 1
            return json.loads(raw[start:end])
        except Exception:
            return {"headline": raw, "visibility_gaps": [], "key_signals": [],
                    "collaboration_opportunities": [], "recommended_questions": [],
                    "risk_of_misalignment": ""}

    def recommend_framework(
        self,
        partnership_type: str,
        parties: List[str],
        goals: List[str],
        constraints: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """Recommend a formalization framework for a partnership."""
        system = (
            "You are an expert in designing scalable partnership operating models. "
            "Propose lightweight but formal structures that improve accountability "
            "without creating bureaucracy. Return JSON."
        )
        prompt = f"""
Design a partnership formalization framework.

Type: {partnership_type}
Parties: {parties}
Goals: {goals}
Constraints: {constraints or []}

Return JSON with:
- recommended_structure (name + short description)
- key_roles (list of role objects with name + responsibility)
- governance_cadence (meeting/review rhythm)
- success_metrics (list of measurable KPIs)
- onboarding_checklist (list of steps)
- escalation_path (short description)
- template_outline (high-level sections for the partnership agreement)
"""
        raw = self._generate(prompt, system)
        try:
            start = raw.find("{")
            end = raw.rfind("}") + 1
            return json.loads(raw[start:end])
        except Exception:
            return {"recommended_structure": raw}

    def detect_opportunities(
        self,
        partnerships: List[Dict[str, Any]],
        market_context: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Surface growth and satisfaction opportunities across partnerships."""
        system = (
            "You are Periscope Growth AI. Identify concrete opportunities that "
            "accelerate revenue, strengthen market position or improve customer "
            "satisfaction through better partnership leverage. Return JSON."
        )
        prompt = f"""
Partnerships:
{json.dumps(partnerships, indent=2)}

Market context: {market_context or "General B2B SaaS / technology partnerships"}

Return JSON with:
- top_opportunities (list of objects: title, description, expected_impact, effort, owner_teams)
- quick_wins (list of low-effort high-impact actions)
- strategic_bets (list of higher-effort longer-term plays)
- customer_satisfaction_levers (how partnerships can raise CSAT/NPS)
"""
        raw = self._generate(prompt, system)
        try:
            start = raw.find("{")
            end = raw.rfind("}") + 1
            return json.loads(raw[start:end])
        except Exception:
            return {"top_opportunities": [], "quick_wins": [], "strategic_bets": [],
                    "customer_satisfaction_levers": []}


# Singleton for easy import
gemini = GeminiService()
