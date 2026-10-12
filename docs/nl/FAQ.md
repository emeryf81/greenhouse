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
(`document: tasks`); het bestand staat dan in `/local/hortulus/`.

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
