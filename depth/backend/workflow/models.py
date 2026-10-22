"""
Domain models for Framework Builder — no heavy framework deps.
Stages form the submerged operating model for cross-BU partnerships.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, List, Optional
import uuid


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _id(prefix: str) -> str:
    return f"{prefix}_{uuid.uuid4().hex[:12]}"


class StageKey(str, Enum):
    DISCOVERY = "discovery"
    NEGOTIATION = "negotiation"
    FORMALIZATION = "formalization"
    ACTIVATION = "activation"
    VALUE_REALIZATION = "value_realization"
    RENEWAL = "renewal"


STAGE_ORDER: List[StageKey] = [
    StageKey.DISCOVERY,
    StageKey.NEGOTIATION,
    StageKey.FORMALIZATION,
    StageKey.ACTIVATION,
    StageKey.VALUE_REALIZATION,
    StageKey.RENEWAL,
]


@dataclass
class RACI:
    responsible: List[str] = field(default_factory=list)
    accountable: List[str] = field(default_factory=list)
    consulted: List[str] = field(default_factory=list)
    informed: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: Optional[Dict[str, Any]]) -> "RACI":
        data = data or {}
        return cls(
            responsible=list(data.get("responsible") or []),
            accountable=list(data.get("accountable") or []),
            consulted=list(data.get("consulted") or []),
            informed=list(data.get("informed") or []),
        )


@dataclass
class FrameworkStage:
    key: str
    name: str
    objective: str = ""
    activities: List[str] = field(default_factory=list)
    metrics: List[str] = field(default_factory=list)
    risks: List[str] = field(default_factory=list)
    raci: RACI = field(default_factory=RACI)
    order: int = 0

    def to_dict(self) -> Dict[str, Any]:
        return {
            "key": self.key,
            "name": self.name,
            "objective": self.objective,
            "activities": list(self.activities),
            "metrics": list(self.metrics),
            "risks": list(self.risks),
            "raci": self.raci.to_dict(),
            "order": self.order,
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "FrameworkStage":
        return cls(
            key=data["key"],
            name=data.get("name") or data["key"],
            objective=data.get("objective") or "",
            activities=list(data.get("activities") or []),
            metrics=list(data.get("metrics") or []),
            risks=list(data.get("risks") or []),
            raci=RACI.from_dict(data.get("raci")),
            order=int(data.get("order") or 0),
        )


def default_stages() -> List[FrameworkStage]:
    specs = [
        (StageKey.DISCOVERY, "Discovery", "Identify and qualify potential partners."),
        (StageKey.NEGOTIATION, "Negotiation", "Align on value, terms and ways of working."),
        (StageKey.FORMALIZATION, "Formalization", "Document and approve the agreement."),
        (StageKey.ACTIVATION, "Activation", "Launch collaboration and enable teams."),
        (StageKey.VALUE_REALIZATION, "Value Realization", "Deliver value and track performance."),
        (StageKey.RENEWAL, "Renewal", "Evaluate outcomes and renew or evolve."),
    ]
    stages: List[FrameworkStage] = []
    for i, (key, name, objective) in enumerate(specs):
        stages.append(
            FrameworkStage(key=key.value, name=name, objective=objective, order=i + 1, raci=RACI())
        )
    return stages


DEFAULT_STAGES = default_stages()


@dataclass
class Framework:
    id: str
    name: str
    partnership_type: str
    status: str
    version: int
    stages: List[FrameworkStage]
    created_at: str
    updated_at: str
    published_at: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "partnership_type": self.partnership_type,
            "status": self.status,
            "version": self.version,
            "stages": [s.to_dict() for s in self.stages],
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "published_at": self.published_at,
        }

    @classmethod
    def create(
        cls,
        name: str,
        partnership_type: str = "strategic",
        stages: Optional[List[FrameworkStage]] = None,
    ) -> "Framework":
        now = _now()
        return cls(
            id=_id("fw"),
            name=name,
            partnership_type=partnership_type,
            status="draft",
            version=1,
            stages=stages or default_stages(),
            created_at=now,
            updated_at=now,
        )

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Framework":
        return cls(
            id=data["id"],
            name=data["name"],
            partnership_type=data.get("partnership_type") or "strategic",
            status=data.get("status") or "draft",
            version=int(data.get("version") or 1),
            stages=[FrameworkStage.from_dict(s) for s in data.get("stages") or []],
            created_at=data.get("created_at") or _now(),
            updated_at=data.get("updated_at") or _now(),
            published_at=data.get("published_at"),
        )


@dataclass
class HistoryEntry:
    stage: str
    event: str
    at: str
    by: str = "system"
    note: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class PartnershipRun:
    id: str
    framework_id: str
    framework_version: int
    name: str
    current_stage: str
    status: str
    history: List[HistoryEntry]
    context: Dict[str, Any]
    created_at: str
    updated_at: str

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "framework_id": self.framework_id,
            "framework_version": self.framework_version,
            "name": self.name,
            "current_stage": self.current_stage,
            "status": self.status,
            "history": [h.to_dict() for h in self.history],
            "context": dict(self.context),
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    @classmethod
    def start(
        cls,
        framework: Framework,
        name: str,
        context: Optional[Dict[str, Any]] = None,
        started_by: str = "system",
    ) -> "PartnershipRun":
        if framework.status != "published":
            raise ValueError("Partnership runs require a published framework")
        first = framework.stages[0].key if framework.stages else StageKey.DISCOVERY.value
        now = _now()
        return cls(
            id=_id("run"),
            framework_id=framework.id,
            framework_version=framework.version,
            name=name,
            current_stage=first,
            status="active",
            history=[
                HistoryEntry(
                    stage=first,
                    event="started",
                    at=now,
                    by=started_by,
                    note="Run started on published framework",
                )
            ],
            context=dict(context or {}),
            created_at=now,
            updated_at=now,
        )

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "PartnershipRun":
        hist = []
        for h in data.get("history") or []:
            hist.append(
                HistoryEntry(
                    stage=h.get("stage", ""),
                    event=h.get("event", ""),
                    at=h.get("at") or _now(),
                    by=h.get("by") or "system",
                    note=h.get("note") or "",
                )
            )
        return cls(
            id=data["id"],
            framework_id=data["framework_id"],
            framework_version=int(data.get("framework_version") or 1),
            name=data.get("name") or data["id"],
            current_stage=data.get("current_stage") or StageKey.DISCOVERY.value,
            status=data.get("status") or "active",
            history=hist,
            context=dict(data.get("context") or {}),
            created_at=data.get("created_at") or _now(),
            updated_at=data.get("updated_at") or _now(),
        )
