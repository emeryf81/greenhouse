"""Turning stored documents back into the model."""

from __future__ import annotations


def test_a_document_through_php_still_loads() -> None:
    """PHP's json_decode(..., true) turns empty objects into []: the garden must still load."""
    from custom_components.garden_manager.engine.models import GardenData
    from custom_components.garden_manager.engine.serde import from_dict

    data = from_dict(
        GardenData, {"notified": [], "layouts": [], "plant_overrides": [], "cooking_prefs": [], "cookbook": []}
    )
    assert data.notified == {} and data.layouts == {} and data.cooking_prefs == {}


def test_null_for_a_required_field_is_refused_and_null_for_a_default_keeps_the_default() -> None:
    import pytest

    from custom_components.garden_manager.engine.models import GardenBed, SoilTest
    from custom_components.garden_manager.engine.serde import from_dict

    with pytest.raises(TypeError):
        from_dict(SoilTest, {"date": None})
    bed = from_dict(GardenBed, {"id": "b", "name": "B", "zone_id": "z", "soil_tests": None})
    assert bed.soil_tests == []
