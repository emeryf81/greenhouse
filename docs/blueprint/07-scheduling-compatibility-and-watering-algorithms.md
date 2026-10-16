<!-- Generated from the sources by a script: code excerpts below are verbatim. -->
[← 6. Services, Entities, and Events](06-services-entities-and-events.md) · [↑ Blueprint contents](../BLUEPRINT.md) · [8. Example HA Automations & Dashboards →](08-example-ha-automations--dashboards.md)

## 7. Scheduling, Compatibility, and Watering Algorithms

### 7.1 Frost anchors and seasons

```python
def parse_mmdd(year: int, mmdd: str) -> date:
    """``"02-29"`` -> Feb 29 in leap years, Feb 28 otherwise."""
    month_s, day_s = mmdd.strip().split("-")
    month, day = int(month_s), int(day_s)
    last = calendar.monthrange(year, month)[1]
    return date(year, month, min(day, last))


def season_anchors(profile: RegionProfile, season: int) -> SeasonAnchors:
    """Absolute frost dates for ``season`` (hemisphere aware)."""
    resolved = resolve_profile(profile)
    last = parse_mmdd(season, resolved.last_frost)
    first = parse_mmdd(season, resolved.first_frost)
    if first <= last:  # southern hemisphere (or odd custom dates): next year
        first = parse_mmdd(season + 1, resolved.first_frost)
    return SeasonAnchors(season, last, first, resolved.frost_free)


def season_for_date(profile: RegionProfile, day: date) -> int:
    """Season that ``day`` belongs to.

    Northern hemisphere: the calendar year.  Southern hemisphere: seasons start
    on 1 July so that a whole growing season (Sep-May) shares one number.
    """
    if profile.hemisphere is Hemisphere.SOUTH:
        return day.year if day.month >= 7 else day.year - 1
    return day.year
```

### 7.2 Windows → timeline → live advice

1. **Window dates**: `anchor + start_week·7d … anchor + end_week·7d + 6d`.
2. **Greenhouse extension**: if the zone is enclosed and the crop is not unsuitable,
   spring windows start `season_extension_weeks` earlier (cold frame: half; heated: +2),
   autumn windows may run longer.
3. **Timeline**: actual dates > user overrides > computed; open windows roll forward to
   today; indoor sowing → transplant ≥ sow + `transplant_age_days[0]`; harvest from
   `days_to_maturity`; tender crops end at the (extended) first frost.
4. **Advice** for the next action: `not_yet` / `go` / `late`, downgraded to `wait` when
   *soil < min germination temperature* (or above `max_soil_temp_c`) or a frost below the
   crop's `min_temp_c` is forecast before planting out.

```python
def timing_advice(
    plant: Plant,
    planting: Planting,
    timeline: PlantingTimeline,
    today: date,
    *,
    soil_temp: float | None,
    frost: FrostAssessment | None,
    lang_name: str,
) -> TimingAdvice:
    """What should happen next for this planting and is *now* a good time?"""
    if planting.status.value in ("finished", "failed"):
        return TimingAdvice("none", "done")

    sown = planting.sown_on is not None or planting.status.value in (
        "sown",
        "sown_indoors",
        "transplanted",
        "harvesting",
    )
    planted = planting.transplanted_on is not None or planting.status.value in (
        "transplanted",
        "harvesting",
    )
    needs_sow = timeline.method is not SowMethod.TRANSPLANT and not sown
    needs_transplant = timeline.method is not SowMethod.DIRECT_SOW and not planted

    if needs_sow:
        action: Literal["sow", "transplant", "harvest", "none"] = "sow"
        window = timeline.sow_window
    elif needs_transplant:
        action, window = "transplant", timeline.transplant_window
    else:
        action = "harvest"
        window = DateWindow(timeline.harvest_start, timeline.harvest_end)

    if window is None:
        return TimingAdvice(action, "go")
    if today < window.start:
        return TimingAdvice(action, "not_yet", [("reason.window_not_yet", {"date": window.start.isoformat()})])

    advice = TimingAdvice(action, "go", [("reason.window_open", {})])
    if today > window.end:
        advice.status = "late"
        advice.reasons = [("reason.window_closed", {"date": window.end.isoformat()})]

    outdoor_sow = action == "sow" and timeline.method is SowMethod.DIRECT_SOW
    if outdoor_sow and soil_temp is not None:
        if soil_temp < plant.min_soil_temp_c:
            advice.status = "wait"
            advice.reasons.append(
                (
                    "reason.soil_too_cold",
                    {"soil": round(soil_temp, 1), "min": plant.min_soil_temp_c, "plant": lang_name},
                )
            )
        elif plant.max_soil_temp_c is not None and soil_temp > plant.max_soil_temp_c:
            advice.status = "wait"
            advice.reasons.append(
                ("reason.soil_too_hot", {"soil": round(soil_temp, 1), "max": plant.max_soil_temp_c, "plant": lang_name})
            )

    goes_outside = action == "transplant" or outdoor_sow
    if (
        goes_outside
        and frost is not None
        and frost.plant_level_min_c is not None
        and frost.plant_level_min_c < plant.min_temp_c
        and frost.min_at is not None
    ):
        advice.status = "wait"
        advice.reasons.append(
            (
                "reason.frost_forecast",
                {
                    "temp": frost.plant_level_min_c,
                    "date": frost.min_at.date().isoformat(),
                    "plant": lang_name,
                },
            )
        )
    return advice
```

### 7.3 Companion scoring

For plantings that share time in the ground:

* `reach = max(companion_radius, (spacing_a + spacing_b)/2)`; no interaction beyond it.
* `influence = 1 − gap / reach` (gap = shortest edge distance between footprints).
* friend `+10·strength·influence`; enemy `−20·strength·influence` (*error* when strength ≥ 2
  and influence > 0.5); overlap `−30·overlap_fraction`; same family touching `−3`.
* Bed score `clamp(50 + Σ, 0, 100)`; relations are symmetric and *enemy wins* when two
  sources disagree.

### 7.4 Crop rotation

History = manual records + one record per (bed, season, family) implied by plantings.
A family returning after `gap < rotation_years` seasons is flagged: one season short →
*warning*, sooner → *error*. Perennials and `rotation_years ≤ 1` are exempt.

### 7.5 Frost risk

```python
def radiative_adjustment(point: ForecastPoint, local_hour: int) -> float:
    """Extra cooling at plant height on calm, clear nights (°C, <= 0).

    Forecast temperatures are for 2 m.  On clear, calm nights the surface can
    be 2-4 °C colder ("ground frost").  We apply a conservative estimate.
    """
    if 9 <= local_hour < 18:
        return 0.0
    clouds = _cloud_fraction(point)
    wind = point.wind_speed if point.wind_speed is not None else 10.0
    if clouds < 0.3 and wind < 8:
        return -2.0
    if clouds < 0.6 and wind < 15:
        return -1.0
    return -0.3


def classify_frost(plant_level_min: float | None) -> RiskLevel:
    if plant_level_min is None:
        return RiskLevel.UNKNOWN
    if plant_level_min <= 0.0:
        return RiskLevel.HIGH
    if plant_level_min <= 2.0:
        return RiskLevel.MODERATE
    if plant_level_min <= 4.0:
        return RiskLevel.LOW
    return RiskLevel.NONE
```

Enclosures add a night offset (greenhouse +3 °C, cold frame +2 °C, configurable; exposed
outdoor sites −0.5 °C, sheltered +0.5 °C); heated zones never go below their heating floor.

### 7.6 Greenhouse climate

Inside estimate per forecast hour: `T_out + solar_gain·(1 − cloud)·(1 − shade)` by day,
`T_out + night_offset` by night. The most sensitive *active* crop sets the limits.

```python
def greenhouse_advice(
    zone: Zone,
    weather: WeatherSnapshot,
    now: datetime,
    inside_now: float | None,
    plants: Sequence[tuple[str, float, float]],
) -> GreenhouseAdvice:
    """Ventilation / shading / closing advice for an enclosed zone.

    ``plants`` are ``(name, min_night_c, max_day_c)`` of crops currently in
    the zone; the most sensitive plant sets the limits.  Without crops the
    generic limits 5 °C / 30 °C are used.
    """
    if not plants:
        # Empty enclosure: report the estimates but don't nag.
        fmax, fmin = estimate_inside(weather, zone, now)
        return GreenhouseAdvice(inside_now_c=inside_now, forecast_max_c=fmax, forecast_min_c=fmin)
    limit_max = min((p[2] for p in plants), default=30.0)
    limit_min = max((p[1] for p in plants), default=5.0)
    hot = [p[0] for p in plants if p[2] <= limit_max + 0.01]
    cold = [p[0] for p in plants if p[1] >= limit_min - 0.01]
    fmax, fmin = estimate_inside(weather, zone, now)
    advice = GreenhouseAdvice(
        inside_now_c=inside_now,
        forecast_max_c=fmax,
        forecast_min_c=fmin,
        limit_max_c=limit_max,
        limit_min_c=limit_min,
    )
    current = inside_now
    if current is not None and current >= limit_max + 3:
        advice.action = GreenhouseAction.SHADE
        advice.reasons.append("inside_hot_now")
        advice.limiting_plants = hot
    elif current is not None and current >= limit_max - 3:
        advice.action = GreenhouseAction.VENTILATE
        advice.reasons.append("inside_warm_now")
        advice.limiting_plants = hot
    elif fmax is not None and fmax >= limit_max + 4:
        advice.action = GreenhouseAction.SHADE
        advice.reasons.append("forecast_hot")
        advice.limiting_plants = hot
    elif fmax is not None and fmax >= limit_max - 2:
        advice.action = GreenhouseAction.VENTILATE
        advice.reasons.append("forecast_warm")
        advice.limiting_plants = hot
    elif fmin is not None and fmin < limit_min:
        advice.action = GreenhouseAction.HEAT if zone.microclimate.heated else GreenhouseAction.CLOSE_UP
        advice.reasons.append("forecast_cold_night")
        advice.limiting_plants = cold
    return advice
```

### 7.7 Evapotranspiration & watering

Hargreaves–Samani (FAO‑56 eq. 52) with extraterrestrial radiation from latitude and day
of year (eq. 21):

```python
def et0_hargreaves(tmin: float, tmax: float, latitude_deg: float, day: date) -> float:
    """Reference evapotranspiration in mm/day."""
    if tmax < tmin:
        tmin, tmax = tmax, tmin
    tmean = (tmin + tmax) / 2
    ra = extraterrestrial_radiation(latitude_deg, day)
    et0 = 0.0023 * (tmean + 17.8) * math.sqrt(tmax - tmin) * ra * 0.408
    return max(round(et0, 2), 0.0)
```

For a past day the water balance prefers FAO‑56 Penman‑Monteith from what was logged
(`climate.daily_et0`: humidity, wind, radiation or sunshine fraction), so windy, sunny days dry beds
faster; Hargreaves is the fallback when only min / max are known:

```python
def daily_et0(day: ClimateDay, latitude: float, elevation_m: float = 0.0) -> tuple[float | None, str | None]:
    """Reference evaporation of a past day: Penman-Monteith from what was logged, else Hargreaves."""
    if day.tmin is None or day.tmax is None:
        return day.et0_mm, ("model" if day.et0_mm is not None else None)
    if day.et0_mm is not None and day.hours < MODEL_BEATS_H and "model" in day.source:
        return day.et0_mm, "model"
    sunshine = None
    if day.rs_mj is None and day.sun_h is not None:
        sunshine = day.sun_h / max(daylight_hours(latitude, day.day), 1.0)
    pm = et0_penman_monteith(
        day.tmin, day.tmax, latitude, day.day,
        rh_min=day.rh_min, rh_max=day.rh_max, rh_mean=day.rh_mean,
        wind_kmh_10m=day.wind_mean if day.wind_mean is not None else (day.wind_max * 0.6 if day.wind_max else None),
        rs=day.rs_mj, sunshine_fraction=sunshine, elevation_m=elevation_m,
    )  # fmt: skip
    if pm is not None:
        return pm, "penman_monteith"
    return et0_hargreaves(day.tmin, day.tmax, latitude, day.day), "hargreaves"
```

```python
def recommend_irrigation(
    bed: GardenBed,
    zone: Zone | None,
    moisture: float | None,
    active_needs: Sequence[Level],
    outlook: Sequence[DailyOutlook],
    *,
    root_zone_depth_mm: float = 200.0,
    max_irrigation_mm: float = 20.0,
    kc: float | None = None,
    depletion: tuple[float, float] | None = None,
) -> IrrigationRecommendation:
    """Irrigation advice for one bed.

    ``kc`` is the growth-stage crop coefficient of the thirstiest active crop
    (falls back to a coefficient per water-need class).  ``depletion`` is the
    ``(depletion_mm, taw_mm)`` water-balance bucket used when no moisture sensor
    is mapped.
    """
    need = dominant_need(active_needs)
    band = band_for(need or Level.MEDIUM, bed.soil)
    rec = IrrigationRecommendation(
        bed_id=bed.id,
        moisture=moisture,
        band=band,
        water_need=need,
        status=classify_moisture(moisture, band),
    )
    enclosed = bool(zone and zone.is_enclosed)
    shade = bed.shade_pct if bed.shade_pct is not None else (zone.microclimate.shade_pct if zone else 0)
    crop_kc = kc if kc is not None and kc > 0 else CROP_KC[need or Level.MEDIUM]

    today = outlook[0] if outlook else None
    tomorrow = outlook[1] if len(outlook) > 1 else None
    if not enclosed:
        rec.rain_24h_mm = round(today.rain_mm if today else 0.0, 1)
        rec.rain_48h_mm = round(rec.rain_24h_mm + (tomorrow.rain_mm if tomorrow else 0.0), 1)
    if today and today.et0_mm is not None:
        factor = crop_kc * (ENCLOSED_ET_FACTOR if enclosed else 1.0)
        factor *= 1 - shade / 200  # 50 % shade -> 25 % less demand
        rec.etc_24h_mm = round(today.et0_mm * factor, 1)

    if need is None:
        rec.reasons.append("no_active_crops")
        return rec

    if moisture is None and depletion is not None:
        # Water-balance bucket: water when depletion exceeds the readily
        # available water (p x TAW); refill to field capacity.
        depleted, taw = depletion
        rec.confidence = "medium"
        raw = ALLOWED_DEPLETION * taw
        credited = 0.0 if enclosed else RAIN_EFFICIENCY * rec.rain_24h_mm
        rec.status = (
            MoistureStatus.DRY
            if depleted >= raw
            else MoistureStatus.SLIGHTLY_DRY
            if depleted >= 0.7 * raw
            else MoistureStatus.OPTIMAL
        )
        if depleted >= raw:
            if credited >= 0.8 * depleted:
                rec.action = IrrigationAction.SKIP_RAIN_EXPECTED
                rec.reasons.append("rain_expected")
                return rec
            rec.action = IrrigationAction.WATER
            rec.amount_mm = round(min(max(depleted - credited, 2.0), max_irrigation_mm), 1)
            rec.priority = TaskPriority.HIGH if depleted >= 0.9 * taw else TaskPriority.NORMAL
            rec.reasons.append("water_balance_depleted")
            _finish(rec, bed)
        else:
            rec.reasons.append("water_balance_ok")
        return rec

    if moisture is None:
        # No sensor, no bucket yet: forecast water balance only.
        rec.confidence = "low"
        demand = sum((o.et0_mm or 0.0) * crop_kc * (ENCLOSED_ET_FACTOR if enclosed else 1.0) for o in outlook[:2])
        rain = 0.0 if enclosed else RAIN_EFFICIENCY * rec.rain_48h_mm
        if demand - rain > 6.0 or (enclosed and demand > 4.0):
            rec.action = IrrigationAction.CHECK_MANUALLY
            rec.amount_mm = round(min(max(demand - rain, 0.0), max_irrigation_mm), 1)
            rec.reasons.append("no_sensor_water_balance_negative")
        else:
            rec.reasons.append("no_sensor_water_balance_ok")
        _finish(rec, bed)
        return rec

    rec.confidence = "high" if outlook else "medium"
    if rec.status in (MoistureStatus.OPTIMAL, MoistureStatus.WET):
        rec.reasons.append("moisture_ok" if rec.status is MoistureStatus.OPTIMAL else "moisture_wet")
        return rec

    # Dry: refill to the middle of the band.  Slightly dry: the crop is not
    # stressed yet, only bring it back to the lower edge of the optimum.
    target = band.target_mid if rec.status is MoistureStatus.DRY else band.target_low
    deficit = max(0.0, (target - moisture) / 100 * root_zone_depth_mm)
    need_mm = deficit + (rec.etc_24h_mm or 0.0)
    credited = RAIN_EFFICIENCY * (
        rec.rain_24h_mm
        + (0.5 * (rec.rain_48h_mm - rec.rain_24h_mm) if rec.status is MoistureStatus.SLIGHTLY_DRY else 0.0)
    )
    if not enclosed and credited >= 0.8 * need_mm:
        rec.action = IrrigationAction.SKIP_RAIN_EXPECTED
        rec.reasons.append("rain_expected")
        rec.priority = TaskPriority.LOW
        return rec

    rec.action = IrrigationAction.WATER
    rec.amount_mm = round(min(max(need_mm - credited, 2.0), max_irrigation_mm), 1)
    rec.priority = TaskPriority.HIGH if rec.status is MoistureStatus.DRY else TaskPriority.NORMAL
    rec.reasons.append("moisture_below_target")
    if credited > 0:
        rec.reasons.append("rain_partially_credited")
    _finish(rec, bed)
    return rec
```

`litres = mm × bed area (m²)`; `minutes = litres / flow (L/min)`.

### 7.8 Growing degree days

`GDD = max(0, (min(max(Tmax, base), 30) + min(max(Tmin, base), 30))/2 − base)`, accumulated
from the daily min/max log the coordinator keeps (outdoor sensor or weather temperature, gaps filled
from the recorder or Open‑Meteo). Greenhouses and cold frames use `climate.zone_log`: their own air
sensor where it logged the day, otherwise the outdoor day + 2 °C (min) / + 4 °C (max).

---

---

[← 6. Services, Entities, and Events](06-services-entities-and-events.md) · [↑ Blueprint contents](../BLUEPRINT.md) · [8. Example HA Automations & Dashboards →](08-example-ha-automations--dashboards.md)
