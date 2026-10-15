"""Weather-driven garden work for the coming days.

The frost, disease and greenhouse-climate tasks live in ``tasks.live_specs``;
this module adds the episodes a gardener prepares for:

* **heat** (max >= 28 °C, "very hot" >= 32 °C): water early and deep, mulch,
  shade tender crops, damp down and open up the greenhouse, harvest in the
  morning, postpone sowing and planting out;
* **dry spell** (several warm days without rain): one deep soak instead of
  daily sips, check the water butts;
* **storm** (wind >= 50 km/h): stake and tie, weigh down fleece and nets,
  close the greenhouse;
* **heavy rain** (>= 15 mm in a day): slug patrol afterwards, keep off wet
  soil, empty saucers.

The logged weather of the last days adds the after-care the forecast cannot see:
a storm that blew through (look the garden over), heavy rain that fell (the same
slug patrol, keyed on the same day so it appears once) and a dry spell measured
over the last week.

Every task carries ecological, home-and-kitchen remedies in its description
(old net curtains as shade cloth, a beer trap, coffee grounds ...).  Keys use
the first day of the episode so a task is created once per episode and
disappears when the forecast changes.
"""

from __future__ import annotations

from datetime import date, timedelta
from typing import TYPE_CHECKING, Any

from .climate import stormy
from .i18n import t
from .models import TaskPriority, TaskSource, TaskType
from .tasks import ACTIVE_STATUSES, is_active

if TYPE_CHECKING:
    from .tasks import TaskContext, TaskSpec
    from .weather import DailyOutlook

HOT_C = 28.0
VERY_HOT_C = 32.0
WARM_C = 24.0
STORM_KMH = 50.0
HEAVY_RAIN_MM = 15.0
LOOKAHEAD_DAYS = 3
# Crops that bolt or scorch first: shade them on hot days.
HEAT_SENSITIVE_TAGS = {"leafy", "brassica"}
HEAT_SENSITIVE_FAMILIES = {"Amaranthaceae", "Brassicaceae", "Asteraceae"}
TALL_HABITS = {"climbing", "vine", "upright"}


def weather_specs(ctx: TaskContext) -> list[TaskSpec]:
    from .tasks import TaskSpec

    specs_logged = logged_weather_specs(ctx)
    if not ctx.outlook:
        return specs_logged
    today, lang, data = ctx.today, ctx.lang, ctx.data
    days = [d for d in ctx.outlook if today <= d.day <= today + timedelta(days=LOOKAHEAD_DAYS)]
    if not days:
        return specs_logged
    specs: list[TaskSpec] = []
    active = [
        (p, plant)
        for p in data.plantings
        if p.status in ACTIVE_STATUSES
        and (plant := ctx.db.get(p.plant_id)) is not None
        and is_active(p, ctx.timelines.get(p.id), today)
    ]

    def names(pred) -> str:
        found = sorted({plant.name(lang) for _p, plant in active if pred(plant)})
        return ", ".join(found[:6]) + (" …" if len(found) > 6 else "")

    # -- heat --------------------------------------------------------------- #
    hot = [d for d in days if d.tmax is not None and d.tmax >= HOT_C]
    if hot:
        first = hot[0]
        peak = max(d.tmax or 0 for d in hot)
        very = peak >= VERY_HOT_C
        sensitive = names(lambda pl: pl.family in HEAT_SENSITIVE_FAMILIES or HEAT_SENSITIVE_TAGS & set(pl.tags))
        desc = t("weather.heat.desc", lang, temp=round(peak), days=len(hot))
        if sensitive:
            desc += " " + t("weather.heat.shade", lang, plants=sensitive)
        if very:
            desc += " " + t("weather.heat.very", lang)
        specs.append(
            TaskSpec(
                key=_episode_key(data, "w:heat:", first.day),
                type=TaskType.SHADE,
                due=max(today, first.day - timedelta(days=1)),
                title_key="weather.heat",
                title_params={"temp": round(peak), "day": first.day.strftime("%d/%m")},
                description=desc,
                window_start=today,
                window_end=hot[-1].day,
                priority=TaskPriority.URGENT if very else TaskPriority.HIGH,
                minutes=30,
                source=TaskSource.WEATHER,
            )
        )
        for zone in data.zones:
            if not zone.is_enclosed:
                continue
            specs.append(
                TaskSpec(
                    key=_episode_key(data, f"w:heat_gh:{zone.id}:", first.day),
                    type=TaskType.VENTILATE,
                    due=max(today, first.day - timedelta(days=1)),
                    title_key="weather.heat_gh",
                    title_params={"zone": zone.name, "temp": round(peak)},
                    description=t("weather.heat_gh.desc", lang, zone=zone.name),
                    window_start=today,
                    window_end=hot[-1].day,
                    priority=TaskPriority.URGENT if very else TaskPriority.HIGH,
                    minutes=15,
                    source=TaskSource.WEATHER,
                    zone_id=zone.id,
                )
            )

    # -- dry spell ----------------------------------------------------------- #
    dry = [d for d in days if (d.rain_mm or 0) < 1.0 and d.tmax is not None and d.tmax >= WARM_C]
    if len(dry) >= 3 and not hot:
        specs.append(
            TaskSpec(
                key=_episode_key(data, "w:dry:", dry[0].day),
                type=TaskType.WATER,
                due=today,
                title_key="weather.dry",
                title_params={"days": len(dry)},
                description=t("weather.dry.desc", lang),
                window_start=today,
                window_end=dry[-1].day,
                priority=TaskPriority.NORMAL,
                minutes=20,
                source=TaskSource.WEATHER,
            )
        )

    # -- storm --------------------------------------------------------------- #
    windy = [d for d in days if d.wind_kmh is not None and d.wind_kmh >= STORM_KMH]
    if windy:
        tall = names(lambda pl: pl.habit.value in TALL_HABITS or pl.height_cm >= 120)
        desc = t("weather.storm.desc", lang, wind=round(max(d.wind_kmh or 0 for d in windy)))
        if tall:
            desc += " " + t("weather.storm.tall", lang, plants=tall)
        specs.append(
            TaskSpec(
                key=f"w:storm:{windy[0].day.isoformat()}",
                type=TaskType.PROTECT,
                due=max(today, windy[0].day - timedelta(days=1)),
                title_key="weather.storm",
                title_params={"day": windy[0].day.strftime("%d/%m")},
                description=desc,
                window_start=today,
                window_end=windy[0].day,
                priority=TaskPriority.HIGH,
                minutes=25,
                source=TaskSource.WEATHER,
            )
        )

    # -- heavy rain ---------------------------------------------------------- #
    wet = [d for d in days if (d.rain_mm or 0) >= HEAVY_RAIN_MM]
    if wet:
        specs.append(
            TaskSpec(
                key=f"w:rain:{wet[0].day.isoformat()}",
                type=TaskType.PEST_CHECK,
                due=wet[0].day + timedelta(days=1),
                title_key="weather.rain",
                title_params={"mm": round(wet[0].rain_mm), "day": wet[0].day.strftime("%d/%m")},
                description=t("weather.rain.desc", lang),
                window_start=wet[0].day,
                window_end=wet[0].day + timedelta(days=3),
                priority=TaskPriority.NORMAL,
                minutes=20,
                source=TaskSource.WEATHER,
            )
        )
    keys = {s.key for s in specs}
    specs.extend(
        s
        for s in specs_logged
        if s.key not in keys and not (s.key.startswith("w:dry_logged") and any(k.startswith("w:dry:") for k in keys))
    )
    return specs


def _episode_key(data: Any, prefix: str, first_day: date) -> str:
    """One task per episode: a heatwave or dry spell that goes on keeps the key of the task
    it already has (open or done), instead of a new task every day as its first day moves."""
    for task in data.tasks:
        key = task.key or ""
        if key.startswith(prefix) and task.window_end is not None and task.window_end >= first_day - timedelta(days=1):
            return key
    return f"{prefix}{first_day.isoformat()}"


AFTER_DAYS = 3  # after-care stays on the list this many days after the event


DRY_WEEK_MM = 3.0
DRY_WEEK_WARM_DAYS = 4


def logged_weather_specs(ctx: TaskContext) -> list[TaskSpec]:
    """After-care for weather that already happened (yesterday's storm or downpour, a dry week)."""
    from .tasks import TaskSpec

    today, lang, data = ctx.today, ctx.lang, ctx.data
    log = {d.day: d for d in data.climate_log}
    has_crops = any(
        p.status in ACTIVE_STATUSES and is_active(p, ctx.timelines.get(p.id), today) for p in data.plantings
    )
    if not log or not has_crops:
        return []
    specs: list[TaskSpec] = []
    recent = [log[day] for i in range(1, AFTER_DAYS + 1) if (day := today - timedelta(days=i)) in log]  # newest first
    open_keys = {t_.key for t_ in data.tasks if t_.key and t_.is_open}
    for storm in (d for d in recent if stormy(d)):  # every storm still in its after-care window
        wind = round(max(storm.gust_max or 0, storm.wind_max or 0))
        specs.append(
            TaskSpec(
                key=f"w:after_storm:{storm.day.isoformat()}",
                type=TaskType.CHECK,
                due=storm.day + timedelta(days=1),
                title_key="weather.after_storm",
                title_params={"day": storm.day.strftime("%d/%m")},
                description=t("weather.after_storm.desc", lang, wind=wind),
                window_start=storm.day + timedelta(days=1),
                window_end=storm.day + timedelta(days=AFTER_DAYS),
                priority=TaskPriority.HIGH,
                minutes=20,
                source=TaskSource.WEATHER,
            )
        )
    # a downpour that was measured, or one the forecast already put on the list (its task stays until checked)
    for wet in recent:
        if (wet.rain_mm or 0) < HEAVY_RAIN_MM or (
            wet.rain_src == "forecast" and f"w:rain:{wet.day.isoformat()}" not in open_keys
        ):
            continue
        specs.append(
            TaskSpec(
                key=f"w:rain:{wet.day.isoformat()}",  # the same task the forecast would have made
                type=TaskType.PEST_CHECK,
                due=wet.day + timedelta(days=1),
                title_key="weather.rain",
                title_params={"mm": round(wet.rain_mm or 0), "day": wet.day.strftime("%d/%m")},
                description=t("weather.rain.desc", lang),
                window_start=wet.day,
                window_end=wet.day + timedelta(days=AFTER_DAYS),
                priority=TaskPriority.NORMAL,
                minutes=20,
                source=TaskSource.WEATHER,
            )
        )
    week = [log[today - timedelta(days=i)] for i in range(1, 8) if today - timedelta(days=i) in log]
    rain_known = [d for d in week if d.rain_mm is not None]
    warm = [d for d in week if d.tmax is not None and d.tmax >= 20]
    if (
        len(rain_known) >= 6
        and sum(d.rain_mm or 0 for d in rain_known) < DRY_WEEK_MM
        and len(warm) >= DRY_WEEK_WARM_DAYS
    ):
        monday = today - timedelta(days=today.weekday())
        specs.append(
            TaskSpec(
                key=f"w:dry_logged:{monday.isoformat()}",
                type=TaskType.WATER,
                due=today,
                title_key="weather.dry_logged",
                title_params={"mm": round(sum(d.rain_mm or 0 for d in rain_known), 1), "days": len(rain_known)},
                description=t("weather.dry_logged.desc", lang),
                window_start=today,
                window_end=today + timedelta(days=3),
                priority=TaskPriority.NORMAL,
                minutes=20,
                source=TaskSource.WEATHER,
            )
        )
    return specs


# --------------------------------------------------------------------------- #
# Weather-aware scheduling
# --------------------------------------------------------------------------- #
# What each job cannot stand: rain (mm), frost (min °C), heat (max °C), wind (km/h).
SENSITIVE: dict[TaskType, dict[str, float]] = {
    TaskType.SOW_DIRECT: {"rain": 8.0, "frost": 1.0, "heat": 28.0, "wind": 45.0},
    TaskType.TRANSPLANT: {"rain": 10.0, "frost": 1.0, "heat": 27.0, "wind": 40.0},
    TaskType.HARDEN_OFF: {"frost": 2.0, "wind": 40.0, "heat": 30.0},
    TaskType.THIN: {"heat": 28.0, "rain": 10.0},
    TaskType.PRUNE: {"rain": 3.0, "frost": -3.0},
    TaskType.SOIL_PREP: {"rain": 5.0, "frost": -1.0},
    TaskType.GREEN_MANURE: {"rain": 10.0, "frost": 0.0},
    TaskType.MULCH: {"frost": -1.0, "wind": 45.0},
    TaskType.CLEAN: {"rain": 3.0, "wind": 40.0, "frost": 0.0},
    TaskType.CLEAN_GREENHOUSE: {"rain": 5.0, "frost": 0.0},
    TaskType.FEED: {"rain": 10.0},
    TaskType.DIVIDE: {"frost": 0.0, "heat": 26.0},
    TaskType.CUT_BACK: {"frost": -3.0},
}


def day_problems(day: DailyOutlook, limits: dict[str, float]) -> list[str]:
    out = []
    if "rain" in limits and (day.rain_mm or 0) >= limits["rain"]:
        out.append("rain")
    if "frost" in limits and day.tmin is not None and day.tmin <= limits["frost"]:
        out.append("frost")
    if "heat" in limits and day.tmax is not None and day.tmax >= limits["heat"]:
        out.append("heat")
    if "wind" in limits and day.wind_kmh is not None and day.wind_kmh >= limits["wind"]:
        out.append("wind")
    return out


def weather_adjust(specs: list[TaskSpec], ctx: TaskContext) -> None:
    """Move weather-sensitive jobs to the best day of their window (in place).

    Only days inside the forecast are judged.  A job moves to the closest
    suitable day between ``max(window_start, today)`` and ``window_end``; when
    the whole window is unsuitable it stays and gets a warning instead.
    """
    if not ctx.outlook or not ctx.data.settings.weather_aware_scheduling:
        return
    today, lang = ctx.today, ctx.lang
    forecast = {d.day: d for d in ctx.outlook if d.day >= today}
    if not forecast:
        return
    last = max(forecast)
    for spec in specs:
        limits = SENSITIVE.get(spec.type)
        if limits is None or spec.recurrence is not None or spec.due > last:
            continue
        due = max(spec.due, today)
        current = forecast.get(due)
        problems = day_problems(current, limits) if current else []
        if not problems:
            continue
        start = max(spec.window_start or due, today)
        end = min(spec.window_end or due + timedelta(days=7), last)
        candidates = [d for d in sorted(forecast) if start <= d <= end and not day_problems(forecast[d], limits)]
        reason = ", ".join(t(f"weather.problem.{p}", lang) for p in problems)
        if candidates:
            best = min(candidates, key=lambda d: (abs((d - due).days), d < due))
            spec.description = (
                spec.description + " " + t("weather.moved", lang, date=best.strftime("%d/%m"), reason=reason)
            ).strip()
            spec.due = best
        else:
            spec.description = (spec.description + " " + t("weather.no_good_day", lang, reason=reason)).strip()
