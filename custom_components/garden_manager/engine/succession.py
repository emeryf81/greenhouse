"""Succession planting: one drag in the planner -> several dated sowings."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import replace
from datetime import date, timedelta
from typing import Literal

from .models import LayoutMode, Plant, Planting, SowMethod, Zone
from .region import SeasonAnchors
from .schedule import plant_windows, resolve_method
from .tasks import new_id

Placement = Literal["split", "stack"]


def expand_succession(
    base: Planting,
    plant: Plant,
    anchors: SeasonAnchors,
    zone: Zone | None,
    *,
    count: int,
    interval_days: int | None = None,
    placement: Placement = "split",
    start: date | None = None,
    id_factory: Callable[[], str] = new_id,
) -> tuple[list[Planting], int]:
    """Return ``(plantings, dropped)``.

    ``split`` divides the footprint into ``count`` strips along its long axis
    (the usual way to sow a lettuce bed in batches); ``stack`` re-uses the
    same footprint, which only works when crops are cleared in between - the
    compatibility checker flags overlaps in time.

    Sowings that fall after the last sowing window are dropped, never
    silently planted out of season.
    """
    if count < 1:
        raise ValueError("count must be >= 1")
    interval = interval_days or plant.succession_interval_days or 21
    method = resolve_method(plant, base.method)
    windows = plant_windows(plant, anchors, zone)
    options = (
        windows.transplant
        if method is SowMethod.TRANSPLANT
        else windows.indoor_sow
        if method is SowMethod.INDOOR_SOW
        else windows.direct_sow
    )
    first = start or base.sow_date or (options[0].start if options else anchors.last_frost)
    last_ok = max((w.end for w in options), default=None)

    group = base.succession_group or id_factory()
    along_x = base.width_cm >= base.length_cm
    strip = (base.width_cm if along_x else base.length_cm) / (count if placement == "split" else 1)

    result: list[Planting] = []
    dropped = 0
    for i in range(count):
        day = first + timedelta(days=i * interval)
        if last_ok is not None and day > last_ok:
            dropped += 1
            continue
        x, y, w, h = base.x_cm, base.y_cm, base.width_cm, base.length_cm
        if placement == "split":
            if along_x:
                x, w = base.x_cm + i * strip, strip
            else:
                y, h = base.y_cm + i * strip, strip
        planting = replace(
            base,
            id=base.id if i == 0 else id_factory(),
            x_cm=round(x, 1),
            y_cm=round(y, 1),
            width_cm=round(w, 1),
            length_cm=round(h, 1),
            layout=base.layout if base.layout is not LayoutMode.SINGLE else LayoutMode.BLOCK,
            succession_group=group,
            succession_index=i,
            count=None,
        )
        if method is SowMethod.TRANSPLANT:
            planting.transplant_date = day
        else:
            planting.sow_date = day
        result.append(planting)
    return result, dropped
