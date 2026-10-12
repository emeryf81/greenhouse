"""HA layer for planting services, irrigation safety, shading, autofill, print and handbook."""

from __future__ import annotations

import asyncio
from pathlib import Path
from typing import Any

from freezegun.api import FrozenDateTimeFactory
from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse
from homeassistant.exceptions import ServiceValidationError
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.garden_manager import controllers
from custom_components.garden_manager.const import DOMAIN
from custom_components.garden_manager.engine.serde import to_dict

from .conftest import load_fixture
from .test_init import ENTRY_DATA, _result

ENTRY = {
    **ENTRY_DATA,
    "areas": [
        {**ENTRY_DATA["areas"][0], "irrigation": "switch.valve_bed_1", "flow_lpm": 4.0},
        {**ENTRY_DATA["areas"][1], "irrigation": "valve.greenhouse_drip", "flow_lpm": 2.0},
    ],
}


@pytest.fixture
async def garden(hass: HomeAssistant, freezer: FrozenDateTimeFactory) -> tuple[MockConfigEntry, list[tuple[str, str]]]:
    """Warm late-May day; valves, pump and shade screen record their calls."""
    await hass.config.async_set_time_zone("Europe/Amsterdam")
    freezer.move_to("2026-05-25T08:00:00+00:00")
    for entity_id, state in load_fixture("sensors.json").items():
        hass.states.async_set(entity_id, state["state"], state["attributes"])
    hass.states.async_set("sensor.outdoor_temp", "64", {"unit_of_measurement": "°F"})
    hass.states.async_set("switch.pump", "off")

    async def get_forecasts(call: ServiceCall) -> dict[str, Any]:
        return {"weather.home": {"forecast": []}}

    hass.services.async_register("weather", "get_forecasts", get_forecasts, supports_response=SupportsResponse.ONLY)
    calls: list[tuple[str, str]] = []

    def recorder(domain: str):
        async def handler(call: ServiceCall) -> None:
            for entity_id in (
                call.data["entity_id"] if isinstance(call.data["entity_id"], list) else [call.data["entity_id"]]
            ):
                calls.append((f"{domain}.{call.service}", entity_id))

        return handler

    for domain, services in (
        ("switch", ("turn_on", "turn_off")),
        ("valve", ("open_valve", "close_valve")),
        ("cover", ("open_cover", "close_cover")),
    ):
        for service in services:
            hass.services.async_register(domain, service, recorder(domain))

    entry = MockConfigEntry(domain=DOMAIN, data=ENTRY, title="Hortulus")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry, calls


async def test_new_entities_exist(hass: HomeAssistant, garden) -> None:
    for entity_id in (
        "sensor.hortulus_reference_evapotranspiration_today",
        "sensor.hortulus_degree_days_today",
        "sensor.bed_1_nutrient_balance",
        "sensor.greenhouse_zone_a_disease_risk",
        "binary_sensor.greenhouse_zone_a_frost_risk_48h",
        "binary_sensor.hortulus_irrigation_frost_lockout",
        "binary_sensor.hortulus_irrigation_running",
        "number.hortulus_irrigation_max_runtime",
        "select.hortulus_irrigation_mode",
        "select.greenhouse_zone_a_shading",
        "switch.hortulus_automatic_irrigation",
        "button.hortulus_water_now",
    ):
        assert hass.states.get(entity_id) is not None, entity_id
    assert hass.states.get("select.hortulus_irrigation_mode").state == "advise"


async def test_planting_services(hass: HomeAssistant, garden) -> None:
    entry, _ = garden
    repo = entry.runtime_data.repo
    added = await hass.services.async_call(
        DOMAIN,
        "add_planting",
        {"plant_id": "dill", "bed": "Bed 1", "season": 2026},
        blocking=True,
        return_response=True,
    )
    pid = added["planting_id"]
    planting = repo.data.planting(pid)
    assert planting.bed_id == repo.data.beds[0].id and planting.width_cm == 200
    await hass.async_block_till_done()
    assert any(t.planting_id == pid for t in repo.data.tasks)

    updated = await hass.services.async_call(
        DOMAIN, "update_planting", {"planting_id": pid, "x_cm": 20, "status": "sown", "sown_on": "2026-05-20"},
        blocking=True, return_response=True,
    )  # fmt: skip
    assert updated["planting"]["x_cm"] == 20 and repo.data.planting(pid).sown_on.isoformat() == "2026-05-20"

    with pytest.raises(ServiceValidationError):
        await hass.services.async_call(
            DOMAIN, "add_planting", {"plant_id": "dragonfruit", "bed": "Bed 1"}, blocking=True
        )
    await hass.services.async_call(DOMAIN, "remove_planting", {"planting_id": pid}, blocking=True)
    assert repo.data.planting(pid) is None


async def test_irrigation_dry_run_and_run_with_pump_interlock(
    hass: HomeAssistant, garden, monkeypatch: pytest.MonkeyPatch
) -> None:
    entry, calls = garden
    repo = entry.runtime_data.repo
    repo.data.settings.irrigation.pump_entity = "switch.pump"
    repo.data.settings.irrigation.max_runtime_min = 2
    sleeps: list[float] = []
    real_sleep = asyncio.sleep

    async def fast_sleep(seconds: float) -> None:
        sleeps.append(seconds)
        await real_sleep(0)

    monkeypatch.setattr(controllers.asyncio, "sleep", fast_sleep)
    switched: list[tuple[str, bool]] = []

    async def fake_switch(hass_: HomeAssistant, entity_id: str, on: bool) -> None:
        # The switch domain belongs to Hortulus' own platform in this test,
        # so record at the controller boundary instead of mocking services.
        switched.append((entity_id, on))

    monkeypatch.setattr(controllers, "_switch", fake_switch)

    dry = await hass.services.async_call(
        DOMAIN, "run_irrigation_plan", {"dry_run": True, "amount_mm": 10}, blocking=True, return_response=True
    )
    assert dry["started"] is False and len(dry["runs"]) == 2
    assert all(run["minutes"] <= 2 for run in dry["runs"]) and any(run["capped"] for run in dry["runs"])
    assert calls == []

    run = await hass.services.async_call(
        DOMAIN, "run_irrigation_plan", {"beds": ["Bed 1"], "amount_mm": 1}, blocking=True, return_response=True
    )
    assert run["started"] is True
    await hass.async_block_till_done(wait_background_tasks=True)
    # valve open -> pump on -> pump off -> valve closed, and nothing left on.
    assert switched[:4] == [
        ("switch.valve_bed_1", True),
        ("switch.pump", True),
        ("switch.pump", False),
        ("switch.valve_bed_1", False),
    ]
    assert switched[-1] == ("switch.pump", False)  # final safety sweep
    assert 0.5 * 60 in sleeps  # 1 mm x 2 m² = 2 L at 4 L/min = 0.5 min
    event = repo.data.irrigation_log[-1]
    assert event.source == "service" and event.liters == 2.0
    assert not entry.runtime_data.irrigation.running


async def test_frost_lockout_blocks_outdoor_valves(hass: HomeAssistant, garden) -> None:
    entry, _ = garden
    hass.states.async_set("sensor.outdoor_temp", "33", {"unit_of_measurement": "°F"})  # 0.6 °C
    await hass.async_block_till_done()
    response = await hass.services.async_call(
        DOMAIN, "run_irrigation_plan", {"dry_run": True, "amount_mm": 5}, blocking=True, return_response=True
    )
    bed1 = entry.runtime_data.repo.data.beds[0].id
    assert response["lockout"] is True
    assert response["skipped"][bed1]["key"] == "irrigation.skip.frost"
    assert "Frost" in response["skipped_reasons"][bed1]
    assert [r["entity_id"] for r in response["runs"]] == ["valve.greenhouse_drip"]
    await entry.runtime_data.coordinator.async_recompute()
    await hass.async_block_till_done()
    assert hass.states.get("binary_sensor.hortulus_irrigation_frost_lockout").state == "on"


async def test_irrigation_entities_change_settings(hass: HomeAssistant, garden) -> None:
    entry, _ = garden
    await hass.services.async_call(
        "number", "set_value", {"entity_id": "number.hortulus_irrigation_max_runtime", "value": 12}, blocking=True
    )
    await hass.services.async_call(
        "switch", "turn_on", {"entity_id": "switch.hortulus_automatic_irrigation"}, blocking=True
    )
    settings = entry.runtime_data.repo.data.settings.irrigation
    assert settings.max_runtime_min == 12 and settings.mode == "auto"
    await hass.async_block_till_done()
    assert hass.states.get("select.hortulus_irrigation_mode").state == "auto"


async def test_shading_mode_drives_the_shade_cover(hass: HomeAssistant, garden) -> None:
    entry, calls = garden
    zone = next(z for z in entry.runtime_data.repo.data.zones if z.is_enclosed)
    zone.shade_entity = "cover.greenhouse_shade"
    await hass.services.async_call(
        DOMAIN, "set_shading_mode", {"zone": zone.name, "mode": "on"}, blocking=True, return_response=True
    )
    await hass.async_block_till_done()
    assert ("cover.close_cover", "cover.greenhouse_shade") in calls  # a shade cover deploys by closing
    await hass.services.async_call(
        "select", "select_option", {"entity_id": "select.greenhouse_zone_a_shading", "option": "off"}, blocking=True
    )
    await hass.async_block_till_done()
    assert calls[-1] == ("cover.open_cover", "cover.greenhouse_shade")
    with pytest.raises(ServiceValidationError):
        await hass.services.async_call(DOMAIN, "set_shading_mode", {"zone": "Garden", "mode": "on"}, blocking=True)


async def test_autofill_service(hass: HomeAssistant, garden) -> None:
    entry, _ = garden
    repo = entry.runtime_data.repo
    before = sorted(p.id for p in repo.data.plantings)
    proposal = await hass.services.async_call(
        DOMAIN, "autofill_plan",
        {"season": 2027, "household_size": 3, "goals": ["fresh", "herbs"], "wanted": ["tomato"], "replace": True},
        blocking=True, return_response=True,
    )  # fmt: skip
    assert proposal["plantings"] and proposal["summary"]["yield_kg"] > 0
    assert sorted(p.id for p in repo.data.plantings) == before  # a proposal stores nothing
    applied = await hass.services.async_call(
        DOMAIN, "autofill_plan", {"season": 2027, "replace": True, "apply": True, "wanted": ["tomato"]},
        blocking=True, return_response=True,
    )  # fmt: skip
    assert applied["applied"]
    season_2027 = {p.id for p in repo.data.plantings if p.season == 2027}
    assert season_2027 == {p["id"] for p in applied["plantings"]}  # replaced, not stacked


async def test_export_pdf_and_http_view(
    hass: HomeAssistant, garden, hass_client, hass_client_no_auth, tmp_path: Path
) -> None:
    hass.config.config_dir = str(tmp_path)
    result = await hass.services.async_call(
        DOMAIN, "export_pdf", {"document": "garden", "page": "remarkable", "color_mode": "eink"},
        blocking=True, return_response=True,
    )  # fmt: skip
    content = await hass.async_add_executor_job(Path(result["path"]).read_bytes)
    assert content.startswith(b"%PDF") and result["url"].startswith("/api/garden_manager/exports/")
    assert "/www/" not in result["path"]  # never in the public folder

    client = await hass_client()
    exported = await client.get(f"/api/garden_manager/exports/{result['filename']}")
    assert exported.status == 200 and (await exported.read()).startswith(b"%PDF")
    assert (await client.get("/api/garden_manager/exports/..%2Fsecrets.yaml")).status in (400, 404)
    anon = await hass_client_no_auth()
    assert (await anon.get(f"/api/garden_manager/exports/{result['filename']}")).status == 401
    resp = await client.get("/api/garden_manager/print?document=beds&page=a4&landscape=1")
    assert resp.status == 200 and resp.headers["Content-Type"] == "application/pdf"
    assert (await resp.read()).startswith(b"%PDF")
    bad = await client.get("/api/garden_manager/print?document=poster")
    assert bad.status == 400


async def test_websocket_print_handbook_autofill(hass: HomeAssistant, garden, hass_ws_client) -> None:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(
        {"type": f"{DOMAIN}/print/render", "options": {"document": "tasks", "page": "remarkable"}}
    )
    pages = (await _result(client))["result"]["pages"]
    assert pages and pages[0].startswith("<svg")

    await client.send_json_auto_id({"type": f"{DOMAIN}/handbook/index", "lang": "nl"})
    index = (await _result(client))["result"]
    assert len(index["chapters"]) >= 15 and index["glossary"]["et0"]["chapter"] == "watering"
    await client.send_json_auto_id({"type": f"{DOMAIN}/handbook/chapter", "chapter_id": "greenhouse", "lang": "nl"})
    chapter = (await _result(client))["result"]
    assert chapter["title"] == "De serre" and "kuisen" in chapter["body"]
    await client.send_json_auto_id({"type": f"{DOMAIN}/handbook/search", "query": "phytophthora", "lang": "nl"})
    assert (await _result(client))["result"]["results"]

    await client.send_json_auto_id(
        {"type": f"{DOMAIN}/plan/autofill", "season": 2027, "resources": {"household_size": 4}, "replace": True}
    )
    proposal = (await _result(client))["result"]
    assert proposal["plantings"] and proposal["season"] == 2027
    await client.send_json_auto_id(
        {
            "type": f"{DOMAIN}/plan/autofill/apply",
            "base_revision": proposal["revision"],
            "plantings": proposal["plantings"],
            "replace_beds": proposal["beds"],
        }
    )
    assert (await _result(client))["success"]

    await client.send_json_auto_id({"type": f"{DOMAIN}/irrigation/plan"})
    plan = (await _result(client))["result"]
    assert "runs" in plan and "reasons" in plan


async def test_websocket_advice_qa_supplies(hass: HomeAssistant, garden, hass_ws_client) -> None:
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": f"{DOMAIN}/advice"})
    advice = (await _result(client))["result"]
    assert "suggestions" in advice and len(advice["coverage"]["months"]) == 12

    await client.send_json_auto_id({"type": f"{DOMAIN}/qa/options"})
    opts = (await _result(client))["result"]
    assert "plant" in opts["subjects"] and opts["targets"]["plant"]
    await client.send_json_auto_id(
        {"type": f"{DOMAIN}/qa/ask", "subject": "plant", "problem": "pests", "target": "tomato"}
    )
    ans = (await _result(client))["result"]
    assert ans["title"] and ans["remedies"]
    await client.send_json_auto_id({"type": f"{DOMAIN}/qa/ask", "subject": "plant", "problem": "nonsense"})
    assert not (await _result(client))["success"]

    await client.send_json_auto_id({"type": f"{DOMAIN}/supplies"})
    supplies = (await _result(client))["result"]
    assert supplies["tools"]["secateurs"] and "prune" in supplies["task_tools"] and "shopping" in supplies


async def test_overdue_reminder_and_weekly_plan(hass: HomeAssistant, garden) -> None:
    entry, _calls = garden
    runtime = entry.runtime_data
    analysis = runtime.coordinator.data
    from datetime import timedelta

    from custom_components.garden_manager.engine.models import Task, TaskType

    runtime.repo.data.tasks.append(
        Task(
            id="late",
            title="Sow carrots",
            type=TaskType.SOW_DIRECT,
            due=analysis.today - timedelta(days=5),
            window_end=analysis.today - timedelta(days=1),
        )
    )
    await runtime.notifier.async_send_overdue(analysis)
    await runtime.notifier.async_send_weekly(analysis)
    await hass.async_block_till_done()
    notes = hass.data.get("persistent_notification") or {}
    ids = set(notes) if isinstance(notes, dict) else set()
    assert f"{DOMAIN}_overdue" in ids and f"{DOMAIN}_weekly" in ids
    # Once per day only
    assert f"overdue:{analysis.today.isoformat()}" in runtime.repo.data.notified


async def test_records_services_and_websocket(hass: HomeAssistant, garden, hass_ws_client) -> None:
    entry, _calls = garden
    repo = entry.runtime_data.repo
    planting = repo.data.plantings[0]
    res = await hass.services.async_call(
        DOMAIN,
        "log_harvest",
        {"planting_id": planting.id, "kg": 1.25, "quality": 4},
        blocking=True,
        return_response=True,
    )
    assert res["harvest"]["kg"] == 1.25 and repo.data.harvest_log[0].plant_id == planting.plant_id
    with pytest.raises(ServiceValidationError):
        await hass.services.async_call(DOMAIN, "log_harvest", {"plant_id": "tomato"}, blocking=True)
    await hass.services.async_call(
        DOMAIN, "add_journal_entry", {"text": "First flowers", "bed": "Bed 1"}, blocking=True
    )
    assert repo.data.journal[0].bed_id == repo.data.beds[0].id
    await hass.services.async_call(
        DOMAIN, "save_soil_test", {"bed": "Bed 1", "date": "2026-03-01", "ph": 6.1, "organic_matter_pct": 2.5},
        blocking=True,
    )  # fmt: skip
    assert repo.data.beds[0].latest_soil_test.ph == 6.1
    task = repo.data.tasks[0]
    await hass.services.async_call(
        DOMAIN, "assign_task", {"task_id": task.id, "assignee": "person.emery"}, blocking=True
    )
    assert repo.data.task(task.id).assignee == "person.emery"

    client = await hass_ws_client(hass)
    # A planner draft opened before the soil test neither conflicts nor drops it.
    revision = repo.data.revision
    stale_beds = [{**to_dict(b), "soil_tests": []} for b in repo.data.beds]
    await client.send_json_auto_id(
        {
            "type": f"{DOMAIN}/plan/save",
            "base_revision": revision,
            "zones": [to_dict(z) for z in repo.data.zones],
            "beds": stale_beds,
            "plantings": [to_dict(p) for p in repo.data.plantings],
        }
    )
    assert (await _result(client))["success"]
    assert repo.data.beds[0].latest_soil_test.ph == 6.1
    await client.send_json_auto_id(
        {"type": f"{DOMAIN}/records/seeds/save", "packet": {"plant_id": "carrot", "year": 2025}}
    )
    packet = (await _result(client))["result"]["packet"]
    await client.send_json_auto_id({"type": f"{DOMAIN}/records/overview"})
    overview = (await _result(client))["result"]
    assert overview["harvest_all"][planting.plant_id]["kg"] == 1.25
    assert overview["seeds"]["packets"][0]["plant_id"] == "carrot", overview["seeds"]
    assert len(overview["year"]["tasks"]) == 12  # the example plan is for next season, rows may be empty
    await client.send_json_auto_id({"type": f"{DOMAIN}/records/delete", "kind": "seed", "record_id": packet["id"]})
    assert (await _result(client))["success"] and not repo.data.seed_stock
    await client.send_json_auto_id({"type": f"{DOMAIN}/records/journal/save", "entry": {"text": ""}})
    assert not (await _result(client))["success"]
    state = hass.states.get("sensor.hortulus_harvest_this_season")
    assert state is None or float(state.state) >= 0


async def test_voice_answers_and_sentence_install(hass: HomeAssistant, garden, tmp_path: Path) -> None:
    from custom_components.garden_manager.voice import answer

    entry, _calls = garden
    runtime = entry.runtime_data
    for intent_type in ("HortulusTasksToday", "HortulusHarvest", "HortulusGreenhouse", "HortulusWater", "HortulusFrost",
                        "HortulusOverdue"):  # fmt: skip
        assert answer(runtime, intent_type, "nl")
    hass.config.config_dir = str(tmp_path)
    res = await hass.services.async_call(DOMAIN, "install_voice_sentences", {}, blocking=True, return_response=True)
    assert len(res["written"]) == 2 and (tmp_path / "custom_sentences/nl/hortulus.yaml").exists()
    again = await hass.services.async_call(DOMAIN, "install_voice_sentences", {}, blocking=True, return_response=True)
    assert again["written"] == []  # never overwrite without asking
