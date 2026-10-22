"""
Periscope Depth Edition — Framework Builder API.

Per-BU frameworks, doubly linked Steps, Hooks for cross-BU info requests.
Active published connections are what Surface can show (Looking from / into).

GCP: intelligentmachines · Python Cloud Functions
"""

from __future__ import annotations

import os
from typing import Any, Dict

from flask import Request, jsonify

from workflow import Framework, HookConnection, store
from workflow.models import _now


def _cors():
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

    headers = _cors()
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
                        "model": "bu-framework-steps-hooks",
                        "message": "Framework Builder — steps, hooks, Surface visibility",
                    }
                ),
                200,
                headers,
            )

        data: Dict[str, Any] = {}
        if method == "POST":
            data = request.get_json(silent=True) or {}

        if method == "GET" and path == "/frameworks":
            bu = None
            try:
                bu = request.args.get("bu")
            except Exception:
                pass
            return (
                jsonify({"frameworks": [f.to_dict() for f in store.list_frameworks(bu=bu)]}),
                200,
                headers,
            )

        if method == "GET" and path.startswith("/frameworks/") and path.count("/") == 2:
            fw = store.get_framework(path.split("/")[-1])
            if not fw:
                return jsonify({"error": "Framework not found"}), 404, headers
            return jsonify(fw.to_dict()), 200, headers

        if method == "POST" and path == "/frameworks":
            bu = data.get("bu") or "Product"
            name = data.get("name") or f"{bu} framework"
            fw = Framework.create(bu=bu, name=name)
            store.save_framework(fw)
            return jsonify(fw.to_dict()), 201, headers

        if method == "POST" and path.endswith("/publish") and path.startswith("/frameworks/"):
            fw_id = path.strip("/").split("/")[1]
            try:
                fw = store.publish_framework(fw_id)
            except KeyError:
                return jsonify({"error": "Framework not found"}), 404, headers
            except ValueError as e:
                return jsonify({"error": str(e)}), 400, headers
            return jsonify(fw.to_dict()), 200, headers

        if method == "POST" and path.startswith("/frameworks/") and path.endswith("/steps"):
            fw_id = path.strip("/").split("/")[1]
            fw = store.get_framework(fw_id)
            if not fw:
                return jsonify({"error": "Framework not found"}), 404, headers
            if fw.status == "published":
                return jsonify({"error": "Published frameworks are immutable; create a new draft"}), 400, headers
            title = data.get("title") or "New step"
            step = fw.add_step(
                title=title,
                description=data.get("description") or "",
                after_step_id=data.get("after_step_id"),
            )
            store.save_framework(fw)
            return jsonify({"framework": fw.to_dict(), "step": step.to_dict()}), 201, headers

        if method == "POST" and "/steps/" in path and path.endswith("/hooks"):
            parts = path.strip("/").split("/")
            fw_id, step_id = parts[1], parts[3]
            fw = store.get_framework(fw_id)
            if not fw:
                return jsonify({"error": "Framework not found"}), 404, headers
            try:
                hook = fw.add_hook_to_step(
                    step_id,
                    label=data.get("label") or "Info hook",
                    description=data.get("description") or "",
                    allowed_requester_bus=data.get("allowed_requester_bus"),
                    info_types=data.get("info_types"),
                )
            except KeyError as e:
                return jsonify({"error": str(e)}), 404, headers
            store.save_framework(fw)
            return jsonify({"framework": fw.to_dict(), "hook": hook.to_dict()}), 201, headers

        if method == "POST" and path == "/hooks/connect":
            fw = store.get_framework(data.get("framework_id", ""))
            if not fw:
                return jsonify({"error": "Framework not found"}), 404, headers
            try:
                conn = HookConnection.request(
                    framework=fw,
                    step_id=data.get("step_id", ""),
                    hook_id=data.get("hook_id", ""),
                    requester_bu=data.get("requester_bu", ""),
                )
            except (KeyError, ValueError, PermissionError) as e:
                return jsonify({"error": str(e)}), 400, headers
            store.save_connection(conn)
            return jsonify(conn.to_dict()), 201, headers

        if method == "POST" and path.startswith("/hooks/connections/") and path.endswith("/approve"):
            conn_id = path.strip("/").split("/")[2]
            conn = store.get_connection(conn_id)
            if not conn:
                return jsonify({"error": "Connection not found"}), 404, headers
            conn.status = "approved"
            conn.updated_at = _now()
            store.save_connection(conn)
            return jsonify(conn.to_dict()), 200, headers

        if method == "POST" and path.startswith("/hooks/connections/") and path.endswith("/publish"):
            conn_id = path.strip("/").split("/")[2]
            conn = store.get_connection(conn_id)
            if not conn:
                return jsonify({"error": "Connection not found"}), 404, headers
            if conn.status not in ("approved", "active"):
                return jsonify({"error": "Connection must be approved before publish"}), 400, headers
            conn.published_info = data.get("published_info") or data.get("info") or {}
            conn.status = "active"
            conn.updated_at = _now()
            store.save_connection(conn)
            return jsonify(conn.to_dict()), 200, headers

        if method == "GET" and path == "/hooks/connections":
            try:
                requester_bu = request.args.get("requester_bu")
                provider_bu = request.args.get("provider_bu")
                surface_only = request.args.get("surface_only", "").lower() in ("1", "true", "yes")
            except Exception:
                requester_bu = provider_bu = None
                surface_only = False
            items = store.list_connections(
                requester_bu=requester_bu,
                provider_bu=provider_bu,
                surface_only=surface_only,
            )
            return jsonify({"connections": [c.to_dict() for c in items]}), 200, headers

        if method == "GET" and path == "/surface/visibility":
            try:
                looking_from = request.args.get("looking_from") or request.args.get("bu")
            except Exception:
                looking_from = None
            if not looking_from:
                return jsonify({"error": "looking_from (BU) is required"}), 400, headers
            items = store.list_connections(requester_bu=looking_from, surface_only=True)
            return (
                jsonify(
                    {
                        "looking_from": looking_from,
                        "visible": [c.to_dict() for c in items],
                        "message": "Published hook info visible through Periscope Surface",
                    }
                ),
                200,
                headers,
            )

        return jsonify({"error": f"Unknown path: {path}", "method": method}), 404, headers

    except Exception as e:
        return jsonify({"error": str(e)}), 500, headers
