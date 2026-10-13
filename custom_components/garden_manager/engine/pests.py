"""Pest calendar: when the common garden pests fly, and what to do in time.

Insect pests follow the warmth of the season, so most windows are expressed
as growing degree-days (GDD) counted from 1 January (1 July in the southern
hemisphere) over a pest-specific base temperature.  The thresholds are the
rounded values used by extension services in north-west Europe; they move
with the season instead of sitting on a fixed date.  When the climate log is
too thin to count on (a new installation), the calendar months are used
instead.  Slugs follow the weather: a mild night after rain.

Only pests that a crop in the garden actually suffers from (the plant
database lists them per crop) and only crops that are, or soon will be, in
the ground are reported.
"""

from __future__ import annotations

from collections.abc import Mapping, Sequence
from dataclasses import dataclass, field
from datetime import date, timedelta
from typing import Any

from .i18n import pest_advice, pest_label
from .models import ClimateDay, GardenData, Planting, PlantingStatus
from .plantdb import PlantDatabase
from .schedule import PlantingTimeline
from .weather import DailyOutlook, accumulate_gdd

SOON_DAYS = 10  # "upcoming" when a window opens within this many days
LOOKAHEAD_DAYS = 21  # crops planted out within this many days count as well
MIN_LOG_SHARE = 0.6  # share of days since the season start the climate log must cover


@dataclass(frozen=True, slots=True)
class PestModel:
    """One pest: its flight windows and the advice."""

    pest: str
    action: str  # net | check | collect | trap
    base_c: float = 6.0
    windows_gdd: tuple[tuple[float, float], ...] = ()  # (start, end) per generation
    months: tuple[tuple[int, int], ...] = ()  # calendar fallback (north), inclusive
    enclosed_only: bool = False


PEST_MODELS: dict[str, PestModel] = {
    m.pest: m
    for m in (
        PestModel("cabbage_root_fly", "net", 6.0, ((150, 450), (900, 1200)), ((4, 5), (7, 8))),
        PestModel("carrot_fly", "net", 6.0, ((330, 650), (1300, 1700)), ((5, 6), (8, 9))),
        PestModel("onion_fly", "net", 6.0, ((250, 550), (1100, 1400)), ((5, 5), (7, 8))),
        PestModel("leek_moth", "net", 6.0, (), ((4, 5), (7, 9))),
        PestModel("cabbage_white", "net", 6.0, ((450, 2200),), ((5, 9),)),
        PestModel("pea_moth", "net", 6.0, ((700, 1100),), ((6, 7),)),
        PestModel("flea_beetle", "check", 10.0, ((60, 450),), ((4, 6),)),
        PestModel("aphids", "check", 4.0, ((180, 1200),), ((4, 7),)),
        PestModel("black_bean_aphid", "check", 4.0, ((250, 1000),), ((5, 7),)),
        PestModel("colorado_beetle", "collect", 10.0, ((150, 900),), ((5, 8),)),
        PestModel("asparagus_beetle", "collect", 10.0, ((100, 900),), ((5, 8),)),
        PestModel("whitefly", "check", 10.0, (), ((5, 9),), enclosed_only=True),
        PestModel("red_spider_mite", "check", 10.0, (), ((6, 8),), enclosed_only=True),
        PestModel("slugs", "trap"),  # weather driven, see _slug_weather
    )
}


@dataclass(slots=True)
class PestWarning:
    pest: str
    status: str  # active | soon
    action: str
    source: str  # gdd | calendar | weather
    start: date | None = None
    end: date | None = None
    generation: int = 1
    gdd: float | None = None
    plantings: list[str] = field(default_factory=list)
    beds: list[str] = field(default_factory=list)
    plants: list[str] = field(default_factory=list)
    label: str = ""  # in the garden's language
    advice: str = ""

    def to_dict(self) -> dict[str, Any]:
        return {
            "pest": self.pest,
            "status": self.status,
            "action": self.action,
            "source": self.source,
            "start": self.start.isoformat() if self.start else None,
            "end": self.end.isoformat() if self.end else None,
            "generation": self.generation,
            "gdd": self.gdd,
            "plantings": self.plantings,
            "beds": self.beds,
            "plants": self.plants,
            "label": self.label,
            "advice": self.advice,
        }


def season_start(today: date, south: bool) -> date:
    if not south:
        return date(today.year, 1, 1)
    return date(today.year if today.month >= 7 else today.year - 1, 7, 1)


def _gdd_rate(log: Sequence[ClimateDay], today: date, base: float) -> float:
    """Average GDD per day over the last week (to estimate when a window opens)."""
    total, days = accumulate_gdd(log, today - timedelta(days=7), today - timedelta(days=1), base)
    return total / days if days else 0.0


def _window_gdd(
    model: PestModel, log: Sequence[ClimateDay], today: date, start: date
) -> tuple[int, str, date | None, date | None, float] | None:
    """(generation, status, start, end, gdd) from the degree-day windows, or None if not counted."""
    elapsed = (today - start).days + 1
    gdd, counted = accumulate_gdd(log, start, today, model.base_c)
    if not model.windows_gdd or elapsed <= 0 or counted < MIN_LOG_SHARE * elapsed:
        return None
    rate = _gdd_rate(log, today, model.base_c)
    for gen, (lo, hi) in enumerate(model.windows_gdd, start=1):
        if lo <= gdd <= hi:
            end = today + timedelta(days=round((hi - gdd) / rate)) if rate > 0.5 else None
            return gen, "active", None, end, gdd
        if gdd < lo:
            if rate > 0.5:
                days = (lo - gdd) / rate
                if days <= SOON_DAYS:
                    return gen, "soon", today + timedelta(days=round(days)), None, gdd
            return None
    return None


def _window_months(model: PestModel, today: date, south: bool) -> tuple[int, str, date | None, date | None] | None:
    month = (today.month + 6 - 1) % 12 + 1 if south else today.month  # southern month -> northern equivalent
    for gen, (lo, hi) in enumerate(model.months, start=1):
        if lo <= month <= hi:
            return gen, "active", None, None
        nxt = today + timedelta(days=SOON_DAYS)
        nxt_month = (nxt.month + 6 - 1) % 12 + 1 if south else nxt.month
        if month < lo <= nxt_month or (month == 12 and lo == 1 and nxt_month == 1):
            start = nxt.replace(day=1)
            return gen, "soon", start, None
    return None


def _slug_weather(log: Sequence[ClimateDay], outlook: Sequence[DailyOutlook], today: date) -> bool:
    """A mild, damp spell: rain over the last two days (or today) and nights above 5 °C."""
    if not 3 <= today.month <= 10:
        return False
    recent = [d for d in log if today - timedelta(days=2) <= d.day <= today]
    rain = sum(d.rain_mm or 0.0 for d in recent) + (outlook[0].rain_mm if outlook else 0.0)
    nights = [d.tmin for d in recent if d.tmin is not None] + (
        [outlook[0].tmin] if outlook and outlook[0].tmin is not None else []
    )
    return rain >= 3.0 and bool(nights) and min(nights) >= 5.0


def pest_warnings(
    data: GardenData,
    db: PlantDatabase,
    timelines: Mapping[str, PlantingTimeline],
    today: date,
    outlook: Sequence[DailyOutlook],
    *,
    south: bool = False,
    lang: str = "en",
) -> list[PestWarning]:
    """Pests flying now or soon, for the crops that are (or will shortly be) in the ground."""
    horizon = today + timedelta(days=LOOKAHEAD_DAYS)
    hosts: dict[str, list[tuple[Planting, str]]] = {}
    enclosed_beds = {b.id for b in data.beds if (z := data.zone(b.zone_id)) is not None and z.is_enclosed}
    for p in data.plantings:
        if p.status in (PlantingStatus.FINISHED, PlantingStatus.FAILED):
            continue
        tl = timelines.get(p.id)
        plant = db.get(p.plant_id)
        in_ground = p.status in (PlantingStatus.SOWN, PlantingStatus.TRANSPLANTED, PlantingStatus.HARVESTING)
        if plant is None or tl is None or not (in_ground or tl.in_ground <= horizon) or tl.harvest_end < today:
            continue
        for pest in plant.pests:
            if pest in PEST_MODELS:
                hosts.setdefault(pest, []).append((p, plant.name(lang)))

    start = season_start(today, south)
    out: list[PestWarning] = []
    for pest, items in sorted(hosts.items()):
        model = PEST_MODELS[pest]
        if model.enclosed_only:
            items = [(p, n) for p, n in items if p.bed_id in enclosed_beds]
            if not items:
                continue
        warning: PestWarning | None = None
        if pest == "slugs":
            if _slug_weather(data.climate_log, outlook, today):
                warning = PestWarning(
                    pest, "active", model.action, "weather", start=today, end=today + timedelta(days=2)
                )
        elif (hit := _window_gdd(model, data.climate_log, today, start)) is not None:
            gen, status, begin, end, gdd = hit
            warning = PestWarning(pest, status, model.action, "gdd", begin, end, gen, gdd)
        elif (cal := _window_months(model, today, south)) is not None and (
            not model.windows_gdd
            or accumulate_gdd(data.climate_log, start, today, model.base_c)[1]
            < MIN_LOG_SHARE * ((today - start).days + 1)
        ):
            gen, status, begin, end = cal
            warning = PestWarning(pest, status, model.action, "calendar", begin, end, gen)
        if warning is None:
            continue
        warning.plantings = [p.id for p, _ in items]
        warning.beds = sorted({p.bed_id for p, _ in items if p.bed_id})
        warning.plants = sorted({n for _, n in items})
        warning.label = pest_label(pest, lang)
        warning.advice = pest_advice(pest, model.action, lang)
        out.append(warning)
    out.sort(key=lambda w: (w.status != "active", w.pest))
    return out
