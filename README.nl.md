<p align="center">
  <img src="assets/brand/banner.png" alt="Hortulus – plan, kweek en oogst gewoon in Home Assistant" width="100%">
</p>

<p align="center">
  <a href="README.md">🇬🇧 English</a> ·
  <a href="docs/nl/CONFIGURATIE.md">Configuratie</a> ·
  <a href="docs/nl/ENTITEITEN.md">Entiteiten & diensten</a> ·
  <a href="docs/nl/FAQ.md">Veelgestelde vragen</a> ·
  <a href="docs/BLUEPRINT.md">Architectuur (EN)</a> ·
  <a href="docs/DESIGN_SYSTEM.md">Ontwerpsysteem (EN)</a>
</p>

# Hortulus — moestuinplanner voor Home Assistant

*Hortulus* (Latijn voor "tuintje", naar het 9e‑eeuwse gedicht van Walahfrid Strabo over
zijn kloostermoestuin) maakt van Home Assistant een moestuinmaatje: teken je bedden en
kas, sleep gewassen erop en Hortulus rekent uit **wanneer je zaait, uitplant, bemest,
snoeit en oogst** – en houdt die planning eerlijk met je **bodemsensoren en de
weersverwachting**.

Alles draait lokaal. Geen accounts, geen cloud, geen externe API's.

<p align="center"><img src="docs/images/library-detail-nl.png" alt="Plantenbibliotheek" width="88%"></p>

## Wat kan het?

| | |
|---|---|
| 🗺️ **Planner met slepen & neerzetten** | Bedden, kaszones, bakken en rijen op een centimeterraster. Losse planten, blokken of rijen; **opeenvolgend zaaien**; ongedaan maken/opnieuw, uitlijnen op raster, sneltoetsen, import/export (JSON/YAML). |
| 🤝 **Buurplanten & wisselteelt** | Live score tijdens het slepen met uitleg per goede/slechte combinatie, te krappe plantafstand en wisselteeltconflicten per bed en familie. |
| 🌱 **Plantendatabase** | 20 groenten en kruiden ingebouwd (Nederlandse en Engelse namen), volledig aan te passen. Voeg je eigen rassen toe. |
| 📅 **Takenmotor** | Zaaien, afharden, uitplanten, uitdunnen, ondersteunen, snoeien, bemesten, wieden, plaagcontrole, water geven en oogsten – automatisch, herhalend waar dat zinvol is, met prioriteit, duur, notities en foto's; uitstellen schuift afhankelijke taken mee. |
| ❄️ **Sensoren + verwachting** | Vorstrisico komende 48 uur (zomertijd‑veilig, rekening houdend met grondvorst bij heldere nachten), kasadvies (luchten/schaduwen), regenbewust beregeningsadvies in mm/liter/minuten, graaddagen. |
| 🏠 **Volwaardig in HA** | Sensoren, binaire sensoren, kalender en takenlijst, diensten met antwoord, events voor automatiseringen, push/TTS/blijvende meldingen, diagnose, vertaald in NL en EN. |

## Installatie

### HACS (aanbevolen)

1. HACS → ⋮ → **Aangepaste repositories** → voeg `https://github.com/emeryf81/greenhouse` toe als *Integratie*.
2. Installeer **Hortulus Garden Manager** en herstart Home Assistant.
3. **Instellingen → Apparaten & diensten → Integratie toevoegen → Hortulus**.

### Handmatig

Kopieer `custom_components/garden_manager` naar `<config>/custom_components/` en herstart.
Het paneel is al gebouwd meegeleverd; Node.js is niet nodig.

Vereist: Home Assistant **2025.10 of nieuwer**. Een weerentiteit met uur‑ en/of
dagverwachting (bijvoorbeeld de standaard Met.no `weather.home`) is aanbevolen.

## Snel aan de slag

De installatiewizard vraagt naar:

1. **Klimaatprofiel** – regionale voorinstelling (*Nederland / Vlaanderen*), USDA‑zone of
   je eigen gemiddelde vorstdata, en het halfrond.
2. **Weer** – bv. `weather.home`, optioneel een buitentemperatuur‑ en regensensor.
3. **Bedden, kassen en bakken** – naam, afmeting, grond, schaduw, wind en de sensoren die
   erbij horen (`sensor.soil_moisture_bed_1`, `sensor.soil_temp_bed_1`,
   `sensor.greenhouse_temp`, …) plus eventueel een beregeningsklep.
4. **Meldingen** – blijvende meldingen, push, TTS en het tijdstip van het dagoverzicht.
5. **Samenvatting** – eventueel een klein voorbeeldplan.

Open daarna **Hortulus** in de zijbalk. Meer: [CONFIGURATIE](docs/nl/CONFIGURATIE.md).

> **Tip voor Nederland/Vlaanderen:** de voorinstelling gebruikt 20 april als gemiddelde
> laatste vorst. Vorstgevoelige gewassen (tomaat, paprika, basilicum) staan in de
> database zo dat ze pas rond de **IJsheiligen (11–15 mei)** naar buiten gaan; in een kas
> mag dat weken eerder.

## In Home Assistant

| Begrip | Entiteit / dienst |
|---|---|
| vochtstatus per bed | `sensor.<bed>_moisture_status` |
| vorstrisico 48 uur | `sensor.hortulus_frost_risk_next_48h`, `binary_sensor.hortulus_frost_warning` |
| beregeningsadvies | `sensor.<bed>_irrigation_recommendation`, `binary_sensor.<bed>_needs_water` |
| graaddagen | `sensor.hortulus_growing_degree_days` |
| kasadvies | `sensor.<zone>_greenhouse_advice`, `binary_sensor.<zone>_heat_stress` |
| taken | `calendar.hortulus_garden_tasks`, `todo.hortulus_this_week`, `sensor.hortulus_tasks_due_today` |
| diensten | `garden_manager.add_task`, `complete_task`, `postpone_task`, `delete_task`, `generate_tasks`, `recalculate_plan`, `export_plan`, `import_plan` |

> Let op: Home Assistant maakt entity‑id's aan op basis van de **systeemtaal** op het
> moment van installeren. Op een Nederlandstalige installatie heet de vorstsensor dus
> bijvoorbeeld `sensor.hortulus_vorstrisico_komende_48_uur`. Zie
> [ENTITEITEN](docs/nl/ENTITEITEN.md).

Voorbeelden: [automatiseringen](examples/automations.yaml) en [dashboard](examples/dashboard.yaml).

## Ontwikkelen

```bash
pip install -r requirements_test.txt && pytest -q
cd frontend && npm ci && npm run typecheck && npm test && npm run build
```

## Licentie

MIT © 2026 Emery Frijters. Plantgegevens zijn gebaseerd op gangbare tuinpraktijk;
controleer altijd het zaadzakje en lokaal advies.
