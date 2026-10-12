"""Task engine: generation, idempotent merging, recurrence and rescheduling.

Generated tasks carry a stable ``key`` so regeneration (daily, after every
plan edit and on ``garden_manager.generate_tasks``) never duplicates work and
never loses what the gardener did:

==================  =========================================================
key prefix          meaning
==================  =========================================================
``p:<planting>:…``  derived from a planting + plant database (sow, care, …)
``b:<bed>:…``       bed level routines (weeding, pest checks)
``s:water:…``       sensor driven, valid for one day
``w:<kind>:…``      weather driven (frost, ventilation), valid for one day
==================  =========================================================

Recurring series keep exactly one *open* task under the series key.  When an
occurrence is completed it is archived as ``<key>@<due>`` and the next one is
scheduled ``interval_days`` after the completion date.
"""

from __future__ import annotations

from collections.abc import Callable, Iterable, Sequence
from dataclasses import dataclass, field, replace
from datetime import date, datetime, timedelta
from typing import Any
import uuid

from .geometry import plant_count
from .i18n import t
from .models import (
    CareRule,
    GardenBed,
    GardenData,
    GreenhouseAction,
    IrrigationAction,
    Plant,
    Planting,
    PlantingStatus,
    Recurrence,
    RiskLevel,
    SowMethod,
    Task,
    TaskNote,
    TaskPriority,
    TaskSource,
    TaskStatus,
    TaskType,
    Zone,
)
from .plantdb import PlantDatabase
from .region import season_anchors, season_for_date
from .schedule import PlantingTimeline, TimingAdvice
from .watering import IrrigationRecommendation
from .weather import FrostAssessment, GreenhouseAdvice

# Far enough to show the whole season (incl. harvest) in the calendar.
GENERATION_HORIZON_DAYS = 270
ACTIVE_STATUSES = {
    PlantingStatus.PLANNED,
    PlantingStatus.SOWN_INDOORS,
    PlantingStatus.SOWN,
    PlantingStatus.TRANSPLANTED,
    PlantingStatus.HARVESTING,
}
BASE_MINUTES: dict[TaskType, int] = {
    TaskType.SOW_INDOOR: 15,
    TaskType.SOW_DIRECT: 10,
    TaskType.HARDEN_OFF: 5,
    TaskType.TRANSPLANT: 10,
    TaskType.THIN: 10,
    TaskType.STAKE: 10,
    TaskType.PRUNE: 10,
    TaskType.PINCH: 5,
    TaskType.EARTH_UP: 15,
    TaskType.FEED: 10,
    TaskType.WATER: 10,
    TaskType.WEED: 20,
    TaskType.PEST_CHECK: 5,
    TaskType.HARVEST: 15,
    TaskType.VENTILATE: 5,
    TaskType.SHADE: 15,
    TaskType.FROST_PROTECT: 15,
    TaskType.CUSTOM: 15,
}


def new_id() -> str:
    return uuid.uuid4().hex


# --------------------------------------------------------------------------- #
# Specs
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class TaskSpec:
    key: str
    type: TaskType
    due: date
    title_key: str
    title_params: dict[str, Any]
    description: str = ""
    window_start: date | None = None
    window_end: date | None = None
    priority: TaskPriority = TaskPriority.NORMAL
    minutes: int = 10
    source: TaskSource = TaskSource.GENERATED
    planting_id: str | None = None
    bed_id: str | None = None
    zone_id: str | None = None
    recurrence: Recurrence | None = None
    depends_on: list[str] = field(default_factory=list)


@dataclass(slots=True)
class TaskContext:
    data: GardenData
    db: PlantDatabase
    today: date
    lang: str = "en"
    timelines: dict[str, PlantingTimeline] = field(default_factory=dict)
    advice: dict[str, TimingAdvice] = field(default_factory=dict)
    irrigation: dict[str, IrrigationRecommendation] = field(default_factory=dict)
    frost_by_zone: dict[str, FrostAssessment] = field(default_factory=dict)
    greenhouse: dict[str, GreenhouseAdvice] = field(default_factory=dict)
    horizon_days: int = GENERATION_HORIZON_DAYS


def _bump(priority: TaskPriority, steps: int = 1) -> TaskPriority:
    order = [TaskPriority.LOW, TaskPriority.NORMAL, TaskPriority.HIGH, TaskPriority.URGENT]
    return order[min(len(order) - 1, order.index(priority) + steps)]


def escalate(priority: TaskPriority, due: date, window_end: date | None, today: date) -> TaskPriority:
    """Overdue tasks and closing windows become more important."""
    if due < today - timedelta(days=2):
        priority = _bump(priority)
    if window_end is not None and today <= window_end <= today + timedelta(days=3):
        priority = _bump(priority)
    return priority


def is_active(planting: Planting, timeline: PlantingTimeline | None, today: date) -> bool:
    """Is the planting physically in the bed today?"""
    if planting.status not in ACTIVE_STATUSES or timeline is None:
        return False
    if planting.status in (PlantingStatus.SOWN, PlantingStatus.TRANSPLANTED, PlantingStatus.HARVESTING):
        return True
    # Not every gardener ticks off tasks: once the planned date has passed we
    # optimistically assume the crop is in the ground (frost / water advice).
    return timeline.in_ground <= today <= timeline.harvest_end


def _care_anchor(rule: CareRule, tl: PlantingTimeline) -> date:
    if rule.anchor == "sow":
        return tl.sow_date or tl.in_ground
    if rule.anchor == "transplant":
        return tl.transplant_date or tl.in_ground
    if rule.anchor == "harvest_start":
        return tl.harvest_start
    return tl.in_ground


# --------------------------------------------------------------------------- #
# Generation
# --------------------------------------------------------------------------- #
def planting_specs(
    ctx: TaskContext, planting: Planting, plant: Plant, bed: GardenBed, zone: Zone | None
) -> list[TaskSpec]:
    tl = ctx.timelines.get(planting.id)
    if tl is None or planting.status not in ACTIVE_STATUSES:
        return []
    lang = ctx.lang
    pname, bname = plant.name(lang), bed.name
    base = {"plant": pname, "bed": bname}
    count = plant_count(planting, plant)
    pid = planting.id
    specs: list[TaskSpec] = []
    sown = planting.sown_on is not None or planting.status is not PlantingStatus.PLANNED
    planted = planting.transplanted_on is not None or planting.status in (
        PlantingStatus.TRANSPLANTED,
        PlantingStatus.HARVESTING,
    )
    advice = ctx.advice.get(pid)

    def wait_note() -> str:
        if advice and advice.status == "wait":
            return " ".join(t(k, lang, **p) for k, p in advice.reasons if k != "reason.window_open")
        return ""

    def common(key: str, ttype: TaskType, due: date, **kw: Any) -> TaskSpec:
        return TaskSpec(
            key=f"p:{pid}:{key}",
            type=ttype,
            due=due,
            title_key=kw.pop("title_key", f"task.{ttype.value}"),
            title_params=kw.pop("title_params", base),
            planting_id=pid,
            bed_id=bed.id,
            zone_id=bed.zone_id,
            minutes=kw.pop("minutes", BASE_MINUTES[ttype]),
            **kw,
        )

    # -- sowing / transplanting ------------------------------------------ #
    if tl.method is SowMethod.INDOOR_SOW and not sown and tl.sow_date:
        specs.append(
            common(
                "sow_indoor",
                TaskType.SOW_INDOOR,
                tl.sow_date,
                window_start=tl.sow_window.start if tl.sow_window else None,
                window_end=tl.sow_window.end if tl.sow_window else None,
                description=t(
                    "desc.sow_indoor",
                    lang,
                    depth=plant.sowing_depth_cm,
                    soil_temp=plant.min_soil_temp_c,
                    germ_min=plant.germination_days[0],
                    germ_max=plant.germination_days[1],
                ),
                minutes=10 + count // 4,
            )
        )
    if tl.method is SowMethod.DIRECT_SOW and not sown and tl.sow_date:
        due = tl.sow_date
        if advice and advice.action == "sow" and advice.status == "wait":
            due = max(due, ctx.today + timedelta(days=1))
        specs.append(
            common(
                "sow_direct",
                TaskType.SOW_DIRECT,
                due,
                window_start=tl.sow_window.start if tl.sow_window else None,
                window_end=tl.sow_window.end if tl.sow_window else None,
                description=(
                    t(
                        "desc.sow_direct",
                        lang,
                        depth=plant.sowing_depth_cm,
                        row_spacing=plant.row_spacing_cm,
                        soil_temp=plant.min_soil_temp_c,
                    )
                    + (" " + wait_note() if wait_note() else "")
                ).strip(),
                minutes=5 + round(planting.width_cm * planting.length_cm / 10_000 * 15),
            )
        )
    if tl.harden_off_date and not planted:
        specs.append(
            common(
                "harden_off",
                TaskType.HARDEN_OFF,
                tl.harden_off_date,
                window_start=tl.harden_off_date,
                window_end=tl.transplant_date,
                description=t("desc.harden_off", lang),
                depends_on=[f"p:{pid}:sow_indoor"],
            )
        )
    if tl.method is not SowMethod.DIRECT_SOW and not planted and tl.transplant_date:
        due = tl.transplant_date
        if advice and advice.action == "transplant" and advice.status == "wait":
            due = max(due, ctx.today + timedelta(days=1))
        deps = [f"p:{pid}:harden_off"] if tl.harden_off_date else []
        if tl.method is SowMethod.INDOOR_SOW:
            deps.append(f"p:{pid}:sow_indoor")
        specs.append(
            common(
                "transplant",
                TaskType.TRANSPLANT,
                due,
                window_start=tl.transplant_window.start if tl.transplant_window else None,
                window_end=tl.transplant_window.end if tl.transplant_window else None,
                description=(t("desc.transplant", lang, spacing=plant.spacing_cm) + " " + wait_note()).strip(),
                minutes=5 + round(count * 1.5),
                depends_on=deps,
            )
        )
    if plant.thinning and tl.method is SowMethod.DIRECT_SOW and tl.sow_date:
        thin_day = tl.sow_date + timedelta(days=plant.germination_days[1] + 7)
        specs.append(
            common(
                "thin",
                TaskType.THIN,
                thin_day,
                window_start=thin_day,
                window_end=thin_day + timedelta(days=10),
                description=t("desc.thin", lang, spacing=plant.spacing_cm),
                depends_on=[f"p:{pid}:sow_direct"],
            )
        )

    # -- care rules ---------------------------------------------------- #
    has_feed_rule = any(rule.task is TaskType.FEED for rule in plant.care)
    rules = list(plant.care)
    if plant.feeding_interval_days and not has_feed_rule:
        rules.append(CareRule(task=TaskType.FEED, start_day=21, interval_days=plant.feeding_interval_days, minutes=10))
    for idx, rule in enumerate(rules):
        first = _care_anchor(rule, tl) + timedelta(days=rule.start_day)
        until = _care_anchor(rule, tl) + timedelta(days=rule.end_day) if rule.end_day is not None else tl.harvest_end
        until = min(until, tl.harvest_end)
        if first > until:
            continue
        deps = []
        if rule.anchor in ("transplant", "planting") and tl.method is not SowMethod.DIRECT_SOW:
            deps.append(f"p:{pid}:transplant")
        elif tl.method is SowMethod.DIRECT_SOW:
            deps.append(f"p:{pid}:sow_direct")
        specs.append(
            common(
                f"care:{idx}:{rule.task.value}",
                rule.task,
                first,
                window_start=first,
                window_end=until if rule.interval_days else first + timedelta(days=7),
                description=rule.notes.get(lang) or rule.notes.get("en", ""),
                minutes=rule.minutes,
                recurrence=Recurrence(rule.interval_days, until) if rule.interval_days else None,
                depends_on=deps,
            )
        )

    # -- harvest --------------------------------------------------------- #
    desc = t("desc.harvest", lang, start=tl.harvest_start.isoformat(), end=tl.harvest_end.isoformat())
    harvest_deps = [f"p:{pid}:transplant" if tl.method is not SowMethod.DIRECT_SOW else f"p:{pid}:sow_direct"]
    if plant.continuous_harvest and plant.harvest_interval_days:
        specs.append(
            common(
                "harvest",
                TaskType.HARVEST,
                tl.harvest_start,
                window_start=tl.harvest_start,
                window_end=tl.harvest_end,
                description=desc,
                priority=TaskPriority.NORMAL,
                recurrence=Recurrence(plant.harvest_interval_days, tl.harvest_end),
                depends_on=harvest_deps,
                minutes=10 + count // 3,
            )
        )
    else:
        specs.append(
            common(
                "harvest",
                TaskType.HARVEST,
                tl.harvest_start,
                window_start=tl.harvest_start,
                window_end=tl.harvest_end,
                title_key="task.harvest_start",
                description=desc,
                priority=TaskPriority.HIGH,
                depends_on=harvest_deps,
                minutes=10 + count // 2,
            )
        )
    return specs


def bed_specs(ctx: TaskContext, bed: GardenBed, plantings: Sequence[tuple[Planting, Plant]]) -> list[TaskSpec]:
    """Weeding weekly and pest checks every 3 days while crops are in the bed."""
    data = ctx.data
    region = data.settings.region
    anchors = season_anchors(region, season_for_date(region, ctx.today))
    spans = [
        ctx.timelines[p.id].occupancy for p, _ in plantings if p.id in ctx.timelines and p.status in ACTIVE_STATUSES
    ]
    spans = [s for s in spans if s.end >= ctx.today]
    if not spans:
        return []
    start = min(s.start for s in spans)
    end = max(s.end for s in spans)
    zone = data.zone(bed.zone_id)
    specs: list[TaskSpec] = []
    if not anchors.frost_free and not (zone and zone.is_enclosed):
        # Weeds don't grow in winter: clamp to the growing season.
        start = max(start, anchors.last_frost - timedelta(days=21))
        end = min(end, anchors.first_frost + timedelta(days=14))
    if start <= end:
        specs.append(
            TaskSpec(
                key=f"b:{bed.id}:weed:{anchors.season}",
                type=TaskType.WEED,
                due=start,
                title_key="task.weed",
                title_params={"bed": bed.name},
                description=t("desc.weed", ctx.lang),
                window_start=start,
                window_end=end,
                priority=TaskPriority.LOW,
                minutes=max(10, round(bed.area_m2 * 8)),
                bed_id=bed.id,
                zone_id=bed.zone_id,
                recurrence=Recurrence(7, end),
            )
        )
    pest_prone = [
        plant
        for p, plant in plantings
        if plant.pests
        and p.status in ACTIVE_STATUSES
        and not any(rule.task is TaskType.PEST_CHECK for rule in plant.care)  # has its own routine
    ]
    if pest_prone and start <= end:
        names = sorted({plant.name(ctx.lang) for plant in pest_prone})
        specs.append(
            TaskSpec(
                key=f"b:{bed.id}:pest_check:{anchors.season}",
                type=TaskType.PEST_CHECK,
                due=start,
                title_key="task.pest_check",
                title_params={"plant": ", ".join(names[:3]) + ("…" if len(names) > 3 else ""), "bed": bed.name},
                window_start=start,
                window_end=end,
                priority=TaskPriority.LOW,
                minutes=5 + 2 * len(names),
                bed_id=bed.id,
                zone_id=bed.zone_id,
                recurrence=Recurrence(3, end),
            )
        )
    return specs


def live_specs(ctx: TaskContext) -> list[TaskSpec]:
    """Sensor- and weather-driven tasks for *today*."""
    data, today, lang = ctx.data, ctx.today, ctx.lang
    specs: list[TaskSpec] = []
    for bed in data.beds:
        rec = ctx.irrigation.get(bed.id)
        if rec and rec.action in (IrrigationAction.WATER, IrrigationAction.CHECK_MANUALLY):
            specs.append(
                TaskSpec(
                    key=f"s:water:{bed.id}:{today.isoformat()}",
                    type=TaskType.WATER,
                    due=today,
                    title_key="task.water",
                    title_params={"bed": bed.name, "liters": round(rec.liters)},
                    description=t(
                        "desc.water",
                        lang,
                        moisture="?" if rec.moisture is None else round(rec.moisture),
                        target=round(rec.band.target_mid) if rec.band else "?",
                        mm=rec.amount_mm,
                        liters=round(rec.liters),
                    ),
                    window_start=today,
                    window_end=today,
                    priority=rec.priority,
                    minutes=max(5, round(rec.liters / 8)),
                    source=TaskSource.SENSOR,
                    bed_id=bed.id,
                    zone_id=bed.zone_id,
                )
            )

    # Frost: protect active, frost-sensitive plantings per zone.
    by_zone: dict[str, list[tuple[Planting, Plant]]] = {}
    for p in data.plantings:
        plant = ctx.db.get(p.plant_id)
        bed = data.bed(p.bed_id)
        if plant is None or bed is None:
            continue
        if not is_active(p, ctx.timelines.get(p.id), today):
            continue
        by_zone.setdefault(bed.zone_id, []).append((p, plant))
    for zone_id, items in by_zone.items():
        frost = ctx.frost_by_zone.get(zone_id)
        if frost is None or frost.level not in (RiskLevel.MODERATE, RiskLevel.HIGH):
            continue
        at_risk = [
            plant
            for _p, plant in items
            if frost.plant_level_min_c is not None and frost.plant_level_min_c < plant.min_temp_c + 1.0
        ]
        if not at_risk:
            continue
        names = sorted({plant.name(lang) for plant in at_risk})
        when = frost.min_at.date() if frost.min_at else today
        specs.append(
            TaskSpec(
                key=f"w:frost:{zone_id}:{when.isoformat()}",
                type=TaskType.FROST_PROTECT,
                due=today,
                title_key="task.frost_protect",
                title_params={"plants": ", ".join(names)},
                description=t(
                    "desc.frost",
                    lang,
                    temp=frost.plant_level_min_c,
                    time=frost.min_at.isoformat(timespec="minutes") if frost.min_at else "?",
                ),
                window_start=today,
                window_end=when,
                priority=TaskPriority.URGENT if frost.level is RiskLevel.HIGH else TaskPriority.HIGH,
                minutes=10 + 3 * len(at_risk),
                source=TaskSource.WEATHER,
                zone_id=zone_id,
            )
        )

    for zone in data.zones:
        advice = ctx.greenhouse.get(zone.id)
        if advice is None or advice.action is GreenhouseAction.NONE:
            continue
        mapping = {
            GreenhouseAction.VENTILATE: (TaskType.VENTILATE, "task.ventilate", TaskPriority.HIGH),
            GreenhouseAction.SHADE: (TaskType.SHADE, "task.shade", TaskPriority.URGENT),
            GreenhouseAction.CLOSE_UP: (TaskType.FROST_PROTECT, "task.close_up", TaskPriority.HIGH),
            GreenhouseAction.HEAT: (TaskType.FROST_PROTECT, "task.close_up", TaskPriority.URGENT),
        }
        ttype, title_key, prio = mapping[advice.action]
        temp = advice.inside_now_c if advice.inside_now_c is not None else advice.forecast_max_c
        specs.append(
            TaskSpec(
                key=f"w:{advice.action.value}:{zone.id}:{today.isoformat()}",
                type=ttype,
                due=today,
                title_key=title_key,
                title_params={"zone": zone.name},
                description=t(
                    "desc.ventilate",
                    lang,
                    temp=temp,
                    plants=", ".join(advice.limiting_plants) or "-",
                    max=advice.limit_max_c,
                )
                if ttype in (TaskType.VENTILATE, TaskType.SHADE)
                else "",
                window_start=today,
                window_end=today,
                priority=prio,
                minutes=BASE_MINUTES[ttype],
                source=TaskSource.WEATHER,
                zone_id=zone.id,
            )
        )
    return specs


def generate_specs(ctx: TaskContext) -> list[TaskSpec]:
    data, db = ctx.data, ctx.db
    region = data.settings.region
    current = season_for_date(region, ctx.today)
    horizon = ctx.today + timedelta(days=ctx.horizon_days)
    specs: list[TaskSpec] = []
    per_bed: dict[str, list[tuple[Planting, Plant]]] = {}
    for planting in data.plantings:
        if planting.season not in (current - 1, current, current + 1):
            continue
        plant = db.get(planting.plant_id)
        bed = data.bed(planting.bed_id)
        if plant is None or bed is None:
            continue
        per_bed.setdefault(bed.id, []).append((planting, plant))
        tl = ctx.timelines.get(planting.id)
        if planting.season == current - 1 and (tl is None or tl.harvest_end < ctx.today):
            continue  # last season's crops that are over
        specs.extend(planting_specs(ctx, planting, plant, bed, data.zone(bed.zone_id)))
    for bed in data.beds:
        specs.extend(bed_specs(ctx, bed, per_bed.get(bed.id, [])))
    specs = [s for s in specs if s.due <= horizon]
    specs.extend(live_specs(ctx))
    for spec in specs:
        spec.priority = escalate(spec.priority, spec.due, spec.window_end, ctx.today)
    return specs


# --------------------------------------------------------------------------- #
# Merge
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class MergeResult:
    tasks: list[Task]
    created: list[Task] = field(default_factory=list)
    updated: list[Task] = field(default_factory=list)
    removed: list[Task] = field(default_factory=list)
    auto_closed: list[Task] = field(default_factory=list)

    @property
    def changed(self) -> bool:
        return bool(self.created or self.updated or self.removed or self.auto_closed)


def _series_progress(existing: Iterable[Task], key: str) -> Task | None:
    """Latest archived occurrence of a recurring series."""
    archived = [t_ for t_ in existing if t_.key and t_.key.startswith(key + "@") and not t_.is_open]
    return max(archived, key=lambda t_: t_.due, default=None)


def spec_to_task(spec: TaskSpec, lang: str, now: datetime, id_factory: Callable[[], str]) -> Task:
    return Task(
        id=id_factory(),
        key=spec.key,
        type=spec.type,
        title=t(spec.title_key, lang, **spec.title_params),
        title_key=spec.title_key,
        title_params=dict(spec.title_params),
        description=spec.description,
        due=spec.due,
        window_start=spec.window_start,
        window_end=spec.window_end,
        priority=spec.priority,
        estimated_minutes=spec.minutes,
        source=spec.source,
        planting_id=spec.planting_id,
        bed_id=spec.bed_id,
        zone_id=spec.zone_id,
        recurrence=spec.recurrence,
        depends_on=list(spec.depends_on),
        created_at=now,
        updated_at=now,
    )


def merge_tasks(
    existing: Sequence[Task],
    specs: Sequence[TaskSpec],
    *,
    today: date,
    now: datetime,
    lang: str = "en",
    id_factory: Callable[[], str] = new_id,
) -> MergeResult:
    result = MergeResult(tasks=[])
    open_by_key = {t_.key: t_ for t_ in existing if t_.key and t_.is_open}
    closed_keys = {t_.key for t_ in existing if t_.key and not t_.is_open}
    progressed = {k.split("@")[0] for k in closed_keys if k and "@" in k}
    spec_keys = {s.key for s in specs}
    out: list[Task] = []

    for task in existing:
        if task.source is TaskSource.USER or not task.key or not task.is_open:
            out.append(task)
            continue
        if task.key in spec_keys:
            out.append(task)
            continue
        # The reason for this open task disappeared.
        if task.source in (TaskSource.SENSOR, TaskSource.WEATHER):
            closed = replace(
                task,
                status=TaskStatus.SKIPPED if task.due < today else TaskStatus.DONE,
                completed_at=now,
                updated_at=now,
            )
            closed.notes = [*task.notes, TaskNote(now, "auto: expired" if task.due < today else "auto: resolved")]
            out.append(closed)
            result.auto_closed.append(closed)
        elif task.notes or task.photos:
            skipped = replace(task, status=TaskStatus.SKIPPED, completed_at=now, updated_at=now)
            out.append(skipped)
            result.auto_closed.append(skipped)
        else:
            result.removed.append(task)

    index = {id(t_): i for i, t_ in enumerate(out)}
    for spec in specs:
        current = open_by_key.get(spec.key)
        if current is not None and id(current) in index:
            updated = _apply_spec(current, spec, lang, now, progressed=spec.key in progressed)
            if updated is not current:
                out[index[id(current)]] = updated
                result.updated.append(updated)
            continue
        if spec.key in closed_keys and spec.recurrence is None:
            continue  # one-off task already done/skipped
        if spec.recurrence is not None:
            last = _series_progress(existing, spec.key)
            if last is not None or spec.key in closed_keys:
                base_day = last.completed_at.date() if last and last.completed_at else (last.due if last else today)
                nxt = base_day + timedelta(days=spec.recurrence.interval_days)
                if spec.recurrence.until and nxt > spec.recurrence.until:
                    continue
                spec = replace(spec, due=max(nxt, spec.due))
            elif spec.due < today:
                # First occurrence of a routine that should have started
                # already: start today instead of showing it months overdue.
                spec = replace(spec, due=today)
        task = spec_to_task(spec, lang, now, id_factory)
        out.append(task)
        result.created.append(task)

    result.tasks = out
    return result


def _apply_spec(task: Task, spec: TaskSpec, lang: str, now: datetime, *, progressed: bool = False) -> Task:
    """Refresh a generated task from its spec, preserving user decisions."""
    changes: dict[str, Any] = {}
    title = t(spec.title_key, lang, **spec.title_params)
    if title != task.title or spec.title_params != task.title_params:
        changes.update(title=title, title_key=spec.title_key, title_params=dict(spec.title_params))
    if spec.description != task.description:
        changes["description"] = spec.description
    if (spec.window_start, spec.window_end) != (task.window_start, task.window_end):
        changes.update(window_start=spec.window_start, window_end=spec.window_end)
    if spec.recurrence != task.recurrence:
        changes["recurrence"] = spec.recurrence
    if not task.user_modified:
        if spec.recurrence is None:
            if spec.due != task.due:
                changes["due"] = spec.due
        elif not progressed:
            # A routine whose start moved (e.g. the transplant happened on a
            # different day than planned).  Never move it before the day it
            # was created (catch-up rule).  Once the series has progressed,
            # the completion dates own the due date.
            target = spec.due
            if task.created_at is not None:
                target = max(target, task.created_at.date())
            if target != task.due:
                changes["due"] = target
        if spec.priority != task.priority:
            changes["priority"] = spec.priority
        if spec.minutes != task.estimated_minutes:
            changes["estimated_minutes"] = spec.minutes
    if spec.depends_on != task.depends_on:
        changes["depends_on"] = list(spec.depends_on)
    if not changes:
        return task
    changes["updated_at"] = now
    return replace(task, **changes)


# --------------------------------------------------------------------------- #
# Lifecycle operations
# --------------------------------------------------------------------------- #
_PLANTING_EFFECTS: dict[TaskType, tuple[str, PlantingStatus]] = {
    TaskType.SOW_INDOOR: ("sown_on", PlantingStatus.SOWN_INDOORS),
    TaskType.SOW_DIRECT: ("sown_on", PlantingStatus.SOWN),
    TaskType.TRANSPLANT: ("transplanted_on", PlantingStatus.TRANSPLANTED),
}


@dataclass(slots=True)
class CompletionResult:
    task: Task
    next_task: Task | None = None
    planting_changed: bool = False


def complete_task(
    data: GardenData,
    task_id: str,
    *,
    now: datetime,
    today: date,
    note: str | None = None,
    photos: Sequence[str] = (),
    author: str | None = None,
    skipped: bool = False,
    lang: str = "en",
    id_factory: Callable[[], str] = new_id,
) -> CompletionResult:
    """Mark a task done (or skipped), update the planting and roll recurrence."""
    task = data.task(task_id)
    if task is None:
        raise KeyError(task_id)
    if not task.is_open:
        return CompletionResult(task)

    task.status = TaskStatus.SKIPPED if skipped else TaskStatus.DONE
    task.completed_at = now
    task.updated_at = now
    if note:
        task.notes.append(TaskNote(now, note, author))
    task.photos.extend(photos)

    result = CompletionResult(task)
    planting = data.planting(task.planting_id)
    if planting and not skipped:
        effect = _PLANTING_EFFECTS.get(task.type)
        if effect:
            attr, status = effect
            setattr(planting, attr, today)
            planting.status = status
            result.planting_changed = True
        elif task.type is TaskType.HARVEST and planting.harvest_started_on is None:
            planting.harvest_started_on = today
            planting.status = PlantingStatus.HARVESTING
            result.planting_changed = True

    if task.recurrence and task.key and "@" not in task.key:
        series = task.key
        task.key = f"{series}@{task.due.isoformat()}"
        nxt = today + timedelta(days=task.recurrence.interval_days)
        if task.recurrence.until is None or nxt <= task.recurrence.until:
            follow = replace(
                task,
                id=id_factory(),
                key=series,
                due=nxt,
                status=TaskStatus.OPEN,
                completed_at=None,
                notes=[],
                photos=[],
                postponed_count=0,
                original_due=None,
                user_modified=False,
                created_at=now,
                updated_at=now,
            )
            data.tasks.append(follow)
            result.next_task = follow
    return result


@dataclass(slots=True)
class PostponeResult:
    task: Task
    shifted: list[Task] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)


def postpone_task(
    data: GardenData,
    task_id: str,
    *,
    now: datetime,
    days: int | None = None,
    to: date | None = None,
    reason: str | None = None,
    cascade: bool = True,
) -> PostponeResult:
    """Move a task; dependants of the same planting shift by the same delta.

    Example: postponing *sow tomato indoors* by a week also moves *harden off*
    and *plant out* - unless the gardener already moved those by hand.
    """
    task = data.task(task_id)
    if task is None:
        raise KeyError(task_id)
    if to is None:
        to = task.due + timedelta(days=days if days is not None else 1)
    delta = to - task.due
    result = PostponeResult(task)
    if delta.days == 0:
        return result
    task.original_due = task.original_due or task.due
    task.due = to
    task.postponed_count += 1
    task.user_modified = True
    task.updated_at = now
    if reason:
        task.notes.append(TaskNote(now, reason))
    if task.window_end and to > task.window_end:
        result.warnings.append("beyond_window")

    if cascade and task.key and delta.days > 0:
        queue = [task.key.split("@")[0]]
        seen = set(queue)
        while queue:
            key = queue.pop()
            for other in data.tasks:
                if (
                    other.is_open
                    and other is not task
                    and other.key
                    and key in other.depends_on
                    and other.key not in seen
                    and not other.user_modified
                ):
                    other.due = other.due + delta
                    other.updated_at = now
                    result.shifted.append(other)
                    seen.add(other.key)
                    queue.append(other.key)
                    if other.window_end and other.due > other.window_end:
                        result.warnings.append(f"dependant_beyond_window:{other.id}")
    return result


def make_user_task(
    *,
    title: str,
    due: date,
    now: datetime,
    task_type: TaskType = TaskType.CUSTOM,
    description: str = "",
    priority: TaskPriority = TaskPriority.NORMAL,
    minutes: int | None = None,
    bed_id: str | None = None,
    zone_id: str | None = None,
    planting_id: str | None = None,
    recurrence_days: int | None = None,
    until: date | None = None,
    id_factory: Callable[[], str] = new_id,
) -> Task:
    tid = id_factory()
    return Task(
        id=tid,
        key=f"u:{tid}" if recurrence_days else None,
        type=task_type,
        title=title,
        due=due,
        description=description,
        priority=priority,
        estimated_minutes=minutes if minutes is not None else BASE_MINUTES[task_type],
        source=TaskSource.USER,
        bed_id=bed_id,
        zone_id=zone_id,
        planting_id=planting_id,
        recurrence=Recurrence(recurrence_days, until) if recurrence_days else None,
        created_at=now,
        updated_at=now,
    )


def tasks_due(tasks: Iterable[Task], day: date) -> list[Task]:
    """Open tasks due on or before ``day``, most important first."""
    due = [t_ for t_ in tasks if t_.is_open and t_.due <= day]
    return sorted(due, key=lambda t_: (-t_.priority.rank, t_.due, t_.title))
