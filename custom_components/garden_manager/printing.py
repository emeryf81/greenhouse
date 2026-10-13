"""Printouts from Home Assistant: authenticated PDF download and file export."""

from __future__ import annotations

from collections.abc import Callable
from datetime import timedelta
from http import HTTPStatus
from io import BytesIO
from pathlib import Path
import re
from typing import TYPE_CHECKING, Any

from aiohttp import web
from homeassistant.components.http import KEY_HASS, HomeAssistantView
from homeassistant.components.http.auth import async_sign_path
from homeassistant.core import HomeAssistant, callback
from homeassistant.util import dt as dt_util

from .const import DOMAIN, EXPORT_URL, PRINT_DIR, PRINT_URL
from .engine.pdf import Image
from .engine.printout import PrintContext, PrintOptions, filename, render_pdf, render_svg

if TYPE_CHECKING:
    from . import GardenRuntime

_VIEW_KEY = f"{DOMAIN}_print_view"
BOOL_KEYS = ("landscape", "notes", "grid", "labels")
_SAFE_NAME = re.compile(r"^[A-Za-z0-9_.-]+\.pdf$")
LINK_VALID = timedelta(days=7)
INT_KEYS = ("season", "days")
# Photos in the season book: long side in pixels (sharp at A5 / 300 dpi for a full-width picture).
PHOTO_MAX_PX = 1600
_IMAGE_ID = re.compile(r"(?:/api/image/serve/)?([0-9A-Za-z_-]{6,64})(?:/[0-9x]+)?")


def jpeg_for_print(raw: bytes, gray: bool) -> Image | None:
    """Any photo -> a JPEG for the PDF: upright (EXIF), at most ``PHOTO_MAX_PX``, grey when asked."""
    try:
        from PIL import Image as PILImage, ImageOps
    except ImportError:  # no Pillow: use JPEGs as they are
        return Image.from_jpeg(raw)
    try:
        with PILImage.open(BytesIO(raw)) as img:
            img = ImageOps.exif_transpose(img)
            img = img.convert("L" if gray else "RGB")
            img.thumbnail((PHOTO_MAX_PX, PHOTO_MAX_PX))
            out = BytesIO()
            img.save(out, "JPEG", quality=82, optimize=True)
    except (OSError, ValueError):
        return None
    return Image.from_jpeg(out.getvalue())


def photo_loader(config_dir: Path) -> Callable[[str, bool], Image | None]:
    """Read journal photos: Home Assistant image uploads (``image/<id>/original``) and ``/local/`` files."""
    images = config_dir / "image"
    www = config_dir / "www"

    def load(photo_id: str, gray: bool) -> Image | None:
        if photo_id.startswith("/local/"):
            base, path = www, www / photo_id.removeprefix("/local/")
        elif match := _IMAGE_ID.fullmatch(photo_id):
            base, path = images, images / match.group(1) / "original"
        else:
            return None  # remote URLs are not fetched
        try:
            path = path.resolve()
            if not path.is_relative_to(base.resolve()) or not path.is_file():
                return None
            return jpeg_for_print(path.read_bytes(), gray)
        except OSError:
            return None

    return load


def print_context(runtime: GardenRuntime) -> PrintContext:
    analysis = runtime.coordinator.data
    title = runtime.coordinator.config_entry.title or "Hortulus"
    return PrintContext(
        data=runtime.repo.data,
        db=runtime.repo.db,
        timelines=dict(analysis.timelines) if analysis else {},
        today=analysis.today if analysis else dt_util.now().date(),
        garden_name=title,
        photos=photo_loader(Path(runtime.coordinator.hass.config.config_dir)),
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
    """Write the PDF to ``<config>/hortulus/exports``.

    The folder is private; ``url`` is a signed link (valid 7 days) to the
    authenticated export view, so a notification can carry it safely.
    """
    pdf = await async_render_pdf(hass, runtime, opts)
    season = opts.season or (runtime.coordinator.data.season if runtime.coordinator.data else None)
    name = filename(opts, season)
    folder = Path(hass.config.path(PRINT_DIR))

    def _write() -> None:
        folder.mkdir(parents=True, exist_ok=True)
        (folder / name).write_bytes(pdf)

    await hass.async_add_executor_job(_write)
    path = f"{EXPORT_URL}/{name}"
    try:
        url = async_sign_path(hass, path, LINK_VALID)
    except (KeyError, RuntimeError):  # auth not set up (tests) - plain authenticated path
        url = path
    return {"path": str(folder / name), "url": url, "bytes": len(pdf), "filename": name}


class ExportView(HomeAssistantView):
    """``GET /api/garden_manager/exports/<file>.pdf`` - previously exported PDFs (login or signed link)."""

    url = EXPORT_URL + "/{name}"
    name = f"api:{DOMAIN}:exports"
    requires_auth = True

    async def get(self, request: web.Request, name: str) -> web.StreamResponse:
        hass = request.app[KEY_HASS]
        if not _SAFE_NAME.match(name):
            return web.Response(status=HTTPStatus.BAD_REQUEST, text="Invalid file name")
        path = Path(hass.config.path(PRINT_DIR)) / name
        if not await hass.async_add_executor_job(path.is_file):
            return web.Response(status=HTTPStatus.NOT_FOUND, text="Not found")
        return web.FileResponse(path, headers={"Content-Disposition": f'attachment; filename="{name}"'})


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
    hass.http.register_view(ExportView())
    hass.data[_VIEW_KEY] = True
