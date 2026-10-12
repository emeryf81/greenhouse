# Choosing and buying sensors

Hortulus works without a single sensor: it then relies on the forecast and a water balance. But a few well-chosen sensors make the advice much more accurate - above all soil moisture and the greenhouse temperature. This chapter helps you choose, buy and connect them.

## What pays off most?

| Priority | Sensor | Why | Connect in Hortulus |
|---|---|---|---|
| 1 | **Greenhouse air temperature** (ideally with humidity) | ventilation, shading, frost, disease risk | Zone › sensors › air temperature / humidity |
| 2 | **Soil moisture per bed** | water to measure instead of by feel | Bed › sensors › soil moisture |
| 3 | **Soil temperature** | sowing time, growth (degree days) | Bed › sensors › soil temperature |
| 4 | **Rain gauge** or weather station | rain really measured, save water | Settings › rain |
| 5 | **Outdoor temperature** at plant height (about 50 cm) | more accurate frost warnings | Settings › outdoor temperature |
| Extra | Leaf wetness, light (lux/PAR), EC / NPK | fungal risk, light sum, feeding | Zone / bed › advanced |
| Actuator | Valve, pump, vent opener, shade screen | automatic watering and ventilation | Bed › irrigation, Zone › vent / shade |

## The types and their pros and cons

### Zigbee (via Zigbee2MQTT or ZHA)
Cheap, batteries last 1-2 years, reliable mesh network. You need a Zigbee stick (e.g. SONOFF ZBDongle, Home Assistant Connect ZBT-1). **Tip:** a mains-powered device (smart plug) in the shed or greenhouse acts as a repeater and extends the range.
- Soil moisture sensors in the "Tuya Zigbee soil moisture" family measure moisture and temperature; choose a **capacitive** type (no corroding pins).
- Temperature/humidity sensors (Aqara, SONOFF SNZB-02, Tuya) - for the greenhouse pick one with a display or an external probe and mount it **in the shade** (otherwise you measure sunshine, not air).

### Ecowitt (433/868 MHz with a gateway)
Very popular with gardeners: the **WH51** soil moisture sensor (AA battery, about a year, long range), a soil temperature probe (WN34), leaf wetness (WN35), rain gauges and complete weather stations. The GW1100/GW2000 gateway connects locally through Home Assistant's **Ecowitt integration**. Long range to the far end of the garden.

### Bluetooth (BLE)
The well-known **Mi Flora / Flower Care** plant sensor measures moisture, temperature, light and conductivity. Cheap but short range: you need an **ESPHome Bluetooth proxy** (an ESP32 costing a few euros) nearby.

### Wi-Fi and ESPHome (build your own)
An ESP32 with capacitive soil moisture sensors (v1.2), a DS18B20 soil thermometer or a BME280/SHT31 for air. Cheap and flexible, but Wi-Fi in the garden needs power (mains, or a small solar panel + deep sleep). See the ESPHome website for examples. Always calibrate soil moisture: measure in dry and in soaking-wet soil and use those values as 0 % and 100 %.

### Valves, pumps and vent openers
- **Valves:** Zigbee or Wi-Fi water timers (Tuya/Sonoff/LinkTap), the Gardena smart system (own integration), or a 12/24 V solenoid valve on a relay (Shelly, ESPHome).
- **Pump:** a smart plug or relay (Shelly) - set up the pump interlock in Hortulus (the pump only runs while a valve is open).
- **Greenhouse:** wax-cylinder vent openers need no power; for control from Home Assistant use a linear actuator on a relay or a smart fan.

## Tips for finding good sensors

1. **First check that Home Assistant supports it:** the integrations list on the Home Assistant website, the Zigbee2MQTT device database ("supported devices") and the ESPHome device list. Anything listed there usually works straight away.
2. **Search terms:** "zigbee soil moisture sensor", "capacitive soil moisture", "Ecowitt WH51", "zigbee temperature humidity sensor outdoor", "zigbee water valve", "LinkTap".
3. **Waterproof:** check the IP rating - IP65 or better outdoors, IP67 for probes in the ground. Shield the electronics from direct sun.
4. **Battery:** AA or AAA is easier to replace than coin cells; lithium cells last longer in frost.
5. **Range:** test before buying whether Zigbee/Wi-Fi reaches the end of the garden; 433/868 MHz (Ecowitt) and LoRa go much further.
6. **Local:** prefer devices that work locally (Zigbee, Ecowitt, ESPHome) - no cloud, no subscription, they keep working if the maker stops.
7. **Where to buy:** specialised smart-home web shops, the large online marketplaces (cheaper but slower delivery), DIY stores and garden centres (mostly Gardena). Read reviews on the Home Assistant forum and Reddit (r/homeassistant).
8. **Start small:** one greenhouse thermometer and one soil moisture sensor in your main bed. Expand once you see how you use them.

## Placement and care

- **Soil moisture:** in the root zone (10-15 cm deep), between the plants, not right next to a dripper. One sensor per bed with the same crop and soil is enough.
- **Greenhouse thermometer:** at plant height, in the shade (behind a pot or in a radiation shield), not against the glass.
- **Outdoor temperature:** at 50 cm in a radiation shield (an upturned white flower pot works) - so you measure the frost your plants feel.
- **Rain gauge:** clear of trees and roofs, level.
- Pull soil probes out before digging or rotavating, and before winter if they are not frost-proof. Replace batteries in spring.

## Connecting to Hortulus

Open **Settings** (outdoor sensors) or select a zone or bed in the **Planner** and pick the sensor in the field. Hortulus shows the value straight away, flags sensors that have been silent for too long as "stale" and then falls back on the water balance and the forecast.
