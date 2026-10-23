"""
Gemini service for Periscope Depth Edition (Framework Builder assist).
Uses Application Default Credentials (ADC).
GCP project: intelligentmachines
"""

import os
import json
from typing import Any, Dict, List, Optional

import google.generativeai as genai
from google.auth import default

GCP_PROJECT = os.getenv("GCP_PROJECT", "intelligentmachines")
LOCATION = os.getenv("GCP_LOCATION", "us-central1")
MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")


def _init_gemini() -> None:
    credentials, _project = default()
    genai.configure(credentials=credentials)


_init_gemini()


class GeminiService:
    """AI assist for per-BU frameworks, steps, and hooks."""

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

    def _json(self, raw: str) -> Dict[str, Any]:
        try:
            start = raw.find("{")
            end = raw.rfind("}") + 1
            return json.loads(raw[start:end])
        except Exception:
            return {"raw": raw}

    def recommend_framework(
        self,
        partnership_type: str,
        parties: List[str],
        goals: List[str],
        constraints: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        system = (
            "You are Periscope Depth AI. Design per-BU frameworks with ordered steps "
            "and hooks other business units can connect to. Return JSON."
        )
        prompt = f"""
Design a BU framework for cross-unit collaboration.

Type: {partnership_type}
Parties / BUs: {parties}
Goals: {goals}
Constraints: {constraints or []}

Return JSON with:
- name
- recommended_steps (list of {{title, description, suggested_hooks: [string]}})
- key_hooks (list of {{label, provider_bu, allowed_requester_bus, info_types}})
- success_metrics (list of strings)
"""
        return self._json(self._generate(prompt, system))

    def assist_framework_stage(
        self,
        stage: str,
        partnership_type: str = "strategic",
        current: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        system = (
            "You assist Framework Builder. Suggest activities, metrics, risks and "
            "hook ideas for a single step. Return JSON."
        )
        prompt = f"""
Step name: {stage}
Partnership type: {partnership_type}
Current content: {json.dumps(current or {}, indent=2)}

Return JSON with:
- objective
- activities (list)
- metrics (list)
- risks (list)
- suggested_hooks (list of {{label, allowed_requester_bus, info_types}})
"""
        return self._json(self._generate(prompt, system))

    def validate_framework(self, framework: Dict[str, Any]) -> Dict[str, Any]:
        system = (
            "Validate a Periscope Depth framework (steps + hooks). "
            "Check completeness and cross-BU hook coverage. Return JSON."
        )
        prompt = f"""
Framework:
{json.dumps(framework, indent=2)}

Return JSON with:
- is_complete (bool)
- score (0-100)
- missing (list of strings)
- cross_bu_gaps (list of strings)
- recommendations (list of strings)
"""
        return self._json(self._generate(prompt, system))


gemini = GeminiService()
