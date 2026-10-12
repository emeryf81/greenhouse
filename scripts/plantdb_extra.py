"""Phase 3 additions to the plant database: fruit trees & bushes, more
vegetables, herbs, flowers and green manures, plus per-plant icon, colour,
emoji, pollination and ecological tips for *every* plant.

Imported by ``build_plantdb.py``; keeps that file readable.  Care rules use
the frost anchors (``last_frost`` / ``first_frost``) so perennials get a
fresh, correctly timed yearly schedule (winter pruning, summer pruning, fruit
thinning, netting, mulching ...).
"""

from __future__ import annotations

from typing import Any

# Re-use the helpers of the main builder (imported lazily to avoid a cycle).
from build_plantdb import FF, GH, PROFILES, P, W, care

LF, FFA = "last_frost", "first_frost"


def tip(en: str, nl: str) -> tuple[str, str]:
    return (en, nl)


def tips(*pairs: tuple[str, str]) -> dict[str, list[str]]:
    return {"en": [p[0] for p in pairs], "nl": [p[1] for p in pairs]}


# --------------------------------------------------------------------------- #
# Profiles
# --------------------------------------------------------------------------- #
_PERENNIAL_FRUIT: dict[str, Any] = {
    "category": "fruit",
    "perennial": True,
    "sowing_depth_cm": 0,
    "germination_days": [0, 0],
    "min_soil_temp_c": 4,
    "optimal_soil_temp_c": 15,
    "maturity_from": "transplant",
    "harvest_duration_days": 30,
    # Bare-root planting: late autumn to early spring.
    "sowing": {"transplant": [FF(2, 10), W(-12, -3)]},
    "greenhouse": GH["no"](-20, 30),
    "frost_tolerance": "very_hardy",
    "min_temp_c": -20,
    "max_temp_c": 32,
    "rotation_years": 0,
    "water_needs": "medium",
    "nutrient_needs": "medium",
    "kc": [0.5, 0.95, 0.75],
    "npk": [1, 1, 2],
    "pollination": "insects",
    "tags": ["perennial", "fruit"],
}

PROFILES["fruit_tree"] = {
    **_PERENNIAL_FRUIT,
    "habit": "upright",
    "spacing_cm": 400,
    "row_spacing_cm": 500,
    "days_to_maturity": [730, 1460],
    "height_cm": 400,
    "root_depth_cm": 150,
    "plants_per_person": 0.25,
    "yield_kg_m2": 2,
    "years_to_bearing": 3,
    "pollination": "partner",
    "tags": ["perennial", "fruit", "fruit_tree"],
}
PROFILES["fruit_bush"] = {
    **_PERENNIAL_FRUIT,
    "habit": "bush",
    "spacing_cm": 150,
    "row_spacing_cm": 180,
    "days_to_maturity": [365, 730],
    "height_cm": 150,
    "root_depth_cm": 50,
    "plants_per_person": 0.5,
    "yield_kg_m2": 1.5,
    "years_to_bearing": 2,
    "tags": ["perennial", "fruit", "fruit_bush"],
}
PROFILES["cane_fruit"] = {
    **_PERENNIAL_FRUIT,
    "habit": "climbing",
    "spacing_cm": 50,
    "row_spacing_cm": 180,
    "days_to_maturity": [365, 450],
    "height_cm": 180,
    "root_depth_cm": 40,
    "plants_per_person": 2,
    "yield_kg_m2": 1.2,
    "years_to_bearing": 1,
    "water_needs": "high",
    "tags": ["perennial", "fruit", "cane_fruit"],
}
PROFILES["vine_fruit"] = {
    **_PERENNIAL_FRUIT,
    "habit": "climbing",
    "spacing_cm": 150,
    "row_spacing_cm": 200,
    "days_to_maturity": [730, 1095],
    "height_cm": 250,
    "root_depth_cm": 120,
    "plants_per_person": 0.5,
    "yield_kg_m2": 2,
    "years_to_bearing": 3,
    "tags": ["perennial", "fruit", "vine_fruit"],
}
PROFILES["green_manure"] = {
    **PROFILES["flower_companion"],
    "spacing_cm": 3,
    "row_spacing_cm": 12,
    "sowing": {"direct_sow": [W(2, 14), FF(-10, -4)]},
    "frost_tolerance": "hardy",
    "harvest_duration_days": 60,
    "tags": ["green_manure"],
}

# --------------------------------------------------------------------------- #
# Reusable yearly care for woody fruit (frost-anchored, weeks -> days)
# --------------------------------------------------------------------------- #
WK = 7


def winter_prune(en: str, nl: str, week: int = -10, minutes: int = 30) -> dict[str, Any]:
    return care("prune", week * WK, anchor=LF, minutes=minutes, en=en, nl=nl)


def summer_prune(en: str, nl: str, week: int = 12, minutes: int = 30) -> dict[str, Any]:
    return care("prune", week * WK, anchor=LF, minutes=minutes, en=en, nl=nl)


def spring_feed(en: str = "", nl: str = "", week: int = -3) -> dict[str, Any]:
    return care(
        "feed", week * WK, anchor=LF, minutes=15,
        en=en or "Spread 3-5 l compost per m² under the canopy plus a handful of wood ash (potassium); keep it off the trunk.",
        nl=nl or "Strooi 3-5 l compost per m² onder de kroon plus een handvol houtas (kalium); niet tegen de stam.",
    )  # fmt: skip


def mulch_ring(week: int = 2) -> dict[str, Any]:
    return care(
        "mulch", week * WK, anchor=LF, minutes=20,
        en="Mulch a 1 m ring with grass clippings, straw or wood chips (5-8 cm) - keeps moisture in and weeds out.",
        nl="Mulch een ring van 1 m met grasmaaisel, stro of houtsnippers (5-8 cm) - houdt vocht vast en onkruid weg.",
    )  # fmt: skip


def net_birds(week_before_harvest: int = 3) -> dict[str, Any]:
    return care(
        "protect", -week_before_harvest * WK, anchor="harvest_start", minutes=20,
        en="Net against birds before the fruit colours (fine mesh, pegged to the ground so no bird gets trapped).",
        nl="Net tegen vogels voor de vruchten kleuren (fijne maas, vastgepind zodat geen vogel vast komt te zitten).",
    )  # fmt: skip


def thin_fruit(week: int = 9) -> dict[str, Any]:
    return care(
        "thin_fruit", week * WK, anchor=LF, minutes=30,
        en="After the June drop: thin to 1-2 fruits per cluster, 10-15 cm apart. Bigger fruit, no biennial bearing.",
        nl="Na de junirui: dun uit tot 1-2 vruchten per tros, 10-15 cm uit elkaar. Grotere vruchten, geen beurtjaren.",
    )  # fmt: skip


def codling_check(week: int = 6) -> dict[str, Any]:
    return care(
        "pest_check", week * WK, 14, week * WK + 70, anchor=LF, minutes=10,
        en="Check for codling moth / aphids. Eco: corrugated cardboard band round the trunk (remove & burn in autumn), "
           "encourage tits with a nest box, spray aphids with a soft soap solution (20 g/l).",
        nl="Controleer op fruitmot / bladluis. Ecologisch: golfkartonband rond de stam (in de herfst verwijderen), "
           "nestkastje voor mezen, bladluis bespuiten met zachte zeep (20 g/l).",
    )  # fmt: skip


def leaf_cleanup(minutes: int = 30) -> dict[str, Any]:
    return care(
        "clean", 2 * WK, anchor=FFA, minutes=minutes,
        en="Rake up fallen leaves and mummified fruit (scab and brown rot overwinter on them); compost healthy leaves only.",
        nl="Hark gevallen bladeren en mummievruchten op (schurft en moniliarot overwinteren erop); composteer enkel gezond blad.",
    )  # fmt: skip


def water_young(minutes: int = 15) -> dict[str, Any]:
    return care(
        "water", 6 * WK, 10, 20 * WK, anchor=LF, minutes=minutes,
        en="Young trees & bushes (first 2 years): 20-30 l per plant every 10 days in dry spells - one deep soak beats daily sips.",
        nl="Jonge bomen & struiken (eerste 2 jaar): 20-30 l per plant om de 10 dagen bij droogte - één keer diep is beter dan dagelijks een beetje.",
    )  # fmt: skip


def tie_in(week: int = 8, interval: int | None = 21, end_week: int | None = 20) -> dict[str, Any]:
    return care(
        "tie_in", week * WK, interval, end_week * WK if end_week else None, anchor=LF, minutes=15,
        en="Tie in new shoots loosely (figure-of-eight, soft string or old tights).",
        nl="Bind nieuwe scheuten losjes aan (in een acht, zacht touw of een oude panty).",
    )  # fmt: skip


TREE_CARE = [
    spring_feed(),
    mulch_ring(),
    codling_check(),
    thin_fruit(),
    water_young(),
    leaf_cleanup(),
]
# Cherries, plums & co. are not thinned.
STONE_CARE = [r for r in TREE_CARE if r["task"] != "thin_fruit"]
BUSH_CARE = [
    spring_feed(
        "Mulch with 5 cm compost and a handful of wood ash or comfrey leaves (potassium for fruit).",
        "Mulch met 5 cm compost en een handvol houtas of smeerwortelblad (kalium voor de vruchten).",
    ),
    mulch_ring(4),
    water_young(),
    net_birds(),
]


def tree(pid: str, en: str, nl: str, sci: str, fam: str, harvest: list[dict[str, Any]], prune_en: str, prune_nl: str,
         summer_en: str = "", summer_nl: str = "", **kw: Any) -> None:  # fmt: skip
    rules = [winter_prune(prune_en, prune_nl)]
    if summer_en:
        rules.append(summer_prune(summer_en, summer_nl))
    rules.extend(kw.pop("care", TREE_CARE))
    P(pid, en, nl, sci, fam, "fruit_tree", harvest_windows=harvest, care=rules, **kw)


# --------------------------------------------------------------------------- #
# Fruit trees
# --------------------------------------------------------------------------- #
APPLE_PRUNE = (
    "Winter pruning on a dry, frost-free day: remove dead, crossing and inward-growing wood; "
    "shorten leaders by a third; keep an open goblet shape. Disinfect secateurs between trees.",
    "Wintersnoei op een droge, vorstvrije dag: verwijder dood, kruisend en naar binnen groeiend hout; "
    "kort de gesteltakken met een derde in; houd een open kroon. Ontsmet de snoeischaar tussen bomen.",
)
SUMMER_SPUR = (
    "Summer pruning (late July-August): shorten this year's side shoots to 3 leaves - promotes fruit buds, calms growth.",
    "Zomersnoei (eind juli-augustus): kort de nieuwe zijscheuten in tot 3 bladeren - geeft bloemknoppen en minder groei.",
)
tree(
    "apple",
    "Apple",
    "Appel",
    "Malus domestica",
    "Rosaceae",
    [FF(-9, 0)],
    *APPLE_PRUNE,
    *SUMMER_SPUR,
    pests=["codling_moth", "aphids", "woolly_aphid", "winter_moth"],
    diseases=["scab", "canker", "powdery_mildew", "brown_rot"],
    yield_kg_m2=2.5,
    height_cm=350,
    tips=tips(
        tip(
            "Plant a second variety (or crab apple) within 50 m that flowers at the same time.",
            "Plant een tweede ras (of sierappel) binnen 50 m dat gelijktijdig bloeit.",
        ),
        tip(
            "Scab-resistant varieties: Topaz, Santana, Rubinola, Reinette van Orleans.",
            "Schurftresistente rassen: Topaz, Santana, Rubinola, Reinette van Orleans.",
        ),
        tip(
            "Grease band around the trunk in October stops wingless winter moth females.",
            "Lijmband rond de stam in oktober houdt de vleugelloze wintervlinder-wijfjes tegen.",
        ),
        tip(
            "Horsetail tea (boil 100 g dried horsetail in 1 l water 30 min, dilute 1:5) strengthens leaves against scab.",
            "Heermoesthee (100 g gedroogde heermoes 30 min koken in 1 l water, 1:5 verdunnen) versterkt het blad tegen schurft.",
        ),
    ),
)
tree(
    "pear",
    "Pear",
    "Peer",
    "Pyrus communis",
    "Rosaceae",
    [FF(-10, -3)],
    *APPLE_PRUNE,
    *SUMMER_SPUR,
    pests=["pear_midge", "aphids", "pear_psylla"],
    diseases=["pear_rust", "scab", "fireblight"],
    tips=tips(
        tip(
            "Pick pears slightly unripe and let them ripen indoors; they go mealy on the tree.",
            "Pluk peren licht onrijp en laat ze binnen narijpen; aan de boom worden ze melig.",
        ),
        tip(
            "Pear rust lives on juniper in winter - avoid Juniperus nearby.",
            "Perenroest overwintert op jeneverbes - vermijd Juniperus in de buurt.",
        ),
        tip(
            "Good pollinator pairs: Conference with Doyenné du Comice or Beurré Hardy.",
            "Goede bestuiverparen: Conference met Doyenné du Comice of Beurré Hardy.",
        ),
    ),
)
STONE_PRUNE = (
    "Stone fruit: prune only in leaf (after harvest, July-August) - winter cuts let in silver leaf and canker. "
    "Thin out old wood, keep the centre open.",
    "Steenvruchten: enkel snoeien in blad (na de oogst, juli-augustus) - wintersnoei laat loodglans en kanker binnen. "
    "Dun oud hout uit, houd het hart open.",
)


def stone_tree(pid: str, en: str, nl: str, sci: str, harvest: list[dict[str, Any]], **kw: Any) -> None:
    rules = [summer_prune(*STONE_PRUNE, week=kw.pop("prune_week", 14))]
    rules.extend(kw.pop("care", STONE_CARE))
    P(pid, en, nl, sci, "Rosaceae", "fruit_tree", harvest_windows=harvest, care=rules, **kw)


stone_tree(
    "plum",
    "Plum",
    "Pruim",
    "Prunus domestica",
    [FF(-12, -7)],
    pollination="self",
    pests=["plum_moth", "aphids", "wasps"],
    diseases=["brown_rot", "silver_leaf"],
    tips=tips(
        tip(
            "Self-fertile varieties: Victoria, Reine Claude d'Oullins, Opal.",
            "Zelfbestuivende rassen: Victoria, Reine Claude d'Oullins, Opal.",
        ),
        tip(
            "Prop heavily laden branches - plum wood snaps easily.",
            "Stut zwaar beladen takken - pruimenhout breekt makkelijk.",
        ),
    ),
)
stone_tree(
    "sweet_cherry",
    "Sweet cherry",
    "Zoete kers",
    "Prunus avium",
    [W(8, 11)],
    pollination="partner",
    care=[*STONE_CARE, net_birds(4)],
    pests=["cherry_fruit_fly", "spotted_wing_drosophila", "birds", "black_cherry_aphid"],
    diseases=["brown_rot", "bacterial_canker"],
    height_cm=500,
    tips=tips(
        tip(
            "Choose a self-fertile variety (Stella, Lapins, Sunburst) on a dwarfing Gisela 5 rootstock for small gardens.",
            "Kies een zelfbestuivend ras (Stella, Lapins, Sunburst) op zwakke onderstam Gisela 5 voor kleine tuinen.",
        ),
        tip(
            "Hang yellow sticky traps in May against cherry fruit fly.",
            "Hang in mei gele vangplaten tegen de kersenvlieg.",
        ),
    ),
)
stone_tree(
    "sour_cherry",
    "Sour cherry (morello)",
    "Zure kers (morel)",
    "Prunus cerasus",
    [W(11, 15)],
    pollination="self",
    care=[*STONE_CARE, net_birds(3)],
    pests=["birds", "black_cherry_aphid"],
    diseases=["brown_rot", "monilia"],
    height_cm=300,
    tips=tips(
        tip(
            "Morellos fruit on last year's wood and tolerate a north wall - ideal for a shady fence.",
            "Morellen dragen op éénjarig hout en verdragen een noordmuur - ideaal tegen een schaduwrijke schutting.",
        ),
        tip(
            "Cut out shoots with monilia (wilted tips) 15 cm into healthy wood at once.",
            "Knip scheuten met monilia (verwelkte toppen) meteen 15 cm in het gezonde hout weg.",
        ),
    ),
)
stone_tree(
    "peach",
    "Peach",
    "Perzik",
    "Prunus persica",
    [FF(-12, -8)],
    pollination="self",
    care=[
        care(
            "protect",
            -12 * WK,
            anchor=LF,
            minutes=20,
            en="Cover with a rain shelter (plastic roof) from leaf fall until mid-spring: peach leaf curl needs wet buds.",
            nl="Overkap met een regendakje van bladval tot half voorjaar: krulziekte heeft natte knoppen nodig.",
        ),
        *TREE_CARE,
    ],
    diseases=["peach_leaf_curl", "brown_rot"],
    pests=["aphids"],
    height_cm=300,
    tips=tips(
        tip(
            "Hand-pollinate early blossom with a soft brush - few insects fly in March.",
            "Bestuif de vroege bloei met een zacht penseel - in maart vliegen weinig insecten.",
        ),
        tip(
            "Curl-resistant: Amsden, Redhaven, 'Avalon Pride'.",
            "Krulziekte-resistent: Amsden, Redhaven, 'Avalon Pride'.",
        ),
    ),
)
stone_tree(
    "apricot",
    "Apricot",
    "Abrikoos",
    "Prunus armeniaca",
    [W(12, 15)],
    pollination="self",
    care=[
        care(
            "protect",
            -8 * WK,
            anchor=LF,
            minutes=15,
            en="Throw fleece over the early blossom on frosty nights.",
            nl="Leg vliesdoek over de vroege bloei bij vriesnachten.",
        ),
        *TREE_CARE,
    ],
    diseases=["brown_rot", "bacterial_canker"],
    height_cm=300,
    tips=tips(
        tip(
            "Plant against a warm south wall; it flowers before the bees fly.",
            "Plant tegen een warme zuidmuur; ze bloeit vóór de bijen vliegen.",
        )
    ),
)
P(
    "fig",
    "Fig",
    "Vijg",
    "Ficus carica",
    "Moraceae",
    "fruit_tree",
    harvest_windows=[FF(-10, -4)],
    years_to_bearing=2,
    pollination="self",
    frost_tolerance="hardy",
    min_temp_c=-12,
    spacing_cm=300,
    height_cm=300,
    greenhouse=GH["cond"](-5, 35, 2),
    care=[
        care(
            "prune",
            -4 * WK,
            anchor=LF,
            minutes=20,
            en="Remove frost-damaged and crossing shoots; rub off fruits larger than a pea (they never ripen).",
            nl="Verwijder bevroren en kruisende scheuten; wrijf vruchtjes groter dan een erwt weg (die rijpen nooit).",
        ),
        care(
            "pinch",
            10 * WK,
            anchor=LF,
            minutes=10,
            en="Pinch new shoots back to 5 leaves - the embryo figs at the tip ripen next year.",
            nl="Knip nieuwe scheuten terug tot 5 bladeren - de embryovijgjes in de top rijpen volgend jaar.",
        ),
        care(
            "protect",
            0,
            anchor=FFA,
            minutes=20,
            en="Young figs: wrap the crown in fleece and mulch the roots thickly with straw.",
            nl="Jonge vijgen: kroon in vliesdoek wikkelen en de voet dik afdekken met stro.",
        ),
        mulch_ring(),
    ],
    pests=["birds", "wasps"],
    diseases=["botrytis"],
    tags=["perennial", "fruit", "fruit_tree", "protect_winter"],
    tips=tips(
        tip(
            "Restrict the roots (slabs in the planting hole or a large pot) for fruit instead of leaves.",
            "Beperk de wortels (tegels in het plantgat of een grote pot) voor vruchten i.p.v. bladeren.",
        )
    ),
)
tree(
    "quince",
    "Quince",
    "Kweepeer",
    "Cydonia oblonga",
    "Rosaceae",
    [FF(-4, 1)],
    "Light pruning only: remove dead, crossing and congested wood.",
    "Enkel licht snoeien: dood, kruisend en te dicht hout weg.",
    pollination="self",
    diseases=["quince_leaf_blight", "brown_rot"],
    tips=tips(
        tip(
            "Store quinces apart - their perfume taints apples and pears.",
            "Bewaar kweeperen apart - hun geur trekt in appels en peren.",
        )
    ),
)
tree(
    "medlar",
    "Medlar",
    "Mispel",
    "Mespilus germanica",
    "Rosaceae",
    [FF(2, 6)],
    "Minimal pruning: thin crowded branches in winter.",
    "Weinig snoei: dun te dichte takken uit in de winter.",
    pollination="self",
    height_cm=300,
    pests=["winter_moth"],
    tips=tips(
        tip(
            "Harvest after the first frost and let them 'blet' (soften) for 2-3 weeks indoors.",
            "Oogst na de eerste vorst en laat ze 2-3 weken binnen 'beten' (zacht worden).",
        )
    ),
)
tree(
    "hazelnut",
    "Hazelnut",
    "Hazelaar",
    "Corylus avellana",
    "Betulaceae",
    [FF(-8, -4)],
    "Remove suckers and the oldest stems (coppice 1/5 of the stems each winter).",
    "Verwijder wortelopslag en de oudste stammen (zet elk jaar 1/5 van de stammen af).",
    pollination="wind",
    care=[mulch_ring(), leaf_cleanup()],
    pests=["nut_weevil", "squirrels"],
    height_cm=400,
    tips=tips(
        tip(
            "Wind-pollinated: plant two varieties (e.g. Cosford + Webb's Prize) for nuts.",
            "Windbestuiving: plant twee rassen (bv. Cosford + Webb's Prize) voor noten.",
        )
    ),
)
P(
    "mulberry",
    "Black mulberry",
    "Zwarte moerbei",
    "Morus nigra",
    "Moraceae",
    "fruit_tree",
    harvest_windows=[W(12, 17)],
    years_to_bearing=4,
    pollination="self",
    height_cm=500,
    care=[
        winter_prune(
            "Prune lightly in mid-winter only (it bleeds sap from spring).",
            "Enkel licht snoeien in hartje winter (vanaf het voorjaar bloedt hij).",
        ),
        mulch_ring(),
    ],
    tips=tips(
        tip(
            "Spread a sheet under the tree and shake: ripe mulberries drop.",
            "Leg een laken onder de boom en schud: rijpe moerbeien vallen.",
        )
    ),
)

# --------------------------------------------------------------------------- #
# Soft fruit bushes
# --------------------------------------------------------------------------- #
CURRANT_PRUNE = (
    "Prune in winter: keep 8-10 stems, remove wood older than 3 years and anything lying on the ground; "
    "shorten side shoots to 2 buds (red/white currant).",
    "Snoei in de winter: houd 8-10 takken, verwijder hout ouder dan 3 jaar en alles wat op de grond ligt; "
    "kort zijscheuten in tot 2 knoppen (rode/witte bes).",
)


def bush(pid: str, en: str, nl: str, sci: str, fam: str, harvest: list[dict[str, Any]], prune: tuple[str, str],
         **kw: Any) -> None:  # fmt: skip
    rules = [winter_prune(*prune, week=kw.pop("prune_week", -8), minutes=20)]
    rules.extend(kw.pop("care", BUSH_CARE))
    rules.extend(kw.pop("extra_care", []))
    P(pid, en, nl, sci, fam, "fruit_bush", harvest_windows=harvest, care=rules, **kw)


bush(
    "redcurrant",
    "Redcurrant",
    "Rode bes",
    "Ribes rubrum",
    "Grossulariaceae",
    [W(9, 13)],
    CURRANT_PRUNE,
    pollination="self",
    pests=["birds", "currant_blister_aphid", "gooseberry_sawfly"],
    diseases=["leaf_spot"],
    extra_care=[
        summer_prune(
            "Summer: shorten new side shoots to 5 leaves after harvest.",
            "Zomer: kort nieuwe zijscheuten in tot 5 bladeren na de oogst.",
            week=13,
            minutes=15,
        )
    ],
    tips=tips(
        tip("Pick whole strings and strip berries with a fork.", "Pluk hele trosjes en ris de bessen af met een vork."),
        tip(
            "Tolerates half shade - perfect for a north-facing fence.",
            "Verdraagt halfschaduw - ideaal tegen een noordschutting.",
        ),
    ),
)
bush(
    "whitecurrant",
    "Whitecurrant",
    "Witte bes",
    "Ribes rubrum (white)",
    "Grossulariaceae",
    [W(9, 13)],
    CURRANT_PRUNE,
    pollination="self",
    pests=["birds", "currant_blister_aphid"],
    tips=tips(tip("Sweeter than red currant - lovely fresh.", "Zoeter dan rode bes - heerlijk vers.")),
)
bush(
    "blackcurrant",
    "Blackcurrant",
    "Zwarte bes",
    "Ribes nigrum",
    "Grossulariaceae",
    [W(10, 13)],
    (
        "Fruits on young wood: cut a third of the oldest stems to the ground each winter.",
        "Draagt op jong hout: zaag elk jaar een derde van de oudste takken vlak bij de grond af.",
    ),
    pollination="insects",
    pests=["big_bud_mite", "aphids", "birds"],
    diseases=["powdery_mildew", "leaf_spot"],
    nutrient_needs="high",
    tips=tips(
        tip(
            "Plant 5 cm deeper than in the pot: new shoots come from below ground.",
            "Plant 5 cm dieper dan in de pot: nieuwe scheuten komen van onder de grond.",
        ),
        tip(
            "Pick off swollen round buds (big bud mite) in winter and burn them.",
            "Pluk dikke ronde knoppen (rondknopmijt) in de winter af en vernietig ze.",
        ),
    ),
)
bush(
    "gooseberry",
    "Gooseberry",
    "Kruisbes",
    "Ribes uva-crispa",
    "Grossulariaceae",
    [W(8, 12)],
    (
        "Open the centre (goblet shape) and shorten side shoots to 2 buds - picking without scratches.",
        "Maak het hart open (kelkvorm) en kort zijscheuten in tot 2 knoppen - plukken zonder krassen.",
    ),
    pollination="self",
    pests=["gooseberry_sawfly", "birds"],
    diseases=["american_gooseberry_mildew"],
    extra_care=[
        care(
            "pest_check",
            4 * WK,
            7,
            10 * WK,
            anchor=LF,
            minutes=10,
            en="Look for sawfly larvae in the centre of the bush (holes in leaves); pick them off.",
            nl="Zoek bladwesplarven in het hart van de struik (gaatjes in blad); pluk ze weg.",
        )
    ],
    tips=tips(
        tip("Mildew-resistant: Invicta, Hinnonmäki Röd, Pax.", "Meeldauwresistent: Invicta, Hinnonmäki Röd, Pax.")
    ),
)
bush(
    "jostaberry",
    "Jostaberry",
    "Jostabes",
    "Ribes × nidigrolaria",
    "Grossulariaceae",
    [W(10, 13)],
    (
        "Thin out the oldest stems; vigorous - give it 2 m.",
        "Dun de oudste takken uit; groeikrachtig - geef 2 m ruimte.",
    ),
    pollination="self",
    spacing_cm=200,
    pests=["birds"],
    tips=tips(
        tip(
            "Resistant to mildew and big bud mite - a carefree blackcurrant.",
            "Resistent tegen meeldauw en rondknopmijt - een zorgeloze zwarte bes.",
        )
    ),
)
bush(
    "blueberry",
    "Blueberry",
    "Blauwe bes",
    "Vaccinium corymbosum",
    "Ericaceae",
    [W(11, 17)],
    ("From year 4: remove 1-2 of the oldest stems; never lime.", "Vanaf jaar 4: 1-2 oudste takken weg; nooit kalken."),
    pollination="partner",
    nutrient_needs="low",
    water_needs="high",
    years_to_bearing=2,
    care=[
        care(
            "feed",
            -2 * WK,
            anchor=LF,
            minutes=10,
            en="Acid feed only: pine needle or bark mulch, coffee grounds; water with rain water (pH 4.5-5.5).",
            nl="Enkel zure voeding: dennennaalden- of schorsmulch, koffiedik; geef regenwater (pH 4,5-5,5).",
        ),
        water_young(),
        net_birds(),
    ],
    pests=["birds"],
    tags=["perennial", "fruit", "fruit_bush", "container", "acid_soil"],
    tips=tips(
        tip(
            "Needs acid soil: plant in a big hole or tub filled with peat-free ericaceous compost.",
            "Heeft zure grond nodig: plant in een groot gat of kuip met turfvrije rhododendronaarde.",
        ),
        tip("Plant two varieties for a much bigger crop.", "Plant twee rassen voor een veel grotere oogst."),
    ),
)
bush(
    "honeyberry",
    "Honeyberry (haskap)",
    "Honingbes",
    "Lonicera caerulea",
    "Caprifoliaceae",
    [W(4, 7)],
    ("Little pruning: thin out old wood after year 5.", "Weinig snoei: dun oud hout uit na jaar 5."),
    pollination="partner",
    frost_tolerance="very_hardy",
    min_temp_c=-35,
    tips=tips(
        tip(
            "First fruit of the year (May-June); needs a second variety to pollinate.",
            "Eerste fruit van het jaar (mei-juni); heeft een tweede ras nodig voor bestuiving.",
        )
    ),
)
bush(
    "aronia",
    "Aronia (chokeberry)",
    "Appelbes",
    "Aronia melanocarpa",
    "Rosaceae",
    [FF(-10, -5)],
    ("Remove the oldest stems every 3-4 years.", "Verwijder elke 3-4 jaar de oudste takken."),
    pollination="self",
    care=[mulch_ring(4)],
    tips=tips(
        tip(
            "Very rich in antioxidants; best cooked or in juice. Lovely autumn colour.",
            "Zeer rijk aan antioxidanten; best gekookt of in sap. Prachtige herfstkleur.",
        )
    ),
)
bush(
    "elderberry",
    "Elderberry",
    "Vlier",
    "Sambucus nigra",
    "Viburnaceae",
    [FF(-10, -6), W(6, 9)],
    (
        "Cut out a third of old stems each winter; can be coppiced.",
        "Zet elk jaar een derde van de oude takken af; kan hakhout.",
    ),
    pollination="insects",
    spacing_cm=250,
    height_cm=350,
    care=[mulch_ring(4)],
    tips=tips(
        tip(
            "Flowers (June) for cordial, berries only cooked - raw they are mildly toxic.",
            "Bloesem (juni) voor siroop, bessen enkel gekookt - rauw zijn ze licht giftig.",
        ),
        tip(
            "Elder leaf tea sprayed on plants deters aphids and mice.",
            "Vlierbladthee op planten gespoten weert bladluis en muizen.",
        ),
    ),
)
bush(
    "goji",
    "Goji berry",
    "Gojibes",
    "Lycium barbarum",
    "Solanaceae",
    [FF(-12, -2)],
    (
        "Shorten long whips by half in late winter; keep 5-6 main stems.",
        "Kort lange twijgen met de helft in eind winter; houd 5-6 hoofdtakken.",
    ),
    pollination="self",
    water_needs="low",
    tips=tips(tip("Tolerates poor dry soil and salt wind.", "Verdraagt arme droge grond en zilte wind.")),
)
bush(
    "cranberry",
    "Cranberry",
    "Cranberry (grote veenbes)",
    "Vaccinium macrocarpon",
    "Ericaceae",
    [FF(-6, 0)],
    ("Trim runners in spring.", "Knip uitlopers in het voorjaar bij."),
    pollination="self",
    spacing_cm=40,
    row_spacing_cm=40,
    height_cm=20,
    water_needs="high",
    nutrient_needs="low",
    care=[
        care(
            "water",
            4 * WK,
            7,
            22 * WK,
            anchor=LF,
            minutes=5,
            en="Keep constantly moist with rain water.",
            nl="Altijd vochtig houden met regenwater.",
        )
    ],
    tags=["perennial", "fruit", "fruit_bush", "acid_soil", "groundcover"],
    tips=tips(
        tip("Acid, boggy soil; an evergreen ground cover.", "Zure, natte grond; een wintergroene bodembedekker.")
    ),
)
bush(
    "sea_buckthorn",
    "Sea buckthorn",
    "Duindoorn",
    "Hippophae rhamnoides",
    "Elaeagnaceae",
    [FF(-8, -3)],
    (
        "Little pruning; cut fruiting branches for easy harvest.",
        "Weinig snoei; knip vruchttakken af om makkelijk te oogsten.",
    ),
    pollination="partner",
    water_needs="low",
    nutrient_needs="low",
    spacing_cm=250,
    height_cm=300,
    tags=["perennial", "fruit", "fruit_bush", "nitrogen_fixer"],
    tips=tips(
        tip(
            "Dioecious: plant 1 male for up to 6 female plants. Fixes nitrogen.",
            "Tweehuizig: plant 1 mannelijke per 6 vrouwelijke planten. Bindt stikstof.",
        )
    ),
)

# --------------------------------------------------------------------------- #
# Cane fruit
# --------------------------------------------------------------------------- #
CANE_CARE = [
    spring_feed(),
    care(
        "mulch",
        3 * WK,
        anchor=LF,
        minutes=20,
        en="Mulch 5-8 cm (shallow roots hate drought and hoeing).",
        nl="Mulch 5-8 cm (ondiepe wortels houden niet van droogte en schoffelen).",
    ),
    tie_in(6, 21, 18),
    net_birds(2),
]
P(
    "raspberry_summer",
    "Raspberry (summer)",
    "Framboos (zomer)",
    "Rubus idaeus",
    "Rosaceae",
    "cane_fruit",
    harvest_windows=[W(9, 13)],
    pollination="insects",
    care=[
        care(
            "prune",
            14 * WK,
            anchor=LF,
            minutes=30,
            en="After harvest cut fruited canes to the ground; keep 6-8 strong new canes per metre and tie them in.",
            nl="Knip na de oogst de gedragen stengels af tot de grond; houd 6-8 sterke nieuwe per meter en bind aan.",
        ),
        *CANE_CARE,
    ],
    pests=["raspberry_beetle", "birds", "spotted_wing_drosophila"],
    diseases=["cane_blight", "botrytis"],
    tips=tips(
        tip("Wire support at 60, 120 and 170 cm.", "Draadsteun op 60, 120 en 170 cm."),
        tip(
            "Pick every 2-3 days in dry weather; pick out overripe berries against Drosophila suzukii.",
            "Pluk om de 2-3 dagen bij droog weer; verwijder overrijpe vruchten tegen Drosophila suzukii.",
        ),
    ),
)
P(
    "raspberry_autumn",
    "Raspberry (autumn)",
    "Framboos (herfst)",
    "Rubus idaeus 'Autumn Bliss'",
    "Rosaceae",
    "cane_fruit",
    harvest_windows=[FF(-11, 0)],
    pollination="insects",
    care=[
        care(
            "cut_back",
            -6 * WK,
            anchor=LF,
            minutes=20,
            en="Cut all canes to the ground in late winter - they fruit on new growth.",
            nl="Knip in eind winter alle stengels tot op de grond - ze dragen op nieuwe groei.",
        ),
        *CANE_CARE,
    ],
    pests=["raspberry_beetle", "spotted_wing_drosophila"],
    diseases=["botrytis"],
    tips=tips(
        tip(
            "The easiest raspberry: no support needed if you keep it short.",
            "De makkelijkste framboos: weinig steun nodig als je ze kort houdt.",
        )
    ),
)
P(
    "blackberry",
    "Thornless blackberry",
    "Doornloze braam",
    "Rubus fruticosus",
    "Rosaceae",
    "cane_fruit",
    harvest_windows=[FF(-12, -6)],
    pollination="insects",
    spacing_cm=250,
    height_cm=250,
    care=[
        care(
            "prune",
            -6 * WK,
            anchor=LF,
            minutes=30,
            en="Cut out the canes that fruited last year; fan-train the new canes on wires.",
            nl="Knip de stengels die vorig jaar droegen weg; leid de nieuwe in een waaier langs draden.",
        ),
        *CANE_CARE,
    ],
    pests=["spotted_wing_drosophila"],
    diseases=["botrytis"],
    tips=tips(
        tip(
            "Thornless varieties: Loch Ness, Thornfree, Triple Crown.",
            "Doornloze rassen: Loch Ness, Thornfree, Triple Crown.",
        )
    ),
)
P(
    "tayberry",
    "Tayberry",
    "Tayberry",
    "Rubus fruticosus × idaeus",
    "Rosaceae",
    "cane_fruit",
    harvest_windows=[W(10, 13)],
    pollination="self",
    spacing_cm=250,
    care=[
        care(
            "prune",
            14 * WK,
            anchor=LF,
            minutes=20,
            en="After harvest remove fruited canes; tie in the new ones.",
            nl="Verwijder na de oogst de gedragen stengels; bind de nieuwe aan.",
        ),
        *CANE_CARE,
    ],
    tips=tips(
        tip(
            "Pick when deep purple - a cross of raspberry and blackberry.",
            "Pluk als ze dieppaars zijn - een kruising van framboos en braam.",
        )
    ),
)

# --------------------------------------------------------------------------- #
# Vines
# --------------------------------------------------------------------------- #
P(
    "grape",
    "Grape (table)",
    "Druif (tafel)",
    "Vitis vinifera",
    "Vitaceae",
    "vine_fruit",
    harvest_windows=[FF(-8, -1)],
    pollination="self",
    greenhouse=GH["yes"](-15, 35, 4),
    care=[
        winter_prune(
            "Mid-winter (before sap rises): cut side shoots back to 1-2 buds on the permanent arm (spur pruning).",
            "Hartje winter (vóór de sapstroom): knip zijscheuten terug tot 1-2 ogen op de vaste arm (kortsnoei).",
        ),
        care(
            "prune",
            9 * WK,
            14,
            16 * WK,
            anchor=LF,
            minutes=20,
            en="Stop fruiting shoots 2 leaves past the bunch; remove extra shoots. Leaf thinning around bunches against mildew.",
            nl="Top vruchtscheuten 2 bladeren na de tros; verwijder extra scheuten. Blad rond de trossen weg tegen meeldauw.",
        ),
        tie_in(7, 14, 16),
        spring_feed(),
        net_birds(3),
    ],
    pests=["wasps", "birds"],
    diseases=["powdery_mildew", "downy_mildew", "botrytis"],
    tips=tips(
        tip(
            "Resistant outdoor varieties: Boskoop Glory, Phoenix, Muscat bleu, Vanessa.",
            "Resistente buitenrassen: Boskoop Glory, Phoenix, Muscat bleu, Vanessa.",
        ),
        tip("Bag bunches in organza bags against wasps.", "Steek trossen in organzazakjes tegen wespen."),
        tip(
            "A milk spray (1 part milk : 9 parts water) weekly helps against powdery mildew.",
            "Een melkspray (1 deel melk : 9 delen water) wekelijks helpt tegen echte meeldauw.",
        ),
    ),
)
P(
    "kiwi_berry",
    "Kiwi berry",
    "Kiwibes",
    "Actinidia arguta",
    "Actinidiaceae",
    "vine_fruit",
    harvest_windows=[FF(-8, -3)],
    pollination="partner",
    years_to_bearing=4,
    care=[
        winter_prune(
            "Winter: shorten fruited laterals to 3 buds beyond the last fruit; thin tangles.",
            "Winter: kort gedragen zijtakken in tot 3 ogen voorbij de laatste vrucht; ontwar de wirwar.",
        ),
        summer_prune(
            "Summer: shorten long shoots to 6-7 leaves past the fruit.",
            "Zomer: kort lange scheuten in tot 6-7 bladeren voorbij de vruchten.",
            11,
        ),
        care(
            "protect",
            -6 * WK,
            anchor=LF,
            minutes=10,
            en="Young shoots are frost-tender: fleece on frosty April nights.",
            nl="Jonge scheuten zijn vorstgevoelig: vliesdoek bij aprilvorst.",
        ),
        tie_in(6, 21, 18),
    ],
    tips=tips(
        tip(
            "Needs a male plant (1 per 6 females) unless you choose self-fertile 'Issai'.",
            "Heeft een mannelijke plant nodig (1 per 6 vrouwelijke) tenzij je zelfbestuivend 'Issai' kiest.",
        )
    ),
)

# --------------------------------------------------------------------------- #
# Low-growing fruit
# --------------------------------------------------------------------------- #
P(
    "alpine_strawberry",
    "Alpine strawberry",
    "Bosaardbei",
    "Fragaria vesca",
    "Rosaceae",
    "herb_perennial",
    category="fruit",
    spacing_cm=25,
    row_spacing_cm=25,
    height_cm=20,
    harvest_windows=[W(6, 24)],
    harvest_interval_days=4,
    years_to_bearing=0,
    pollination="self",
    frost_tolerance="very_hardy",
    sowing={"indoor_sow": [W(-10, -6)], "transplant": [W(0, 6)]},
    shade_tolerant=True,
    tags=["perennial", "fruit", "groundcover", "self_seeding", "container"],
    tips=tips(
        tip(
            "No runners - a perfect edging for paths and under fruit trees; tolerates shade.",
            "Geen uitlopers - perfecte rand langs paden en onder fruitbomen; verdraagt schaduw.",
        )
    ),
)

# --------------------------------------------------------------------------- #
# Vegetables
# --------------------------------------------------------------------------- #
P(
    "pointed_cabbage",
    "Pointed cabbage",
    "Spitskool",
    "Brassica oleracea var. capitata f. alba (conical)",
    "Brassicaceae",
    "brassica",
    days_to_maturity=[60, 80],
    spacing_cm=40,
    row_spacing_cm=50,
    sowing={"indoor_sow": [W(-8, 6)], "transplant": [W(-3, 10)]},
    yield_kg_m2=3,
    tips=tips(
        tip(
            "Fast, sweet and tender - sow every 4 weeks for a steady supply.",
            "Snel, zoet en mals - zaai elke 4 weken voor een continue aanvoer.",
        )
    ),
)
P(
    "romanesco",
    "Romanesco",
    "Romanesco",
    "Brassica oleracea var. botrytis 'Romanesco'",
    "Brassicaceae",
    "brassica",
    days_to_maturity=[75, 100],
    spacing_cm=60,
    row_spacing_cm=60,
    sowing={"indoor_sow": [W(0, 8)], "transplant": [W(5, 12)]},
    tips=tips(
        tip(
            "Needs steady moisture; any check gives small heads.",
            "Wil gelijkmatig vocht; elke stress geeft kleine roosjes.",
        )
    ),
)
P(
    "purple_sprouting_broccoli",
    "Purple sprouting broccoli",
    "Paarse broccoli (winter)",
    "Brassica oleracea var. italica",
    "Brassicaceae",
    "brassica",
    days_to_maturity=[200, 280],
    spacing_cm=60,
    row_spacing_cm=75,
    harvest_duration_days=60,
    continuous_harvest=True,
    harvest_interval_days=5,
    sowing={"indoor_sow": [W(2, 8)], "transplant": [W(7, 12)]},
    frost_tolerance="very_hardy",
    tags=["brassica", "winter", "overwinter"],
    tips=tips(
        tip(
            "Fills the 'hungry gap' in March-April. Stake against winter wind.",
            "Vult de 'hongerperiode' in maart-april. Steun tegen de winterwind.",
        )
    ),
)
P(
    "cavolo_nero",
    "Cavolo nero",
    "Palmkool",
    "Brassica oleracea var. palmifolia",
    "Brassicaceae",
    "brassica",
    days_to_maturity=[70, 90],
    spacing_cm=50,
    continuous_harvest=True,
    harvest_interval_days=7,
    harvest_duration_days=150,
    sowing={"indoor_sow": [W(-4, 8)], "transplant": [W(0, 12)]},
    frost_tolerance="very_hardy",
    tags=["brassica", "winter", "leafy"],
    tips=tips(
        tip(
            "Pick lower leaves; the plant keeps growing up like a palm until spring.",
            "Pluk de onderste bladeren; de plant groeit als een palmpje door tot het voorjaar.",
        )
    ),
)
P(
    "turnip_greens",
    "Turnip greens (raapstelen)",
    "Raapstelen",
    "Brassica rapa subsp. rapa",
    "Brassicaceae",
    "brassica_fast",
    days_to_maturity=[30, 45],
    spacing_cm=3,
    row_spacing_cm=15,
    sowing={"direct_sow": [W(-4, 2), FF(-10, -6)]},
    greenhouse=GH["yes"](0, 25, 6),
    tags=["brassica", "leafy", "quick", "succession"],
    tips=tips(
        tip(
            "Cut at 20 cm - often a second cut follows. Great under glass in late winter.",
            "Snij op 20 cm - vaak volgt een tweede snede. Prima in de serre eind winter.",
        )
    ),
)
P(
    "tatsoi",
    "Tatsoi",
    "Tatsoi",
    "Brassica rapa subsp. narinosa",
    "Brassicaceae",
    "brassica_fast",
    days_to_maturity=[40, 50],
    spacing_cm=20,
    sowing={"direct_sow": [FF(-10, -5)], "indoor_sow": [FF(-13, -9)], "transplant": [FF(-9, -5)]},
    greenhouse=GH["yes"](-2, 24, 6),
    tags=["brassica", "leafy", "winter"],
    tips=tips(tip("Sow after midsummer - spring sowings bolt.", "Zaai na de langste dag - voorjaarszaai schiet door.")),
)
P(
    "komatsuna",
    "Komatsuna",
    "Komatsuna",
    "Brassica rapa var. perviridis",
    "Brassicaceae",
    "brassica_fast",
    days_to_maturity=[35, 50],
    spacing_cm=15,
    sowing={"direct_sow": [W(-2, 4), FF(-10, -4)]},
    greenhouse=GH["yes"](-2, 26, 6),
    tags=["brassica", "leafy", "winter", "quick"],
    tips=tips(
        tip(
            "Very cold-hardy Japanese spinach mustard: winter salad under glass.",
            "Zeer winterharde Japanse spinaziemosterd: wintersla in de serre.",
        )
    ),
)
P(
    "sea_kale",
    "Sea kale",
    "Zeekool",
    "Crambe maritima",
    "Brassicaceae",
    "perennial_veg",
    harvest_windows=[W(-6, -2)],
    years_to_bearing=2,
    spacing_cm=60,
    care=[
        care(
            "protect",
            -12 * WK,
            anchor=LF,
            minutes=10,
            en="Cover crowns with an upturned bucket to blanch the shoots.",
            nl="Zet een omgekeerde emmer over de kronen om de scheuten te bleken.",
        )
    ],
    tags=["perennial", "brassica"],
    tips=tips(
        tip(
            "Blanched spring shoots taste like hazelnut-asparagus.",
            "Gebleekte voorjaarsscheuten smaken naar hazelnoot-asperge.",
        )
    ),
)
P(
    "cardoon",
    "Cardoon",
    "Kardoen",
    "Cynara cardunculus",
    "Asteraceae",
    "perennial_veg",
    harvest_windows=[FF(-6, -1)],
    years_to_bearing=1,
    spacing_cm=100,
    height_cm=180,
    pollination="insects",
    care=[
        care(
            "protect",
            -4 * WK,
            anchor=FFA,
            minutes=20,
            en="Tie the leaves together and wrap in cardboard for 3 weeks to blanch the stalks.",
            nl="Bind de bladeren samen en wikkel 3 weken in karton om de stelen te bleken.",
        )
    ],
    tags=["perennial", "pollinators", "protect_winter"],
    tips=tips(tip("Its thistle flowers are a bee magnet.", "De distelbloemen zijn een bijenmagneet.")),
)
P(
    "samphire",
    "Samphire",
    "Zeekraal",
    "Salicornia europaea",
    "Amaranthaceae",
    "leafy",
    days_to_maturity=[60, 80],
    spacing_cm=10,
    sowing={"indoor_sow": [W(-4, 0)], "transplant": [W(2, 6)]},
    tags=["leafy", "container"],
    tips=tips(
        tip(
            "Water with salted water (10 g sea salt per litre) once a week.",
            "Geef wekelijks water met zout (10 g zeezout per liter).",
        )
    ),
)
P(
    "sweet_potato",
    "Sweet potato",
    "Zoete aardappel",
    "Ipomoea batatas",
    "Convolvulaceae",
    "fruit_tender",
    habit="vine",
    spacing_cm=40,
    row_spacing_cm=90,
    days_to_maturity=[100, 130],
    continuous_harvest=False,
    sowing={"indoor_sow": [W(-8, -4)], "transplant": [W(4, 6)]},
    min_temp_c=10,
    greenhouse=GH["yes"](12, 35, 4),
    tags=["root", "storage", "greenhouse"],
    care=[],
    tips=tips(
        tip(
            "Grow from slips (sprouts) of a store tuber; black plastic mulch warms the soil.",
            "Kweek uit stekjes van een winkelknol; zwart plastic mulch verwarmt de bodem.",
        ),
        tip(
            "Cure tubers 1 week at 28 °C, then store at 13-15 °C.",
            "Laat knollen 1 week uitharden op 28 °C, bewaar bij 13-15 °C.",
        ),
    ),
)
P(
    "yacon",
    "Yacon",
    "Yacon",
    "Smallanthus sonchifolius",
    "Asteraceae",
    "fruit_tender",
    spacing_cm=80,
    row_spacing_cm=100,
    days_to_maturity=[180, 210],
    continuous_harvest=False,
    sowing={"indoor_sow": [W(-6, -3)], "transplant": [W(3, 5)]},
    height_cm=180,
    tags=["root", "storage"],
    care=[],
    tips=tips(
        tip(
            "Harvest after the first frost blackens the leaves; keep the crowns frost-free for next year.",
            "Oogst als de eerste vorst het blad zwart kleurt; bewaar de kronen vorstvrij voor volgend jaar.",
        )
    ),
)
P(
    "chickpea",
    "Chickpea",
    "Kikkererwt",
    "Cicer arietinum",
    "Fabaceae",
    "legume_warm",
    days_to_maturity=[90, 110],
    continuous_harvest=False,
    water_needs="low",
    spacing_cm=15,
    row_spacing_cm=40,
    tags=["legume", "nitrogen_fixer", "storage"],
    tips=tips(
        tip(
            "Loves a warm dry summer - a sunny raised bed is ideal.",
            "Houdt van een warme droge zomer - een zonnige verhoogde bak is ideaal.",
        )
    ),
)
P(
    "marrowfat_pea",
    "Marrowfat pea",
    "Kapucijner",
    "Pisum sativum var. arvense",
    "Fabaceae",
    "legume_cool",
    days_to_maturity=[90, 110],
    continuous_harvest=False,
    tags=["legume", "nitrogen_fixer", "storage"],
    tips=tips(
        tip(
            "A Flemish classic: harvest dry pods, shell and store.",
            "Een Vlaamse klassieker: oogst droge peulen, dop en bewaar.",
        )
    ),
)
P(
    "hokkaido",
    "Red kuri squash (Hokkaido)",
    "Hokkaido-pompoen",
    "Cucurbita maxima 'Uchiki Kuri'",
    "Cucurbitaceae",
    "cucurbit",
    days_to_maturity=[90, 110],
    spacing_cm=100,
    yield_kg_m2=3,
    tags=["fruiting", "storage"],
    tips=tips(
        tip(
            "Edible skin; stores 4-6 months at 12-15 °C. Pinch after 4 fruits per plant.",
            "Eetbare schil; bewaart 4-6 maanden op 12-15 °C. Top na 4 vruchten per plant.",
        )
    ),
)
P(
    "spaghetti_squash",
    "Spaghetti squash",
    "Spaghettipompoen",
    "Cucurbita pepo 'Vegetable Spaghetti'",
    "Cucurbitaceae",
    "cucurbit",
    days_to_maturity=[90, 100],
    tags=["fruiting", "storage"],
    tips=tips(
        tip("Bake whole, then scrape out the 'spaghetti'.", "Bak in zijn geheel en schraap de 'spaghetti' eruit.")
    ),
)
P(
    "patisson",
    "Patty pan squash",
    "Patisson",
    "Cucurbita pepo var. patissonina",
    "Cucurbitaceae",
    "cucurbit",
    habit="bush",
    spacing_cm=80,
    days_to_maturity=[50, 60],
    continuous_harvest=True,
    harvest_interval_days=3,
    tags=["fruiting"],
    tips=tips(tip("Pick at 8-10 cm - like courgette.", "Pluk op 8-10 cm - zoals courgette.")),
)
P(
    "beefsteak_tomato",
    "Beefsteak tomato",
    "Vleestomaat",
    "Solanum lycopersicum (beefsteak)",
    "Solanaceae",
    "fruit_tender",
    habit="vine",
    spacing_cm=60,
    row_spacing_cm=80,
    days_to_maturity=[75, 90],
    height_cm=200,
    greenhouse=GH["yes"](12, 30, 4),
    pests=["whitefly", "aphids"],
    diseases=["late_blight", "blossom_end_rot", "botrytis"],
    care=[
        care(
            "stake",
            0,
            anchor="transplant",
            minutes=15,
            en="Spiral stake or string from the roof.",
            nl="Spiraalstok of touw vanaf het dak.",
        ),
        care(
            "prune",
            14,
            7,
            100,
            "transplant",
            10,
            "Remove side shoots weekly; limit to 4-5 trusses.",
            "Wekelijks dieven; beperk tot 4-5 trossen.",
        ),
    ],
    tags=["fruiting", "greenhouse"],
    tips=tips(
        tip(
            "Best under glass in Flanders; shake flowering trusses mid-morning to help pollination.",
            "In Vlaanderen best onder glas; schud de bloeitrossen 's ochtends voor betere bestuiving.",
        )
    ),
)
P(
    "cos_lettuce",
    "Romaine (cos) lettuce",
    "Bindsla (romaine)",
    "Lactuca sativa var. longifolia",
    "Asteraceae",
    "leafy",
    days_to_maturity=[60, 75],
    spacing_cm=30,
    tags=["leafy", "succession"],
    tips=tips(
        tip("More heat- and bolt-tolerant than butterhead.", "Beter bestand tegen hitte en doorschieten dan kropsla.")
    ),
)
P(
    "iceberg_lettuce",
    "Iceberg lettuce",
    "IJsbergsla",
    "Lactuca sativa var. capitata (crisphead)",
    "Asteraceae",
    "leafy",
    days_to_maturity=[70, 85],
    spacing_cm=35,
    tags=["leafy"],
    tips=tips(tip("Needs even moisture to form a firm heart.", "Wil gelijkmatig vocht voor een vaste krop.")),
)
P(
    "loose_leaf_lettuce",
    "Loose-leaf lettuce",
    "Pluksla",
    "Lactuca sativa var. crispa",
    "Asteraceae",
    "leafy",
    days_to_maturity=[35, 50],
    spacing_cm=25,
    continuous_harvest=True,
    harvest_interval_days=5,
    harvest_duration_days=60,
    greenhouse=GH["yes"](0, 25, 6),
    tags=["leafy", "succession", "quick", "container"],
    tips=tips(
        tip(
            "Pick outer leaves only - one sowing feeds you for two months.",
            "Pluk enkel buitenste bladeren - één zaaiing voedt je twee maanden.",
        )
    ),
)
P(
    "daikon",
    "Daikon",
    "Daikon (Japanse rammenas)",
    "Raphanus sativus var. longipinnatus",
    "Brassicaceae",
    "root",
    days_to_maturity=[55, 70],
    spacing_cm=15,
    sowing={"direct_sow": [FF(-12, -8)]},
    tags=["root", "storage"],
    tips=tips(
        tip(
            "Breaks up compacted soil - also a great 'tillage radish' green manure.",
            "Breekt verdichte grond open - ook een prima groenbemester.",
        )
    ),
)
P(
    "salsify",
    "Salsify",
    "Haverwortel",
    "Tragopogon porrifolius",
    "Asteraceae",
    "root",
    days_to_maturity=[150, 180],
    spacing_cm=10,
    sowing={"direct_sow": [W(-2, 4)]},
    tags=["root", "storage", "winter"],
    tips=tips(
        tip(
            "Deep, stone-free soil; its purple flowers in year 2 attract bees.",
            "Diepe, steenvrije grond; de paarse bloemen in jaar 2 trekken bijen.",
        )
    ),
)
P(
    "turnip_rooted_chervil",
    "Turnip-rooted chervil",
    "Knolkervel",
    "Chaerophyllum bulbosum",
    "Apiaceae",
    "root",
    days_to_maturity=[200, 240],
    spacing_cm=10,
    sowing={"direct_sow": [FF(-4, 2)]},
    tags=["root", "storage"],
    tips=tips(
        tip(
            "Seed needs winter cold: sow in autumn, harvest next July; tastes of chestnut.",
            "Zaad heeft winterkou nodig: zaai in de herfst, oogst in juli; smaakt naar kastanje.",
        )
    ),
)
P(
    "ice_plant",
    "Ice plant",
    "IJskruid",
    "Mesembryanthemum crystallinum",
    "Aizoaceae",
    "leafy",
    days_to_maturity=[50, 70],
    spacing_cm=30,
    sowing={"indoor_sow": [W(-6, -2)], "transplant": [W(2, 5)]},
    water_needs="low",
    frost_tolerance="tender",
    tags=["leafy", "container"],
    tips=tips(
        tip(
            "Crunchy salty leaves; thrives in heat and drought.",
            "Knapperige zilte bladeren; gedijt bij hitte en droogte.",
        )
    ),
)
P(
    "cucamelon",
    "Cucamelon",
    "Muismeloen",
    "Melothria scabra",
    "Cucurbitaceae",
    "cucurbit",
    habit="climbing",
    spacing_cm=40,
    days_to_maturity=[70, 80],
    continuous_harvest=True,
    harvest_interval_days=3,
    tags=["fruiting", "container"],
    tips=tips(
        tip(
            "Grape-sized 'mini watermelons' tasting of cucumber and lime; needs a trellis.",
            "Druifgrote 'mini-watermeloentjes' die smaken naar komkommer en limoen; heeft een klimrek nodig.",
        )
    ),
)
P(
    "early_potato",
    "Early potato",
    "Vroege aardappel",
    "Solanum tuberosum (first early)",
    "Solanaceae",
    "root",
    habit="bush",
    spacing_cm=30,
    row_spacing_cm=60,
    sowing_depth_cm=10,
    days_to_maturity=[70, 90],
    sowing={"transplant": [W(-4, 0)]},
    min_soil_temp_c=7,
    frost_tolerance="tender",
    nutrient_needs="high",
    care=[
        care(
            "earth_up",
            21,
            14,
            50,
            "transplant",
            20,
            "Earth up when shoots are 20 cm; cover new shoots on frosty nights.",
            "Aanaarden bij 20 cm; dek nieuwe scheuten af bij vorst.",
        )
    ],
    pests=["colorado_beetle", "slugs", "wireworm"],
    diseases=["late_blight", "scab"],
    tags=["root", "staple"],
    tips=tips(
        tip(
            "Chit (pre-sprout) seed potatoes 4-6 weeks in a light frost-free place.",
            "Laat pootaardappelen 4-6 weken voorkiemen op een lichte vorstvrije plaats.",
        ),
        tip(
            "Early varieties often escape late blight - Première, Frieslander, Annabelle.",
            "Vroege rassen ontsnappen vaak aan phytophthora - Première, Frieslander, Annabelle.",
        ),
    ),
)
P(
    "chinese_artichoke",
    "Chinese artichoke (crosne)",
    "Japanse andoorn (crosne)",
    "Stachys affinis",
    "Lamiaceae",
    "perennial_veg",
    harvest_windows=[FF(2, 16)],
    years_to_bearing=0,
    spacing_cm=30,
    row_spacing_cm=40,
    height_cm=40,
    tags=["perennial", "root", "spreading", "winter"],
    tips=tips(
        tip(
            "Leave tubers in the ground and dig as needed all winter; contain - it spreads.",
            "Laat de knolletjes in de grond en oogst naar behoefte de hele winter; inperken - het woekert.",
        )
    ),
)
P(
    "oca",
    "Oca",
    "Oca",
    "Oxalis tuberosa",
    "Oxalidaceae",
    "root",
    spacing_cm=40,
    row_spacing_cm=60,
    days_to_maturity=[200, 230],
    sowing={"transplant": [W(2, 5)]},
    frost_tolerance="half_hardy",
    tags=["root", "storage"],
    tips=tips(
        tip(
            "Tubers form only when days shorten: harvest late November.",
            "Knollen vormen pas als de dagen korten: oogst eind november.",
        )
    ),
)
P(
    "watercress_land",
    "Land cress",
    "Landkers",
    "Barbarea verna",
    "Brassicaceae",
    "brassica_fast",
    days_to_maturity=[50, 60],
    spacing_cm=15,
    sowing={"direct_sow": [FF(-12, -6), W(-4, 4)]},
    frost_tolerance="very_hardy",
    greenhouse=GH["yes"](-6, 24, 6),
    tags=["leafy", "winter"],
    shade_tolerant=True,
    tips=tips(
        tip(
            "Watercress flavour without running water; hardy winter salad.",
            "Waterkerssmaak zonder stromend water; winterharde salade.",
        )
    ),
)
P(
    "claytonia_red",
    "Pink purslane",
    "Roze winterpostelein",
    "Claytonia sibirica",
    "Montiaceae",
    "leafy",
    days_to_maturity=[50, 60],
    spacing_cm=15,
    sowing={"direct_sow": [FF(-10, -4)]},
    frost_tolerance="very_hardy",
    shade_tolerant=True,
    tags=["leafy", "winter", "self_seeding"],
    tips=tips(
        tip(
            "Shade-loving, self-seeding perennial salad with edible flowers.",
            "Schaduwminnende, zichzelf uitzaaiende sla met eetbare bloemen.",
        )
    ),
)

# --------------------------------------------------------------------------- #
# Herbs
# --------------------------------------------------------------------------- #
P(
    "apple_mint",
    "Apple mint",
    "Appelmunt",
    "Mentha suaveolens",
    "Lamiaceae",
    "herb_perennial",
    tags=["herb", "aromatic", "perennial", "spreading", "pollinators"],
    deters=["aphids", "ants"],
    tips=tips(tip("Grow in a sunken bucket - mint runs.", "Kweek in een ingegraven emmer - munt woekert.")),
)
P(
    "pineapple_sage",
    "Pineapple sage",
    "Ananassalie",
    "Salvia elegans",
    "Lamiaceae",
    "herb_perennial",
    frost_tolerance="half_hardy",
    min_temp_c=-3,
    height_cm=100,
    tags=["herb", "aromatic", "perennial", "protect_winter", "pollinators"],
    tips=tips(
        tip(
            "Red autumn flowers for late bumblebees; overwinter frost-free.",
            "Rode herfstbloemen voor late hommels; vorstvrij overwinteren.",
        )
    ),
)
P(
    "greek_basil",
    "Greek bush basil",
    "Griekse basilicum",
    "Ocimum basilicum var. minimum",
    "Lamiaceae",
    "herb_annual_tender",
    spacing_cm=20,
    height_cm=25,
    tags=["herb", "aromatic", "container", "windowsill"],
    tips=tips(tip("Compact ball, tiny leaves - ideal in pots.", "Compacte bol, kleine blaadjes - ideaal in potten.")),
)
P(
    "purple_basil",
    "Purple basil",
    "Paarse basilicum",
    "Ocimum basilicum 'Purpurascens'",
    "Lamiaceae",
    "herb_annual_tender",
    tags=["herb", "aromatic", "edible_flower"],
    tips=tips(tip("Colour accent in salads and between tomatoes.", "Kleuraccent in salades en tussen tomaten.")),
)
P(
    "vietnamese_coriander",
    "Vietnamese coriander",
    "Vietnamese koriander",
    "Persicaria odorata",
    "Polygonaceae",
    "herb_perennial",
    frost_tolerance="tender",
    min_temp_c=3,
    water_needs="high",
    greenhouse=GH["yes"](5, 32, 0),
    tags=["herb", "aromatic", "perennial", "windowsill", "container"],
    tips=tips(
        tip(
            "Coriander flavour that doesn't bolt; keep indoors in winter.",
            "Koriandersmaak zonder doorschieten; 's winters binnen.",
        )
    ),
)
P(
    "st_johns_wort",
    "St John's wort",
    "Sint-Janskruid",
    "Hypericum perforatum",
    "Hypericaceae",
    "herb_perennial",
    tags=["herb", "perennial", "pollinators", "self_seeding"],
    tips=tips(
        tip(
            "Medicinal - interacts with many drugs; ask a pharmacist before use.",
            "Geneeskrachtig - interageert met veel medicijnen; vraag eerst je apotheker.",
        )
    ),
)
P(
    "bergamot",
    "Bee balm (bergamot)",
    "Bergamotplant",
    "Monarda didyma",
    "Lamiaceae",
    "herb_perennial",
    height_cm=90,
    tags=["herb", "perennial", "pollinators", "edible_flower", "divide"],
    tips=tips(
        tip(
            "Bee and hoverfly magnet; leaves for 'Earl Grey' tea.",
            "Magneet voor bijen en zweefvliegen; blad voor 'Earl Grey'-thee.",
        )
    ),
)
P(
    "anise_hyssop",
    "Anise hyssop",
    "Anijsnetel",
    "Agastache foeniculum",
    "Lamiaceae",
    "herb_perennial",
    height_cm=80,
    tags=["herb", "aromatic", "perennial", "pollinators", "edible_flower"],
    tips=tips(
        tip("Flowers for 3 months - one of the best bee plants.", "Bloeit 3 maanden - een van de beste bijenplanten.")
    ),
)
P(
    "curry_plant",
    "Curry plant",
    "Kerrieplant",
    "Helichrysum italicum",
    "Asteraceae",
    "herb_perennial",
    water_needs="low",
    tags=["herb", "aromatic", "perennial", "protect_winter"],
    tips=tips(
        tip(
            "Silver leaves smell of curry; flavour, not a curry spice.",
            "Zilverblad ruikt naar kerrie; geurplant, geen kerriekruid.",
        )
    ),
)
P(
    "santolina",
    "Cotton lavender",
    "Heiligenbloem",
    "Santolina chamaecyparissus",
    "Asteraceae",
    "herb_perennial",
    water_needs="low",
    tags=["herb", "aromatic", "perennial", "cut_back_spring"],
    deters=["moths", "aphids"],
    tips=tips(
        tip(
            "Low clipped edging for herb beds; dried sprigs keep moths out of cupboards.",
            "Laag geschoren randje voor kruidenbedden; gedroogde takjes houden motten uit de kast.",
        )
    ),
)
P(
    "roman_chamomile",
    "Roman chamomile",
    "Roomse kamille",
    "Chamaemelum nobile",
    "Asteraceae",
    "herb_perennial",
    spacing_cm=20,
    height_cm=15,
    tags=["herb", "aromatic", "perennial", "groundcover"],
    tips=tips(tip("A scented lawn alternative for small paths.", "Een geurend gazonalternatief voor smalle paadjes.")),
)
P(
    "cumin",
    "Cumin",
    "Komijn",
    "Cuminum cyminum",
    "Apiaceae",
    "herb_annual_tender",
    days_to_maturity=[100, 120],
    tags=["herb", "aromatic", "greenhouse"],
    tips=tips(
        tip(
            "Needs a long warm summer - easiest in the greenhouse.",
            "Heeft een lange warme zomer nodig - makkelijkst in de serre.",
        )
    ),
)
P(
    "nigella",
    "Black cumin (nigella)",
    "Zwarte komijn",
    "Nigella sativa",
    "Ranunculaceae",
    "herb_annual_hardy",
    days_to_maturity=[90, 110],
    tags=["herb", "pollinators", "self_seeding", "edible_flower"],
    tips=tips(
        tip("Pretty blue flowers, then seed pods for bread.", "Mooie blauwe bloemen, daarna zaaddozen voor brood.")
    ),
)
P(
    "shiso_green",
    "Green shiso",
    "Groene shiso",
    "Perilla frutescens var. crispa",
    "Lamiaceae",
    "herb_annual_tender",
    tags=["herb", "aromatic", "self_seeding"],
    tips=tips(
        tip("Sow on the surface - needs light to germinate.", "Zaai bovenop de grond - kiemt enkel in het licht.")
    ),
)
P(
    "chervil_winter",
    "Winter chervil",
    "Winterkervel",
    "Anthriscus cerefolium (winter)",
    "Apiaceae",
    "herb_annual_hardy",
    sowing={"direct_sow": [FF(-8, -2)]},
    frost_tolerance="very_hardy",
    tags=["herb", "winter"],
    tips=tips(
        tip(
            "Autumn-sown chervil gives fresh greens all winter under fleece.",
            "In de herfst gezaaide kervel geeft de hele winter vers groen onder vliesdoek.",
        )
    ),
)

# --------------------------------------------------------------------------- #
# Flowers & green manures (pollinators, beneficials, soil)
# --------------------------------------------------------------------------- #
P(
    "zinnia",
    "Zinnia",
    "Zinnia",
    "Zinnia elegans",
    "Asteraceae",
    "flower_companion",
    frost_tolerance="tender",
    sowing={"indoor_sow": [W(-4, -1)], "transplant": [W(2, 5)], "direct_sow": [W(3, 6)]},
    tags=["flower", "companion", "pollinators", "cut_flower"],
    pollination="insects",
    tips=tips(tip("Butterflies love the single-flowered types.", "Vlinders houden van enkelbloemige soorten.")),
)
P(
    "sweet_alyssum",
    "Sweet alyssum",
    "Zilverschildzaad",
    "Lobularia maritima",
    "Brassicaceae",
    "flower_companion",
    spacing_cm=15,
    height_cm=15,
    tags=["flower", "companion", "pollinators", "groundcover"],
    tips=tips(
        tip(
            "Tiny flowers feed hoverflies and parasitic wasps - natural aphid control between lettuce.",
            "Kleine bloempjes voeden zweefvliegen en sluipwespen - natuurlijke bladluisbestrijding tussen de sla.",
        )
    ),
)
P(
    "poached_egg_plant",
    "Poached egg plant",
    "Moerasbloem",
    "Limnanthes douglasii",
    "Limnanthaceae",
    "flower_companion",
    spacing_cm=15,
    height_cm=15,
    sowing={"direct_sow": [W(-2, 4), FF(-8, -5)]},
    frost_tolerance="hardy",
    tags=["flower", "companion", "pollinators", "groundcover", "self_seeding"],
    tips=tips(
        tip(
            "Edge of the vegetable bed: hoverflies whose larvae eat aphids.",
            "Rand van het groentebed: zweefvliegen waarvan de larven bladluis eten.",
        )
    ),
)
P(
    "buckwheat",
    "Buckwheat",
    "Boekweit",
    "Fagopyrum esculentum",
    "Polygonaceae",
    "green_manure",
    sowing={"direct_sow": [W(3, 12)]},
    frost_tolerance="tender",
    days_to_maturity=[40, 60],
    height_cm=80,
    tags=["green_manure", "pollinators", "quick"],
    npk=[0, 2, 1],
    tips=tips(
        tip(
            "Fastest summer green manure (6 weeks); unlocks phosphorus; dig in at flowering.",
            "Snelste zomergroenbemester (6 weken); maakt fosfor vrij; onderwerken bij de bloei.",
        )
    ),
)
P(
    "white_clover",
    "White clover",
    "Witte klaver",
    "Trifolium repens",
    "Fabaceae",
    "green_manure",
    perennial=True,
    frost_tolerance="very_hardy",
    height_cm=15,
    tags=["green_manure", "nitrogen_fixer", "legume", "groundcover", "pollinators", "perennial"],
    tips=tips(
        tip(
            "Living mulch for paths and under fruit trees; fixes nitrogen.",
            "Levende mulch voor paden en onder fruitbomen; bindt stikstof.",
        )
    ),
)
P(
    "viola",
    "Viola (horned pansy)",
    "Hoornviooltje",
    "Viola cornuta",
    "Violaceae",
    "flower_companion",
    spacing_cm=20,
    height_cm=15,
    frost_tolerance="very_hardy",
    sowing={"indoor_sow": [FF(-14, -10)], "transplant": [FF(-8, -4)]},
    tags=["flower", "edible_flower", "winter", "container"],
    tips=tips(tip("Edible winter flowers for salads.", "Eetbare winterbloempjes voor salades.")),
)
P(
    "sweet_pea",
    "Sweet pea",
    "Siererwt (lathyrus)",
    "Lathyrus odoratus",
    "Fabaceae",
    "flower_companion",
    habit="climbing",
    spacing_cm=15,
    height_cm=180,
    sowing={"indoor_sow": [W(-10, -6)], "transplant": [W(-2, 2)]},
    frost_tolerance="hardy",
    tags=["flower", "pollinators", "cut_flower"],
    tips=tips(
        tip(
            "Not edible! Grow it on the bean wigwam to draw pollinators.",
            "Niet eetbaar! Kweek op de bonenwigwam om bestuivers te lokken.",
        )
    ),
)
P(
    "verbena_bonariensis",
    "Purpletop vervain",
    "Patagonisch ijzerhard",
    "Verbena bonariensis",
    "Verbenaceae",
    "flower_companion",
    perennial=True,
    height_cm=150,
    frost_tolerance="half_hardy",
    sowing={"indoor_sow": [W(-12, -8)], "transplant": [W(1, 4)]},
    tags=["flower", "pollinators", "self_seeding", "perennial"],
    tips=tips(
        tip(
            "See-through - plant it among vegetables without shading them; butterflies love it.",
            "Doorkijkplant - zet hem tussen groenten zonder schaduw; vlinders zijn er dol op.",
        )
    ),
)
P(
    "white_mustard",
    "White mustard",
    "Gele mosterd",
    "Sinapis alba",
    "Brassicaceae",
    "green_manure",
    sowing={"direct_sow": [W(0, 10), FF(-10, -5)]},
    frost_tolerance="half_hardy",
    tags=["green_manure", "brassica", "quick"],
    tips=tips(
        tip(
            "Fast autumn cover, but a brassica: don't use it before cabbages (clubroot).",
            "Snelle herfstbedekker, maar een kruisbloemige: niet vóór kolen (knolvoet).",
        )
    ),
)
P(
    "winter_rye",
    "Winter rye",
    "Winterrogge",
    "Secale cereale",
    "Poaceae",
    "green_manure",
    sowing={"direct_sow": [FF(-6, 2)]},
    frost_tolerance="very_hardy",
    height_cm=120,
    tags=["green_manure", "winter"],
    tips=tips(
        tip(
            "Latest-sown green manure; mow and dig in 4 weeks before sowing (it suppresses germination).",
            "Laatst te zaaien groenbemester; maaien en onderwerken 4 weken voor het zaaien (remt kieming).",
        )
    ),
)
P(
    "winter_vetch",
    "Winter vetch",
    "Winterwikke",
    "Vicia villosa",
    "Fabaceae",
    "green_manure",
    sowing={"direct_sow": [FF(-10, -4)]},
    frost_tolerance="very_hardy",
    tags=["green_manure", "nitrogen_fixer", "legume", "winter"],
    tips=tips(
        tip(
            "Sow with rye: rye gives structure, vetch adds up to 100 kg N/ha.",
            "Zaai samen met rogge: rogge geeft structuur, wikke tot 100 kg N/ha.",
        )
    ),
)
P(
    "field_beans",
    "Field bean (green manure)",
    "Veldboon (groenbemester)",
    "Vicia faba var. minor",
    "Fabaceae",
    "green_manure",
    sowing={"direct_sow": [FF(-8, -2)]},
    frost_tolerance="hardy",
    spacing_cm=10,
    row_spacing_cm=20,
    height_cm=80,
    tags=["green_manure", "nitrogen_fixer", "legume", "winter"],
    tips=tips(
        tip(
            "Deep roots open subsoil; cut down in spring before flowering.",
            "Diepe wortels openen de ondergrond; maai in het voorjaar vóór de bloei.",
        )
    ),
)
P(
    "lupin_green_manure",
    "Blue lupin",
    "Blauwe lupine",
    "Lupinus angustifolius",
    "Fabaceae",
    "green_manure",
    sowing={"direct_sow": [W(0, 12)]},
    height_cm=80,
    tags=["green_manure", "nitrogen_fixer", "legume", "pollinators"],
    tips=tips(
        tip("Thrives on poor sandy soil and loosens it deeply.", "Gedijt op arme zandgrond en maakt die diep los.")
    ),
)
P(
    "tagetes_minuta",
    "Tagetes minuta",
    "Afrikaantje (tagetes patula)",
    "Tagetes patula",
    "Asteraceae",
    "flower_companion",
    frost_tolerance="tender",
    sowing={"indoor_sow": [W(-6, -3)], "transplant": [W(2, 5)]},
    height_cm=30,
    deters=["nematodes", "whitefly"],
    tags=["flower", "companion", "pollinators"],
    tips=tips(
        tip(
            "Roots suppress root-knot nematodes - plant densely a full season before tomatoes.",
            "Wortels onderdrukken wortelknobbelaaltjes - plant dicht, een heel seizoen vóór tomaten.",
        )
    ),
)
P(
    "echium",
    "Viper's bugloss",
    "Slangenkruid",
    "Echium vulgare",
    "Boraginaceae",
    "flower_companion",
    frost_tolerance="very_hardy",
    height_cm=80,
    sowing={"direct_sow": [W(-2, 4), FF(-10, -6)]},
    tags=["flower", "pollinators", "self_seeding"],
    tips=tips(tip("Top-3 bee plant: nectar all day long.", "Top-3 bijenplant: de hele dag nectar.")),
)

# --------------------------------------------------------------------------- #
# Relations for the new plants (a, b, rel, strength, en, nl)
# --------------------------------------------------------------------------- #
REL_EXTRA: list[tuple[str, str, str, int, str, str]] = [
    (
        "apple",
        "chives",
        "friend",
        2,
        "Chives under apple trees reduce scab and deter aphids.",
        "Bieslook onder appelbomen vermindert schurft en weert bladluis.",
    ),
    (
        "apple",
        "nasturtium",
        "friend",
        1,
        "Nasturtium lures woolly aphids away and covers the soil.",
        "Oost-Indische kers lokt bloedluis weg en bedekt de grond.",
    ),
    (
        "apple",
        "comfrey",
        "friend",
        2,
        "Comfrey's deep roots mine potassium; cut leaves as mulch.",
        "Smeerwortel haalt kalium uit de diepte; gebruik het blad als mulch.",
    ),
    (
        "apple",
        "potato",
        "enemy",
        1,
        "Potatoes compete for water and share pests near fruit trees.",
        "Aardappelen concurreren om water onder fruitbomen.",
    ),
    ("pear", "chives", "friend", 1, "Chives deter aphids.", "Bieslook weert bladluis."),
    (
        "plum",
        "garlic",
        "friend",
        1,
        "Garlic under stone fruit deters aphids.",
        "Knoflook onder steenvruchten weert bladluis.",
    ),
    (
        "peach",
        "garlic",
        "friend",
        2,
        "Traditional remedy against peach leaf curl.",
        "Klassiek middel tegen krulziekte.",
    ),
    (
        "sweet_cherry",
        "white_clover",
        "friend",
        1,
        "Clover groundcover feeds nitrogen and bees.",
        "Klaver als bodembedekker geeft stikstof en voedt bijen.",
    ),
    (
        "redcurrant",
        "gooseberry",
        "friend",
        1,
        "Same needs; plant them as a fruit hedge.",
        "Zelfde noden; plant als fruithaag.",
    ),
    (
        "blackcurrant",
        "wormwood",
        "enemy",
        1,
        "Wormwood inhibits growth of neighbours.",
        "Alsem remt de groei van buren.",
    ),
    (
        "raspberry_summer",
        "potato",
        "enemy",
        2,
        "Shared verticillium and blight risk.",
        "Gedeeld risico op verwelkingsziekte.",
    ),
    (
        "raspberry_summer",
        "tansy",
        "friend",
        1,
        "Tansy deters raspberry beetle.",
        "Boerenwormkruid weert frambozenkever.",
    ),
    ("raspberry_autumn", "marigold", "friend", 1, "Draws hoverflies.", "Lokt zweefvliegen."),
    (
        "blackberry",
        "raspberry_summer",
        "enemy",
        1,
        "Share viruses and cane diseases; keep 3 m apart.",
        "Delen virussen en stengelziekten; houd 3 m afstand.",
    ),
    (
        "strawberry",
        "borage",
        "friend",
        2,
        "Borage boosts pollination and fruit set.",
        "Bernagie verbetert bestuiving en vruchtzetting.",
    ),
    (
        "alpine_strawberry",
        "apple",
        "friend",
        1,
        "A shade-tolerant groundcover under fruit trees.",
        "Een schaduwverdragende bodembedekker onder fruitbomen.",
    ),
    ("blueberry", "cranberry", "friend", 1, "Both need the same acid soil.", "Beide willen dezelfde zure grond."),
    ("grape", "hyssop", "friend", 1, "Hyssop draws pollinators and is said to raise yield.", "Hysop lokt bestuivers."),
    (
        "grape",
        "cabbage",
        "enemy",
        1,
        "Traditional antagonism; cabbage weakens the vine.",
        "Traditioneel slechte buren.",
    ),
    (
        "sweet_alyssum",
        "lettuce",
        "friend",
        2,
        "Alyssum feeds hoverflies that eat lettuce aphids.",
        "Zilverschildzaad voedt zweefvliegen die slaluis eten.",
    ),
    (
        "poached_egg_plant",
        "broad_bean",
        "friend",
        2,
        "Hoverflies against black bean aphid.",
        "Zweefvliegen tegen zwarte bonenluis.",
    ),
    (
        "buckwheat",
        "pumpkin",
        "friend",
        1,
        "Buckwheat flowers raise pollinator visits to squash.",
        "Boekweitbloemen verhogen het bezoek van bestuivers aan pompoenen.",
    ),
    ("tagetes_minuta", "tomato", "friend", 2, "Deters whitefly and soil nematodes.", "Weert witte vlieg en aaltjes."),
    ("zinnia", "cucumber", "friend", 1, "Brings pollinators to cucumbers.", "Brengt bestuivers naar de komkommers."),
    (
        "beefsteak_tomato",
        "basil",
        "friend",
        2,
        "Basil deters whitefly and improves flavour.",
        "Basilicum weert witte vlieg.",
    ),
    (
        "beefsteak_tomato",
        "potato",
        "enemy",
        3,
        "Both nightshades share late blight.",
        "Beide nachtschades delen phytophthora.",
    ),
    (
        "early_potato",
        "tomato",
        "enemy",
        3,
        "Both nightshades share late blight.",
        "Beide nachtschades delen phytophthora.",
    ),
    ("early_potato", "broad_bean", "friend", 1, "Beans feed nitrogen; potatoes loosen soil.", "Bonen geven stikstof."),
    ("pointed_cabbage", "celery", "friend", 2, "Celery's scent deters cabbage white.", "Selder weert koolwitje."),
    (
        "cavolo_nero",
        "nasturtium",
        "friend",
        2,
        "Nasturtium is a trap crop for caterpillars and aphids.",
        "Oost-Indische kers is een vangplant voor rupsen en luizen.",
    ),
    (
        "hokkaido",
        "sweet_corn",
        "friend",
        2,
        "Three sisters: squash shades the soil under corn.",
        "Drie zusters: pompoen beschaduwt de grond onder de maïs.",
    ),
    ("cucamelon", "sweet_corn", "friend", 1, "Climbs up the corn.", "Klimt in de maïs."),
    ("chickpea", "onion", "enemy", 1, "Alliums inhibit legumes.", "Uiachtigen remmen peulvruchten."),
]

# --------------------------------------------------------------------------- #
# Updates to existing plants (merged into generated & curated plants)
# --------------------------------------------------------------------------- #
PATCH: dict[str, dict[str, Any]] = {
    "strawberry": dict(
        harvest_windows=[W(6, 11)],
        years_to_bearing=1,
        pollination="insects",
        category="fruit",
        tips=tips(
            tip(
                "Straw under the fruit keeps it clean and dry (hence the name).",
                "Stro onder de vruchten houdt ze proper en droog.",
            ),
            tip(
                "Renew the bed every 3-4 years from the strongest runners.",
                "Vernieuw het bed elke 3-4 jaar met de sterkste uitlopers.",
            ),
        ),
    ),
    "rhubarb": dict(
        harvest_windows=[W(-2, 9)],
        years_to_bearing=1,
        tips=tips(
            tip(
                "Stop pulling stalks after mid-June so the plant can recover; leaves are toxic (but fine for an aphid spray).",
                "Stop met oogsten na half juni zodat de plant herstelt; blad is giftig (maar goed voor een luizenspray).",
            )
        ),
    ),
    "asparagus": dict(
        harvest_windows=[W(-1, 9)],
        years_to_bearing=2,
        tips=tips(
            tip(
                "Don't harvest in year 1, pick lightly in year 2, fully from year 3 until 24 June.",
                "Niet oogsten in jaar 1, licht in jaar 2, volledig vanaf jaar 3 tot 24 juni.",
            )
        ),
    ),
    "globe_artichoke": dict(harvest_windows=[W(8, 16)], years_to_bearing=1, pollination="insects"),
    "jerusalem_artichoke": dict(harvest_windows=[FF(2, 20)], years_to_bearing=0),
    "horseradish": dict(harvest_windows=[FF(0, 16)], years_to_bearing=1),
}

# --------------------------------------------------------------------------- #
# Icons & colours: the planner draws a vector glyph per plant.
# --------------------------------------------------------------------------- #
ICON: dict[str, tuple[str, str, str]] = {
    # id: (glyph, colour, emoji)
    "tomato": ("tomato", "#d9412b", "🍅"),
    "cherry_tomato": ("tomato", "#e0482f", "🍅"),
    "beefsteak_tomato": ("tomato", "#c7352a", "🍅"),
    "tomatillo": ("tomato", "#8fb442", "🍅"),
    "sweet_pepper": ("pepper", "#d9412b", "🫑"),
    "chili_pepper": ("chili", "#c62f2f", "🌶️"),
    "aubergine": ("eggplant", "#5b2a6e", "🍆"),
    "cape_gooseberry": ("berry", "#f0a020", "🟠"),
    "okra": ("chili", "#5f8f3a", "🌿"),
    "courgette": ("cucumber", "#3f7a35", "🥒"),
    "cucumber": ("cucumber", "#4a8a3a", "🥒"),
    "gherkin": ("cucumber", "#5e9a42", "🥒"),
    "cucamelon": ("berry", "#6aa04a", "🥒"),
    "pumpkin": ("pumpkin", "#e57a1f", "🎃"),
    "butternut": ("pumpkin", "#e3a64c", "🎃"),
    "hokkaido": ("pumpkin", "#e0662a", "🎃"),
    "spaghetti_squash": ("pumpkin", "#efc84a", "🎃"),
    "patisson": ("pumpkin", "#f2e08a", "🎃"),
    "melon": ("melon", "#c9b65a", "🍈"),
    "watermelon": ("melon", "#3f8a3a", "🍉"),
    "carrot": ("carrot", "#ef7d22", "🥕"),
    "parsnip": ("carrot", "#e7dcae", "🥕"),
    "root_parsley": ("carrot", "#efe6c4", "🥕"),
    "salsify": ("carrot", "#b7a07a", "🥕"),
    "scorzonera": ("carrot", "#3b2f2a", "🥕"),
    "turnip_rooted_chervil": ("root", "#c9b58a", "🥔"),
    "daikon": ("carrot", "#f4f1e6", "🥕"),
    "winter_radish": ("root", "#3b3b3b", "🥕"),
    "beetroot": ("root", "#8e1f3f", "🟣"),
    "radish": ("root", "#e0405e", "🔴"),
    "turnip": ("root", "#c776b4", "🟣"),
    "swede": ("root", "#c9a96b", "🟡"),
    "celeriac": ("root", "#d8cfa8", "⚪"),
    "kohlrabi": ("root", "#9fc46a", "🟢"),
    "potato": ("potato", "#c9a15a", "🥔"),
    "early_potato": ("potato", "#d8b46a", "🥔"),
    "sweet_potato": ("potato", "#c8613a", "🍠"),
    "jerusalem_artichoke": ("potato", "#b78a5a", "🥔"),
    "yacon": ("potato", "#a87a4a", "🥔"),
    "oca": ("potato", "#e0707a", "🥔"),
    "chinese_artichoke": ("potato", "#efe6cf", "🥔"),
    "onion": ("onion", "#c98a3a", "🧅"),
    "shallot": ("onion", "#a8573e", "🧅"),
    "garlic": ("garlic", "#efe8d8", "🧄"),
    "elephant_garlic": ("garlic", "#efe8d8", "🧄"),
    "leek": ("leek", "#6f9f4a", "🌿"),
    "spring_onion": ("leek", "#7fb85a", "🌿"),
    "welsh_onion": ("leek", "#7fb85a", "🌿"),
    "cabbage": ("cabbage", "#7fae6a", "🥬"),
    "red_cabbage": ("cabbage", "#7a3d7a", "🥬"),
    "savoy_cabbage": ("cabbage", "#5f8f4a", "🥬"),
    "pointed_cabbage": ("cabbage", "#9cc27a", "🥬"),
    "chinese_cabbage": ("cabbage", "#c8dc9a", "🥬"),
    "brussels_sprouts": ("sprouts", "#5f8f4a", "🥬"),
    "broccoli": ("broccoli", "#3f7a45", "🥦"),
    "cauliflower": ("broccoli", "#f1ead2", "🥦"),
    "romanesco": ("broccoli", "#a8c95a", "🥦"),
    "purple_sprouting_broccoli": ("broccoli", "#6a4a8a", "🥦"),
    "kale": ("kale", "#3e6b3f", "🥬"),
    "cavolo_nero": ("kale", "#2f4a35", "🥬"),
    "sea_kale": ("kale", "#8fb0a0", "🥬"),
    "lettuce": ("lettuce", "#8cc63f", "🥬"),
    "cos_lettuce": ("lettuce", "#6fae3a", "🥬"),
    "iceberg_lettuce": ("lettuce", "#b5d96a", "🥬"),
    "loose_leaf_lettuce": ("lettuce", "#9a3d4a", "🥬"),
    "endive": ("lettuce", "#c3d97a", "🥬"),
    "radicchio": ("lettuce", "#9a2443", "🥬"),
    "chicory_witloof": ("lettuce", "#efe7b0", "🥬"),
    "lambs_lettuce": ("leafy", "#4f8f3a", "🌱"),
    "spinach": ("leafy", "#3e7a35", "🍃"),
    "nz_spinach": ("leafy", "#5f9a4a", "🍃"),
    "orache": ("leafy", "#9a3d5a", "🍃"),
    "swiss_chard": ("chard", "#d0453a", "🥬"),
    "pak_choi": ("chard", "#7fb85a", "🥬"),
    "tatsoi": ("leafy", "#2f6a35", "🍃"),
    "komatsuna": ("leafy", "#3f7a3a", "🍃"),
    "mizuna": ("leafy", "#6aa04a", "🍃"),
    "mustard_greens": ("leafy", "#5a8a3a", "🍃"),
    "rocket": ("leafy", "#4f7f3a", "🍃"),
    "turnip_greens": ("leafy", "#6aa04a", "🍃"),
    "purslane": ("leafy", "#7fae4a", "🍃"),
    "winter_purslane": ("leafy", "#6fa69a", "🍃"),
    "claytonia_red": ("leafy", "#c77d9a", "🍃"),
    "watercress_land": ("leafy", "#4f8f3a", "🍃"),
    "samphire": ("leafy", "#6f9a5a", "🌿"),
    "ice_plant": ("leafy", "#9ac0a0", "🍃"),
    "celery": ("celery", "#8fbf5a", "🌿"),
    "florence_fennel": ("fennel", "#d8e6a8", "🌿"),
    "pea": ("pea", "#5fa83a", "🫛"),
    "snow_pea": ("pea", "#7fb85a", "🫛"),
    "sugar_snap": ("pea", "#6fae4a", "🫛"),
    "marrowfat_pea": ("pea", "#9aa04a", "🫛"),
    "chickpea": ("pea", "#d8c48a", "🫘"),
    "bush_bean": ("bean", "#4f8f35", "🫛"),
    "pole_bean": ("bean", "#3f8035", "🫛"),
    "runner_bean": ("bean", "#d9412b", "🫛"),
    "broad_bean": ("bean", "#5f8f45", "🫛"),
    "borlotti_bean": ("bean", "#c9566a", "🫘"),
    "edamame": ("bean", "#6fae4a", "🫛"),
    "sweet_corn": ("corn", "#f2c230", "🌽"),
    "asparagus": ("asparagus", "#6f9a45", "🌱"),
    "globe_artichoke": ("artichoke", "#6f8f7a", "🌿"),
    "cardoon": ("artichoke", "#8fa0a8", "🌿"),
    "rhubarb": ("rhubarb", "#c93a4f", "🌿"),
    "strawberry": ("strawberry", "#e0303f", "🍓"),
    "alpine_strawberry": ("strawberry", "#e0303f", "🍓"),
    "apple": ("tree_apple", "#d9412b", "🍎"),
    "pear": ("tree_pear", "#c8b83a", "🍐"),
    "plum": ("tree_plum", "#5a3d8a", "🟣"),
    "sweet_cherry": ("tree_cherry", "#b0202f", "🍒"),
    "sour_cherry": ("tree_cherry", "#8e1a2a", "🍒"),
    "peach": ("tree_apple", "#f29a6a", "🍑"),
    "apricot": ("tree_apple", "#f2a03a", "🍑"),
    "fig": ("tree_fig", "#6a4a6a", "🟤"),
    "quince": ("tree_pear", "#e6c43a", "🍐"),
    "medlar": ("tree_apple", "#9a6a3a", "🟤"),
    "hazelnut": ("tree_nut", "#9a6a3a", "🌰"),
    "mulberry": ("tree_cherry", "#3a1f3a", "🫐"),
    "redcurrant": ("currant", "#d02a3a", "🔴"),
    "whitecurrant": ("currant", "#f1e7b8", "⚪"),
    "blackcurrant": ("currant", "#2a2035", "⚫"),
    "gooseberry": ("berry_bush", "#9ac25a", "🟢"),
    "jostaberry": ("berry_bush", "#3a2a3a", "🫐"),
    "blueberry": ("berry_bush", "#4a5fa8", "🫐"),
    "honeyberry": ("berry_bush", "#4a4a8a", "🫐"),
    "aronia": ("berry_bush", "#2a2035", "🫐"),
    "elderberry": ("berry_bush", "#2a2035", "🫐"),
    "goji": ("berry_bush", "#e04a2a", "🔴"),
    "cranberry": ("berry_bush", "#b0202f", "🔴"),
    "sea_buckthorn": ("berry_bush", "#f29a1a", "🟠"),
    "raspberry_summer": ("cane", "#d0304a", "🍇"),
    "raspberry_autumn": ("cane", "#c82a45", "🍇"),
    "blackberry": ("cane", "#2a2035", "🍇"),
    "tayberry": ("cane", "#8a2045", "🍇"),
    "grape": ("grape", "#6a3d8a", "🍇"),
    "kiwi_berry": ("grape", "#7fa04a", "🥝"),
    "sunflower": ("sunflower", "#f2c230", "🌻"),
    "marigold": ("flower", "#f29a1a", "🌼"),
    "calendula": ("flower", "#f2a01a", "🌼"),
    "cosmos": ("flower", "#e06aa0", "🌸"),
    "cornflower": ("flower", "#4a6ad0", "💠"),
    "zinnia": ("flower", "#e04a6a", "🌺"),
    "nasturtium": ("flower", "#f07a1a", "🌼"),
    "borage": ("flower", "#5a7ae0", "💠"),
    "phacelia": ("flower", "#8a7ad0", "🪻"),
    "viola": ("flower", "#7a4ac0", "🌸"),
    "sweet_pea": ("flower", "#d06ab0", "🌸"),
    "verbena_bonariensis": ("flower", "#8a5ac0", "🪻"),
    "sweet_alyssum": ("flower", "#f4f1e6", "🤍"),
    "poached_egg_plant": ("flower", "#f2e05a", "🌼"),
    "tagetes_minuta": ("flower", "#f08a1a", "🌼"),
    "echium": ("flower", "#4a5ad0", "🪻"),
    "lavender": ("lavender", "#8a6ac8", "🪻"),
    "crimson_clover": ("flower", "#c8203a", "🌺"),
    "white_clover": ("clover", "#e8e8e0", "☘️"),
    "buckwheat": ("grain", "#e8e0d0", "🌾"),
    "winter_rye": ("grain", "#b8a05a", "🌾"),
    "white_mustard": ("flower", "#f2d23a", "🌼"),
    "winter_vetch": ("clover", "#6a5ab0", "☘️"),
    "field_beans": ("bean", "#5f8f45", "🫛"),
    "lupin_green_manure": ("flower", "#4a6ad0", "🪻"),
}
# Fallbacks by category / family
GLYPH_BY_FAMILY: dict[str, tuple[str, str, str]] = {
    "Lamiaceae": ("herb", "#4f6fb0", "🌿"),
    "Apiaceae": ("umbel", "#7aa04a", "🌿"),
    "Asteraceae": ("flower", "#e0b030", "🌼"),
    "Amaryllidaceae": ("leek", "#7fa05a", "🌿"),
    "Brassicaceae": ("leafy", "#4f8f5a", "🍃"),
    "Poaceae": ("grain", "#b8a05a", "🌾"),
}
GLYPH_BY_CATEGORY: dict[str, tuple[str, str, str]] = {
    "herb": ("herb", "#4f8f4a", "🌿"),
    "flower": ("flower", "#d06aa0", "🌸"),
    "fruit": ("berry_bush", "#c8304a", "🍓"),
    "vegetable": ("leafy", "#5f9a4a", "🥬"),
}
POLLINATION_BY_FAMILY: dict[str, str] = {
    "Cucurbitaceae": "insects",
    "Poaceae": "wind",
    "Amaranthaceae": "wind",
    "Rosaceae": "insects",
    "Brassicaceae": "insects",
    "Apiaceae": "insects",
    "Lamiaceae": "insects",
    "Boraginaceae": "insects",
}
# Generic ecological tips per family (used when a plant has no own tips).
FAMILY_TIPS: dict[str, dict[str, list[str]]] = {
    "Solanaceae": tips(
        tip(
            "Water the soil, never the leaves, in the morning: wet leaves invite blight.",
            "Geef water op de grond, nooit op het blad, 's ochtends: nat blad lokt phytophthora.",
        ),
        tip(
            "Remove leaves below the first truss and mulch with straw against splash infection.",
            "Verwijder bladeren onder de eerste tros en mulch met stro tegen opspattende sporen.",
        ),
    ),
    "Cucurbitaceae": tips(
        tip(
            "Plant on a mound of compost; a milk spray (1:9) weekly holds powdery mildew back.",
            "Plant op een heuveltje compost; wekelijks melkspray (1:9) houdt echte meeldauw tegen.",
        ),
        tip(
            "No fruit set? Hand-pollinate: brush a male flower onto the female one in the morning.",
            "Geen vruchtzetting? Bestuif met de hand: wrijf 's ochtends een mannelijke bloem op de vrouwelijke.",
        ),
    ),
    "Brassicaceae": tips(
        tip(
            "Cover with insect mesh (0.8 mm) straight after planting: stops cabbage white, root fly and flea beetle.",
            "Dek meteen na het planten af met insectengaas (0,8 mm): houdt koolwitje, koolvlieg en aardvlo tegen.",
        ),
        tip(
            "Firm planting and a pH above 7 (lime) prevents clubroot.",
            "Stevig aandrukken en een pH boven 7 (kalk) voorkomt knolvoet.",
        ),
    ),
    "Apiaceae": tips(
        tip(
            "Mesh or a 60 cm fleece fence keeps carrot fly out (it flies low); thin in the evening.",
            "Gaas of een vliesscherm van 60 cm houdt de wortelvlieg weg (ze vliegt laag); dun 's avonds uit.",
        ),
        tip(
            "No fresh manure: roots fork. Sow in compost-rich but well-rotted soil.",
            "Geen verse mest: de wortels vertakken. Zaai in goed verteerde compostrijke grond.",
        ),
    ),
    "Amaryllidaceae": tips(
        tip(
            "Hoe carefully - alliums hate weed competition; stop watering 2 weeks before harvest.",
            "Schoffel voorzichtig - uien verdragen geen onkruid; stop met water geven 2 weken voor de oogst.",
        ),
        tip(
            "Interplant with carrots: each masks the other's scent from their fly.",
            "Combineer met wortelen: ze maskeren elkaars geur voor de vliegen.",
        ),
    ),
    "Fabaceae": tips(
        tip(
            "Cut the plants off at soil level after harvest - the nitrogen nodules stay in the ground.",
            "Knip de planten na de oogst af op grondniveau - de stikstofknolletjes blijven in de grond.",
        ),
        tip(
            "Pinch broad bean tops once the first pods set: stops black bean aphid.",
            "Top tuinbonen zodra de eerste peulen zetten: stopt de zwarte bonenluis.",
        ),
    ),
    "Asteraceae": tips(
        tip(
            "Slugs love lettuce: beer traps, a ring of wood ash or grit, and evening patrols.",
            "Slakken houden van sla: biervallen, een ring van houtas of grit, en 's avonds rondgaan.",
        ),
        tip(
            "Sow little and often (every 2-3 weeks) for a steady harvest.",
            "Zaai weinig en vaak (elke 2-3 weken) voor een continue oogst.",
        ),
    ),
    "Amaranthaceae": tips(
        tip(
            "Sow in cool weather; spinach bolts with long days and heat.",
            "Zaai bij koel weer; spinazie schiet door bij lange dagen en hitte.",
        ),
    ),
    "Lamiaceae": tips(
        tip(
            "Harvest in the morning when the oils are strongest; cut back after flowering for fresh growth.",
            "Oogst 's ochtends wanneer de oliën het sterkst zijn; knip terug na de bloei voor nieuwe groei.",
        ),
        tip(
            "Most Mediterranean herbs need poor, well-drained soil - no fertiliser.",
            "De meeste mediterrane kruiden willen arme, goed doorlatende grond - geen mest.",
        ),
    ),
    "Rosaceae": tips(
        tip(
            "Mulch, don't dig under fruit: the feeding roots are shallow.",
            "Mulch, spit niet onder fruit: de voedingswortels zitten ondiep.",
        ),
    ),
    "Poaceae": tips(
        tip("Plant in blocks, not single rows: wind-pollinated.", "Plant in blokken, niet in één rij: windbestuiving."),
    ),
}
GENERIC_TIPS = tips(
    tip(
        "Mulch bare soil; it feeds soil life, keeps moisture and suppresses weeds.",
        "Mulch kale grond; dat voedt het bodemleven, houdt vocht vast en onderdrukt onkruid.",
    ),
)


def decorate(plant: dict[str, Any]) -> None:
    """Fill icon, colour, emoji, pollination and tips (never overwrite explicit values)."""
    pid, fam, cat = plant["id"], plant["family"], plant.get("category", "vegetable")
    glyph, colour, emoji = (
        ICON.get(pid) or GLYPH_BY_FAMILY.get(fam) or GLYPH_BY_CATEGORY.get(cat, ("leafy", "#5f9a4a", "🌱"))
    )
    if cat == "herb" and pid not in ICON:
        glyph, emoji = "herb", "🌿"
    plant["icon"], plant["color"], plant["emoji"] = glyph, colour, emoji
    if "pollination" not in plant:
        plant["pollination"] = POLLINATION_BY_FAMILY.get(fam, "self")
    if not plant.get("tips"):
        plant["tips"] = FAMILY_TIPS.get(fam, GENERIC_TIPS)
