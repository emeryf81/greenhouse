"""Seasonal garden work: the calendar beyond individual crops.

Three groups of yearly tasks are generated, all anchored on the frost dates so
they move with climate and hemisphere:

* **garden**     - plan the season, order seed, turn compost, mulch, drain
                   water before frost, winter rest, tool care, soil test.
* **greenhouse** - spring clean, shading on/off, autumn clean & disinfect,
                   winter insulation (per enclosed zone).
* **perennials** - cut back, divide, protect from frost, top-dress
                   (driven by plant tags).

Plus **bed turnover** tasks derived from the plan: prepare the soil (with the
compost / fertiliser amounts for the coming crops) two weeks before a bed is
planted, and sow green manure - or mulch for winter - when a bed falls empty.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date, timedelta
from typing import TYPE_CHECKING

from .fertilizer import bed_fertilizer_plan
from .i18n import t
from .models import PlantingStatus, TaskPriority, TaskSource, TaskType, present_in
from .region import season_anchors, season_for_date

if TYPE_CHECKING:
    from .tasks import TaskContext, TaskSpec


@dataclass(frozen=True, slots=True)
class Rule:
    id: str
    type: TaskType
    anchor: str  # last_frost | first_frost
    week: int
    minutes: int
    scope: str  # garden | greenhouse
    priority: TaskPriority = TaskPriority.NORMAL
    every_n_seasons: int = 1
    handbook: str = "seasons"
    needs: str = ""  # only when the plan has this garden element (e.g. "hedge")


GARDEN_RULES: tuple[Rule, ...] = (
    Rule(
        "plan_season", TaskType.PLAN_SEASON, "last_frost", -14, 120, "garden", TaskPriority.NORMAL, handbook="planning"
    ),
    Rule("order_seeds", TaskType.PLAN_SEASON, "last_frost", -12, 30, "garden", handbook="planning"),
    Rule("seed_station", TaskType.TOOL_CARE, "last_frost", -11, 45, "garden", TaskPriority.LOW, handbook="sowing"),
    Rule("compost_spring", TaskType.COMPOST, "last_frost", -6, 45, "garden", TaskPriority.LOW, handbook="soil"),
    Rule("mulch_beds", TaskType.MULCH, "last_frost", 5, 60, "garden", TaskPriority.LOW, handbook="watering"),
    Rule("compost_summer", TaskType.COMPOST, "last_frost", 10, 45, "garden", TaskPriority.LOW, handbook="soil"),
    Rule("compost_autumn", TaskType.COMPOST, "first_frost", -2, 60, "garden", TaskPriority.LOW, handbook="soil"),
    Rule("winter_water", TaskType.WINTER_PREP, "first_frost", -1, 45, "garden", TaskPriority.HIGH, handbook="seasons"),
    Rule("winter_rest", TaskType.WINTER_PREP, "first_frost", 3, 90, "garden", TaskPriority.NORMAL, handbook="seasons"),
    Rule("soil_test", TaskType.SOIL_TEST, "first_frost", 2, 30, "garden", TaskPriority.LOW, 3, handbook="soil"),
    Rule("tool_care", TaskType.TOOL_CARE, "first_frost", 8, 60, "garden", TaskPriority.LOW, handbook="seasons"),
    # -- phase 3: the rest of the gardener's year ---------------------------
    Rule("clean_pots", TaskType.CLEAN, "last_frost", -10, 45, "garden", TaskPriority.LOW, handbook="tools"),
    Rule("water_butts", TaskType.CHECK, "last_frost", -4, 30, "garden", TaskPriority.LOW, handbook="watering"),
    Rule(
        "irrigation_service", TaskType.TOOL_CARE, "last_frost", -2, 40, "garden", TaskPriority.LOW, handbook="watering"
    ),
    Rule("green_manure_dig", TaskType.SOIL_PREP, "last_frost", -5, 60, "garden", TaskPriority.NORMAL, handbook="soil"),
    Rule("slug_patrol", TaskType.PEST_CHECK, "last_frost", -1, 20, "garden", TaskPriority.NORMAL, handbook="pests"),
    Rule("nettle_feed", TaskType.MAKE_FEED, "last_frost", 3, 20, "garden", TaskPriority.LOW, handbook="fertilizing"),
    Rule("comfrey_feed", TaskType.MAKE_FEED, "last_frost", 7, 20, "garden", TaskPriority.LOW, handbook="fertilizing"),
    Rule(
        "sow_winter_crops",
        TaskType.PLAN_SEASON,
        "first_frost",
        -16,
        20,
        "garden",
        TaskPriority.NORMAL,
        handbook="planning",
    ),
    Rule(
        "hedge_trim",
        TaskType.PRUNE,
        "last_frost",
        17,
        90,
        "garden",
        TaskPriority.LOW,
        handbook="seasons",
        needs="hedge",
    ),
    Rule("seed_saving", TaskType.CHECK, "first_frost", -7, 30, "garden", TaskPriority.LOW, handbook="sowing"),
    Rule("fleece_ready", TaskType.CHECK, "first_frost", -3, 20, "garden", TaskPriority.NORMAL, handbook="seasons"),
    Rule("leaf_mould", TaskType.COMPOST, "first_frost", 3, 45, "garden", TaskPriority.LOW, handbook="soil"),
    Rule("gutters", TaskType.CLEAN, "first_frost", 4, 30, "garden", TaskPriority.LOW, handbook="watering"),
    Rule("nest_boxes", TaskType.CLEAN, "first_frost", 6, 30, "garden", TaskPriority.LOW, handbook="pests"),
    Rule("storage_check", TaskType.CHECK, "first_frost", 9, 20, "garden", TaskPriority.LOW, handbook="harvest"),
)
GREENHOUSE_RULES: tuple[Rule, ...] = (
    Rule("gh_spring_clean", TaskType.CLEAN_GREENHOUSE, "last_frost", -12, 120, "greenhouse", handbook="greenhouse"),
    Rule("gh_shading_on", TaskType.SHADE, "last_frost", 5, 30, "greenhouse", handbook="greenhouse"),
    Rule(
        "gh_shading_off", TaskType.SHADE, "first_frost", -6, 30, "greenhouse", TaskPriority.LOW, handbook="greenhouse"
    ),
    Rule(
        "gh_winter", TaskType.WINTER_PREP, "first_frost", 0, 60, "greenhouse", TaskPriority.HIGH, handbook="greenhouse"
    ),
    Rule("gh_autumn_clean", TaskType.CLEAN_GREENHOUSE, "first_frost", 2, 180, "greenhouse", handbook="greenhouse"),
    Rule("gh_windows", TaskType.CLEAN, "last_frost", -9, 60, "greenhouse", TaskPriority.NORMAL, handbook="greenhouse"),
    Rule(
        "gh_vents_check", TaskType.CHECK, "last_frost", -4, 20, "greenhouse", TaskPriority.NORMAL, handbook="greenhouse"
    ),
    Rule(
        "gh_biocontrol", TaskType.PEST_CHECK, "last_frost", 2, 15, "greenhouse", TaskPriority.NORMAL, handbook="pests"
    ),
    Rule(
        "gh_windows_autumn",
        TaskType.CLEAN,
        "first_frost",
        -5,
        60,
        "greenhouse",
        TaskPriority.LOW,
        handbook="greenhouse",
    ),
    Rule(
        "gh_winter_crops",
        TaskType.PLAN_SEASON,
        "first_frost",
        -9,
        20,
        "greenhouse",
        TaskPriority.NORMAL,
        handbook="greenhouse",
    ),
)
# Orchard / fruit zones: whole-zone care that is not tied to one tree.
ORCHARD_RULES: tuple[Rule, ...] = (
    Rule(
        "orchard_winter_wash", TaskType.PEST_CHECK, "last_frost", -12, 45, "orchard", TaskPriority.LOW, handbook="fruit"
    ),
    Rule("orchard_mow", TaskType.CHECK, "last_frost", 4, 45, "orchard", TaskPriority.LOW, handbook="fruit"),
    Rule(
        "orchard_grease_bands",
        TaskType.PROTECT,
        "first_frost",
        -2,
        20,
        "orchard",
        TaskPriority.NORMAL,
        handbook="fruit",
    ),
    Rule(
        "orchard_pollinators", TaskType.POLLINATE, "last_frost", -3, 15, "orchard", TaskPriority.LOW, handbook="fruit"
    ),
)
# Perennial care keyed by plant tag: (task type, anchor, week, minutes, rule id)
PERENNIAL_RULES: tuple[tuple[str, TaskType, str, int, int, str], ...] = (
    ("cut_back_spring", TaskType.CUT_BACK, "last_frost", -2, 15, "cut_back_spring"),
    ("cut_back_autumn", TaskType.CUT_BACK, "first_frost", 1, 15, "cut_back_autumn"),
    ("protect_winter", TaskType.WINTER_PREP, "first_frost", -2, 15, "protect_winter"),
    ("divide", TaskType.DIVIDE, "last_frost", -4, 30, "divide"),
)


def _zone_has_plants(data, zone_id: str) -> bool:
    beds = {b.id for b in data.beds if b.zone_id == zone_id}
    return any(p.bed_id in beds for p in data.plantings)


def _window(due: date) -> tuple[date, date]:
    return due - timedelta(days=7), due + timedelta(days=14)


def maintenance_specs(ctx: TaskContext) -> list[TaskSpec]:
    from .tasks import TaskSpec

    data, db, today, lang = ctx.data, ctx.db, ctx.today, ctx.lang
    if not data.settings.maintenance_tasks:
        return []
    region = data.settings.region
    current = season_for_date(region, today)
    horizon = today + timedelta(days=ctx.horizon_days)
    specs: list[TaskSpec] = []

    def add_rule(rule: Rule, season: int, scope_id: str, params: dict[str, object], zone_id: str | None = None) -> None:
        anchors = season_anchors(region, season)
        if anchors.frost_free and rule.type is TaskType.WINTER_PREP:
            return
        if season % rule.every_n_seasons:
            return
        if rule.needs and not any(f.type.value == rule.needs for f in data.features):
            return
        due = anchors.anchor(rule.anchor) + timedelta(weeks=rule.week)
        start, end = _window(due)
        if end < today or due > horizon:
            return
        specs.append(
            TaskSpec(
                key=f"m:{rule.id}:{scope_id}:{season}",
                type=rule.type,
                due=max(due, today),
                title_key=f"maint.{rule.id}",
                title_params={**params, "handbook": rule.handbook},
                description=t(f"maint.{rule.id}.desc", lang, **params),
                window_start=start,
                window_end=end,
                priority=rule.priority,
                minutes=rule.minutes,
                source=TaskSource.GENERATED,
                zone_id=zone_id,
            )
        )

    seasons = (current - 1, current, current + 1)
    for season in seasons:
        for rule in GARDEN_RULES:
            add_rule(rule, season, "garden", {})
        for zone in data.zones:
            if zone.is_enclosed:
                for rule in GREENHOUSE_RULES:
                    add_rule(rule, season, zone.id, {"zone": zone.name}, zone.id)
            elif zone.type.value in ("orchard", "fruit") and _zone_has_plants(data, zone.id):
                for rule in ORCHARD_RULES:
                    add_rule(rule, season, zone.id, {"zone": zone.name}, zone.id)

    # -- perennials -------------------------------------------------------- #
    seen: set[str] = set()
    for planting in data.plantings:
        plant = db.get(planting.plant_id)
        bed = data.bed(planting.bed_id)
        if plant is None or bed is None or not plant.perennial or planting.status is PlantingStatus.FAILED:
            continue
        if planting.status is PlantingStatus.FINISHED:
            continue
        for tag, ttype, anchor, week, minutes, rid in PERENNIAL_RULES:
            if tag not in plant.tags:
                continue
            for season in seasons:
                if not present_in(planting, True, season):
                    continue  # not planted yet, or explicitly removed
                if season <= planting.season and tag == "divide":
                    continue
                if tag == "divide" and (season - planting.season) % 3:
                    continue
                key = f"m:{rid}:{planting.id}:{season}"
                if key in seen:
                    continue
                anchors = season_anchors(region, season)
                due = anchors.anchor(anchor) + timedelta(weeks=week)
                start, end = _window(due)
                if end < today or due > horizon:
                    continue
                seen.add(key)
                params = {"plant": plant.name(lang), "bed": bed.name, "handbook": "perennials"}
                specs.append(
                    TaskSpec(
                        key=key, type=ttype, due=max(due, today), title_key=f"maint.{rid}", title_params=params,
                        description=t(f"maint.{rid}.desc", lang, **params), window_start=start, window_end=end,
                        priority=TaskPriority.HIGH if tag == "protect_winter" else TaskPriority.LOW,
                        minutes=minutes, planting_id=planting.id, bed_id=bed.id, zone_id=bed.zone_id,
                    )
                )  # fmt: skip

    # -- bed turnover ------------------------------------------------------- #
    for bed in data.beds:
        in_bed = [p for p in data.plantings if p.bed_id == bed.id and p.id in ctx.timelines]
        in_bed = [p for p in in_bed if p.status not in (PlantingStatus.FAILED,) and not _is_perennial(db, p)]
        if not in_bed:
            continue
        tls = {p.id: ctx.timelines[p.id] for p in in_bed}
        occupied_now = [p for p in in_bed if tls[p.id].in_ground <= today <= tls[p.id].harvest_end]
        upcoming = sorted((p for p in in_bed if tls[p.id].in_ground > today), key=lambda p: tls[p.id].in_ground)
        if upcoming and not occupied_now:
            first = tls[upcoming[0].id].in_ground
            if first <= today + timedelta(days=60):
                group = [p for p in upcoming if tls[p.id].in_ground <= first + timedelta(days=21)]
                plants = [pl for pl in (db.get(p.plant_id) for p in group) if pl is not None]
                plan = bed_fertilizer_plan(bed.area_m2, plants, lang)
                due = max(first - timedelta(days=14), today)
                params = {
                    "bed": bed.name,
                    "compost": plan.compost_kg,
                    "fertilizer": plan.base_fertilizer_g,
                    "crops": ", ".join(plan.crops),
                    "handbook": "soil",
                }
                description = t("maint.soil_prep.desc", lang, **params)
                if plan.lime_check:
                    description += " " + t("maint.soil_prep.lime", lang)
                specs.append(
                    TaskSpec(
                        key=f"m:soil_prep:{bed.id}:{first.isoformat()}", type=TaskType.SOIL_PREP, due=due,
                        title_key="maint.soil_prep", title_params=params, description=description,
                        window_start=first - timedelta(days=28), window_end=first - timedelta(days=1),
                        minutes=max(20, round(bed.area_m2 * 15)), bed_id=bed.id, zone_id=bed.zone_id,
                    )
                )  # fmt: skip
        season_items = [p for p in in_bed if p.season == current]
        if season_items and not occupied_now:
            last_end = max(tls[p.id].harvest_end for p in season_items)
            next_start = tls[upcoming[0].id].in_ground if upcoming else None
            if last_end < today and (next_start is None or next_start > today + timedelta(days=45)):
                anchors = season_anchors(region, current)
                late = today > anchors.first_frost - timedelta(weeks=4)
                rid = "cover_bed" if late and not anchors.frost_free else "green_manure"
                due = max(last_end + timedelta(days=3), today)
                params = {"bed": bed.name, "handbook": "soil"}
                specs.append(
                    TaskSpec(
                        key=f"m:{rid}:{bed.id}:{current}", type=TaskType.MULCH if rid == "cover_bed" else TaskType.GREEN_MANURE,
                        due=due, title_key=f"maint.{rid}", title_params=params,
                        description=t(f"maint.{rid}.desc", lang, **params), window_start=due,
                        window_end=due + timedelta(days=14), priority=TaskPriority.LOW,
                        minutes=max(15, round(bed.area_m2 * 10)), bed_id=bed.id, zone_id=bed.zone_id,
                    )
                )  # fmt: skip
    return specs


def _is_perennial(db, planting) -> bool:
    plant = db.get(planting.plant_id)
    return bool(plant and plant.perennial)
