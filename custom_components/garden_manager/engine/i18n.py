"""Backend message catalog (English / Dutch).

Entities, notifications and calendar events are rendered server-side, so the
backend needs its own small catalog.  The frontend has a richer catalog in
``frontend/src/i18n`` that uses the *same keys*.
"""

from __future__ import annotations

from typing import Any

SUPPORTED = ("en", "nl")

MESSAGES: dict[str, dict[str, str]] = {
    "en": {
        # task titles
        "task.sow_indoor": "Sow {plant} indoors",
        "task.sow_direct": "Sow {plant} in {bed}",
        "task.harden_off": "Harden off {plant}",
        "task.transplant": "Plant out {plant} in {bed}",
        "task.thin": "Thin {plant} in {bed}",
        "task.stake": "Support {plant} in {bed}",
        "task.prune": "Prune {plant} in {bed}",
        "task.pinch": "Pinch {plant} in {bed}",
        "task.earth_up": "Earth up {plant} in {bed}",
        "task.feed": "Feed {plant} in {bed}",
        "task.water": "Water {bed} ({liters} L)",
        "task.weed": "Weed {bed}",
        "task.pest_check": "Check {plant} for pests",
        "task.harvest": "Harvest {plant} in {bed}",
        "task.harvest_start": "First harvest of {plant} in {bed}",
        "task.ventilate": "Ventilate {zone}",
        "task.shade": "Shade {zone}",
        "task.frost_protect": "Protect {plants} from frost",
        "task.close_up": "Close {zone} before night",
        # descriptions
        "desc.sow_indoor": "Sow {depth} cm deep at {soil_temp} °C or warmer. Germination takes {germ_min}-{germ_max} days.",
        "desc.sow_direct": "Sow {depth} cm deep, rows {row_spacing} cm apart. Soil should be at least {soil_temp} °C.",
        "desc.harden_off": "Put seedlings outside for a few hours a day, increasing over 7-10 days.",
        "desc.transplant": "Space plants {spacing} cm apart.",
        "desc.thin": "Thin seedlings to {spacing} cm.",
        "desc.water": "Soil moisture {moisture}% (target {target}%). Apply about {mm} mm ({liters} L).",
        "desc.weed": "Hoe between rows while weeds are small.",
        "desc.harvest": "Expected harvest window {start} - {end}.",
        "desc.frost": "Lowest temperature {temp} °C expected around {time}.",
        "desc.ventilate": "Expected {temp} °C inside; {plants} tolerate up to {max} °C.",
        # alerts
        "alert.frost": "Frost risk {level}: {temp} °C expected {when}",
        "alert.heat": "Heat stress in {zone}: {temp} °C expected",
        "alert.dry": "{bed} is dry ({moisture}%)",
        "alert.sensor_stale": "Sensor {entity} has not reported for a while",
        "alert.forecast_unavailable": "Weather forecast unavailable",
        # schedule reasons
        "reason.soil_too_cold": "Soil is {soil} °C; {plant} needs {min} °C to germinate.",
        "reason.soil_too_hot": "Soil is {soil} °C; above {max} °C {plant} germinates poorly.",
        "reason.frost_forecast": "Frost ({temp} °C) forecast before {date}; {plant} is frost tender.",
        "reason.window_open": "Window is open.",
        "reason.window_not_yet": "Window opens {date}.",
        "reason.window_closed": "Window closed on {date}.",
        "reason.greenhouse_extension": "Greenhouse allows starting {weeks} weeks earlier.",
        "reason.not_greenhouse_suitable": "{plant} is not suited to a greenhouse.",
        # compatibility
        "compat.friend": "{a} and {b} are good companions: {reason}",
        "compat.enemy": "{a} and {b} should not be planted together: {reason}",
        "compat.overlap": "{a} and {b} overlap - not enough space.",
        "compat.rotation": "{family} grew in {bed} in {season}; wait {years} years.",
        "compat.same_family_adjacent": "{a} and {b} share a family and its pests.",
        # digest
        "digest.title": "Garden today",
        "digest.none": "No garden tasks today. Enjoy the view!",
        "digest.count": "{count} tasks today (~{minutes} min)",
        "risk.none": "none",
        "risk.low": "low",
        "risk.moderate": "moderate",
        "risk.high": "high",
        "risk.unknown": "unknown",
        "when.tonight": "tonight",
        "when.tomorrow_night": "tomorrow night",
    },
    "nl": {
        "task.sow_indoor": "{plant} binnen zaaien",
        "task.sow_direct": "{plant} zaaien in {bed}",
        "task.harden_off": "{plant} laten afharden",
        "task.transplant": "{plant} uitplanten in {bed}",
        "task.thin": "{plant} uitdunnen in {bed}",
        "task.stake": "{plant} ondersteunen in {bed}",
        "task.prune": "{plant} snoeien in {bed}",
        "task.pinch": "{plant} toppen in {bed}",
        "task.earth_up": "{plant} aanaarden in {bed}",
        "task.feed": "{plant} bemesten in {bed}",
        "task.water": "{bed} water geven ({liters} L)",
        "task.weed": "{bed} wieden",
        "task.pest_check": "{plant} controleren op plagen",
        "task.harvest": "{plant} oogsten in {bed}",
        "task.harvest_start": "Eerste oogst {plant} in {bed}",
        "task.ventilate": "{zone} luchten",
        "task.shade": "{zone} schaduwen",
        "task.frost_protect": "{plants} beschermen tegen vorst",
        "task.close_up": "{zone} sluiten voor de nacht",
        "desc.sow_indoor": "Zaai {depth} cm diep bij minimaal {soil_temp} °C. Kieming duurt {germ_min}-{germ_max} dagen.",
        "desc.sow_direct": "Zaai {depth} cm diep, rijafstand {row_spacing} cm. De grond moet minstens {soil_temp} °C zijn.",
        "desc.harden_off": "Zet zaailingen enkele uren per dag buiten en bouw dit op over 7-10 dagen.",
        "desc.transplant": "Plantafstand {spacing} cm.",
        "desc.thin": "Dun de zaailingen uit tot {spacing} cm.",
        "desc.water": "Bodemvocht {moisture}% (doel {target}%). Geef ongeveer {mm} mm ({liters} L).",
        "desc.weed": "Schoffel tussen de rijen zolang het onkruid klein is.",
        "desc.harvest": "Verwachte oogstperiode {start} - {end}.",
        "desc.frost": "Laagste temperatuur {temp} °C verwacht rond {time}.",
        "desc.ventilate": "Verwacht {temp} °C binnen; {plants} verdragen tot {max} °C.",
        "alert.frost": "Vorstrisico {level}: {temp} °C verwacht {when}",
        "alert.heat": "Hittestress in {zone}: {temp} °C verwacht",
        "alert.dry": "{bed} is droog ({moisture}%)",
        "alert.sensor_stale": "Sensor {entity} heeft al een tijd niets gemeld",
        "alert.forecast_unavailable": "Weersverwachting niet beschikbaar",
        "reason.soil_too_cold": "Grond is {soil} °C; {plant} heeft {min} °C nodig om te kiemen.",
        "reason.soil_too_hot": "Grond is {soil} °C; boven {max} °C kiemt {plant} slecht.",
        "reason.frost_forecast": "Vorst ({temp} °C) verwacht voor {date}; {plant} is vorstgevoelig.",
        "reason.window_open": "Het venster is open.",
        "reason.window_not_yet": "Venster opent {date}.",
        "reason.window_closed": "Venster sloot op {date}.",
        "reason.greenhouse_extension": "In de kas kun je {weeks} weken eerder beginnen.",
        "reason.not_greenhouse_suitable": "{plant} is niet geschikt voor de kas.",
        "compat.friend": "{a} en {b} zijn goede buren: {reason}",
        "compat.enemy": "{a} en {b} kun je beter niet samen planten: {reason}",
        "compat.overlap": "{a} en {b} overlappen - te weinig ruimte.",
        "compat.rotation": "{family} stond in {season} in {bed}; wacht {years} jaar.",
        "compat.same_family_adjacent": "{a} en {b} zijn familie en delen plagen.",
        "digest.title": "Moestuin vandaag",
        "digest.none": "Geen tuintaken vandaag. Geniet van je tuin!",
        "digest.count": "{count} taken vandaag (~{minutes} min)",
        "risk.none": "geen",
        "risk.low": "laag",
        "risk.moderate": "matig",
        "risk.high": "hoog",
        "risk.unknown": "onbekend",
        "when.tonight": "vannacht",
        "when.tomorrow_night": "morgennacht",
    },
}


class _SafeDict(dict[str, Any]):
    def __missing__(self, key: str) -> str:
        return "{" + key + "}"


def normalize_lang(lang: str | None) -> str:
    if not lang:
        return "en"
    base = lang.split("-")[0].split("_")[0].lower()
    return base if base in SUPPORTED else "en"


def t(key: str, lang: str | None = "en", **params: Any) -> str:
    """Translate ``key``; unknown placeholders are left visible, never raise."""
    catalog = MESSAGES[normalize_lang(lang)]
    template = catalog.get(key) or MESSAGES["en"].get(key) or key
    # 30.0 cm -> 30 cm, 0.5 stays 0.5
    clean = {k: int(v) if isinstance(v, float) and v.is_integer() else v for k, v in params.items()}
    return template.format_map(_SafeDict(clean))
