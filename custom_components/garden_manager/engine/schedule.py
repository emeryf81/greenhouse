"""Sow / plant / harvest windows and timing advice.

The scheduler turns the *relative* windows of the plant database (weeks
around the frost dates) into absolute dates for a season and a zone, then
refines them with live data:

1. **Region profile**  -> frost anchors (hemisphere & leap-year safe).
2. **Zone**            -> greenhouse / cold frame season extension.
3. **Soil sensor**     -> "wait, soil too cold/hot" for sowing.
4. **Frost forecast**  -> "wait" for transplanting frost-tender crops.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, timedelta
from typing import Any, Literal

from .models import (
    FrostTolerance,
    Plant,
    Planting,
    SowMethod,
    Suitability,
    Window,
    Zone,
    ZoneType,
)
from .region import SeasonAnchors
from .weather import FrostAssessment


@dataclass(frozen=True, slots=True)
class DateWindow:
    start: date
    end: date

    def contains(self, day: date) -> bool:
        return self.start <= day <= self.end

    def to_dict(self) -> dict[str, str]:
        return {"start": self.start.isoformat(), "end": self.end.isoformat()}


@dataclass(slots=True)
class PlantWindows:
    indoor_sow: list[DateWindow] = field(default_factory=list)
    direct_sow: list[DateWindow] = field(default_factory=list)
    transplant: list[DateWindow] = field(default_factory=list)
    extension_weeks: int = 0
    greenhouse_ok: bool = True

    def to_dict(self) -> dict[str, Any]:
        return {
            "indoor_sow": [w.to_dict() for w in self.indoor_sow],
            "direct_sow": [w.to_dict() for w in self.direct_sow],
            "transplant": [w.to_dict() for w in self.transplant],
            "extension_weeks": self.extension_weeks,
            "greenhouse_ok": self.greenhouse_ok,
        }


@dataclass(slots=True)
class PlantingTimeline:
    method: SowMethod
    sow_window: DateWindow | None
    sow_date: date | None
    transplant_window: DateWindow | None
    transplant_date: date | None
    harden_off_date: date | None
    in_ground: date
    harvest_start: date
    harvest_end: date
    late: bool = False

    @property
    def occupancy(self) -> DateWindow:
        """When the planting physically occupies its bed space."""
        return DateWindow(self.in_ground, self.harvest_end)

    def to_dict(self) -> dict[str, Any]:
        def iso(d: date | None) -> str | None:
            return d.isoformat() if d else None

        return {
            "method": self.method.value,
            "sow_window": self.sow_window.to_dict() if self.sow_window else None,
            "sow_date": iso(self.sow_date),
            "transplant_window": self.transplant_window.to_dict() if self.transplant_window else None,
            "transplant_date": iso(self.transplant_date),
            "harden_off_date": iso(self.harden_off_date),
            "in_ground": iso(self.in_ground),
            "harvest_start": iso(self.harvest_start),
            "harvest_end": iso(self.harvest_end),
            "late": self.late,
        }


# --------------------------------------------------------------------------- #
def extension_weeks(plant: Plant, zone: Zone | None) -> int:
    if zone is None or not zone.is_enclosed:
        return 0
    if plant.greenhouse.suitability is Suitability.NO:
        return 0
    weeks = plant.greenhouse.season_extension_weeks
    if zone.type is ZoneType.COLD_FRAME:
        weeks = weeks // 2
    if zone.microclimate.heated:
        weeks += 2
    return weeks


def _windows(windows: list[Window], anchors: SeasonAnchors, ext: int) -> list[DateWindow]:
    out = []
    for w in windows:
        start, end = anchors.window_dates(w)
        if ext:
            if w.anchor == "last_frost":  # spring: start earlier
                start -= timedelta(weeks=ext)
            else:  # autumn: may continue later under glass
                end += timedelta(weeks=ext)
        out.append(DateWindow(start, end))
    return sorted(out, key=lambda d: d.start)


def plant_windows(plant: Plant, anchors: SeasonAnchors, zone: Zone | None = None) -> PlantWindows:
    ext = extension_weeks(plant, zone)
    greenhouse_ok = not (zone is not None and zone.is_enclosed and plant.greenhouse.suitability is Suitability.NO)
    return PlantWindows(
        # Indoor sowing happens indoors - the bed's zone does not change it,
        # except that a greenhouse lets the transplant (and so sowing) move earlier.
        indoor_sow=_windows(plant.sowing.indoor_sow, anchors, ext),
        direct_sow=_windows(plant.sowing.direct_sow, anchors, ext),
        transplant=_windows(plant.sowing.transplant, anchors, ext),
        extension_weeks=ext,
        greenhouse_ok=greenhouse_ok,
    )


def default_method(plant: Plant) -> SowMethod:
    s = plant.sowing
    if s.direct_sow and (not s.indoor_sow or "root" in plant.tags or plant.habit.value == "root"):
        return SowMethod.DIRECT_SOW
    if s.indoor_sow and s.transplant:
        return SowMethod.INDOOR_SOW
    if s.transplant:
        return SowMethod.TRANSPLANT
    return SowMethod.DIRECT_SOW


def resolve_method(plant: Plant, requested: SowMethod) -> SowMethod:
    s = plant.sowing
    if requested is SowMethod.INDOOR_SOW and s.indoor_sow and s.transplant:
        return requested
    if requested is SowMethod.DIRECT_SOW and s.direct_sow:
        return requested
    if requested is SowMethod.TRANSPLANT and s.transplant:
        return requested
    return default_method(plant)


def _pick(windows: list[DateWindow], ref: date | None) -> DateWindow | None:
    """First window not yet over at ``ref``; otherwise the first one."""
    if not windows:
        return None
    if ref is not None:
        for w in windows:
            if w.end >= ref:
                return w
    return windows[0]


def _pick_containing(windows: list[DateWindow], day: date) -> DateWindow | None:
    for w in windows:
        if w.contains(day):
            return w
    future = [w for w in windows if w.start >= day]
    return future[0] if future else (windows[-1] if windows else None)


def planting_timeline(
    planting: Planting,
    plant: Plant,
    anchors: SeasonAnchors,
    zone: Zone | None = None,
    today: date | None = None,
) -> PlantingTimeline:
    """Absolute dates for a planting.

    Priority for every date: what actually happened > user override >
    computed from the window (clamped to ``today`` when the window is open and
    nothing has been done yet, so overdue plans move forward sensibly).
    """
    windows = plant_windows(plant, anchors, zone)
    method = resolve_method(plant, planting.method)
    # Only "live" seasons move planned dates forward; past/future seasons are
    # shown exactly as planned.
    in_season = today is not None and anchors.last_frost - timedelta(
        days=200
    ) <= today <= anchors.first_frost + timedelta(days=60)
    ref = today if in_season else None
    late = False

    sow_window: DateWindow | None = None
    sow_date: date | None = None
    transplant_window: DateWindow | None = None
    transplant_date: date | None = None

    if method is SowMethod.TRANSPLANT:
        transplant_window = (
            _pick_containing(windows.transplant, planting.transplant_date)
            if planting.transplant_date
            else _pick(windows.transplant, ref)
        )
        transplant_date = planting.transplanted_on or planting.transplant_date
        if transplant_date is None and transplant_window:
            transplant_date = transplant_window.start
            if ref and ref > transplant_date:
                transplant_date = ref
    else:
        options = windows.indoor_sow if method is SowMethod.INDOOR_SOW else windows.direct_sow
        sow_window = _pick_containing(options, planting.sow_date) if planting.sow_date else _pick(options, ref)
        sow_date = planting.sown_on or planting.sow_date
        if sow_date is None and sow_window:
            sow_date = sow_window.start
            if ref and ref > sow_date:
                sow_date = ref
        if sow_window and sow_date and sow_date > sow_window.end:
            late = True
        if method is SowMethod.INDOOR_SOW and sow_date:
            earliest = sow_date + timedelta(days=plant.transplant_age_days[0])
            transplant_window = _pick(windows.transplant, earliest) or DateWindow(
                earliest, earliest + timedelta(days=14)
            )
            transplant_date = planting.transplanted_on or planting.transplant_date
            if transplant_date is None:
                transplant_date = max(earliest, transplant_window.start)

    if transplant_window and transplant_date and transplant_date > transplant_window.end:
        late = True

    in_ground = transplant_date or sow_date or anchors.last_frost
    if plant.maturity_from == "transplant":
        if transplant_date is not None:
            base = transplant_date
        else:  # direct sown crop whose maturity is quoted from transplanting
            base = in_ground + timedelta(days=plant.germination_days[1] + 14)
    else:
        base = sow_date or in_ground

    harvest_start = planting.harvest_started_on or base + timedelta(days=plant.days_to_maturity[0])
    natural_end = max(
        base + timedelta(days=plant.days_to_maturity[1]),
        harvest_start + timedelta(days=plant.harvest_duration_days),
    )
    harvest_end = natural_end
    # Tender crops outdoors die with the first frost.
    if plant.frost_tolerance is FrostTolerance.TENDER and not anchors.frost_free and not plant.perennial:
        frost_limit = anchors.first_frost + timedelta(weeks=windows.extension_weeks)
        if harvest_start < frost_limit < harvest_end:
            harvest_end = frost_limit
    if planting.finished_on:
        harvest_end = planting.finished_on

    harden = None
    if method is SowMethod.INDOOR_SOW and transplant_date and not zone_is_enclosed(zone):
        harden = transplant_date - timedelta(days=10)

    return PlantingTimeline(
        method=method,
        sow_window=sow_window,
        sow_date=sow_date,
        transplant_window=transplant_window,
        transplant_date=transplant_date,
        harden_off_date=harden,
        in_ground=in_ground,
        harvest_start=harvest_start,
        harvest_end=harvest_end,
        late=late,
    )


def zone_is_enclosed(zone: Zone | None) -> bool:
    return bool(zone and zone.is_enclosed)


# --------------------------------------------------------------------------- #
# Live advice
# --------------------------------------------------------------------------- #
AdviceStatus = Literal["not_yet", "go", "wait", "late", "done"]


@dataclass(slots=True)
class TimingAdvice:
    action: Literal["sow", "transplant", "harvest", "none"]
    status: AdviceStatus
    reasons: list[tuple[str, dict[str, Any]]] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "action": self.action,
            "status": self.status,
            "reasons": [{"key": k, "params": p} for k, p in self.reasons],
        }


def timing_advice(
    plant: Plant,
    planting: Planting,
    timeline: PlantingTimeline,
    today: date,
    *,
    soil_temp: float | None,
    frost: FrostAssessment | None,
    lang_name: str,
) -> TimingAdvice:
    """What should happen next for this planting and is *now* a good time?"""
    if planting.status.value in ("finished", "failed"):
        return TimingAdvice("none", "done")

    sown = planting.sown_on is not None or planting.status.value in (
        "sown",
        "sown_indoors",
        "transplanted",
        "harvesting",
    )
    planted = planting.transplanted_on is not None or planting.status.value in (
        "transplanted",
        "harvesting",
    )
    needs_sow = timeline.method is not SowMethod.TRANSPLANT and not sown
    needs_transplant = timeline.method is not SowMethod.DIRECT_SOW and not planted

    if needs_sow:
        action: Literal["sow", "transplant", "harvest", "none"] = "sow"
        window = timeline.sow_window
    elif needs_transplant:
        action, window = "transplant", timeline.transplant_window
    else:
        action = "harvest"
        window = DateWindow(timeline.harvest_start, timeline.harvest_end)

    if window is None:
        return TimingAdvice(action, "go")
    if today < window.start:
        return TimingAdvice(action, "not_yet", [("reason.window_not_yet", {"date": window.start.isoformat()})])

    advice = TimingAdvice(action, "go", [("reason.window_open", {})])
    if today > window.end:
        advice.status = "late"
        advice.reasons = [("reason.window_closed", {"date": window.end.isoformat()})]

    outdoor_sow = action == "sow" and timeline.method is SowMethod.DIRECT_SOW
    if outdoor_sow and soil_temp is not None:
        if soil_temp < plant.min_soil_temp_c:
            advice.status = "wait"
            advice.reasons.append(
                (
                    "reason.soil_too_cold",
                    {"soil": round(soil_temp, 1), "min": plant.min_soil_temp_c, "plant": lang_name},
                )
            )
        elif plant.max_soil_temp_c is not None and soil_temp > plant.max_soil_temp_c:
            advice.status = "wait"
            advice.reasons.append(
                ("reason.soil_too_hot", {"soil": round(soil_temp, 1), "max": plant.max_soil_temp_c, "plant": lang_name})
            )

    goes_outside = action == "transplant" or outdoor_sow
    if (
        goes_outside
        and frost is not None
        and frost.plant_level_min_c is not None
        and frost.plant_level_min_c < plant.min_temp_c
        and frost.min_at is not None
    ):
        advice.status = "wait"
        advice.reasons.append(
            (
                "reason.frost_forecast",
                {
                    "temp": frost.plant_level_min_c,
                    "date": frost.min_at.date().isoformat(),
                    "plant": lang_name,
                },
            )
        )
    return advice
