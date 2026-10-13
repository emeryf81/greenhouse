"""The season book: a whole garden year as a printable book."""

from __future__ import annotations

from datetime import UTC, date, datetime
from io import BytesIO
import re

from PIL import Image as PILImage
import pytest

from custom_components.garden_manager.engine.models import (
    ClimateDay,
    HarvestEntry,
    Hemisphere,
    IrrigationEvent,
    JournalEntry,
    PlantingStatus,
    SowMethod,
    Task,
    TaskStatus,
    TaskType,
)
from custom_components.garden_manager.engine.pdf import Image, jpeg_info
from custom_components.garden_manager.engine.printout import PrintContext, PrintOptions, render_pdf, render_svg
from custom_components.garden_manager.engine.seasonbook import collect_months, fmt_num, join_names, safe

TODAY = date(2026, 10, 12)


def _jpeg(w: int = 64, h: int = 48, mode: str = "RGB") -> bytes:
    out = BytesIO()
    PILImage.new(mode, (w, h), "green" if mode == "RGB" else 128).save(out, "JPEG")
    return out.getvalue()


def _year(garden, make_planting):
    garden.layout_season = 2026
    tomato = make_planting("tomato", "gh_bed", 2026, id="t", method=SowMethod.INDOOR_SOW)
    tomato.sown_on, tomato.transplanted_on, tomato.harvest_started_on = (
        date(2026, 3, 2),
        date(2026, 5, 12),
        date(2026, 7, 20),
    )
    carrot = make_planting("carrot", "bed_1", 2026, id="c", method=SowMethod.DIRECT_SOW)
    carrot.sown_on = date(2026, 4, 10)
    lost = make_planting("lettuce", "bed_1", 2026, id="l", status=PlantingStatus.FAILED)
    lost.sown_on, lost.finished_on = date(2026, 4, 1), date(2026, 5, 3)
    garden.plantings = [tomato, carrot, lost]
    garden.journal = [
        JournalEntry("j1", datetime(2026, 3, 2, 9, tzinfo=UTC), "Tomaten gezaaid 🌱", ["p1"], "milestone", plant_id="tomato",
                     author="Sam"),
        JournalEntry("j2", datetime(2026, 7, 20, 18, tzinfo=UTC), "Eerste tomaat!", ["p2", "p3", "missing"], "observation",
                     planting_id="t"),
        JournalEntry("j3", datetime(2026, 5, 3, 8, tzinfo=UTC), "Slakken in de sla.", [], "problem", bed_id="bed_1"),
    ]  # fmt: skip
    garden.harvest_log = [
        HarvestEntry("h1", date(2026, 7, 20), "tomato", kg=1.2, planting_id="t", quality=4, note="Zoet"),
        HarvestEntry("h2", date(2026, 8, 2), "tomato", kg=2.5, planting_id="t"),
        HarvestEntry("h3", date(2026, 8, 9), "carrot", kg=0.8, count=30, planting_id="c"),
    ]
    garden.irrigation_log = [
        IrrigationEvent("bed_1", datetime(2026, 7, d, 6, tzinfo=UTC), 4, liters=20) for d in (1, 5)
    ]
    garden.climate_log = [ClimateDay(date(2026, 1, d), tmin=-2.0 + d % 3, tmax=6.0, rain_mm=1.0) for d in range(1, 11)]
    garden.tasks = [
        Task("k1", TaskType.MULCH, "Mulch the beds", date(2026, 6, 1), status=TaskStatus.DONE,
             completed_at=datetime(2026, 6, 2, 10, tzinfo=UTC)),
        Task("k2", TaskType.SOW_INDOOR, "Sow tomato", date(2026, 3, 1), status=TaskStatus.DONE,
             completed_at=datetime(2026, 3, 2, 10, tzinfo=UTC), planting_id="t"),
        Task("k3", TaskType.WEED, "Weed", date(2026, 6, 1)),  # still open: not in the book
    ]  # fmt: skip
    return garden


def _ctx(garden, db, photos=None):
    return PrintContext(data=garden, db=db, timelines={}, today=TODAY, garden_name="Testtuin", photos=photos)


def _pages(pdf: bytes) -> int:
    return len(re.findall(rb"/Type /Page\b", pdf))


def test_months_collect_what_happened(garden, db, make_planting):
    months = collect_months(_year(garden, make_planting), 2026)
    assert [(m.year, m.month) for m in months][:2] == [(2026, 1), (2026, 2)] and len(months) == 12
    march, april, may, june, july = months[2], months[3], months[4], months[5], months[6]
    assert [how for _, _, how in march.sown] == ["sown_in"]
    assert not march.tasks  # the sowing task is already told by the planting's own date
    assert {how for _, _, how in april.sown} == {"sown_out"} and len(april.sown) == 2
    assert [kind for _, _, kind in may.events] == ["failed"] and may.journal[0].kind == "problem"
    assert [t.id for t in june.tasks] == ["k1"]
    assert july.kg == pytest.approx(1.2) and july.runs == 2 and july.liters == 40
    assert months[0].frost_nights and months[0].tmax == 6.0
    assert months[1].empty and not july.empty


def test_book_is_a_complete_pdf_with_photos_and_bookmarks(garden, db, make_planting):
    loaded = []

    def photos(photo_id: str, gray: bool) -> Image | None:
        loaded.append((photo_id, gray))
        return None if photo_id == "missing" else Image.from_jpeg(_jpeg())

    opts = PrintOptions.from_dict({"document": "book", "page": "a5", "season": 2026, "lang": "nl"})
    pdf = render_pdf(_ctx(_year(garden, make_planting), db, photos), opts)
    assert pdf.startswith(b"%PDF") and pdf.rstrip().endswith(b"%%EOF")
    pages = _pages(pdf)
    assert pages >= 30 and pages % 4 == 0  # folds into signatures
    assert b"/Outlines" in pdf and b"/DCTDecode" in pdf and b"/Times-Roman" in pdf
    assert ("missing", False) in loaded  # a missing photo is skipped, not fatal
    assert b"/MediaBox [0 0 419.53 595.28]" in pdf  # A5


def test_book_in_english_greyscale_and_without_photos(garden, db, make_planting):
    opts = PrintOptions.from_dict(
        {"document": "book", "page": "a4", "season": 2026, "lang": "en", "color_mode": "grayscale"}
    )
    pdf = render_pdf(_ctx(_year(garden, make_planting), db), opts)
    assert _pages(pdf) % 4 == 0 and b"/DCTDecode" not in pdf


def test_an_empty_season_still_makes_a_book(garden, db):
    garden.plantings = []
    pdf = render_pdf(_ctx(garden, db), PrintOptions.from_dict({"document": "book", "season": 2030, "lang": "nl"}))
    assert _pages(pdf) % 4 == 0


def test_southern_seasons_run_from_july(garden, db, make_planting):
    _year(garden, make_planting)
    garden.settings.region.hemisphere = Hemisphere.SOUTH
    months = collect_months(garden, 2026)
    assert (months[0].year, months[0].month) == (2026, 7) and (months[-1].year, months[-1].month) == (2027, 6)
    assert render_pdf(_ctx(garden, db), PrintOptions.from_dict({"document": "book", "season": 2026})).startswith(
        b"%PDF"
    )


def test_preview_shows_the_first_pages_as_svg(garden, db, make_planting):
    photos = lambda _id, _gray: Image.from_jpeg(_jpeg())  # noqa: E731
    pages = render_svg(
        _ctx(_year(garden, make_planting), db, photos), PrintOptions.from_dict({"document": "book", "lang": "nl"})
    )
    assert 0 < len(pages) <= 16 and pages[0].startswith("<svg")
    assert any("data:image/jpeg;base64," in p for p in pages)


def test_helpers():
    assert safe("Tomaten 🌱 gezaaid → binnen") == "Tomaten  gezaaid -> binnen"
    assert fmt_num(2400.0, "nl", 0) == "2.400" and fmt_num(1.25, "nl", 2) == "1,25" and fmt_num(3.0, "en") == "3"
    assert join_names(["a", "b", "c"], "nl") == "a, b en c"
    assert join_names(["a", "b", "c", "d", "e", "f", "g"], "en", limit=3) == "a, b and 5 more"
    assert jpeg_info(_jpeg(40, 30)) == (40, 30, 3) and jpeg_info(_jpeg(8, 8, "L")) == (8, 8, 1)
    assert jpeg_info(b"not a jpeg") is None
