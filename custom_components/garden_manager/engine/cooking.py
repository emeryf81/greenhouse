"""Seasonal cooking: a cookbook built from what the garden gives right now.

What is ready to pick (the kitchen report) is matched to cooking techniques that
suit it - a soup, a tray of roasted vegetables, a stir-fry, a pasta, a risotto,
a salad, a gratin, a stew, a frittata, stoemp, stuffed vegetables, a plate with
meat and fries, a pesto, a fruit dessert.  The cook adds what is in the fridge,
a kind of meat or fish (or none), and a side (pasta, rice, bulgur, gnocchi,
potatoes, fries, couscous, pearl couscous ...).  Every recipe is described by a
small *spec* (technique, garden produce, side, protein, extras, servings) and
rendered from it in the user's language, so a saved recipe stays small and
reads well in any language.

The garden produce always comes first: a recipe is only proposed when the garden
supplies its main ingredients; the rest becomes the shopping list.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping, Sequence
from dataclasses import dataclass, field
from datetime import date
import hashlib
import json
import math
from typing import Any

from .models import Plant, PlantCategory
from .pdf import Image, PdfDocument, PdfPage, wrap
from .plantdb import PlantDatabase

# --------------------------------------------------------------------------- #
# Garden produce
# --------------------------------------------------------------------------- #
KINDS = (
    "leafy",
    "brassica",
    "root",
    "allium",
    "fruiting",
    "squash",
    "legume",
    "potato",
    "corn",
    "asparagus",
    "herb",
    "fruit",
)

_ID_KIND = {
    **dict.fromkeys(("potato", "early_potato", "sweet_potato", "oca"), "potato"),
    **dict.fromkeys(("pumpkin", "butternut", "hokkaido", "spaghetti_squash", "patisson"), "squash"),
    **dict.fromkeys(("sweet_corn",), "corn"),
    **dict.fromkeys(("asparagus",), "asparagus"),
    **dict.fromkeys(("onion", "shallot", "spring_onion", "welsh_onion", "leek", "garlic", "elephant_garlic"), "allium"),
    **dict.fromkeys(("florence_fennel", "celery", "celeriac", "jerusalem_artichoke", "yacon", "salsify", "scorzonera",
                     "chinese_artichoke", "radish", "winter_radish", "daikon", "turnip", "swede", "beetroot", "kohlrabi"), "root"),
    **dict.fromkeys(("stinging_nettle", "watercress", "garden_cress", "sorrel", "nz_spinach", "purslane", "winter_purslane",
                     "claytonia_red", "ice_plant", "orache", "samphire"), "leafy"),
    **dict.fromkeys(("rhubarb",), "fruit"),
}  # fmt: skip
_FAMILY_KIND = {
    "Solanaceae": "fruiting", "Cucurbitaceae": "fruiting", "Brassicaceae": "brassica", "Asteraceae": "leafy",
    "Amaranthaceae": "leafy", "Polygonaceae": "leafy", "Montiaceae": "leafy", "Aizoaceae": "leafy", "Caprifoliaceae": "leafy",
    "Apiaceae": "root", "Fabaceae": "legume", "Amaryllidaceae": "allium", "Malvaceae": "fruiting", "Poaceae": "corn",
}  # fmt: skip
# Herbs worth cooking with (the rest of the herb garden is for tea, bees or medicine).
CULINARY_HERBS = frozenset((
    "basil", "greek_basil", "lemon_basil", "purple_basil", "thai_basil", "holy_basil", "parsley", "chives", "garlic_chives",
    "wild_garlic", "dill", "coriander", "thyme", "lemon_thyme", "rosemary", "sage", "oregano", "marjoram", "peppermint",
    "spearmint", "apple_mint", "tarragon", "chervil", "chervil_winter", "lovage", "bay_laurel", "summer_savory",
    "winter_savory", "leaf_celery", "shiso_green", "perilla", "lemongrass", "lemon_balm", "nasturtium", "salad_burnet",
    "vietnamese_coriander", "horseradish",
))  # fmt: skip
_NOT_FOOD = frozenset(("chili_pepper",))  # spice: used, but never as a main vegetable
# Eaten raw: only in salads (and on the side), never cooked in a soup or a wok.
RAW_ONLY = frozenset((
    "lettuce", "cos_lettuce", "iceberg_lettuce", "loose_leaf_lettuce", "lambs_lettuce", "rocket", "purslane", "ice_plant",
    "claytonia_red", "winter_purslane", "garden_cress", "watercress", "watercress_land", "cucumber", "gherkin", "cucamelon",
    "radish", "endive", "radicchio", "salad_burnet",
))  # fmt: skip
_RAW_OK = frozenset(("salad",))

GRAMS_PER_PERSON = {
    "leafy": 90, "brassica": 150, "root": 150, "allium": 40, "fruiting": 150, "squash": 200, "legume": 110,
    "potato": 250, "corn": 120, "asparagus": 150, "herb": 5, "fruit": 130,
}  # fmt: skip
# Colours for the dish picture and the PDF (by kind; the panel uses the crop's own glyph colour).
KIND_COLOR = {
    "leafy": "#5a9a3c", "brassica": "#4f7f3a", "root": "#ef8a1e", "allium": "#d9c7a0", "fruiting": "#d9412b",
    "squash": "#e9922b", "legume": "#7fae4a", "potato": "#c9a46a", "corn": "#f2c230", "asparagus": "#93b35a",
    "herb": "#3f8a3a", "fruit": "#c8325a",
}  # fmt: skip


def produce_kind(plant: Plant | None) -> str | None:
    """What a crop is in the kitchen (None: not something to cook with)."""
    if plant is None or plant.id in _NOT_FOOD:
        return None
    if plant.id in _ID_KIND:
        return _ID_KIND[plant.id]
    if plant.category is PlantCategory.FLOWER:
        return None
    if plant.category is PlantCategory.HERB:
        return "herb" if plant.id in CULINARY_HERBS else None
    if plant.category is PlantCategory.FRUIT:
        return "fruit"
    return _FAMILY_KIND.get(plant.family or "", "leafy")


# --------------------------------------------------------------------------- #
# The rest of the kitchen: sides, meat & fish, what is in the fridge
# --------------------------------------------------------------------------- #
@dataclass(frozen=True, slots=True)
class Item:
    names: tuple[str, str, str]  # en, nl, fr
    qty: float  # per person (or per dish for "dish" units)
    unit: str  # g | ml | pc | clove | slice | tbsp | cube | can
    group: str  # side | meat | fish | veg_protein | dairy | pantry | basic
    per_dish: bool = False

    def name(self, lang: str) -> str:
        return self.names[{"en": 0, "nl": 1, "fr": 2}.get(lang, 0)]


SIDES: dict[str, Item] = {
    "pasta": Item(("pasta", "pasta", "pâtes"), 90, "g", "side"),
    "rice": Item(("rice", "rijst", "riz"), 75, "g", "side"),
    "bulgur": Item(("bulgur", "bulgur", "boulgour"), 70, "g", "side"),
    "couscous": Item(("couscous", "couscous", "couscous"), 70, "g", "side"),
    "pearl_couscous": Item(("pearl couscous", "parelcouscous", "couscous perlé"), 75, "g", "side"),
    "gnocchi": Item(("gnocchi", "gnocchi", "gnocchis"), 200, "g", "side"),
    "potatoes": Item(("potatoes", "aardappelen", "pommes de terre"), 250, "g", "side"),
    "fries": Item(("fries", "frietjes", "frites"), 200, "g", "side"),
    "bread": Item(("crusty bread", "stokbrood", "pain croustillant"), 2, "slice", "side"),
    "noodles": Item(("noodles", "noedels", "nouilles"), 80, "g", "side"),
}
PROTEINS: dict[str, Item] = {
    "chicken": Item(("chicken breast", "kipfilet", "blanc de poulet"), 150, "g", "meat"),
    "chicken_mince": Item(("chicken mince", "kippengehakt", "haché de poulet"), 125, "g", "meat"),
    "beef": Item(("beef (steak strips)", "rundvlees (reepjes)", "bœuf (lanières)"), 150, "g", "meat"),
    "steak": Item(("steak", "steak", "steak"), 180, "g", "meat"),
    "stew_beef": Item(("stewing beef", "stoofvlees", "bœuf à braiser"), 175, "g", "meat"),
    "pork": Item(("pork (strips)", "varkensvlees (reepjes)", "porc (lanières)"), 150, "g", "meat"),
    "pork_tenderloin": Item(("pork tenderloin", "varkenshaasje", "filet mignon de porc"), 150, "g", "meat"),
    "mince": Item(("minced meat", "gehakt", "haché"), 125, "g", "meat"),
    "burger": Item(("burger", "hamburger", "hamburger"), 1, "pc", "meat"),
    "sweetbread": Item(("sweetbreads", "zwezerik", "ris de veau"), 120, "g", "meat"),
    "sausage": Item(("sausage", "worst", "saucisse"), 1, "pc", "meat"),
    "bacon": Item(("bacon cubes", "spekblokjes", "lardons"), 50, "g", "meat"),
    "ham": Item(("ham", "ham", "jambon"), 50, "g", "meat"),
    "salmon": Item(("salmon fillet", "zalmfilet", "filet de saumon"), 125, "g", "fish"),
    "white_fish": Item(("white fish fillet", "witvisfilet", "filet de poisson blanc"), 150, "g", "fish"),
    "shrimp": Item(("prawns", "scampi", "scampis"), 100, "g", "fish"),
    "tofu": Item(("tofu", "tofu", "tofu"), 125, "g", "veg_protein"),
    "chickpeas": Item(("chickpeas (tin)", "kikkererwten (blik)", "pois chiches (boîte)"), 120, "g", "veg_protein"),
    "lentils": Item(("lentils", "linzen", "lentilles"), 60, "g", "veg_protein"),
    "egg": Item(("eggs", "eieren", "œufs"), 2, "pc", "veg_protein"),
    "halloumi": Item(("halloumi", "halloumi", "halloumi"), 70, "g", "veg_protein"),
    "goat_cheese": Item(("goat's cheese", "geitenkaas", "fromage de chèvre"), 50, "g", "veg_protein"),
}
PANTRY: dict[str, Item] = {
    "butter": Item(("butter", "boter", "beurre"), 10, "g", "dairy"),
    "cream": Item(("cream", "room", "crème"), 40, "ml", "dairy"),
    "milk": Item(("milk", "melk", "lait"), 100, "ml", "dairy"),
    "eggs": Item(("eggs", "eieren", "œufs"), 2, "pc", "dairy"),
    "parmesan": Item(("parmesan", "parmezaan", "parmesan"), 15, "g", "dairy"),
    "feta": Item(("feta", "feta", "feta"), 40, "g", "dairy"),
    "mozzarella": Item(("mozzarella", "mozzarella", "mozzarella"), 60, "g", "dairy"),
    "grated_cheese": Item(("grated cheese", "geraspte kaas", "fromage râpé"), 30, "g", "dairy"),
    "yoghurt": Item(("yoghurt", "yoghurt", "yaourt"), 50, "ml", "dairy"),
    "lemon": Item(("lemon", "citroen", "citron"), 0.5, "pc", "pantry", per_dish=True),
    "garlic": Item(("garlic", "look", "ail"), 2, "clove", "pantry", per_dish=True),
    "onion": Item(("onion", "ui", "oignon"), 1, "pc", "pantry", per_dish=True),
    "stock": Item(("stock cube", "bouillonblokje", "cube de bouillon"), 1, "cube", "pantry", per_dish=True),
    "white_wine": Item(("white wine", "witte wijn", "vin blanc"), 100, "ml", "pantry", per_dish=True),
    "tomato_paste": Item(("tomato paste", "tomatenpuree", "concentré de tomates"), 1, "tbsp", "pantry", per_dish=True),
    "coconut_milk": Item(("coconut milk", "kokosmelk", "lait de coco"), 1, "can", "pantry", per_dish=True),
    "curry_paste": Item(("curry paste", "currypasta", "pâte de curry"), 2, "tbsp", "pantry", per_dish=True),
    "soy_sauce": Item(("soy sauce", "sojasaus", "sauce soja"), 2, "tbsp", "pantry", per_dish=True),
    "ginger": Item(("fresh ginger", "verse gember", "gingembre frais"), 1, "pc", "pantry", per_dish=True),
    "honey": Item(("honey", "honing", "miel"), 1, "tbsp", "pantry", per_dish=True),
    "mustard": Item(("mustard", "mosterd", "moutarde"), 1, "tbsp", "pantry", per_dish=True),
    "nuts": Item(
        ("nuts (walnuts, pine nuts)", "noten (walnoten, pijnboompitten)", "noix (noix, pignons)"), 15, "g", "pantry"
    ),
    "flour": Item(("flour", "bloem", "farine"), 2, "tbsp", "pantry", per_dish=True),
    "breadcrumbs": Item(("breadcrumbs", "paneermeel", "chapelure"), 3, "tbsp", "pantry", per_dish=True),
    "puff_pastry": Item(("puff pastry", "bladerdeeg", "pâte feuilletée"), 1, "pc", "pantry", per_dish=True),
    "sugar": Item(("sugar", "suiker", "sucre"), 25, "g", "pantry"),
    "oats": Item(("rolled oats", "havervlokken", "flocons d'avoine"), 25, "g", "pantry"),
    "vinegar": Item(("vinegar", "azijn", "vinaigre"), 1, "tbsp", "pantry", per_dish=True),
}
# Always in the house: never on a shopping list.
BASICS = {
    "salt": Item(("salt", "zout", "sel"), 0, "", "basic"),
    "pepper": Item(("pepper", "peper", "poivre"), 0, "", "basic"),
    "oil": Item(("olive oil", "olijfolie", "huile d'olive"), 0, "", "basic"),
}
# Where a pantry item goes when the cook ticks it as "use this up": cooked along or on top.
_FINISH = frozenset(("parmesan", "feta", "mozzarella", "grated_cheese", "goat_cheese", "nuts", "lemon", "yoghurt"))


# --------------------------------------------------------------------------- #
# Techniques
# --------------------------------------------------------------------------- #
@dataclass(frozen=True, slots=True)
class Technique:
    id: str
    kinds: tuple[str, ...]  # garden produce it suits, best first
    sides: tuple[str, ...]  # sides that belong in the dish (others are served next to it)
    proteins: tuple[str, ...]  # proteins that fit
    staples: tuple[str, ...] = ()  # pantry items the dish needs
    minutes: int = 30
    min_garden: int = 1
    max_garden: int = 3
    sweet: bool = False
    tags: tuple[str, ...] = ()


TECHNIQUES: tuple[Technique, ...] = (
    Technique("soup", ("root", "squash", "leafy", "brassica", "legume", "potato", "fruiting", "allium", "asparagus", "corn"),
              ("bread",), ("bacon", "chicken", "mince", "sausage", "chickpeas", "shrimp", "lentils"), ("onion", "stock", "cream"), 35,
              tags=("warm",)),
    Technique("roast", ("root", "squash", "fruiting", "brassica", "potato", "allium", "corn", "asparagus"),
              ("couscous", "pearl_couscous", "bulgur", "potatoes", "bread"),
              ("chicken", "pork_tenderloin", "sausage", "chicken_mince", "salmon", "halloumi", "chickpeas", "goat_cheese"),
              ("garlic",), 45, 2, 4, tags=("oven",)),
    Technique("stir_fry", ("brassica", "legume", "leafy", "allium", "fruiting", "corn", "asparagus", "root"),
              ("rice", "noodles"), ("chicken", "beef", "pork", "shrimp", "tofu", "chicken_mince"),
              ("garlic", "ginger", "soy_sauce"), 20, 2, 4, tags=("quick",)),
    Technique("pasta", ("fruiting", "leafy", "brassica", "legume", "allium", "squash", "asparagus", "herb"),
              ("pasta", "gnocchi"), ("mince", "bacon", "chicken", "shrimp", "salmon", "sausage", "ham"),
              ("garlic", "parmesan"), 25, 1, 3, tags=("quick",)),
    Technique("risotto", ("squash", "leafy", "asparagus", "legume", "root", "brassica", "fruiting"),
              ("rice",), ("chicken", "bacon", "shrimp", "sweetbread", "salmon", "sausage"),
              ("onion", "stock", "white_wine", "parmesan", "butter"), 35, 1, 2),
    Technique("salad", ("leafy", "fruiting", "root", "legume", "fruit", "corn", "asparagus", "brassica", "herb"),
              ("bulgur", "couscous", "pearl_couscous", "potatoes", "bread", "pasta"),
              ("chicken", "steak", "salmon", "egg", "goat_cheese", "halloumi", "shrimp", "chickpeas", "ham"),
              ("lemon", "mustard"), 20, 2, 4, tags=("fresh", "quick")),
    Technique("gratin", ("potato", "brassica", "root", "squash", "leafy", "fruiting"),
              ("potatoes", "pasta"), ("mince", "ham", "chicken", "bacon", "sausage"),
              ("cream", "grated_cheese", "garlic"), 50, 1, 3, tags=("oven",)),
    Technique("stew", ("root", "squash", "legume", "fruiting", "leafy", "brassica", "potato"),
              ("rice", "couscous", "bread", "potatoes"), ("chicken", "stew_beef", "pork", "chickpeas", "lentils"),
              ("onion", "garlic", "curry_paste", "coconut_milk"), 45, 2, 4, tags=("warm",)),
    Technique("frittata", ("leafy", "allium", "fruiting", "asparagus", "potato", "legume", "herb", "brassica"),
              ("bread", "potatoes"), ("bacon", "ham", "salmon", "goat_cheese"), ("eggs", "grated_cheese"), 25, 1, 3),
    Technique("stoemp", ("leafy", "root", "brassica", "allium"), ("potatoes",),
              ("sausage", "mince", "pork_tenderloin", "burger", "bacon"), ("butter", "milk"), 35, 1, 2, tags=("warm",)),
    Technique("stuffed", ("fruiting", "squash"), ("rice", "bulgur", "couscous"), ("mince", "chicken_mince", "lentils", "feta"),
              ("onion", "garlic", "grated_cheese"), 50, 1, 2, tags=("oven",)),
    Technique("plate", ("legume", "brassica", "leafy", "root", "asparagus", "fruiting", "squash", "corn"),
              ("fries", "potatoes"), ("steak", "burger", "sweetbread", "pork_tenderloin", "chicken", "salmon", "sausage"),
              ("butter",), 30, 1, 2),
    Technique("pesto", ("herb", "leafy"), ("pasta", "gnocchi", "bread"), ("chicken", "shrimp"), ("garlic", "parmesan", "nuts"),
              15, 1, 2, tags=("quick",)),
    Technique("dessert", ("fruit",), (), (), ("sugar", "butter", "flour", "oats"), 40, 1, 2, sweet=True, tags=("sweet",)),
)  # fmt: skip
TECHNIQUE = {t.id: t for t in TECHNIQUES}

# --------------------------------------------------------------------------- #
# Texts
# --------------------------------------------------------------------------- #
_PREP: dict[str, dict[str, str]] = {
    "en": {"leafy": "{n} roughly chopped", "brassica": "{n} in florets or strips", "root": "{n} peeled and diced",
           "allium": "{n} finely chopped", "fruiting": "{n} in chunks", "squash": "{n} in cubes", "legume": "{n} podded or cut",
           "potato": "{n} in cubes", "corn": "{n} cut from the cob", "asparagus": "{n} peeled, woody ends off",
           "herb": "{n} chopped", "fruit": "{n} washed and cut"},
    "nl": {"leafy": "{n} grof gesneden", "brassica": "{n} in roosjes of repen", "root": "{n} geschild in blokjes",
           "allium": "{n} fijngesneden", "fruiting": "{n} in stukken", "squash": "{n} in blokjes", "legume": "{n} gedopt of in stukjes",
           "potato": "{n} in blokjes", "corn": "{n} van de kolf gesneden", "asparagus": "{n} geschild, houtige voetjes eraf",
           "herb": "{n} fijngehakt", "fruit": "{n} gewassen en in stukken"},
    "fr": {"leafy": "{n} grossièrement haché", "brassica": "{n} en fleurettes ou lanières", "root": "{n} pelé en dés",
           "allium": "{n} finement émincé", "fruiting": "{n} en morceaux", "squash": "{n} en cubes", "legume": "{n} écossé ou coupé",
           "potato": "{n} en cubes", "corn": "{n} égrené", "asparagus": "{n} pelé, bouts durs ôtés",
           "herb": "{n} ciselé", "fruit": "{n} lavé et coupé"},
}  # fmt: skip

_TITLE: dict[str, dict[str, str]] = {
    "en": {"soup": "{a} soup", "roast": "Roasted {a}",
           "stir_fry": "Stir-fried {a}", "pasta": "Pasta with {a}",
           "risotto": "{a} risotto", "salad": "Salad of {a}",
           "gratin": "{a} gratin", "stew": "{a} stew",
           "frittata": "Frittata with {a}", "stoemp": "Stoemp with {a}",
           "stuffed": "Stuffed {a}", "plate": "Plate with {a}",
           "pesto": "{a} pesto", "dessert": "{a} crumble"},
    "nl": {"soup": "Soep van {a}", "roast": "Geroosterde {a}",
           "stir_fry": "Wok met {a}", "pasta": "Pasta met {a}",
           "risotto": "Risotto met {a}", "salad": "Salade met {a}",
           "gratin": "Gratin van {a}", "stew": "Stoofpotje van {a}",
           "frittata": "Frittata met {a}", "stoemp": "Stoemp met {a}",
           "stuffed": "Gevulde {a}", "plate": "Bord met {a}",
           "pesto": "Pesto van {a}", "dessert": "Crumble van {a}"},
    "fr": {"soup": "Soupe de {a}", "roast": "{a} rôtis au four",
           "stir_fry": "Wok de {a}", "pasta": "Pâtes aux {a}",
           "risotto": "Risotto aux {a}", "salad": "Salade de {a}",
           "gratin": "Gratin de {a}", "stew": "Mijoté de {a}",
           "frittata": "Frittata aux {a}", "stoemp": "Stoemp aux {a}",
           "stuffed": "{a} farcis", "plate": "Assiette aux {a}",
           "pesto": "Pesto de {a}", "dessert": "Crumble de {a}"},
}  # fmt: skip

_WITH = {"en": "with {p}", "nl": "met {p}", "fr": "avec {p}"}
_AND = {"en": "and", "nl": "en", "fr": "et"}

# The steps of each technique.  {veg}: the garden produce, {prep}: how to cut it,
# {herbs}: garden herbs (or a fallback), {side}: the side in the dish.
_STEPS: dict[str, dict[str, list[str]]] = {
    "en": {
        "soup": ["Prepare the vegetables: {prep}.", "Soften the onion in a little oil in a large pan, add the vegetables and stir for 3 minutes.",
                 "Cover with water and the stock cube, bring to the boil and simmer for 20 minutes until tender.",
                 "Blend smooth (or leave chunky), stir in the cream and season with salt and pepper."],
        "roast": ["Heat the oven to 210 °C. Prepare the vegetables: {prep}.",
                  "Toss them on a baking tray with olive oil, the crushed garlic, salt and pepper.",
                  "Roast for 30-35 minutes, turning halfway, until golden at the edges."],
        "stir_fry": ["Prepare the vegetables: {prep}. Chop garlic and ginger finely.",
                     "Heat a wok or large pan very hot with a little oil; stir-fry garlic and ginger for 30 seconds.",
                     "Add the firmest vegetables first, the tender ones after 2 minutes; keep everything crisp.",
                     "Season with soy sauce and a splash of water, toss and serve straight away."],
        "pasta": ["Prepare the vegetables: {prep}.", "Gently fry the garlic in olive oil, add the vegetables and cook 6-8 minutes until just tender.",
                  "Toss with the drained {side} and a ladle of cooking water until glossy.", "Serve with grated parmesan and black pepper."],
        "risotto": ["Prepare the vegetables: {prep}. Keep the stock hot in a pan.",
                    "Soften the onion in butter, add the rice and stir for 2 minutes; deglaze with the wine.",
                    "Add hot stock ladle by ladle, stirring, for 18 minutes; add the vegetables halfway.",
                    "Off the heat stir in a knob of butter and the parmesan; rest 2 minutes, covered."],
        "salad": ["Prepare the vegetables: {prep}.", "Whisk a dressing of 3 tbsp olive oil, the lemon juice, a teaspoon of mustard, salt and pepper.",
                  "Toss everything just before serving."],
        "gratin": ["Heat the oven to 190 °C. Prepare the vegetables: {prep}.",
                   "Blanch the firm vegetables for 5 minutes in salted water and drain well.",
                   "Layer them in a buttered dish, pour over the cream with the crushed garlic, salt and pepper.",
                   "Cover with grated cheese and bake for 30 minutes until golden and bubbling."],
        "stew": ["Prepare the vegetables: {prep}.", "Soften onion and garlic in oil, stir in the curry paste for a minute.",
                 "Add the vegetables, the coconut milk and a glass of water; simmer gently for 25 minutes.",
                 "Season with salt and a squeeze of lemon if you have one."],
        "frittata": ["Prepare the vegetables: {prep}.", "Soften them in a little oil in an ovenproof pan for 5 minutes.",
                     "Beat the eggs with the cheese, salt and pepper and pour over the vegetables.",
                     "Cook on a low heat for 8 minutes, then 5 minutes under the grill until set and golden."],
        "stoemp": ["Prepare the vegetables: {prep}.", "Boil the potatoes in salted water for 20 minutes; add the vegetables for the last 6-8 minutes.",
                   "Drain and mash coarsely with butter and a splash of warm milk; season with salt, pepper and a little nutmeg."],
        "stuffed": ["Heat the oven to 190 °C. Hollow out the vegetables: {prep}; keep the flesh.",
                    "Fry the onion, garlic and chopped flesh, mix with the cooked {side} and season well.",
                    "Fill the vegetables, top with grated cheese and bake for 30 minutes."],
        "plate": ["Prepare the vegetables: {prep}.", "Steam or boil them briefly until just tender, then toss in butter with salt and pepper.",
                  "Plate everything together while hot."],
        "pesto": ["Blend the herbs and greens ({prep}) with garlic, nuts, parmesan and olive oil to a coarse paste.",
                  "Season with salt, pepper and lemon; loosen with a little cooking water.",
                  "Toss with the hot {side} or spread on toasted bread."],
        "dessert": ["Heat the oven to 180 °C. Prepare the fruit: {prep}; put it in a buttered dish with a spoon of sugar.",
                    "Rub flour, oats, sugar and cold butter to coarse crumbs and scatter over the fruit.",
                    "Bake for 30-35 minutes until golden and bubbling. Lovely with yoghurt or cream."],
    },
    "nl": {
        "soup": ["Maak de groenten klaar: {prep}.", "Stoof de ui in wat olie in een grote pot, voeg de groenten toe en roer 3 minuten.",
                 "Giet er water op met het bouillonblokje, breng aan de kook en laat 20 minuten zacht koken tot alles gaar is.",
                 "Mix glad (of laat wat stukjes), roer de room erdoor en breng op smaak met peper en zout."],
        "roast": ["Verwarm de oven voor op 210 °C. Maak de groenten klaar: {prep}.",
                  "Meng ze op een bakplaat met olijfolie, de geplette look, peper en zout.",
                  "Rooster 30-35 minuten, halverwege omscheppen, tot de randjes goudbruin zijn."],
        "stir_fry": ["Maak de groenten klaar: {prep}. Hak look en gember fijn.",
                     "Verhit een wok of grote pan heel heet met wat olie; roerbak look en gember 30 seconden.",
                     "Eerst de stevigste groenten, na 2 minuten de zachte; alles moet knapperig blijven.",
                     "Blus met sojasaus en een scheutje water, schep om en dien meteen op."],
        "pasta": ["Maak de groenten klaar: {prep}.", "Fruit de look zachtjes in olijfolie, voeg de groenten toe en bak 6-8 minuten tot ze net gaar zijn.",
                  "Meng met de uitgelekte {side} en een soeplepel kookvocht tot alles glanst.", "Dien op met geraspte parmezaan en versgemalen peper."],
        "risotto": ["Maak de groenten klaar: {prep}. Houd de bouillon warm in een pannetje.",
                    "Stoof de ui in boter, voeg de rijst toe en roer 2 minuten; blus met de wijn.",
                    "Voeg al roerend lepel per lepel warme bouillon toe, 18 minuten lang; de groenten halverwege erbij.",
                    "Van het vuur een klontje boter en de parmezaan erdoor; laat 2 minuten afgedekt rusten."],
        "salad": ["Maak de groenten klaar: {prep}.", "Klop een dressing van 3 el olijfolie, het citroensap, een koffielepel mosterd, peper en zout.",
                  "Meng alles vlak voor het opdienen."],
        "gratin": ["Verwarm de oven voor op 190 °C. Maak de groenten klaar: {prep}.",
                   "Blancheer de stevige groenten 5 minuten in gezouten water en laat goed uitlekken.",
                   "Leg ze in laagjes in een beboterde ovenschaal, giet de room met geplette look, peper en zout erover.",
                   "Bestrooi met geraspte kaas en bak 30 minuten tot het goudbruin borrelt."],
        "stew": ["Maak de groenten klaar: {prep}.", "Stoof ui en look in olie, roer de currypasta er een minuut door.",
                 "Voeg de groenten, de kokosmelk en een glas water toe; laat 25 minuten zacht pruttelen.",
                 "Breng op smaak met zout en een scheutje citroensap."],
        "frittata": ["Maak de groenten klaar: {prep}.", "Stoof ze 5 minuten in wat olie in een ovenvaste pan.",
                     "Klop de eieren los met de kaas, peper en zout en giet over de groenten.",
                     "Laat 8 minuten op laag vuur stollen en zet dan 5 minuten onder de grill tot de bovenkant goudbruin is."],
        "stoemp": ["Maak de groenten klaar: {prep}.", "Kook de aardappelen 20 minuten in gezouten water; de groenten de laatste 6-8 minuten erbij.",
                   "Giet af en stamp grof met boter en een scheut warme melk; peper, zout en een snuifje nootmuskaat."],
        "stuffed": ["Verwarm de oven voor op 190 °C. Hol de groenten uit: {prep}; bewaar het vruchtvlees.",
                    "Bak ui, look en het gehakte vruchtvlees, meng met de gekookte {side} en kruid goed.",
                    "Vul de groenten, bestrooi met geraspte kaas en bak 30 minuten in de oven."],
        "plate": ["Maak de groenten klaar: {prep}.", "Stoom of kook ze kort tot ze net gaar zijn en schep ze om in boter met peper en zout.",
                  "Schik alles warm op het bord."],
        "pesto": ["Mix de kruiden en het blad ({prep}) met look, noten, parmezaan en olijfolie tot een grove pasta.",
                  "Breng op smaak met peper, zout en citroen; maak wat losser met een scheutje kookvocht.",
                  "Meng met de warme {side} of smeer op geroosterd brood."],
        "dessert": ["Verwarm de oven voor op 180 °C. Maak het fruit klaar: {prep}; leg het in een beboterde schaal met een lepel suiker.",
                    "Wrijf bloem, havervlokken, suiker en koude boter tot grove kruimels en strooi over het fruit.",
                    "Bak 30-35 minuten tot het goudbruin borrelt. Lekker met yoghurt of room."],
    },
    "fr": {
        "soup": ["Préparez les légumes : {prep}.", "Faites revenir l'oignon dans un peu d'huile, ajoutez les légumes et remuez 3 minutes.",
                 "Couvrez d'eau avec le cube de bouillon, portez à ébullition et laissez mijoter 20 minutes.",
                 "Mixez (ou gardez des morceaux), ajoutez la crème, salez et poivrez."],
        "roast": ["Préchauffez le four à 210 °C. Préparez les légumes : {prep}.",
                  "Mélangez-les sur une plaque avec l'huile d'olive, l'ail écrasé, sel et poivre.",
                  "Rôtissez 30-35 minutes en remuant à mi-cuisson, jusqu'à ce que les bords dorent."],
        "stir_fry": ["Préparez les légumes : {prep}. Hachez finement l'ail et le gingembre.",
                     "Chauffez un wok très fort avec un peu d'huile ; faites sauter l'ail et le gingembre 30 secondes.",
                     "D'abord les légumes fermes, les tendres après 2 minutes ; tout doit rester croquant.",
                     "Déglacez à la sauce soja et un trait d'eau, mélangez et servez aussitôt."],
        "pasta": ["Préparez les légumes : {prep}.", "Faites revenir l'ail doucement dans l'huile d'olive, ajoutez les légumes et cuisez 6-8 minutes.",
                  "Mélangez avec les {side} égouttées et une louche d'eau de cuisson.", "Servez avec du parmesan râpé et du poivre."],
        "risotto": ["Préparez les légumes : {prep}. Gardez le bouillon chaud.",
                    "Faites suer l'oignon au beurre, ajoutez le riz et remuez 2 minutes ; déglacez au vin.",
                    "Ajoutez le bouillon louche par louche en remuant pendant 18 minutes ; les légumes à mi-cuisson.",
                    "Hors du feu, une noix de beurre et le parmesan ; laissez reposer 2 minutes couvert."],
        "salad": ["Préparez les légumes : {prep}.", "Fouettez une vinaigrette : 3 c. à s. d'huile d'olive, le jus de citron, une c. à c. de moutarde, sel, poivre.",
                  "Mélangez juste avant de servir."],
        "gratin": ["Préchauffez le four à 190 °C. Préparez les légumes : {prep}.",
                   "Blanchissez les légumes fermes 5 minutes à l'eau salée et égouttez bien.",
                   "Disposez-les dans un plat beurré, versez la crème avec l'ail écrasé, sel et poivre.",
                   "Parsemez de fromage râpé et enfournez 30 minutes jusqu'à ce que ce soit doré."],
        "stew": ["Préparez les légumes : {prep}.", "Faites revenir oignon et ail, ajoutez la pâte de curry une minute.",
                 "Ajoutez les légumes, le lait de coco et un verre d'eau ; mijotez 25 minutes.",
                 "Salez et ajoutez un trait de citron."],
        "frittata": ["Préparez les légumes : {prep}.", "Faites-les revenir 5 minutes dans une poêle allant au four.",
                     "Battez les œufs avec le fromage, sel et poivre et versez sur les légumes.",
                     "Laissez prendre 8 minutes à feu doux, puis 5 minutes sous le gril."],
        "stoemp": ["Préparez les légumes : {prep}.", "Cuisez les pommes de terre 20 minutes à l'eau salée ; les légumes les 6-8 dernières minutes.",
                   "Égouttez et écrasez grossièrement avec du beurre et un peu de lait chaud ; sel, poivre, muscade."],
        "stuffed": ["Préchauffez le four à 190 °C. Évidez les légumes : {prep} ; gardez la chair.",
                    "Faites revenir oignon, ail et la chair hachée, mélangez avec le {side} cuit et assaisonnez.",
                    "Farcissez, parsemez de fromage râpé et enfournez 30 minutes."],
        "plate": ["Préparez les légumes : {prep}.", "Cuisez-les brièvement à la vapeur ou à l'eau, puis enrobez-les de beurre, sel et poivre.",
                  "Dressez le tout bien chaud."],
        "pesto": ["Mixez les herbes et les feuilles ({prep}) avec ail, noix, parmesan et huile d'olive.",
                  "Salez, poivrez, ajoutez du citron ; détendez avec un peu d'eau de cuisson.",
                  "Mélangez aux {side} chaudes ou tartinez sur du pain grillé."],
        "dessert": ["Préchauffez le four à 180 °C. Préparez les fruits : {prep} ; mettez-les dans un plat beurré avec une cuillerée de sucre.",
                    "Sablez farine, flocons d'avoine, sucre et beurre froid et parsemez sur les fruits.",
                    "Enfournez 30-35 minutes. Délicieux avec du yaourt ou de la crème."],
    },
}  # fmt: skip

# How each protein is cooked, by where it goes in the dish.
_PROTEIN_STEP = {
    "en": {"meat": "Cook the {p} in a hot pan with a little oil until browned and cooked through; season with salt and pepper.",
           "stew_beef": "Brown the {p} on all sides first and let it simmer along for at least 1 hour (add the vegetables later).",
           "fish": "Cook the {p} gently in a little oil or butter for 3-4 minutes per side; season with salt and lemon.",
           "veg_protein": "Add the {p}: pan-fry tofu or halloumi until golden, warm chickpeas or lentils through the dish, boil eggs for 7 minutes.",
           "bacon": "Fry the {p} crisp first and use the fat for the vegetables."},
    "nl": {"meat": "Bak het {p} in een hete pan met wat olie bruin en gaar; kruid met peper en zout.",
           "stew_beef": "Schroei het {p} eerst rondom dicht en laat het minstens 1 uur mee sudderen (de groenten later toevoegen).",
           "fish": "Bak de {p} zachtjes 3-4 minuten per kant in wat olie of boter; kruid met zout en citroen.",
           "veg_protein": "Voeg de {p} toe: tofu of halloumi goudbruin bakken, kikkererwten of linzen meewarmen, eieren 7 minuten koken.",
           "bacon": "Bak eerst de {p} krokant en gebruik het vet voor de groenten."},
    "fr": {"meat": "Faites dorer le {p} dans une poêle chaude avec un peu d'huile jusqu'à cuisson ; salez et poivrez.",
           "stew_beef": "Saisissez d'abord le {p} de tous côtés et laissez-le mijoter au moins 1 heure (ajoutez les légumes ensuite).",
           "fish": "Cuisez le {p} doucement 3-4 minutes par face dans un peu d'huile ou de beurre ; sel et citron.",
           "veg_protein": "Ajoutez le {p} : tofu ou halloumi dorés à la poêle, pois chiches ou lentilles réchauffés dans le plat, œufs cuits 7 minutes.",
           "bacon": "Faites d'abord croustiller les {p} et utilisez la graisse pour les légumes."},
}  # fmt: skip

_SIDE_STEP = {
    "en": {"pasta": "Cook the pasta al dente in plenty of salted water.", "rice": "Cook the rice as on the pack.",
           "bulgur": "Pour boiling water over the bulgur (1.5 times its volume), cover and leave 15 minutes.",
           "couscous": "Pour boiling stock over the couscous (same volume), cover for 5 minutes and fluff with a fork.",
           "pearl_couscous": "Cook the pearl couscous for 8 minutes in salted water and drain.",
           "gnocchi": "Cook the gnocchi until they float (2-3 minutes), or fry them golden in butter.",
           "potatoes": "Boil the potatoes in salted water for 20 minutes (or roast them in wedges).",
           "fries": "Bake or fry the fries until golden and crisp.", "bread": "Toast the bread or warm it in the oven.",
           "noodles": "Cook the noodles as on the pack and rinse briefly."},
    "nl": {"pasta": "Kook de pasta beetgaar in ruim gezouten water.", "rice": "Kook de rijst volgens de verpakking.",
           "bulgur": "Giet kokend water over de bulgur (1,5 keer het volume), dek af en laat 15 minuten wellen.",
           "couscous": "Giet kokende bouillon over de couscous (zelfde volume), laat 5 minuten afgedekt staan en maak los met een vork.",
           "pearl_couscous": "Kook de parelcouscous 8 minuten in gezouten water en giet af.",
           "gnocchi": "Kook de gnocchi tot ze bovendrijven (2-3 minuten), of bak ze goudbruin in boter.",
           "potatoes": "Kook de aardappelen 20 minuten in gezouten water (of rooster ze in partjes).",
           "fries": "Bak de frietjes goudbruin en krokant (oven of friteuse).", "bread": "Rooster het brood of warm het op in de oven.",
           "noodles": "Kook de noedels volgens de verpakking en spoel ze kort."},
    "fr": {"pasta": "Cuisez les pâtes al dente dans beaucoup d'eau salée.", "rice": "Cuisez le riz selon l'emballage.",
           "bulgur": "Versez de l'eau bouillante sur le boulgour (1,5 fois son volume), couvrez 15 minutes.",
           "couscous": "Versez du bouillon bouillant sur la semoule (même volume), couvrez 5 minutes et égrenez.",
           "pearl_couscous": "Cuisez le couscous perlé 8 minutes à l'eau salée et égouttez.",
           "gnocchi": "Cuisez les gnocchis jusqu'à ce qu'ils remontent (2-3 minutes), ou dorez-les au beurre.",
           "potatoes": "Cuisez les pommes de terre 20 minutes à l'eau salée (ou rôtissez-les en quartiers).",
           "fries": "Faites cuire les frites jusqu'à ce qu'elles soient dorées et croustillantes.",
           "bread": "Faites griller le pain ou réchauffez-le au four.", "noodles": "Cuisez les nouilles selon l'emballage et rincez."},
}  # fmt: skip
_SERVE_SIDE = {"en": "Serve with the {s}.", "nl": "Serveer met de {s}.", "fr": "Servez avec les {s}."}
_EXTRA_COOK = {"en": "Stir in the {x} for the last few minutes.", "nl": "Roer de {x} er de laatste minuten door.",
               "fr": "Incorporez {x} les dernières minutes."}  # fmt: skip
_EXTRA_FINISH = {"en": "Finish with {x}.", "nl": "Werk af met {x}.", "fr": "Terminez avec {x}."}
_HERBS = {"en": "Scatter over the {h} just before serving.", "nl": "Strooi vlak voor het opdienen de {h} erover.",
          "fr": "Parsemez de {h} juste avant de servir."}  # fmt: skip
_UNITS = {
    "en": {
        "g": "g",
        "ml": "ml",
        "pc": "",
        "clove": "cloves",
        "slice": "slices",
        "tbsp": "tbsp",
        "cube": "",
        "can": "tin",
    },
    "nl": {
        "g": "g",
        "ml": "ml",
        "pc": "",
        "clove": "teentjes",
        "slice": "sneden",
        "tbsp": "el",
        "cube": "",
        "can": "blik",
    },
    "fr": {
        "g": "g",
        "ml": "ml",
        "pc": "",
        "clove": "gousses",
        "slice": "tranches",
        "tbsp": "c. à s.",
        "cube": "",
        "can": "boîte",
    },
}
_TAG = {
    "en": {"warm": "warming", "oven": "oven", "quick": "quick", "fresh": "fresh", "sweet": "sweet", "vegetarian": "vegetarian",
           "garden": "from the garden"},
    "nl": {"warm": "verwarmend", "oven": "oven", "quick": "snel", "fresh": "fris", "sweet": "zoet", "vegetarian": "vegetarisch",
           "garden": "uit de tuin"},
    "fr": {"warm": "réconfortant", "oven": "four", "quick": "rapide", "fresh": "frais", "sweet": "sucré", "vegetarian": "végétarien",
           "garden": "du jardin"},
}  # fmt: skip
_TECH_NAME = {
    "en": {"soup": "Soup", "roast": "Oven tray", "stir_fry": "Stir-fry", "pasta": "Pasta", "risotto": "Risotto", "salad": "Salad",
           "gratin": "Gratin", "stew": "Stew & curry", "frittata": "Frittata", "stoemp": "Stoemp", "stuffed": "Stuffed vegetables",
           "plate": "Meat & two veg", "pesto": "Pesto", "dessert": "Dessert"},
    "nl": {"soup": "Soep", "roast": "Ovenschotel", "stir_fry": "Wok", "pasta": "Pasta", "risotto": "Risotto", "salad": "Salade",
           "gratin": "Gratin", "stew": "Stoofpot & curry", "frittata": "Frittata", "stoemp": "Stoemp", "stuffed": "Gevulde groenten",
           "plate": "Bord met vlees en groenten", "pesto": "Pesto", "dessert": "Dessert"},
    "fr": {"soup": "Soupe", "roast": "Plaque au four", "stir_fry": "Wok", "pasta": "Pâtes", "risotto": "Risotto", "salad": "Salade",
           "gratin": "Gratin", "stew": "Mijoté & curry", "frittata": "Frittata", "stoemp": "Stoemp", "stuffed": "Légumes farcis",
           "plate": "Assiette viande et légumes", "pesto": "Pesto", "dessert": "Dessert"},
}  # fmt: skip
_PDF = {
    "en": {"book": "Seasonal cookbook", "from_garden": "from the garden", "ingredients": "Ingredients", "method": "Method",
           "servings": "{n} servings", "minutes": "{n} min", "shopping": "Shopping list", "to_buy": "To buy",
           "garden_items": "From the garden (no need to buy)", "contents": "In this book", "made": "Made with Hortulus on {d}"},
    "nl": {"book": "Seizoenskookboek", "from_garden": "uit de tuin", "ingredients": "Ingrediënten", "method": "Bereiding",
           "servings": "{n} personen", "minutes": "{n} min", "shopping": "Boodschappenlijst", "to_buy": "Te kopen",
           "garden_items": "Uit de tuin (niet kopen)", "contents": "In dit kookboek", "made": "Gemaakt met Hortulus op {d}"},
    "fr": {"book": "Livre de cuisine de saison", "from_garden": "du jardin", "ingredients": "Ingrédients", "method": "Préparation",
           "servings": "{n} personnes", "minutes": "{n} min", "shopping": "Liste de courses", "to_buy": "À acheter",
           "garden_items": "Du jardin (inutile d'acheter)", "contents": "Dans ce livre", "made": "Réalisé avec Hortulus le {d}"},
}  # fmt: skip


def short_name(plant: Plant, lang: str) -> str:
    """'Pumpkin / Winter squash' -> 'pumpkin', 'French bean (bush)' -> 'french bean'."""
    return plant.name(lang).split(" / ")[0].split(" (")[0].strip().lower()


def label(key: str, lang: str | None = "en") -> str:
    """A fixed text of the cookbook (``shopping``, ``book`` ...) in ``lang``."""
    return _PDF[_lang(lang)][key]


def _lang(lang: str | None) -> str:
    return lang if lang in ("en", "nl", "fr") else "en"


def _join(names: Sequence[str], lang: str) -> str:
    names = [n for n in names if n]
    if len(names) <= 1:
        return "".join(names)
    return ", ".join(names[:-1]) + f" {_AND[lang]} " + names[-1]


# --------------------------------------------------------------------------- #
# Building a recipe from its spec
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class Prefs:
    """What the cook adds: fridge items to use, proteins they like, a side, how many eat."""

    pantry: list[str] = field(default_factory=list)  # in the house (not to buy)
    use: list[str] = field(default_factory=list)  # extras to work into the dish
    proteins: list[str] = field(default_factory=list)  # empty: vegetarian
    side: str = ""  # "" = the dish's own choice
    servings: int = 2

    @classmethod
    def from_dict(cls, raw: Mapping[str, Any] | None) -> Prefs:
        raw = raw if isinstance(raw, Mapping) else {}

        def ids(key: str, *allowed: Mapping[str, Any]) -> list[str]:
            value = raw.get(key)
            items = value if isinstance(value, list) else []
            return [x for x in items if isinstance(x, str) and any(x in a for a in allowed)]

        side = raw.get("side")
        return cls(
            pantry=ids("pantry", PANTRY, SIDES, PROTEINS),
            use=ids("use", PANTRY),
            proteins=ids("proteins", PROTEINS),
            side=side if isinstance(side, str) and (side in SIDES or side == "none") else "",
            servings=servings_of(raw.get("servings")),
        )


def servings_of(value: Any, default: int = 2) -> int:
    """A number of servings between 1 and 12 (anything unreadable: the default)."""
    try:
        n = int(value) if value not in (None, "") else default
    except (TypeError, ValueError):
        n = default
    return max(1, min(12, n))


def spec_id(spec: Mapping[str, Any]) -> str:
    key = json.dumps(
        {k: spec.get(k) for k in ("technique", "produce", "side", "protein", "extras", "servings")}, sort_keys=True
    )
    return "r" + hashlib.sha1(key.encode()).hexdigest()[:11]


def _qty(value: float, unit: str) -> float:
    if unit in ("g", "ml"):
        return float(max(5, round(value / 10) * 10)) if value >= 20 else float(max(5, round(value / 5) * 5))
    return round(value * 2) / 2 if value < 5 else float(round(value))


def _fmt(qty: float, unit: str, lang: str) -> str:
    if not unit and not qty:
        return ""
    num = f"{qty:g}".replace(".", "," if lang != "en" else ".")
    label = _UNITS[lang].get(unit, unit)
    return f"{num} {label}".strip()


def render(spec: Mapping[str, Any], db: PlantDatabase, lang: str | None = "en", garden_herbs: Sequence[str] = (),
           pantry: Iterable[str] = ()) -> dict[str, Any] | None:  # fmt: skip
    """The full recipe for a spec, in ``lang``.  None when the spec no longer makes sense."""
    lang = _lang(lang)
    tech = TECHNIQUE.get(str(spec.get("technique")))
    if tech is None:
        return None
    if not isinstance(spec, Mapping):
        return None
    servings = servings_of(spec.get("servings"))
    produce: list[tuple[Plant, str]] = []
    for pid in spec.get("produce") or []:
        plant = db.get(pid)
        kind = produce_kind(plant)
        if plant is not None and kind is not None:
            produce.append((plant, kind))
    if not produce:
        return None
    side_id = str(spec.get("side") or "")
    side = SIDES.get(side_id)
    protein_id = str(spec.get("protein") or "")
    protein = PROTEINS.get(protein_id)
    extras = [x for x in spec.get("extras") or [] if x in PANTRY]
    in_house = set(pantry)

    names = [short_name(p, lang) for p, _ in produce]
    main_names = [n for (p, k), n in zip(produce, names, strict=True) if k != "herb"] or names
    a = main_names[0]
    title = _TITLE[lang][tech.id].format(a=_join(main_names[:3], lang))
    title = title[0].upper() + title[1:]
    subtitle = _WITH[lang].format(p=protein.name(lang)) if protein else ""

    # ingredients
    ingredients: list[dict[str, Any]] = []
    non_herbs = [(p, k) for p, k in produce if k != "herb"]
    share = 1.0 if len(non_herbs) <= 1 else (1.6 / len(non_herbs))  # several vegetables share the plate
    for plant, kind in produce:
        grams = GRAMS_PER_PERSON[kind] * servings * (1.0 if kind == "herb" else share)
        if tech.id == "pesto" and kind in ("herb", "leafy"):
            grams = 25 * servings
        ingredients.append({"id": plant.id, "plant_id": plant.id, "name": plant.name(lang), "qty": _qty(grams, "g"), "unit": "g",
                            "group": "garden", "kind": kind, "source": "garden", "color": plant.color or KIND_COLOR[kind]})  # fmt: skip
    if side is not None:
        qty = side.qty * servings
        ingredients.append({"id": side_id, "name": side.name(lang), "qty": _qty(qty, side.unit), "unit": side.unit, "group": "side",
                            "source": "pantry" if side_id in in_house else "shop"})  # fmt: skip
    if protein is not None:
        qty = protein.qty * servings
        ingredients.append({"id": protein_id, "name": protein.name(lang), "qty": _qty(qty, protein.unit), "unit": protein.unit,
                            "group": protein.group, "source": "pantry" if protein_id in in_house else "shop"})  # fmt: skip
    garden_ids = {p.id for p, _ in produce}
    for item_id in [*tech.staples, *[x for x in extras if x not in tech.staples]]:
        if item_id in ("onion", "garlic") and garden_ids & (
            {"onion", "shallot", "leek"} if item_id == "onion" else {"garlic", "elephant_garlic"}
        ):
            continue  # the garden gives it
        item = PANTRY[item_id]
        qty = item.qty * (1 if item.per_dish else servings)
        ingredients.append({"id": item_id, "name": item.name(lang), "qty": _qty(qty, item.unit), "unit": item.unit, "group": item.group,
                            "source": "pantry" if item_id in in_house else "shop", "extra": item_id in extras})  # fmt: skip
    for basic_id, item in BASICS.items():
        ingredients.append(
            {"id": basic_id, "name": item.name(lang), "qty": 0, "unit": "", "group": "basic", "source": "basic"}
        )
    herbs = [short_name(p, lang) for p, k in produce if k == "herb"] or [h for h in garden_herbs if h]
    for ing in ingredients:
        ing["label"] = _fmt(float(ing["qty"]), str(ing["unit"]), lang)

    # steps
    prep = _join(
        [
            _PREP[lang][k].format(n=n)
            for (p, k), n in zip(produce, names, strict=True)
            if k != "herb" or tech.id == "pesto"
        ],
        lang,
    )
    side_name = (
        side.name(lang)
        if side
        else (SIDES["pasta"].name(lang) if tech.id in ("pasta", "pesto") else SIDES["rice"].name(lang))
    )
    steps: list[str] = []
    in_dish_side = side is not None and side_id in tech.sides
    if side is not None and side_id != "bread":  # bread is toasted at the end
        steps.append(_SIDE_STEP[lang][side_id])
    if protein is not None:
        key = (
            "stew_beef"
            if protein_id == "stew_beef"
            else "bacon"
            if protein_id == "bacon"
            else protein.group
            if protein.group in ("fish", "veg_protein")
            else "meat"
        )
        steps.append(_PROTEIN_STEP[lang][key].format(p=protein.name(lang).split(" (")[0].lower()))
    for step in _STEPS[lang][tech.id]:
        steps.append(step.format(prep=prep or a, side=side_name.lower(), veg=_join(names, lang)))
    cook_extras = [PANTRY[x].name(lang) for x in extras if x not in _FINISH and x not in tech.staples]
    finish_extras = [PANTRY[x].name(lang) for x in extras if x in _FINISH and x not in tech.staples]
    if cook_extras:
        steps.append(_EXTRA_COOK[lang].format(x=_join(cook_extras, lang)))
    if finish_extras:
        steps.append(_EXTRA_FINISH[lang].format(x=_join(finish_extras, lang)))
    if herbs and tech.id not in ("pesto", "dessert"):
        steps.append(_HERBS[lang].format(h=_join(herbs[:3], lang)))
    if side_id == "bread":
        steps.append(_SIDE_STEP[lang]["bread"])
    if side is not None and not in_dish_side:
        steps.append(_SERVE_SIDE[lang].format(s=side.name(lang)))

    tags = [*tech.tags, "garden"]
    if protein is None or protein.group == "veg_protein":
        tags.append("vegetarian")
    minutes = tech.minutes + (60 if protein_id == "stew_beef" else 0)
    shopping = [{"id": i["id"], "name": i["name"], "qty": i["qty"], "unit": i["unit"], "label": i["label"], "group": i["group"]}
                for i in ingredients if i["source"] == "shop"]  # fmt: skip
    clean_spec = {"technique": tech.id, "produce": [p.id for p, _ in produce], "side": side_id if side else "",
                  "protein": protein_id if protein else "", "extras": extras, "servings": servings}  # fmt: skip
    return {
        "id": spec_id(clean_spec),
        "spec": clean_spec,
        "title": title,
        "subtitle": subtitle,
        "technique": tech.id,
        "technique_name": _TECH_NAME[lang][tech.id],
        "minutes": minutes,
        "servings": servings,
        "ingredients": ingredients,
        "steps": steps,
        "shopping": shopping,
        "tags": tags,
        "tag_names": [_TAG[lang].get(t, t) for t in tags],
        "garden_share": round(
            sum(1 for i in ingredients if i["source"] == "garden")
            / max(1, sum(1 for i in ingredients if i["source"] != "basic")),
            2,
        ),
        "picture": {
            "produce": [
                {"plant_id": p.id, "kind": k, "color": p.color or KIND_COLOR[k], "icon": p.icon, "emoji": p.emoji}
                for p, k in produce
            ],
            "side": side_id if side else "",
            "protein": protein_id if protein else "",
            "extras": extras,
            "technique": tech.id,
        },
    }


# --------------------------------------------------------------------------- #
# Suggestions
# --------------------------------------------------------------------------- #
def ready_produce(ready: Sequence[Mapping[str, Any]], db: PlantDatabase) -> list[dict[str, Any]]:
    """The kitchen report's 'ready' list as cooking produce: one entry per crop, most urgent first."""
    seen: dict[str, dict[str, Any]] = {}
    for r in sorted(ready, key=lambda x: str(x.get("until", ""))):
        pid = str(r.get("plant_id"))
        plant = db.get(pid)
        kind = produce_kind(plant)
        if plant is None or kind is None or pid in seen:
            continue
        seen[pid] = {
            "plant_id": pid,
            "kind": kind,
            "until": r.get("until"),
            "beds": [r.get("bed")] if r.get("bed") else [],
        }
    return list(seen.values())


def suggest(produce: Sequence[Mapping[str, Any]], db: PlantDatabase, prefs: Prefs, lang: str | None = "en",
            limit: int = 9) -> list[dict[str, Any]]:  # fmt: skip
    """Recipes for the produce at hand (``ready_produce``), the garden first."""
    lang = _lang(lang)
    items = [p for p in produce if p.get("kind") in KINDS]
    herbs = [p for p in items if p["kind"] == "herb"]
    veg = [p for p in items if p["kind"] != "herb"]
    herb_names = [short_name(p, lang) for h in herbs[:3] if (p := db.get(h["plant_id"])) is not None]
    out: list[dict[str, Any]] = []
    used_mains: dict[str, int] = {}
    protein_cycle = list(prefs.proteins)
    for round_no in range(2):  # a second round varies the main vegetable
        for tech in TECHNIQUES:
            pool = [
                p
                for p in (herbs + veg if tech.id == "pesto" else veg)
                if p["kind"] in tech.kinds and (tech.id in _RAW_OK or p["plant_id"] not in RAW_ONLY)
            ]
            if tech.id == "pesto" and not any(p["kind"] == "herb" for p in pool):
                continue
            if len(pool) < tech.min_garden:
                continue
            pool.sort(
                key=lambda p: (tech.kinds.index(p["kind"]), used_mains.get(p["plant_id"], 0), str(p.get("until", "")))
            )
            if round_no == 1:
                if len(pool) < 2:
                    continue
                pool = pool[1:] + pool[:1]
            chosen: list[Mapping[str, Any]] = []
            kinds_seen: set[str] = set()
            for p in pool:  # variety: prefer a new kind for every extra vegetable
                if len(chosen) >= tech.max_garden:
                    break
                if p["kind"] in kinds_seen and len(pool) > tech.max_garden:
                    continue
                chosen.append(p)
                kinds_seen.add(p["kind"])
            if len(chosen) < tech.min_garden:
                continue
            side = prefs.side if prefs.side and prefs.side != "none" else (tech.sides[0] if tech.sides else "")
            if prefs.side == "none" or tech.sweet:
                side = ""
            protein = ""
            if protein_cycle and not tech.sweet:
                fits = [p for p in protein_cycle if p in tech.proteins] or (
                    [] if tech.id == "pesto" else protein_cycle[:1]
                )
                if fits:
                    protein = fits[(len(out)) % len(fits)]
            extras = [x for x in prefs.use if not tech.sweet or x in ("yoghurt", "cream", "nuts")]
            spec = {"technique": tech.id, "produce": [c["plant_id"] for c in chosen], "side": side, "protein": protein,
                    "extras": extras, "servings": prefs.servings}  # fmt: skip
            recipe = render(spec, db, lang, herb_names, prefs.pantry)
            if recipe is None or any(r["id"] == recipe["id"] for r in out):
                continue
            used_mains[chosen[0]["plant_id"]] = used_mains.get(chosen[0]["plant_id"], 0) + 1
            out.append(recipe)
            if len(out) >= limit:
                return out
    return out


def shopping_list(recipes: Sequence[Mapping[str, Any]], lang: str | None = "en") -> dict[str, Any]:
    """One list for several recipes: the same item adds up; garden produce listed apart."""
    lang = _lang(lang)
    buy: dict[tuple[str, str], dict[str, Any]] = {}
    garden: dict[str, dict[str, Any]] = {}
    for r in recipes:
        for i in r.get("ingredients", []):
            if i.get("source") == "shop":
                key = (str(i["id"]), str(i["unit"]))
                row = buy.setdefault(
                    key, {"id": i["id"], "name": i["name"], "qty": 0.0, "unit": i["unit"], "group": i["group"]}
                )
                row["qty"] += float(i["qty"])
            elif i.get("source") == "garden":
                row = garden.setdefault(str(i["id"]), {"id": i["id"], "name": i["name"], "qty": 0.0, "unit": "g"})
                row["qty"] += float(i["qty"])
    order = {"meat": 0, "fish": 1, "veg_protein": 2, "dairy": 3, "side": 4, "pantry": 5}
    rows = sorted(buy.values(), key=lambda x: (order.get(str(x["group"]), 9), str(x["name"])))
    for row in [*rows, *garden.values()]:
        row["qty"] = _qty(float(row["qty"]), str(row["unit"]))
        row["label"] = _fmt(float(row["qty"]), str(row["unit"]), lang)
    return {"buy": rows, "garden": sorted(garden.values(), key=lambda x: str(x["name"]))}


def shopping_text(recipes: Sequence[Mapping[str, Any]], lang: str | None = "en") -> str:
    """The shopping list as plain text (mail, notification, to-do)."""
    lang = _lang(lang)
    lst = shopping_list(recipes, lang)
    lines = [f"{_PDF[lang]['shopping']}: " + _join([str(r["title"]) for r in recipes], lang), ""]
    lines += [f"- {r['name']}" + (f" ({r['label']})" if r["label"] else "") for r in lst["buy"]]
    if lst["garden"]:
        lines += ["", _PDF[lang]["garden_items"] + ":"] + [f"- {r['name']} ({r['label']})" for r in lst["garden"]]
    return "\n".join(lines)


def recipe_text(recipe: Mapping[str, Any], lang: str | None = "en") -> str:
    """A recipe as plain text (mail, notification)."""
    lang = _lang(lang)
    t = _PDF[lang]
    head = f"{recipe['title']}" + (f" {recipe['subtitle']}" if recipe.get("subtitle") else "")
    meta = f"{t['servings'].format(n=recipe['servings'])} · {t['minutes'].format(n=recipe['minutes'])}"
    ingr = [f"- {i['name']}" + (f" ({i['label']})" if i.get("label") else "") + (f" – {t['from_garden']}" if i.get("source") == "garden" else "")
            for i in recipe["ingredients"] if i.get("source") != "basic"]  # fmt: skip
    steps = [f"{n}. {s}" for n, s in enumerate(recipe["steps"], 1)]
    return "\n".join([head, meta, "", t["ingredients"] + ":", *ingr, "", t["method"] + ":", *steps])


# --------------------------------------------------------------------------- #
# PDF: one recipe, a cookbook, a shopping list
# --------------------------------------------------------------------------- #
_GREEN = "#2f6b4f"
_INK = "#1d2a24"
_MUTED = "#66756d"


def _picture(page: PdfPage, x: float, y: float, size: float, recipe: Mapping[str, Any], image: Image | None) -> None:
    """The dish picture: the panel's image when it sent one, else a drawn plate."""
    if image is not None:
        h = size * image.aspect
        page.rect(x, y, size, h, fill="#f6f4ee", radius=3)
        page.image(x, y, size, h, image)
        return
    cx, cy, r = x + size / 2, y + size / 2, size / 2
    page.circle(cx, cy, r, fill="#efe9dc")
    page.circle(cx, cy, r * 0.82, fill="#ffffff", stroke="#e2dccd", width=0.4)
    produce = recipe.get("picture", {}).get("produce", [])
    n = max(1, len(produce))
    for i, p in enumerate(produce):
        ang = 2 * math.pi * i / n - math.pi / 2
        page.circle(
            cx + math.cos(ang) * r * 0.42, cy + math.sin(ang) * r * 0.42, r * 0.22, fill=p.get("color", "#5a9a3c")
        )
    if recipe.get("picture", {}).get("protein"):
        page.circle(cx, cy, r * 0.2, fill="#b5674a")


def _recipe_page(doc: PdfDocument, recipe: Mapping[str, Any], lang: str, image: Image | None) -> None:
    t = _PDF[lang]
    page = doc.add_page(210, 297)
    page.rect(0, 0, 210, 6, fill=_GREEN)
    x, w = 18, 174
    pic = 62
    _picture(page, 210 - 18 - pic, 16, pic, recipe, image)
    y = 20.0
    tw = w - pic - 8
    for line in wrap(str(recipe["title"]), tw, 20, True)[:3]:
        y += 8.5
        page.text(x, y, line, size=20, bold=True, color=_INK)
    if recipe.get("subtitle"):
        y += 7
        page.text(x, y, str(recipe["subtitle"]), size=12, color=_GREEN)
    y += 7
    page.text(x, y, f"{recipe.get('technique_name', '')} · {t['servings'].format(n=recipe['servings'])} · {t['minutes'].format(n=recipe['minutes'])}",
              size=9.5, color=_MUTED)  # fmt: skip
    y += 5.5
    page.text(x, y, " · ".join(recipe.get("tag_names", [])), size=8.5, color=_MUTED)
    y = max(y + 10, 16 + pic + 8)
    # ingredients (left), method (right)
    col = 62
    page.text(x, y, t["ingredients"], size=12, bold=True, color=_GREEN)
    yi = y + 3
    for ing in recipe["ingredients"]:
        if ing.get("source") == "basic":
            continue
        label = (f"{ing['label']}  " if ing.get("label") else "") + str(ing["name"])
        if ing.get("source") == "garden":
            page.circle(x + 1.2, yi + 3.3, 1.2, fill=ing.get("color", "#5a9a3c"))
        yi = page.text_block(x + (4 if ing.get("source") == "garden" else 0), yi, col - 4, label, size=9.5, color=_INK)
    basics = [i["name"] for i in recipe["ingredients"] if i.get("source") == "basic"]
    yi = page.text_block(x, yi + 1.5, col, ", ".join(basics), size=8.5, color=_MUTED)
    mx = x + col + 8
    mw = w - col - 8
    page.text(mx, y, t["method"], size=12, bold=True, color=_GREEN)
    ym = y + 3
    for n, step in enumerate(recipe["steps"], 1):
        page.circle(mx + 2.3, ym + 4.2, 2.3, fill=_GREEN)
        page.text(mx + 2.3, ym + 5.2, str(n), size=7.5, bold=True, color="#ffffff", anchor="middle")
        ym = page.text_block(mx + 7, ym + 0.6, mw - 7, step, size=10, color=_INK, leading=1.35) + 2.5
    page.text(105, 289, "Hortulus", size=7.5, color=_MUTED, anchor="middle")


def _shopping_page(doc: PdfDocument, recipes: Sequence[Mapping[str, Any]], lang: str) -> None:
    t = _PDF[lang]
    lst = shopping_list(recipes, lang)
    page = doc.add_page(210, 297)
    page.rect(0, 0, 210, 6, fill=_GREEN)
    x = 18
    page.text(x, 26, t["shopping"], size=20, bold=True, color=_INK)
    y = page.text_block(x, 29, 174, _join([str(r["title"]) for r in recipes], lang), size=9.5, color=_MUTED) + 6
    page.text(x, y, t["to_buy"], size=12, bold=True, color=_GREEN)
    y += 4
    for row in lst["buy"]:
        page.rect(x, y + 1.6, 3.6, 3.6, stroke=_MUTED, width=0.35, radius=0.6)
        y = (
            page.text_block(
                x + 6, y, 168, f"{row['name']}" + (f"  ({row['label']})" if row["label"] else ""), size=10.5, color=_INK
            )
            + 1.2
        )
        if y > 270:
            page = doc.add_page(210, 297)
            y = 20
    if lst["garden"]:
        y += 6
        page.text(x, y, t["garden_items"], size=12, bold=True, color=_GREEN)
        y += 4
        for row in lst["garden"]:
            y = page.text_block(x + 6, y, 168, f"{row['name']}  ({row['label']})", size=10, color=_MUTED) + 1


def recipes_pdf(recipes: Sequence[Mapping[str, Any]], lang: str | None = "en", kind: str = "book",
                images: Mapping[str, bytes] | None = None, today: date | None = None, title: str | None = None) -> bytes:  # fmt: skip
    """``kind``: recipe (one recipe + its shopping list), book (cover, recipes, shopping list) or shopping."""
    lang = _lang(lang)
    t = _PDF[lang]
    doc = PdfDocument(title=title or t["book"])
    pics = {k: img for k, v in (images or {}).items() if (img := Image.from_jpeg(v)) is not None}
    if kind == "shopping":
        _shopping_page(doc, recipes, lang)
        return doc.to_bytes()
    if kind == "book":
        page = doc.add_page(210, 297)
        page.rect(0, 0, 210, 297, fill="#f6f4ee")
        page.rect(0, 0, 210, 92, fill=_GREEN)
        page.text(18, 50, title or t["book"], size=30, bold=True, color="#ffffff")
        page.text(18, 64, (today or date.today()).strftime("%d/%m/%Y"), size=12, color="#d7ebdf")
        y = 112.0
        page.text(18, y, t["contents"], size=13, bold=True, color=_GREEN)
        y += 4
        for n, r in enumerate(recipes, 1):
            y = (
                page.text_block(
                    18,
                    y,
                    174,
                    f"{n}. {r['title']}" + (f" {r['subtitle']}" if r.get("subtitle") else ""),
                    size=11,
                    color=_INK,
                )
                + 1.5
            )
        page.text(
            105,
            285,
            t["made"].format(d=(today or date.today()).strftime("%d/%m/%Y")),
            size=8,
            color=_MUTED,
            anchor="middle",
        )
        doc.outline.append((title or t["book"], 0))
    for r in recipes:
        doc.outline.append((str(r["title"]), len(doc.pages)))
        _recipe_page(doc, r, lang, pics.get(str(r["id"])))
    doc.outline.append((t["shopping"], len(doc.pages)))
    _shopping_page(doc, recipes, lang)
    return doc.to_bytes()


# --------------------------------------------------------------------------- #
# What the panel offers to choose from
# --------------------------------------------------------------------------- #
def catalog(lang: str | None = "en") -> dict[str, Any]:
    lang = _lang(lang)
    return {
        "sides": [{"id": k, "name": v.name(lang)} for k, v in SIDES.items()],
        "proteins": [{"id": k, "name": v.name(lang), "group": v.group} for k, v in PROTEINS.items()],
        "pantry": [{"id": k, "name": v.name(lang), "group": v.group} for k, v in PANTRY.items()],
        "techniques": [{"id": t.id, "name": _TECH_NAME[lang][t.id]} for t in TECHNIQUES],
    }
