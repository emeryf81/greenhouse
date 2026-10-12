"""Forecast parsing, frost / heat risk, greenhouse estimation, ET0 and GDD.

DST note: every computation uses tz-aware instants.  Durations are measured as
differences between instants (a DST night simply has 23 or 25 hourly points);
"which night" questions convert to local time first.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping, Sequence
from dataclasses import dataclass, field
from datetime import UTC, date, datetime, timedelta, tzinfo
import math
from typing import Any, Literal

from .models import (
    ClimateDay,
    ForecastPoint,
    GreenhouseAction,
    RiskLevel,
    WeatherSnapshot,
    Zone,
    ZoneType,
)

DEFAULT_NIGHT_OFFSET = {ZoneType.GREENHOUSE: 3.0, ZoneType.COLD_FRAME: 2.0, ZoneType.OUTDOOR: 0.0}
DEFAULT_SOLAR_GAIN = {ZoneType.GREENHOUSE: 12.0, ZoneType.COLD_FRAME: 8.0, ZoneType.OUTDOOR: 0.0}


# --------------------------------------------------------------------------- #
# Parsing
# --------------------------------------------------------------------------- #
def _f(value: Any) -> float | None:
    try:
        return None if value is None else float(value)
    except (TypeError, ValueError):
        return None


def parse_forecast(raw: Iterable[Mapping[str, Any]]) -> list[ForecastPoint]:
    """Parse ``weather.get_forecasts`` items; malformed items are skipped."""
    points: list[ForecastPoint] = []
    for item in raw or []:
        try:
            at = datetime.fromisoformat(str(item["datetime"]))
        except (KeyError, ValueError):
            continue
        if at.tzinfo is None:  # be lenient with odd weather integrations
            at = at.replace(tzinfo=UTC)
        points.append(
            ForecastPoint(
                at=at,
                temperature=_f(item.get("temperature")),
                templow=_f(item.get("templow")),
                precipitation=_f(item.get("precipitation")),
                precipitation_probability=_f(item.get("precipitation_probability")),
                humidity=_f(item.get("humidity")),
                wind_speed=_f(item.get("wind_speed")),
                cloud_coverage=_f(item.get("cloud_coverage")),
                condition=item.get("condition"),
            )
        )
    points.sort(key=lambda p: p.at)
    return points


_CLEAR_CONDITIONS = {"clear-night", "sunny"}
_CLOUDY_CONDITIONS = {"cloudy", "fog", "rainy", "pouring", "snowy", "snowy-rainy", "lightning-rainy"}


def _cloud_fraction(point: ForecastPoint) -> float:
    if point.cloud_coverage is not None:
        return max(0.0, min(1.0, point.cloud_coverage / 100))
    if point.condition in _CLEAR_CONDITIONS:
        return 0.1
    if point.condition in _CLOUDY_CONDITIONS:
        return 0.9
    if point.condition == "partlycloudy":
        return 0.5
    return 0.5


def radiative_adjustment(point: ForecastPoint, local_hour: int) -> float:
    """Extra cooling at plant height on calm, clear nights (°C, <= 0).

    Forecast temperatures are for 2 m.  On clear, calm nights the surface can
    be 2-4 °C colder ("ground frost").  We apply a conservative estimate.
    """
    if 9 <= local_hour < 18:
        return 0.0
    clouds = _cloud_fraction(point)
    wind = point.wind_speed if point.wind_speed is not None else 10.0
    if clouds < 0.3 and wind < 8:
        return -2.0
    if clouds < 0.6 and wind < 15:
        return -1.0
    return -0.3


# --------------------------------------------------------------------------- #
# Frost
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class FrostAssessment:
    level: RiskLevel = RiskLevel.UNKNOWN
    min_temp_c: float | None = None  # forecast 2 m minimum
    plant_level_min_c: float | None = None  # radiative adjusted
    min_at: datetime | None = None
    first_below_zero_at: datetime | None = None
    hours_below_zero: float = 0.0
    source: Literal["hourly", "daily", "sensor", "none"] = "none"
    horizon_hours: int = 48


def classify_frost(plant_level_min: float | None) -> RiskLevel:
    if plant_level_min is None:
        return RiskLevel.UNKNOWN
    if plant_level_min <= 0.0:
        return RiskLevel.HIGH
    if plant_level_min <= 2.0:
        return RiskLevel.MODERATE
    if plant_level_min <= 4.0:
        return RiskLevel.LOW
    return RiskLevel.NONE


def assess_frost(
    weather: WeatherSnapshot,
    now: datetime,
    tz: tzinfo,
    *,
    horizon_hours: int = 48,
    offset_c: float = 0.0,
    current_temp: float | None = None,
) -> FrostAssessment:
    """Frost risk over the next ``horizon_hours``.

    ``offset_c`` shifts temperatures for enclosed zones (greenhouse buffering).
    Falls back hourly -> daily -> current sensor -> unknown.
    """
    horizon = now + timedelta(hours=horizon_hours)
    hourly = [p for p in weather.hourly if now - timedelta(hours=1) <= p.at <= horizon]
    if weather.available and hourly:
        best: ForecastPoint | None = None
        best_adj: float | None = None
        below_zero_h = 0.0
        first_below: datetime | None = None
        for idx, point in enumerate(hourly):
            if point.temperature is None:
                continue
            local_hour = point.at.astimezone(tz).hour
            adj = point.temperature + offset_c + radiative_adjustment(point, local_hour)
            if best_adj is None or adj < best_adj:
                best, best_adj = point, adj
            if adj <= 0.0:
                first_below = first_below or point.at
                # duration until next point (DST safe), capped at 3 h for gaps
                nxt = hourly[idx + 1].at if idx + 1 < len(hourly) else point.at + timedelta(hours=1)
                below_zero_h += min((nxt - point.at).total_seconds() / 3600, 3.0)
        if best is not None and best_adj is not None and best.temperature is not None:
            return FrostAssessment(
                level=classify_frost(best_adj),
                min_temp_c=round(best.temperature + offset_c, 1),
                plant_level_min_c=round(best_adj, 1),
                min_at=best.at,
                first_below_zero_at=first_below,
                hours_below_zero=round(below_zero_h, 1),
                source="hourly",
                horizon_hours=horizon_hours,
            )

    if weather.available and weather.daily:
        today = now.astimezone(tz).date()
        days = [
            p
            for p in weather.daily
            if today <= p.at.astimezone(tz).date() <= today + timedelta(days=horizon_hours // 24)
        ]
        lows = [(p, p.templow if p.templow is not None else p.temperature) for p in days]
        lows = [(p, v) for p, v in lows if v is not None]
        if lows:
            point, low = min(lows, key=lambda pv: pv[1])
            # Daily minima occur at night: always apply the night adjustment.
            adj = low + offset_c + radiative_adjustment(point, local_hour=3)
            return FrostAssessment(
                level=classify_frost(adj),
                min_temp_c=round(low + offset_c, 1),
                plant_level_min_c=round(adj, 1),
                min_at=point.at,
                first_below_zero_at=point.at if adj <= 0 else None,
                source="daily",
                horizon_hours=horizon_hours,
            )

    if current_temp is not None:
        value = current_temp + offset_c
        # Without a forecast we can only say "it is cold right now".
        level = classify_frost(value) if value <= 4 else RiskLevel.UNKNOWN
        return FrostAssessment(
            level=level,
            min_temp_c=round(value, 1),
            plant_level_min_c=round(value, 1),
            min_at=now,
            source="sensor",
            horizon_hours=horizon_hours,
        )
    return FrostAssessment(source="none", horizon_hours=horizon_hours)


def zone_night_offset(zone: Zone | None) -> float:
    if zone is None:
        return 0.0
    if zone.microclimate.night_offset_c is not None:
        return zone.microclimate.night_offset_c
    offset = DEFAULT_NIGHT_OFFSET.get(zone.type, 0.0)
    # Exposed sites lose heat faster, sheltered spots keep it.
    if zone.type is ZoneType.OUTDOOR:
        offset += {"sheltered": 0.5, "moderate": 0.0, "exposed": -0.5}[zone.microclimate.wind.value]
    return offset


def frost_for_zone(
    weather: WeatherSnapshot,
    zone: Zone | None,
    now: datetime,
    tz: tzinfo,
    current_outdoor: float | None,
) -> FrostAssessment:
    assessment = assess_frost(weather, now, tz, offset_c=zone_night_offset(zone), current_temp=current_outdoor)
    if zone and zone.microclimate.heated and zone.microclimate.min_heating_temp_c is not None:
        floor = zone.microclimate.min_heating_temp_c
        if assessment.plant_level_min_c is not None and assessment.plant_level_min_c < floor:
            assessment.plant_level_min_c = floor
            assessment.min_temp_c = floor
            assessment.level = classify_frost(floor)
            assessment.hours_below_zero = 0.0 if floor > 0 else assessment.hours_below_zero
    return assessment


# --------------------------------------------------------------------------- #
# Greenhouse climate
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class GreenhouseAdvice:
    action: GreenhouseAction = GreenhouseAction.NONE
    inside_now_c: float | None = None
    forecast_max_c: float | None = None
    forecast_min_c: float | None = None
    limit_max_c: float | None = None
    limit_min_c: float | None = None
    limiting_plants: list[str] = field(default_factory=list)
    reasons: list[str] = field(default_factory=list)


def solar_gain(zone: Zone) -> float:
    if zone.microclimate.solar_gain_c is not None:
        gain = zone.microclimate.solar_gain_c
    else:
        gain = DEFAULT_SOLAR_GAIN.get(zone.type, 0.0)
    return gain * (1 - zone.microclimate.shade_pct / 100)


def estimate_inside(
    weather: WeatherSnapshot, zone: Zone, now: datetime, hours: int = 24
) -> tuple[float | None, float | None]:
    """Estimated (max, min) inside an enclosure over the next ``hours``."""
    horizon = now + timedelta(hours=hours)
    pts = [p for p in weather.hourly if now <= p.at <= horizon and p.temperature is not None]
    gain = solar_gain(zone)
    night = zone_night_offset(zone)
    if pts:
        maxes = [p.temperature + gain * (1 - _cloud_fraction(p)) for p in pts]  # type: ignore[operator]
        mins = [p.temperature + night for p in pts]  # type: ignore[operator]
        return round(max(maxes), 1), round(min(mins), 1)
    days = [p for p in weather.daily if p.at.date() <= horizon.date() and p.at >= now - timedelta(hours=12)]
    if days:
        d = days[0]
        hi = None if d.temperature is None else d.temperature + gain * (1 - _cloud_fraction(d))
        lo = None if d.templow is None else d.templow + night
        return (None if hi is None else round(hi, 1), None if lo is None else round(lo, 1))
    return None, None


def greenhouse_advice(
    zone: Zone,
    weather: WeatherSnapshot,
    now: datetime,
    inside_now: float | None,
    plants: Sequence[tuple[str, float, float]],
) -> GreenhouseAdvice:
    """Ventilation / shading / closing advice for an enclosed zone.

    ``plants`` are ``(name, min_night_c, max_day_c)`` of crops currently in
    the zone; the most sensitive plant sets the limits.  Without crops the
    generic limits 5 °C / 30 °C are used.
    """
    if not plants:
        # Empty enclosure: report the estimates but don't nag.
        fmax, fmin = estimate_inside(weather, zone, now)
        return GreenhouseAdvice(inside_now_c=inside_now, forecast_max_c=fmax, forecast_min_c=fmin)
    limit_max = min((p[2] for p in plants), default=30.0)
    limit_min = max((p[1] for p in plants), default=5.0)
    hot = [p[0] for p in plants if p[2] <= limit_max + 0.01]
    cold = [p[0] for p in plants if p[1] >= limit_min - 0.01]
    fmax, fmin = estimate_inside(weather, zone, now)
    advice = GreenhouseAdvice(
        inside_now_c=inside_now,
        forecast_max_c=fmax,
        forecast_min_c=fmin,
        limit_max_c=limit_max,
        limit_min_c=limit_min,
    )
    current = inside_now
    if current is not None and current >= limit_max + 3:
        advice.action = GreenhouseAction.SHADE
        advice.reasons.append("inside_hot_now")
        advice.limiting_plants = hot
    elif current is not None and current >= limit_max - 3:
        advice.action = GreenhouseAction.VENTILATE
        advice.reasons.append("inside_warm_now")
        advice.limiting_plants = hot
    elif fmax is not None and fmax >= limit_max + 4:
        advice.action = GreenhouseAction.SHADE
        advice.reasons.append("forecast_hot")
        advice.limiting_plants = hot
    elif fmax is not None and fmax >= limit_max - 2:
        advice.action = GreenhouseAction.VENTILATE
        advice.reasons.append("forecast_warm")
        advice.limiting_plants = hot
    elif fmin is not None and fmin < limit_min:
        advice.action = GreenhouseAction.HEAT if zone.microclimate.heated else GreenhouseAction.CLOSE_UP
        advice.reasons.append("forecast_cold_night")
        advice.limiting_plants = cold
    return advice


# --------------------------------------------------------------------------- #
# Evapotranspiration (Hargreaves-Samani, FAO-56 eq. 52)
# --------------------------------------------------------------------------- #
def extraterrestrial_radiation(latitude_deg: float, day: date) -> float:
    """Ra in MJ m-2 day-1 (FAO-56 eq. 21).  Valid at all latitudes."""
    j = day.timetuple().tm_yday
    days_in_year = 366 if (day.year % 4 == 0 and (day.year % 100 != 0 or day.year % 400 == 0)) else 365
    phi = math.radians(latitude_deg)
    dr = 1 + 0.033 * math.cos(2 * math.pi * j / days_in_year)
    delta = 0.409 * math.sin(2 * math.pi * j / days_in_year - 1.39)
    x = -math.tan(phi) * math.tan(delta)
    ws = math.acos(max(-1.0, min(1.0, x)))  # polar day/night clamp
    ra = (
        (24 * 60 / math.pi)
        * 0.0820
        * dr
        * (ws * math.sin(phi) * math.sin(delta) + math.cos(phi) * math.cos(delta) * math.sin(ws))
    )
    return max(ra, 0.0)


def et0_hargreaves(tmin: float, tmax: float, latitude_deg: float, day: date) -> float:
    """Reference evapotranspiration in mm/day."""
    if tmax < tmin:
        tmin, tmax = tmax, tmin
    tmean = (tmin + tmax) / 2
    ra = extraterrestrial_radiation(latitude_deg, day)
    et0 = 0.0023 * (tmean + 17.8) * math.sqrt(tmax - tmin) * ra * 0.408
    return max(round(et0, 2), 0.0)


@dataclass(slots=True)
class DailyOutlook:
    day: date
    tmin: float | None
    tmax: float | None
    rain_mm: float  # probability weighted
    et0_mm: float | None


def daily_outlook(
    weather: WeatherSnapshot, now: datetime, tz: tzinfo, latitude: float, days: int = 3
) -> list[DailyOutlook]:
    """Per local day: min/max temperature, expected rain, ET0.

    Prefers aggregating hourly data (exact local-day boundaries, DST safe);
    falls back to the daily forecast.
    """
    today = now.astimezone(tz).date()
    result: dict[date, DailyOutlook] = {}
    if weather.hourly:
        for p in weather.hourly:
            d = p.at.astimezone(tz).date()
            if not today <= d < today + timedelta(days=days):
                continue
            o = result.setdefault(d, DailyOutlook(d, None, None, 0.0, None))
            if p.temperature is not None:
                o.tmin = p.temperature if o.tmin is None else min(o.tmin, p.temperature)
                o.tmax = p.temperature if o.tmax is None else max(o.tmax, p.temperature)
            o.rain_mm += expected_rain(p)
    if not result and weather.daily:
        for p in weather.daily:
            d = p.at.astimezone(tz).date()
            if not today <= d < today + timedelta(days=days):
                continue
            result[d] = DailyOutlook(d, p.templow, p.temperature, expected_rain(p), None)
    for o in result.values():
        if o.tmin is not None and o.tmax is not None:
            o.et0_mm = et0_hargreaves(o.tmin, o.tmax, latitude, o.day)
        o.rain_mm = round(o.rain_mm, 1)
    return [result[d] for d in sorted(result)]


def expected_rain(point: ForecastPoint) -> float:
    """Probability-weighted precipitation (mm)."""
    if not point.precipitation:
        return 0.0
    prob = point.precipitation_probability
    factor = 1.0 if prob is None else max(0.0, min(1.0, prob / 100))
    return point.precipitation * factor


# --------------------------------------------------------------------------- #
# Growing degree days
# --------------------------------------------------------------------------- #
def gdd_for_day(tmin: float, tmax: float, base: float = 10.0, cap: float = 30.0) -> float:
    """Modified average method: temperatures clamped to [base, cap]."""
    hi = min(max(tmax, base), cap)
    lo = min(max(tmin, base), cap)
    return max(0.0, (hi + lo) / 2 - base)


def accumulate_gdd(log: Iterable[ClimateDay], start: date, end: date, base: float = 10.0) -> tuple[float, int]:
    """Sum GDD over logged days in [start, end]; returns (gdd, days_counted)."""
    total, counted = 0.0, 0
    for day in log:
        if start <= day.day <= end and day.tmin is not None and day.tmax is not None:
            total += gdd_for_day(day.tmin, day.tmax, base)
            counted += 1
    return round(total, 1), counted


def record_climate(
    log: list[ClimateDay], day: date, temp: float | None, rain_mm: float | None = None, keep_days: int = 400
) -> bool:
    """Fold a temperature sample into the daily log.  Returns True if changed."""
    if temp is None and rain_mm is None:
        return False
    entry = next((d for d in log if d.day == day), None)
    if entry is None:
        entry = ClimateDay(day=day)
        log.append(entry)
        log.sort(key=lambda d: d.day)
        cutoff = day - timedelta(days=keep_days)
        log[:] = [d for d in log if d.day >= cutoff]
    changed = False
    if temp is not None:
        if entry.tmin is None or temp < entry.tmin:
            entry.tmin, changed = temp, True
        if entry.tmax is None or temp > entry.tmax:
            entry.tmax, changed = temp, True
    if rain_mm is not None and rain_mm != entry.rain_mm:
        entry.rain_mm, changed = rain_mm, True
    return changed
