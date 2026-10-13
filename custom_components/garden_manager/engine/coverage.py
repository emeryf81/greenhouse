"""What covers what on the site plan (the same rules as the planner, frontend/src/planner/coverage.ts).

A house, a path, a hedge or a growing zone on the lawn takes that piece away
from the lawn.  The same holds for every ground cover (lawn, flower border,
terrace, decking, driveway, parking, street): a smaller one on a bigger one
takes its piece too.  Trees and shrubs stand over the ground and take nothing
away.  Zones lose what solid elements (buildings, paths, hedges ...) cover.
"""

from __future__ import annotations

from collections.abc import Sequence
import itertools

from .models import Feature, FeatureType, Zone

GROUND_COVER = frozenset(
    {
        FeatureType.LAWN,
        FeatureType.FLOWERBED,
        FeatureType.TERRACE,
        FeatureType.DECKING,
        FeatureType.DRIVEWAY,
        FeatureType.PARKING,
        FeatureType.STREET,
    }
)
CANOPY = frozenset({FeatureType.TREE, FeatureType.SHRUB})

Box = tuple[float, float, float, float]  # x, y, w, h in cm


def _box(item: Feature | Zone) -> Box:
    return (item.x_cm, item.y_cm, item.width_cm, item.length_cm)


def _overlap(a: Box, b: Box) -> Box | None:
    x, y = max(a[0], b[0]), max(a[1], b[1])
    x2, y2 = min(a[0] + a[2], b[0] + b[2]), min(a[1] + a[3], b[1] + b[3])
    return (x, y, x2 - x, y2 - y) if x2 > x and y2 > y else None


def union_area(boxes: Sequence[Box]) -> float:
    """Area (cm²) of the union of rectangles."""
    xs = sorted({v for b in boxes for v in (b[0], b[0] + b[2])})
    total = 0.0
    for x0, x1 in itertools.pairwise(xs):
        spans = sorted((b[1], b[1] + b[3]) for b in boxes if b[0] <= x0 and b[0] + b[2] >= x1)
        covered, end = 0.0, float("-inf")
        for start, stop in spans:
            if stop <= end:
                continue
            covered += stop - max(start, end)
            end = stop
        total += covered * (x1 - x0)
    return total


def feature_covers(f: Feature, features: Sequence[Feature], zones: Sequence[Zone]) -> list[Box]:
    if f.type not in GROUND_COVER:
        return []
    me = _box(f)
    area = me[2] * me[3]
    out = [o for z in zones if (o := _overlap(me, _box(z)))]
    for g in features:
        if g.id == f.id or g.type in CANOPY:
            continue
        gb = _box(g)
        if g.type in GROUND_COVER and gb[2] * gb[3] >= area:
            continue
        if o := _overlap(me, gb):
            out.append(o)
    return out


def zone_covers(z: Zone, features: Sequence[Feature]) -> list[Box]:
    me = _box(z)
    return [o for g in features if g.type not in CANOPY and g.type not in GROUND_COVER and (o := _overlap(me, _box(g)))]


def net_area_m2(item: Feature | Zone, features: Sequence[Feature], zones: Sequence[Zone] = ()) -> float:
    """What is left of the item (m²) once the things lying on it are taken off."""
    covers = feature_covers(item, features, zones) if isinstance(item, Feature) else zone_covers(item, features)
    gross = item.width_cm * item.length_cm
    return round(max(0.0, gross - union_area(covers)) / 10_000, 2)


def feature_layers(features: Sequence[Feature]) -> tuple[list[Feature], list[Feature]]:
    """(ground covers, biggest first; everything else) - the drawing order on a map."""
    ground = sorted((f for f in features if f.type in GROUND_COVER), key=lambda f: -f.width_cm * f.length_cm)
    return ground, [f for f in features if f.type not in GROUND_COVER]
