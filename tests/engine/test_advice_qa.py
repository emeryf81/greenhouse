"""Advisor suggestions, Q&A answers and the shopping list."""

from __future__ import annotations

from datetime import datetime
from zoneinfo import ZoneInfo

import pytest

from custom_components.garden_manager.engine.advisor import advise, harvest_coverage
from custom_components.garden_manager.engine.analysis import analyze
from custom_components.garden_manager.engine.models import LayoutMode, PlantingStatus, WeatherSnapshot
from custom_components.garden_manager.engine.qa import SUBJECTS, answer, options
from custom_components.garden_manager.engine.supplies import TASK_TOOLS, TOOLS, catalog, shopping_list

TZ = ZoneInfo("Europe/Brussels")
NOW = datetime(2026, 5, 20, 9, tzinfo=TZ)


@pytest.fixture
def planted(garden, make_planting):
    garden.plantings = [
        make_planting(
            "apple", "bed_1", 2024, id="apple", status=PlantingStatus.TRANSPLANTED, width_cm=100, length_cm=100
        ),
        make_planting("potato", "bed_1", 2026, id="pot", x_cm=100, width_cm=100, length_cm=50),
        make_planting("tomato", "bed_1", 2026, id="tom", x_cm=100, y_cm=50, width_cm=100, length_cm=50),
        make_planting("courgette", "gh_bed", 2026, id="cou", layout=LayoutMode.SINGLE, width_cm=90, length_cm=90),
    ]
    return garden


def test_advisor_finds_partner_enemies_and_pollinators(planted, db):
    analysis = analyze(planted, db, WeatherSnapshot(), {}, now=NOW, tz=TZ, lang="nl")
    ids = {s.id.split(":")[0] for s in advise(planted, db, analysis, "nl")}
    assert {"pollination", "enemy", "pollinators", "compost", "water_butt"} <= ids
    enemy = next(s for s in advise(planted, db, analysis, "nl") if s.id.startswith("enemy:"))
    assert "Aardappel" in enemy.title or "aardappel" in enemy.title.lower()


def test_harvest_coverage_reports_gaps(planted, db):
    analysis = analyze(planted, db, WeatherSnapshot(), {}, now=NOW, tz=TZ)
    cov = harvest_coverage(planted, db, analysis)
    assert "tomato" in cov.months[7]  # August
    assert 1 in cov.gaps  # nothing in January


@pytest.mark.parametrize("subject", list(SUBJECTS))
def test_every_question_has_an_answer(planted, db, subject):
    analysis = analyze(planted, db, WeatherSnapshot(), {}, now=NOW, tz=TZ, lang="nl")
    opts = options(planted, db, analysis.season, "nl")
    targets = opts["targets"][subject]
    target = targets[0]["id"] if targets else None
    if subject == "plant":
        target = "tomato"
    for problem in SUBJECTS[subject]:
        ans = answer(subject, problem, target, planted, db, analysis, "nl")
        assert ans.title
        assert ans.status or ans.facts or ans.actions or ans.plants, (subject, problem)


def test_plant_answer_combines_live_status_and_remedies(planted, db):
    analysis = analyze(planted, db, WeatherSnapshot(), {}, now=NOW, tz=TZ, lang="nl")
    ans = answer("plant", "disease", "tomato", planted, db, analysis, "nl")
    assert any("Phytophthora" in r for r in ans.remedies)
    assert ans.causes and ans.prevention and ans.handbook == "diseases"
    assert any("Bed 1" in s for s in ans.status)
    sow = answer("plant", "when_sow", "leek", planted, db, analysis, "nl")
    assert any("staat dit seizoen niet" in s for s in sow.status) and sow.facts


def test_shopping_list_and_catalog(planted, db):
    analysis = analyze(planted, db, WeatherSnapshot(), {}, now=NOW, tz=TZ, lang="nl")
    items = {i.id: i for i in shopping_list(planted, db, analysis, "nl")}
    assert "compost" in items and items["compost"].quantity > 0
    assert "grease_band" in items and items["grease_band"].quantity == 1
    assert "potato" in items or "tomato" in items
    cat = catalog("nl")
    assert cat["tools"]["secateurs"]["name"] == "Snoeischaar"
    assert all(tool in TOOLS for tools in TASK_TOOLS.values() for tool in tools)
