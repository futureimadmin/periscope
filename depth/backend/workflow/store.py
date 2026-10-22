"""
In-memory store for Framework Builder (Depth).
Swap for Firestore later without changing FSM or API shapes.
"""

from __future__ import annotations

from typing import Dict, List, Optional

from .models import Framework, PartnershipRun, default_stages, _now


class Store:
    def __init__(self) -> None:
        self.frameworks: Dict[str, Framework] = {}
        self.runs: Dict[str, PartnershipRun] = {}
        self._seed()

    def _seed(self) -> None:
        fw = Framework.create(
            name="Strategic Alliance (default)",
            partnership_type="strategic",
            stages=default_stages(),
        )
        if fw.stages:
            fw.stages[0].activities = [
                "Market scanning",
                "Partner profiling",
                "Fit assessment",
            ]
            fw.stages[0].metrics = ["# of qualified leads", "Fit score"]
            fw.stages[0].risks = ["Poor market intel", "Misaligned partners"]
            fw.stages[0].raci.responsible = ["Sales"]
            fw.stages[0].raci.accountable = ["Growth Lead"]
            fw.stages[0].raci.consulted = ["Product"]
            fw.stages[0].raci.informed = ["Marketing", "Development"]
        fw.status = "published"
        fw.published_at = _now()
        self.frameworks[fw.id] = fw

    def list_frameworks(self) -> List[Framework]:
        return list(self.frameworks.values())

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
        if not fw.stages:
            raise ValueError("Cannot publish a framework with no stages")
        fw.status = "published"
        fw.published_at = _now()
        fw.updated_at = fw.published_at
        self.frameworks[fw.id] = fw
        return fw

    def list_runs(self) -> List[PartnershipRun]:
        return list(self.runs.values())

    def get_run(self, run_id: str) -> Optional[PartnershipRun]:
        return self.runs.get(run_id)

    def save_run(self, run: PartnershipRun) -> PartnershipRun:
        run.updated_at = _now()
        self.runs[run.id] = run
        return run


store = Store()
