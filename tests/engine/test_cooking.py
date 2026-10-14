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
    assert {"soup", "salad", "pasta", "dessert", "pesto"} <= techniques
    for r in recipes:
        garden = [i for i in r["ingredients"] if i["source"] == "garden"]
        assert garden, r["title"]
        assert all(i["group"] != "garden" for i in r["shopping"])
        assert r["steps"] and r["servings"] == 4
        if r["technique"] != "salad":  # lettuce and cucumber are eaten raw
            assert not {"lettuce", "cucumber"} & {i["id"] for i in garden}, r["title"]
        if r["technique"] == "dessert":
            assert r["spec"]["protein"] == "" and "apple" in r["spec"]["produce"]
        else:
            assert r["spec"]["protein"] in ("chicken", "mince")
        assert any(i["id"] == "feta" for i in r["ingredients"]) or r["technique"] == "dessert"


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
