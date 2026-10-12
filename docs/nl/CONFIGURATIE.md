# Configuratie

Hortulus stel je op drie plekken in, elk met een eigen taak:

| Waar | Wat | Opgeslagen in |
|---|---|---|
| **Installatiewizard** | Eerste keer: klimaat, weer, eerste bedden + sensoren, meldingen | config entry → vult de tuinopslag één keer |
| **Opties** (Instellingen → Apparaten & diensten → Hortulus → *Configureren*) | Klimaat, weer/buitensensoren, meldingen, geavanceerd | tuinopslag |
| **Hortulus‑paneel** | De rest: bedden/zones tekenen, beplanting, sensorkoppelingen, plantendatabase, taken | `.storage/garden_manager.garden` |

Na de installatie is de tuinopslag de enige bron van waarheid; opties en paneel
bewerken dezelfde gegevens.

## 1. Installatiewizard

### Stap 1 – Klimaatprofiel
Kies hoe Hortulus je **vorstdata** bepaalt. Alle zaai‑ en plantvensters in de database
zijn uitgedrukt in weken vóór of na die data.

| Profiel | Wanneer | Voorbeeld |
|---|---|---|
| **Regionale voorinstelling** | Je regio staat in de lijst | *Nederland / Vlaanderen*: laatste vorst 20 apr, eerste vorst 25 okt |
| **USDA‑zone** | Je kent je winterhardheidszone | 8a → 25 mrt / 15 nov |
| **Eigen vorstdata** | Je hebt lokale gegevens (beste keuze) | `04-28` / `10-15` |

Voor Nederland en Vlaanderen is de voorinstelling `nl_be` (laatste vorst 20 april). De
plantendatabase is zo opgezet dat vorstgevoelige gewassen pas rond de **IJsheiligen
(11–15 mei)** buiten worden uitgeplant; in een kas kan dat 4 weken eerder.

Randgevallen: `02-29` wordt in een gewoon jaar 28 februari; op het zuidelijk halfrond loopt
een seizoen van juli tot juni; USDA‑zones 11 en hoger gelden als vorstvrij.

### Stap 2 – Weer
* **Weerentiteit** (aanbevolen) met uur‑ en/of dagverwachting, bv. `weather.home`.
  Hortulus haalt de verwachting elke 30 minuten op via `weather.get_forecasts`, en extra
  wanneer de weerentiteit verandert (maximaal elke 10 minuten). Eenheden worden
  automatisch omgerekend naar °C, mm en km/u.
* **Buitentemperatuur** (optioneel) voor de graaddagen.
* **Regensensor** (optioneel): dagtotaal in mm of een binaire regendetector.

### Stap 3 – Bedden, kassen en bakken
Per tuindeel: naam, soort (buitenbed / kas / bak), breedte × lengte (m), grondsoort,
schaduw, windblootstelling, en daarna de sensoren:

| Veld | Voorbeeld |
|---|---|
| Bodemvocht | `sensor.soil_moisture_bed_1` |
| Bodemtemperatuur | `sensor.soil_temp_bed_1` |
| Luchttemperatuur (kas) | `sensor.greenhouse_temp` |
| Luchtvochtigheid / licht (kas) | `sensor.greenhouse_humidity`, `sensor.greenhouse_lux` |
| Beregening | `valve.bed_1` of `switch.druppel_bed_1` |
| Debiet | `4` L/min |

Buitenbedden en bakken komen in één buitenzone (“Tuin”); een kas wordt een kaszone met één
grondbed (“… bed”). Luchtsensoren horen bij de zone, bodemsensoren bij het bed.

### Stap 4 – Meldingen
Blijvende meldingen, één of meer `notify.*`‑diensten (push), optioneel tekst‑naar‑spraak
met speakers, en het tijdstip van het **dagelijkse overzicht** (standaard 07:30).

### Stap 5 – Samenvatting
Controleer alles en voeg eventueel een **voorbeeldplan** toe: tomaat + basilicum +
afrikaantje in de kas, wortel naast ui (verwarren wortel‑ en uienvlieg) en drie keer
opeenvolgend sla.

## 2. Regels voor sensorkoppeling

Een bed gebruikt achtereenvolgens: sensoren **van het bed**, dan **van de zone**, dan (voor
buitenzones) de **buitensensoren**. Ontbrekende of onbeschikbare sensoren verlagen alleen
de nauwkeurigheid. Een sensor die langer dan *sensor verouderd na* (standaard 360 min)
niets meldt wordt genegeerd en geeft een waarschuwing.

## 3. Opties

| Menu | Velden |
|---|---|
| Klimaat & vorstdata | profiel, halfrond, voorinstelling/zone/eigen data |
| Weer & buitensensoren | weerentiteit, buitentemperatuur, regen |
| Meldingen | blijvend, push, TTS, speakers, tijdstip overzicht, vorst/hitte, vorst omroepen |
| Geavanceerd | taal van gegenereerde teksten, bereik buurplanten (cm), sensor verouderd na, diepte wortelzone, maximale beregening |

## 4. Het paneel

* **Planner** – *Bed toevoegen* / *Zone toevoegen*, slepen om te verplaatsen, hoekgreep om
  te vergroten. Kies *Los*, *Blok* of *Rij* en sleep een plant op een bed; tijdens het
  slepen toont het label ♥ goede buren, ⚠ conflicten en ⟲ wisselteelt. In het
  detailpaneel stel je methode, status, afmeting en datum in en zie je een tijdlijn.
  **Opeenvolgend zaaien** verdeelt een blok in stroken die elke *N* dagen gezaaid worden.
  Wijzigingen worden ongeveer 1 seconde na elke bewerking opgeslagen.
* **Planten** – zoeken in elke taal, filteren op familie/kas/snel/eigen, zaaikalender
  voor jóuw vorstdata, *Aanpassen* (alleen gewijzigde velden worden bewaard) of
  *Nieuwe plant*.
  **Automatisch invullen** stelt een seizoen voor op basis van gezinsgrootte, uren per
  week, water, compost, doelen en gewenste/uitgesloten gewassen: hoeveelheden per persoon,
  vruchtwisseling, combinaties, serre voor warmteminners, hoge gewassen weg van de zon en
  opeenvolgende zaaironden voor snelle gewassen. Je ziet eerst het voorstel (gewassen,
  m², verwachte oogst, minuten per week, water en compost) en past het pas toe als je
  akkoord bent. Met **Shift/Ctrl‑klik** selecteer je meerdere bedden of gewassen om samen
  te verplaatsen, **uit te lijnen** of te **verdelen**. Via *+ Element* teken je **paden**,
  composthoop, regenton, tuinhuis, boom, haag of klimrek; lagen kan je aan‑ en uitzetten.
  Plantsymbolen volgen de groeivorm. Het detailpaneel toont groeistadium, Kc, graaddagen
  en verwachte oogst, **betere buren** en knoppen om een gewas naar een bed zonder
  wisselteeltconflict te verplaatsen.
* **Kalender** – maand, week, lijst en **tijdlijn** (Gantt per bed met zaaien, groei en
  oogst, verwachte oogst volgens graaddagen, vorstdata en een rij *tuinwerk* met het
  seizoenswerk); taken afronden, overslaan, uitstellen (afhankelijke taken schuiven mee),
  prioriteit, notities en foto's. Op een touchscreen veeg je een taak naar rechts om af
  te ronden en naar links om een dag uit te stellen. Het taakvenster toont live de
  bodemvocht, bodemtemperatuur, waterbalans, voeding, luchttemperatuur, vochtigheid,
  ziekte‑ en vorstrisico en het weer van vandaag, plus een link naar het handboek.
* **Handboek** – 16 hoofdstukken (NL/EN) met zoekfunctie en woordenlijst. De ⓘ‑knopjes in
  het hele paneel leggen een begrip meteen uit en verwijzen naar het hoofdstuk.
* **Afdrukken** – tuinplan, serre/zone, bedfiches, takenlijst, seizoensoverzicht,
  planningsblad of plantkaarten; papier A4, A3, A5, Letter of **reMarkable Paper Pro**
  (179,6 × 239,5 mm, extra linkermarge voor de werkbalk); kleur, *e‑ink* (lichte tinten +
  arcering per familie) of grijstinten; liggend of staand. Met voorbeeld, *PDF
  downloaden* of *Opslaan* in `/config/www/hortulus/`. Kaarten hebben een legende,
  schaalbalk en noordpijl, en een stippelvlak voor notities. Zet de PDF op je reMarkable
  via de desktop‑ of mobiele app of *Send to reMarkable* per e‑mail.
* **Instellingen** – regio, weer (+ luchtvochtigheid, bladnat, **Open‑Meteo** optioneel,
  hoogte), sensoren per zone en bed (met actuele waarde) – ook **EC, N, P, K** per bed en
  **PAR**/**bladnat** per zone –, per serre **luchtraam** en **schaduwscherm** met sturing
  *uit/advies/automatisch*, microklimaat (*tegen een warme muur*, *thermische massa*),
  **bewateringshardware** (modus, pomp, starttijd, maximale looptijd, vorstvergrendeling,
  regen overslaan, pompwachttijd; klep en debiet per bed), **middelen** voor automatisch
  invullen, seizoenswerk aan/uit, meldingen, taal, rastergrootte, import/export.

### Automatisch bewateren in 5 stappen
1. Instellingen → Bedden: kies de klep (`switch.*` of `valve.*`) en het debiet in L/min
   (meet het: hoe lang vult de leiding een emmer van 10 L?).
2. Instellingen → Bewateringshardware: eventueel de pomp en *pomp stopt vóór klep*.
3. Kies de starttijd en de grenzen (maximale looptijd, vorstvergrendeling, regen).
4. Test met `garden_manager.run_irrigation_plan` en `dry_run: true`.
5. Zet **Automatisch bewateren** aan. In de modus *advies* krijg je enkel taken.

Sneltoetsen in de planner (druk op <kbd>?</kbd>): pijltjes verplaatsen (Shift = 10×),
Alt + pijltjes vergroten, Ctrl+Z / Ctrl+Y, Delete, Ctrl+D dupliceren, `[` `]` volgend
item, G/C/M/T lagen, + / − / 0 zoomen, Enter op een plant in de lijst = toevoegen aan het
geselecteerde bed (toetsenbordalternatief voor slepen).

## 5. Importeren en exporteren

Exporteer via de planner, Instellingen of `garden_manager.export_plan` (JSON of YAML,
formaat `hortulus-plan`, zie het [Engelse voorbeeld](../en/CONFIGURATION.md#5-import--export-format)).
Importeren kan als **samenvoegen** (bijwerken op id) of **vervangen**. Oudere bestanden
worden automatisch gemigreerd en verwijzingen worden gecontroleerd.

## 6. Eenheden, taal en tijd

Intern metrisch (cm, °C, mm, L); imperiale sensoren en verwachtingen worden omgerekend.
Taken en meldingen volgen de taal van Home Assistant (Nederlands of Engels) tenzij je dat
onder *Geavanceerd* overschrijft. Datums zijn lokaal; zomer‑/wintertijdovergangen
beïnvloeden vorstduur en dagtotalen niet.
