"""Step traversal helpers for doubly linked frameworks."""

from __future__ import annotations

from typing import List, Optional

from .models import Framework, Step


def next_step(fw: Framework, step_id: str) -> Optional[Step]:
    step = fw.steps.get(step_id)
    if not step or not step.next_step_id:
        return None
    return fw.steps.get(step.next_step_id)


def prev_step(fw: Framework, step_id: str) -> Optional[Step]:
    step = fw.steps.get(step_id)
    if not step or not step.prev_step_id:
        return None
    return fw.steps.get(step.prev_step_id)


def walk_forward(fw: Framework) -> List[Step]:
    return fw.ordered_steps()


def walk_backward(fw: Framework) -> List[Step]:
    return fw.ordered_steps_reverse()
