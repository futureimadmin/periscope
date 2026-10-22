"""
Periscope Depth Edition — Cloud Function entrypoint.

Submerged operating model:
  - Framework Builder (define / publish)
  - Lightweight custom FSM for partnership stage runs
  - Gemini assist for stage content

GCP project: intelligentmachines
No Spring — pure Python FSM stays under Cloud Functions size limits.
"""

from __future__ import annotations

import os
from typing import Any, Dict

from flask import Request, jsonify

from ai.gemini_service import gemini
from workflow import PartnershipFSM, TransitionError, store
from workflow.models import Framework, FrameworkStage, PartnershipRun


def _cors_headers() -> Dict[str, str]:
    return {"Access-Control-Allow-Origin": "*"}


def _options():
    return (
        "",
        204,
        {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Max-Age": "3600",
        },
    )


def periscope_api(request: Request):
    if request.method == "OPTIONS":
        return _options()

    headers = _cors_headers()
    path = request.path.rstrip("/") or "/"
    method = request.method

    try:
        if method == "GET" and path in ("/", "/health"):
            return (
                jsonify(
                    {
                        "service": "periscope-depth",
                        "edition": "depth",
                        "status": "ok",
                        "project": os.getenv("GCP_PROJECT", "intelligentmachines"),
                        "workflow": "custom-python-fsm",
                        "message": "Depth Edition — submerged operating model",
                    }
                ),
                200,
                headers,
            )

        data: Dict[str, Any] = {}
        if method == "POST":
            data = request.get_json(silent=True) or {}

        fsm = PartnershipFSM()

        if method == "GET" and path == "/frameworks":
            return (
                jsonify({"frameworks": [f.to_dict() for f in store.list_frameworks()]}),
                200,
                headers,
            )

        if method == "GET" and path.startswith("/frameworks/") and "/publish" not in path and not path.endswith("/stages"):
            fw_id = path.split("/")[-1]
            fw = store.get_framework(fw_id)
            if not fw:
                return jsonify({"error": "Framework not found"}), 404, headers
            return jsonify(fw.to_dict()), 200, headers

        if method == "POST" and path == "/frameworks":
            name = data.get("name") or "Untitled framework"
            ptype = data.get("partnership_type") or "strategic"
            stages_in = data.get("stages")
            stages = None
            if stages_in:
                stages = [FrameworkStage.from_dict(s) for s in stages_in]
            fw = Framework.create(name=name, partnership_type=ptype, stages=stages)
            store.save_framework(fw)
            return jsonify(fw.to_dict()), 201, headers

        if method == "POST" and path.endswith("/publish") and path.startswith("/frameworks/"):
            parts = path.strip("/").split("/")
            fw_id = parts[1] if len(parts) >= 3 else ""
            try:
                fw = store.publish_framework(fw_id)
            except KeyError:
                return jsonify({"error": "Framework not found"}), 404, headers
            except ValueError as e:
                return jsonify({"error": str(e)}), 400, headers
            return jsonify(fw.to_dict()), 200, headers

        if method == "POST" and path.startswith("/frameworks/") and path.endswith("/stages"):
            parts = path.strip("/").split("/")
            fw_id = parts[1]
            fw = store.get_framework(fw_id)
            if not fw:
                return jsonify({"error": "Framework not found"}), 404, headers
            if fw.status == "published":
                return (
                    jsonify({"error": "Cannot edit stages on a published framework; create a new version"}),
                    400,
                    headers,
                )
            stage_data = data.get("stage") or data
            updated = FrameworkStage.from_dict(stage_data)
            found = False
            for i, s in enumerate(fw.stages):
                if s.key == updated.key:
                    fw.stages[i] = updated
                    found = True
                    break
            if not found:
                fw.stages.append(updated)
            store.save_framework(fw)
            return jsonify(fw.to_dict()), 200, headers

        if method == "POST" and path == "/partnerships/recommend-framework":
            result = gemini.recommend_framework(
                partnership_type=data.get("partnership_type", "cross-functional"),
                parties=data.get("parties") or data.get("teams", []),
                goals=data.get("goals", []),
                constraints=data.get("constraints"),
            )
            return jsonify(result), 200, headers

        if method == "POST" and path == "/frameworks/assist-stage":
            if hasattr(gemini, "assist_framework_stage"):
                result = gemini.assist_framework_stage(
                    stage=data.get("stage", "Discovery"),
                    partnership_type=data.get("partnership_type", "strategic"),
                    current=data.get("current", {}),
                )
            else:
                result = gemini.recommend_framework(
                    partnership_type=data.get("partnership_type", "strategic"),
                    parties=data.get("parties") or ["Sales", "Marketing", "Product", "Development"],
                    goals=[f"Strengthen stage: {data.get('stage', 'Discovery')}"],
                    constraints=None,
                )
            return jsonify(result), 200, headers

        if method == "POST" and path == "/frameworks/validate":
            if hasattr(gemini, "validate_framework"):
                result = gemini.validate_framework(framework=data.get("framework", {}))
            else:
                fw = data.get("framework") or {}
                stages = fw.get("stages") or []
                result = {
                    "is_complete": len(stages) >= 6,
                    "missing": [] if len(stages) >= 6 else ["Expected 6 stages on the partnership spine"],
                    "cross_bu_gaps": [],
                    "recommendations": ["Ensure RACI on Activation and Value Realization"],
                    "score": min(100, len(stages) * 15),
                }
            return jsonify(result), 200, headers

        if method == "GET" and path == "/runs":
            return jsonify({"runs": [r.to_dict() for r in store.list_runs()]}), 200, headers

        if method == "GET" and path.startswith("/runs/"):
            run_id = path.split("/")[-1]
            run = store.get_run(run_id)
            if not run:
                return jsonify({"error": "Run not found"}), 404, headers
            fw = store.get_framework(run.framework_id)
            payload = run.to_dict()
            payload["allowed_transitions"] = fsm.allowed_targets(run.current_stage)
            if fw:
                payload["framework_name"] = fw.name
            return jsonify(payload), 200, headers

        if method == "POST" and path == "/runs":
            fw_id = data.get("framework_id")
            name = data.get("name") or "Partnership run"
            fw = store.get_framework(fw_id) if fw_id else None
            if not fw:
                published = [f for f in store.list_frameworks() if f.status == "published"]
                if not published:
                    return jsonify({"error": "No published framework available"}), 400, headers
                fw = published[0]
            try:
                run = PartnershipRun.start(
                    framework=fw,
                    name=name,
                    context=data.get("context"),
                    started_by=data.get("by") or "system",
                )
            except ValueError as e:
                return jsonify({"error": str(e)}), 400, headers
            store.save_run(run)
            return jsonify(run.to_dict()), 201, headers

        if method == "POST" and path.endswith("/transition") and path.startswith("/runs/"):
            parts = path.strip("/").split("/")
            run_id = parts[1]
            run = store.get_run(run_id)
            if not run:
                return jsonify({"error": "Run not found"}), 404, headers
            fw = store.get_framework(run.framework_id)
            if not fw:
                return jsonify({"error": "Framework missing for run"}), 400, headers
            to_stage = data.get("to_stage")
            if not to_stage:
                return jsonify({"error": "to_stage is required"}), 400, headers
            try:
                run = fsm.transition(
                    run,
                    fw,
                    to_stage=to_stage,
                    event=data.get("event") or "transition",
                    by=data.get("by") or "system",
                    note=data.get("note") or "",
                )
            except TransitionError as e:
                return jsonify({"error": str(e), "code": e.code}), 400, headers
            store.save_run(run)
            payload = run.to_dict()
            payload["allowed_transitions"] = fsm.allowed_targets(run.current_stage)
            return jsonify(payload), 200, headers

        if method == "POST" and path.endswith("/advance") and path.startswith("/runs/"):
            parts = path.strip("/").split("/")
            run_id = parts[1]
            run = store.get_run(run_id)
            if not run:
                return jsonify({"error": "Run not found"}), 404, headers
            fw = store.get_framework(run.framework_id)
            if not fw:
                return jsonify({"error": "Framework missing for run"}), 400, headers
            try:
                run = fsm.advance(
                    run,
                    fw,
                    by=data.get("by") or "system",
                    note=data.get("note") or "",
                )
            except TransitionError as e:
                return jsonify({"error": str(e), "code": e.code}), 400, headers
            store.save_run(run)
            payload = run.to_dict()
            payload["allowed_transitions"] = fsm.allowed_targets(run.current_stage)
            return jsonify(payload), 200, headers

        return jsonify({"error": f"Unknown path: {path}", "method": method}), 404, headers

    except Exception as e:
        return jsonify({"error": str(e)}), 500, headers
