"""Knowledge base for the Q&A assistant (EN / NL).

``PROBLEMS``: per problem the likely causes, what to do now, ecological
home remedies and prevention.  ``PESTS`` / ``DISEASES``: recognition and
eco control per pest or disease id used in the plant database.  The Q&A
engine combines these with live data (sensors, forecast, plan, tasks).
"""

from __future__ import annotations

KB = dict[str, dict[str, list[str]]]


def _e(causes=(), actions=(), remedies=(), prevention=()) -> dict[str, list[str]]:
    return {
        "causes": list(causes),
        "actions": list(actions),
        "remedies": list(remedies),
        "prevention": list(prevention),
    }


PROBLEMS: dict[str, dict[str, dict[str, list[str]]]] = {
    "growth": {
        "en": _e(
            [
                "Soil too cold for the crop (check soil temperature).",
                "Too little light: shade, short days or a dirty greenhouse roof.",
                "Hungry soil - especially nitrogen for leafy crops.",
                "Drought stress or waterlogged, airless soil.",
                "Root damage (wireworm, cabbage root fly) or a crowded spot.",
            ],
            [
                "Compare soil temperature with the crop's minimum; cover with fleece to warm up.",
                "Feed hungry crops with diluted nettle feed (1:10) every 2 weeks.",
                "Water deeply once or twice a week instead of a little every day.",
                "Thin crowded seedlings to the right spacing.",
            ],
            [
                "Nettle feed for nitrogen, comfrey feed for fruiting crops.",
                "Compost tea as a gentle tonic.",
                "A dark mulch or black fleece warms the soil in spring.",
            ],
            [
                "Sow at the right soil temperature, not by the calendar.",
                "Add 3-5 l compost per m² every year.",
                "Keep the greenhouse glass clean (10-20 % more light).",
            ],
        ),
        "nl": _e(
            [
                "Grond te koud voor het gewas (kijk naar de bodemtemperatuur).",
                "Te weinig licht: schaduw, korte dagen of een vuil serredak.",
                "Hongerige grond - vooral stikstof voor bladgewassen.",
                "Droogtestress of te natte, luchtarme grond.",
                "Wortelschade (ritnaald, koolvlieg) of te dicht op elkaar.",
            ],
            [
                "Vergelijk de bodemtemperatuur met het minimum van het gewas; leg vliesdoek om op te warmen.",
                "Geef hongerige gewassen om de 2 weken verdunde brandnetelgier (1:10).",
                "Geef één à twee keer per week grondig water in plaats van dagelijks een beetje.",
                "Dun te dichte zaailingen uit tot de juiste afstand.",
            ],
            [
                "Brandnetelgier voor stikstof, smeerwortelgier voor vruchtgewassen.",
                "Compostthee als zachte opkikker.",
                "Een donkere mulch of zwart vlies verwarmt de grond in het voorjaar.",
            ],
            [
                "Zaai bij de juiste bodemtemperatuur, niet volgens de kalender.",
                "Geef elk jaar 3-5 l compost per m².",
                "Hou het serreglas proper (10-20 % meer licht).",
            ],
        ),
    },
    "yellow_leaves": {
        "en": _e(
            [
                "Old lower leaves yellowing is normal ageing.",
                "Nitrogen shortage: whole plant pale, oldest leaves first.",
                "Too wet: roots suffocate (yellow + limp).",
                "Magnesium shortage (tomato): yellow between green veins.",
                "Cold nights or a sudden change (just planted out).",
            ],
            [
                "Remove yellow leaves at the bottom (better airflow).",
                "Feed nettle feed 1:10; for tomatoes comfrey feed.",
                "Check soil moisture with a finger 5 cm deep before watering.",
                "Magnesium: Epsom salt 20 g per 10 l water on the soil.",
            ],
            [
                "Nettle feed (nitrogen).",
                "Epsom salt (magnesium sulphate) for tomato and pepper.",
                "Coffee grounds and compost as slow feed.",
            ],
            ["Good drainage: raised beds on heavy soil.", "Regular compost; rotate crops."],
        ),
        "nl": _e(
            [
                "Vergelende oude onderste bladeren is normale veroudering.",
                "Stikstoftekort: hele plant bleek, oudste bladeren eerst.",
                "Te nat: de wortels stikken (geel + slap).",
                "Magnesiumtekort (tomaat): geel tussen groene nerven.",
                "Koude nachten of een plotse verandering (net uitgeplant).",
            ],
            [
                "Haal gele bladeren onderaan weg (betere luchtcirculatie).",
                "Geef brandnetelgier 1:10; voor tomaten smeerwortelgier.",
                "Voel 5 cm diep met een vinger voor je water geeft.",
                "Magnesium: Epsomzout 20 g per 10 l water op de grond.",
            ],
            [
                "Brandnetelgier (stikstof).",
                "Epsomzout (magnesiumsulfaat) voor tomaat en paprika.",
                "Koffiedik en compost als trage voeding.",
            ],
            ["Goede drainage: verhoogde bedden op zware grond.", "Regelmatig compost; wisselteelt."],
        ),
    },
    "wilting": {
        "en": _e(
            [
                "Drought - the most common cause, especially in pots and greenhouses.",
                "Midday heat: leaves droop but recover in the evening (normal).",
                "Root rot or waterlogging.",
                "Wilt diseases (verticillium, fusarium) or root pests (wireworm, vine weevil).",
                "Slugs or cutworms gnawing the stem at soil level.",
            ],
            [
                "Water early in the morning, deeply at the base.",
                "Shade the plants at midday during heat.",
                "If the plant stays limp in moist soil in the evening: check roots and stem base.",
                "Remove plants with brown vascular tissue (wilt disease); don't compost.",
            ],
            [
                "Shade with an old net curtain or a double layer of fleece.",
                "Mulch 5-8 cm to keep the soil cool and moist.",
                "Sunk bottle or olla next to thirsty plants.",
            ],
            ["Mulch and deep watering.", "Grafted tomatoes/cucumbers on resistant rootstocks.", "Crop rotation."],
        ),
        "nl": _e(
            [
                "Droogte - de meest voorkomende oorzaak, zeker in potten en serres.",
                "Middaghitte: bladeren hangen maar herstellen 's avonds (normaal).",
                "Wortelrot of te natte grond.",
                "Verwelkingsziekten (verticillium, fusarium) of wortelplagen (ritnaald, taxuskever).",
                "Slakken of aardrupsen die de stengel op grondhoogte aanvreten.",
            ],
            [
                "Geef 's ochtends vroeg water, grondig aan de voet.",
                "Geef de planten 's middags schaduw bij hitte.",
                "Blijft de plant 's avonds slap in vochtige grond: controleer wortels en stengelvoet.",
                "Verwijder planten met bruine vaatbundels (verwelkingsziekte); niet composteren.",
            ],
            [
                "Schaduw met een oud vitragegordijn of dubbel vliesdoek.",
                "Mulch 5-8 cm om de grond koel en vochtig te houden.",
                "Ingegraven fles of olla naast dorstige planten.",
            ],
            ["Mulch en grondig water geven.", "Geënte tomaten/komkommers op resistente onderstam.", "Wisselteelt."],
        ),
    },
    "no_fruit": {
        "en": _e(
            [
                "No pollinators: cold, rain, or no flowers nearby.",
                "Pollination partner missing (apple, pear, sweet cherry, blueberry, kiwi berry).",
                "Too hot (>32 °C) or too cold at flowering: flowers drop.",
                "Too much nitrogen: lots of leaves, few flowers.",
                "Young tree not bearing yet, or frost on the blossom.",
            ],
            [
                "Hand-pollinate: brush male onto female flowers (cucurbits), shake tomato trusses mid-morning.",
                "Plant a second variety as pollinator.",
                "Shade and ventilate the greenhouse on hot days.",
                "Switch to a potassium feed (comfrey).",
            ],
            [
                "Comfrey feed (potassium) for flowers and fruit.",
                "Borage, phacelia and calendula nearby draw bees.",
                "Fleece over early blossom on frosty nights.",
            ],
            [
                "Flowers in every bed; a bee hotel.",
                "Never spray during bloom.",
                "Varieties suited to the climate (parthenocarpic cucumbers under glass).",
            ],
        ),
        "nl": _e(
            [
                "Geen bestuivers: koud, regen of geen bloemen in de buurt.",
                "Bestuivingspartner ontbreekt (appel, peer, zoete kers, blauwe bes, kiwibes).",
                "Te heet (>32 °C) of te koud tijdens de bloei: bloemen vallen af.",
                "Te veel stikstof: veel blad, weinig bloemen.",
                "Jonge boom draagt nog niet, of vorst op de bloesem.",
            ],
            [
                "Bestuif met de hand: mannelijke op vrouwelijke bloemen wrijven (pompoenachtigen), tomatentrossen 's ochtends schudden.",
                "Plant een tweede ras als bestuiver.",
                "Geef schaduw en verlucht de serre op hete dagen.",
                "Schakel over op kaliumrijke voeding (smeerwortel).",
            ],
            [
                "Smeerwortelgier (kalium) voor bloemen en vruchten.",
                "Bernagie, phacelia en goudsbloem in de buurt lokken bijen.",
                "Vliesdoek over vroege bloesem bij vriesnachten.",
            ],
            [
                "Bloemen in elk bed; een bijenhotel.",
                "Nooit spuiten tijdens de bloei.",
                "Rassen die bij het klimaat passen (parthenocarpe komkommers onder glas).",
            ],
        ),
    },
    "bolting": {
        "en": _e(
            [
                "Long days and heat (lettuce, spinach, coriander, rocket, pak choi).",
                "Cold spell after sowing (beetroot, celery, onions from sets).",
                "Drought stress.",
                "Sown too early or a variety not suited to the season.",
            ],
            [
                "Harvest now - bolting plants turn bitter.",
                "Sow again in shade or late summer.",
                "Pull and compost, or leave a few to flower for insects.",
            ],
            ["Shade cloth or an old curtain over salads in summer.", "Water regularly."],
            [
                "Sow summer salads every 2-3 weeks in small amounts.",
                "Choose bolt-resistant varieties; spinach & coriander in spring and autumn.",
            ],
        ),
        "nl": _e(
            [
                "Lange dagen en hitte (sla, spinazie, koriander, rucola, paksoi).",
                "Koude periode na het zaaien (rode biet, selder, plantuitjes).",
                "Droogtestress.",
                "Te vroeg gezaaid of een ras dat niet past bij het seizoen.",
            ],
            [
                "Oogst nu - doorgeschoten planten worden bitter.",
                "Zaai opnieuw in de schaduw of nazomer.",
                "Uittrekken en composteren, of een paar laten bloeien voor insecten.",
            ],
            ["Schaduwdoek of een oud gordijn over slaatjes in de zomer.", "Regelmatig water geven."],
            [
                "Zaai zomerslaatjes om de 2-3 weken in kleine hoeveelheden.",
                "Kies doorschietresistente rassen; spinazie & koriander in voor- en najaar.",
            ],
        ),
    },
    "pests": {
        "en": _e(
            [
                "Pests strike weakened plants first (drought, too much nitrogen).",
                "No natural enemies yet (early season, sprayed garden).",
                "No physical barrier on vulnerable crops.",
            ],
            [
                "Identify the pest first (look under the leaves, at night with a torch).",
                "Remove by hand or with a strong water jet.",
                "Cover vulnerable crops with insect mesh.",
            ],
            [
                "Soft soap 20 g/l against aphids and whitefly.",
                "Beer traps and evening collecting against slugs.",
                "Yellow sticky cards in the greenhouse.",
            ],
            [
                "Flowers for beneficials (hoverflies, lacewings).",
                "Mixed planting and rotation.",
                "Mesh straight after sowing or planting.",
            ],
        ),
        "nl": _e(
            [
                "Plagen vallen eerst verzwakte planten aan (droogte, te veel stikstof).",
                "Nog geen natuurlijke vijanden (vroeg in het seizoen, bespoten tuin).",
                "Geen fysieke barrière op gevoelige gewassen.",
            ],
            [
                "Bepaal eerst welke plaag (onder de bladeren kijken, 's avonds met een zaklamp).",
                "Verwijder met de hand of met een krachtige waterstraal.",
                "Dek gevoelige gewassen af met insectengaas.",
            ],
            [
                "Zachte zeep 20 g/l tegen bladluis en witte vlieg.",
                "Biervallen en 's avonds rapen tegen slakken.",
                "Gele vangplaten in de serre.",
            ],
            [
                "Bloemen voor nuttige insecten (zweefvliegen, gaasvliegen).",
                "Gemengde teelt en wisselteelt.",
                "Gaas meteen na zaaien of planten.",
            ],
        ),
    },
    "disease": {
        "en": _e(
            [
                "Wet leaves for many hours (rain, evening watering, condensation in the greenhouse).",
                "Crowded plants, still air.",
                "Infected soil or plant debris from last year.",
                "Susceptible variety.",
            ],
            [
                "Remove infected leaves straight away (bin, not compost).",
                "Water in the morning at the base only.",
                "Ventilate the greenhouse, especially in the morning.",
                "Give plants more space.",
            ],
            [
                "Milk spray 1:9 against powdery mildew.",
                "Horsetail tea as a preventive tonic.",
                "Garlic tea against fungi (1:5).",
            ],
            ["Resistant varieties.", "Rotation (3-4 years).", "Clean up and disinfect the greenhouse in autumn."],
        ),
        "nl": _e(
            [
                "Bladeren lang nat (regen, 's avonds water geven, condens in de serre).",
                "Te dicht op elkaar, stilstaande lucht.",
                "Besmette grond of plantenresten van vorig jaar.",
                "Vatbaar ras.",
            ],
            [
                "Verwijder aangetaste bladeren meteen (restafval, niet de compost).",
                "Geef 's ochtends water, alleen aan de voet.",
                "Verlucht de serre, vooral 's ochtends.",
                "Geef de planten meer ruimte.",
            ],
            [
                "Melkspray 1:9 tegen echte meeldauw.",
                "Heermoesthee als preventieve versterker.",
                "Knoflookthee tegen schimmels (1:5).",
            ],
            ["Resistente rassen.", "Wisselteelt (3-4 jaar).", "De serre in het najaar opruimen en ontsmetten."],
        ),
    },
    "slugs": {
        "en": _e(
            ["Mild, wet weather; mulch and boards give hiding places.", "Young seedlings planted out too small."],
            [
                "Collect at dusk and after rain.",
                "Beer traps (rim 2 cm above soil).",
                "Raise sturdy plants in pots before planting out.",
            ],
            [
                "Ring of wood ash, grit or crushed eggshell (only works while dry).",
                "A board or cabbage leaf as a trap.",
                "Coffee grounds around seedlings.",
            ],
            [
                "Welcome hedgehogs, toads, thrushes and ground beetles.",
                "Water in the morning, not in the evening.",
                "Keep bed edges short-mown.",
            ],
        ),
        "nl": _e(
            ["Zacht, nat weer; mulch en planken bieden schuilplaatsen.", "Te kleine zaailingen uitgeplant."],
            [
                "Raap bij schemering en na regen.",
                "Biervallen (rand 2 cm boven de grond).",
                "Kweek stevige planten in potjes voor je uitplant.",
            ],
            [
                "Ring van houtas, grit of gemalen eierschalen (werkt enkel als het droog blijft).",
                "Een plank of koolblad als val.",
                "Koffiedik rond zaailingen.",
            ],
            [
                "Verwelkom egels, padden, lijsters en loopkevers.",
                "Geef 's ochtends water, niet 's avonds.",
                "Hou randen rond de bedden kort gemaaid.",
            ],
        ),
    },
    "too_hot": {
        "en": _e(
            ["Sun on the glass with closed vents.", "No shading in summer.", "Dry air: spider mite and flower drop."],
            [
                "Open all vents and the door early in the morning.",
                "Put up shading (net, paint, old curtain).",
                "Damp down the floor and paths at midday.",
                "Water in the morning.",
            ],
            [
                "A bucket of water as thermal mass.",
                "Old bed sheet or net curtain as shade cloth.",
                "Whitewash (chalk + water) as shade paint.",
            ],
            ["Automatic vent openers.", "Shading from mid-spring.", "A fan for air movement."],
        ),
        "nl": _e(
            ["Zon op het glas met gesloten ramen.", "Geen schaduw in de zomer.", "Droge lucht: spint en bloemval."],
            [
                "Zet 's ochtends vroeg alle ramen en de deur open.",
                "Breng schaduw aan (doek, kalk, oud gordijn).",
                "Maak 's middags de vloer en paden nat.",
                "Geef 's ochtends water.",
            ],
            [
                "Een emmer water als warmtebuffer.",
                "Oud laken of vitrage als schaduwdoek.",
                "Witkalk (krijt + water) als schaduwkalk.",
            ],
            ["Automatische raamopeners.", "Schaduw vanaf half voorjaar.", "Een ventilator voor luchtbeweging."],
        ),
    },
    "frost": {
        "en": _e(
            [
                "Clear, still night after a cold day.",
                "Tender crops planted out before the last frost date.",
                "Low spots collect cold air.",
            ],
            [
                "Cover tender crops with fleece (double layer) before dusk.",
                "Close the greenhouse in time; water butts inside buffer heat.",
                "Bring pots indoors.",
                "Water the soil in the afternoon: moist soil releases more heat at night.",
            ],
            [
                "Old bed sheets, cardboard boxes or upturned buckets over plants.",
                "Bubble wrap on the greenhouse glass.",
                "Bottles of warm water between plants under fleece.",
            ],
            [
                "Plant out tender crops after the last frost date (Hortulus waits for you).",
                "Keep fleece ready in autumn and spring.",
            ],
        ),
        "nl": _e(
            [
                "Heldere, windstille nacht na een koude dag.",
                "Gevoelige gewassen uitgeplant voor de laatste vorstdatum.",
                "Lage plekken verzamelen koude lucht.",
            ],
            [
                "Dek gevoelige gewassen voor de schemering af met vliesdoek (dubbel).",
                "Sluit de serre op tijd; regentonnen binnen bufferen warmte.",
                "Zet potten binnen.",
                "Geef 's namiddags water: vochtige grond geeft 's nachts meer warmte af.",
            ],
            [
                "Oude lakens, kartonnen dozen of omgekeerde emmers over de planten.",
                "Noppenfolie tegen het serreglas.",
                "Flessen warm water tussen de planten onder vliesdoek.",
            ],
            [
                "Plant gevoelige gewassen pas uit na de laatste vorstdatum (Hortulus wacht voor je).",
                "Hou vliesdoek klaar in najaar en voorjaar.",
            ],
        ),
    },
    "soil": {
        "en": _e(
            [
                "Heavy clay: wet and cold in spring, cracks in summer.",
                "Sandy soil: dries out and washes out nutrients.",
                "Compacted by walking on wet beds.",
            ],
            [
                "Add 3-5 l compost per m² every year.",
                "Never walk on beds; work from paths or a plank.",
                "Loosen with a fork without turning (broadfork).",
            ],
            [
                "Leaf mould and grass clippings as mulch.",
                "Green manure in every empty bed.",
                "Wood ash for potassium (not for potatoes).",
            ],
            ["Permanent beds and paths.", "Keep the soil covered all year.", "A soil test every 3 years (pH 6.5-7)."],
        ),
        "nl": _e(
            [
                "Zware klei: nat en koud in het voorjaar, scheuren in de zomer.",
                "Zandgrond: droogt uit en spoelt voedingsstoffen weg.",
                "Verdicht door op natte bedden te lopen.",
            ],
            [
                "Geef elk jaar 3-5 l compost per m².",
                "Loop nooit op de bedden; werk vanaf de paden of een plank.",
                "Maak los met een riek zonder te keren (grelinette).",
            ],
            [
                "Bladaarde en grasmaaisel als mulch.",
                "Groenbemester in elk leeg bed.",
                "Houtas voor kalium (niet bij aardappel).",
            ],
            ["Vaste bedden en paden.", "Hou de grond het hele jaar bedekt.", "Om de 3 jaar een bodemstaal (pH 6,5-7)."],
        ),
    },
}
# Problems that reuse another entry.
PROBLEMS["too_cold"] = PROBLEMS["frost"]

PESTS: dict[str, dict[str, str]] = {
    "aphids": {
        "en": "Aphids: water jet, soft soap 20 g/l, ladybirds and hoverflies; less nitrogen.",
        "nl": "Bladluis: waterstraal, zachte zeep 20 g/l, lieveheersbeestjes en zweefvliegen; minder stikstof.",
    },
    "slugs": {
        "en": "Slugs: collect at dusk, beer traps, grit or wood-ash rings, hedgehogs.",
        "nl": "Slakken: 's avonds rapen, biervallen, ringen van grit of houtas, egels.",
    },
    "whitefly": {
        "en": "Whitefly: yellow cards, Encarsia wasps, French marigolds, soft soap.",
        "nl": "Witte vlieg: gele vangplaten, sluipwesp Encarsia, Afrikaantjes, zachte zeep.",
    },
    "red_spider_mite": {
        "en": "Spider mite: raise humidity (damp the floor), predatory mite Phytoseiulus.",
        "nl": "Spint: luchtvochtigheid verhogen (vloer natmaken), roofmijt Phytoseiulus.",
    },
    "cabbage_white": {
        "en": "Cabbage white: insect mesh, pick off eggs and caterpillars, nasturtium as trap crop.",
        "nl": "Koolwitje: insectengaas, eitjes en rupsen weghalen, Oost-Indische kers als vangplant.",
    },
    "cabbage_root_fly": {
        "en": "Cabbage root fly: mesh or a cardboard collar around the stem.",
        "nl": "Koolvlieg: gaas of een kartonnen kraag rond de stengel.",
    },
    "carrot_fly": {
        "en": "Carrot fly: mesh or a 60 cm fleece fence, onions alongside, thin in the evening.",
        "nl": "Wortelvlieg: gaas of een vliesscherm van 60 cm, uien ernaast, 's avonds dunnen.",
    },
    "onion_fly": {
        "en": "Onion fly: mesh, carrots alongside, sets rather than seed.",
        "nl": "Uienvlieg: gaas, wortelen ernaast, plantuitjes i.p.v. zaad.",
    },
    "leek_moth": {
        "en": "Leek moth: insect mesh from May; remove affected leaves.",
        "nl": "Preimot: insectengaas vanaf mei; aangetaste bladeren weg.",
    },
    "flea_beetle": {
        "en": "Flea beetle: keep the soil moist, fleece, sow when growing fast.",
        "nl": "Aardvlo: grond vochtig houden, vliesdoek, zaaien als het snel groeit.",
    },
    "colorado_beetle": {
        "en": "Colorado beetle: collect beetles and orange egg clusters under the leaves.",
        "nl": "Coloradokever: kevers en oranje eitjes onder de bladeren rapen.",
    },
    "black_bean_aphid": {
        "en": "Black bean aphid: pinch out the tops of broad beans once pods set.",
        "nl": "Zwarte bonenluis: top de tuinbonen zodra de eerste peulen zetten.",
    },
    "codling_moth": {
        "en": "Codling moth: cardboard band round the trunk from June, nest boxes for tits.",
        "nl": "Fruitmot: golfkartonband rond de stam vanaf juni, nestkastjes voor mezen.",
    },
    "winter_moth": {
        "en": "Winter moth: grease bands at 1 m height from October to March.",
        "nl": "Wintervlinder: lijmbanden op 1 m van oktober tot maart.",
    },
    "birds": {
        "en": "Birds: fine net, pegged down, a few weeks before ripening.",
        "nl": "Vogels: fijn net, vastgepind, enkele weken voor de rijping.",
    },
    "gooseberry_sawfly": {
        "en": "Sawfly: check the centre of the bush from April and pick off larvae.",
        "nl": "Bladwesp: vanaf april het hart van de struik nakijken en larven weghalen.",
    },
    "spotted_wing_drosophila": {
        "en": "Drosophila suzukii: pick daily, remove overripe fruit, fine mesh.",
        "nl": "Drosophila suzukii: dagelijks plukken, overrijp fruit weg, fijn gaas.",
    },
    "wireworm": {
        "en": "Wireworm: potato pieces on a stick as a trap; not straight after grass.",
        "nl": "Ritnaald: stukjes aardappel op een stokje als val; niet meteen na grasland.",
    },
    "thrips": {
        "en": "Thrips: blue sticky cards, raise humidity.",
        "nl": "Trips: blauwe vangplaten, luchtvochtigheid verhogen.",
    },
}
DISEASES: dict[str, dict[str, str]] = {
    "late_blight": {
        "en": "Late blight: roof over tomatoes, water the soil, remove lower leaves, resistant varieties; bin infected plants.",
        "nl": "Phytophthora: overkapping boven tomaten, water op de grond, onderste bladeren weg, resistente rassen; zieke planten in de restafval.",
    },
    "powdery_mildew": {
        "en": "Powdery mildew: milk spray 1:9, even watering, airy spacing.",
        "nl": "Echte meeldauw: melkspray 1:9, regelmatig water, luchtige teelt.",
    },
    "downy_mildew": {
        "en": "Downy mildew: water in the morning, ventilate, remove spotted leaves.",
        "nl": "Valse meeldauw: 's ochtends water geven, verluchten, gevlekte bladeren weg.",
    },
    "botrytis": {
        "en": "Grey mould: ventilate, remove dead tissue and rotting fruit, avoid wounds.",
        "nl": "Grauwe schimmel: verluchten, dood weefsel en rottende vruchten weg, wonden vermijden.",
    },
    "blossom_end_rot": {
        "en": "Blossom-end rot: a calcium uptake problem from uneven watering - water regularly, mulch.",
        "nl": "Neusrot: kalkopnameprobleem door onregelmatig water geven - regelmatig gieten, mulchen.",
    },
    "clubroot": {
        "en": "Clubroot: lime to pH 7+, long rotation (7 years), raise plants in clean compost.",
        "nl": "Knolvoet: bekalken tot pH 7+, lange rotatie (7 jaar), planten opkweken in propere potgrond.",
    },
    "scab": {
        "en": "Scab: resistant varieties, rake up fallen leaves, horsetail tea.",
        "nl": "Schurft: resistente rassen, afgevallen blad opruimen, heermoesthee.",
    },
    "brown_rot": {
        "en": "Brown rot: remove mummified fruit and wilted shoots immediately.",
        "nl": "Moniliarot: mummievruchten en verwelkte scheuten meteen verwijderen.",
    },
    "rust": {
        "en": "Rust: remove affected leaves, don't overfeed nitrogen, wider spacing.",
        "nl": "Roest: aangetaste bladeren weg, niet te veel stikstof, ruimer planten.",
    },
    "peach_leaf_curl": {
        "en": "Leaf curl: rain shelter from leaf fall to April.",
        "nl": "Krulziekte: regendak van bladval tot april.",
    },
    "white_rot": {
        "en": "White rot: long rotation for alliums, don't move infected soil.",
        "nl": "Witrot: lange rotatie voor uien, besmette grond niet verplaatsen.",
    },
    "damping_off": {
        "en": "Damping off: clean pots, fresh seed compost, water from below, airflow.",
        "nl": "Kiemplantenziekte: propere potjes, verse zaaigrond, water van onderen, luchtcirculatie.",
    },
}
