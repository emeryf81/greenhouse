# Sensoren kiezen en kopen

Hortulus werkt ook zonder één sensor: dan rekent het met de weersvoorspelling en een waterbalans. Maar een paar goedgekozen sensoren maken het advies veel nauwkeuriger - vooral bodemvocht en de temperatuur in de serre. Dit hoofdstuk helpt je kiezen, kopen en koppelen.

## Wat levert het meeste op?

| Prioriteit | Sensor | Waarom | Koppelen in Hortulus |
|---|---|---|---|
| 1 | **Luchttemperatuur in de serre** (liefst met luchtvochtigheid) | verluchten, schaduw, vorst, ziekterisico | Zone › sensoren › luchttemperatuur / -vochtigheid |
| 2 | **Bodemvocht per bed** | water geven op maat i.p.v. op gevoel | Bed › sensoren › bodemvocht |
| 3 | **Bodemtemperatuur** | zaaimoment, groei (graaddagen) | Bed › sensoren › bodemtemperatuur |
| 4 | **Regenmeter** of weerstation | regen echt gemeten, water besparen | Instellingen › regen |
| 5 | **Buitentemperatuur** op plantniveau (± 50 cm) | nauwkeurigere vorstwaarschuwing | Instellingen › buitentemperatuur |
| Extra | Bladnatheid, licht (lux/PAR), EC / NPK | schimmelrisico, lichtsom, bemesting | Zone / bed › geavanceerd |
| Actuator | Klep, pomp, raamopener, schaduwscherm | automatisch water geven en verluchten | Bed › irrigatie, Zone › raam / schaduw |

## De soorten en hun voor- en nadelen

### Zigbee (via Zigbee2MQTT of ZHA)
Goedkoop, batterij gaat 1-2 jaar mee, betrouwbaar mesh-netwerk. Je hebt een Zigbee-stick nodig (bv. SONOFF ZBDongle, SkyConnect / Home Assistant Connect ZBT-1). **Tip:** een netstroomapparaat (slimme stekker) in het tuinhuis of de serre werkt als repeater en vergroot het bereik.
- Bodemvochtsensoren in de "Tuya Zigbee soil moisture"-familie meten vocht en temperatuur; kies een type met **capacitieve** meting (geen roestende pinnen).
- Temperatuur/vocht-sensoren (Aqara, SONOFF SNZB-02, Tuya) - kies voor de serre een model met display of een externe probe, en hang het **in de schaduw** (anders meet je zon, geen lucht).

### Ecowitt (433/868 MHz met gateway)
Zeer populair bij tuiniers: de **WH51** bodemvochtsensor (AA-batterij, ±1 jaar, groot bereik), bodemtemperatuurprobe (WN34), bladnatheid (WN35), regenmeter en complete weerstations. Gateway GW1100/GW2000 koppelt lokaal via de **Ecowitt-integratie** van Home Assistant. Groot bereik tot achterin de tuin.

### Bluetooth (BLE)
De bekende **Mi Flora / Flower Care** plantensensor meet vocht, temperatuur, licht en geleidbaarheid. Goedkoop, maar beperkt bereik: je hebt een **ESPHome Bluetooth-proxy** (ESP32 van een paar euro) in de buurt nodig.

### Wifi en ESPHome (zelf bouwen)
Een ESP32 met capacitieve bodemvochtsensoren (v1.2), een DS18B20 bodemthermometer of een BME280/SHT31 voor lucht. Goedkoop en flexibel, maar wifi in de tuin vraagt stroom (netvoeding, of zonnepaneeltje + deep sleep). Kijk op de ESPHome-website voor voorbeelden. Kalibreer bodemvocht altijd: meet in droge en in kletsnatte grond en zet die waarden als 0 % en 100 %.

### Kleppen, pompen en raamopeners
- **Kleppen:** Zigbee- of wifi-waterkranen (Tuya/Sonoff/LinkTap), Gardena smart system (eigen integratie), of een 12/24 V magneetklep aan een relais (Shelly, ESPHome).
- **Pomp:** een slimme stekker of relais (Shelly) - stel in Hortulus de pompbeveiliging in (pomp gaat pas aan als een klep open is).
- **Serre:** automatische raamopeners op was werken zonder stroom; voor sturing via Home Assistant gebruik je een lineaire motor met relais of een slimme ventilator.

## Tips om goede sensoren te vinden

1. **Zoek eerst of Home Assistant het al ondersteunt:** de lijst met integraties op de Home Assistant-website, de apparatendatabase van Zigbee2MQTT ("supported devices") en de ESPHome-apparatenlijst. Wat daar staat, werkt meestal meteen.
2. **Zoektermen:** "zigbee soil moisture sensor", "capacitive soil moisture", "Ecowitt WH51", "zigbee temperature humidity sensor outdoor", "zigbee water valve", "LinkTap".
3. **Waterdicht:** kijk naar de IP-klasse - IP65 of beter voor buiten, IP67 voor bodemsensoren die in de grond steken. Bescherm de elektronica tegen directe zon.
4. **Batterij:** AA of AAA is makkelijker te vervangen dan knoopcellen; lithiumbatterijen houden het langer vol in de vorst.
5. **Bereik:** test vóór je koopt of je Zigbee/wifi tot achterin de tuin reikt; 433/868 MHz (Ecowitt) en LoRa gaan veel verder.
6. **Lokaal:** kies bij voorkeur apparaten die lokaal werken (Zigbee, Ecowitt, ESPHome) - geen cloud, geen abonnement, blijft werken als de fabrikant stopt.
7. **Waar kopen:** gespecialiseerde smarthome-webshops, de grote online marktplaatsen (goedkoper maar langere levertijd), bouwmarkten en tuincentra (vooral Gardena). Lees reviews op het Home Assistant-forum en op Reddit (r/homeassistant).
8. **Begin klein:** één serre-thermometer en één bodemvochtsensor in je belangrijkste bed. Breid pas uit als je ziet hoe je ze gebruikt.

## Plaatsen en onderhouden

- **Bodemvocht:** in de wortelzone (10-15 cm diep), tussen de planten, niet vlak naast een druppelaar. Eén sensor per bed met hetzelfde gewas en dezelfde grond is genoeg.
- **Serre-thermometer:** op plantenhoogte, in de schaduw (achter een plantenpot of in een stralingsschild), niet tegen het glas.
- **Buitentemperatuur:** op 50 cm hoogte in een stralingsschild (een omgekeerde witte bloempot werkt) - zo meet je de vorst die je planten voelen.
- **Regenmeter:** vrij van bomen en daken, waterpas.
- Haal bodemsensoren uit de grond vóór je spit of freest, en voor de winter als ze niet vorstbestendig zijn. Vervang batterijen in het voorjaar.

## Koppelen aan Hortulus

Open **Instellingen** (buitensensoren) of selecteer in de **Planner** een zone of bed en kies de sensor in het veld. Hortulus toont meteen de waarde, markeert sensoren die al lang niets meer stuurden als "verouderd" en valt dan terug op de waterbalans en de weersvoorspelling.
