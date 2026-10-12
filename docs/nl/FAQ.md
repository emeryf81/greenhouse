# Veelgestelde vragen & problemen oplossen

**Heb ik sensoren nodig?**
Nee. Zonder sensoren plant en herinnert Hortulus gewoon. Een bodemvochtsensor geeft
vochtstatus en precies beregeningsadvies, een bodemthermometer laat zaaiadvies wachten
op warme grond, een kasthermometer maakt live luchtadvies mogelijk.

**Heb ik een weersverwachting nodig?**
Aanbevolen. Zonder verwachting is het vorstrisico `onbekend` (of laag/matig als het nu al
koud is), werkt beregeningsadvies alleen op de sensor en kan uitplanten niet wachten op
vorstvrije nachten.

**Waarom `garden_manager.*` en niet `garden.*`?**
Home Assistant eist dat diensten het domein van de integratie gebruiken
(`garden_manager`). De productnaam is Hortulus.

**Gaat er iets naar internet?**
Standaard niet. Plantendatabase en handboek zitten in de integratie; foto's gaan via de
eigen `image_upload` van Home Assistant. Alleen als je **Open‑Meteo** aanzet
(Instellingen → Weer) haalt Hortulus een verwachting op bij api.open‑meteo.com, met de
coördinaten van de tuin afgerond op ~1 km.

**Hoe krijg ik een plan op mijn reMarkable Paper Pro?**
Tabblad Afdrukken → papier *reMarkable Paper Pro*, kleuren *E‑ink* → *PDF downloaden* en
sleep het bestand in de reMarkable‑app (of *Send to reMarkable* per e‑mail). De pagina is
precies zo groot als het scherm; het stippelvlak en de lichte tinten laten ruimte om te
tekenen. Een wekelijkse takenlijst automatiseer je met `garden_manager.export_pdf`
(`document: tasks`); het bestand staat dan in de ondertekende link in het antwoord van de dienst.

**Waarom zette Automatisch invullen mijn tomaten buiten terwijl ik een serre heb?**
Vorig seizoen stonden er al tomaten in dat serrebed; door de vruchtwisseling valt dat bed
af voor nachtschadeplanten. Voeg een tweede serrebed toe of verplaats ze toch – de planner
toont dan de wisselteeltwaarschuwing.

**Waarom verschoof de verwachte oogstdatum?**
Hortulus telt graaddagen sinds het planten: een warme periode vervroegt de oogst, een
koude stelt ze uit (maximaal drie weken).

**Kan automatisch bewateren mijn tuin onder water zetten?**
Nee: elke klep heeft een maximale looptijd, er loopt maar één klep tegelijk en de pomp
draait alleen als er een klep open is. Bij einde, fout of stoppen gaan alle geopende
kleppen en de pomp uit. Waarom er niet bewaterd werd, zie je met
`garden_manager.run_irrigation_plan` en `dry_run: true` (reden per bed: vorst, regen,
geen klep, geen debiet, niet nodig, modus niet *auto*).

**Waarom is mijn zaaitaak “te laat”?**
Het zaaivenster is begonnen en er staat een vaste datum in het verleden (bijvoorbeeld uit
een reeks opeenvolgende zaaimomenten). Rond af, stel uit of pas de datum aan in de planner.
Taken die ervan afhangen (uitdunnen) schuiven vanzelf op tot het zaaien gebeurd is.

**De taak zegt “wachten”.**
De grond is te koud om te kiemen (bonen willen 12 °C), of er wordt vorst verwacht onder de
minimumtemperatuur van de plant. De taak schuift naar morgen; de reden staat in de omschrijving.

**Waarom geen oogsttaken voor afrikaantjes?**
Begeleidende bloemen hebben `harvestable: false`. Pas dat aan via *Aanpassen* als je ze
voor de vaas kweekt.

**Twee beplantingen overlappen zonder waarschuwing.**
Ze staan niet tegelijk in de grond (bv. radijs geoogst voordat de bonen erin gaan). Met
*Toon tuin op* zie je wat er op een datum in het bed staat.

**Entiteiten voor een nieuw bed ontbreken.**
Die verschijnen zodra het plan is opgeslagen (indicator *Opgeslagen* in de werkbalk).

**Vorstsensor staat op `unknown`.**
De weerentiteit is niet beschikbaar of geeft geen verwachting. Bekijk de diagnose:
Instellingen → Apparaten & diensten → Hortulus → ⋮ → *Diagnose downloaden* → `weather.error`.

## Problemen oplossen

| Symptoom | Controleer |
|---|---|
| Paneel: “Hortulus is nog niet ingesteld” | De integratie is niet geladen; kijk in de logboeken naar `garden_manager`. |
| Leeg paneel na update | Ververs de pagina hard (Ctrl+Shift+R). |
| “Elders gewijzigd – opnieuw geladen” | Iemand anders (of een dienst/import) wijzigde het plan tijdens het bewerken. |
| Geen beregeningsduur | Vul het debiet (L/min) van het bed in bij Instellingen → Bedden & sensoren. |
| Taken in de verkeerde taal | Opties → Geavanceerd → *Taal van gegenereerde taken*. |

Debuglogging:

```yaml
logger:
  logs:
    custom_components.garden_manager: debug
```

Voeg bij een melding altijd de **diagnose** toe (notify‑diensten, speakers, breedtegraad en
foto's worden daarin weggelaten).

## Mijn appelboom staat elk jaar opnieuw in het plan - hoe haal ik hem weg?

Meerjarige planten (fruitbomen, bessen, asperge, vaste kruiden) gaan alleen mee naar een volgend seizoen als je ze aanvinkt in de **Jaarovergang**. Wil je er een uit het huidige seizoen halen, selecteer de plant in de planner en kies **Verwijderen**. Je krijgt twee keuzes: **Weg vanaf dit seizoen** (de vorige jaren behouden hem voor wisselteelt en historiek) of **Volledig wissen**.

## Kan ik herinneringen krijgen voor taken die ik vergeten ben?

Ja. Onder **Instellingen › Meldingen › Herinneringen** stel je een tijdstip in voor de dagelijkse herinnering van achterstallige taken (per taak zie je of het nog kan, of het te laat is en je beter overslaat) en een **weekoverzicht** op een dag naar keuze. Ze gaan via dezelfde kanalen als de andere meldingen (blijvende melding, push, …).

## Houdt de planning rekening met het weer?

Ja. Met **Taken plannen volgens het weer** (standaard aan) schuiven zaaien, uitplanten, afharden, snoeien, bodem klaarmaken en dergelijke binnen hun venster naar de dichtstbijzijnde geschikte dag (geen regen, vorst, hitte of storm). Lukt dat niet, dan krijgt de taak een weerwaarschuwing. Daarnaast maakt Hortulus taken voor hitte, droogte, storm en zware regen, met ecologische tips.

## Welke sensoren moet ik kopen?

Zie het handboekhoofdstuk **Sensoren kiezen en kopen**: begin met een thermometer in de serre en één bodemvochtsensor in je belangrijkste bed.

## Kan ik een oogstlogboek en tuindagboek bijhouden?

Ja, in het tabblad **Logboek**: een **dagboek** met foto's per bed, gewas of de hele tuin; een **oogstlogboek** in kg (ook vanuit het taakvenster wanneer je een oogsttaak afvinkt, of vanuit de planner); de **zadendoos** met houdbaarheid per plantenfamilie en de gewassen in je plan waarvoor je nog zaad nodig hebt; en het **waterverbruik** via een watermeter en het peil van de regenton. Na een seizoen gebruikt Autofill je eigen kg/m² in plaats van het gemiddelde uit de databank.

## Kunnen meerdere mensen het werk verdelen?

Ja. Elke taak kan aan een persoon (`person.*`-entiteit) toegewezen worden. Onder **Instellingen › Huishouden & spraak** kies je wie nieuwe taken standaard krijgt, ook per soort taak, en een notify-dienst per persoon: iedereen krijgt dan zijn eigen dagoverzicht en herinneringen. De dashboardkaart kan enkel jouw taken tonen (`assignee: me`).

## Kan ik meerdere tuinen beheren?

Nog niet. Hortulus werkt met één tuin per Home Assistant: voeg voor een tweede perceel (volkstuin, voortuin) gewoon zones toe in hetzelfde plan. Een tweede integratie-item kan, maar het paneel toont altijd het eerste.

## Hoe gebruik ik spraakopdrachten?

Klik één keer op **Instellingen › Huishouden & spraak › Spraakzinnen installeren** (of gebruik de actie `garden_manager.install_voice_sentences`). Vraag daarna aan Assist bijvoorbeeld „wat moet ik vandaag in de tuin doen?”, „wat kan ik oogsten?”, „hoe warm is het in de serre?” of „gaat het vriezen vannacht?”.

## Is er een dashboardkaart?

Ja: `type: custom:hortulus-tasks-card` wordt automatisch geladen. Ze toont de taken van vandaag en de achterstallige met een vinkje; `days`, `assignee` en `max` zijn optioneel. Zie [entiteiten](ENTITEITEN.md#lovelace-kaart).

## Gebruikt Hortulus mijn bodemanalyse?

Ja. Selecteer een bed in de planner en voeg een **bodemanalyse** toe (pH, organische stof, P en K uit een labo-rapport of thuistest). Het bemestingsplan, het kalkadvies en de boodschappenlijst van dat bed volgen de laatste analyse: minder fosfaat bij een hoge P, enkel kalk als de pH te laag is voor de gewassen, meer compost bij weinig organische stof.


## Kan ik zien wat er veranderd is, en dat terugdraaien?

Ja. In **Logboek → Systeemlogboek** staat elke wijziging: wat jij of een huisgenoot in het paneel deed, wat een automatisering of actie aanpaste, en wat Hortulus zelf deed (taken aanmaken of afsluiten, opruimen). Per regel zie je wanneer, door wie en wat (bv. *Verwijderd – Teelt: Tomaat (Kasbed, seizoen 2027)*). Met **Terugdraaien** zet je de toestand van vóór die actie terug. Is een onderdeel sindsdien opnieuw gewijzigd, dan vraagt Hortulus eerst of die latere wijziging mag vervallen; een terugdraaiing die een teelt zonder bed zou achterlaten wordt geweigerd. Het terugdraaien komt zelf ook in het logboek en kan je dus weer ongedaan maken. De laatste 500 regels worden bewaard.

## Waar komen de plantfoto's vandaan?

Elke plant, elk advies en elk handboekhoofdstuk heeft een tekening die Hortulus zelf maakt (werkt ook zonder internet). Daarbovenop toont je browser een foto van Wikipedia, gezocht op de Latijnse naam, met een link naar de bron. Je browser vraagt die rechtstreeks op bij Wikipedia; Home Assistant zelf maakt geen verbinding. Wil je dat niet, zet het dan uit onder **Instellingen → Weergave** (per browser).

## Hoe werkt het tuinplan per jaar en de jaarovergang?

In **Tuinplan** geef je de tuin vorm, zonder planten: zones (volle grond, serre, koude bak, bloembakken & potten, boomgaard …), bedden en elementen zoals oprit, huis, watervat, haag, gras, tuinhuis of een pad in de serre. Dat plan geldt voor één seizoen. In de **Planner** beplant je dat seizoen op zijn tuinplan; zones en bedden liggen daar vast.

Niets gaat vanzelf naar een nieuw jaar, ook vaste planten niet. Op het einde van het jaar open je de **Jaarovergang** (knop in Tuinplan en Planner; in januari herinnert Advies je eraan). Daar kies je welke zones en elementen meegaan (of je gebruikt het plan dat je al voor volgend jaar tekende), welke vaste planten en welke overwinterende gewassen (knoflook, winterprei …) je overzet, en of het nieuwe jaar meteen je actieve tuin wordt. Het oude plan wordt gearchiveerd; alles staat in het systeemlogboek en kan je terugdraaien.

## Kan ik opnieuw beginnen met een nieuw tuinplan?

Ja. In **Tuinplan → Plannen** kies je **Nieuw plan beginnen**: volledig leeg (vanaf nul), met dezelfde zones maar zonder bedden en gewassen, of met zones en bedden maar zonder gewassen. Het huidige plan wordt dan **niet-actief**: het blijft bewaard met zijn naam, bedden en gewassen, en met **Activeren** zet je het later terug (het plan dat op dat moment actief is, wordt dan zelf niet-actief). Een niet-actief plan dat je niet meer nodig hebt, kan je verwijderen. Alles staat in het systeemlogboek.

## Automatisch invullen plaatst bijna niets. Waarom?

Meestal is het gewoon te laat in het seizoen: in oktober is het zaai- of plantvenster van bijna alle gewassen voor dit jaar voorbij. Het venster van Automatisch invullen zegt nu per plant waarom hij niet geplaatst werd (te laat, verkeerd zonetype, niet onder glas, vorst vóór de oogst, vruchtwisseling, slechte buur, geen plaats meer) en stelt voor om het **volgende seizoen** in te vullen. Heeft dat seizoen nog geen tuinplan, dan vult Hortulus in op het laatste plan en kopieert het mee bij het toepassen.

Voor één plant kan je in **Analyse → Waarom niet?** per bed zien of hij past, en zo niet, waarom - met dezelfde regels als bij slepen en automatisch invullen.

## Waar vind ik fouten en onverwachte dingen terug?

In het tabblad **Analyse**:

- **Controle** legt tuinplannen, gewassen en seizoenen naast elkaar en meldt wat niet klopt: een jaar met gewassen maar zonder tuinplan, gewassen waarvan het bed niet op het plan staat (onzichtbaar in de planner), bedden buiten hun zone, gewassen die over elkaar liggen of te laat gepland staan, een vergeten jaarovergang …, met een knop naar de juiste plek.
- **Waarom niet?** verklaart waarom een plant ergens niet past.
- **Fouten** toont elke actie die Hortulus weigerde, met de reden.
- **Systeemlogboek** is hetzelfde logboek als in **Logboek → Systeemlogboek**.

## Kan ik de datums van mijn gewassen aanpassen zonder te slepen?

Ja, in het tabblad **Teelten** staan alle gewassen van een seizoen op één lijst (per bed, per gewas of op datum). Daar pas je methode, status, aantal, geplande en echte zaai-, uitplant-, oogst- en einddatums en notities rechtstreeks aan. Een lege geplande datum rekent Hortulus zelf uit (grijs eronder). Klik op een plant voor alle details.
