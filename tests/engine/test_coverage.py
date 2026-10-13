"""A house, path or zone on the lawn takes its piece; a tree on the terrace does not."""

from __future__ import annotations

from custom_components.garden_manager.engine.coverage import feature_layers, net_area_m2, union_area
from custom_components.garden_manager.engine.models import Feature, FeatureType, Zone, ZoneType


def f(fid: str, ftype: FeatureType, x: float, y: float, w: float, h: float) -> Feature:
    return Feature(fid, fid, ftype, x, y, w, h)


def test_union_counts_overlap_once():
    assert union_area([(0, 0, 100, 100), (50, 50, 100, 100)]) == 17_500


def test_lawn_loses_what_lies_on_it_but_not_under_a_tree():
    lawn = f("lawn", FeatureType.LAWN, 0, 0, 1000, 1000)
    house = f("house", FeatureType.HOUSE, 0, 0, 400, 500)
    path = f("path", FeatureType.PATH, 400, 0, 100, 1000)
    tree = f("tree", FeatureType.TREE, 600, 600, 300, 300)
    terrace = f("terrace", FeatureType.TERRACE, 600, 0, 200, 200)
    garden = Zone("z", "Moestuin", ZoneType.OUTDOOR, x_cm=500, y_cm=400, width_cm=500, length_cm=200)
    features = [lawn, house, path, tree, terrace]
    assert net_area_m2(lawn, features, [garden]) == 100 - 20 - 10 - 4 - 10
    assert net_area_m2(terrace, [*features, f("t2", FeatureType.TREE, 650, 50, 100, 100)], []) == 4


def test_zone_loses_solid_elements_not_ground():
    zone = Zone("z", "Moestuin", ZoneType.OUTDOOR, x_cm=0, y_cm=0, width_cm=1000, length_cm=500)
    features = [
        f("lawn", FeatureType.LAWN, 0, 0, 2000, 2000),
        f("shed", FeatureType.SHED, 0, 0, 200, 150),
        f("path", FeatureType.PATH, 0, 300, 1000, 60),
    ]
    assert net_area_m2(zone, features) == 50 - 3 - 6


def test_ground_drawn_first_biggest_at_the_bottom():
    ground, above = feature_layers(
        [
            f("t", FeatureType.TERRACE, 0, 0, 100, 100),
            f("h", FeatureType.HOUSE, 0, 0, 10, 10),
            f("l", FeatureType.LAWN, 0, 0, 1000, 1000),
        ]
    )
    assert [g.id for g in ground] == ["l", "t"] and [g.id for g in above] == ["h"]


def test_equal_ground_covers_take_the_overlap_once():
    a = f("a_lawn", FeatureType.LAWN, 0, 0, 400, 400)
    b = f("b_terrace", FeatureType.TERRACE, 200, 0, 400, 400)
    total = net_area_m2(a, [a, b]) + net_area_m2(b, [a, b])
    assert total == 24
    assert [x.id for x in feature_layers([b, a])[0]] == ["a_lawn", "b_terrace"]
