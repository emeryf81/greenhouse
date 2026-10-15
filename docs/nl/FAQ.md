# Veelgestelde vragen & problemen oplossen

De vragen zijn gegroepeerd: [Algemeen](#algemeen) · [Planning](#planning) ·
[Weer en klimaatgeschiedenis](#weer-en-klimaatgeschiedenis) · [Koken](#koken) ·
[Logboek en gegevens](#logboek-en-gegevens) · [Entiteiten, spraak en dashboards](#entiteiten-spraak-en-dashboards) ·
[Afdrukken, handboek, automatisch invullen](#afdrukken-handboek-automatisch-invullen) · [Veiligheid van de bewatering](#veiligheid-van-de-bewatering) ·
[Problemen oplossen](#problemen-oplossen)

## Algemeen

**Heb ik sensoren nodig?**
Nee. Zonder sensoren plant, roostert en herinnert Hortulus gewoon. Bodemsensoren voegen
vochtstatus en nauwkeurige beregening toe; de bodemtemperatuur laat het zaaiadvies wachten op
warme grond; een kasthermometer maakt live ventilatieadvies mogelijk.

**Heb ik een weersverwachting nodig?**
Aanbevolen. Zonder verwachting wordt het vorstrisico `unknown` (of *low/moderate* op basis van de
huidige buitentemperatuur als het al koud is), valt de beregening terug op de sensor alleen en
kan het uitplanten niet wachten op vorstvrije nachten. Kies de weerentiteit bij
**Instellingen › Weer & buitensensoren**.

**Waarom `garden_manager.*` en niet `garden.*`?**
Home Assistant eist dat acties het domein van de integratie gebruiken. De map en het domein van
de integratie is `garden_manager`; het product heet Hortulus.

**Gaat er iets naar internet?**
Home Assistant zelf maakt alleen verbinding naar buiten als je **Open‑Meteo** aanzet
(Instellingen → Weer): dan haalt het een verwachting en, één keer per dag, het waargenomen weer
van de laatste 31 dagen (voor de [klimaatgeschiedenis](#weer-en-klimaatgeschiedenis)) op bij
api.open‑meteo.com, met de coördinaten van de tuin afgerond op twee decimalen (~1 km). De plantendatabase, het handboek,
alle tekeningen en het kookboek zitten in de integratie; foto's die je toevoegt gaan via de
eigen `image_upload` van Home Assistant en blijven in je configuratiemap. Twee dingen worden door
*je browser* geladen, niet door Home Assistant: plantfoto's van Wikipedia (standaard aan, uit te
zetten onder **Instellingen → Weergave**) en, in het tabblad Weer, de publieke radarkaart van
Buienradar als je geen radarcamera in Home Assistant hebt (zie hieronder).

**Zuidelijk halfrond?**
Volledig ondersteund: kies een zuidelijke voorinstelling, een USDA‑zone met het *zuidelijk*
halfrond, of je eigen data. Seizoenen lopen van juli tot juni en dragen de naam van het jaar
waarin de lente begint. Het kleurthema van het seizoen volgt ook het halfrond.

**Is Hortulus ook in het Frans beschikbaar?**
Ja. Nederlands, Engels en Frans zijn compleet: paneel, taken en meldingen, handboek en
woordenlijst, plantnamen en tips, seizoensboek, kookboek, Assist‑zinnen en de schermen van Home
Assistant. Kies **Français** bij **Instellingen › Algemeen › Taal**, of laat het op *Volg Home
Assistant* staan. Datums en getallen gebruiken Belgische notaties (fr‑BE, nl‑BE). De taal van
gegenereerde taken kun je apart instellen in de opties van de integratie (Geavanceerd).

**Waar zijn Planten, Advies en Instellingen gebleven? Hoe is het menu ingedeeld?**
Het menu heeft acht plaatsen: **Vandaag**, **Tuin** (Planner, Tuinplan, Teelten), **Kalender**,
**Weer**, **Logboek**, **Koken**, **Kennis** (Planten, Advies, Handboek) en **Beheer** (Analyse,
Afdrukken, Instellingen). De tabbladen van een plaats staan in een rij boven de pagina; een
plaats opent op het tabblad dat je er laatst gebruikte. Op een gsm verhuizen de plaatsen naar
een balk onderaan en Instellingen naar de balk bovenaan.

**Kan ik het uiterlijk aanpassen? Wat zijn de thema's?**
Ja, bij **Instellingen → Weergave**. *Kleurthema*: **Klassiek groen** (bladgroen en goudsbloem),
**Aarde** (terracotta en klei), **Nacht** (altijd donker, maanlicht‑mint) of **Seizoen**, dat het
jaar volgt (lente, zomer, herfst, winter, rekening houdend met het halfrond). *Licht of donker*:
**Automatisch** (volgt Home Assistant of het toestel), altijd licht of altijd donker. In Home
Assistant wordt de kleurkeuze bij je gebruiker bewaard en volgt ze je naar elk toestel; de
schakelaar voor Wikipedia‑foto's geldt per browser. Animaties (de bladeren die opstuiven als je
een taak afvinkt, vervagende weergaven, laadskeletten) stoppen als je toestel op *beweging
beperken* staat.

**Wat is het wandscherm?**
Een rustige, grote kioskweergave voor een tablet in de keuken of het tuinhuis: de klok, het weer
nu, de taken van vandaag met grote vinkvakjes, een vooruitblik van drie dagen, het vocht van je
bedden en elke melding (vorst, lek, een kraan die openstaat). Zonder menu's; het dimt tussen
22:00 en 06:00. Open het met **Wandscherm** op het tabblad Vandaag, of ga naar `/hortulus/wall`.
*Sluiten* (rechtsboven) brengt je terug.

**Kan ik meerdere tuinen beheren?**
Ja. Voeg Hortulus nog eens toe (Instellingen › Apparaten & diensten › Integratie toevoegen) voor
een volkstuin of een tweede perceel en hernoem het item (bv. “Volkstuin”). Elke tuin heeft zijn
eigen plan, taken, dagboek, oogst en kookboek. Bovenaan het paneel kies je de tuin; je browser
onthoudt je keuze. Elke actie accepteert `garden: Volkstuin` (titel of entry‑id), de
dashboardkaart `garden: Volkstuin`. Zonder keuze gaat alles naar de eerste tuin, die precies
blijft zoals hij was. Voor een paar bedden aan de voorkant volstaan ook gewoon extra zones in
hetzelfde plan.

**Is er een websiteversie?**
Het paneel is zo geschreven dat dezelfde code en engine in een browser buiten Home Assistant
kunnen draaien (“Hortulus Web”). Wat deze repository ervan toont: het paneel kan gestart worden
met een beperkte lijst tabbladen (`panel.config.tabs`), zodat bezoekers een alleen‑lezen weergave
**Tuin** krijgen van een plan dat de eigenaar deelt – klik een zone, bed, gewas of element voor de
details, kies het jaar – en gedeelde recepten; het kookboek kan *een recept naar de kok mailen* in
plaats van het naar een gsm te sturen; en een plan dat daar geëxporteerd is, kan in Home Assistant
geïmporteerd worden (zones, bedden, elementen, seizoensplannen en gewassen komen allemaal mee). Ook
de website houdt een klimaatgeschiedenis bij (zie
[Houdt de website geschiedenis bij?](#weer-en-klimaatgeschiedenis)). In
Home Assistant verandert hier niets aan. Hosting, accounts en beschikbaarheid van de website
maken geen deel uit van deze repository en worden hier niet beschreven.

## Planning

**Waarom is mijn zaaitaak “te laat”?**
Ofwel is het zaaivenster begonnen en heb je een expliciete datum in het verleden ingesteld, ofwel
is de taak aangemaakt uit een reeks opeenvolgende zaaimomenten met vaste datums. Rond haar af,
stel haar uit of pas de geplande datum aan in de details van de planner. Taken die van een
achterstallige voorgaande taak *afhangen* (uitdunnen na het zaaien) schuiven vanzelf op tot de
voorgaande taak gedaan is.

**De zaaitaak zegt “wachten”.**
Bij ter plaatse zaaien is de bodemsensor kouder dan de minimale kiemtemperatuur van de plant
(bonen willen bv. 12 °C), of – bij uitplanten – wordt vorst verwacht onder de minimumtemperatuur
van de plant. De taak schuift naar morgen en de reden staat in de omschrijving.

**Houdt de planning rekening met het weer?**
Ja. Met **Taken plannen volgens het weer** (standaard aan) schuiven zaaien, uitplanten, afharden,
snoeien, bodem klaarmaken en dergelijke klussen binnen hun venster naar de dichtstbijzijnde
geschikte dag (geen regen, vorst, hitte of storm). Bestaat zo'n dag niet, dan krijgt de taak een
weerwaarschuwing. Hortulus maakt ook taken voor hitte, droogte, storm en zware regen, met
ecologische tips – en achteraf, uit het gelogde weer, nazorgtaken na een storm, een stortbui of
een droge week (zie [Weer en klimaatgeschiedenis](#weer-en-klimaatgeschiedenis)).

**Waarom krijg ik geen oogsttaken voor afrikaantjes?**
Begeleidende bloemen zijn gemarkeerd met `harvestable: false`. Zet dat op true in een eigen
plant of override als je ze voor de vaas kweekt.

**Opeenvolgende zaaimomenten werden overgeslagen.**
Zaaimomenten die na het laatste zaaivenster zouden vallen, worden met opzet weggelaten; de
planner zegt hoeveel.

**Twee beplantingen overlappen maar er verschijnt geen waarschuwing.**
Ze staan niet tegelijk in de grond (bv. radijs wordt geoogst voordat de bonen erin gaan).
Overlap‑ en buurplantencontroles kijken alleen naar beplantingen waarvan de bezettingsperioden
overlappen. Gebruik *Toon tuin op* om te zien wat er op een bepaalde datum in het bed staat.

**Hoe wordt het “bereik buurplanten” gebruikt?**
Twee beplantingen beïnvloeden elkaar als hun oppervlakten binnen
`max(bereik, (afstand_a + afstand_b) / 2)` van elkaar liggen; de invloed neemt lineair af met de
afstand.

**Hoe werken het tuinplan per jaar en de jaarovergang?**
In **Tuinplan** geef je de tuin vorm, zonder planten: zones (buiten, kas, koude bak, bloembakken
& potten, boomgaard, voedselbos …), bedden en elementen zoals oprit, huis, regenton, haag, gazon,
tuinhuis of een pad in de kas. Dat plan geldt voor één seizoen. In de **Planner** beplant je dat
seizoen op zijn plan; zones en bedden liggen daar vast. De planner werkt in vijf stappen –
terrein, teeltzones, bedden, meerjarigen, eenjarigen – en elk onderdeel kun je alleen in zijn
eigen stap bewerken.

Niets gaat vanzelf naar een nieuw jaar, meerjarigen inbegrepen. Open op het einde van het jaar de
**Jaarovergang** (knop in Tuinplan en Planner; in januari herinnert Advies je eraan). Neem alles
mee, of vink aan welke zones, elementen en meerjarigen meegaan (of gebruik het plan dat je al voor
volgend jaar tekende), welke overwinterende gewassen (knoflook, winterprei …) overgaan, en of het
nieuwe jaar meteen je actieve tuin wordt. Het oude plan wordt gearchiveerd; alles staat in het
systeemlogboek en kan teruggedraaid worden.

**Mijn appelboom staat elk jaar opnieuw in het plan – hoe haal ik hem weg?**
Meerjarigen (fruitbomen, bessen, asperge, vaste kruiden) gaan alleen naar een volgend seizoen mee
als je ze opneemt in de **Jaarovergang**. Om er een uit het huidige seizoen te halen, selecteer je
de plant in de planner en kies je **Verwijderen**. Je krijgt twee keuzes: **Weg vanaf dit
seizoen** (eerdere jaren behouden hem voor wisselteelt en historiek) of **Volledig wissen**.

**Kan ik opnieuw beginnen met een nieuw tuinplan?**
Ja. In **Tuinplan → Plannen** kies je **Nieuw plan beginnen**: volledig leeg (vanaf nul), met
dezelfde zones maar zonder bedden of gewassen, of met zones en bedden maar zonder gewassen. Het
huidige plan wordt **niet‑actief**: het blijft bewaard met zijn naam, bedden en gewassen, en met
**Activeren** haal je het later terug (het plan dat op dat moment actief is, wordt dan op zijn
beurt niet‑actief). Een niet‑actief plan dat je niet meer nodig hebt, kan verwijderd worden (het
verwijderen kan teruggedraaid worden vanuit het systeemlogboek). Opzijgezette plannen zitten in een
export en een import.

**Kan ik twee plannen vergelijken?**
Ja, in **Analyse → Vergelijken** of in **Tuinplan → Plannen** (knop *Vergelijk* bij een
niet‑actief plan). Je ziet welke zones, bedden, elementen en gewassen toegevoegd, verdwenen of
veranderd zijn.

**Kan ik de datums van mijn gewassen aanpassen zonder te slepen?**
Ja, het tabblad **Teelten** toont elk gewas van een seizoen (per bed, per gewas of op datum). Pas
daar methode, status, aantal, geplande en echte zaai‑, uitplant‑, oogst‑ en einddatums en notities
rechtstreeks aan. Laat je een geplande datum leeg, dan berekent Hortulus haar (grijs eronder).
Klik op een plant voor alle details. De weergave **Tijdlijn** toont het jaar per bed als balken;
sleep een gepland gewas opzij om zijn zaaien en uitplanten te verschuiven.

**Kan ik meerdere teelten tegelijk aanpassen?**
Ja. Vink de gewassen aan in **Teelten**; er verschijnt een balk om de status en/of een datum (bv.
*Gezaaid op* = vandaag) voor allemaal tegelijk te zetten. Dat is één regel in het systeemlogboek
en kan in één keer teruggedraaid worden. **Toon op kaart** springt naar het gewas in de planner;
**In Teelten** in de plannerpopup brengt je terug.

**Wat moet ik deze week zaaien, en welke zaden heb ik nodig?**
**Teelten** heeft naast de lijst vier weergaven: **Zaaiplan** (week per week wat je binnen of
buiten zaait, uitplant en begint te oogsten; **Gedaan** vult de echte datum in), **Zaden** (het
zaad dat het plan nodig heeft tegenover je voorraad), **Opvolgteelt** (bedden die dit seizoen
vrijkomen en wat daar nog past) en **Oogstverwachting** (kg per week; wordt nauwkeuriger met je
eigen oogsten). Op een gsm toont de lijst één kaartje per gewas.

**Waarom past een plant niet waar ik hem zet?**
Klik in de planner op het gewas en kies **Waarom (niet) hier?**: je ziet elke reden waarom het bed
niet past (te laat, verkeerd zonetype, niet onder glas, vorst vóór de oogst, wisselteelt, slechte
buur, geen plaats) en welke bedden wel zouden passen. Sleep je een plant naar een bed waar hij niet
hoort, dan verschijnt die uitleg meteen boven de kaart. Klik op een bed om te zien welke
plantenfamilies er de laatste vijf jaar groeiden.

**Kan ik herinneringen krijgen voor taken die ik vergeten ben?**
Ja. Onder **Instellingen › Meldingen › Herinneringen** stel je een tijdstip in voor de dagelijkse
herinnering van achterstallige taken (per taak zie je of het nog kan, of het te laat is en je
beter overslaat) en een **weekoverzicht vooraf** op een dag naar keuze. Ze gebruiken dezelfde
kanalen als de andere meldingen.

**Kunnen meerdere mensen het werk verdelen?**
Ja. Elke taak kan aan een persoon (`person.*`‑entiteit) toegewezen worden. Kies onder
**Instellingen › Huishouden & spraak** wie nieuwe taken standaard krijgt en per soort taak, en een
notify‑dienst per persoon: iedereen krijgt dan zijn eigen dagoverzicht en herinneringen voor
achterstallige taken. De dashboardkaart kan enkel jouw taken tonen (`assignee: me`).

**Kan ik vanaf mijn gsm op een melding reageren?**
Ja, met de Home Assistant‑app: het ochtendoverzicht en de herinneringen hebben **Gedaan** (bij één
taak), **Morgen** en – als bedden water nodig hebben – **Nu water geven**. Een kraan die open
bleef staan heeft **Kraan sluiten**.

**Waar vind ik het weer en de buienradar?**
In het tabblad **Weer**: het weer nu, een grafiek van de komende 24 uur (temperatuur over regen),
de komende tien dagen met een temperatuurbalk en labels voor vorst en hitte, en wat het
betekent voor de tuin (vorstnachten, warme dagen, regen zodat water geven kan wachten, een droge
periode, bedden die water nodig hebben). De **buienradar** toont een radarcamera van Home
Assistant als die er is (een `camera.*`‑entiteit waarvan het id *buienradar*, *radar*, *regen* of
*rain* bevat, bv. van de Buienradar‑integratie). Zonder zo'n camera toont Hortulus de publieke
kaart van Buienradar als het land van Home Assistant Nederland of België is, elke 5 minuten
ververst; elders is er geen radar. De verwachting komt van de weerentiteit die je bij Instellingen
koos. Onder de verwachting staat de **Klimaatgeschiedenis**: wat het weer hier echt deed (zie
[hieronder](#weer-en-klimaatgeschiedenis)).

**Wanneer moet ik insectengaas leggen?**
Hortulus volgt een **plagenkalender**: voor wortelvlieg, koolvlieg, koolwitje, uienvlieg, preimot,
bladluis, aardvlo, coloradokever en andere rekent het met de graaddagen van dit seizoen uit
wanneer ze vliegen. Zolang het klimaatlogboek nog kort is, gebruikt het de gebruikelijke maanden.
Slakken volgen het weer: regen met zachte nachten. Je krijgt een taak om gaas te leggen een paar
dagen vóór een vlucht, een wekelijkse controle of een slakkenronde 's avonds, en een kaart
**Plagen in de tuin** op het dashboard. Alleen voor gewassen die (binnenkort) in de grond staan.
Met **Ecologische tips** aan (aanbevolen, nooit verplicht) komt bij elke plaagwaarschuwing ook een
biologisch antwoord.

**Welke sensoren moet ik kopen?**
Zie het handboekhoofdstuk **Sensoren kiezen en kopen**: begin met een kasthermometer en één
bodemvochtsensor in je belangrijkste bed.

**Gebruikt Hortulus mijn bodemanalyse?**
Ja. Selecteer een bed in de planner en voeg een **bodemanalyse** toe (pH, organische stof, P, K,
Mg en kalk uit een labrapport of thuistest). Het bemestingsplan, het kalkadvies en de
boodschappenlijst van het bed volgen de laatste analyse: minder fosfaat bij een hoge P, kalk
alleen als de pH te laag is voor de gewassen, meer compost bij weinig organische stof.

## Weer en klimaatgeschiedenis

**Houdt Hortulus rekening met het weer voor de groei?**
Ja, met het weer dat er echt was, niet alleen met de verwachting. Hortulus houdt een
**klimaatgeschiedenis** bij (minimum, maximum en gemiddelde temperatuur, vochtigheid, wind,
regen, straling en zonuren per dag) en de motor rekent ermee:

* **Groei** – graaddagen sinds het planten verschuiven de oogstdatum. Kasgewassen tellen de
  graaddagen van hun eigen luchtsensor (of de buitendag met kasbuffering). Gelogde hittedagen
  (laatste maand) en een reeks sombere dagen vertragen vruchtgewassen; gewassen zonder
  graaddagenmodel worden opgehouden door gelogde koude dagen onder hun minimum. De gewaspopup
  toont de vertraging en waarom.
* **Water** – de waterbalans boekt elke voorbije dag met Penman‑Monteith op de gelogde
  vochtigheid, wind en zon of straling: winderige, zonnige dagen drogen bedden sneller uit.
* **Ziekte** – twee vochtige, warme dagen die **al gebeurd** zijn (Hutton‑criteria) geven een
  hoge druk van aardappelziekte; meerdere natte dagen achter de rug verhogen het niveau.
* **Zaaien** – direct zaaien wacht op warme grond: de bodemtemperatuur is de laagste van de
  meting nu en het gemiddelde van de laatste dagen, dus één warme middag telt niet.
* **Taken** – een controle na een storm (windstoten ≥ 60 km/u), de slakkenronde na een stortbui
  (dezelfde taak die de verwachting zou maken, nooit twee keer) en flink water na een droge
  week; en een waarschuwing als het gevroren heeft terwijl tere gewassen buiten stonden.

**Waar vind ik de klimaatgeschiedenis / temperatuurstatistiek?**
In het tabblad **Weer**, onder de verwachting: **Klimaatgeschiedenis**. Je ziet een dagelijkse
grafiek van temperatuur en regen (30 dagen, 90 dagen of 1 jaar), *Recent, vergeleken met vorig
jaar* (laatste 7 dagen, laatste 30 dagen en dit seizoen: gemiddeld, laagste, hoogste, regen,
vorstnachten, dagen ≥ 25 °C, zonneschijn, hardste wind, graaddagen, verdamping), **Records**,
**Alle temperatuursensoren** (nu, vandaag, gem. 7 d, min–max 30 d, laagste en hoogste ooit),
**Maand per maand** en de **Vorstdata**. In Home Assistant zelf zijn er vier sensoren (regen,
gemiddelde temperatuur en zonneschijn over 7 dagen, vorstnachten dit seizoen) met de waarde van
vorig jaar als attribuut – zie [Entiteiten → Klimaatgeschiedenis](ENTITEITEN.md#klimaatgeschiedenis).
Een nieuwe tuin begint leeg; de geschiedenis groeit dag na dag.

**Wat als Home Assistant uit stond?**
Dan vult Hortulus het gat achteraf, één keer per dag en bij het opstarten: eerst uit de
**recorder** van Home Assistant (de toestanden van dezelfde temperatuur‑, vochtigheids‑ en
windsensoren, voor de laatste 30 dagen – zolang de recorder ze nog bewaart, standaard 10 dagen)
en, als **Open‑Meteo** aan staat, uit het **waargenomen** dagweer van Open‑Meteo voor de laatste
31 dagen. Eigen metingen winnen altijd; de recorder combineert de uitersten; Open‑Meteo vult
alleen aan wat niet goed gemeten is. In de grafiek zie je per dag waar de gegevens vandaan komen.
Meer details: [Configuratie → Klimaatgeschiedenis](CONFIGURATIE.md#klimaatgeschiedenis).

**Welke weerstationsensoren helpen?**
Bij **Instellingen → Weer & buitensensoren** kun je naast buitentemperatuur, luchtvochtigheid,
regen en bladnat ook **Windsnelheid**, **Windstoten**, **Zonnestraling (W/m²)** en **Licht
buiten (lux)** koppelen. Ze maken de geschiedenis exact: wind en zon of straling voeden de
Penman‑Monteith‑verdamping (dus de waterbalans), windstoten de taak na een storm, straling de
zonuren en de sombere dagen, en vochtigheid het ziekterisico. Een lux‑sensor wordt omgerekend
als er geen stralingssensor is; windeenheden (m/s, mph, kn) worden naar km/u omgezet. Een
regenmeter (dagtotaal in mm) is beter dan de verwachting, die Hortulus anders voor vandaag boekt.
Zonder weerstation vullen de weerentiteit en Open‑Meteo aan.

**Hoe worden vorstdata gemeten?**
Per jaar onthoudt Hortulus de **laatste dag met een buitenminimum onder 0 °C** in de
voorjaarshelft (januari–juni; zuidelijk halfrond juli–december) en de **eerste** in de
herfsthelft. Een halfjaar telt pas als het voorbij is en minstens 80 % van zijn dagen gelogd is.
Het gemiddelde van die volledige jaren staat in *Vorstdata* naast de data van je regio
(“… dagen vroeger / later”). Hortulus verandert je vorstdata nooit zelf: wijkt het sterk af,
stel je eigen data in bij **Instellingen → Klimaat & regio** en alle zaaivensters schuiven mee.

**Hoe lang blijft de geschiedenis bewaard?**
Dagen buiten blijven ruim twee seizoenen (800 dagen), dagen per temperatuursensor 400 dagen.
Daarna worden ze samengevoegd tot maandcijfers (minimum, maximum, gemiddelde, regen, vorst‑ en
hete dagen, zonuren, hardste wind) die voor altijd blijven, zodat je jaren kunt vergelijken.

**Houdt de website geschiedenis bij?**
Ja. Hortulus Web (de optionele website, geen onderdeel van deze repository) rekent alleen terwijl
iemand de tuin open heeft, dus het vult de geschiedenis zelf aan: voor **elke tuin** uit het
waargenomen weer van **Open‑Meteo**, en voor een tuin die aan een Home Assistant gekoppeld is ook
uit de **recorder** van die Home Assistant, via het token van de tuin. Dezelfde regels gelden:
eigen metingen eerst, dan de recorder, dan Open‑Meteo.

## Koken

**Wat doet het tabblad Koken?**
Het is een seizoenskookboek op basis van wat de tuin *nu* geeft. Hortulus kijkt naar de gewassen
die klaar zijn om te oogsten (plus alles wat je zelf toevoegt, zoals bewaarde pompoenen of
ingevroren bonen) en stelt er gerechten voor voor, elk met hoeveelheden per persoon, wat uit de
tuin komt en wat je moet kopen. De tuin komt altijd eerst: een gerecht wordt alleen voorgesteld
als de tuin het hoofdingrediënt levert. Recepten zijn geschreven in het Nederlands, Engels en
Frans. Het tabblad heeft drie delen: **Ideeën uit de tuin**, **Mijn kookboek** en
**Boodschappenlijst**.

**Wat voor gerechten zijn er?**
Meer dan 60 technieken: soepen (waaronder geroosterde velouté, minestrone, groene soep, chowder
en een koude soep in gazpacho‑stijl), voorgerechten (beignets, carpaccio, remoulade, tabouleh,
caprese, caponata, crostini …), hoofdgerechten (ovenschotels, wok, pasta, risotto, gratin, stoofpot
en curry, frittata, stoemp, gevulde groenten, ratatouille, tian, shakshuka, waterzooi, taarten,
gnudi …), desserten (crumble, clafoutis, panna cotta, sorbet, groentekoekjes, gebakken fruit …) en
een hoofdstuk **Bewaren & inmaken** voor het overschot (snelle pickles, chutney, passata,
pestoblokjes, confituur, blancheren en invriezen, zuurkool – de hoeveelheden daar zijn een batch,
geen bord). Sla, komkommer en radijs komen alleen in rauwe gerechten.

**Wat zijn de hoofdstukken en menu's?**
Ideeën, je kookboek en de kookboek‑PDF zijn ingedeeld in **Soepen, Voorgerechten, Hoofdgerechten,
Desserten** en **Bewaren & inmaken** (in de PDF een hoofdstukpagina elk, in het kookboek een
hoofdstukfilter). **Menu's** combineren een soep of voorgerecht, een hoofdgerecht en een dessert die
bij elkaar passen, gemaakt van wat nu te oogsten is: thema‑menu's van het seizoen (een Provençaals
tuindiner, Levantijnse mezze, een courgetteoverschot, een Vlaams lentemenu, een winters
troostmenu …) en menu's rond een hoofdgerecht. Met één klik komen alle drie de gerechten op de
boodschappenlijst of in je kookboek.

**Hoe gebruik ik op wat in de ijskast ligt, en wat is “altijd in huis”?**
Vink onder *Meer keuzes* **Opgebruiken uit de ijskast** aan (yoghurt, feta, parmezaan, eieren,
mosterd, ui, paneermeel …). Elk item krijgt per soort gerecht zijn eigen bereiding – yoghurt wordt
een saus in tzatziki‑stijl, een raita of een citroen‑knoflooklaag onder geroosterde groenten; feta
wordt tussen de groenten gebakken of in een frittata verkruimeld; eieren worden in holtes op de
ovenplaat gebakken – en alleen waar het past. Een gerecht neemt hoogstens drie dingen uit de
ijskast, één saus, één dressing en één krokante topping, nooit twee kazen of twee rooms.
Ijskastitems tellen als “in huis”. Vink **Altijd in huis** aan voor dingen die nooit op een
boodschappenlijst mogen komen (zout, peper en olijfolie worden altijd verondersteld).
**Onthoud deze keuzes** bewaart dit alles voor de volgende keer.

**Hoe kies ik de basis, het vlees of de vis en het aantal personen?**
Onder *Meer keuzes*: **Personen**; **Basis** (wat bij het gerecht past, geen, of pasta, rijst,
bulgur, couscous, parelcouscous, gnocchi, aardappelen, frieten, brood of noedels); en **Vlees, vis
of …** (kip, gehakt, rund, biefstuk, stoofvlees, varken, worst, spek, ham, zwezerik, zalm, witte
vis, garnalen – of de vegetarische tofu, kikkererwten, linzen, ei, halloumi, geitenkaas). Kies
niets voor vegetarische gerechten, of meerdere om af te wisselen. Elk gerecht krijgt alleen de
eiwitbron en basis die erbij passen (een risotto houdt zijn rijst, een waterzooi pocheert de kip).
Elk recept kan zijn basis, eiwitbron en aantal personen opnieuw wijzigen. Vlierbessen en bonen
(ook kikkererwten en edamame) worden nooit rauw of half gaar aangeboden.

**Kan ik een recept aanpassen of mijn eigen versie schrijven?**
Ja. Met **Aanpassen** in een recept voeg je ingrediënten toe, schrap je ze of wijzig je ze (naam,
hoeveelheid, eenheid, uit de tuin / in huis / kopen) en voeg je stappen toe, herschrijf, schrap of
verplaats je ze. Je versie komt in je kookboek, en de boodschappenlijst en de PDF's volgen haar.
**Terug naar het origineel** zet het gegenereerde recept terug. Een recept heeft minstens één
ingrediënt en één stap nodig, en bevat hoogstens 40 ingrediënten en 30 stappen.

**Hoe werkt mijn kookboek?**
**Bewaar in mijn kookboek** bewaart een gerecht. Daar kun je favorieten markeren, een notitie
toevoegen, noteren wanneer je het kookte, zoeken op recept of ingrediënt en filteren op favorieten
of hoofdstuk. Bewaarde recepten worden opgeslagen als een kleine receptbeschrijving en in de
huidige taal weergegeven, dus ze lezen goed in het Nederlands, Engels of Frans.

**Hoe werkt de boodschappenlijst?**
Zet gerechten op de lijst vanuit hun recept (de winkelwagenknop), of een heel menu tegelijk. Er is
**één lijst** voor alles wat je koos: wat je moet kopen, gegroepeerd (vlees, vis, vegetarische
eiwitten, zuivel, basis, voorraadkast, overig), en apart wat je in de tuin kunt plukken. Wat je in
huis hebt of uit de ijskast opgebruikt, staat er niet op. Je kunt haar afdrukken, als PDF bewaren
(eventueel met alle recepten en hun gerechtafbeeldingen), naar je gsm sturen of op een takenlijst
van Home Assistant zetten.

**Elk gerecht heeft een afbeelding – waar komt die vandaan?**
Hortulus tekent haar zelf: de gewassen van het gerecht op een bord (een kom voor soepen en
ingemaakt, een ovenschaal voor gebakken gerechten), de basis als bedje eronder, het vlees of de
vis in het midden en kruiden eroverheen. Ze wordt uit het recept gegenereerd, dus ze werkt
offline en een gerecht ziet er altijd hetzelfde uit.

**Hoe krijg ik een recept uit Hortulus: PDF, afdrukken, gsm, takenlijst?**
- **PDF**: één recept, je hele kookboek (een hoofdstukpagina elk; tot 200 recepten, een lang recept
  loopt door op een volgende pagina), alle huidige ideeën als kookboek, of de boodschappenlijst
  met de recepten, alles met de gerechtafbeeldingen. **Afdrukken** opent het afdrukvenster.
- **Naar mijn telefoon** stuurt het recept of de boodschappenlijst als melding via de
  notify‑dienst die je kiest (standaard: de meldingsinstellingen van de tuin onder Instellingen ›
  Meldingen).
- **Takenlijst** (weergave boodschappenlijst) voegt de items toe aan een takenlijst van Home
  Assistant naar keuze, bv. de boodschappenlijst; items die er al open op staan worden
  overgeslagen, en ze volgt je eigen Home Assistant‑rechten voor die lijst.

**Werkt Assist of spraak met koken?**
Nee: de Assist‑zinnen die Hortulus installeert dekken zes tuinvragen (taken vandaag, achterstallig,
oogst, kas, water, vorst), geen enkele over recepten. De export naar een takenlijst is een gewone
takenlijst van Home Assistant, dus wat je elders met die lijst doet (dashboards,
automatiseringen) werkt ermee. De kookfuncties zijn alleen in het paneel beschikbaar.

**Er is niets “klaar in de tuin” – kan ik toch koken?**
Ja. Gebruik **Ook uit de tuin of de kelder** om groenten, kruiden of fruit toe te voegen die je
nog hebt; de gerechten volgen. Wat als klaar geldt, komt uit je plan en de oogstvensters van de
gewassen.

## Logboek en gegevens

**Kan ik een oogstlogboek en tuindagboek bijhouden?**
Ja, in het tabblad **Logboek**: een **dagboek** met foto's per bed, gewas of de hele tuin; een
**oogstlogboek** in kg en stuks (ook vanuit het taakvenster wanneer je een oogsttaak afvinkt, of
vanuit de planner) met totalen per gewas; de **zaaddoos** met houdbaarheid per plantenfamilie en de
gewassen in je plan waarvoor je nog zaad nodig hebt; het **water**verbruik via een tuinwatermeter
en het peil van de regenton; en **Keuken** (zie hieronder). Na een seizoen gebruikt Automatisch
invullen je eigen kg/m² in plaats van het gemiddelde uit de databank. **Oogst door de jaren** toont
het totaal per seizoen met het beste jaar gemarkeerd en een rij balken per gewas.

**Hoe noteer ik snel een oogst?**
**Vandaag** heeft **Snel oogsten**: tik een gewas dat klaar is, tel het gewicht op met de grote
knoppen en bewaar. Voor een NFC‑tag of een knop: de actie `garden_manager.log_harvest` met
`plant: Tomaat` en `kg: 0.5` zoekt zelf de teelt in je tuin (voeg `bed:` toe als de plant in
meerdere bedden groeit).

**Kan ik snel een notitie of foto bij een gewas zetten?**
Ja, in de popup van een gewas of bed (planner of Teelten) onder **Notitie of foto**. Op een gsm
opent *Foto* de camera. De notitie komt in het dagboek bij dat gewas; de laatste notities staan
eronder. De foto's van een gewas of bed vormen ook een **tijdlijn** van de eerste tot de laatste foto.

**Kan ik zien wat er veranderd is, en dat terugdraaien?**
Ja. **Logboek → Systeemlogboek** toont elke wijziging: wat jij of iemand van je huishouden in het
paneel deed, wat een automatisering of actie wijzigde, en wat Hortulus zelf deed (taken aanmaken of
sluiten, opruimen). Elke regel toont wanneer, door wie en wat (bv. *Verwijderd – Teelt: Tomaat
(Kasbed, seizoen 2027)*). **Terugdraaien** herstelt de toestand van vóór die actie. Is een onderdeel
sindsdien opnieuw gewijzigd, dan vraagt Hortulus eerst of die latere wijziging mag vervallen; een
terugdraaiing die een gewas zonder bed zou achterlaten, wordt geweigerd. Het terugdraaien wordt ook
gelogd, dus het kan zelf weer teruggedraaid worden. De laatste 500 regels worden bewaard (het
verwijderen van een plan, uitgaven en kookboekregels staan ook in het logboek).

**Is er een seizoensoverzicht?**
**Logboek → Seizoensrapport** (en de **Jaarovergang**) toont per gewas wat je plantte en oogstte
tegenover de verwachting, wat mislukte, de problemen uit het dagboek en het gegeven water.
Download het als Markdown.

**Kan ik mijn tuinjaar als boek afdrukken?**
Ja: **Afdrukken → Seizoensboek** (of *Seizoensboek (PDF)* in het seizoensrapport). Je krijgt een
volledig uitgeschreven boek: voorblad, inhoud, inleiding, een hoofdstuk per maand met wat gezaaid,
geplant en gedaan werd, je dagboek met je eigen foto's, de oogst, water en weer, daarna het jaar in
cijfers, een woordenlijst, colofon en achterblad. Kies A5 en druk dubbelzijdig af (spiegelen langs de
lange kant); het aantal bladzijden is altijd een veelvoud van vier, zodat je het in katernen kunt
vouwen en binden. Foto's komen uit je dagboek (afbeeldingen van Home Assistant), rechtgezet en
verkleind. Beschikbaar in het Nederlands, Engels en Frans.

**Hoeveel bespaart mijn moestuin?**
*Logboek → Keuken* toont de oogst tegen winkelprijzen naast je uitgaven (zaad, plantgoed, compost,
gereedschap …) en het water volgens de meter. Pas prijzen per gewas en de waterprijs aan bij
*Instellingen → Kosten*. Hetzelfde onderdeel toont wat klaar is om te oogsten, met bewaartips, en
een melding als je meer oogst dan je opeet.

**Kan ik zien of het water geven helpt?**
Ja: **Logboek → Water → Bewatering per bed** toont per bed het bodemvocht (uit de geschiedenis van
Home Assistant), het water dat Hortulus gaf en de regen (regensensor), over 7, 14 of 30 dagen.
Dezelfde grafiek staat in de plannerpopup van een bed.

**Kan ontbrekend zaad op mijn boodschappenlijst?**
**Teelten → Zaden** toont per gewas hoeveel zaad je moet kopen. Met **… op de lijst zetten** komt
wat ontbreekt op een takenlijst van Home Assistant (bv. de boodschappenlijst); wat er al op staat,
wordt niet dubbel toegevoegd, en ze volgt je eigen Home Assistant‑rechten voor die lijst.

**Waar zijn mijn oude seizoenen?**
Seizoenen ouder dan het huidige en de twee ervoor verhuizen naar een apart archiefbestand, zodat
Hortulus ook na jaren gebruik snel blijft. Niets gaat verloren: de wisselteelt houdt er nog
rekening mee, en het seizoensrapport en het seizoensboek kunnen ze nog openen (kies het jaar). Een
seizoen verlaat het tuinbestand pas nadat het archief dat het bevat van schijf teruggelezen is.

**Kan ik mijn hele tuin exporteren of importeren?**
Ja, het plan reist als één bestand. **Instellingen › Algemeen › Importeren & exporteren** downloadt
JSON of YAML; **Plan importeren** in de Planner leest zo'n bestand, ofwel **samengevoegd** met het
huidige plan ofwel dit **vervangend** (de acties `garden_manager.export_plan` en `import_plan` doen
hetzelfde). Het bestand bevat zones, bedden, tuinelementen, de tuinplannen van elk seizoen,
gewassen, je eigen planten en plantwijzigingen, de wisselteeltgeschiedenis, opzijgezette plannen
en, als je dat aanvinkt, taken. Het bevat *niet* het dagboek, het oogstlogboek, foto's, uitgaven of
het kookboek. Een bestand dat Hortulus weigert (verkeerd formaat of ongeldige waarden) wijzigt
niets. Gebruik voor een volledige kopie van alles een back‑up van Home Assistant. Een bestand van
een andere Hortulus (een andere Home Assistant of de website) importeer je op dezelfde manier.

**Waar komen de plantfoto's vandaan?**
Elke plant, elk advies en elk handboekhoofdstuk heeft een tekening die Hortulus zelf maakt (werkt
offline). Daarbovenop toont je browser een foto van Wikipedia, gezocht op de wetenschappelijke
naam, onder een licentie die Hortulus kan naleven (CC BY, CC BY‑SA, CC0, publiek domein), met
bronvermelding van maker en licentie en een link naar de bron. Je browser haalt haar rechtstreeks
op bij Wikipedia; Home Assistant zelf maakt geen verbinding. Zet dit uit met **Instellingen →
Weergave** (per browser).

## Entiteiten, spraak en dashboards

**Entiteiten voor een nieuw bed ontbreken.**
Ze worden toegevoegd zodra het plan is opgeslagen (let op de indicator *Opgeslagen* in de
werkbalk van de planner). Herlaad de integratie als je `.storage` met de hand bewerkte (doe dat
niet).

**Entity‑id's zijn Nederlands / Engels.**
Id's worden gegenereerd in de systeemtaal van HA op het moment van aanmaken. Hernoem ze in
Instellingen → Entiteiten; unieke id's blijven stabiel.

**De vorstsensor staat op `unknown`.**
De weerentiteit is niet beschikbaar of geeft geen verwachting. Bekijk Instellingen → Apparaten &
diensten → Hortulus → *Diagnose downloaden* → `weather.error`.

**Hoe gebruik ik spraakopdrachten?**
Klik één keer op **Instellingen › Huishouden & spraak › Spraakzinnen installeren** (of gebruik de
actie `garden_manager.install_voice_sentences`). Vraag daarna aan Assist bijvoorbeeld “wat moet ik
vandaag in de tuin doen?”, “wat kan ik oogsten?”, “hoe warm is het in de serre?” of “gaat het
vriezen vannacht?”. De zinnen bestaan in het Engels, Nederlands en Frans. Zie de
[entiteitenreferentie](ENTITEITEN.md#spraak-assist).

**Is er een dashboardkaart?**
Ja: `type: custom:hortulus-tasks-card` wordt automatisch geladen. Ze toont de taken van vandaag en de
achterstallige met een vinkje, water geven vandaag, een lopende beurt, een kraan die openstaat (met
*Sluiten*) en lekken; `days`, `assignee`, `max` en `garden` zijn optioneel. Zie de
[entiteitenreferentie](ENTITEITEN.md#lovelace-kaart).

**Kan ik Hortulus automatiseren?**
Ja: de README verwijst naar kant‑en‑klare blueprints (vorstwaarschuwing op een lamp, een oogst
loggen met een knop of NFC‑tag, een droog bed op een goed moment water geven, dringende
tuinklussen omroepen). `run_irrigation_plan` accepteert `only_if_needed`, zodat je automatisering
het moment kiest terwijl Hortulus nog steeds beslist of het bed water nodig heeft.

**Mijn vochtsensor is soms offline – klopt het advies dan nog?**
Ja. Een sensor die langer dan *sensor verouderd na* (standaard 360, in te stellen bij de opties van
de integratie onder Geavanceerd) niets meldde, wordt als ontbrekend behandeld, niet als zijn
laatste waarde, en een melding zegt welke sensor het is. Elke dag zet Hortulus ook de waterbalans
van een bed met sensor gelijk aan de meting en leert het hoe snel dat bed echt uitdroogt (bv. “15 %
sneller dan berekend”, op het dashboard). Valt de sensor uit, dan rekent het verder met wat het
leerde.

## Afdrukken, handboek, automatisch invullen

**Hoe krijg ik een plan op mijn reMarkable Paper Pro?**
Tabblad Afdrukken → papier *reMarkable Paper Pro*, kleuren *E‑ink (licht + patronen)* → *PDF
downloaden*, en sleep het bestand in de reMarkable‑app (of gebruik *Send to reMarkable* per
e‑mail). De pagina is precies zo groot als het scherm; het stippelraster voor notities en de lichte
tinten laten ruimte om te tekenen. Voor een wekelijkse takenlijst automatiseer je
`garden_manager.export_pdf` met `document: tasks` en haal je het bestand op via de ondertekende
link in het antwoord van de actie. PDF's zijn privé: ze worden naar `/config/hortulus/exports/`
geschreven en geleverd via een geauthenticeerde link die 7 dagen geldig is.

**Waarom hebben de bedden patronen op de afdruk?**
In e‑ink‑ en grijstintenmodus krijgt elke plantenfamilie ook een arcering, zodat de kaart leesbaar
blijft zonder kleur en op een zwart‑witprinter.

**Wat kan ik afdrukken?**
Tuinplan, serre / zone, bedfiches, takenlijst, seizoensoverzicht, jaarplan, leeg planningsblad,
plantkaarten en het seizoensboek, op A4, A3, A5, Letter of reMarkable Paper Pro, in kleur, e‑ink of
grijstinten. Het kookboek en de boodschappenlijst hebben hun eigen PDF's in het tabblad Koken.

**Automatisch invullen zette mijn tomaten buiten terwijl ik een kas heb.**
Vorig seizoen groeiden er tomaten in dat kasbed, dus het bed valt door de wisselteeltregel af voor
nachtschadeplanten. Voeg een tweede kasbed toe of verplaats ze toch – de planner toont dan de
wisselteeltwaarschuwing.

**Automatisch invullen plaatst bijna niets. Waarom?**
Meestal is het gewoon te laat in het seizoen: in oktober is het zaai‑ of plantvenster van bijna elk
gewas voor dit jaar voorbij. Het venster van Automatisch invullen zegt per plant waarom hij niet
geplaatst werd (te laat, verkeerd zonetype, niet onder glas, vorst vóór de oogst, wisselteelt,
slechte buur, geen plaats meer, een bed te smal voor zijn marges) en stelt voor om in plaats daarvan
het **volgende seizoen** in te vullen. Heeft dat seizoen nog geen tuinplan, dan vult Hortulus in op
het laatste plan en kopieert het dat bij het toepassen. Voor één plant toont **Analyse → Waarom
niet?** per bed of hij past en zo niet, waarom – met dezelfde regels als bij slepen en automatisch
invullen.

**Automatisch invullen sloeg gewassen over.**
De redenen staan onder *Niet geplaatst*: geen geschikt bed (wisselteelt, vorstseizoen te kort
buiten, niet geschikt onder glas), geen plaats, of het wekelijkse tijd‑ of waterbudget was op. Verhoog
het budget, selecteer meer bedden of vink *vervangen* aan.

**Waarom verschoof de verwachte oogstdatum?**
Met een temperatuursensor (of de weerentiteit) logt Hortulus dagelijkse minimum‑ en
maximumtemperaturen en telt het graaddagen op sinds het planten; een warme periode vervroegt de
oogst, een koude stelt haar uit (hoogstens drie weken naar beide kanten). Kasgewassen tellen hun
eigen luchtsensor. Hittedagen en een reeks sombere dagen vertragen vruchtgewassen, gelogde koude
dagen gewassen zonder graaddagenmodel; de gewaspopup toont hoeveel dagen en waarom. Zie
[Houdt Hortulus rekening met het weer voor de groei?](#weer-en-klimaatgeschiedenis)

## Veiligheid van de bewatering

**Kan automatisch bewateren mijn tuin onder water zetten?**
Elke klep heeft een maximale looptijd, er loopt maar één klep tegelijk en de pomp draait alleen
als een klep die open meldde open is. Als een beurt eindigt, mislukt of gestopt wordt (knop, dienst,
herstart van Home Assistant), gaan alle kleppen die geopend waren en de pomp uit – eerst de pomp,
dan de klep.

**Wat als een klep of de pomp niets meer meldt?**
- Een klep die nooit open meldt, beëindigt de beurt en boekt geen water; met een pomp wordt de pomp
  er nooit tegenaan gestart.
- Meldt een klep met pomp helemaal niets meer (unknown of unavailable) gedurende **60 seconden**,
  dan eindigt de beurt meteen en stopt de pomp, omdat Hortulus niet meer kan weten of de pomp een
  open uitgang heeft. Het probleem wordt gemeld in het systeemlogboek en als melding.
- Een klep die midden in een beurt zelf sluit, beëindigt de beurt, boekt de werkelijke tijd en
  wordt gemeld.
- Een klep of de pomp die veel langer open blijft dan een beurt kan duren (maximale looptijd + 10
  minuten) terwijl Hortulus niet bewatert, wordt gemeld met een melding en een rode banner op
  **Vandaag** met **Kraan sluiten**. Na elke beurt controleert Hortulus ook of de klep dicht meldt.

**Hoe test ik mijn kraan of pomp?**
In **Instellingen → Bewateringshardware** heeft elke bedkraan **Test (5 s)**. Hortulus opent de
kraan 5 seconden (met de pomp erbij, in de veilige volgorde; de pomp test je zo, nooit alleen),
sluit hem weer en zegt of de kraan open en dicht meldde. Sla de instellingen eerst op: alleen
gekoppelde kranen worden getest. *Stop* of *Sluiten* beëindigt een lopende test.

**Mijn pomp is een slimme kraan (valve) – kan dat?**
Ja. Bij **Instellingen → Bewateringshardware** tonen de keuzelijsten voor pomp en bedkraan ook
`valve.*`‑ en `input_boolean.*`‑entiteiten. Hortulus opent en sluit een `valve` met
`valve.open_valve` / `valve.close_valve`, in dezelfde veilige volgorde (kraan open → pomp aan …
pomp uit → kraan dicht). Slimme kranen met een eigen timer (zoals een instelling *Watering
Duration*) sluiten zelf na die tijd: vul haar in bij **Instellingen › Bedden & sensoren ›
Kraantimer (min)** en langere beurten worden opgesplitst in openingen die erbinnen blijven.
Zet haar anders langer dan de maximale looptijd van Hortulus, anders stopt de kraan vroeger dan
gepland.

**Kan Hortulus een lek melden?**
Met een watermeter (Instellingen › Watermeter & regenton): telt de meter water (minstens 5 liter)
gedurende 15 minuten terwijl elke kraan van Hortulus dicht is en er niets loopt, dan krijg je een
melding en een rode banner op Vandaag (en het wandscherm); ze verdwijnt vanzelf als het water
stopt. Je kunt lekmeldingen op dezelfde plek uitzetten. Tijdens een beurt leest Hortulus ook de
meter af: het logboek toont de werkelijke liters en elk bed leert zijn echte debiet, dat gebruikt
wordt als je zelf geen debiet invult.

**Waarom werd er vanochtend niet bewaterd?**
Bekijk `binary_sensor.hortulus_irrigation_frost_lockout` en voer
`garden_manager.run_irrigation_plan` uit met `dry_run: true`: het antwoord noemt elk overgeslagen
bed met zijn reden (vorstvergrendeling, regen verwacht, geen klep, geen debiet, niet nodig, modus
niet *auto*). De vorstvergrendeling kijkt naar de komende 12 uur, dus een koudere nacht later in de
verwachting verbergt de vorst van vanavond niet.

## Problemen oplossen

**Waar vind ik fouten en onverwachte dingen terug?**
In het tabblad **Analyse** (Beheer):

- **Controle** legt tuinplannen, gewassen en seizoenen naast elkaar en meldt wat niet klopt: een jaar
  met gewassen maar zonder tuinplan, gewassen waarvan het bed niet op het plan staat (onzichtbaar in
  de planner), bedden buiten hun zone, gewassen die over elkaar liggen of te laat gepland staan, een
  vergeten jaarovergang …, met een knop naar de juiste plek. Het getal op het tabblad toont hoeveel
  problemen er nu zijn; het wordt na elke wijziging opnieuw berekend.
- **Waarom niet?** verklaart waarom een plant ergens niet past.
- **Fouten** toont elke actie die Hortulus weigerde, met de reden.
- **Vergelijken** toont het verschil tussen twee plannen.
- **Systeemlogboek** is hetzelfde logboek als **Logboek → Systeemlogboek**.

**Kan Hortulus problemen zelf oplossen?**
Voor een aantal bevindingen in **Analyse → Controle** staat een knop: een ontbrekend tuinplan
kopiëren, gewassen die niet op het plan of buiten hun bed staan terugzetten, een bed in zijn zone
schuiven, of een vergeten meerjarige naar dit jaar overzetten. Elke oplossing staat in het
systeemlogboek en kan teruggedraaid worden. **Diagnose exporteren** geeft één bestand (controle,
fouten, recent logboek) om mee te sturen als je een probleem meldt.

| Symptoom | Controleer |
|---|---|
| Het paneel zegt “Hortulus is nog niet ingesteld” | De integratie is niet geladen; kijk in *Instellingen → Systeem → Logboeken* naar `garden_manager`. |
| Paneel leeg na een update | Ververs de pagina hard (de module‑URL heeft een inhoudshash, maar sommige proxy's cachen agressief). |
| “Elders gewijzigd – opnieuw geladen” | Iemand (of een import/dienst) wijzigde het plan terwijl je bewerkte; je laatste niet‑opgeslagen seconde aan wijzigingen is vervallen. |
| Instellingen zijn grijs | Het plan, de planten of de hardware wijzigen vraagt een beheerder van Home Assistant. |
| Geen beregeningsduur | Vul het debiet (L/min) van het bed in bij Instellingen → Bedden & sensoren (of koppel een watermeter zodat Hortulus het leert). |
| Melding “sensor verouderd” | De sensor meldde langer niets dan *sensor verouderd na* (opties → geavanceerd). |
| Taken in de verkeerde taal | Opties → Geavanceerd → *Taal van gegenereerde taken*. |
| Niets onder “Klaar in de tuin” | Er is nog geen gewas klaar om te oogsten; voeg toe wat je hebt onder *Ook uit de tuin of de kelder*. |
| Geen buienradar | Er is geen radarcamera in Home Assistant en het land is niet NL/BE, of de weerentiteit is niet ingesteld. |
| Kleuren of thema zien er verkeerd uit op iPhone | Werk de integratie bij (1.7.1 zet thema's als inline kleuren die elke browser in één keer toepast) en herlaad de app. |
| Banner “lek” of “kraan staat open” | Controleer de kraan en kies dan *Kraan sluiten* op de banner; zie Veiligheid van de bewatering. |

Debuglogging aanzetten:

```yaml
logger:
  logs:
    custom_components.garden_manager: debug
```

Voeg bij een melding altijd de **diagnose**‑download toe (notify‑diensten, speakers, breedtegraad
en foto's worden daarin weggelaten).
