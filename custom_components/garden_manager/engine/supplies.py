"""Tools, materials and the season's shopping list.

* ``TOOLS`` - catalogue of garden tools and materials (EN / NL, emoji).
* ``TASK_TOOLS`` - which tools a task type needs (shown in the task dialog).
* :func:`shopping_list` - what to buy for a season, worked out from the plan:
  seed packets, young plants, compost and fertiliser, fleece and insect mesh
  for the beds that need it, canes for climbers, shade cloth for the
  greenhouse, nets and grease bands for fruit ...
"""

from __future__ import annotations

from dataclasses import asdict, dataclass
import math
from typing import TYPE_CHECKING, Any

from .fertilizer import bed_fertilizer_plan
from .geometry import plant_count
from .models import FrostTolerance, GardenData, PlantingStatus, SowMethod, TaskType, present_in
from .plantdb import PlantDatabase

if TYPE_CHECKING:
    from .analysis import GardenAnalysis

# id: (en, nl, emoji, kind)  kind = tool | material | diy
TOOLS: dict[str, tuple[str, str, str, str]] = {
    "fork": ("Digging fork / broadfork", "Spitvork / grelinette", "🔱", "tool"),
    "spade": ("Spade", "Spade", "🪏", "tool"),
    "hoe": ("Hoe", "Schoffel", "🪓", "tool"),
    "rake": ("Rake", "Hark", "🧹", "tool"),
    "trowel": ("Trowel", "Plantschepje", "🥄", "tool"),
    "dibber": ("Dibber", "Pootstok", "📍", "tool"),
    "secateurs": ("Secateurs", "Snoeischaar", "✂️", "tool"),
    "loppers": ("Loppers & pruning saw", "Takkenschaar & snoeizaag", "🪚", "tool"),
    "watering_can": ("Watering can (fine rose)", "Gieter (fijne broes)", "🚿", "tool"),
    "hose": ("Hose with spray head", "Tuinslang met sproeikop", "💦", "tool"),
    "wheelbarrow": ("Wheelbarrow", "Kruiwagen", "🛒", "tool"),
    "gloves": ("Gloves", "Handschoenen", "🧤", "tool"),
    "labels": ("Plant labels & pencil", "Plantlabels & potlood", "🏷️", "material"),
    "twine": ("Garden twine", "Plantkoord", "🧵", "material"),
    "canes": ("Canes / spirals", "Stokken / spiralen", "🎋", "material"),
    "seed_trays": ("Seed trays & pots", "Zaaibakken & potjes", "🪴", "material"),
    "seed_compost": ("Seed compost", "Zaaigrond", "🟫", "material"),
    "compost": ("Compost", "Compost", "♻️", "material"),
    "fertiliser": ("Organic fertiliser", "Organische meststof", "🌾", "material"),
    "fleece": ("Fleece", "Vliesdoek", "🌫️", "material"),
    "mesh": ("Insect mesh 0.8 mm", "Insectengaas 0,8 mm", "🕸️", "material"),
    "bird_net": ("Bird net", "Vogelnet", "🐦", "material"),
    "shade_cloth": ("Shade cloth / paint", "Schaduwdoek / -kalk", "⛱️", "material"),
    "mulch": ("Straw / grass clippings", "Stro / grasmaaisel", "🌾", "material"),
    "grease_band": ("Grease bands", "Lijmbanden", "🎗️", "material"),
    "cardboard_band": ("Corrugated cardboard band", "Golfkartonband", "📦", "diy"),
    "soft_soap": ("Soft soap", "Groene zeep", "🧼", "diy"),
    "vinegar": ("Vinegar", "Azijn", "🍶", "diy"),
    "brush": ("Soft brush on a pole", "Zachte borstel op steel", "🧽", "tool"),
    "bucket": ("Bucket / barrel with lid", "Emmer / ton met deksel", "🪣", "tool"),
    "beer_trap": ("Beer trap (jar + beer)", "Bierval (potje + bier)", "🍺", "diy"),
    "torch": ("Torch", "Zaklamp", "🔦", "tool"),
    "thermometer": ("Soil / min-max thermometer", "Grond- / min-maxthermometer", "🌡️", "tool"),
    "sticky_cards": ("Yellow sticky cards", "Gele vangplaten", "🟨", "material"),
    "oil": ("Oil & linseed oil", "Olie & lijnolie", "🫗", "material"),
    "file": ("File / sharpening stone", "Vijl / slijpsteen", "🗡️", "tool"),
    "ladder": ("Three-legged ladder", "Driepootladder", "🪜", "tool"),
    "bags": ("Bin bags (leaf mould)", "Vuilniszakken (bladaarde)", "🛍️", "material"),
    "soil_kit": ("Soil test kit", "Bodemtestkit", "🧪", "material"),
}

TASK_TOOLS: dict[TaskType, tuple[str, ...]] = {
    TaskType.SOW_INDOOR: ("seed_trays", "seed_compost", "labels", "watering_can", "thermometer"),
    TaskType.SOW_DIRECT: ("rake", "dibber", "labels", "watering_can", "twine"),
    TaskType.HARDEN_OFF: ("fleece",),
    TaskType.TRANSPLANT: ("trowel", "watering_can", "labels"),
    TaskType.THIN: ("gloves",),
    TaskType.STAKE: ("canes", "twine"),
    TaskType.TIE_IN: ("twine", "secateurs"),
    TaskType.PRUNE: ("secateurs", "loppers", "gloves"),
    TaskType.PINCH: ("secateurs",),
    TaskType.CUT_BACK: ("secateurs", "wheelbarrow"),
    TaskType.EARTH_UP: ("hoe",),
    TaskType.FEED: ("watering_can", "compost", "fertiliser"),
    TaskType.WATER: ("watering_can", "hose"),
    TaskType.WEED: ("hoe", "gloves"),
    TaskType.PEST_CHECK: ("torch", "soft_soap", "beer_trap", "sticky_cards"),
    TaskType.HARVEST: ("secateurs", "bucket"),
    TaskType.VENTILATE: ("thermometer",),
    TaskType.SHADE: ("shade_cloth",),
    TaskType.FROST_PROTECT: ("fleece",),
    TaskType.PROTECT: ("fleece", "mesh", "bird_net"),
    TaskType.SOIL_PREP: ("fork", "rake", "compost", "wheelbarrow"),
    TaskType.COMPOST: ("fork", "wheelbarrow"),
    TaskType.GREEN_MANURE: ("rake",),
    TaskType.MULCH: ("mulch", "wheelbarrow"),
    TaskType.CLEAN_GREENHOUSE: ("brush", "soft_soap", "vinegar", "bucket", "hose"),
    TaskType.CLEAN: ("brush", "soft_soap", "bucket"),
    TaskType.WINTER_PREP: ("fleece", "wheelbarrow"),
    TaskType.TOOL_CARE: ("file", "oil", "brush"),
    TaskType.SOIL_TEST: ("spade", "soil_kit", "bucket"),
    TaskType.DIVIDE: ("spade", "fork"),
    TaskType.THIN_FRUIT: ("secateurs",),
    TaskType.POLLINATE: (),
    TaskType.CHECK: (),
    TaskType.MAKE_FEED: ("bucket", "gloves"),
    TaskType.PLAN_SEASON: ("labels",),
}

TALL_HABITS = {"climbing", "vine"}
MESH_FAMILIES = {"Brassicaceae", "Apiaceae", "Amaryllidaceae"}


@dataclass(slots=True)
class ShoppingItem:
    id: str
    name: str
    emoji: str
    quantity: float
    unit: str
    reason: str
    category: str  # seeds | plants | soil | protection | support | other

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


def tool_name(tool_id: str, lang: str) -> str:
    entry = TOOLS.get(tool_id)
    if entry is None:
        return tool_id
    return entry[1] if lang == "nl" else entry[0]


def catalog(lang: str) -> dict[str, Any]:
    return {
        "tools": {k: {"name": tool_name(k, lang), "emoji": v[2], "kind": v[3]} for k, v in TOOLS.items()},
        "task_tools": {k.value: list(v) for k, v in TASK_TOOLS.items()},
    }


def shopping_list(
    data: GardenData, db: PlantDatabase, analysis: GardenAnalysis, lang: str = "en"
) -> list[ShoppingItem]:
    season = analysis.season
    nl = lang == "nl"
    items: list[ShoppingItem] = []

    def add(tool: str, qty: float, unit: str, reason: str, category: str, name: str | None = None) -> None:
        if qty <= 0:
            return
        plant = db.get(tool)
        emoji = plant.emoji if plant is not None and plant.emoji else TOOLS.get(tool, ("", "", "🛒", ""))[2]
        items.append(ShoppingItem(tool, name or tool_name(tool, lang), emoji,
                                  round(qty, 1), unit, reason, category))  # fmt: skip

    this_season = [
        (p, plant)
        for p in data.plantings
        if (plant := db.get(p.plant_id)) is not None
        and present_in(p, plant.perennial, season)
        and p.status is not PlantingStatus.FAILED
    ]
    new = [(p, pl) for p, pl in this_season if p.season == season and p.status is PlantingStatus.PLANNED]

    # Seeds and young plants
    seeds: dict[str, int] = {}
    young: dict[str, int] = {}
    indoor = 0
    for p, plant in new:
        count = plant_count(p, plant)
        if p.method is SowMethod.TRANSPLANT or plant.perennial:
            young[plant.id] = young.get(plant.id, 0) + count
        else:
            seeds[plant.id] = seeds.get(plant.id, 0) + 1
            if p.method is SowMethod.INDOOR_SOW:
                indoor += count
    for pid in sorted(seeds, key=lambda i: db.get(i).name(lang)):  # type: ignore[union-attr]
        plant = db.get(pid)
        add(pid, 1, "zakje" if nl else "packet", "zaad" if nl else "seed", "seeds", plant.name(lang) if plant else pid)
    for pid, count in sorted(young.items()):
        plant = db.get(pid)
        add(pid, count, "st." if nl else "pcs", "plantgoed" if nl else "young plants", "plants",
            plant.name(lang) if plant else pid)  # fmt: skip
    if indoor:
        add(
            "seed_compost",
            math.ceil(indoor * 0.15),
            "l",
            ("voor {n} voorgezaaide planten" if nl else "for {n} plants raised indoors").format(n=indoor),
            "soil",
        )
        add(
            "seed_trays",
            math.ceil(indoor / 24),
            "st." if nl else "pcs",
            ("zaaibakken met 24 cellen" if nl else "trays of 24 cells"),
            "soil",
        )

    # Soil
    compost = fert = 0.0
    beds_used: dict[str, list] = {}
    for p, plant in this_season:
        beds_used.setdefault(p.bed_id, []).append((p, plant))

    def open_zone(bed_id: str) -> bool:
        bed = data.bed(bed_id)
        zone = data.zone(bed.zone_id) if bed else None
        return bool(zone and zone.type.value in ("orchard", "fruit"))

    def cultivated_m2(bed_id: str, group: list) -> float:
        """Orchards and fruit corners: only the planted area counts, not the grass around it."""
        bed = data.bed(bed_id)
        if bed is None:
            return 0.0
        if open_zone(bed_id):
            return min(bed.area_m2, sum(p.width_cm * p.length_cm / 10_000 for p, _pl in group))
        return bed.area_m2

    for bed_id, group in beds_used.items():
        bed = data.bed(bed_id)
        if bed is None:
            continue
        plan = bed_fertilizer_plan(cultivated_m2(bed_id, group), [pl for _p, pl in group], lang)
        compost += plan.compost_kg
        fert += plan.base_fertilizer_g
    add("compost", compost, "kg", "bemesting volgens je plan" if nl else "feeding for your plan", "soil")
    add("fertiliser", fert / 1000, "kg", "zware eters" if nl else "hungry crops", "soil")

    # Protection
    fleece = mesh = 0.0
    for bed_id, group in beds_used.items():
        bed = data.bed(bed_id)
        zone = data.zone(bed.zone_id) if bed else None
        if bed is None or (zone and zone.is_enclosed):
            continue
        if any(pl.frost_tolerance is FrostTolerance.TENDER or "early" in pl.tags for _p, pl in group):
            fleece += bed.area_m2 * 1.3
        if any(pl.family in MESH_FAMILIES and pl.category.value == "vegetable" for _p, pl in group):
            mesh += bed.area_m2 * 1.4
    add("fleece", fleece, "m²", "vorst en vroege teelt" if nl else "frost and early crops", "protection")
    add("mesh", mesh, "m²", "kolen, wortelen, uien" if nl else "brassicas, carrots, onions", "protection")
    fruit = [(p, pl) for p, pl in this_season if pl.category.value == "fruit"]
    net = sum(p.width_cm * p.length_cm / 10_000 for p, pl in fruit if any(r.task is TaskType.PROTECT for r in pl.care))
    add("bird_net", net * 1.5, "m²", "fruit tegen vogels" if nl else "fruit against birds", "protection")
    trees = sum(1 for _p, pl in fruit if "fruit_tree" in pl.tags)
    add("grease_band", trees, "st." if nl else "pcs", "wintervlinder" if nl else "winter moth", "protection")
    add("cardboard_band", trees, "st." if nl else "pcs", "fruitmot" if nl else "codling moth", "protection")
    for zone in data.zones:
        if zone.is_enclosed:
            add("shade_cloth", zone.width_cm * zone.length_cm / 10_000 * 1.2, "m²", zone.name, "protection")
            add(
                "sticky_cards",
                max(2, round(zone.width_cm * zone.length_cm / 10_000)),
                "st." if nl else "pcs",
                zone.name,
                "protection",
            )

    # Support and mulch
    canes = sum(plant_count(p, pl) for p, pl in this_season
                if pl.habit.value in TALL_HABITS and pl.category.value == "vegetable" and p.season == season)  # fmt: skip
    add("canes", canes, "st." if nl else "pcs", "klimmers en tomaten" if nl else "climbers and tomatoes", "support")
    area = sum(cultivated_m2(b, g) for b, g in beds_used.items())
    add("mulch", area, "m²", "5-8 cm mulch", "support")
    add("labels", len(new), "st." if nl else "pcs", "één per teelt" if nl else "one per crop", "other")
    order = {"seeds": 0, "plants": 1, "soil": 2, "protection": 3, "support": 4, "other": 5}
    items.sort(key=lambda i: order.get(i.category, 9))
    return items
