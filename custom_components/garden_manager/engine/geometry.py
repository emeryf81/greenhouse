"""2-D helpers for beds and plantings (all values in centimetres)."""

from __future__ import annotations

from dataclasses import dataclass
import math

from .models import GardenBed, LayoutMode, Plant, Planting


@dataclass(frozen=True, slots=True)
class Rect:
    x: float
    y: float
    w: float
    h: float

    @property
    def x2(self) -> float:
        return self.x + self.w

    @property
    def y2(self) -> float:
        return self.y + self.h

    @property
    def center(self) -> tuple[float, float]:
        return (self.x + self.w / 2, self.y + self.h / 2)

    def intersection_area(self, other: Rect) -> float:
        dx = min(self.x2, other.x2) - max(self.x, other.x)
        dy = min(self.y2, other.y2) - max(self.y, other.y)
        return dx * dy if dx > 0 and dy > 0 else 0.0

    def gap(self, other: Rect) -> float:
        """Shortest edge-to-edge distance (0 when touching/overlapping)."""
        dx = max(other.x - self.x2, self.x - other.x2, 0.0)
        dy = max(other.y - self.y2, self.y - other.y2, 0.0)
        return math.hypot(dx, dy)

    def contains(self, other: Rect, tolerance: float = 0.5) -> bool:
        return (
            other.x >= self.x - tolerance
            and other.y >= self.y - tolerance
            and other.x2 <= self.x2 + tolerance
            and other.y2 <= self.y2 + tolerance
        )


def bed_rect(bed: GardenBed) -> Rect:
    return Rect(bed.x_cm, bed.y_cm, bed.width_cm, bed.length_cm)


def planting_rect(planting: Planting, bed: GardenBed | None = None) -> Rect:
    """Footprint of a planting; absolute canvas coordinates when ``bed`` given."""
    ox, oy = (bed.x_cm, bed.y_cm) if bed else (0.0, 0.0)
    return Rect(ox + planting.x_cm, oy + planting.y_cm, planting.width_cm, planting.length_cm)


def plant_positions(planting: Planting, plant: Plant) -> list[tuple[float, float]]:
    """Individual plant centres (relative to the bed) for rendering and counts.

    * ``single``: one plant in the centre of the footprint.
    * ``row``: plants along the long axis at in-row spacing; extra rows are
      added across at row spacing when the footprint is wide enough.
    * ``block``: square-foot style grid at in-row spacing in both directions,
      which is how intensive beds are typically planted.
    """
    r = planting_rect(planting)
    if planting.layout is LayoutMode.SINGLE:
        return [r.center]
    spacing = max(plant.spacing_cm, 1.0)
    if planting.layout is LayoutMode.ROW:
        along_x = r.w >= r.h
        length, across = (r.w, r.h) if along_x else (r.h, r.w)
        n_along = max(1, math.floor(length / spacing))
        n_rows = max(1, math.floor(across / max(plant.row_spacing_cm, 1.0)))
        step_a = length / n_along
        step_c = across / n_rows
        pts = []
        for row in range(n_rows):
            for i in range(n_along):
                a = step_a * (i + 0.5)
                c = step_c * (row + 0.5)
                pts.append((r.x + a, r.y + c) if along_x else (r.x + c, r.y + a))
        return pts
    nx = max(1, math.floor(r.w / spacing))
    ny = max(1, math.floor(r.h / spacing))
    sx, sy = r.w / nx, r.h / ny
    return [(r.x + sx * (i + 0.5), r.y + sy * (j + 0.5)) for j in range(ny) for i in range(nx)]


def plant_count(planting: Planting, plant: Plant) -> int:
    if planting.count is not None and planting.count > 0:
        return planting.count
    return len(plant_positions(planting, plant))


def snap(value: float, step: float) -> float:
    return round(value / step) * step if step > 0 else value


def clamp_into(inner: Rect, outer: Rect) -> Rect:
    """Move ``inner`` (keeping its size) so it lies within ``outer``."""
    w, h = min(inner.w, outer.w), min(inner.h, outer.h)
    x = min(max(inner.x, outer.x), outer.x2 - w)
    y = min(max(inner.y, outer.y), outer.y2 - h)
    return Rect(x, y, w, h)
