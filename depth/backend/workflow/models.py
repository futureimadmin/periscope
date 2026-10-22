"""
Depth Edition domain model.

Framework Builder creates a Framework *for a BU* by adding Steps.
Steps form a doubly linked list (prev <-> next).
Each Step can expose Hooks — other BUs connect to request information.
Once a hook connection is active and info is published, Surface Edition
can show that data via Looking from / Looking into.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple
import uuid


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _id(prefix: str) -> str:
    return f"{prefix}_{uuid.uuid4().hex[:10]}"


BUS = ("Sales", "Marketing", "Product", "Development")


@dataclass
class Hook:
    id: str
    label: str
    description: str = ""
    allowed_requester_bus: List[str] = field(default_factory=list)
    info_types: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "label": self.label,
            "description": self.description,
            "allowed_requester_bus": list(self.allowed_requester_bus),
            "info_types": list(self.info_types),
        }

    @classmethod
    def create(
        cls,
        label: str,
        description: str = "",
        allowed_requester_bus: Optional[List[str]] = None,
        info_types: Optional[List[str]] = None,
    ) -> "Hook":
        return cls(
            id=_id("hook"),
            label=label,
            description=description,
            allowed_requester_bus=list(allowed_requester_bus or []),
            info_types=list(info_types or []),
        )

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Hook":
        return cls(
            id=data.get("id") or _id("hook"),
            label=data.get("label") or "Hook",
            description=data.get("description") or "",
            allowed_requester_bus=list(data.get("allowed_requester_bus") or []),
            info_types=list(data.get("info_types") or []),
        )


@dataclass
class Step:
    id: str
    title: str
    description: str = ""
    prev_step_id: Optional[str] = None
    next_step_id: Optional[str] = None
    hooks: List[Hook] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "prev_step_id": self.prev_step_id,
            "next_step_id": self.next_step_id,
            "hooks": [h.to_dict() for h in self.hooks],
        }

    @classmethod
    def create(cls, title: str, description: str = "") -> "Step":
        return cls(id=_id("step"), title=title, description=description)

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Step":
        return cls(
            id=data.get("id") or _id("step"),
            title=data.get("title") or "Step",
            description=data.get("description") or "",
            prev_step_id=data.get("prev_step_id"),
            next_step_id=data.get("next_step_id"),
            hooks=[Hook.from_dict(h) for h in data.get("hooks") or []],
        )


@dataclass
class Framework:
    id: str
    bu: str
    name: str
    status: str
    head_step_id: Optional[str]
    tail_step_id: Optional[str]
    steps: Dict[str, Step]
    created_at: str
    updated_at: str
    published_at: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        ordered = self.ordered_steps()
        return {
            "id": self.id,
            "bu": self.bu,
            "name": self.name,
            "status": self.status,
            "head_step_id": self.head_step_id,
            "tail_step_id": self.tail_step_id,
            "steps": [s.to_dict() for s in ordered],
            "step_count": len(ordered),
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "published_at": self.published_at,
        }

    def ordered_steps(self) -> List[Step]:
        if not self.head_step_id:
            return []
        out: List[Step] = []
        seen = set()
        cur = self.head_step_id
        while cur and cur not in seen:
            seen.add(cur)
            step = self.steps.get(cur)
            if not step:
                break
            out.append(step)
            cur = step.next_step_id
        return out

    def ordered_steps_reverse(self) -> List[Step]:
        if not self.tail_step_id:
            return []
        out: List[Step] = []
        seen = set()
        cur = self.tail_step_id
        while cur and cur not in seen:
            seen.add(cur)
            step = self.steps.get(cur)
            if not step:
                break
            out.append(step)
            cur = step.prev_step_id
        return out

    def add_step(
        self, title: str, description: str = "", after_step_id: Optional[str] = None
    ) -> Step:
        step = Step.create(title=title, description=description)
        if not self.head_step_id:
            self.head_step_id = step.id
            self.tail_step_id = step.id
            self.steps[step.id] = step
            self.updated_at = _now()
            return step
        if after_step_id is None:
            tail = self.steps[self.tail_step_id]  # type: ignore
            step.prev_step_id = tail.id
            tail.next_step_id = step.id
            self.tail_step_id = step.id
        else:
            anchor = self.steps.get(after_step_id)
            if not anchor:
                raise KeyError(f"Step not found: {after_step_id}")
            nxt_id = anchor.next_step_id
            step.prev_step_id = anchor.id
            step.next_step_id = nxt_id
            anchor.next_step_id = step.id
            if nxt_id and nxt_id in self.steps:
                self.steps[nxt_id].prev_step_id = step.id
            else:
                self.tail_step_id = step.id
        self.steps[step.id] = step
        self.updated_at = _now()
        return step

    def add_hook_to_step(
        self,
        step_id: str,
        label: str,
        description: str = "",
        allowed_requester_bus: Optional[List[str]] = None,
        info_types: Optional[List[str]] = None,
    ) -> Hook:
        step = self.steps.get(step_id)
        if not step:
            raise KeyError(f"Step not found: {step_id}")
        hook = Hook.create(
            label=label,
            description=description,
            allowed_requester_bus=allowed_requester_bus,
            info_types=info_types,
        )
        step.hooks.append(hook)
        self.updated_at = _now()
        return hook

    def find_hook(self, hook_id: str) -> Optional[Tuple[Step, Hook]]:
        for step in self.steps.values():
            for hook in step.hooks:
                if hook.id == hook_id:
                    return step, hook
        return None

    @classmethod
    def create(cls, bu: str, name: str) -> "Framework":
        now = _now()
        return cls(
            id=_id("fw"),
            bu=bu,
            name=name,
            status="draft",
            head_step_id=None,
            tail_step_id=None,
            steps={},
            created_at=now,
            updated_at=now,
        )


@dataclass
class HookConnection:
    id: str
    framework_id: str
    step_id: str
    hook_id: str
    requester_bu: str
    provider_bu: str
    status: str
    published_info: Dict[str, Any]
    created_at: str
    updated_at: str

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "framework_id": self.framework_id,
            "step_id": self.step_id,
            "hook_id": self.hook_id,
            "requester_bu": self.requester_bu,
            "provider_bu": self.provider_bu,
            "status": self.status,
            "published_info": dict(self.published_info),
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "visible_on_surface": self.status == "active" and bool(self.published_info),
        }

    @classmethod
    def request(
        cls,
        framework: Framework,
        step_id: str,
        hook_id: str,
        requester_bu: str,
    ) -> "HookConnection":
        found = framework.find_hook(hook_id)
        if not found:
            raise KeyError("Hook not found on framework")
        step, hook = found
        if step.id != step_id:
            raise ValueError("Hook does not belong to this step")
        if hook.allowed_requester_bus and requester_bu not in hook.allowed_requester_bus:
            raise PermissionError(f"{requester_bu} is not allowed to connect to this hook")
        now = _now()
        return cls(
            id=_id("conn"),
            framework_id=framework.id,
            step_id=step_id,
            hook_id=hook_id,
            requester_bu=requester_bu,
            provider_bu=framework.bu,
            status="requested",
            published_info={},
            created_at=now,
            updated_at=now,
        )
