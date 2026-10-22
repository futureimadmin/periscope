"""
Periscope Depth Edition — Cloud Function entrypoint.
Submerged structure: Framework Builder, recommend-framework, stage assist.
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
                    "service": "periscope-depth",
                    "edition": "depth",
                    "status": "ok",
                    "project": os.getenv("GCP_PROJECT", "intelligentmachines"),
                    "message": "Depth Edition — submerged operating model",
                }),
                200,
                headers,
            )

        if method != "POST":
            return jsonify({"error": "Method not allowed"}), 405, headers

        data = request.get_json(silent=True) or {}

        if path == "/partnerships/recommend-framework":
            result = gemini.recommend_framework(
                partnership_type=data.get("partnership_type", "cross-functional"),
                teams=data.get("teams", []),
                goals=data.get("goals", []),
                constraints=data.get("constraints"),
            )
            return jsonify(result), 200, headers

        if path == "/frameworks/assist-stage":
            result = gemini.assist_framework_stage(
                stage=data.get("stage", "Discovery"),
                partnership_type=data.get("partnership_type", "strategic"),
                current=data.get("current", {}),
            )
            return jsonify(result), 200, headers

        if path == "/frameworks/validate":
            result = gemini.validate_framework(
                framework=data.get("framework", {}),
            )
            return jsonify(result), 200, headers

        return jsonify({"error": f"Unknown path: {path}"}), 404, headers

    except Exception as e:
        return jsonify({"error": str(e)}), 500, headers
