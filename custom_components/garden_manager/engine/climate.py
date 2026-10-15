"""Climate history: what the weather really did here, and what it adds up to.

The forecast says what is coming; this module keeps what came.  Three sources,
in order of trust:

* **own samples** (``source`` "sensor"): every update folds the outdoor sensors -
  or, without them, the weather entity - into today's record: minimum, maximum and
  mean temperature, humidity, wind and gusts, radiation and sunshine hours.  Every
  mapped temperature sensor (greenhouse air, soil, bed air ...) gets its own daily
  min / max / mean in ``sensor_log``.
* **recorder history** ("history"): the same sensors as Home Assistant recorded them,
  for the days the garden was not watched (a restart, or the website that only
  computes while someone has it open).  On the website this comes through the linked
  Home Assistant's token.
* **observed weather** ("model"): Open-Meteo's measured / reanalysed daily weather for
  the garden's location - the fallback for days nobody measured.

Days leave the daily logs after :data:`KEEP_DAYS` / :data:`SENSOR_KEEP_DAYS`; their
months stay for good in ``climate_months`` (minimum, maximum, mean, rain, frost and hot
days, sunshine, wind), so year-on-year statistics survive.  Measured frost dates per
year are kept in ``frost_years`` and compared with the regional preset.

Everything here is pure: the coordinator (Home Assistant) and the website feed it.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping, Sequence
from dataclasses import dataclass
from datetime import date, datetime, timedelta
import math
from typing import Any

from .models import ClimateDay, ClimateMonth, FrostYear, GardenData, Hemisphere, SensorDay
from .weather import daylight_hours, et0_hargreaves, et0_penman_monteith, extraterrestrial_radiation, gdd_for_day

KEEP_DAYS = 800  # outdoor days kept in full (two seasons and a bit)
SENSOR_KEEP_DAYS = 400
SAMPLE_MIN_S = 240  # a mean sample at most every 4 minutes per series
MAX_GAP_H = 0.5  # a longer silence counts as half an hour of coverage
SUN_WM2 = 120.0  # WMO threshold for "sunshine"
LUX_TO_WM2 = 0.0079  # daylight: ~127 lux per W/m²
HOT_C = 25.0
VERY_HOT_C = 30.0
FULL_DAY_H = 20.0  # own samples covering this much make a complete day
MODEL_BEATS_H = 12.0  # Open-Meteo replaces own extremes when they cover less
GREENHOUSE_NIGHT_C = 2.0  # fallback when a greenhouse has no air sensor
GREENHOUSE_DAY_C = 4.0
STORM_GUST_KMH = 60.0
STORM_WIND_KMH = 45.0

# Open-Meteo's daily observed weather (also usable with ``past_days`` on the forecast API).
OPEN_METEO_DAILY = (
    "temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,"
    "wind_speed_10m_max,wind_gusts_10m_max,shortwave_radiation_sum,sunshine_duration,"
    "et0_fao_evapotranspiration,relative_humidity_2m_mean,relative_humidity_2m_max,relative_humidity_2m_min"
)


def _mean(mean: float | None, n: int, value: float) -> tuple[float, int]:
    if mean is None or n <= 0:
        return value, 1
    return mean + (value - mean) / (n + 1), n + 1


def _r(value: float | None, digits: int = 1) -> float | None:
    return None if value is None else round(value, digits)


def _src(current: str, add: str) -> str:
    parts = [p for p in current.split("+") if p]
    if add not in parts:
        parts.append(add)
    return "+".join(parts)


# --------------------------------------------------------------------------- #
# Own samples
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class ClimateSample:
    """What is measured right now outdoors (any field may be unknown)."""

    temp: float | None = None
    humidity: float | None = None
    wind_kmh: float | None = None
    gust_kmh: float | None = None
    radiation_wm2: float | None = None  # global radiation; from lux with LUX_TO_WM2


def _day(log: list[ClimateDay], day: date) -> tuple[ClimateDay, bool]:
    entry = next((d for d in reversed(log) if d.day == day), None)
    if entry is not None:
        return entry, False
    entry = ClimateDay(day=day)
    log.append(entry)
    log.sort(key=lambda d: d.day)
    return entry, True


def _sensor_day(log: list[SensorDay], entity_id: str, day: date) -> tuple[SensorDay, bool]:
    entry = next((d for d in reversed(log) if d.entity_id == entity_id and d.day == day), None)
    if entry is not None:
        return entry, False
    entry = SensorDay(entity_id, day)
    log.append(entry)
    return entry, True


class ClimateRecorder:
    """Folds samples into the daily logs; remembers (in memory) when each series was last sampled."""

    def __init__(self) -> None:
        self.last: dict[str, datetime] = {}

    def _gap_h(self, key: str, now: datetime) -> float | None:
        """Hours since the last mean sample of ``key``; ``None`` = too soon for another."""
        last = self.last.get(key)
        if last is not None and 0 <= (now - last).total_seconds() < SAMPLE_MIN_S:
            return None
        self.last[key] = now
        if last is None or now < last:
            return 0.0
        return min((now - last).total_seconds() / 3600, MAX_GAP_H)

    def sample(
        self,
        data: GardenData,
        now: datetime,
        today: date,
        outdoor: ClimateSample,
        temperatures: Mapping[str, float | None] | None = None,
        *,
        rain_mm: float | None = None,
        rain_src: str = "",
        hemisphere: Hemisphere = Hemisphere.NORTH,
    ) -> bool:
        """Book one round of readings.  Returns True if the stored data changed."""
        changed = False
        if any(v is not None for v in (outdoor.temp, outdoor.humidity, outdoor.wind_kmh, rain_mm)):
            entry, new = _day(data.climate_log, today)
            changed |= new
            if new:
                changed |= roll_up(data, today)
                changed |= update_frost_years(data, hemisphere, today)
            changed |= self._outdoor(entry, now, outdoor)
            # a forecast never overrides a gauge or recorded rain of the same day
            if (
                rain_mm is not None
                and (rain_mm != entry.rain_mm or (rain_src and entry.rain_src != rain_src))
                and not (rain_src == "forecast" and entry.rain_src in ("gauge", "history"))
            ):
                entry.rain_mm, entry.rain_src, changed = round(rain_mm, 1), rain_src or entry.rain_src, True
        for entity_id, value in (temperatures or {}).items():
            if value is None:
                continue
            entry, new = _sensor_day(data.sensor_log, entity_id, today)
            changed |= new
            if entry.tmin is None or value < entry.tmin:
                entry.tmin, changed = value, True
            if entry.tmax is None or value > entry.tmax:
                entry.tmax, changed = value, True
            if self._gap_h(entity_id, now) is not None:
                mean, entry.n = _mean(entry.tmean, entry.n, value)
                entry.tmean, changed = round(mean, 2), True
        return changed

    def _outdoor(self, entry: ClimateDay, now: datetime, s: ClimateSample) -> bool:
        changed = False
        if s.temp is not None:
            if entry.tmin is None or s.temp < entry.tmin:
                entry.tmin, changed = s.temp, True
            if entry.tmax is None or s.temp > entry.tmax:
                entry.tmax, changed = s.temp, True
        if s.humidity is not None:
            if entry.rh_min is None or s.humidity < entry.rh_min:
                entry.rh_min, changed = s.humidity, True
            if entry.rh_max is None or s.humidity > entry.rh_max:
                entry.rh_max, changed = s.humidity, True
        if s.gust_kmh is not None and (entry.gust_max is None or s.gust_kmh > entry.gust_max):
            entry.gust_max, changed = s.gust_kmh, True
        if s.wind_kmh is not None and (entry.wind_max is None or s.wind_kmh > entry.wind_max):
            entry.wind_max, changed = s.wind_kmh, True
        gap = self._gap_h("outdoor", now)
        if gap is None:
            return changed
        if s.temp is not None:
            mean, entry.t_n = _mean(entry.tmean, entry.t_n, s.temp)
            entry.tmean = round(mean, 2)
        if s.humidity is not None:
            mean, entry.rh_n = _mean(entry.rh_mean, entry.rh_n, s.humidity)
            entry.rh_mean = round(mean, 1)
        if s.wind_kmh is not None:
            mean, entry.w_n = _mean(entry.wind_mean, entry.w_n, s.wind_kmh)
            entry.wind_mean = round(mean, 1)
        if s.radiation_wm2 is not None and gap > 0:
            entry.rs_mj = round((entry.rs_mj or 0.0) + max(s.radiation_wm2, 0.0) * gap * 3600 / 1e6, 2)
            if s.radiation_wm2 >= SUN_WM2:
                entry.sun_h = round((entry.sun_h or 0.0) + gap, 2)
            elif entry.sun_h is None:
                entry.sun_h = 0.0
        entry.hours = round(min(entry.hours + gap, 24.0), 2)
        entry.source = _src(entry.source, "sensor")
        return True


# --------------------------------------------------------------------------- #
# Filling in the past
# --------------------------------------------------------------------------- #
_FIELDS = ("rh_min", "rh_max", "rh_mean", "wind_mean", "wind_max", "gust_max", "rs_mj", "sun_h", "et0_mm")


def _f(value: Any) -> float | None:
    try:
        out = float(value)
    except (TypeError, ValueError):
        return None
    return out if math.isfinite(out) else None


def merge_history(data: GardenData, records: Iterable[Mapping[str, Any]], source: str, today: date) -> bool:
    """Fill outdoor days from recorded or observed daily weather.

    ``source``: "history" (the same sensors, from the recorder: extremes are combined)
    or "model" (Open-Meteo: only fills what own samples did not measure well).
    Today is left to the own samples.
    """
    changed = False
    for rec in records:
        try:
            day = rec["day"] if isinstance(rec["day"], date) else date.fromisoformat(str(rec["day"])[:10])
        except (KeyError, TypeError, ValueError):
            continue
        if day >= today or day < today - timedelta(days=KEEP_DAYS):
            continue
        tmin, tmax, tmean = _f(rec.get("tmin")), _f(rec.get("tmax")), _f(rec.get("tmean"))
        if tmin is not None and tmax is not None and tmin > tmax:
            tmin, tmax = tmax, tmin
        entry, new = _day(data.climate_log, day)
        before = (entry.tmin, entry.tmax, entry.tmean, entry.rain_mm, *(getattr(entry, k) for k in _FIELDS))
        complete = entry.hours >= FULL_DAY_H
        if source == "history":
            if tmin is not None:
                entry.tmin = tmin if entry.tmin is None else min(entry.tmin, tmin)
            if tmax is not None:
                entry.tmax = tmax if entry.tmax is None else max(entry.tmax, tmax)
            if tmean is not None and not complete:
                entry.tmean = tmean
        elif entry.hours < MODEL_BEATS_H:
            entry.tmin = tmin if tmin is not None else entry.tmin
            entry.tmax = tmax if tmax is not None else entry.tmax
            entry.tmean = tmean if tmean is not None else entry.tmean
        rain = _f(rec.get("rain_mm"))
        rank = {"": 0, "forecast": 1, "model": 2, "history": 3, "gauge": 4}
        if rain is not None and rank.get(source, 0) >= rank.get(entry.rain_src, 0):
            entry.rain_mm, entry.rain_src = round(rain, 1), source
        for key in _FIELDS:
            value = _f(rec.get(key))
            if value is not None and (
                getattr(entry, key) is None or (source == "model" and entry.hours < MODEL_BEATS_H)
            ):
                setattr(entry, key, round(value, 2))
        after = (entry.tmin, entry.tmax, entry.tmean, entry.rain_mm, *(getattr(entry, k) for k in _FIELDS))
        if new or after != before:
            entry.source = _src(entry.source, source)
            changed = True
    return changed


def merge_sensor_history(data: GardenData, series: Mapping[str, Iterable[Mapping[str, Any]]], today: date) -> bool:
    """Fill ``sensor_log`` from recorder history: ``{entity_id: [{day, tmin, tmax, tmean, n}]}``."""
    changed = False
    for entity_id, days in series.items():
        for rec in days:
            try:
                day = date.fromisoformat(str(rec["day"])[:10])
            except (KeyError, TypeError, ValueError):
                continue
            if day >= today or day < today - timedelta(days=SENSOR_KEEP_DAYS):
                continue
            tmin, tmax, tmean = _f(rec.get("tmin")), _f(rec.get("tmax")), _f(rec.get("tmean"))
            if tmin is None and tmax is None:
                continue
            entry, new = _sensor_day(data.sensor_log, entity_id, day)
            before = (entry.tmin, entry.tmax, entry.tmean)
            if tmin is not None:
                entry.tmin = tmin if entry.tmin is None else min(entry.tmin, tmin)
            if tmax is not None:
                entry.tmax = tmax if entry.tmax is None else max(entry.tmax, tmax)
            n = int(_f(rec.get("n")) or 0)
            if tmean is not None and n >= entry.n:
                entry.tmean, entry.n = round(tmean, 2), n
            if new or before != (entry.tmin, entry.tmax, entry.tmean):
                if new:
                    entry.source = "history"
                changed = True
    if changed:
        data.sensor_log.sort(key=lambda d: (d.day, d.entity_id))
    return changed


def daily_from_samples(samples: Iterable[tuple[datetime, float]], tz: Any) -> list[dict[str, Any]]:
    """Recorder states -> per local day ``{day, tmin, tmax, tmean, n}`` (time weighted mean)."""
    points = sorted((t.astimezone(tz), v) for t, v in samples if v is not None and math.isfinite(v))
    days: dict[date, dict[str, Any]] = {}
    for i, (at, value) in enumerate(points):
        d = days.setdefault(
            at.date(), {"day": at.date().isoformat(), "tmin": value, "tmax": value, "w": 0.0, "s": 0.0, "n": 0}
        )
        d["tmin"], d["tmax"] = min(d["tmin"], value), max(d["tmax"], value)
        nxt = points[i + 1][0] if i + 1 < len(points) else at + timedelta(minutes=10)
        weight = min(max((nxt - at).total_seconds(), 1.0), 12 * 3600.0)
        d["w"] += weight
        d["s"] += value * weight
        d["n"] += 1
    out = []
    for d in days.values():
        out.append({"day": d["day"], "tmin": round(d["tmin"], 2), "tmax": round(d["tmax"], 2),
                    "tmean": round(d["s"] / d["w"], 2) if d["w"] else None, "n": d["n"]})  # fmt: skip
    return sorted(out, key=lambda r: r["day"])


def open_meteo_daily(payload: Mapping[str, Any] | None) -> list[dict[str, Any]]:
    """Open-Meteo ``daily`` block -> records for :func:`merge_history`."""
    daily = (payload or {}).get("daily") or {}
    times = daily.get("time") or []

    def col(name: str, i: int) -> float | None:
        values = daily.get(name) or []
        return _f(values[i]) if i < len(values) else None

    out = []
    for i, stamp in enumerate(times):
        sun_s = col("sunshine_duration", i)
        out.append(
            {
                "day": str(stamp)[:10],
                "tmin": col("temperature_2m_min", i),
                "tmax": col("temperature_2m_max", i),
                "tmean": col("temperature_2m_mean", i),
                "rain_mm": col("precipitation_sum", i),
                "wind_max": col("wind_speed_10m_max", i),
                "gust_max": col("wind_gusts_10m_max", i),
                "rs_mj": col("shortwave_radiation_sum", i),
                "sun_h": None if sun_s is None else round(sun_s / 3600, 2),
                "et0_mm": col("et0_fao_evapotranspiration", i),
                "rh_mean": col("relative_humidity_2m_mean", i),
                "rh_max": col("relative_humidity_2m_max", i),
                "rh_min": col("relative_humidity_2m_min", i),
            }
        )
    return out


# --------------------------------------------------------------------------- #
# Months kept for good, frost dates
# --------------------------------------------------------------------------- #
def _month_of(months: list[ClimateMonth], series: str, month: str) -> ClimateMonth:
    entry = next((m for m in months if m.series == series and m.month == month), None)
    if entry is None:
        entry = ClimateMonth(series, month)
        months.append(entry)
    return entry


def _fold_month(m: ClimateMonth, tmin: float | None, tmax: float | None, tmean: float | None,
                rain: float | None = None, sun: float | None = None, wind: float | None = None) -> None:  # fmt: skip
    if tmean is None and tmin is not None and tmax is not None:
        tmean = (tmin + tmax) / 2
    if tmean is not None:
        mean, _ = _mean(m.tmean, m.days, tmean)
        m.tmean = round(mean, 2)
    m.days += 1
    if tmin is not None:
        m.tmin = tmin if m.tmin is None else min(m.tmin, tmin)
        m.frost_days += tmin < 0
    if tmax is not None:
        m.tmax = tmax if m.tmax is None else max(m.tmax, tmax)
        m.hot_days += tmax >= HOT_C
    m.rain_mm = round(m.rain_mm + (rain or 0.0), 1)
    m.sun_h = round(m.sun_h + (sun or 0.0), 1)
    if wind is not None:
        m.wind_max = wind if m.wind_max is None else max(m.wind_max, wind)


def roll_up(data: GardenData, today: date) -> bool:
    """Move days older than the keep windows into their months.  Returns True if anything moved."""
    changed = False
    cutoff = today - timedelta(days=KEEP_DAYS)
    keep: list[ClimateDay] = []
    for d in data.climate_log:
        if d.day < cutoff:
            _fold_month(_month_of(data.climate_months, "outdoor", d.day.strftime("%Y-%m")), d.tmin, d.tmax, d.tmean,
                        d.rain_mm, d.sun_h, d.gust_max or d.wind_max)  # fmt: skip
            changed = True
        else:
            keep.append(d)
    data.climate_log[:] = keep
    cutoff = today - timedelta(days=SENSOR_KEEP_DAYS)
    kept: list[SensorDay] = []
    for s in data.sensor_log:
        if s.day < cutoff:
            _fold_month(_month_of(data.climate_months, s.entity_id, s.day.strftime("%Y-%m")), s.tmin, s.tmax, s.tmean)
            changed = True
        else:
            kept.append(s)
    data.sensor_log[:] = kept
    if changed:
        data.climate_months.sort(key=lambda m: (m.series, m.month))
    return changed


def _halves(year: int, hemisphere: Hemisphere) -> tuple[tuple[date, date], tuple[date, date]]:
    """(spring frost season, autumn frost season) of ``year``."""
    if hemisphere is Hemisphere.SOUTH:
        return (date(year, 7, 1), date(year, 12, 31)), (date(year, 1, 1), date(year, 6, 30))
    return (date(year, 1, 1), date(year, 6, 30)), (date(year, 7, 1), date(year, 12, 31))


def update_frost_years(data: GardenData, hemisphere: Hemisphere, today: date) -> bool:
    """Measured last spring frost and first autumn frost per year (outdoor minimum below 0 °C)."""
    by_day = {d.day: d.tmin for d in data.climate_log if d.tmin is not None}
    if not by_day:
        return False
    changed = False
    for year in sorted({d.year for d in by_day}):
        (s0, s1), (a0, a1) = _halves(year, hemisphere)
        entry = data.frost_years.get(str(year)) or FrostYear()
        before = (entry.last_spring, entry.first_autumn, entry.spring_complete, entry.autumn_complete)
        spring = [d for d, t in by_day.items() if s0 <= d <= s1 and t < 0]
        autumn = [d for d, t in by_day.items() if a0 <= d <= a1 and t < 0]
        logged_spring = sum(1 for d in by_day if s0 <= d <= s1)
        logged_autumn = sum(1 for d in by_day if a0 <= d <= a1)
        if spring and not entry.spring_complete:
            entry.last_spring = max(spring)
        if autumn and not entry.autumn_complete:
            entry.first_autumn = min(autumn)
        # complete: the half-year is over and at least 80 % of it was logged
        entry.spring_complete = entry.spring_complete or (today > s1 and logged_spring >= 0.8 * ((s1 - s0).days + 1))
        entry.autumn_complete = entry.autumn_complete or (today > a1 and logged_autumn >= 0.8 * ((a1 - a0).days + 1))
        if before != (entry.last_spring, entry.first_autumn, entry.spring_complete, entry.autumn_complete) or (
            str(year) not in data.frost_years and (spring or autumn)
        ):
            data.frost_years[str(year)] = entry
            changed = True
    return changed


def _doy(d: date) -> int:
    return (d - date(d.year, 1, 1)).days


def _from_doy(year: int, doy: float) -> date:
    return date(year, 1, 1) + timedelta(days=round(doy))


def local_frost(data: GardenData, today: date, preset_last: date, preset_first: date) -> dict[str, Any] | None:
    """Measured frost dates against the regional preset (``None`` without a complete year)."""
    springs = [y.last_spring for y in data.frost_years.values() if y.spring_complete and y.last_spring]
    autumns = [y.first_autumn for y in data.frost_years.values() if y.autumn_complete and y.first_autumn]
    if not springs and not autumns:
        return None
    out: dict[str, Any] = {"years_spring": len(springs), "years_autumn": len(autumns)}
    if springs:
        avg = _from_doy(today.year, sum(_doy(d) for d in springs) / len(springs))
        out["last_spring"] = avg.strftime("%m-%d")
        out["spring_diff_days"] = (avg - preset_last.replace(year=today.year)).days
    if autumns:
        avg = _from_doy(today.year, sum(_doy(d) for d in autumns) / len(autumns))
        out["first_autumn"] = avg.strftime("%m-%d")
        out["autumn_diff_days"] = (avg - preset_first.replace(year=today.year)).days
    return out


# --------------------------------------------------------------------------- #
# Used by growth, water and health
# --------------------------------------------------------------------------- #
def daily_et0(day: ClimateDay, latitude: float, elevation_m: float = 0.0) -> tuple[float | None, str | None]:
    """Reference evaporation of a past day: Penman-Monteith from what was logged, else Hargreaves."""
    if day.tmin is None or day.tmax is None:
        return day.et0_mm, ("model" if day.et0_mm is not None else None)
    if day.et0_mm is not None and day.hours < MODEL_BEATS_H and "model" in day.source:
        return day.et0_mm, "model"
    sunshine = None
    if day.rs_mj is None and day.sun_h is not None:
        sunshine = day.sun_h / max(daylight_hours(latitude, day.day), 1.0)
    pm = et0_penman_monteith(
        day.tmin, day.tmax, latitude, day.day,
        rh_min=day.rh_min, rh_max=day.rh_max, rh_mean=day.rh_mean,
        wind_kmh_10m=day.wind_mean if day.wind_mean is not None else (day.wind_max * 0.6 if day.wind_max else None),
        rs=day.rs_mj, sunshine_fraction=sunshine, elevation_m=elevation_m,
    )  # fmt: skip
    if pm is not None:
        return pm, "penman_monteith"
    return et0_hargreaves(day.tmin, day.tmax, latitude, day.day), "hargreaves"


def zone_log(data: GardenData, zone_id: str | None) -> tuple[list[ClimateDay], str]:
    """The temperature series a zone's crops grow in, and where it comes from.

    Greenhouses and cold frames use their own air sensor where it logged the day;
    other days (and enclosed zones without a sensor) take the outdoor day with the
    usual greenhouse buffering (warmer nights, warmer days).
    """
    zone = data.zone(zone_id)
    if zone is None or not zone.is_enclosed:
        return data.climate_log, "outdoor"
    sensor = zone.sensors.air_temperature
    own = {
        s.day: s
        for s in data.sensor_log
        if sensor and s.entity_id == sensor and s.tmin is not None and s.tmax is not None
    }
    out: list[ClimateDay] = []
    used_sensor = False
    for d in data.climate_log:
        s = own.get(d.day)
        if s is not None:
            out.append(ClimateDay(d.day, s.tmin, s.tmax, d.rain_mm, s.tmean))
            used_sensor = True
        elif d.tmin is not None and d.tmax is not None:
            out.append(ClimateDay(d.day, d.tmin + GREENHOUSE_NIGHT_C, d.tmax + GREENHOUSE_DAY_C, d.rain_mm))
    for day, s in own.items():  # days only the greenhouse sensor saw
        if not any(o.day == day for o in out):
            out.append(ClimateDay(day, s.tmin, s.tmax, None, s.tmean))
    out.sort(key=lambda d: d.day)
    return out, ("zone_sensor" if used_sensor else "outdoor_buffered")


def stress_days(log: Sequence[ClimateDay], start: date, end: date, max_c: float, min_c: float) -> tuple[int, int]:
    """(hot days above ``max_c``, cold days below ``min_c``) logged in [start, end]."""
    heat = cold = 0
    for d in log:
        if start <= d.day <= end:
            heat += d.tmax is not None and d.tmax > max_c
            cold += d.tmin is not None and d.tmin < min_c
    return heat, cold


def dull_days(log: Sequence[ClimateDay], start: date, end: date, latitude: float) -> int | None:
    """Days with little light (below 40 % of clear-sky radiation) in [start, end]; ``None`` = unknown."""
    counted = dull = 0
    for d in log:
        if not start <= d.day <= end:
            continue
        clear = 0.75 * extraterrestrial_radiation(latitude, d.day)
        if d.rs_mj is not None and clear > 0:
            counted += 1
            dull += d.rs_mj < 0.4 * clear
        elif d.sun_h is not None:
            counted += 1
            dull += d.sun_h < 0.15 * daylight_hours(latitude, d.day)
    return dull if counted >= max(3, ((end - start).days + 1) // 2) else None


def recent_wetness(log: Sequence[ClimateDay], today: date, days: int = 3) -> dict[str, Any]:
    """Rain and humidity of the last days (yesterday backwards): what fungi have had to work with."""
    window = [d for d in log if today - timedelta(days=days) <= d.day < today]
    by_day = {d.day: d for d in window}
    wet_days = sum(1 for d in window if (d.rain_mm or 0) >= 5 or (d.rh_mean or 0) >= 90)
    hutton = False
    for d in window:  # two humid warm days in a row (Hutton criteria, from daily data)
        nxt = by_day.get(d.day + timedelta(days=1))
        if nxt and all(x.tmin is not None and x.tmin >= 10 and (x.rh_mean or 0) >= 90 for x in (d, nxt)):
            hutton = True
    return {
        "rain_mm": round(sum(d.rain_mm or 0 for d in window), 1),
        "wet_days": wet_days,
        "hutton": hutton,
        "days": len(window),
    }


def recent_mean(log: Sequence[SensorDay], entity_id: str | None, today: date, days: int = 3) -> float | None:
    """Mean of the daily means of a sensor over the last days (today included)."""
    if not entity_id:
        return None
    values = [
        s.tmean if s.tmean is not None else (s.tmin + s.tmax) / 2
        for s in log
        if s.entity_id == entity_id and today - timedelta(days=days - 1) <= s.day <= today
        and (s.tmean is not None or (s.tmin is not None and s.tmax is not None))
    ]  # fmt: skip
    return round(sum(values) / len(values), 1) if len(values) >= min(2, days) else None


def last_night(log: Sequence[ClimateDay], today: date) -> ClimateDay | None:
    """Today's record if it has a minimum, else yesterday's."""
    for d in reversed(log):
        if d.day in (today, today - timedelta(days=1)) and d.tmin is not None:
            return d
    return None


def stormy(day: ClimateDay | None) -> bool:
    return bool(day) and ((day.gust_max or 0) >= STORM_GUST_KMH or (day.wind_max or 0) >= STORM_WIND_KMH)  # type: ignore[union-attr]


# --------------------------------------------------------------------------- #
# Statistics for the panel
# --------------------------------------------------------------------------- #
def summarize(
    days: Sequence[ClimateDay], latitude: float, elevation_m: float = 0.0, base: float = 10.0
) -> dict[str, Any]:
    """Totals and extremes of a run of days."""
    temps = [d for d in days if d.tmin is not None and d.tmax is not None]
    out: dict[str, Any] = {"days": len(days), "days_with_temp": len(temps)}
    if temps:
        low = min(temps, key=lambda d: d.tmin)  # type: ignore[arg-type,return-value]
        high = max(temps, key=lambda d: d.tmax)  # type: ignore[arg-type,return-value]
        means = [d.tmean if d.tmean is not None else (d.tmin + d.tmax) / 2 for d in temps]  # type: ignore[operator]
        out.update(
            tmean=round(sum(means) / len(means), 1),
            tmin=low.tmin, tmin_day=low.day.isoformat(), tmax=high.tmax, tmax_day=high.day.isoformat(),
            frost_nights=sum(1 for d in temps if d.tmin < 0),  # type: ignore[operator]
            hot_days=sum(1 for d in temps if d.tmax >= HOT_C),  # type: ignore[operator]
            very_hot_days=sum(1 for d in temps if d.tmax >= VERY_HOT_C),  # type: ignore[operator]
            gdd=round(sum(gdd_for_day(d.tmin, d.tmax, base) for d in temps), 1),  # type: ignore[arg-type]
        )  # fmt: skip
    rain = [d.rain_mm for d in days if d.rain_mm is not None]
    out["rain_mm"] = round(sum(rain), 1) if rain else None
    out["rain_days"] = sum(1 for r in rain if r >= 1.0)
    wettest = max((d for d in days if d.rain_mm is not None), key=lambda d: d.rain_mm, default=None)  # type: ignore[arg-type,return-value]
    if wettest is not None and wettest.rain_mm:
        out["wettest"], out["wettest_day"] = wettest.rain_mm, wettest.day.isoformat()
    sun = [d.sun_h for d in days if d.sun_h is not None]
    out["sun_h"] = round(sum(sun), 1) if sun else None
    rad = [d.rs_mj for d in days if d.rs_mj is not None]
    out["rs_mj"] = round(sum(rad), 1) if rad else None
    gusts = [(d.gust_max or d.wind_max, d.day) for d in days if (d.gust_max or d.wind_max) is not None]
    if gusts:
        top = max(gusts, key=lambda g: g[0])  # type: ignore[arg-type,return-value]
        out["gust_max"], out["gust_day"] = top[0], top[1].isoformat()
    et0 = [e for e in (daily_et0(d, latitude, elevation_m)[0] for d in days) if e is not None]
    out["et0_mm"] = round(sum(et0), 1) if et0 else None
    if out["et0_mm"] is not None and out["rain_mm"] is not None:
        out["balance_mm"] = round(out["rain_mm"] - out["et0_mm"], 1)
    rh = [d.rh_mean for d in days if d.rh_mean is not None]
    out["rh_mean"] = round(sum(rh) / len(rh)) if rh else None
    return out


def _months(data: GardenData, series: str, today: date, count: int = 24) -> list[dict[str, Any]]:
    """Monthly rows (newest first): stored months plus the months still in the daily logs."""
    rows: dict[str, ClimateMonth] = {m.month: ClimateMonth(**{f: getattr(m, f) for f in m.__slots__})  # type: ignore[attr-defined]
                                     for m in data.climate_months if m.series == series}  # fmt: skip
    if series == "outdoor":
        for d in data.climate_log:
            _fold_month(rows.setdefault(d.day.strftime("%Y-%m"), ClimateMonth(series, d.day.strftime("%Y-%m"))),
                        d.tmin, d.tmax, d.tmean, d.rain_mm, d.sun_h, d.gust_max or d.wind_max)  # fmt: skip
    else:
        for s in data.sensor_log:
            if s.entity_id == series:
                _fold_month(rows.setdefault(s.day.strftime("%Y-%m"), ClimateMonth(series, s.day.strftime("%Y-%m"))),
                            s.tmin, s.tmax, s.tmean)  # fmt: skip
    keys = sorted(rows, reverse=True)[:count]
    return [
        {"month": k, "days": rows[k].days, "tmin": _r(rows[k].tmin), "tmax": _r(rows[k].tmax), "tmean": _r(rows[k].tmean),
         "rain_mm": rows[k].rain_mm if series == "outdoor" else None, "frost_days": rows[k].frost_days,
         "hot_days": rows[k].hot_days, "sun_h": rows[k].sun_h if series == "outdoor" else None,
         "wind_max": _r(rows[k].wind_max)}
        for k in keys
    ]  # fmt: skip


def _season_start(today: date, hemisphere: Hemisphere) -> date:
    if hemisphere is Hemisphere.SOUTH:
        return date(today.year if today.month >= 7 else today.year - 1, 7, 1)
    return date(today.year, 1, 1)


def sensor_stats(data: GardenData, entity_id: str, today: date, current: float | None = None) -> dict[str, Any]:
    days = sorted((s for s in data.sensor_log if s.entity_id == entity_id), key=lambda s: s.day)
    out: dict[str, Any] = {"entity_id": entity_id, "now": _r(current), "days": len(days)}
    if not days:
        return out
    out["first_day"] = days[0].day.isoformat()
    today_row = next((s for s in days if s.day == today), None)
    if today_row:
        out["today"] = {"tmin": _r(today_row.tmin), "tmax": _r(today_row.tmax), "tmean": _r(today_row.tmean)}
    for label, span in (("d7", 7), ("d30", 30)):
        window = [s for s in days if s.day > today - timedelta(days=span)]
        lows = [s for s in window if s.tmin is not None]
        highs = [s for s in window if s.tmax is not None]
        means = [s.tmean if s.tmean is not None else (s.tmin + s.tmax) / 2 for s in window
                 if s.tmean is not None or (s.tmin is not None and s.tmax is not None)]  # fmt: skip
        out[label] = {
            "tmin": _r(min((s.tmin for s in lows), default=None)),  # type: ignore[type-var]
            "tmax": _r(max((s.tmax for s in highs), default=None)),  # type: ignore[type-var]
            "tmean": _r(sum(means) / len(means)) if means else None,  # type: ignore[arg-type]
        }
    lows = [s for s in days if s.tmin is not None]
    highs = [s for s in days if s.tmax is not None]
    months = [m for m in data.climate_months if m.series == entity_id]
    low = min(lows, key=lambda s: s.tmin, default=None)  # type: ignore[arg-type,return-value]
    high = max(highs, key=lambda s: s.tmax, default=None)  # type: ignore[arg-type,return-value]
    record_low = (low.tmin, low.day.isoformat()) if low else None
    record_high = (high.tmax, high.day.isoformat()) if high else None
    for m in months:
        if m.tmin is not None and (record_low is None or m.tmin < record_low[0]):
            record_low = (m.tmin, m.month)
        if m.tmax is not None and (record_high is None or m.tmax > record_high[0]):
            record_high = (m.tmax, m.month)
    out["record_low"] = {"t": _r(record_low[0]), "when": record_low[1]} if record_low else None
    out["record_high"] = {"t": _r(record_high[0]), "when": record_high[1]} if record_high else None
    out["series"] = [
        {"d": s.day.isoformat(), "lo": _r(s.tmin), "hi": _r(s.tmax), "m": _r(s.tmean)} for s in days[-120:]
    ]
    return out


def climate_stats(
    data: GardenData,
    today: date,
    *,
    latitude: float,
    elevation_m: float = 0.0,
    hemisphere: Hemisphere = Hemisphere.NORTH,
    preset_last: date | None = None,
    preset_first: date | None = None,
    sensors: Mapping[str, dict[str, Any]] | None = None,
    days: int = 400,
) -> dict[str, Any]:
    """Everything the climate page shows: series, periods compared with last year, records,
    monthly table, frost dates and per-sensor temperature statistics.

    ``sensors``: entity id -> ``{"label", "kind", "now"}`` for every mapped temperature sensor.
    """
    log = sorted(data.climate_log, key=lambda d: d.day)
    by_day = {d.day: d for d in log}

    def span(start: date, end: date) -> list[ClimateDay]:
        return [
            by_day[start + timedelta(days=i)]
            for i in range((end - start).days + 1)
            if start + timedelta(days=i) in by_day
        ]

    season_start = _season_start(today, hemisphere)
    year_ago = today - timedelta(days=365)
    periods = {
        "d7": summarize(span(today - timedelta(days=6), today), latitude, elevation_m, data.settings.gdd_base_c),
        "d30": summarize(span(today - timedelta(days=29), today), latitude, elevation_m, data.settings.gdd_base_c),
        "season": summarize(span(season_start, today), latitude, elevation_m, data.settings.gdd_base_c),
        "season_last_year": summarize(
            span(season_start - timedelta(days=365), year_ago), latitude, elevation_m, data.settings.gdd_base_c
        ),
        "d30_last_year": summarize(
            span(year_ago - timedelta(days=29), year_ago), latitude, elevation_m, data.settings.gdd_base_c
        ),
        "d365": summarize(span(today - timedelta(days=364), today), latitude, elevation_m, data.settings.gdd_base_c),
    }
    all_days = summarize(log, latitude, elevation_m, data.settings.gdd_base_c) if log else {}
    records: dict[str, Any] = {}
    for key, when in (("tmin", "tmin_day"), ("tmax", "tmax_day"), ("wettest", "wettest_day"), ("gust_max", "gust_day")):
        if all_days.get(key) is not None:
            records[key] = {"value": all_days[key], "when": all_days[when]}
    for m in data.climate_months:
        if m.series != "outdoor":
            continue
        if m.tmin is not None and ("tmin" not in records or m.tmin < records["tmin"]["value"]):
            records["tmin"] = {"value": m.tmin, "when": m.month}
        if m.tmax is not None and ("tmax" not in records or m.tmax > records["tmax"]["value"]):
            records["tmax"] = {"value": m.tmax, "when": m.month}
    sources: dict[str, int] = {}
    for d in log:
        for part in (d.source or "sensor").split("+"):
            sources[part] = sources.get(part, 0) + 1
    frost = {
        "years": {y: {"last_spring": f.last_spring.isoformat() if f.last_spring else None,
                      "first_autumn": f.first_autumn.isoformat() if f.first_autumn else None,
                      "spring_complete": f.spring_complete, "autumn_complete": f.autumn_complete}
                  for y, f in sorted(data.frost_years.items())},
        "local": local_frost(data, today, preset_last, preset_first) if preset_last and preset_first else None,
        "preset_last": preset_last.strftime("%m-%d") if preset_last else None,
        "preset_first": preset_first.strftime("%m-%d") if preset_first else None,
    }  # fmt: skip
    series = [
        {"d": d.day.isoformat(), "lo": _r(d.tmin), "hi": _r(d.tmax), "m": _r(d.tmean), "r": d.rain_mm,
         "s": _r(d.sun_h), "w": _r(d.gust_max or d.wind_max), "rh": _r(d.rh_mean, 0),
         "et0": daily_et0(d, latitude, elevation_m)[0], "src": d.source or "sensor"}
        for d in log if d.day > today - timedelta(days=days)
    ]  # fmt: skip
    sensor_rows = []
    for entity_id, meta in (sensors or {}).items():
        row = sensor_stats(data, entity_id, today, meta.get("now"))
        row.update(label=meta.get("label", entity_id), kind=meta.get("kind", "air"))
        row["months"] = _months(data, entity_id, today, 13)
        sensor_rows.append(row)
    return {
        "today": today.isoformat(),
        "season_start": season_start.isoformat(),
        "periods": periods,
        "records": records,
        "series": series,
        "months": _months(data, "outdoor", today),
        "frost": frost,
        "sensors": sensor_rows,
        "coverage": {
            "days": len(log),
            "first_day": log[0].day.isoformat() if log else None,
            "sources": sources,
            "months_kept": sum(1 for m in data.climate_months if m.series == "outdoor"),
        },
    }


def temperature_sensors(data: GardenData) -> dict[str, dict[str, str]]:
    """Every mapped temperature sensor: entity id -> ``{"label", "kind", "ref"}``.

    ``kind``: outdoor | zone_air | bed_air | soil; ``label`` names where it measures.
    """
    out: dict[str, dict[str, str]] = {}
    outdoor = data.settings.outdoor_sensors
    if outdoor.air_temperature:
        out[outdoor.air_temperature] = {"label": "outdoor", "kind": "outdoor", "ref": ""}
    if outdoor.soil_temperature and outdoor.soil_temperature not in out:
        out[outdoor.soil_temperature] = {"label": "outdoor", "kind": "soil", "ref": ""}
    for zone in data.zones:
        if zone.sensors.air_temperature and zone.sensors.air_temperature not in out:
            out[zone.sensors.air_temperature] = {"label": zone.name, "kind": "zone_air", "ref": zone.id}
        if zone.sensors.soil_temperature and zone.sensors.soil_temperature not in out:
            out[zone.sensors.soil_temperature] = {"label": zone.name, "kind": "soil", "ref": zone.id}
    for bed in data.beds:
        if bed.sensors.soil_temperature and bed.sensors.soil_temperature not in out:
            out[bed.sensors.soil_temperature] = {"label": bed.name, "kind": "soil", "ref": bed.id}
        if bed.sensors.air_temperature and bed.sensors.air_temperature not in out:
            out[bed.sensors.air_temperature] = {"label": bed.name, "kind": "bed_air", "ref": bed.id}
    return out


def history_days_needed(data: GardenData, today: date, days: int = 30) -> list[date]:
    """Past days (newest first) the outdoor log has not covered well: worth filling in."""
    have = {d.day: d for d in data.climate_log}
    out = []
    for i in range(1, days + 1):
        day = today - timedelta(days=i)
        entry = have.get(day)
        if entry is None or (entry.hours < FULL_DAY_H and "history" not in entry.source) or entry.tmin is None:
            out.append(day)
    return out


def period(data: GardenData, end: date, days: int) -> list[ClimateDay]:
    """The logged outdoor days of the ``days`` days up to ``end``."""
    start = end - timedelta(days=days - 1)
    return [d for d in data.climate_log if start <= d.day <= end]


def season_so_far(data: GardenData, today: date, hemisphere: Hemisphere) -> list[ClimateDay]:
    start = _season_start(today, hemisphere)
    return [d for d in data.climate_log if start <= d.day <= today]


def outdoor_records(data: GardenData, series: Mapping[str, Iterable[Mapping[str, Any]]]) -> list[dict[str, Any]]:
    """Daily rows of the outdoor sensors (temperature, humidity, wind, gusts) -> records for :func:`merge_history`."""
    outdoor = data.settings.outdoor_sensors
    records: dict[str, dict[str, Any]] = {}
    for entity, fields in (
        (outdoor.air_temperature, {"tmin": "tmin", "tmax": "tmax", "tmean": "tmean"}),
        (outdoor.air_humidity, {"rh_min": "tmin", "rh_max": "tmax", "rh_mean": "tmean"}),
        (outdoor.wind_speed, {"wind_max": "tmax", "wind_mean": "tmean"}),
        (outdoor.wind_gust, {"gust_max": "tmax"}),
    ):
        for row in series.get(entity, []) if entity else []:
            rec = records.setdefault(str(row["day"]), {"day": row["day"]})
            rec.update({k: row.get(v) for k, v in fields.items()})
    return list(records.values())


def history_entities(data: GardenData) -> tuple[list[str], list[str]]:
    """(temperature sensors, other outdoor sensors) worth asking the recorder about."""
    outdoor = data.settings.outdoor_sensors
    temps = list(temperature_sensors(data))
    extra = [e for e in (outdoor.air_humidity, outdoor.wind_speed, outdoor.wind_gust) if e and e not in temps]
    return temps, extra
