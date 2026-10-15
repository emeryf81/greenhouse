"""Climate history: own samples, filling in the past, months and frost dates, statistics,
and what the logged weather does to growth, water, health and the task list."""

from __future__ import annotations

from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo

import pytest

from custom_components.garden_manager.engine import climate
from custom_components.garden_manager.engine.analysis import analyze
from custom_components.garden_manager.engine.models import (
    ClimateDay,
    Hemisphere,
    Planting,
    PlantingStatus,
    SensorDay,
    SensorReading,
    WeatherSnapshot,
)
from custom_components.garden_manager.engine.phenology import phenology
from custom_components.garden_manager.engine.region import season_anchors
from custom_components.garden_manager.engine.schedule import planting_timeline
from custom_components.garden_manager.engine.tasks import TaskContext, generate_specs
from custom_components.garden_manager.engine.waterbalance import advance_water_balance
from custom_components.garden_manager.engine.weather import assess_disease

TZ = ZoneInfo("Europe/Amsterdam")


def _at(day: date, hour: int, minute: int = 0) -> datetime:
    return datetime(day.year, day.month, day.day, hour, minute, tzinfo=TZ)


# --------------------------------------------------------------------------- #
# Own samples
# --------------------------------------------------------------------------- #
def test_samples_build_a_full_day_with_wind_humidity_and_sun(garden):
    rec = climate.ClimateRecorder()
    day = date(2026, 6, 1)
    for i in range(0, 24 * 6):  # every 10 minutes
        at = _at(day, 0) + timedelta(minutes=10 * i)
        hour = at.hour + at.minute / 60
        temp = 12 + 8 * max(0.0, 1 - abs(hour - 15) / 9)
        radiation = max(0.0, 700 * (1 - abs(hour - 13) / 6))
        sample = climate.ClimateSample(
            temp=temp, humidity=90 - temp, wind_kmh=10 + hour / 4, gust_kmh=30, radiation_wm2=radiation
        )
        rec.sample(garden, at, day, sample, {"sensor.greenhouse_temp": temp + 5})
    d = garden.climate_log[-1]
    assert d.tmin == pytest.approx(12.0) and d.tmax == pytest.approx(20.0, abs=0.2)
    assert 12.0 < d.tmean < 20.0
    assert d.rh_min < d.rh_mean < d.rh_max
    assert d.gust_max == 30 and d.wind_max > d.wind_mean
    assert d.hours == pytest.approx(23.83, abs=0.2)  # first sample counts no time
    assert 10 < d.rs_mj < 20  # 700 W/m² peak over 12 h
    assert 6 < d.sun_h < 11
    assert d.source == "sensor"
    s = next(x for x in garden.sensor_log if x.entity_id == "sensor.greenhouse_temp")
    assert s.tmin == pytest.approx(17.0) and s.tmax == pytest.approx(25.0, abs=0.2) and s.n > 100


def test_extremes_count_at_once_but_the_mean_is_rate_limited(garden):
    rec = climate.ClimateRecorder()
    day = date(2026, 6, 2)
    rec.sample(garden, _at(day, 12), day, climate.ClimateSample(temp=20.0))
    rec.sample(garden, _at(day, 12, 1), day, climate.ClimateSample(temp=30.0))  # a minute later: a spike
    d = garden.climate_log[-1]
    assert d.tmax == 30.0  # the extreme is kept
    assert d.t_n == 1 and d.tmean == 20.0  # but it does not weigh on the mean


def test_forecast_rain_never_overrides_a_gauge(garden):
    rec = climate.ClimateRecorder()
    day = date(2026, 6, 3)
    rec.sample(garden, _at(day, 8), day, climate.ClimateSample(temp=15.0), rain_mm=4.0, rain_src="gauge")
    rec.sample(garden, _at(day, 9), day, climate.ClimateSample(temp=15.0), rain_mm=12.0, rain_src="forecast")
    assert garden.climate_log[-1].rain_mm == 4.0 and garden.climate_log[-1].rain_src == "gauge"


# --------------------------------------------------------------------------- #
# Filling in the past
# --------------------------------------------------------------------------- #
def test_open_meteo_fills_missing_and_thin_days_but_not_measured_ones(garden):
    today = date(2026, 6, 10)
    garden.climate_log = [
        ClimateDay(date(2026, 6, 8), 9.0, 19.0, tmean=14.0, hours=23.5, source="sensor", rain_mm=2.0, rain_src="gauge"),
        ClimateDay(date(2026, 6, 9), 15.0, 18.0, hours=3.0, source="sensor"),  # Home Assistant came back at 21:00
    ]
    payload = {
        "daily": {
            "time": ["2026-06-07", "2026-06-08", "2026-06-09", "2026-06-10"],
            "temperature_2m_min": [8.0, 7.0, 10.0, 11.0],
            "temperature_2m_max": [20.0, 21.0, 23.0, 24.0],
            "temperature_2m_mean": [14.0, 14.5, 16.0, 17.0],
            "precipitation_sum": [0.0, 6.0, 1.2, 0.0],
            "wind_speed_10m_max": [18.0, 22.0, 15.0, 12.0],
            "wind_gusts_10m_max": [40.0, 55.0, 30.0, 20.0],
            "shortwave_radiation_sum": [22.0, 18.0, 25.0, 26.0],
            "sunshine_duration": [36000, 28800, 43200, 45000],
            "et0_fao_evapotranspiration": [3.5, 3.0, 4.2, 4.4],
            "relative_humidity_2m_mean": [70, 75, 65, 60],
        }
    }
    records = climate.open_meteo_daily(payload)
    assert records[0]["sun_h"] == 10.0
    assert climate.merge_history(garden, records, "model", today)
    by = {d.day: d for d in garden.climate_log}
    assert date(2026, 6, 10) not in by  # today belongs to the own samples
    assert by[date(2026, 6, 7)].tmin == 8.0 and by[date(2026, 6, 7)].source == "model"
    measured = by[date(2026, 6, 8)]
    assert (measured.tmin, measured.tmax, measured.rain_mm) == (9.0, 19.0, 2.0)  # the gauge and sensor stay
    assert measured.rs_mj == 18.0 and measured.gust_max == 55.0  # but what was not measured is filled in
    thin = by[date(2026, 6, 9)]
    assert (thin.tmin, thin.tmax) == (10.0, 23.0)  # three hours of samples lose to a full observed day
    assert thin.source == "sensor+model"


def test_recorder_history_combines_extremes_of_the_same_sensor(garden):
    today = date(2026, 6, 10)
    garden.climate_log = [ClimateDay(date(2026, 6, 9), 14.0, 19.0, hours=6.0, source="sensor")]
    climate.merge_history(garden, [{"day": "2026-06-09", "tmin": 8.5, "tmax": 21.0, "tmean": 14.2}], "history", today)
    d = garden.climate_log[0]
    assert (d.tmin, d.tmax, d.tmean) == (8.5, 21.0, 14.2)
    assert d.source == "sensor+history"


def test_sensor_history_fills_the_sensor_log(garden):
    today = date(2026, 6, 10)
    changed = climate.merge_sensor_history(
        garden,
        {
            "sensor.soil": [
                {"day": "2026-06-08", "tmin": 11, "tmax": 15, "tmean": 13, "n": 90},
                {"day": "2026-06-10", "tmin": 1},
            ]
        },
        today,
    )
    assert changed
    assert [(s.day, s.tmean, s.source) for s in garden.sensor_log] == [(date(2026, 6, 8), 13.0, "history")]


def test_daily_from_samples_is_time_weighted():
    tz = ZoneInfo("UTC")
    base = datetime(2026, 6, 1, 0, 0, tzinfo=tz)
    samples = [(base, 10.0), (base + timedelta(hours=18), 20.0), (base + timedelta(hours=20), 10.0)]
    day = climate.daily_from_samples(samples, tz)[0]
    assert (day["tmin"], day["tmax"], day["n"]) == (10.0, 20.0, 3)
    assert day["tmean"] < 12.5  # a short warm spell does not drag the day's mean to 13.3


# --------------------------------------------------------------------------- #
# Months kept for good, frost dates
# --------------------------------------------------------------------------- #
def test_old_days_roll_into_months_that_stay(garden):
    today = date(2026, 6, 10)
    old = today - timedelta(days=climate.KEEP_DAYS + 5)
    garden.climate_log = [ClimateDay(old + timedelta(days=i), -2.0 + i, 10.0 + i, rain_mm=1.0) for i in range(4)]
    garden.sensor_log = [SensorDay("sensor.gh", today - timedelta(days=climate.SENSOR_KEEP_DAYS + 3), 5.0, 30.0)]
    assert climate.roll_up(garden, today)
    assert garden.climate_log == [] and garden.sensor_log == []
    month = next(m for m in garden.climate_months if m.series == "outdoor")
    assert month.days == 4 and month.tmin == -2.0 and month.frost_days == 2 and month.rain_mm == 4.0
    assert any(m.series == "sensor.gh" and m.tmax == 30.0 for m in garden.climate_months)
    stats = climate.climate_stats(garden, today, latitude=52.0)
    assert stats["records"]["tmin"] == {"value": -2.0, "when": month.month}


def test_measured_frost_dates_against_the_preset(garden):
    today = date(2027, 1, 10)
    start = date(2026, 1, 1)
    garden.climate_log = []
    for i in range(365):
        day = start + timedelta(days=i)
        cold = (day <= date(2026, 4, 2) and day.day % 3 == 0) or (day >= date(2026, 11, 5) and day.day % 2 == 0)
        garden.climate_log.append(ClimateDay(day, -1.5 if cold else 6.0, 15.0))
    climate.update_frost_years(garden, Hemisphere.NORTH, today)
    year = garden.frost_years["2026"]
    assert year.last_spring == date(2026, 3, 30) and year.first_autumn == date(2026, 11, 6)
    assert year.spring_complete and year.autumn_complete
    anchors = season_anchors(garden.settings.region, 2027)
    local = climate.local_frost(garden, today, anchors.last_frost, anchors.first_frost)
    assert local["years_spring"] == 1 and local["last_spring"] == "03-30"
    assert local["spring_diff_days"] == (date(2027, 3, 30) - anchors.last_frost).days


# --------------------------------------------------------------------------- #
# Water: Penman-Monteith from the logged day
# --------------------------------------------------------------------------- #
def test_logged_wind_and_sun_dry_a_bed_faster_than_min_max_alone(db, garden):
    calm = ClimateDay(date(2026, 7, 1), 14.0, 26.0)
    windy = ClimateDay(date(2026, 7, 1), 14.0, 26.0, rh_min=35, rh_max=70, wind_mean=28.0, rs_mj=27.0)
    et_calm, method_calm = climate.daily_et0(calm, 52.0)
    et_windy, method_windy = climate.daily_et0(windy, 52.0)
    assert method_calm == "hargreaves" and method_windy == "penman_monteith"
    assert et_windy > et_calm

    def run(day: ClimateDay) -> float:
        from custom_components.garden_manager.engine.models import WaterBalance

        garden.climate_log = [day]
        garden.water_balance = {"bed_1": WaterBalance(date(2026, 7, 1), 10.0)}
        advance_water_balance(garden, db, {}, date(2026, 7, 2), latitude=52.0, tz=TZ)
        return garden.water_balance["bed_1"].depletion_mm

    assert run(windy) > run(calm)


# --------------------------------------------------------------------------- #
# Growth
# --------------------------------------------------------------------------- #
def _timeline(db, garden, plant_id: str, zone: str = "outdoor"):
    plant = db.get(plant_id)
    planting = Planting("p1", plant_id, "bed_1", 2026, status=PlantingStatus.TRANSPLANTED)
    planting.transplanted_on = date(2026, 5, 20)
    anchors = season_anchors(garden.settings.region, 2026)
    return plant, planting_timeline(planting, plant, anchors, garden.zone(zone), date(2026, 6, 10))


def test_greenhouse_crops_count_their_own_air(garden):
    days = [date(2026, 5, 1) + timedelta(days=i) for i in range(10)]
    garden.climate_log = [ClimateDay(d, 8.0, 18.0) for d in days]
    garden.sensor_log = [SensorDay("sensor.greenhouse_temp", d, 14.0, 32.0) for d in days[:5]]
    series, source = climate.zone_log(garden, "gh_a")
    assert source == "zone_sensor"
    by = {d.day: d for d in series}
    assert (by[days[0]].tmin, by[days[0]].tmax) == (14.0, 32.0)  # the greenhouse sensor
    assert (by[days[7]].tmin, by[days[7]].tmax) == (10.0, 22.0)  # outdoor + greenhouse buffering
    assert climate.zone_log(garden, "outdoor") == (garden.climate_log, "outdoor")


def test_logged_heat_and_dull_days_hold_back_fruiting_crops(db, garden):
    plant, tl = _timeline(db, garden, "courgette")
    today = tl.in_ground + timedelta(days=20)
    days = [tl.in_ground + timedelta(days=i) for i in range(21)]
    mild = [ClimateDay(d, 14.0, 24.0, rs_mj=24.0) for d in days]
    hot_dull = [ClimateDay(d, 14.0, plant.max_temp_c + 3 if i > 10 else 24.0, rs_mj=4.0) for i, d in enumerate(days)]
    a = phenology("p1", plant, tl, today, mild, latitude=52.0)
    b = phenology("p1", plant, tl, today, hot_dull, latitude=52.0)
    assert a.weather_delay_days == 0 and a.dull_days == 0
    assert b.heat_stress_logged >= 9 and b.dull_days >= 10
    assert b.weather_delay_days > 5


def test_cold_days_hold_back_a_crop_without_a_degree_day_model(db, garden):
    plant, tl = _timeline(db, garden, "broccoli")
    assert not plant.gdd_to_maturity
    today = tl.in_ground + timedelta(days=12)
    cold = [ClimateDay(tl.in_ground + timedelta(days=i), plant.min_temp_c - 2, 10.0) for i in range(12)]
    info = phenology("p1", plant, tl, today, cold, latitude=52.0)
    assert info.cold_stress_logged == 12
    assert info.weather_delay_days == 6 and info.harvest_estimate == tl.harvest_start + timedelta(days=6)


# --------------------------------------------------------------------------- #
# Health, soil, alerts, tasks
# --------------------------------------------------------------------------- #
def test_a_measured_hutton_period_means_high_blight_pressure():
    today = date(2026, 7, 10)
    log = [ClimateDay(today - timedelta(days=i), 12.0, 22.0, rain_mm=6.0, rh_mean=93) for i in (1, 2)]
    recent = climate.recent_wetness(log, today)
    assert recent["hutton"] and recent["wet_days"] == 2
    now = datetime(2026, 7, 10, 9, tzinfo=TZ)
    out = assess_disease(WeatherSnapshot(), now, TZ, recent=recent)
    assert out.level == "high" and "hutton_logged" in out.reasons
    dry = climate.recent_wetness([ClimateDay(today - timedelta(days=1), 12.0, 25.0, rain_mm=0, rh_mean=60)], today)
    assert assess_disease(WeatherSnapshot(), now, TZ, recent=dry).level == "none"


def test_frost_that_happened_raises_an_alert_for_tender_crops(db, garden):
    now = datetime(2026, 5, 12, 8, tzinfo=TZ)
    garden.plantings = [
        Planting("bean", "bush_bean", "bed_1", 2026, status=PlantingStatus.SOWN, sown_on=date(2026, 5, 1)),
    ]
    garden.climate_log = [ClimateDay(date(2026, 5, 11), 4.0, 15.0), ClimateDay(date(2026, 5, 12), -1.2, 3.0)]
    analysis = analyze(garden, db, WeatherSnapshot(), {}, now=now, tz=TZ)
    alert = next(a for a in analysis.alerts if a.message_key == "alert.frost_logged")
    assert alert.params["temp"] == -1.2 and alert.params["plants"]


def test_one_warm_afternoon_is_not_warm_soil(db, garden):
    now = datetime(2026, 5, 10, 15, tzinfo=TZ)
    garden.plantings = [Planting("bean", "bush_bean", "bed_1", 2026)]
    garden.sensor_log = [
        SensorDay("sensor.soil_temp_bed_1", now.date() - timedelta(days=i), 4.0, 9.0, 6.0) for i in range(3)
    ]
    readings = {"sensor.soil_temp_bed_1": SensorReading("sensor.soil_temp_bed_1", 16.0, now)}
    analysis = analyze(garden, db, WeatherSnapshot(), readings, now=now, tz=TZ)
    advice = analysis.advice["bean"]
    assert any(key == "reason.soil_too_cold" and params["soil"] == 6.0 for key, params in advice.reasons), advice


def test_logged_storm_and_dry_week_create_after_care(db, garden):
    today = date(2026, 7, 15)
    garden.plantings = [
        Planting("tom", "tomato", "bed_1", 2026, status=PlantingStatus.TRANSPLANTED, transplanted_on=date(2026, 5, 20))
    ]
    garden.climate_log = [
        ClimateDay(today - timedelta(days=i), 14.0, 26.0, rain_mm=0.0, rain_src="model") for i in range(2, 9)
    ]
    garden.climate_log.append(
        ClimateDay(today - timedelta(days=1), 15.0, 22.0, rain_mm=0.2, gust_max=78.0, rain_src="gauge")
    )
    garden.climate_log.sort(key=lambda d: d.day)
    now = datetime(2026, 7, 15, 8, tzinfo=TZ)
    analysis = analyze(garden, db, WeatherSnapshot(), {}, now=now, tz=TZ)
    specs = generate_specs(analysis.task_context(garden, db))
    keys = {s.key for s in specs}
    assert "w:after_storm:2026-07-14" in keys
    assert any(k.startswith("w:dry_logged:") for k in keys)
    # A downpour yesterday gives the same slug patrol the forecast would have made.
    garden.climate_log[-1].rain_mm = 22.0
    specs = generate_specs(analysis.task_context(garden, db))
    assert sum(1 for s in specs if s.key == "w:rain:2026-07-14") == 1


def test_task_context_is_used_by_weather_specs(db, garden):
    ctx = analyze(garden, db, WeatherSnapshot(), {}, now=datetime(2026, 7, 15, 8, tzinfo=TZ), tz=TZ).task_context(
        garden, db
    )
    assert isinstance(ctx, TaskContext)


# --------------------------------------------------------------------------- #
# Statistics
# --------------------------------------------------------------------------- #
def test_statistics_compare_with_last_year_and_cover_every_sensor(garden):
    today = date(2026, 6, 30)
    garden.climate_log = []
    for year, warmer in ((2025, 0.0), (2026, 2.0)):
        for i in range(181):
            day = date(year, 1, 1) + timedelta(days=i)
            garden.climate_log.append(
                ClimateDay(
                    day,
                    -3.0 + i / 15 + warmer,
                    5.0 + i / 10 + warmer,
                    rain_mm=1.5 if i % 4 == 0 else 0.0,
                    sun_h=5.0,
                    gust_max=40.0,
                )
            )
    garden.sensor_log = [
        SensorDay("sensor.greenhouse_temp", today - timedelta(days=i), 12.0, 30.0 + i, 20.0) for i in range(10)
    ]
    sensors = {e: {**m, "now": 24.0} for e, m in climate.temperature_sensors(garden).items()}
    assert set(sensors) == {"sensor.greenhouse_temp", "sensor.soil_temp_bed_1"}
    stats = climate.climate_stats(garden, today, latitude=52.0, sensors=sensors)
    season, last = stats["periods"]["season"], stats["periods"]["season_last_year"]
    assert season["days"] == 181 and last["days"] == 181
    assert season["tmean"] == pytest.approx(last["tmean"] + 2.0, abs=0.1)
    assert season["frost_nights"] < last["frost_nights"]
    assert season["sun_h"] == pytest.approx(905.0)
    gh = next(s for s in stats["sensors"] if s["entity_id"] == "sensor.greenhouse_temp")
    assert gh["record_high"] == {"t": 39.0, "when": (today - timedelta(days=9)).isoformat()}
    assert gh["today"]["tmax"] == 30.0 and gh["now"] == 24.0 and gh["kind"] == "zone_air"
    assert stats["months"][0]["month"] == "2026-06" and stats["coverage"]["days"] == 362
    assert stats["series"][-1]["d"] == today.isoformat()
    assert stats["series"][0]["d"] > (today - timedelta(days=400)).isoformat()
