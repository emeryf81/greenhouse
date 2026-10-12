# Watering

Too little water checks growth and gives split or bitter fruit; too much suffocates roots and encourages disease. This is how Hortulus works it out.

## Evaporation: ET0 and Kc

**Reference evapotranspiration (ET0)** is how much water a short, well-watered lawn evaporates per day. Hortulus calculates ET0 with the **FAO-56 Penman-Monteith** equation from the forecast's temperature, humidity, wind and cloud cover. When those are missing it falls back to the simpler **Hargreaves** equation (temperature only).

A crop uses ET0 × **Kc** (crop coefficient). Kc changes with the growth stage:

| Stage | Share of season | Kc (tomato example) |
|---|---|---|
| Initial | 15 % | 0.6 |
| Development | 25 % | rising to 1.15 |
| Mid-season | 40 % | 1.15 |
| Late season | 20 % | falling to 0.8 |

In a greenhouse evaporation is about 30 % lower (less wind and radiation), but rain does not count.

## Water balance per bed

Without a moisture sensor Hortulus keeps a **bucket** per bed: the root zone holds a certain amount of water (depending on soil and rooting depth). Every day crop evaporation is taken out and 80 % of the rain plus all irrigation goes in. Once half of the available water is used, it is time to water - back up to field capacity.

With a **soil moisture sensor** Hortulus uses the measured value and a target band per soil type.

## Practical rules

- Water **rarely and deeply** (10-20 litres per m²) rather than a little every day: it encourages deep roots.
- Water **in the morning** at the base of the plant, not over the leaves (less fungal disease).
- **Mulch** halves evaporation from the soil.
- Critical moments: germination, planting out, flowering and fruit set (tomato, beans), tuber formation (potato).
- Rainwater is better than tap water for acid-loving plants, and free.

## Automatic watering

With valves (switch or valve entities) Hortulus can water by itself. Safety rules:

- **Frost lockout**: outdoor valves stay closed when frost is forecast within 12 hours or it is too cold now - frozen drip lines burst.
- **Rain skip** when more than the set amount of rain is forecast in the next 24 hours.
- **Maximum runtime** per valve.
- **Pump interlock**: the pump only runs while a valve is open, and stops first.
