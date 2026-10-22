"""
Lightweight finite state machine for partnership stage transitions.
No Spring, no BPMN — explicit transitions + optional guards.
"""

from __future__ import annotations

from typing import Callable, Dict, List, Optional, Set, Tuple

from .models import (
    STAGE_ORDER,
    Framework,
    HistoryEntry,
    PartnershipRun,
    StageKey,
    _now,
)

GuardFn = Callable[[PartnershipRun, Framework], Tuple[bool, str]]


class TransitionError(Exception):
    def __init__(self, message: str, code: str = "transition_denied"):
        super().__init__(message)
        self.code = code


def _default_edges() -> Dict[str, Set[str]]:
    keys = [s.value for s in STAGE_ORDER]
    edges: Dict[str, Set[str]] = {k: set() for k in keys}
    for i in range(len(keys) - 1):
        edges[keys[i]].add(keys[i + 1])
    edges[StageKey.RENEWAL.value].add(StageKey.NEGOTIATION.value)
    edges[StageKey.ACTIVATION.value].add(StageKey.FORMALIZATION.value)
    return edges


DEFAULT_EDGES = _default_edges()


def guard_published_framework(run: PartnershipRun, fw: Framework) -> Tuple[bool, str]:
    if fw.status != "published":
        return False, "Framework is not published"
    return True, ""


def guard_not_archived(run: PartnershipRun, fw: Framework) -> Tuple[bool, str]:
    if run.status == "archived":
        return False, "Run is archived"
    return True, ""


class PartnershipFSM:
    def __init__(
        self,
        edges: Optional[Dict[str, Set[str]]] = None,
        guards: Optional[List[GuardFn]] = None,
    ):
        self.edges = edges or {k: set(v) for k, v in DEFAULT_EDGES.items()}
        self.guards: List[GuardFn] = guards or [
            guard_published_framework,
            guard_not_archived,
        ]

    def allowed_targets(self, current: str) -> List[str]:
        return sorted(self.edges.get(current, set()))

    def can_transition(
        self,
        run: PartnershipRun,
        framework: Framework,
        to_stage: str,
    ) -> Tuple[bool, str]:
        if to_stage not in {s.key for s in framework.stages}:
            return False, f"Unknown stage '{to_stage}' for this framework"

        allowed = self.edges.get(run.current_stage, set())
        if to_stage not in allowed:
            return (
                False,
                f"Cannot move from '{run.current_stage}' to '{to_stage}'. "
                f"Allowed: {sorted(allowed)}",
            )

        for guard in self.guards:
            ok, reason = guard(run, framework)
            if not ok:
                return False, reason

        return True, ""

    def transition(
        self,
        run: PartnershipRun,
        framework: Framework,
        to_stage: str,
        event: str = "advance",
        by: str = "system",
        note: str = "",
    ) -> PartnershipRun:
        ok, reason = self.can_transition(run, framework, to_stage)
        if not ok:
            raise TransitionError(reason)

        now = _now()
        run.history.append(
            HistoryEntry(
                stage=to_stage,
                event=event,
                at=now,
                by=by,
                note=note or f"{run.current_stage} → {to_stage}",
            )
        )
        run.current_stage = to_stage
        run.updated_at = now

        if to_stage == StageKey.RENEWAL.value and event == "complete":
            run.status = "completed"

        return run

    def advance(
        self,
        run: PartnershipRun,
        framework: Framework,
        by: str = "system",
        note: str = "",
    ) -> PartnershipRun:
        keys = [s.value for s in STAGE_ORDER]
        try:
            idx = keys.index(run.current_stage)
        except ValueError:
            raise TransitionError(f"Current stage '{run.current_stage}' not in spine")

        if idx >= len(keys) - 1:
            raise TransitionError("Already at final stage; use explicit transition or complete")

        return self.transition(
            run,
            framework,
            keys[idx + 1],
            event="advance",
            by=by,
            note=note or "Advanced to next stage",
        )
