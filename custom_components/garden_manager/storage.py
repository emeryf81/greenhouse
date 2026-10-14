"""Persistence: a versioned ``Store`` wrapped in a small repository."""

from __future__ import annotations

from collections.abc import Callable
from contextvars import ContextVar
from datetime import timedelta
import logging
from typing import Any
import uuid

from homeassistant.core import CALLBACK_TYPE, HomeAssistant, callback
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import SAVE_DELAY_SECONDS, STORAGE_KEY
from .engine import archive, seasons, syslog
from .engine.migrations import STORAGE_MINOR_VERSION, STORAGE_VERSION, migrate
from .engine.models import GardenData
from .engine.plantdb import PlantDatabase
from .engine.serde import from_dict, to_dict

_LOGGER = logging.getLogger(__name__)

DONE_TASK_RETENTION = timedelta(days=400)
PLAN_REASONS = frozenset({"plan", "import"})
SYSLOG_SAVE_DELAY_SECONDS = 10

# Who triggers the change being made right now (set by the websocket API for
# panel actions); read when the change is written to the system log.
current_user: ContextVar[str | None] = ContextVar("hortulus_user", default=None)

PLAN_COLLECTIONS = frozenset(
    {"zones", "beds", "plantings", "features", "rotation_history", "layouts", "meta", "archived_plans"}
)
RECORD_COLLECTIONS = frozenset({"harvest_log", "journal", "seed_stock", "irrigation_log", "expenses", "cookbook"})


def undo_reasons(collections: set[str]) -> list[str]:
    """Change reasons (as used by the operations) that cover these collections."""
    reasons = []
    if collections & PLAN_COLLECTIONS:
        reasons.append("plan")
    if collections & {"custom_plants", "plant_overrides"}:
        reasons.append("plants")
    if "settings" in collections:
        reasons.append("settings")
    if collections & RECORD_COLLECTIONS:
        reasons.append("records")
    if "tasks" in collections or not reasons:
        reasons.append("tasks")
    return reasons


class GardenStore(Store[dict[str, Any]]):
    """Store with Hortulus migrations."""

    async def _async_migrate_func(
        self, old_major_version: int, old_minor_version: int, old_data: dict[str, Any]
    ) -> dict[str, Any]:
        _LOGGER.info(
            "Migrating Hortulus data from %s.%s to %s.%s",
            old_major_version,
            old_minor_version,
            STORAGE_VERSION,
            STORAGE_MINOR_VERSION,
        )
        return migrate(old_data, old_major_version, old_minor_version)


class GardenRepository:
    """Owns the in-memory :class:`GardenData` and persists it lazily.

    All mutations happen on the event loop; ``async_changed`` bumps the
    revision (used for optimistic concurrency by the planner UI), schedules a
    debounced save and notifies listeners (the coordinator).
    """

    def __init__(self, hass: HomeAssistant, builtin_plants: list[dict[str, Any]], key: str = STORAGE_KEY) -> None:
        self.hass = hass
        self.key = key
        self.store = GardenStore(hass, STORAGE_VERSION, key, minor_version=STORAGE_MINOR_VERSION)
        self.data = GardenData()
        self._builtin = builtin_plants
        self._db: PlantDatabase | None = None
        self._listeners: list[Callable[[str], None]] = []
        # System log: every change, reversible.  Kept in its own store so the
        # garden document stays small and needs no migration for it.
        self.syslog_store = Store[dict[str, Any]](hass, 1, f"{key}.syslog")
        # Seasons older than the last three (plantings and plan), see engine/archive.py.
        self.archive_store = Store[dict[str, Any]](hass, 1, f"{key}.archive")
        self.archive: dict[str, dict[str, Any]] = {}
        # What the archive held when it was read from disk: only that is safe to drop from the garden.
        self._archive_stored: archive.ArchiveIndex = {}
        self.syslog: list[dict[str, Any]] = []
        self._baseline: dict[str, dict[str, Any]] = syslog.snapshot(to_dict(self.data))
        self._pending_undo_of: str | None = None

    async def async_load(self) -> bool:
        """Load from disk.  Returns ``True`` when no data existed yet."""
        raw_log = await self.syslog_store.async_load()
        self.syslog = list((raw_log or {}).get("entries") or [])
        await self._async_load_archive()
        loaded = await self._async_load_data()
        self.rebase()
        return loaded

    async def _async_load_archive(self) -> None:
        raw_archive = await self.archive_store.async_load()
        self.archive = dict((raw_archive or {}).get("seasons") or {})
        self._archive_stored = archive.archive_index(self.archive)

    async def _async_load_data(self) -> bool:
        raw = await self.store.async_load()
        if raw is None:
            self.data = GardenData()
            return True
        try:
            self.data = from_dict(GardenData, raw)
        except (TypeError, ValueError, KeyError):
            _LOGGER.exception("Stored Hortulus data is corrupt; keeping a backup and starting fresh")
            backup = Store[dict[str, Any]](self.hass, 1, f"{self.key}.corrupt")
            await backup.async_save(raw)
            self.data = GardenData()
            return True
        return False

    # ------------------------------------------------------------------ #
    @property
    def db(self) -> PlantDatabase:
        if self._db is None:
            self._db = PlantDatabase(self._builtin, self.data.custom_plants, self.data.plant_overrides)
        return self._db

    def invalidate_db(self) -> None:
        self._db = None

    @callback
    def async_add_listener(self, listener: Callable[[str], None]) -> CALLBACK_TYPE:
        self._listeners.append(listener)

        @callback
        def remove() -> None:
            self._listeners.remove(listener)

        return remove

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

    @callback
    def async_schedule_save(self) -> None:
        # Background writers (task generation, notifications ...) only call
        # this; whatever they changed is logged as a system action.
        self.record("auto", source="system")
        self.store.async_delay_save(self._serialize, SAVE_DELAY_SECONDS)

    # ------------------------------------------------------------------ #
    # System log
    # ------------------------------------------------------------------ #
    def rebase(self) -> None:
        """Accept the current document as the logged state without an entry."""
        self._baseline = syslog.snapshot(to_dict(self.data))

    @callback
    def record(self, reason: str, *, source: str = "user") -> dict[str, Any] | None:
        """Log what changed since the last call; ``None`` when nothing did."""
        current = syslog.snapshot(to_dict(self.data))
        changes = syslog.diff(self._baseline, current)
        if not changes:
            return None
        before_beds = self._baseline.get("beds", {})
        bed_names = {k: v.get("name", k) for k, v in before_beds.items()}
        bed_names.update({k: v.get("name", k) for k, v in current.get("beds", {}).items()})
        undo_of, self._pending_undo_of = self._pending_undo_of, None
        entry = syslog.make_entry(
            f"log_{uuid.uuid4().hex[:12]}",
            dt_util.now().isoformat(timespec="seconds"),
            reason,
            source,
            changes,
            lambda col, key, item: syslog.reference(col, key, item, bed_names=bed_names),
            user=current_user.get() if source == "user" else None,
            undo_of=undo_of,
        )
        self.syslog = syslog.append(self.syslog, entry)
        self._baseline = current
        self.syslog_store.async_delay_save(lambda: {"entries": self.syslog}, SYSLOG_SAVE_DELAY_SECONDS)
        return entry

    @callback
    def adopt_seasons(self) -> None:
        """First run on the per-season model: the garden becomes this season's plan."""
        from .engine.region import season_for_date

        if seasons.adopt(self.data, season_for_date(self.data.settings.region, dt_util.now().date()), self.db):
            self.async_schedule_save()

    async def async_archive_old(self, current_season: int) -> bool:
        """Archive seasons older than the last three.  True if the garden document changed.

        Two steps, so a failed write can never lose a season: old seasons are
        copied to the archive document, and they leave the garden document only
        once a later start-up has read them back from that archive.
        """
        removed = archive.prune_archived(self.data, self._archive_stored, current_season, self.db)
        pending = archive.archive_candidates(self.data, current_season)
        if pending:
            archive.merge_archive(self.archive, pending)
            await self.archive_store.async_save({"seasons": self.archive})
            _LOGGER.info("Hortulus: copied seasons %s to the archive", ", ".join(sorted(pending)))
        if not removed:
            return False
        self.rebase()  # housekeeping, not an action for the system log or undo
        self.async_changed("plan", bump_revision=False, source="system")
        _LOGGER.info("Hortulus: %d archived plantings and plans left the garden document", removed)
        return True

    def data_for_season(self, season: int) -> GardenData:
        """The garden with ``season`` merged back in from the archive (for reports and the season book)."""
        return archive.with_season(self.data, self.archive, season)

    @callback
    def record_error(self, action: str, code: str, message: str, context: dict[str, Any] | None = None) -> None:
        """Log a failed action (refused plan, conflict, crash) so it can be analysed later."""
        entry = {
            "id": f"err_{uuid.uuid4().hex[:12]}",
            "at": dt_util.now().isoformat(timespec="seconds"),
            "reason": action,
            "source": "error",
            "user": current_user.get(),
            "undo_of": None,
            "undone_by": None,
            "summary": [{"col": "error", "op": "error", "key": code, "name": message[:500]}],
            "changes": [],
            "size": len(message) + len(str(context or {})),
            "context": context or {},
        }
        self.syslog = syslog.append(self.syslog, entry)
        self.syslog_store.async_delay_save(lambda: {"entries": self.syslog}, SYSLOG_SAVE_DELAY_SECONDS)

    def syslog_entry(self, entry_id: str) -> dict[str, Any] | None:
        return next((e for e in self.syslog if e["id"] == entry_id), None)

    @callback
    def async_undo(self, entry_id: str, *, force: bool = False) -> syslog.UndoResult:
        """Revert one logged entry.  The undo is logged too (and can be undone)."""
        entry = self.syslog_entry(entry_id)
        if entry is None:
            raise KeyError(entry_id)
        self.record("auto", source="system")  # never mix unlogged changes into the undo
        doc = to_dict(self.data)
        result = syslog.undo(
            doc, entry["changes"], force=force, known_plants=[p["id"] for p in self._builtin if "id" in p]
        )
        if not result.ok and not (force and not result.problems):
            return result
        revision = self.data.revision
        self.data = from_dict(GardenData, result.doc)
        self.data.revision = revision
        self._pending_undo_of = entry_id
        # Notify with the reasons the original change would have used, so
        # devices, schedules and the planner follow along.
        reasons = undo_reasons({c["col"] for c in entry["changes"]})
        for reason in reasons:
            self.async_changed(reason)
        return result

    async def async_flush(self) -> None:
        await self.store.async_save(self._serialize())
        await self.syslog_store.async_save({"entries": self.syslog})

    def _serialize(self) -> dict[str, Any]:
        self.record("auto", source="system")
        self._prune()
        # Housekeeping (old finished tasks) is not an action worth logging.
        self.rebase()
        return to_dict(self.data)

    def _prune(self) -> None:
        """Drop old finished tasks so the store stays small."""
        cutoff = dt_util.now() - DONE_TASK_RETENTION
        self.data.tasks = [
            t for t in self.data.tasks if t.is_open or t.completed_at is None or t.completed_at >= cutoff
        ]
        keep_from = (dt_util.now() - timedelta(days=14)).date().isoformat()
        self.data.notified = {k: v for k, v in self.data.notified.items() if v >= keep_from}
