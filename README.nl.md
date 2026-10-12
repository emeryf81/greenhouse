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

Alles draait lokaal. Geen accounts en geen cloud – de enige optionele externe oproep is
Open‑Meteo voor een betere verdampingsberekening, en die staat uit tot je ze aanzet.

<p align="center"><img src="docs/images/planner-autofill-nl.png" alt="Automatisch invullen" width="88%"></p>

## Wat kan het?

| | |
|---|---|
| 🗺️ **Tuinplan in drie stappen** | **1 · Teken je terrein** op een raster van 10 × 10 cm: zones (moestuin, serre, koude bak, **boomgaard, kleinfruit, kruiden- en bloementuin**) en elementen (huis, oprit, straat, terras, gazon, paden, haag, omheining, bomen, vijver, tuinhuis, compostvat, regenton …). **2 · Richt elke zone in** op een eigen kaart. **3 · Beplant** zelf of laat het systeem invullen. Herkenbare **planticonen** (een wortel ziet eruit als een wortel), zaairijen voor dichte teelten, meerdere items selecteren, uitlijnen, lagen, opeenvolgend zaaien, ongedaan maken, import/export. |
| 🌳 **Meerjarigen blijven staan** | Een appelboom van dit jaar staat er volgend jaar nog: fruitbomen, bessen, asperge en vaste kruiden gaan elk seizoen mee met hun eigen jaarlijkse verzorging (winter- en zomersnoei, dunnen, netten, lijmbanden) tot je ze uitdrukkelijk verwijdert – "weg vanaf dit seizoen" bewaart de historiek. |
| 💬 **Advies & vragen** | Vraag in een zin met keuzelijsten – *"Ik heb een probleem met [tomaat]: [vlekken, schimmel of rot]"* – en krijg de live toestand, mogelijke oorzaken, wat nu te doen, **eco- en huis-tuin-en-keukenmiddeltjes** en preventie. Voorstellen voor plaatsing, bestuivingspartners, bestuiversbloemen, slechte buren, oogstgaten (het hele jaar groenten), lege bedden en ecologie, met één klik toe te passen. |
| ✨ **Automatisch invullen** | Stelt een volledig seizoen voor op basis van je bedden, gezinsgrootte, uren per week, water en compost: juiste hoeveelheden per persoon, hoge gewassen weg van de zon, vruchtwisseling en combinaties gerespecteerd, snelle gewassen in opeenvolgende zaaironden, warmteminners in de serre. **Voorkeuren**: wat moet erin, wat zeker niet, keuzevrijheid, plantenburen respecteren, bestuivingsbloemen toevoegen, oogst het hele jaar, meerjarigen toegestaan, zonetype respecteren. |
| 🤝 **Combinatieteelt & vruchtwisseling** | Live score tijdens het slepen: goede en slechte buren, **plaagwering en vangplanten, allelopathie, concurrentie om voeding en beschaduwing** (rekening houdend met het halfrond) – telkens met uitleg, betere buren en alternatieve bedden bij wisselteeltconflicten. |
| 🌱 **Plantendatabase** | **232 gewassen**: 100 groenten, 75 kruiden, 36 soorten fruit (appel, peer, kers, pruim, perzik, vijg, bessen, kruisbes, frambozen, blauwe bes, druif, kiwibes …) en 21 bloemen & groenbemesters (NL/EN), met Kc per groeistadium, N‑P‑K‑behoefte, jaarlijkse verzorging, bestuiving, ecotips en een icoon – volledig aanpasbaar. |
| 📅 **Taken & tuinjaar** | Van zaaien tot oogst per gewas, plus de **seizoenskalender**: bodem klaarmaken (met kg compost), serreruiten wassen, schaduw aan/af, nuttige insecten, brandnetel- en smeerwortelgier, goten en regentonnen, nestkastjes, zaad winnen, winterrust en afdekken, boomgaardonderhoud. **Weerperiodes** (hitte, droogte, storm, zware regen) met ecotips, **taken plannen volgens het weer**, het gereedschap per klus, **herinneringen voor achterstallige taken** en een weekoverzicht. |
| 📓 **Logboek & registratie** | Een **tuindagboek** met foto's per bed of gewas, een **oogstlogboek** in kg waaruit Autofill **je eigen opbrengsten** leert, een **zadendoos** die weet welke zakjes verouderen en voor welke gewassen je nog zaad nodig hebt, **waterverbruik** via een watermeter en de regenton, en **bodemanalyses** per bed die het bemestings- en kalkadvies sturen. Een **jaaroverzicht** toont elk gewas maand per maand, ook als afdrukbaar jaarplan. |
| 👪 **Huishouden, kaart & spraak** | Wijs taken toe aan personen met automatische regels en persoonlijke herinneringen, vink taken af vanaf elk dashboard met de **`hortulus-tasks-card`**, en vraag Assist *„wat moet ik vandaag in de tuin doen?”* (Nederlands en Engels). |
| 💧 **Water, voeding, gezondheid** | FAO‑56 **Penman‑Monteith ET₀** (Hargreaves als terugval), Kc per groeistadium, een **waterbalans** in de wortelzone per bed, **voedingsbalans‑index** uit NPK/EC‑sensoren, **ziekterisico** (Hutton‑criteria, bladnat, luchtvochtigheid in de serre), graaddagen per teelt met dynamische oogstdatum. |
| 🚿 **Veilige aansturing** | Kleppen + pomp met **pompvergrendeling, maximale looptijd, vorstvergrendeling en regen overslaan**; luchtramen en schaduwschermen van de serre automatisch; alles ook als advies. |
| 🖨️ **Afdrukken & reMarkable** | Tuin‑ en serreplan met legende, schaal en noordpijl, bedfiches met raster, takenlijsten, seizoensoverzicht, blanco planningsbladen en plantkaarten – als PDF in A4/A3/A5/Letter of **reMarkable Paper Pro** met e‑inkpatronen en stippelvlakken om op te tekenen. |
| 📖 **Handboek** | 21 hoofdstukken over bodem, zaaien, water, bemesten, vruchtwisseling, combinatieteelt, de serre, plagen, ziekten, het tuinjaar, **fruit, gereedschap & materialen, huis-tuin-en-keukenmiddeltjes, het hele jaar oogsten en sensoren kiezen** (NL/EN), plus ⓘ‑tooltips overal. Een **boodschappenlijst** berekent zaad, plantgoed, compost, vliesdoek, gaas en netten uit je plan. |
| 🏠 **Volwaardig in HA** | Sensoren, binaire sensoren, getallen, keuzelijsten, schakelaars, knoppen, kalender en takenlijst, diensten met antwoord, events, push/TTS/blijvende meldingen, diagnose, NL en EN. |

<table>
  <tr>
    <td><img src="docs/images/planner-orchard-nl.png" alt="Planner met planticonen, boomgaard en fruithoek"></td>
    <td><img src="docs/images/advice-nl.png" alt="Advies en vragen"></td>
  </tr>
  <tr>
    <td><img src="docs/images/calendar-timeline-nl.png" alt="Seizoenstijdlijn"></td>
    <td><img src="docs/images/print-nl.png" alt="Afdrukken voor reMarkable"></td>
  </tr>
  <tr>
    <td><img src="docs/images/journal-nl.png" alt="Logboek: dagboek, oogst, zadendoos en water"></td>
    <td><img src="docs/images/calendar-year-nl.png" alt="Jaaroverzicht"></td>
  </tr>
  <tr>
    <td><img src="docs/images/handbook-chapter-nl.png" alt="Handboek"></td>
    <td><img src="docs/images/task-dialog-nl.png" alt="Taak met live sensorgegevens"></td>
  </tr>
</table>

### Afdrukken op papier en de reMarkable Paper Pro

<table>
  <tr>
    <td width="33%"><img src="docs/images/pdf-remarkable-garden.png" alt="Tuinplan, reMarkable e-ink"></td>
    <td width="33%"><img src="docs/images/pdf-remarkable-bed.png" alt="Bedfiche met raster"></td>
    <td width="33%"><img src="docs/images/pdf-a4-season.png" alt="Seizoensoverzicht, A4 kleur"></td>
  </tr>
</table>

Het tabblad **Afdrukken** toont elke pagina vooraf. Het reMarkable‑formaat is
179,6 × 239,5 mm (het 4:3‑scherm van de Paper Pro) met een bredere linkermarge voor de
werkbalk; de *e‑ink*‑modus gebruikt lichte tinten plus een arceerpatroon per
plantenfamilie, zodat bedden herkenbaar blijven en je penlijnen zichtbaar. Automatiseringen
maken dezelfde PDF's met `garden_manager.export_pdf` (opgeslagen in `/config/hortulus/exports/`).

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
| serre‑advies | `sensor.<zone>_greenhouse_advice`, `binary_sensor.<zone>_heat_stress`, `select.<zone>_shading` |
| verdamping & graaddagen | `sensor.hortulus_reference_evapotranspiration_today`, `sensor.hortulus_degree_days_today` |
| bodemwater & voeding | `sensor.<bed>_soil_water_deficit`, `sensor.<bed>_nutrient_balance` |
| ziekte & vorst per zone | `sensor.<zone>_disease_risk`, `binary_sensor.<zone>_frost_risk_48h` |
| bewatering aansturen | `switch.hortulus_automatic_irrigation`, `select.hortulus_irrigation_mode`, `number.hortulus_irrigation_max_runtime`, `button.hortulus_water_now`, `binary_sensor.hortulus_irrigation_frost_lockout` |
| taken | `calendar.hortulus_garden_tasks`, `todo.hortulus_this_week`, `sensor.hortulus_tasks_due_today` |
| logboek | Oogst dit seizoen, Tuinwater (7 dagen), Beschikbaar regenwater; `garden_manager.log_harvest`, `.add_journal_entry`, `.save_soil_test`, `.assign_task` |
| dashboard & spraak | `type: custom:hortulus-tasks-card` (automatisch geladen), Assist via `garden_manager.install_voice_sentences` |
| diensten | `garden_manager.add_task`, `complete_task`, `postpone_task`, `delete_task`, `generate_tasks`, `recalculate_plan`, `export_plan`, `import_plan`, `add_planting`, `update_planting`, `remove_planting`, `autofill_plan`, `run_irrigation_plan`, `stop_irrigation`, `set_shading_mode`, `export_pdf` |

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
