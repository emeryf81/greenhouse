<!-- Generated from the sources by a script: code excerpts below are verbatim. -->
[← 3. Data Model](03-data-model.md) · [↑ Blueprint contents](../BLUEPRINT.md) · [5. Frontend (TypeScript) →](05-frontend-typescript.md)

## 4. Backend (Python)

### 4.1 Setup

```python
async def async_setup_entry(hass: HomeAssistant, entry: GardenConfigEntry) -> bool:
    builtin = await hass.async_add_executor_job(load_builtin_json)
    repo = GardenRepository(hass, builtin, storage_key(entry))
    if await repo.async_load():
        _LOGGER.info("Creating initial Hortulus garden from setup answers")
        repo.data = build_initial_data(
            {**entry.data, **entry.options},
            latitude=hass.config.latitude,
            time_zone=hass.config.time_zone,
            language=normalize_lang(hass.config.language),
            today=dt_util.now().date(),
            db=PlantDatabase(builtin),
        )
        await repo.async_flush()

    repo.adopt_seasons()
    coordinator = GardenCoordinator(hass, entry, repo)
    notifier = GardenNotifier(hass, repo)
    irrigation = IrrigationController(hass, coordinator)
    climate = ClimateController(hass, coordinator)
    entry.runtime_data = GardenRuntime(repo, coordinator, notifier, irrigation, climate)
    entry.async_on_unload(coordinator.async_add_post_compute_hook(notifier.async_process))
    entry.async_on_unload(coordinator.async_add_listener(climate.async_apply))
    entry.async_on_unload(irrigation.async_stop_on_unload)
    irrigation.notifier = notifier
    notifier.actions.runtime = entry.runtime_data
    entry.async_on_unload(hass.bus.async_listen(ACTION_EVENT, notifier.actions.handle))
    entry.async_on_unload(async_track_time_interval(hass, irrigation.async_watch, timedelta(minutes=1)))

    await coordinator.async_config_entry_first_refresh()
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    await async_register_panel(hass)

    @callback
    def _midnight(now: datetime) -> None:
        """New day: expire yesterday's sensor tasks, roll windows forward."""
        hass.async_create_task(coordinator.async_request_refresh())

    entry.async_on_unload(async_track_time_change(hass, _midnight, hour=0, minute=5, second=0))
    _schedule_digest(hass, entry)
    _schedule_reminders(hass, entry)
    _schedule_irrigation(hass, entry)
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    async_notify_reloaded(hass, entry.entry_id, entry.runtime_data)
    return True
```

Setup is split in two. `async_setup` runs once per Home Assistant and registers what is
shared by all gardens: the services, the websocket commands, the Assist intents and the print
view. `async_setup_entry` runs per garden (config entry) and builds one `GardenRuntime`:
repository, coordinator, notifier, `IrrigationController` and `ClimateController`. The
panel and the Lovelace card are registered with the first garden and removed when the last one
unloads. Time hooks: the midnight rollover (00:05), the daily digest, the overdue
reminder and weekly look‑ahead (checked every 15 minutes, the day key prevents repeats), the
automatic irrigation start time (mode `auto` only) and a one‑minute hardware watch. Removing
a garden keeps one `.backup` copy of its document.

### 4.2 Coordinator – event‑driven updates

```python
@callback
def _on_state_changed(self, event: Event[EventStateChangedData]) -> None:
    if event.data["entity_id"] == self.repo.data.settings.weather_entity:
        # New observation from the weather integration -> forecast may
        # have changed too.  Rate limited inside _forecast_due().
        self.hass.async_create_task(self.async_request_refresh())
        return
    self.hass.async_create_task(self._recompute_debouncer.async_call())


async def _async_update_data(self) -> GardenAnalysis:
    if self._forecast_due():
        await self.async_fetch_forecast()
    await self._async_archive_old_seasons()
    await self._async_backfill_climate()
    return self._compute()


async def async_fetch_forecast(self) -> None:
    await self._async_fetch_entity_forecast()
    if self.repo.data.settings.open_meteo:
        await self._async_enrich_open_meteo()


def _compute(self) -> GardenAnalysis:
    repo = self.repo
    data = repo.data
    now = dt_util.now()
    readings = self.read_sensors()
    analysis = analyze(
        data,
        repo.db,
        self.weather,
        readings,
        now=now,
        tz=dt_util.get_default_time_zone(),
        latitude=data.settings.region.latitude or self.hass.config.latitude,
        lang=self.lang,
    )
    changed = False
    changed |= self._record_climate(data, readings, analysis, now)
    changed |= advance_water_balance(
        data,
        repo.db,
        analysis.timelines,
        analysis.today,
        latitude=data.settings.region.latitude or self.hass.config.latitude,
        tz=dt_util.get_default_time_zone(),
        moisture={bed_id: b.irrigation.moisture for bed_id, b in analysis.beds.items()},
    )

    # Garden water: one meter / water-butt reading per day.
    water = data.settings.water
    changed |= record_water(
        data,
        analysis.today,
        self._state_float(water.meter_entity, m3=True),
        self._state_float(water.butt_level_entity),
    )
    ctx = analysis.task_context(data, repo.db)
    ctx.rain_water_l = water_stats(data, analysis.today).rain_available_l
    merge = merge_tasks(data.tasks, generate_specs(ctx), today=analysis.today, now=now, lang=self.lang)
    if auto_assign(merge.created, data.settings.assignment):
        changed = True
    self.last_merge = merge
    if merge.changed:
        data.tasks = merge.tasks
        changed = True
    if changed:
        repo.async_schedule_save()
    for hook in self._post_compute_hooks:
        hook(analysis, merge)
    return analysis
```

On top of the excerpt, every recompute books the day's climate through `_record_climate`
(outdoor temperature, humidity, wind, gusts and radiation from the outdoor sensors, else the
weather entity; lux × 0.0079 as radiation without a radiation sensor; every mapped temperature
sensor into `sensor_log`; rain from the gauge, or the forecast's rain when there is no gauge,
never lowered during the day), advances the
water balance (4.4), records the water meter / butt reading, merges the generated tasks
(auto‑assigning new ones to household members), calls the post‑compute hooks (notifications,
climate controller, entity updates) and triggers the season archive (4.16). A sensor state
change schedules a debounced recompute; a change of the weather entity itself refetches the
forecast, at most once per 10 minutes; plan edits recompute through the repository listener.

Once a day (and at start‑up) `_async_update_data` also runs `_async_backfill_climate`: the
recorder (`climate_history.async_daily_history`, only when the `recorder` component is loaded
and `climate.history_days_needed` or missing sensor days show gaps in the last 30 days) and,
with *Use Open‑Meteo* on, `api.async_fetch_open_meteo_history` (observed daily weather of the
last 31 days) fill the climate history; failures are logged at debug level and never stop an
update. `merge_climate_history` / `merge_sensor_history` are the same entry points for a host
that brings its own history (the website).

```python
async def _async_backfill_climate(self) -> None:
    """Once a day (and at start-up): fill the days nobody watched.

    The recorder holds what the garden's own sensors measured while Hortulus was
    not running; Open-Meteo (when switched on) gives the observed weather for days
    without any sensor.  Both only fill gaps - own samples stay.
    """
    today = dt_util.now().date()
    if self._backfilled_on == today:
        return
    self._backfilled_on = today
    data = self.repo.data
    changed = False
    try:
        changed |= await self._async_backfill_recorder(today)
    except Exception:  # history is a bonus: never stop the garden from updating
        _LOGGER.debug("Filling climate history from the recorder failed", exc_info=True)
    if data.settings.open_meteo:
        from .api import async_fetch_open_meteo_history

        try:
            payload = await async_fetch_open_meteo_history(self.hass, *self._location())
        except Exception as err:  # history is a bonus, never a reason to stop
            _LOGGER.debug("Open-Meteo history unavailable: %s", err)
        else:
            changed |= climate.merge_history(data, climate.open_meteo_daily(payload), "model", today)
    if changed:
        self.repo.async_schedule_save()
```

### 4.3 Storage repository

```python
@callback
def async_changed(self, reason: str, *, bump_revision: bool = True, source: str = "user") -> None:
    """Persist and notify.  ``reason`` is e.g. ``plan``, ``tasks``, ``settings``."""
    self.record(reason, source=source)
    # The revision guards the *plan* (optimistic concurrency for the
    # planner); ticking off a task must not invalidate an open editor.
    if bump_revision and reason in PLAN_REASONS:
        self.data.revision += 1
    if reason in ("plants", "plan", "import"):
        self.invalidate_db()
    self.async_schedule_save()
    for listener in list(self._listeners):
        listener(reason)
```

`GardenRepository` (`storage.py`) owns the in‑memory `GardenData` and three more stores
(system log, season archive, and a `.corrupt` backup when a document fails to load).
`async_changed(reason)` is the single door for writes: it records what changed in the system log,
bumps the revision for plan reasons (`plan`, `import`), invalidates the plant database for
`plants`/`plan`/`import`, schedules the debounced save (5 s) and notifies listeners. The
log works by diffing the serialised document against the previous state
(`engine/syslog.py`): item‑level `before`/`after` pairs per collection, an undo writes the
`before` values back only for items that still look as the entry left them (otherwise the
caller must confirm with `force`), and an undo is itself logged, so it can be undone (redo).
Sensor bookkeeping (climate history, water balance, meter readings, notification keys) and the
revision are not actions and are not tracked. `record_error` writes refused actions (a
refused plan, a conflict, a hardware problem) to the same log as `error` entries. The log is capped
at 500 entries and ≈ 4 MB.

### 4.4 Scheduling engine

```python
def planting_timeline(
    planting: Planting,
    plant: Plant,
    anchors: SeasonAnchors,
    zone: Zone | None = None,
    today: date | None = None,
) -> PlantingTimeline:
    """Absolute dates for a planting.

    Priority for every date: what actually happened > user override >
    computed from the window (clamped to ``today`` when the window is open and
    nothing has been done yet, so overdue plans move forward sensibly).
    """
    windows = plant_windows(plant, anchors, zone)
    method = resolve_method(plant, planting.method)
    # Only "live" seasons move planned dates forward; past/future seasons are
    # shown exactly as planned.
    in_season = today is not None and anchors.last_frost - timedelta(
        days=200
    ) <= today <= anchors.first_frost + timedelta(days=60)
    ref = today if in_season else None
    late = False

    sow_window: DateWindow | None = None
    sow_date: date | None = None
    transplant_window: DateWindow | None = None
    transplant_date: date | None = None

    if method is SowMethod.TRANSPLANT:
        transplant_window = (
            _pick_containing(windows.transplant, planting.transplant_date)
            if planting.transplant_date
            else _pick(windows.transplant, ref)
        )
        transplant_date = planting.transplanted_on or planting.transplant_date
        if transplant_date is None and transplant_window:
            transplant_date = transplant_window.start
            if ref and ref > transplant_date:
                transplant_date = ref
    else:
        options = windows.indoor_sow if method is SowMethod.INDOOR_SOW else windows.direct_sow
        sow_window = _pick_containing(options, planting.sow_date) if planting.sow_date else _pick(options, ref)
        sow_date = planting.sown_on or planting.sow_date
        if sow_date is None and sow_window:
            sow_date = sow_window.start
            if ref and ref > sow_date:
                sow_date = ref
        if sow_window and sow_date and sow_date > sow_window.end:
            late = True
        if method is SowMethod.INDOOR_SOW and sow_date:
            earliest = sow_date + timedelta(days=plant.transplant_age_days[0])
            transplant_window = _pick(windows.transplant, earliest) or DateWindow(
                earliest, earliest + timedelta(days=14)
            )
            transplant_date = planting.transplanted_on or planting.transplant_date
            if transplant_date is None:
                transplant_date = max(earliest, transplant_window.start)

    if transplant_window and transplant_date and transplant_date > transplant_window.end:
        late = True

    in_ground = transplant_date or sow_date or anchors.last_frost
    if plant.maturity_from == "transplant":
        if transplant_date is not None:
            base = transplant_date
        else:  # direct sown crop whose maturity is quoted from transplanting
            base = in_ground + timedelta(days=plant.germination_days[1] + 14)
    else:
        base = sow_date or in_ground

    harvest_start = planting.harvest_started_on or base + timedelta(days=plant.days_to_maturity[0])
    natural_end = max(
        base + timedelta(days=plant.days_to_maturity[1]),
        harvest_start + timedelta(days=plant.harvest_duration_days),
    )
    harvest_end = natural_end
    # Tender crops outdoors die with the first frost.
    if plant.frost_tolerance is FrostTolerance.TENDER and not anchors.frost_free and not plant.perennial:
        frost_limit = anchors.first_frost + timedelta(weeks=windows.extension_weeks)
        if harvest_start < frost_limit < harvest_end:
            harvest_end = frost_limit
    bearing = True
    if plant.perennial and plant.harvest_windows:
        # Perennials crop in fixed seasonal windows, not "days after planting".
        bearing = plant.years_to_bearing <= 0
        win = _perennial_harvest(plant, anchors, in_ground)
        if win:
            harvest_start, harvest_end = win
    if planting.finished_on:
        harvest_end = planting.finished_on

    harden = None
    if method is SowMethod.INDOOR_SOW and transplant_date and not zone_is_enclosed(zone):
        harden = transplant_date - timedelta(days=10)

    return PlantingTimeline(
        method=method,
        sow_window=sow_window,
        sow_date=sow_date,
        transplant_window=transplant_window,
        transplant_date=transplant_date,
        harden_off_date=harden,
        in_ground=in_ground,
        harvest_start=harvest_start,
        harvest_end=harvest_end,
        late=late,
        bearing=bearing,
    )
```

Besides the excerpt, `engine/schedule.py` turns the relative windows into absolute
dates per season and zone (greenhouse and cold frame extend the season by
`season_extension_weeks`), then refines them with live data (soil too cold or hot for sowing,
a frost forecast delaying frost‑tender transplants, dependants lagging behind an overdue
prerequisite; the soil temperature for sowing is the lower of the reading now and the mean of
the last three days in `sensor_log`); `engine/phenology.py` adds growth stage, stage Kc and a
degree‑day harvest projection over the crop's **zone series** (`climate.zone_log`: a greenhouse's
own air sensor, else the outdoor day + 2 °C at night / + 4 °C by day), blended with the forecast;
heat days (logged in the last 30 days plus forecast, at most 10 days) and dull days (a day per
three, at most 5, `climate.dull_days`) delay fruiting crops, and crops without a degree‑day model
are held back by logged cold days below `min_temp_c` (a day per two, at most 10);
`weather_delay_days` and the logged counts go to the crop popup; `engine/succession.py`
expands one drag into several dated sowings; `engine/waterbalance.py` keeps a FAO‑56 root‑zone
bucket per bed, booked once per completed day (ET₀ of the logged day – `climate.daily_et0`:
Penman‑Monteith with its humidity, wind and sunshine or radiation, Hargreaves with only min/max,
Open‑Meteo's FAO ET₀ for a day it filled – × stage Kc, effective rain and logged irrigation in). When a bed has a moisture sensor the bucket is set from the reading once a
day and the bed learns how fast it really dries out (`et_factor`), so the advice stays right on
days the sensor is offline.

### 4.5 Compatibility engine

```python
def evaluate_pair(
    pa: Planting,
    ra: Rect,
    plant_a: Plant,
    pb: Planting,
    rb: Rect,
    plant_b: Plant,
    db: PlantDatabase,
    *,
    radius_cm: float,
    lang: str = "en",
    hemisphere: Hemisphere = Hemisphere.NORTH,
) -> list[PairFinding]:
    findings: list[PairFinding] = []
    gap = ra.gap(rb)
    reach = max(radius_cm, (plant_a.spacing_cm + plant_b.spacing_cm) / 2)
    if gap > reach:
        return findings
    influence = max(0.0, 1.0 - gap / reach) if reach else 1.0
    name_a, name_b = plant_a.name(lang), plant_b.name(lang)

    overlap = ra.intersection_area(rb)
    if overlap > 0:
        frac = overlap / max(1.0, min(ra.w * ra.h, rb.w * rb.h))
        if frac > 0.05:
            findings.append(
                PairFinding(
                    pa.id,
                    pb.id,
                    "overlap",
                    "error" if frac > 0.25 else "warning",
                    -30 * min(frac, 1.0),
                    gap,
                    "compat.overlap",
                    {"a": name_a, "b": name_b},
                )
            )

    if pa.plant_id != pb.plant_id:
        rel = db.relation(pa.plant_id, pb.plant_id)
        if rel.relation is Relation.FRIEND:
            findings.append(
                PairFinding(
                    pa.id,
                    pb.id,
                    "friend",
                    "info",
                    10 * rel.strength * influence,
                    gap,
                    "compat.friend",
                    {"a": name_a, "b": name_b, "reason": rel.reasons.get(lang) or rel.reasons.get("en", "")},
                )
            )
        elif rel.relation is Relation.ENEMY:
            findings.append(
                PairFinding(
                    pa.id,
                    pb.id,
                    "enemy",
                    "error" if rel.strength >= 2 and influence > 0.5 else "warning",
                    -20 * rel.strength * influence,
                    gap,
                    "compat.enemy",
                    {"a": name_a, "b": name_b, "reason": rel.reasons.get(lang) or rel.reasons.get("en", "")},
                )
            )
        elif plant_a.family == plant_b.family and gap <= 1.0:
            findings.append(
                PairFinding(
                    pa.id,
                    pb.id,
                    "same_family",
                    "info",
                    -3,
                    gap,
                    "compat.same_family_adjacent",
                    {"a": name_a, "b": name_b},
                )
            )
        if rel.relation is Relation.NEUTRAL or rel.source == "family":
            findings.extend(_secondary_factors(pa, ra, plant_a, pb, rb, plant_b, influence, gap, lang, hemisphere, rel))
    return findings


def check_rotation(
    planting: Planting,
    bed: GardenBed,
    history: Iterable[RotationRecord],
    db: PlantDatabase,
    *,
    lang: str = "en",
) -> list[RotationFinding]:
    """Flag the same family in the same bed within ``rotation_years``.

    A family that returns *one* season early is a warning, sooner is an error.
    Perennials and plants with ``rotation_years <= 1`` are exempt.
    """
    plant = db.get(planting.plant_id)
    if plant is None or plant.perennial or plant.rotation_years <= 1:
        return []
    findings: list[RotationFinding] = []
    for rec in history:
        if rec.bed_id != bed.id or rec.family != plant.family:
            continue
        gap = planting.season - rec.season
        if 0 < gap < plant.rotation_years:
            findings.append(
                RotationFinding(
                    planting=planting.id,
                    bed_id=bed.id,
                    family=plant.family,
                    conflicting_season=rec.season,
                    years_required=plant.rotation_years,
                    severity="warning" if gap == plant.rotation_years - 1 else "error",
                    params={
                        "family": plant.family,
                        "bed": bed.name,
                        "season": rec.season,
                        "years": plant.rotation_years,
                        "plant": plant.name(lang),
                    },
                )
            )
    findings.sort(key=lambda f: -f.conflicting_season)
    return findings[:1]  # most recent conflict is the one that matters
```

### 4.6 Task engine

```python
def _apply_dependency_lag(specs: list[TaskSpec], today: date) -> None:
    """Push dependants back while a prerequisite is still overdue.

    If "sow lettuce" is 10 days overdue, "thin lettuce" cannot be due before
    its own offset after the (future) sowing - so it moves 10 days too.
    Specs are emitted in lifecycle order, so one pass handles chains
    (sow -> harden off -> plant out -> care).
    """
    by_key = {s.key: s for s in specs}
    for spec in specs:
        lag = 0
        for dep_key in spec.depends_on:
            dep = by_key.get(dep_key)
            if dep is not None and dep.due < today:
                lag = max(lag, (today - dep.due).days)
            elif dep is not None and dep.due > spec.due:
                lag = max(lag, (dep.due - spec.due).days)
        if lag:
            delta = timedelta(days=lag)
            spec.due += delta
            if spec.window_start:
                spec.window_start += delta
            if spec.window_end and spec.recurrence is None:
                spec.window_end += delta


def merge_tasks(
    existing: Sequence[Task],
    specs: Sequence[TaskSpec],
    *,
    today: date,
    now: datetime,
    lang: str = "en",
    id_factory: Callable[[], str] = new_id,
) -> MergeResult:
    result = MergeResult(tasks=[])
    open_by_key = {t_.key: t_ for t_ in existing if t_.key and t_.is_open}
    closed_keys = {t_.key for t_ in existing if t_.key and not t_.is_open}
    progressed = {k.split("@")[0] for k in closed_keys if k and "@" in k}
    spec_keys = {s.key for s in specs}
    out: list[Task] = []

    for task in existing:
        if task.source is TaskSource.USER or not task.key or not task.is_open:
            out.append(task)
            continue
        if task.key in spec_keys:
            out.append(task)
            continue
        # The reason for this open task disappeared.
        if task.source in (TaskSource.SENSOR, TaskSource.WEATHER):
            closed = replace(
                task,
                status=TaskStatus.SKIPPED if task.due < today else TaskStatus.DONE,
                completed_at=now,
                updated_at=now,
            )
            closed.notes = [*task.notes, TaskNote(now, "auto: expired" if task.due < today else "auto: resolved")]
            out.append(closed)
            result.auto_closed.append(closed)
        elif task.notes or task.photos:
            skipped = replace(task, status=TaskStatus.SKIPPED, completed_at=now, updated_at=now)
            out.append(skipped)
            result.auto_closed.append(skipped)
        else:
            result.removed.append(task)

    index = {id(t_): i for i, t_ in enumerate(out)}
    for spec in specs:
        current = open_by_key.get(spec.key)
        if current is not None and id(current) in index:
            updated = _apply_spec(current, spec, lang, now, progressed=spec.key in progressed)
            if updated is not current:
                out[index[id(current)]] = updated
                result.updated.append(updated)
            continue
        if spec.key in closed_keys and spec.recurrence is None:
            continue  # one-off task already done/skipped
        if spec.recurrence is not None:
            last = _series_progress(existing, spec.key)
            if last is not None or spec.key in closed_keys:
                base_day = last.completed_at.date() if last and last.completed_at else (last.due if last else today)
                nxt = base_day + timedelta(days=spec.recurrence.interval_days)
                if spec.recurrence.until and nxt > spec.recurrence.until:
                    continue
                spec = replace(spec, due=max(nxt, spec.due))
            elif spec.due < today:
                # First occurrence of a routine that should have started
                # already: start today instead of showing it months overdue.
                spec = replace(spec, due=today)
        task = spec_to_task(spec, lang, now, id_factory)
        out.append(task)
        result.created.append(task)

    result.tasks = out
    return result


def postpone_task(
    data: GardenData,
    task_id: str,
    *,
    now: datetime,
    days: int | None = None,
    to: date | None = None,
    reason: str | None = None,
    cascade: bool = True,
) -> PostponeResult:
    """Move a task; dependants of the same planting shift by the same delta.

    Example: postponing *sow tomato indoors* by a week also moves *harden off*
    and *plant out* - unless the gardener already moved those by hand.
    """
    task = data.task(task_id)
    if task is None:
        raise KeyError(task_id)
    if to is None:
        to = task.due + timedelta(days=days if days is not None else 1)
    delta = to - task.due
    result = PostponeResult(task)
    if delta.days == 0:
        return result
    task.original_due = task.original_due or task.due
    task.due = to
    task.postponed_count += 1
    task.user_modified = True
    task.updated_at = now
    if reason:
        task.notes.append(TaskNote(now, reason))
    if task.window_end and to > task.window_end:
        result.warnings.append("beyond_window")

    if cascade and task.key and delta.days > 0:
        queue = [task.key.split("@")[0]]
        seen = set(queue)
        while queue:
            key = queue.pop()
            for other in data.tasks:
                if (
                    other.is_open
                    and other is not task
                    and other.key
                    and key in other.depends_on
                    and other.key not in seen
                    and not other.user_modified
                ):
                    other.due = other.due + delta
                    other.updated_at = now
                    result.shifted.append(other)
                    seen.add(other.key)
                    queue.append(other.key)
                    if other.window_end and other.due > other.window_end:
                        result.warnings.append(f"dependant_beyond_window:{other.id}")
    return result
```

Task keys decide idempotence: `p:<planting>:…` (from a planting and its plant), `b:<bed>:…`
(bed routines), `s:water:…` (sensor driven, one day), `w:<kind>:…` (weather driven, one day) and
`m:<rule>:…` (seasonal garden work). Recurring series keep exactly one open task; completing it
archives it as `<key>@<due>` and schedules the next one after the completion date. Sources:
`generated`, `sensor`, `weather`, `user`. A task whose title or description the gardener rewrote
(`text_modified`) keeps its text when tasks are recalculated, and one the user moved by hand
(`user_modified`) is not shifted by a cascade. The generators beyond the planting lifecycle:
`maintenance.py` (garden, greenhouse and perennial work anchored on the frost dates, plus the
ecological work of `eco.py`), `weather_tasks.py` (heat, dry spell, storm, heavy rain),
`pests.py` (pest calendar from degree‑days, tasks for insect mesh before a flight, weekly checks,
an evening slug round) and `fertilizer.py` (base dressing, feed doses, lime advice from the
latest soil test).

### 4.7 Config flow (excerpt)

```python
async def async_step_area_sensors(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
    if user_input is not None:
        self._data[CONF_AREAS].append(
            {**self._area, **{k: v for k, v in user_input.items() if v not in (None, "")}}
        )
        return await self.async_step_area_menu()
    enclosed = self._area.get(CONF_AREA_TYPE) == AREA_GREENHOUSE
    fields: dict[Any, Any] = {
        vol.Optional(CONF_MOISTURE): _entity("sensor", "moisture"),
        vol.Optional(CONF_SOIL_TEMP): _entity("sensor", "temperature"),
    }
    if enclosed:
        fields[vol.Optional(CONF_AIR_TEMP)] = _entity("sensor", "temperature")
        fields[vol.Optional(CONF_HUMIDITY)] = _entity("sensor", "humidity")
        fields[vol.Optional(CONF_LIGHT)] = _entity("sensor", "illuminance")
    fields[vol.Optional(CONF_IRRIGATION)] = _entity([Platform.SWITCH, Platform.VALVE])
    fields[vol.Optional(CONF_FLOW_LPM)] = _number(0.1, 200, 0.1, "L/min")
    return self.async_show_form(
        step_id="area_sensors",
        data_schema=vol.Schema(fields),
        description_placeholders={"name": self._area.get(CONF_AREA_NAME, "")},
    )
```

The wizard has no single‑instance limit: the first entry is titled *Hortulus* and uses the
original storage key; every further entry (an allotment, a second plot) is titled *Hortulus 2*,
*Hortulus 3* … and gets its own storage key (`gardens.CONF_STORAGE_KEY`). The options flow
edits region, weather, notifications and advanced limits, and `options.apply_options` copies
them into the stored settings before the entry reloads.

### 4.8 Websocket API (excerpt: live draft check used while dragging)

```python
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plan/check",
        vol.Optional("garden_id"): str,
        vol.Required("bed"): dict,
        vol.Required("plantings"): list,
    }
)
@callback
def ws_plan_check(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Live feedback for a *draft* bed while dragging (nothing is saved)."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    data = runtime.repo.data
    db = runtime.repo.db
    lang = runtime.coordinator.lang
    try:
        bed = from_dict(GardenBed, msg["bed"])
        plantings = [from_dict(Planting, p) for p in msg["plantings"]]
    except (TypeError, ValueError, KeyError) as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return
    today = dt_util.now().date()
    zone = data.zone(bed.zone_id)
    timelines = {}
    planned = {}
    for p in plantings:
        plant = db.get(p.plant_id)
        if plant is not None:
            anchors = season_anchors(data.settings.region, p.season)
            timelines[p.id] = planting_timeline(p, plant, anchors, zone, today)
            planned[p.id] = planting_timeline(p, plant, anchors, zone, None).occupancy
    report = check_bed(
        bed,
        plantings,
        db,
        timelines={k: v.occupancy for k, v in timelines.items()},
        planned=planned,
        radius_cm=data.settings.companion_radius_cm,
        lang=lang,
        hemisphere=resolve_profile(data.settings.region).hemisphere,
    )
    others = [p for p in data.plantings if p.id not in {d.id for d in plantings}]
    history = rotation_history(data.rotation_history, others, db)
    rotation = [f.to_dict() for p in plantings for f in check_rotation(p, bed, history, db, lang=lang)]
    connection.send_result(
        msg["id"],
        {
            **report.to_dict(),
            "rotation": rotation,
            "timelines": {k: v.to_dict() for k, v in timelines.items()},
        },
    )
```

All commands live under `garden_manager/` and take an optional `garden_id` (config entry id; the
first garden without it). Reads are open to every authenticated user; writes that change the plan,
the plant database, settings or hardware require an administrator (`@require_admin`); task
actions and the personal records are open, because family members tick off chores and log
harvests too. The 69 commands, by area:

| Area | Commands | Who |
|---|---|---|
| State | `subscribe` (live snapshot: analysis, weather, tasks, settings, layouts, set‑aside plans, diagnosis summary, irrigation status incl. stuck valves and leak, recent logs, gardens list …), `plants`, `plants/windows`, `analysis`, `analysis/explain` ("why not here?"), `analysis/still_possible`, `plantings/season`, `planning`, `plan/compare`, `report/season`, `advice`, `supplies`, `qa/options`, `qa/ask`, `handbook/index\|chapter\|search`, `records/overview`, `irrigation/plan`, `syslog/list`, `print/render` (SVG preview), `year/preview`, `climate/stats` (climate history and statistics; optional `days` 7–800, default 400) | any user |
| Plan | `plan/check` (draft check while dragging), `plan/succession`, `plan/export`, `plan/autofill` (proposal) | any user |
| Plan writes | `plan/save` (revision guarded), `plan/import`, `plan/autofill/apply`, `plan/new`, `plan/activate`, `plan/delete`, `layout/delete`, `year/apply`, `planting/update`, `plantings/update_many`, `garden/starter`, `analysis/fix` (one‑click repairs) | admin |
| Plant database | `plants/save`, `plants/delete` | admin |
| Settings | `settings/save` (validated: impossible frost dates or times are refused) | admin |
| Tasks | `tasks/add`, `tasks/action` (complete, skip, postpone, update, delete, reopen) | any user |
| Records | `records/harvest/add`, `records/journal/save`, `records/seeds/save`, `records/expense/save`, `records/soil/save`, `records/soil/delete`, `records/delete` | any user |
| Cooking | `cooking/suggest` (ideas + menus), `cooking/render`, `cooking/book/save\|update\|delete`, `cooking/prefs`, `cooking/pdf`, `cooking/send`, `cooking/to_todo` | any user (`to_todo` needs control of the to‑do entity) |
| To‑do export | `seeds/to_todo` | any user, but only on a to‑do entity the user may control |
| Hardware | `irrigation/run`, `irrigation/stop`, `irrigation/test`, `irrigation/close` | admin |
| Climate writes | `climate/import_csv` (`text` ≤ 20 MB → `{days, first, last, rows, columns, changed}`; `invalid_csv`, `disabled`), `climate/apply_local_frost` (→ `{settings}`; `no_suggestion`) | admin |
| System log | `syslog/entry` (full diff), `syslog/undo` | admin |

A revision conflict (`plan/save`, `plan/autofill/apply`) answers `revision_conflict` and the
panel reloads; validation errors become websocket errors with a translation key and are also
written to the system log as `error` entries (Analysis → Errors).

### 4.9 Edge cases handled

| Edge case | Handling |
|---|---|
| Southern hemisphere | season July→June, first frost in the next calendar year (`region.season_anchors`), USDA dates shifted 6 months |
| Leap years | `parse_mmdd(2026, "02-29")` → 28 Feb; ET₀ day‑of‑year uses 366 in leap years |
| DST | hourly forecast handled as instants; durations from instant differences; local day aggregation via `astimezone` |
| Missing / stale sensors | `unknown`/`unavailable` → `None`; `last_reported` older than *stale minutes* → ignored + alert |
| Forecast unavailable | frost: hourly → daily → current sensor → `unknown`; irrigation: sensor only, confidence lowered |
| Imperial units | forecast and sensor temperatures/precip/wind converted with HA unit converters |
| Frost‑free climates | synthetic anchors keep windows sensible; no frost limits on harvests |
| Late plans | open windows roll forward to *today*; dependants lag behind overdue prerequisites |
| Concurrent edits | revision check → `revision_conflict` → panel reloads |
| Corrupt storage | backup to `garden_manager.garden.corrupt`, start fresh, log error |
| Refused import | the whole file is checked (format, zones, beds, plantings, archived plans, `plant_overrides` type) before the first change; a refused file changes nothing |
| Impossible input | NaN / infinity for sizes, positions and weights, `null` for a required field, a frost date of `13-01`, a time of `25:00` and a soil test without a date are refused; a refused task change changes nothing |
| Second garden | own storage key, own entities and devices; a remembered garden that was removed falls back to the first one (`not_loaded`) |
| Old seasons | copied to the archive first; they leave the garden document only after the archive was read back from disk at a later start‑up |
| Valve that does not obey | never opens → run ends (pump stays off); goes silent for 60 s while the pump runs → run ends and the pump stops; shuts by itself → only the seen time is booked and it is reported; stays open > max runtime + 10 min → reported with a *Close valve* button |
| Failed climate command | a vent/shade command that raised is forgotten and tried again at the next update |


### 4.10 Operations layer

`operations.py` holds every write the garden accepts, as plain functions on a `GardenRuntime`
(`op_add_task`, `op_complete_task`, `op_save_plan`, `op_import_plan`, `op_save_settings`,
`op_add_planting`, `op_log_harvest`, `op_year_transition`, `op_new_plan`, `op_cookbook_save`,
`op_undo`, …). Services, websocket commands, the calendar and to‑do entities and the phone
buttons all call them, so validation is written once:

* sizes, positions and weights must be finite numbers; plantings must name a bed and a plant that
  exist; a bed must sit in a zone of its own plan; settings are validated as a whole
  (`_validate_settings`: real `MM-DD` frost dates, `HH:MM` for every `*_time`, finite numbers);
* plan saves are guarded by the **revision** (`RevisionConflict` → the panel reloads) and go to the
  garden and season they were made for, one request at a time (a draft opened before the first
  harvest cannot undo it);
* a custom plant that a set‑aside plan still uses cannot be deleted; a bed removed from a plan
  loses its Home Assistant device (`_sync_devices`);
* every operation ends in `repo.async_changed(reason)`, which writes the system log entry, so
  anything done through any door can be undone with `op_undo`;
* a refused action raises `ServiceValidationError` with a translation key (shown in the user's
  language) and is logged as an `error` entry.

### 4.11 Hardware controllers

`controllers.py` is the only code that switches real hardware.

**`IrrigationController`.** `engine/irrigation.py` builds a pure plan (which valves, how long,
and when not: frost lockout on the plant‑level minimum of the next 12 hours or the current
outdoor temperature, rain skip, `max_runtime_min`, one valve at a time); the controller re‑checks and
executes it under a lock (one run at a time):

* *Pump interlock*: valve open → wait until it reports open → settle → pump on … pump off →
  `pump_lead_s` → valve closed. The pump never runs against a valve that did not report open.
* *Always clean up*: a `finally` switches the pump off first and then every touched valve, also on
  errors, cancellation (`stop`, shutdown) and start‑up failures.
* *Valve timers*: a bed's `valve_max_min` splits a long run into openings (`_chunks`) with a short pause.
* *Lost, early‑closed and stuck valves*: while the pump runs a valve that reports nothing for 60 s
  ends the run and stops the pump; a valve that shuts by itself books only the time it was seen
  open and is reported; every run is followed by a `valve_not_closed` check; a once‑a‑minute
  `async_watch` reports a valve or pump left open longer than `max_runtime_min + 10` minutes
  (system log, notification with a *Close valve* button, red banner in the panel, `irrigation/close`).
* *Valve test* (`irrigation/test`): opens a valve for 5 s in the safe order and checks that it reports
  open and closed again.
* *Water meter*: litres booked per run come from the meter when there is one, each bed learns its
  real flow (`measured_flow_lpm`, smoothed), and water counted for 15 minutes while every valve is
  closed (≥ 5 L) is reported as a leak (banner + notification; `leak_alerts` switches it off).
* Every run is written to `irrigation_log` (feeds the water balance) and fired as
  `garden_manager_irrigation_run`. `run_irrigation_plan` accepts `only_if_needed`, so an automation
  picks the moment and Hortulus still decides whether the bed needs water.

**`ClimateController`.** For enclosed zones in `auto` mode it drives the vent and the shade entity
from the greenhouse advice (humidity ≥ 90 % above 12 °C also opens the vent). A shade `cover.*` is
deployed by closing it. It acts only when the wanted state changes, the zone's shading select
(`auto`/`on`/`off`) wins over the advice, and a failed command is retried at the next update.

### 4.12 Notifications, phone actions and Assist

`notifications.py` turns the analysis into persistent notifications, `notify.*` pushes, optional
`tts.speak` (frost) and bus events (`garden_manager_frost_warning`, `_heat_warning`,
`_disease_warning`, `_task_due`, `_irrigation_recommended`), de‑duplicated by keys in
`GardenData.notified` (pruned after 14 days). The daily digest, the evening overdue reminder
(with a verdict per task: still possible / too late / do now) and the weekly look‑ahead go to
the configured services and to each household member's personal notify service. `actions.py`
adds buttons to these phone notifications (companion app): *Done* and *Tomorrow* on the digest
and reminders, *Water now* when beds need water, *Close valve* on a valve left open; the action
names carry a short token (at most 60 are remembered) and the handler listens to
`mobile_app_notification_action`.

`voice.py` answers six Assist intents (`HortulusTasksToday`, `HortulusOverdue`, `HortulusHarvest`,
`HortulusGreenhouse`, `HortulusWater`, `HortulusFrost`) from the live analysis; the sentences
ship per language in `data/sentences/{en,nl,fr}/hortulus.yaml` and the service
`install_voice_sentences` copies them to `<config>/custom_sentences` (files the user edited are kept
unless `overwrite`).

### 4.13 More than one garden

One config entry is one garden (`gardens.py`). The first keeps the original storage key
`garden_manager.garden`; later ones store theirs in the entry data, so an existing install is
untouched. `pick(hass, ref)` resolves an entry id or a title (case‑insensitive) and returns the
first garden without a reference. Websocket commands take `garden_id`, services `garden:`
(through a `ContextVar`, so operations stay unaware of it), the tasks card `garden:`, the print
view `garden_id`. Entities and devices are per entry. The panel's snapshot lists all gardens
(`gardens`) for the switcher, and the browser remembers the chosen one
(`localStorage["hortulus.garden"]`).

### 4.14 Engine module catalogue

All in `custom_components/garden_manager/engine/` – pure Python, standard library only.

| Area | Module | Role |
|---|---|---|
| Model | `models` | dataclasses and enums (section 3) |
| | `serde` | forgiving (de)serialisation; `migrations` – storage versions (3.6) |
| | `region`, `geometry`, `coverage` | frost dates and hemispheres; footprints, plant counts, snapping; what covers what on the site plan |
| | `plantdb` | built‑in database + custom plants + overrides, symmetric relations, search |
| Timing | `schedule`, `succession`, `phenology` | windows and live advice, succession sowings, growth stage / Kc / degree‑day harvest |
| | `compatibility` | companion scoring, overlaps, rotation (7.3, 7.4) |
| Weather & water | `weather` | forecast parsing, frost, heat, greenhouse climate, ET₀, GDD, disease risk (forecast + `recent=` logged days) |
| | `climate` | climate history: sampling, gap filling, months, frost dates, statistics, and the logged series that growth, water, disease and tasks use (4.22) |
| | `watering`, `waterbalance`, `irrigation` | moisture bands and recommendation, FAO‑56 bucket with sensor learning, the safe plan |
| Tasks | `tasks` | generation, merge, recurrence, postpone cascade, digest and overdue reports |
| | `maintenance`, `weather_tasks`, `pests`, `eco`, `fertilizer` | seasonal work, weather episodes (forecast and logged), pest calendar, ecological gardening and food forest, compost / feed / lime |
| Insight | `analysis` | `analyze()` orchestrates everything into `GardenAnalysis` |
| | `diagnose` | consistency check, "why not here?", one‑click repairs, plan compare, what can still go in |
| | `advisor`, `qa`, `qa_kb`, `supplies` | garden suggestions, Q&A assistant and its knowledge base, tools and shopping list |
| Records | `records`, `kitchen`, `planning` | harvest, seeds, water, expenses and year overview; ready to pick, surplus, cost and harvest; seeds to buy, successions, harvest forecast, season report |
| Plans | `autoplan` | Autofill: greedy, explainable season proposal |
| | `seasons`, `archive`, `syslog`, `planio` | per‑season plans and year‑end transition, season archive, undo log, import/export |
| Cooking | `cooking`, `cooking_dishes`, `cooking_extras` | see 4.15 |
| Documents | `pdf`, `printout`, `seasonbook`, `handbook` | drawing surfaces, printable documents, the season book, handbook and glossary |
| | `slogans` | garden sayings (EN/NL/FR; themes garden, veg, outdoors, harvest, rest, weather and one per season, southern hemisphere shifted), picked per day and place (extra `slogans`) |
| Text | `i18n`, `texts_garden` | backend message catalogue (EN/NL/FR); maintenance and weather texts registered on import |

### 4.15 Cooking engine

A seasonal cookbook from what the garden gives right now, split over three modules with one
data flow: **garden produce → technique → spec → recipe**.

* **Produce.** `ready_produce` takes the kitchen report's crops that are ready to pick and classifies each plant into a
  *kind* (`leafy`, `brassica`, `root`, `allium`, `fruiting`, `squash`, `legume`, `potato`, `corn`,
  `asparagus`, `herb`, `fruit`) by plant id and family. Lettuce, cucumber and radish only go in salads
  (`RAW_ONLY`); elderberries and beans (also chickpeas, edamame) are never offered raw or half‑cooked
  (`COOK_FIRST`: no elderberry sorbet, no raw bean salad – a dish refuses them even when the spec is written
  by hand); a chili is a spice, never the main vegetable.
* **Techniques** (`Technique`, 53 in all). 17 in `cooking.py` (soup, roast tray, stir‑fry, pasta, risotto,
  salad, gratin, stew/curry, frittata, stoemp, stuffed vegetables, plate with meat and fries, pesto, fruit
  dessert, chilled soup, crostini, compote) plus 36 in `cooking_dishes.py` (`SPECS`, collected from
  home‑cooking sources on the seasonal kitchen garden and written in our own words: ratatouille, tian,
  shakshuka, waterzooi, caponata, clafoutis, panna cotta, preserving …). A technique declares which kinds
  (or exact plants) it suits, its sides and proteins, the pantry items it needs and flags: `raw`,
  `strict` / `no_side` / `must_side`, `side_in_method` (the method cooks the rice or potatoes itself),
  `needs_main` (not herbs alone: no caprese of basil), `herbs_in_pool`, `hearty` (a starter that becomes a main
  with meat), `batch` (preserving amounts are a batch, not a plate), `scale`. Every dish belongs to one
  **course** (`soup`, `starter`, `main`, `dessert`, plus `preserve` for the surplus: quick pickles, chutney,
  passata, pesto cubes, jam, blanching and freezing, sauerkraut), worked out by `course_of` when not fixed.
* **Texts per language.** Titles, names and the method steps are tables per technique in Dutch, English
  and French (`_TITLE`, `_STEPS` in `cooking.py`; `TITLE`, `NAME`, `STEPS`, `PROTEIN_STEP` in
  `cooking_dishes.py`, merged on import), with `{veg}`, `{side}`, `{prep}` placeholders; protein and side
  steps are inserted at the right moment (chicken poached in the waterzooi, ham next to the asparagus).
  Units and labels are localised in `render`.
* **Spec and render.** A recipe is stored as a small **spec** `{technique, produce[], side, protein,
  extras[], servings}`; `render(spec, db, lang, garden_herbs, pantry)` rebuilds the full recipe (title,
  course, ingredients with `source` = `garden` / `pantry` / `shop` / `basic`, steps, shopping rows,
  tags, minutes, `garden_share`, and a `picture` description) in the user's language, or returns `None`
  when the spec no longer makes sense (plant removed, dish not allowed for these plants). The recipe id is
  a hash of the spec, so the same dish twice stays one entry. The panel draws the dish picture (crops on a
  plate or bowl, side underneath, meat in the middle) from `picture` in `dish-picture.ts`.
* **Suggest, menus, courses.** `suggest` loops techniques over the produce at hand
  (`_suggest_all`: variety first – one of each kind – then the same kinds fill the places left; a second
  round varies the main vegetable), picks sides and proteins from the cook's preferences (`Prefs`), and
  interleaves the courses so none is crowded out, plus up to two preserving ideas. `menus` builds a soup or
  starter, a main course and a dessert that belong together: the themed menus of the season first
  (`MENU_THEMES`, 11 – a Provençal dinner, a Flemish spring menu, courgette glut …), then menus around a main course,
  each dish in one menu only and the plants shared between courses kept low (`_overlap`).
* **Fridge ideas** (`cooking_extras`). What the cook ticks to *use up* is worked into dishes by
  per‑item preparations instead of being spooned on top: `USES[technique][item]` lists the preparations
  that suit a dish (as keys of `PREP`), `PREP[key]` = (where the step goes – `early` / `mid` / `during` / `late` –
  and the text in nl, en, fr), and `DEPENDS[key]` the pantry items a preparation also needs (honey, mustard,
  garlic, lemon … they join the ingredients and the shopping list unless the cook has them at home). Which
  preparation a dish gets depends on its produce (a stable seed from the plant ids), so two dishes rarely get
  the same idea; fresh garden herbs (dill, mint, parsley, chives, coriander) go into sauces when the garden
  has them, else `HERB` names what to use. Rules keep dishes sane: at most `MAX_PER_DISH` = 3 things from the
  fridge, one preparation per `GROUP` (one dressing, one pasta sauce, one crunchy topping, one bed), no
  second cheese on top of a cheese (except those that go *inside*, `INSIDE`), pan sauces only with meat or fish
  (`NEEDS_PROTEIN`).
* **The cook's own recipes.** A cookbook entry (`CookbookRecipe`) keeps the spec plus favourite, note, dates
  cooked, `shared` (the website shows shared recipes to whoever may see the garden) and optionally the cook's own
  `ingredients` and `steps`. `apply_custom` layers them on the generated recipe (name, amount, unit, source
  garden / home / shop per ingredient; at most 40 ingredients and 30 steps, refused rather than cut off; a new
  ingredient gets an id from its name so recipes never merge on the shopping list by row position; "back to the
  original" clears them). The shopping list follows the own version.
* **Outputs.** `shopping_list` adds up one list for several recipes (garden produce listed apart),
  `shopping_text` / `recipe_text` are the plain texts for a phone, and `recipes_pdf` writes a recipe, the
  cookbook (a chapter page per course, a long recipe continues on another page, up to 200 recipes) or the shopping
  list with the dish pictures the panel sends as base64 JPEG. The list can also go to a Home Assistant
  to‑do list (`cooking/to_todo`, needs control of that entity) or a `notify.*` service (`cooking/send`).

### 4.16 Seasons, year‑end transition and archive

* **Plan per season** (`seasons.py`): see 3.1. `adopt` runs once after upgrading from schema 1.5: the
  existing garden becomes the plan of the current season and the perennials growing now are carried into it.
  `pending_transition` tells the panel when the calendar moved past `layout_season`.
* **Year‑end transition** (`preview` / `apply`, `year/preview` / `year/apply`). Nothing carries into a new
  year by itself. The preview offers the zones and elements of the plan, the perennials (pre‑selected unless
  finished or failed) and overwintering annuals whose occupancy runs past the season end (garlic, winter
  leeks); `apply` builds next year's plan from this year's (`layout="copy"`, ids kept so rotation and devices
  follow the beds) or keeps the draft already designed (`"keep"`), extends `last_season` of the chosen
  plantings and, with `activate`, makes the new plan the live garden. The planner's *New season* dialog
  offers "keep everything" or a tick per element, zone and perennial.
* **Start over** (`start_new_plan`, `activate_plan`, `delete_plan`): the current plan becomes an
  `ArchivedPlan` (inactive, with its beds and crops), from scratch, with the same zones but empty, or
  zones and beds without crops; it can be activated again (swapping places) or deleted (undoable, and it
  travels with plan export/import).
* **Archive** (`archive.py`, `storage.py`): every planting stays in the document otherwise, and every analysis
  computes a timeline for each, so seasons older than the current one and the two before it
  (`KEEP_SEASONS = 3`) are copied to `garden_manager.garden.archive` (plantings + layout; crops still
  standing, such as carried‑over perennials, stay). The garden document releases a season only when
  `prune_archived` finds the same content (`_fingerprint`) in the archive as *read back from disk* at start‑up
  – a failed write cannot lose a season, and an item edited after it was copied stays until archived
  again. Rotation history gets a `(bed, season, family)` record per removed planting, so crop rotation
  keeps working. `with_season` merges a season back in for one request (season report, season book,
  printouts, compare).
* **System log** (`syslog.py`, 4.3) records every one of these steps; each can be undone.

### 4.17 Plan import and export

`planio.py` defines the `hortulus-plan` format (JSON‑ or YAML‑friendly): `format`, `version`
(`1.<minor>`), `exported_at`, `zones`, `beds`, `features`, `layouts`, `layout_season`,
`archived_plans`, `plantings`, `custom_plants`, `plant_overrides`, `rotation_history` and optionally
`tasks` (only those of the exported plantings plus garden‑wide ones). `import_plan(mode)` first runs
the migration chain for files from older releases, then **validates everything before the first
change** (format marker, every dataclass, each bed inside a zone of its own plan, each planting on a
known bed – plantings of other seasons may refer to that season's plan – archived plans on their own
beds, `plant_overrides` and `archived_plans` of the right type); a refused file changes nothing.
`replace` swaps layout and plantings (tasks of removed plantings drop out on the next generation);
`merge` upserts by id and never deletes (a season in both files keeps its stored items and the file's
win by id; the active season stays). Soil tests are records: a file without them keeps the stored ones; plans
set aside and exported tasks come back. The service `export_plan` returns the document as response data;
the panel's export/import and `plan/export` / `plan/import` use the same functions, and the same file is
the exchange format with the website.

### 4.18 Printing pipeline

```
PrintOptions ──► Renderer / SeasonBook ──► Surface API (mm, origin top‑left) ──► PdfPage  (print, reMarkable)
(document, page,                                                              └► SvgPage  (panel preview)
 colour, season …)
```

* `engine/pdf.py` is a dependency‑free writer with one drawing API (`Surface`) implemented twice:
  `PdfPage` (the 14 standard fonts – Helvetica and Times, Times italic for the book – with WinAnsi, Flate
  streams, clipping for hatch patterns, embedded JPEG photos, justified text, outlines/bookmarks) and `SvgPage`.
* `engine/printout.py` lays out each document once in millimetres: `garden`, `zone`, `beds`, `tasks`,
  `season`, `year` (year plan), `blank` (planning sheet), `plants` (plant cards) and `book`. Papers A4, A3, A5,
  Letter and **reMarkable Paper Pro** (179.6 × 239.5 mm, wider left margin for the toolbar), portrait or landscape;
  colour modes `color`, `eink` (lighter tints + hatch pattern per family) and `grayscale`; legend, scale bar,
  north arrow, dot‑grid notes area. Maps use the plan of the chosen season and subtract overlaps (3.1).
* `engine/seasonbook.py` composes the **season book** from the season's own data: cover, epigraph, title page,
  the season's garden plan, contents with page numbers, an introduction written from the season's figures, one
  chapter per month (sown, planted, done; the journal with the user's photos; harvest, water, weather), the year
  in numbers, glossary, colophon and back cover. A5 by default, chapters open on a right‑hand page, the page
  count is a multiple of four (signatures), Dutch, English and French. Archived seasons are merged back in.
* `printing.py` is the Home Assistant side: `PrintView` (`GET /api/garden_manager/print`, PDF or SVG
  pages, login required), `async_export_pdf` (the `export_pdf` service writes into the private
  `<config>/hortulus/exports/` and returns a **signed link valid for 7 days** to `ExportView`, which only serves
  `[A-Za-z0-9_.-]+.pdf`), and the photo loader (EXIF‑upright, at most 1600 px, grey for e‑ink; Pillow
  optional – without it JPEGs are used as they are).
* Cooking PDFs (`recipes_pdf`) use the same writer and are returned as base64 by `cooking/pdf`.

### 4.19 Security and permissions

* **Websocket**: admin for everything that changes the plan, plants, settings, hardware or the log
  (4.8); task actions and personal records are open to every authenticated user.
* **Services**: `ADMIN_SERVICES` (`import_plan`, `add/update/remove_planting`, `run_irrigation_plan`,
  `stop_irrigation`, `set_shading_mode`, `autofill_plan`, `export_pdf`, `generate_tasks`,
  `recalculate_plan`, `install_voice_sentences`) need an administrator when the call carries a user;
  automations and scripts run without one. The read/record services (`add_task`, `complete_task`,
  `postpone_task`, `delete_task`, `export_plan`, `log_harvest`, `add_journal_entry`, `assign_task`,
  `save_soil_test`) are open.
* **Exports to other entities** (`seeds/to_todo`, `cooking/to_todo`) act with the user's own rights:
  `connection.user.permissions.check_entity(entity_id, POLICY_CONTROL)` must hold for the chosen to‑do
  entity, and the call is made with the user's context. `POLICY_CONTROL` is a local constant
  (`"control"`) because the website's runtime has no `homeassistant.auth`.
* **Files**: PDFs live outside `www` (which is public) and are served only through authenticated views or a
  signed, expiring link; file names are whitelisted.
* **Hardware**: every safety rule is enforced in the controller, not only the UI; a manual run obeys the same
  frost lockout, rain skip and maximum runtime.
* **Input**: finite numbers only, `null` refused for required fields, impossible dates/times refused, imports
  validated before applying, text rendered by the panel through a safe Markdown renderer (no raw HTML).
* **Privacy**: no data leaves the installation unless opted in (Open‑Meteo); the browser's Wikipedia photo
  lookup (scientific name only, licence‑filtered, credited, cached 30 days) is switchable per browser.

### 4.20 Internationalisation (EN / NL / FR)

Three languages everywhere, chosen from Home Assistant's language (`normalize_lang`: `nl`, `fr`, else `en`).

| Layer | Where | Mechanism |
|---|---|---|
| Home Assistant screens, entity names, services | `strings.json`, `translations/{en,nl,fr}.json` | HA's own translation system |
| Backend messages (tasks, alerts, notifications, calendar, voice) | `engine/i18n.py` (+ `texts_garden.py`) | `t(key, lang, **params)` over `MESSAGES[lang]`; fallback English; every task, alert and warning stores a key + parameters so the text is rendered in the reader's language |
| Panel | `frontend/src/i18n/{en,nl,fr}.ts` | `makeTranslator(lang)`; keys shared with the backend; fallback English, then the key |
| Plant data | `plants.json` (`names`, `tips`, companion `reason`s, care notes per language), `FAMILIES` | language dictionaries; user customisations add up per language |
| Handbook, glossary | `data/handbook/{en,nl,fr}/NN-<id>.md`, `glossary.json` | 23 chapters per language |
| Cooking, season book, print labels, Q&A knowledge base, supplies | tables per language inside the modules | e.g. `_TITLE[lang]`, `TEXT[lang]`, `PROBLEMS`, `TOOLS_FR` |
| Assist | `data/sentences/{en,nl,fr}` | one YAML per language |
| Formats | `frontend/src/util/dates.ts`, `util/garden.ts` | dates read day‑month‑year in the panel's language whatever the browser's locale; numbers and times in Belgian formats (nl‑BE, fr‑BE; en‑GB for English) |

Tests keep the layers honest: the frontend catalogs must have identical keys and placeholders
(`i18n.test.ts`, `i18n-fr.test.ts`), the backend French catalogue must cover every English message with the
same placeholders, and so must the tables of the season book, pests, families and tools
(`tests/engine/test_i18n_fr.py`); the plant database test requires EN/NL/FR names.

### 4.21 Records, kitchen, planning, analysis and advice

* **Records** (`records.py`): harvest totals per crop and season, *learned yields* (kg/m² from the user's own
  harvests, used by Autofill and the advice once there is enough data), harvest over the years, seed stock
  with use‑by years per family and the crops that still need seed, garden water (meter and butt readings →
  use per week, rain water available), the year overview and the year matrix (crop × month).
* **Kitchen** (`kitchen.py`): crops ready to pick with how to keep them, a surplus warning when more was
  picked in a week than the household eats, and **cost and harvest** – the harvest at rounded Belgian/Dutch shop
  prices (own prices per crop in settings) against logged expenses and garden water.
* **Planning** (`planning.py`): seeds the plan needs against the stock (and a one‑click export to a to‑do list),
  per‑bed successions (what frees up this season and what can follow without repeating the family), harvest
  forecast per week, and the **season report** (crops, harvest against expectation, failures, journal problems,
  water; Markdown download).
* **Analysis** (`analysis.py`, `diagnose.py`): `analyze` is O(plantings² per bed) and pure; `check_garden`
  explains inconsistencies (a year with crops but no plan, crops whose bed is not on their season's plan, a bed outside
  its zone, overlaps, late crops, a missed year‑end transition) with the ids involved so the panel can link
  to the right place; `explain_plant` answers "why (not) here?" per bed; `fix_issue` applies one‑click, logged,
  undoable repairs; `compare_plans` diffs two plans; `still_possible` lists what can still be sown or planted.
  The summary is part of the snapshot (badge on the Analysis tab); the full diagnosis can be exported as one JSON
  file for a bug report.
* **Advice** (`advisor.py`, `qa.py`, `qa_kb.py`): placement, pollination partners, pollinator flowers, bad
  neighbours, shading, harvest gaps, empty beds, ecology and food‑forest layers, each with an optional
  one‑click action; the Q&A builder ("subject › target › question/problem") combines live status, plant facts
  and the knowledge base (causes, actions, home remedies, prevention, eco control per pest or disease).
* **Pests and ecology** (`pests.py`, `eco.py`): pest windows are growing degree‑days from 1 January (1 July in
  the south) over a pest‑specific base (calendar months while the climate log is short; slugs follow a mild, damp
  spell), only for crops in or about to be in the ground; with *Ecological tips* on, every pest warning and
  disease check gets an organic answer, the calendar gets work for a living garden, and the advice an eco tip of
  the month and food‑forest layers (canopy, sub‑canopy, shrub, herb, ground cover, root, climber – the missing ones are
  suggested).

### 4.22 Climate history (`engine/climate.py`)

The forecast says what is coming; `engine/climate.py` keeps what came, as pure functions that the
coordinator (Home Assistant) and the website feed. Three sources, in order of trust:

| Source | `source` | How it is merged |
|---|---|---|
| own samples | `sensor` | `ClimateRecorder.sample` folds every update into today's `ClimateDay` (min / max on every reading; means, radiation sum and sunshine hours at most every 4 minutes per series, a silence counts as at most half an hour) and into a `SensorDay` per mapped temperature sensor (`temperature_sensors`: outdoor air and soil, zone air, bed soil and air); `hours` records the coverage |
| recorder history | `history` | `merge_sensor_history` and `merge_history(…, "history")` with `outdoor_records` (temperature, humidity, wind, gusts): extremes are combined; a recorded mean replaces its own only when the day has < 20 h of own samples |
| observed weather | `model` | `open_meteo_daily` → `merge_history(…, "model")`: replaces temperature and the station fields only when own samples covered < 12 h, otherwise fills what is missing |

Rain ranks gauge > history > model > forecast; today is always left to the own samples. A new
day triggers `roll_up` (days older than 800 / 400 days fold into `ClimateMonth`: lowest,
highest, mean of the daily means, rain, frost days < 0 °C, hot days ≥ 25 °C, sunshine, strongest
wind) and `update_frost_years` (last spring and first autumn frost per year, per hemisphere; a
half‑year is *complete* once over and ≥ 80 % logged). `local_frost` averages the complete years
against the regional preset; the measured dates are shown, the calendar keeps the configured ones.

```python
def merge_history(data: GardenData, records: Iterable[Mapping[str, Any]], source: str, today: date) -> bool:
    """Fill outdoor days from recorded or observed daily weather.

    ``source``: "history" (the same sensors, from the recorder: extremes are combined)
    or "model" (Open-Meteo: only fills what own samples did not measure well).
    Today is left to the own samples.
    """
    changed = False
    for rec in records:
        try:
            day = rec["day"] if isinstance(rec["day"], date) else date.fromisoformat(str(rec["day"])[:10])
        except (KeyError, TypeError, ValueError):
            continue
        if day >= today or day < today - timedelta(days=KEEP_DAYS):
            continue
        tmin, tmax, tmean = _f(rec.get("tmin")), _f(rec.get("tmax")), _f(rec.get("tmean"))
        if tmin is not None and tmax is not None and tmin > tmax:
            tmin, tmax = tmax, tmin
        entry, new = _day(data.climate_log, day)
        before = (entry.tmin, entry.tmax, entry.tmean, entry.rain_mm, *(getattr(entry, k) for k in _FIELDS))
        complete = entry.hours >= FULL_DAY_H
        # measured days (own samples or recorder history) keep their values: the model only fills gaps
        # (a day from before 1.8 was measured by the garden's own sensors, without hours of coverage)
        measured = (
            entry.hours >= MODEL_BEATS_H
            or "history" in entry.source
            or (
                (entry.source == "" or "sensor" in entry.source)
                and entry.hours == 0
                and not new
                and entry.tmin is not None
            )
        )
        # values that came from the model only: a measurement replaces them instead of mixing in
        modelled = "model" in entry.source and not measured
        if source == "history" and modelled:
            entry.tmin = tmin if tmin is not None else entry.tmin
            entry.tmax = tmax if tmax is not None else entry.tmax
            entry.tmean = tmean if tmean is not None else entry.tmean
        elif source == "history":
            if tmin is not None:
                entry.tmin = tmin if entry.tmin is None else min(entry.tmin, tmin)
            if tmax is not None:
                entry.tmax = tmax if entry.tmax is None else max(entry.tmax, tmax)
            if tmean is not None and not complete:
                entry.tmean = tmean
        elif not measured:
            entry.tmin = tmin if tmin is not None else entry.tmin
            entry.tmax = tmax if tmax is not None else entry.tmax
            entry.tmean = tmean if tmean is not None else entry.tmean
        else:
            entry.tmin = entry.tmin if entry.tmin is not None else tmin
            entry.tmax = entry.tmax if entry.tmax is not None else tmax
            entry.tmean = entry.tmean if entry.tmean is not None else tmean
        rain = _f(rec.get("rain_mm"))
        rank = {"": 0, "forecast": 1, "model": 2, "history": 3, "gauge": 4}
        if rain is not None and rank.get(source, 0) >= rank.get(entry.rain_src, 0):
            entry.rain_mm, entry.rain_src = round(rain, 1), source
        for key in _FIELDS:
            value = _f(rec.get(key))
            if value is not None and (
                getattr(entry, key) is None
                or (source == "model" and not measured)
                or (source == "history" and modelled)
            ):
                setattr(entry, key, round(value, 2))
        after = (entry.tmin, entry.tmax, entry.tmean, entry.rain_mm, *(getattr(entry, k) for k in _FIELDS))
        if new or after != before:
            entry.source = _src(entry.source, source)
            changed = True
    return changed
```

What the rest of the engine reads from it:

| Function | Used by | Purpose |
|---|---|---|
| `daily_et0` | `waterbalance`, statistics | ET₀ of a past day: Penman‑Monteith from the logged humidity, wind (mean, or 0.6 × max) and radiation or sunshine fraction; Open‑Meteo's ET₀ for a day it filled; Hargreaves with only min / max |
| `zone_log` | `analysis` → `phenology`, zone GDD | the temperature series a zone's crops grow in (`zone_sensor` / `outdoor_buffered` / `outdoor`) |
| `stress_days`, `dull_days` | `phenology` | hot days above `max_temp_c`, cold days below `min_temp_c`; days below 40 % of clear‑sky radiation (or with sun < 15 % of the day length) |
| `recent_wetness` | `analysis` → `weather.assess_disease(recent=…)` | the last three days: rain, wet days (≥ 5 mm or mean RH ≥ 90 %), the Hutton criteria from daily data (two days in a row with min ≥ 10 °C and mean RH ≥ 90 %) → `hutton_logged` (high), `wet_days_logged` (one step up); outdoor zones only |
| `recent_mean` | `analysis` | soil temperature for sowing: the lower of now and the 3‑day mean |
| `last_night` | `analysis` | `alert.frost_logged` (kind `frost`) when the last logged minimum went below 0 °C and active outdoor crops cannot take it |
| `stormy` | `weather_tasks.logged_weather_specs` | `w:after_storm` (gusts ≥ 60 km/h or wind ≥ 45 km/h yesterday); the same function adds `w:rain` for ≥ 15 mm logged yesterday (same key as the forecast task) and `w:dry_logged` after a dry week (≥ 6 days known, < 3 mm, ≥ 4 days ≥ 20 °C; not next to a forecast `w:dry`) |
| `summarize`, `period`, `season_so_far` | `sensor.py` (`ClimateSensor`) | the four climate sensors and their last‑year attribute |
| `climate_stats`, `sensor_stats` | `climate/stats` | periods (7 / 30 days, season, 365 days and last year's), records, the daily series, months, frost dates, per‑sensor statistics, coverage |
| `summary_lines`, `local_frost_suggestion` | `climate/stats` (`summary`, `local_frost_suggestion`, `station_import`), season report and book, monthly notification | extras `season_summary` and `local_frost_suggest`: sentences against the same dates last year; measured frost dates ≥ 7 days off the preset after ≥ 2 complete years |
| `estimate_soil_temp` | `analysis` | extra `soil_estimate`: soil temperature from the logged daily mean air (smoothed over 10 days, ≥ 3 days) for beds without a soil sensor |
| `parse_station_csv` | `climate/import_csv` | extra `station_import`: Netatmo / Ecowitt / Davis / spreadsheet CSV → days (EN/NL/FR headers, unit conversion); measured days are kept |

The panel shows it in **Weather → Climate history** (`components/climate-history.ts`). The website
fills the same log from Open‑Meteo for every garden and from a linked Home Assistant's recorder
through the garden's token, through the same `merge_*` functions.

---

---

[← 3. Data Model](03-data-model.md) · [↑ Blueprint contents](../BLUEPRINT.md) · [5. Frontend (TypeScript) →](05-frontend-typescript.md)
