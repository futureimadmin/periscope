"""
Periscope Cloud Function entrypoint.
Deployed as HTTP-triggered Gen2 Cloud Function on project intelligentmachines.
"""

import json
import os
from flask import Request, jsonify

from ai.gemini_service import gemini


def periscope_api(request: Request):
    """
    Main HTTP entrypoint for Periscope backend.

    Routes (path-based):
      POST /insights/health
      POST /insights/cross-team
      POST /insights/opportunities
      POST /partnerships/recommend-framework
      GET  /health
    """
    # CORS
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Max-Age": "3600",
        }
        return ("", 204, headers)

    headers = {"Access-Control-Allow-Origin": "*"}

    path = request.path.rstrip("/") or "/"
    method = request.method

    try:
        if method == "GET" and path in ("/", "/health"):
            return (
                jsonify({
                    "service": "periscope",
                    "status": "ok",
                    "project": os.getenv("GCP_PROJECT", "intelligentmachines"),
                    "message": "Periscope is looking",
                }),
                200,
                headers,
            )

        if method != "POST":
            return jsonify({"error": "Method not allowed"}), 405, headers

        data = request.get_json(silent=True) or {}

        # --- Insights ---
        if path == "/insights/health":
            partnership = data.get("partnership", {})
            activity = data.get("recent_activity", [])
            result = gemini.partnership_health(partnership, activity)
            return jsonify(result), 200, headers

        if path == "/insights/cross-team":
            requesting_team = data.get("requesting_team", "Product")
            teams_data = data.get("teams_data", {})
            context = data.get("context")
            result = gemini.cross_team_periscope(requesting_team, teams_data, context)
            return jsonify(result), 200, headers

        if path == "/insights/opportunities":
            partnerships = data.get("partnerships", [])
            market_context = data.get("market_context")
            result = gemini.detect_opportunities(partnerships, market_context)
            return jsonify(result), 200, headers

        # --- Partnership Formalization ---
        if path == "/partnerships/recommend-framework":
            result = gemini.recommend_framework(
                partnership_type=data.get("partnership_type", "cross-functional"),
                parties=data.get("parties", []),
                goals=data.get("goals", []),
                constraints=data.get("constraints"),
            )
            return jsonify(result), 200, headers

        return jsonify({"error": f"Unknown path: {path}"}), 404, headers

    except Exception as e:
        return jsonify({"error": str(e), "type": type(e).__name__}), 500, headers
