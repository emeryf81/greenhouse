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

Meerjarige planten (fruitbomen, bessen, asperge, vaste kruiden) gaan automatisch mee naar elk volgend seizoen. Selecteer de plant in de planner en kies **Verwijderen**. Je krijgt twee keuzes: **Weg vanaf dit seizoen** (de vorige jaren behouden hem voor wisselteelt en historiek) of **Volledig wissen**.

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
