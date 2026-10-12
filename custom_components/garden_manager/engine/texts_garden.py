"""Texts for the phase 3 maintenance rules and weather tasks (EN / NL).

Kept apart from ``i18n.py`` so the core catalogue stays readable.  Imported
for its side effect at the bottom of ``i18n.py``.
"""

from __future__ import annotations

from .i18n import MESSAGES

MESSAGES["en"].update(
    {
        "overdue.title": "Garden: {count} tasks left undone",
        "weather.moved": "Moved to {date} because of the weather ({reason}).",
        "weather.no_good_day": "Weather warning: {reason} forecast - pick the best moment yourself or protect with fleece.",
        "weather.problem.rain": "rain",
        "weather.problem.frost": "frost",
        "weather.problem.heat": "heat",
        "weather.problem.wind": "strong wind",
        "overdue.window_closed": "too late now - skip it or choose an alternative",
        "overdue.still_ok": "still possible until {date}",
        "overdue.do_now": "{days} days late",
        "overdue.footer": "Open Hortulus to complete, postpone or skip.",
        "weekly.title": "Garden: your week ahead",
        "weekly.day": "{day}: {count} tasks (~{minutes} min)",
        "weekly.empty": "A quiet week - nothing planned.",
        # yearly garden work
        "maint.clean_pots": "Wash pots, trays and labels",
        "maint.clean_pots.desc": "Scrub pots and seed trays in hot water with a squirt of soft soap or a splash of vinegar; "
        "rinse and dry in the sun. Clean pots prevent damping off.",
        "maint.water_butts": "Clean and connect the water butts",
        "maint.water_butts.desc": "Scoop out sludge, check the diverter on the downpipe and put a lid or fine mesh on top "
        "(no mosquito larvae). Rain water is softer and warmer than tap water - plants love it.",
        "maint.irrigation_service": "Service the drip irrigation",
        "maint.irrigation_service.desc": "Flush the lines, clean filters and drippers (a night in vinegar dissolves lime), "
        "check for leaks and test every valve once.",
        "maint.green_manure_dig": "Cut down and dig in the green manure",
        "maint.green_manure_dig.desc": "Mow or chop the green manure, let it wilt for a few days and work it shallowly into "
        "the top 10 cm (no-dig: leave it as mulch under a cover). Sow 3-4 weeks later.",
        "maint.slug_patrol": "Start the slug patrol",
        "maint.slug_patrol.desc": "Go round with a torch after dusk or rain. Eco: beer trap (sunk jar, rim 2 cm above soil), "
        "a board to collect them under, a ring of wood ash, grit or crushed eggshell around seedlings; welcome hedgehogs, "
        "thrushes and ground beetles.",
        "maint.nettle_feed": "Make nettle feed (nitrogen)",
        "maint.nettle_feed.desc": "1 kg young nettles (before flowering) in 10 l rain water, stir daily, ferment 10-14 days. "
        "Dilute 1:10 for leafy crops and cabbages, 1:20 for seedlings. A lid keeps the smell in.",
        "maint.comfrey_feed": "Make comfrey feed (potassium)",
        "maint.comfrey_feed.desc": "Pack comfrey leaves in a bucket with a few holes in the bottom, weigh them down and collect "
        "the black liquid (or soak 1 kg in 10 l water for 3 weeks). Dilute 1:10 - perfect tomato and fruit feed.",
        "maint.sow_winter_crops": "Sow for autumn and winter harvests",
        "maint.sow_winter_crops.desc": "Last chance outdoors for winter crops: lamb's lettuce, spinach, winter purslane, "
        "rocket, pak choi, endive, turnip greens; plant out leeks, kale and winter cabbage. Sow green manure on empty beds.",
        "maint.hedge_trim": "Trim the hedge (after nesting season)",
        "maint.hedge_trim.desc": "Check for nests first - birds breed until mid-August. Use the clippings as mulch "
        "or in the compost (shredded).",
        "maint.seed_saving": "Save seed",
        "maint.seed_saving.desc": "Pick the best fruit of open-pollinated varieties (tomato, bean, pea, lettuce). "
        "Tomato: ferment the pulp 3 days in a glass of water, rinse and dry. Store in paper envelopes, cool and dry.",
        "maint.fleece_ready": "Get fleece, tunnels and frost cloth ready",
        "maint.fleece_ready.desc": "Check fleece and hoops, buy what is missing; old bed sheets and cardboard boxes "
        "work too for a night of frost.",
        "maint.leaf_mould": "Collect leaves for leaf mould",
        "maint.leaf_mould.desc": "Fill bin bags with damp autumn leaves, punch a few holes and leave them 1-2 years: "
        "the best free seed compost and mulch. Skip diseased leaves (scab, rust).",
        "maint.gutters": "Clear gutters and the rain diverter",
        "maint.gutters.desc": "Remove leaves from gutters, the water-butt filter and greenhouse gutters so winter rain "
        "is caught.",
        "maint.nest_boxes": "Clean nest boxes and feed the birds",
        "maint.nest_boxes.desc": "Empty old nests (fleas), rinse with boiling water - no chemicals. Tits eat thousands "
        "of caterpillars and aphids: hang the box 2-3 m high, entrance facing east.",
        "maint.storage_check": "Check the winter store",
        "maint.storage_check.desc": "Go through potatoes, onions, squash, apples and roots: remove anything soft or "
        "rotting, keep the store dark, frost-free and airy.",
        # greenhouse
        "maint.gh_windows": "Wash the windows of {zone}",
        "maint.gh_windows.desc": "Clean glass or polycarbonate inside and out: a dirty roof costs 10-20 % of the light. "
        "Warm water with green soap or a dash of vinegar, a soft brush on a pole, rinse with the hose; "
        "scrape algae out of the overlaps with a plant label.",
        "maint.gh_windows_autumn": "Clean the glass of {zone} for winter light",
        "maint.gh_windows_autumn.desc": "Wash off the shading paint and summer dirt so winter crops get every ray of light.",
        "maint.gh_vents_check": "Check vents and openers in {zone}",
        "maint.gh_vents_check.desc": "Test the automatic window openers (wax cylinders weaken after a few years), "
        "fans and the min/max thermometer before the first warm day.",
        "maint.gh_biocontrol": "Bring in the good bugs in {zone}",
        "maint.gh_biocontrol.desc": "From 15 °C: release Encarsia against whitefly, Phytoseiulus against spider mite and "
        "lacewing larvae against aphids. Hang yellow sticky cards to monitor. A dish of water and some flowers "
        "(marigold, alyssum) keep them there.",
        "maint.gh_winter_crops": "Plan winter crops in {zone}",
        "maint.gh_winter_crops.desc": "Sow or plant now for harvests all winter under glass: lamb's lettuce, winter "
        "purslane, spinach, pak choi, mizuna, rocket, chard, spring onion; lettuce for early spring.",
        # orchard
        "maint.orchard_winter_wash": "Winter check of the fruit trees in {zone}",
        "maint.orchard_winter_wash.desc": "Look for canker, mummified fruit and aphid eggs on a dry day; scrub loose bark "
        "with a stiff brush. Remove mummies (brown rot) and dead wood.",
        "maint.orchard_mow": "Mow the orchard paths, leave flower strips",
        "maint.orchard_mow.desc": "Keep a 1 m tree circle free of grass (mulch), mow the paths and leave strips to flower "
        "for pollinators and predatory insects.",
        "maint.orchard_grease_bands": "Put grease bands on the trees in {zone}",
        "maint.orchard_grease_bands.desc": "Grease bands at 1 m height stop wingless winter moth females climbing up "
        "to lay eggs. Remove them in March.",
        "maint.orchard_pollinators": "Help the pollinators in {zone}",
        "maint.orchard_pollinators.desc": "Blossom is coming: hang a mason-bee house (south-east, 1-2 m), leave dandelions "
        "flowering in the grass, never spray during bloom.",
        # weather episodes
        "weather.heat": "Heat ahead ({temp} °C on {day}): protect the garden",
        "weather.heat.desc": "Up to {temp} °C over {days} day(s). Water early in the morning (5-8 h), at the roots and "
        "deeply (10-20 l/m²) rather than a little every evening; mulch bare soil 5-8 cm (grass clippings, straw); "
        "harvest in the morning; don't sow, plant out or prune now; move pots into the shade and set out a dish of "
        "water for birds and insects.",
        "weather.heat.shade": "Shade the most sensitive crops at midday: {plants}. No shade cloth? An old net curtain, "
        "a double layer of fleece, a parasol or a bed sheet on canes works fine.",
        "weather.heat.very": "Very hot: tomatoes and peppers drop flowers above 32-35 °C - shade them too. "
        "Check pots and young plants twice a day.",
        "weather.heat_gh": "Heat ahead: cool {zone} ({temp} °C)",
        "weather.heat_gh.desc": "Open all vents and the door early in the morning, close the door only if nights drop "
        "below 12 °C; shading paint or netting on; damp down the floor and paths at midday (evaporation cools 3-5 °C); "
        "water in the morning; a bucket of water in the greenhouse buffers the night.",
        "weather.dry": "Dry, warm spell ({days} days): water smart",
        "weather.dry.desc": "Give one deep soak per week (20 l/m²) instead of daily sprinkling - roots grow deeper. "
        "Hoe once ('a hoeing is worth two waterings'), top up mulch, use the water butts first and water in the "
        "morning. Sunk bottles or ollas (unglazed pots) next to thirsty crops save half the water.",
        "weather.storm": "Storm coming ({day}): make the garden storm-proof",
        "weather.storm.desc": "Wind gusts up to {wind} km/h. Close greenhouse doors and vents, weigh down fleece and nets "
        "(stones, sandbags, tent pegs), move pots and seed trays to a sheltered spot and clear loose items.",
        "weather.storm.tall": "Check stakes and ties of tall crops: {plants}.",
        "weather.rain": "Heavy rain ({mm} mm on {day}): after-care",
        "weather.rain.desc": "After the rain: slug patrol at dusk (beer traps, collect them), stay off wet beds (use a "
        "plank), empty saucers and pots, check that water drains away. Wait a few days before sowing; "
        "remove rotting fruit (botrytis).",
    }
)

MESSAGES["nl"].update(
    {
        "overdue.title": "Moestuin: {count} taken blijven liggen",
        "weather.moved": "Verplaatst naar {date} wegens het weer ({reason}).",
        "weather.no_good_day": "Weerwaarschuwing: {reason} voorspeld - kies zelf het beste moment of bescherm met vliesdoek.",
        "weather.problem.rain": "regen",
        "weather.problem.frost": "vorst",
        "weather.problem.heat": "hitte",
        "weather.problem.wind": "harde wind",
        "overdue.window_closed": "te laat nu - overslaan of een alternatief kiezen",
        "overdue.still_ok": "kan nog tot {date}",
        "overdue.do_now": "{days} dagen te laat",
        "overdue.footer": "Open Hortulus om af te vinken, uit te stellen of over te slaan.",
        "weekly.title": "Moestuin: je week",
        "weekly.day": "{day}: {count} taken (~{minutes} min)",
        "weekly.empty": "Een rustige week - niets gepland.",
        "maint.clean_pots": "Potten, zaaibakken en etiketten wassen",
        "maint.clean_pots.desc": "Schrob potten en zaaibakken in heet water met een scheut groene zeep of azijn, "
        "spoel na en laat drogen in de zon. Propere potten voorkomen kiemplantenziekte.",
        "maint.water_butts": "Regentonnen schoonmaken en aansluiten",
        "maint.water_butts.desc": "Schep het slib eruit, controleer de vulautomaat op de regenpijp en leg er een deksel "
        "of fijn gaas op (geen muggenlarven). Regenwater is zachter en warmer dan kraantjeswater - planten zijn er dol op.",
        "maint.irrigation_service": "Druppelirrigatie nakijken",
        "maint.irrigation_service.desc": "Spoel de leidingen door, reinig filters en druppelaars (een nacht in azijn lost "
        "kalk op), zoek lekken en test elke klep één keer.",
        "maint.green_manure_dig": "Groenbemester maaien en inwerken",
        "maint.green_manure_dig.desc": "Maai of hak de groenbemester, laat enkele dagen verwelken en werk hem ondiep "
        "in de bovenste 10 cm (niet-spitten: laat hem liggen als mulch onder een afdekking). Zaai 3-4 weken later.",
        "maint.slug_patrol": "Slakkenronde starten",
        "maint.slug_patrol.desc": "Ga na schemering of regen rond met een zaklamp. Ecologisch: bierval (ingegraven "
        "potje, rand 2 cm boven de grond), een plank waaronder ze schuilen, een ring van houtas, grit of gemalen "
        "eierschalen rond zaailingen; verwelkom egels, lijsters en loopkevers.",
        "maint.nettle_feed": "Brandnetelgier maken (stikstof)",
        "maint.nettle_feed.desc": "1 kg jonge brandnetels (voor de bloei) in 10 l regenwater, dagelijks roeren, "
        "10-14 dagen laten gisten. Verdun 1:10 voor bladgewassen en kolen, 1:20 voor zaailingen. Een deksel houdt de geur binnen.",
        "maint.comfrey_feed": "Smeerwortelgier maken (kalium)",
        "maint.comfrey_feed.desc": "Prop smeerwortelblad in een emmer met gaatjes in de bodem, verzwaar en vang het zwarte "
        "vocht op (of week 1 kg in 10 l water gedurende 3 weken). Verdun 1:10 - ideale voeding voor tomaten en fruit.",
        "maint.sow_winter_crops": "Zaaien voor herfst- en winteroogst",
        "maint.sow_winter_crops.desc": "Laatste kans buiten voor wintergroenten: veldsla, spinazie, winterpostelein, "
        "rucola, paksoi, andijvie, raapstelen; plant prei, boerenkool en winterkool uit. Zaai groenbemester op lege bedden.",
        "maint.hedge_trim": "Haag snoeien (na het broedseizoen)",
        "maint.hedge_trim.desc": "Kijk eerst naar nesten - vogels broeden tot half augustus. Gebruik het snoeisel "
        "(versnipperd) als mulch of in de compost.",
        "maint.seed_saving": "Zaad winnen",
        "maint.seed_saving.desc": "Neem de mooiste vruchten van samenbestuivende rassen (tomaat, boon, erwt, sla). "
        "Tomaat: laat het zaadmoes 3 dagen gisten in een glas water, spoel en droog. Bewaar in papieren zakjes, koel en droog.",
        "maint.fleece_ready": "Vliesdoek, tunnels en vorstdoek klaarleggen",
        "maint.fleece_ready.desc": "Controleer vliesdoek en tunnelbogen, koop wat ontbreekt; oude lakens en kartonnen "
        "dozen werken ook voor een vriesnacht.",
        "maint.leaf_mould": "Bladeren verzamelen voor bladaarde",
        "maint.leaf_mould.desc": "Vul vuilniszakken met vochtig herfstblad, prik er gaatjes in en laat 1-2 jaar staan: "
        "de beste gratis zaaigrond en mulch. Geen ziek blad (schurft, roest).",
        "maint.gutters": "Dakgoten en regenwateraftakking vrijmaken",
        "maint.gutters.desc": "Haal bladeren uit de goten, de filter van de regenton en de goten van de serre zodat "
        "de winterregen opgevangen wordt.",
        "maint.nest_boxes": "Nestkastjes schoonmaken en vogels voederen",
        "maint.nest_boxes.desc": "Haal oude nesten eruit (vlooien), spoel met kokend water - geen chemie. Mezen eten "
        "duizenden rupsen en bladluizen: hang het kastje op 2-3 m, opening naar het oosten.",
        "maint.storage_check": "Wintervoorraad controleren",
        "maint.storage_check.desc": "Loop aardappelen, uien, pompoenen, appels en wortelgroenten na: haal alles weg dat "
        "zacht wordt of rot, hou de berging donker, vorstvrij en luchtig.",
        "maint.gh_windows": "Ruiten van {zone} wassen",
        "maint.gh_windows.desc": "Maak glas of polycarbonaat binnen en buiten schoon: een vuil dak kost 10-20 % licht. "
        "Lauw water met groene zeep of een scheut azijn, een zachte borstel op een steel, naspoelen met de tuinslang; "
        "schraap algen uit de overlappingen met een plantenetiket.",
        "maint.gh_windows_autumn": "Glas van {zone} reinigen voor het winterlicht",
        "maint.gh_windows_autumn.desc": "Was de schaduwkalk en het zomerstof eraf zodat de wintergewassen elk straaltje licht krijgen.",
        "maint.gh_vents_check": "Ramen en raamopeners van {zone} nakijken",
        "maint.gh_vents_check.desc": "Test de automatische raamopeners (de wascilinders verzwakken na enkele jaren), "
        "ventilatoren en de min/max-thermometer vóór de eerste warme dag.",
        "maint.gh_biocontrol": "Nuttige insecten inzetten in {zone}",
        "maint.gh_biocontrol.desc": "Vanaf 15 °C: sluipwesp Encarsia tegen witte vlieg, roofmijt Phytoseiulus tegen spint "
        "en gaasvlieglarven tegen bladluis. Hang gele vangplaten om op te volgen. Een schaaltje water en wat bloemen "
        "(goudsbloem, zilverschildzaad) houden ze ter plaatse.",
        "maint.gh_winter_crops": "Wintergroenten plannen in {zone}",
        "maint.gh_winter_crops.desc": "Zaai of plant nu voor oogst de hele winter onder glas: veldsla, winterpostelein, "
        "spinazie, paksoi, mizuna, rucola, snijbiet, lente-ui; sla voor het vroege voorjaar.",
        "maint.orchard_winter_wash": "Wintercontrole van de fruitbomen in {zone}",
        "maint.orchard_winter_wash.desc": "Zoek op een droge dag naar kanker, mummievruchten en luizeneitjes; borstel losse "
        "schors met een stugge borstel. Verwijder mummies (moniliarot) en dood hout.",
        "maint.orchard_mow": "Paden in de boomgaard maaien, bloemstroken laten staan",
        "maint.orchard_mow.desc": "Hou een boomspiegel van 1 m grasvrij (mulch), maai de paden en laat stroken bloeien "
        "voor bestuivers en roofinsecten.",
        "maint.orchard_grease_bands": "Lijmbanden aanbrengen in {zone}",
        "maint.orchard_grease_bands.desc": "Lijmbanden op 1 m hoogte houden de vleugelloze wijfjes van de wintervlinder "
        "tegen die omhoog kruipen om eitjes te leggen. Verwijder ze in maart.",
        "maint.orchard_pollinators": "Help de bestuivers in {zone}",
        "maint.orchard_pollinators.desc": "De bloesem komt eraan: hang een metselbijenhotel (zuidoost, 1-2 m hoog), laat "
        "paardenbloemen bloeien in het gras, spuit nooit tijdens de bloei.",
        "weather.heat": "Hitte op komst ({temp} °C op {day}): bescherm de tuin",
        "weather.heat.desc": "Tot {temp} °C gedurende {days} dag(en). Geef 's ochtends vroeg water (5-8 u), aan de voet "
        "en grondig (10-20 l/m²) in plaats van elke avond een beetje; mulch kale grond 5-8 cm (grasmaaisel, stro); "
        "oogst 's ochtends; nu niet zaaien, uitplanten of snoeien; zet potten in de schaduw en zet een schaaltje "
        "water klaar voor vogels en insecten.",
        "weather.heat.shade": "Geef de gevoeligste gewassen 's middags schaduw: {plants}. Geen schaduwdoek? Een oud "
        "vitragegordijn, dubbel vliesdoek, een parasol of een laken op stokken werkt prima.",
        "weather.heat.very": "Zeer warm: tomaten en paprika laten bloemen vallen boven 32-35 °C - geef ook hen schaduw. "
        "Controleer potten en jonge planten twee keer per dag.",
        "weather.heat_gh": "Hitte op komst: koel {zone} ({temp} °C)",
        "weather.heat_gh.desc": "Zet 's ochtends vroeg alle ramen en de deur open, sluit de deur enkel als de nacht onder "
        "12 °C zakt; schaduwkalk of -doek erop; maak 's middags de vloer en paden nat (verdamping koelt 3-5 °C); "
        "water geven 's ochtends; een emmer water in de serre buffert de nacht.",
        "weather.dry": "Droge, warme periode ({days} dagen): slim water geven",
        "weather.dry.desc": "Geef één keer per week grondig water (20 l/m²) in plaats van dagelijks sproeien - de wortels "
        "groeien dieper. Schoffel één keer ('één keer schoffelen is twee keer gieten'), vul de mulch aan, gebruik eerst "
        "de regenton en geef 's ochtends water. Ingegraven flessen of olla's (ongeglazuurde potten) naast dorstige "
        "gewassen sparen de helft van het water.",
        "weather.storm": "Storm op komst ({day}): maak de tuin stormvast",
        "weather.storm.desc": "Windstoten tot {wind} km/u. Sluit deuren en ramen van de serre, verzwaar vliesdoek en netten "
        "(stenen, zandzakjes, tentharingen), zet potten en zaaibakken beschut en ruim losse spullen op.",
        "weather.storm.tall": "Controleer stokken en banden van hoge gewassen: {plants}.",
        "weather.rain": "Zware regen ({mm} mm op {day}): nazorg",
        "weather.rain.desc": "Na de regen: slakkenronde bij schemering (biervallen, rapen), blijf van natte bedden (gebruik "
        "een plank), maak schotels en potten leeg, controleer of het water wegloopt. Wacht enkele dagen met zaaien; "
        "verwijder rottend fruit (grauwe schimmel).",
    }
)
