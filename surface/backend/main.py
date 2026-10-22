"""
Periscope Surface Edition — Cloud Function entrypoint.
Visibility APIs: Looking from / Looking into, health, opportunities.
GCP project: intelligentmachines
"""

import os
from flask import Request, jsonify

from ai.gemini_service import gemini


def periscope_api(request: Request):
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
                    "service": "periscope-surface",
                    "edition": "surface",
                    "status": "ok",
                    "project": os.getenv("GCP_PROJECT", "intelligentmachines"),
                    "message": "Surface Edition — visibility only",
                }),
                200,
                headers,
            )

        if method != "POST":
            return jsonify({"error": "Method not allowed"}), 405, headers

        data = request.get_json(silent=True) or {}

        if path == "/insights/health":
            result = gemini.partnership_health(
                data.get("partnership", {}),
                data.get("recent_activity", []),
            )
            return jsonify(result), 200, headers

        if path == "/insights/cross-team":
            result = gemini.cross_team_periscope(
                data.get("requesting_team", "Product"),
                data.get("teams_data", {}),
                data.get("context"),
            )
            return jsonify(result), 200, headers

        if path == "/insights/opportunities":
            result = gemini.detect_opportunities(
                data.get("partnerships", []),
                data.get("market_context"),
            )
            return jsonify(result), 200, headers

        return jsonify({"error": f"Unknown path: {path}"}), 404, headers

    except Exception as e:
        return jsonify({"error": str(e)}), 500, headers
