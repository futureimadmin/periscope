"""In-memory store for Framework Builder (Depth). Swap for Firestore in production."""

from __future__ import annotations

from typing import Dict, List, Optional

from .models import Framework, HookConnection, _now


class Store:
    def __init__(self) -> None:
        self.frameworks: Dict[str, Framework] = {}
        self.connections: Dict[str, HookConnection] = {}
        self._seed()

    def _seed(self) -> None:
        fw = Framework.create(bu="Product", name="Product partnership intake")
        s1 = fw.add_step("Intake request", "Capture partner capability need")
        s2 = fw.add_step("Capacity check", "Validate engineering capacity")
        s3 = fw.add_step("Commit roadmap slot", "Reserve delivery window")
        fw.add_hook_to_step(
            s2.id,
            label="Capacity signal",
            description="Other BUs can request capacity visibility",
            allowed_requester_bus=["Sales", "Marketing"],
            info_types=["capacity_pct", "next_available_sprint"],
        )
        fw.status = "published"
        fw.published_at = _now()
        self.frameworks[fw.id] = fw

        sales = Framework.create(bu="Sales", name="Sales partner pursuit")
        sales.add_step("Qualify partner", "Fit and pipeline potential")
        sales.add_step("Joint plan", "Align with Product on scope")
        sales.status = "published"
        sales.published_at = _now()
        self.frameworks[sales.id] = sales

    def list_frameworks(self, bu: Optional[str] = None) -> List[Framework]:
        items = list(self.frameworks.values())
        if bu:
            items = [f for f in items if f.bu == bu]
        return items

    def get_framework(self, framework_id: str) -> Optional[Framework]:
        return self.frameworks.get(framework_id)

    def save_framework(self, fw: Framework) -> Framework:
        fw.updated_at = _now()
        self.frameworks[fw.id] = fw
        return fw

    def publish_framework(self, framework_id: str) -> Framework:
        fw = self.frameworks.get(framework_id)
        if not fw:
            raise KeyError(f"Framework not found: {framework_id}")
        if not fw.steps:
            raise ValueError("Cannot publish a framework with no steps")
        fw.status = "published"
        fw.published_at = _now()
        fw.updated_at = fw.published_at
        self.frameworks[fw.id] = fw
        return fw

    def save_connection(self, conn: HookConnection) -> HookConnection:
        conn.updated_at = _now()
        self.connections[conn.id] = conn
        return conn

    def get_connection(self, conn_id: str) -> Optional[HookConnection]:
        return self.connections.get(conn_id)

    def list_connections(
        self,
        requester_bu: Optional[str] = None,
        provider_bu: Optional[str] = None,
        surface_only: bool = False,
    ) -> List[HookConnection]:
        items = list(self.connections.values())
        if requester_bu:
            items = [c for c in items if c.requester_bu == requester_bu]
        if provider_bu:
            items = [c for c in items if c.provider_bu == provider_bu]
        if surface_only:
            items = [c for c in items if c.status == "active" and c.published_info]
        return items


store = Store()
