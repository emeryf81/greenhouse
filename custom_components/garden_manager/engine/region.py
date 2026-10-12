"""Region profiles, frost dates and season arithmetic.

Edge cases handled here (and unit tested):

* **Hemispheres** - a season is named after the year its spring falls in.  On
  the southern hemisphere the first autumn frost of season 2026 is in 2027.
* **Leap years** - a custom frost date of ``02-29`` resolves to Feb 28 in
  common years instead of raising.
* **Frost-free climates** - synthetic anchors are used so relative sowing
  windows still produce sensible dates, and frost tasks are suppressed.
"""

from __future__ import annotations

import calendar
from dataclasses import dataclass
from datetime import date, timedelta

from .models import Hemisphere, RegionProfile, Window

# Typical average frost dates per USDA hardiness zone (northern hemisphere).
# Values are deliberately conservative mid-points of the published ranges.
USDA_FROST_DATES: dict[str, tuple[str, str] | None] = {
    "1": ("06-15", "08-15"),
    "2": ("05-31", "09-01"),
    "3": ("05-20", "09-15"),
    "4": ("05-12", "09-25"),
    "5": ("05-01", "10-07"),
    "6": ("04-21", "10-21"),
    "7": ("04-08", "11-01"),
    "8": ("03-25", "11-15"),
    "9": ("03-01", "12-01"),
    "10": ("01-31", "12-15"),
    "11": None,  # frost free
    "12": None,
    "13": None,
}

# Regional presets with climatological frost dates and hemisphere.
PRESETS: dict[str, tuple[Hemisphere, str, str]] = {
    # Maritime NW Europe: tender crops traditionally wait for the
    # "IJsheiligen" (11-15 May); the per-plant windows already encode that.
    "nl_be": (Hemisphere.NORTH, "04-20", "10-25"),
    "uk_south": (Hemisphere.NORTH, "04-10", "11-01"),
    "uk_north": (Hemisphere.NORTH, "05-01", "10-15"),
    "de_central": (Hemisphere.NORTH, "04-30", "10-15"),
    "fr_north": (Hemisphere.NORTH, "04-15", "10-31"),
    "scandinavia_south": (Hemisphere.NORTH, "05-15", "09-30"),
    "mediterranean": (Hemisphere.NORTH, "03-01", "12-01"),
    "au_melbourne": (Hemisphere.SOUTH, "09-15", "05-15"),
    "nz_christchurch": (Hemisphere.SOUTH, "10-10", "04-25"),
    "za_highveld": (Hemisphere.SOUTH, "09-01", "05-15"),
}

FROST_FREE_ANCHORS = ("01-15", "12-15")


def parse_mmdd(year: int, mmdd: str) -> date:
    """``"02-29"`` -> Feb 29 in leap years, Feb 28 otherwise."""
    month_s, day_s = mmdd.strip().split("-")
    month, day = int(month_s), int(day_s)
    last = calendar.monthrange(year, month)[1]
    return date(year, month, min(day, last))


def _shift_half_year(mmdd: str) -> str:
    """Translate a northern frost date to the southern hemisphere (+6 months)."""
    month_s, day_s = mmdd.split("-")
    month = (int(month_s) + 5) % 12 + 1
    day = min(int(day_s), 28 if month == 2 else 30 if month in (4, 6, 9, 11) else 31)
    return f"{month:02d}-{day:02d}"


def resolve_profile(profile: RegionProfile) -> RegionProfile:
    """Fill frost dates from the USDA zone or preset; returns a new profile."""
    last, first, frost_free = profile.last_frost, profile.first_frost, False
    hemisphere = profile.hemisphere
    if profile.mode == "usda" and profile.hardiness_zone:
        zone_num = "".join(ch for ch in profile.hardiness_zone if ch.isdigit()) or "7"
        dates = USDA_FROST_DATES.get(zone_num)
        if dates is None:
            frost_free = True
            last, first = FROST_FREE_ANCHORS
        else:
            last, first = dates
        if hemisphere is Hemisphere.SOUTH:
            last, first = _shift_half_year(last), _shift_half_year(first)
    elif profile.mode == "preset" and profile.preset in PRESETS:
        hemisphere, last, first = PRESETS[profile.preset]
    frost_free = frost_free or profile.frost_free
    return RegionProfile(
        hemisphere=hemisphere,
        mode=profile.mode,
        hardiness_zone=profile.hardiness_zone,
        preset=profile.preset,
        last_frost=last,
        first_frost=first,
        frost_free=frost_free,
        latitude=profile.latitude,
        time_zone=profile.time_zone,
    )


@dataclass(frozen=True, slots=True)
class SeasonAnchors:
    season: int
    last_frost: date
    first_frost: date
    frost_free: bool

    @property
    def growing_days(self) -> int:
        return (self.first_frost - self.last_frost).days

    def anchor(self, name: str) -> date:
        return self.first_frost if name == "first_frost" else self.last_frost

    def window_dates(self, window: Window) -> tuple[date, date]:
        base = self.anchor(window.anchor)
        start = base + timedelta(weeks=window.start_week)
        end = base + timedelta(weeks=window.end_week, days=6)
        return (start, end) if start <= end else (end, start)


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


def season_bounds(profile: RegionProfile, season: int) -> tuple[date, date]:
    """Calendar span [start, end] of a season."""
    if profile.hemisphere is Hemisphere.SOUTH:
        return date(season, 7, 1), date(season + 1, 6, 30)
    return date(season, 1, 1), date(season, 12, 31)


def is_growing_season(profile: RegionProfile, day: date, margin_days: int = 14) -> bool:
    anchors = season_anchors(profile, season_for_date(profile, day))
    if anchors.frost_free:
        return True
    return anchors.last_frost - timedelta(days=margin_days) <= day <= anchors.first_frost + timedelta(days=margin_days)
