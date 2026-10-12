"""Printouts from Home Assistant: authenticated PDF download and file export."""

from __future__ import annotations

from http import HTTPStatus
from pathlib import Path
from typing import TYPE_CHECKING, Any

from aiohttp import web
from homeassistant.components.http import KEY_HASS, HomeAssistantView
from homeassistant.core import HomeAssistant, callback
from homeassistant.util import dt as dt_util

from .const import DOMAIN, PRINT_DIR, PRINT_URL
from .engine.printout import PrintContext, PrintOptions, filename, render_pdf, render_svg

if TYPE_CHECKING:
    from . import GardenRuntime

_VIEW_KEY = f"{DOMAIN}_print_view"
BOOL_KEYS = ("landscape", "notes", "grid", "labels")
INT_KEYS = ("season", "days")


def print_context(runtime: GardenRuntime) -> PrintContext:
    analysis = runtime.coordinator.data
    title = runtime.coordinator.config_entry.title or "Hortulus"
    return PrintContext(
        data=runtime.repo.data,
        db=runtime.repo.db,
        timelines=dict(analysis.timelines) if analysis else {},
        today=analysis.today if analysis else dt_util.now().date(),
        garden_name=title,
    )


def options_from_query(query: dict[str, str], lang: str) -> PrintOptions:
    raw: dict[str, Any] = {"lang": lang}
    for key, value in query.items():
        if key in BOOL_KEYS:
            raw[key] = value.lower() in ("1", "true", "yes", "on")
        elif key in INT_KEYS:
            raw[key] = int(value)
        elif key in ("bed_ids", "plant_ids"):
            raw[key] = [v for v in value.split(",") if v]
        else:
            raw[key] = value
    return PrintOptions.from_dict(raw)


async def async_render_pdf(hass: HomeAssistant, runtime: GardenRuntime, opts: PrintOptions) -> bytes:
    ctx = print_context(runtime)
    return await hass.async_add_executor_job(render_pdf, ctx, opts)


async def async_render_svg(hass: HomeAssistant, runtime: GardenRuntime, opts: PrintOptions) -> list[str]:
    ctx = print_context(runtime)
    return await hass.async_add_executor_job(render_svg, ctx, opts)


async def async_export_pdf(hass: HomeAssistant, runtime: GardenRuntime, opts: PrintOptions) -> dict[str, Any]:
    """Write the PDF to ``<config>/www/hortulus`` (served as ``/local/hortulus``)."""
    pdf = await async_render_pdf(hass, runtime, opts)
    season = opts.season or (runtime.coordinator.data.season if runtime.coordinator.data else None)
    name = filename(opts, season)
    folder = Path(hass.config.path(PRINT_DIR))

    def _write() -> None:
        folder.mkdir(parents=True, exist_ok=True)
        (folder / name).write_bytes(pdf)

    await hass.async_add_executor_job(_write)
    return {"path": str(folder / name), "url": f"/local/hortulus/{name}", "bytes": len(pdf), "filename": name}


class PrintView(HomeAssistantView):
    """``GET /api/garden_manager/print?document=garden&page=remarkable`` -> PDF."""

    url = PRINT_URL
    name = f"api:{DOMAIN}:print"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        hass = request.app[KEY_HASS]
        entries = hass.config_entries.async_loaded_entries(DOMAIN)
        if not entries:
            return web.Response(status=HTTPStatus.NOT_FOUND, text="Hortulus is not loaded")
        runtime: GardenRuntime = entries[0].runtime_data
        query = dict(request.query)
        fmt = query.pop("format", "pdf")
        try:
            opts = options_from_query(query, runtime.coordinator.lang)
        except (ValueError, TypeError) as err:
            return web.Response(status=HTTPStatus.BAD_REQUEST, text=str(err))
        if fmt == "svg":
            pages = await async_render_svg(hass, runtime, opts)
            return web.json_response({"pages": pages})
        pdf = await async_render_pdf(hass, runtime, opts)
        season = opts.season or (runtime.coordinator.data.season if runtime.coordinator.data else None)
        return web.Response(
            body=pdf,
            content_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{filename(opts, season)}"'},
        )


@callback
def async_register_print_view(hass: HomeAssistant) -> None:
    if hass.data.get(_VIEW_KEY):
        return
    hass.http.register_view(PrintView())
    hass.data[_VIEW_KEY] = True
