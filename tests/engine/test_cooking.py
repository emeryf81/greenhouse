"""Seasonal cooking: recipes from what the garden gives."""

from __future__ import annotations

from datetime import date

from custom_components.garden_manager.engine import cooking
from custom_components.garden_manager.engine.plantdb import PlantDatabase

READY = ["tomato", "courgette", "kale", "carrot", "leek", "basil", "pumpkin", "potato", "lettuce", "cucumber", "apple"]


def _produce(db: PlantDatabase, ids=READY):
    return cooking.ready_produce(
        [{"plant_id": i, "until": f"2026-08-{10 + n}", "bed": "b1"} for n, i in enumerate(ids)], db
    )


def test_kitchen_kinds(db: PlantDatabase) -> None:
    kind = lambda pid: cooking.produce_kind(db.get(pid))  # noqa: E731
    assert kind("carrot") == "root" and kind("kale") == "brassica" and kind("pumpkin") == "squash"
    assert kind("potato") == "potato" and kind("leek") == "allium" and kind("basil") == "herb"
    assert kind("raspberry_summer") == "fruit" and kind("tomato") == "fruiting"
    assert kind("lavender") is None and kind("calendula") is None and kind("chili_pepper") is None


def test_suggestions_put_the_garden_first(db: PlantDatabase) -> None:
    prefs = cooking.Prefs.from_dict({"proteins": ["chicken", "mince"], "servings": 4, "use": ["feta"]})
    recipes = cooking.suggest(_produce(db), db, prefs, "nl", limit=14)
    assert len(recipes) >= 10
    assert len({r["id"] for r in recipes}) == len(recipes)
    techniques = {r["technique"] for r in recipes}
    assert {"soup", "salad", "pasta", "dessert"} <= techniques  # spread over the chapters
    for r in recipes:
        garden = [i for i in r["ingredients"] if i["source"] == "garden"]
        assert garden, r["title"]
        assert all(i["group"] != "garden" for i in r["shopping"])
        assert r["steps"] and r["servings"] == 4
        if r["technique"] not in ("salad", "cold_soup", "crostini"):  # lettuce and cucumber are eaten raw
            assert not {"lettuce", "cucumber"} & {i["id"] for i in garden}, r["title"]
        if r["course"] == "dessert":
            assert r["spec"]["protein"] == "" and "apple" in r["spec"]["produce"]
        else:
            assert r["spec"]["protein"] in ("chicken", "mince")
        feta = any(i["id"] == "feta" for i in r["ingredients"])
        assert feta == (
            r["technique"] in {"soup", "cold_soup", "crostini", "roast", "salad", "pasta", "frittata", "stuffed"}
        ), r["title"]
        if feta:  # taken from the fridge: in the house, never on the shopping list
            assert next(i for i in r["ingredients"] if i["id"] == "feta")["source"] == "pantry"


def test_side_and_servings_change_the_recipe(db: PlantDatabase) -> None:
    spec = {"technique": "stir_fry", "produce": ["kale", "carrot"], "side": "rice", "protein": "beef", "servings": 2}
    two = cooking.render(spec, db, "en")
    four = cooking.render({**spec, "servings": 4, "side": "noodles"}, db, "en")
    assert two and four and two["id"] != four["id"]
    rice = next(i for i in two["ingredients"] if i["id"] == "rice")
    assert rice["qty"] == 150 and rice["source"] == "shop"
    assert any(i["id"] == "noodles" for i in four["ingredients"])
    beef = lambda r: next(i for i in r["ingredients"] if i["id"] == "beef")["qty"]  # noqa: E731
    assert beef(four) == 2 * beef(two)
    assert two["title"] == "Stir-fried kale and carrot" and two["subtitle"] == "with beef (steak strips)"


def test_what_is_in_the_house_is_not_bought(db: PlantDatabase) -> None:
    spec = {"technique": "risotto", "produce": ["pumpkin"], "side": "rice", "servings": 2}
    recipe = cooking.render(spec, db, "fr", pantry=["rice", "parmesan", "butter"])
    assert recipe is not None
    bought = {i["id"] for i in recipe["shopping"]}
    assert "rice" not in bought and "parmesan" not in bought and "stock" in bought
    assert "vegetarian" in recipe["tags"]
    # the garden's own onion replaces the bought one
    with_onion = cooking.render({**spec, "produce": ["pumpkin", "onion"]}, db, "en")
    assert with_onion and "onion" not in {i["id"] for i in with_onion["ingredients"] if i["source"] != "garden"}


def test_shopping_list_adds_up(db: PlantDatabase) -> None:
    a = cooking.render({"technique": "pasta", "produce": ["tomato"], "side": "pasta", "servings": 2}, db, "nl")
    b = cooking.render({"technique": "pasta", "produce": ["courgette"], "side": "pasta", "servings": 2}, db, "nl")
    lst = cooking.shopping_list([a, b], "nl")
    pasta = next(r for r in lst["buy"] if r["id"] == "pasta")
    assert pasta["qty"] == 360 and pasta["label"] == "360 g"
    assert {r["id"] for r in lst["garden"]} == {"tomato", "courgette"}
    text = cooking.shopping_text([a, b], "nl")
    assert text.startswith("Boodschappenlijst") and "pasta (360 g)" in text


def test_unknown_spec_is_refused(db: PlantDatabase) -> None:
    assert cooking.render({"technique": "boil", "produce": ["kale"]}, db) is None
    assert cooking.render({"technique": "soup", "produce": ["lavender"]}, db) is None


def test_pdfs(db: PlantDatabase) -> None:
    recipes = cooking.suggest(_produce(db), db, cooking.Prefs(), "en", limit=3)
    for kind in ("recipe", "book", "shopping"):
        pdf = cooking.recipes_pdf(recipes, "en", kind, today=date(2026, 8, 1))
        assert pdf.startswith(b"%PDF") and len(pdf) > 1500
    assert cooking.recipes_pdf(recipes, "nl", "book").count(b"/Type /Page ") >= 5


def test_unreadable_input_falls_back(db: PlantDatabase) -> None:
    prefs = cooking.Prefs.from_dict({"servings": "x", "pantry": "rice", "proteins": [1, "beef"], "side": 3})
    assert prefs.servings == 2 and prefs.pantry == [] and prefs.proteins == ["beef"] and prefs.side == ""
    assert cooking.Prefs.from_dict(["nope"]).servings == 2  # type: ignore[arg-type]
    assert cooking.render({"technique": "soup", "produce": ["carrot"], "servings": "many"}, db)["servings"] == 2
    assert cooking.render(["soup"], db) is None  # type: ignore[arg-type]
    assert cooking.render({"technique": "soup", "produce": 1}, db) is None
    odd = cooking.render({"technique": "soup", "produce": ["carrot", {}], "extras": [{}, "lemon", 3]}, db)
    assert odd is not None and [i["plant_id"] for i in odd["ingredients"] if i.get("group") == "garden"] == ["carrot"]
    assert cooking.str_ids("carrot") == [] and cooking.str_ids(("a", 1)) == ["a"]


def test_fridge_items_only_go_where_they_fit(db: PlantDatabase) -> None:
    fridge = ["grated_cheese", "yoghurt", "parmesan"]
    pasta = cooking.render(
        {"technique": "pasta", "produce": ["courgette"], "side": "pasta", "extras": fridge}, db, "nl"
    )
    assert pasta is not None and pasta["spec"]["extras"] == []  # no yoghurt on pasta; parmesan is in it already
    assert not any("yoghurt" in s for s in pasta["steps"])
    assert next(i for i in pasta["ingredients"] if i["id"] == "parmesan")["source"] == "shop"
    roast = cooking.render({"technique": "roast", "produce": ["carrot", "pumpkin"], "extras": fridge}, db, "nl")
    assert roast is not None and sorted(roast["spec"]["extras"]) == ["grated_cheese", "yoghurt"]  # one cheese is enough
    assert any("kaaskorstje" in s for s in roast["steps"])
    assert {i["id"]: i["source"] for i in roast["ingredients"]}["yoghurt"] == "pantry"
    assert cooking.fitting_extras("stir_fry", fridge) == ["yoghurt"]  # as a dip, no cheese
    assert cooking.fitting_extras("plate", ["cream"], has_protein=False) == []
    tofu = cooking.render({"technique": "plate", "produce": ["kale"], "protein": "tofu", "extras": ["cream"]}, db, "en")
    assert tofu is not None and tofu["spec"]["extras"] == []  # no meat pan to make a cream sauce in
    steak = cooking.render(
        {"technique": "plate", "produce": ["kale"], "protein": "steak", "extras": ["cream"]}, db, "en"
    )
    assert steak is not None and steak["spec"]["extras"] == ["cream"]
    # "for the last 8 minutes" is said before the oven step it times, not after it
    eggs = cooking.render({"technique": "roast", "produce": ["carrot", "pumpkin"], "extras": ["eggs"]}, db, "en")
    assert eggs is not None
    at = lambda word: next(n for n, s in enumerate(eggs["steps"]) if word in s)  # noqa: E731
    assert at("crack the eggs") < at("Roast for 30-35 minutes")
    assert cooking.fitting_extras("stew", ["cream", "yoghurt"]) == ["yoghurt"]  # coconut milk is the cream there
    assert cooking.fitting_extras("stoemp", ["cream", "mustard"]) == ["mustard", "cream"]
    assert cooking.fitting_extras("frittata", ["milk", "cream"]) == ["milk"]  # one is enough
    assert cooking.fitting_extras("stuffed", ["parmesan", "feta"]) == ["feta"]  # one extra cheese
    assert cooking.fitting_extras("roast", ["parmesan"]) == ["parmesan"]
    assert cooking.fitting_extras("gratin", ["parmesan"]) == ["parmesan"]  # mixed into the crust
    assert cooking.fitting_extras("soup", ["garlic"], produce=["pumpkin", "garlic"]) == []  # the garden gives it
    assert cooking.fitting_extras("pasta", ["onion"], produce=["tomato", "leek"]) == []
    assert cooking.fitting_extras("soup", ["garlic"], produce=["pumpkin"]) == ["garlic"]
    # an early step goes in after the vegetables are in the pan, not at the end
    sauce = cooking.render(
        {"technique": "pasta", "produce": ["tomato"], "side": "pasta", "extras": ["cream"]}, db, "en"
    )
    assert sauce is not None
    assert sauce["steps"].index(next(s for s in sauce["steps"] if "creamy sauce" in s)) < len(sauce["steps"]) - 2


def test_every_dish_its_own_idea(db: PlantDatabase) -> None:
    """Yoghurt (and the rest of the fridge) is worked in differently per dish, not just spooned on."""
    yog = lambda t, produce, herbs=(): next(  # noqa: E731
        s
        for s in cooking.render({"technique": t, "produce": produce, "extras": ["yoghurt"]}, db, "nl", list(herbs))[
            "steps"
        ]
        if "yoghurt" in s
    )
    assert "sojasaus" in yog("stir_fry", ["kale"]) or "currypasta" in yog("stir_fry", ["kale"])
    assert "dille" in yog("stew", ["pumpkin", "carrot"], ["dille"])  # fresh garden herbs go in
    assert "rozemarijn" not in yog("roast", ["carrot", "pumpkin"], ["rozemarijn"])  # not in a cold sauce
    # across dishes the same item gets different preparations
    texts = {
        yog(t, p)
        for t, p in [
            ("roast", ["carrot"]),
            ("roast", ["pumpkin"]),
            ("roast", ["tomato"]),
            ("roast", ["potato"]),
            ("salad", ["lettuce"]),
            ("stew", ["pumpkin"]),
            ("dessert", ["apple"]),
            ("soup", ["leek"]),
        ]
    }
    assert len(texts) >= 6
    # every listed preparation exists in every language and names its item or stands on its own
    from custom_components.garden_manager.engine import cooking_extras as x

    for tech, items in x.USES.items():
        assert tech in cooking.TECHNIQUE
        for item, keys in items.items():
            assert item in cooking.PANTRY, item
            for key in keys:
                where, *texts = x.PREP[key]
                assert where in ("mid", "during", "late") and len(texts) == 3 and all(texts), key


def test_the_cooks_own_version(db: PlantDatabase) -> None:
    recipe = cooking.render({"technique": "soup", "produce": ["pumpkin"], "servings": 2}, db, "nl")
    assert recipe is not None
    rows = [r for n, x in enumerate([{"name": "Pompoen", "qty": 600, "unit": "g", "source": "garden", "plant_id": "pumpkin"},
                                     {"name": "Gember", "qty": 1, "unit": "pc", "source": "shop"}, {"name": " "}, "x"])
            if (r := cooking.custom_ingredient(x, n)) is not None]  # fmt: skip
    assert (
        [r["name"] for r in rows] == ["Pompoen", "Gember"]
        and rows[1]["id"] == "custom-1"
        and rows[1]["group"] == "other"
    )
    own = cooking.apply_custom(dict(recipe), rows, ["Alles in de pot.", "Mixen."], "nl")
    assert own["custom"] and own["steps"] == ["Alles in de pot.", "Mixen."]
    assert [i["name"] for i in own["shopping"]] == ["Gember"]
    assert [i["name"] for i in own["ingredients"] if i["source"] != "basic"] == ["Pompoen", "Gember"]
    assert cooking.shopping_list([own], "nl")["buy"][0]["name"] == "Gember"
    assert cooking.apply_custom(dict(recipe), [], [], "nl")["custom"] is False


def test_chapters_soups_starters_mains_desserts(db: PlantDatabase) -> None:
    recipes = cooking.suggest(_produce(db), db, cooking.Prefs.from_dict({"proteins": ["chicken"]}), "nl", limit=12)
    courses = [r["course"] for r in recipes]
    assert set(courses) == set(cooking.COURSES)  # every chapter gets ideas
    assert courses == sorted(courses, key=cooking.COURSES.index)  # soups first, desserts last
    assert {r["course_name"] for r in recipes} == {"Soepen", "Voorgerechten", "Hoofdgerechten", "Desserten"}
    assert cooking.course_of("salad") == "starter" and cooking.course_of("salad", "chicken") == "main"
    assert cooking.course_of("pesto", side="bread") == "starter" and cooking.course_of("pesto", side="pasta") == "main"
    assert cooking.course_of("cold_soup") == "soup" and cooking.course_of("compote") == "dessert"
    crostini = cooking.render(
        {"technique": "crostini", "produce": ["tomato"], "side": "bread", "extras": ["feta"]}, db, "en"
    )
    assert crostini is not None and crostini["course"] == "starter"
    assert not any(s.startswith("Toast the bread or warm it") for s in crostini["steps"])  # the toasts are the dish
    assert any("spread" in s for s in crostini["steps"])
    cold = cooking.render({"technique": "cold_soup", "produce": ["tomato", "cucumber"]}, db, "en")
    assert cold is not None and cold["course"] == "soup"  # cucumber may go raw in a chilled soup
    pdf = cooking.recipes_pdf(recipes, "nl", "book", today=date(2026, 8, 1))
    assert pdf.count(b"/Type /Page ") >= len(recipes) + 1 + 4 + 1  # cover, 4 chapter pages, recipes, shopping list
