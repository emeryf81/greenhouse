"""Frost warning computation from forecasts (incl. DST, fallbacks, enclosures)."""

from __future__ import annotations

from datetime import UTC, datetime
from zoneinfo import ZoneInfo

from custom_components.garden_manager.engine.models import (
    ForecastPoint,
    Microclimate,
    RiskLevel,
    WeatherSnapshot,
    Zone,
    ZoneType,
)
from custom_components.garden_manager.engine.weather import (
    assess_frost,
    classify_frost,
    daily_outlook,
    frost_for_zone,
    greenhouse_advice,
)

from ..conftest import weather

AMS = ZoneInfo("Europe/Amsterdam")


def test_hourly_frost_across_dst_switch():
    """Clear, calm night of 28->29 March 2026 (clocks jump 02:00 -> 03:00)."""
    snap = weather(hourly="forecast_hourly_dst_frost.json")
    now = datetime(2026, 3, 28, 12, 0, tzinfo=UTC)
    frost = assess_frost(snap, now, AMS)
    assert frost.source == "hourly"
    assert frost.min_temp_c == -2.0
    # radiative cooling on a clear calm night: 2 °C colder at plant height
    assert frost.plant_level_min_c == -4.0
    assert frost.level is RiskLevel.HIGH
    # minimum at 04:00 UTC == 06:00 CEST (summer time already active)
    local_min = frost.min_at.astimezone(AMS)
    assert (local_min.date().isoformat(), local_min.hour) == ("2026-03-29", 6)
    assert local_min.utcoffset().total_seconds() == 7200
    # Hours below zero are measured between instants, not by counting local
    # wall-clock hours, so the "missing" 02:00 hour cannot break it.
    assert frost.hours_below_zero > 0
    assert (
        frost.hours_below_zero
        == len(
            [
                p
                for p in snap.hourly
                if p.temperature is not None
                and now <= p.at
                and p.temperature - (2.0 if (p.at.astimezone(AMS).hour >= 18 or p.at.astimezone(AMS).hour < 9) else 0)
                <= 0
            ]
        )
        * 1.0
    )


def test_daily_fallback_when_no_hourly_forecast():
    snap = weather(daily="forecast_daily.json")
    now = datetime(2026, 4, 25, 8, 0, tzinfo=UTC)
    frost = assess_frost(snap, now, AMS)
    assert frost.source == "daily"
    assert frost.min_temp_c == -1.0  # templow of the second day
    assert frost.level is RiskLevel.HIGH


def test_forecast_unavailable_uses_sensor_or_unknown():
    now = datetime(2026, 4, 25, 5, 0, tzinfo=UTC)
    unavailable = WeatherSnapshot(available=False)
    assert assess_frost(unavailable, now, AMS).level is RiskLevel.UNKNOWN
    cold_now = assess_frost(unavailable, now, AMS, current_temp=1.5)
    assert (cold_now.source, cold_now.level) == ("sensor", RiskLevel.MODERATE)
    mild_now = assess_frost(unavailable, now, AMS, current_temp=12)
    assert mild_now.level is RiskLevel.UNKNOWN  # can't claim "no frost" without a forecast


def test_greenhouse_buffers_frost_and_heating_floor():
    snap = weather(hourly="forecast_hourly_dst_frost.json")
    now = datetime(2026, 3, 28, 12, 0, tzinfo=UTC)
    outdoor = frost_for_zone(snap, None, now, AMS, None)
    greenhouse = Zone("gh", "GH", ZoneType.GREENHOUSE)
    inside = frost_for_zone(snap, greenhouse, now, AMS, None)
    assert inside.plant_level_min_c == outdoor.plant_level_min_c + 3.0
    heated = Zone("gh2", "GH2", ZoneType.GREENHOUSE, microclimate=Microclimate(heated=True, min_heating_temp_c=8.0))
    assert frost_for_zone(snap, heated, now, AMS, None).level is RiskLevel.NONE


def test_cloudy_windy_night_has_less_radiative_risk():
    at = datetime(2026, 4, 1, 1, 0, tzinfo=UTC)
    clear = WeatherSnapshot(available=True, hourly=[ForecastPoint(at, 1.5, cloud_coverage=5, wind_speed=3)])
    cloudy = WeatherSnapshot(available=True, hourly=[ForecastPoint(at, 1.5, cloud_coverage=95, wind_speed=25)])
    now = datetime(2026, 3, 31, 20, 0, tzinfo=UTC)
    assert assess_frost(clear, now, AMS).level is RiskLevel.HIGH  # -0.5 at plant level
    assert assess_frost(cloudy, now, AMS).level is RiskLevel.MODERATE  # 1.2


def test_classification_thresholds():
    assert [classify_frost(v) for v in (-3, 0, 1.9, 3.5, 6, None)] == [
        RiskLevel.HIGH,
        RiskLevel.HIGH,
        RiskLevel.MODERATE,
        RiskLevel.LOW,
        RiskLevel.NONE,
        RiskLevel.UNKNOWN,
    ]


def test_daily_outlook_aggregates_local_days_and_rain():
    snap = weather(hourly="forecast_hourly_rain.json")
    now = datetime(2026, 5, 20, 4, 0, tzinfo=UTC)
    outlook = daily_outlook(snap, now, AMS, latitude=52.1)
    assert outlook[0].day.isoformat() == "2026-05-20"
    assert outlook[0].rain_mm == round(6 * 1.5 * 0.9, 1)  # probability weighted
    assert 2.0 < outlook[0].et0_mm < 6.0  # plausible May ET0 in NL


def test_greenhouse_ventilation_and_shading_advice():
    zone = Zone("gh", "GH", ZoneType.GREENHOUSE)
    snap = weather(hourly="forecast_hourly_rain.json")
    now = datetime(2026, 5, 20, 10, 0, tzinfo=UTC)
    crops = [("Lettuce", 2.0, 24.0), ("Tomato", 10.0, 32.0)]
    warm = greenhouse_advice(zone, snap, now, inside_now=23.0, plants=crops)
    assert warm.action.value == "ventilate" and warm.limiting_plants == ["Lettuce"]
    hot = greenhouse_advice(zone, snap, now, inside_now=29.0, plants=crops)
    assert hot.action.value == "shade"
    empty = greenhouse_advice(zone, snap, now, inside_now=40.0, plants=[])
    assert empty.action.value == "none"
