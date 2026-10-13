import { test } from "node:test";
import assert from "node:assert/strict";
import { entityFits, fittingEntities, type EntityLike } from "../src/util/entities";

const e = (entity_id: string, attributes: Record<string, unknown> = {}): EntityLike => ({ entity_id, state: "1", attributes });

const STATES: Record<string, EntityLike> = Object.fromEntries([
  e("valve.bed_1"), e("switch.drip"), e("switch.pump_plug", { device_class: "outlet" }), e("light.porch"),
  e("sensor.soil", { device_class: "moisture", unit_of_measurement: "%" }),
  e("sensor.living_room", { device_class: "humidity", unit_of_measurement: "%" }),
  e("sensor.outside_temp", { device_class: "temperature", unit_of_measurement: "°C" }),
  e("sensor.bed_1_soil_temperature", { device_class: "temperature", unit_of_measurement: "°C" }),
  e("sensor.npk_nitrogen", { unit_of_measurement: "mg/kg" }), e("sensor.npk_phosphorus", { unit_of_measurement: "mg/kg" }),
  e("sensor.npk_potassium", { unit_of_measurement: "mg/kg" }), e("sensor.mystery", { unit_of_measurement: "mg/kg" }),
  e("sensor.rain_today", { device_class: "precipitation", unit_of_measurement: "mm" }),
  e("sensor.water_meter", { device_class: "water", unit_of_measurement: "m³" }),
  e("tts.google_en"), e("media_player.kitchen"), e("cover.garage", { device_class: "garage" }), e("cover.gh_window", { device_class: "window" }),
].map((s) => [s.entity_id, s]));

const ids = (kind: Parameters<typeof fittingEntities>[0]) => fittingEntities(kind, STATES).map((s) => s.entity_id).sort();

test("irrigation offers valves and switches, never lights or smart plugs", () => {
  assert.deepEqual(ids("irrigation"), ["switch.drip", "valve.bed_1"]);
  assert.deepEqual(ids("pump"), ["switch.drip", "switch.pump_plug", "valve.bed_1"]);
});

test("sensors are matched on what they measure", () => {
  assert.deepEqual(ids("soil_moisture"), ["sensor.soil"]);
  assert.deepEqual(ids("air_humidity"), ["sensor.living_room"]);
  assert.deepEqual(ids("air_temperature"), ["sensor.outside_temp"]);
  assert.deepEqual(ids("soil_temperature"), ["sensor.bed_1_soil_temperature"]);
  assert.deepEqual(ids("npk_n"), ["sensor.npk_nitrogen"]);
  assert.deepEqual(ids("npk_p"), ["sensor.npk_phosphorus"]);
  assert.deepEqual(ids("npk_k"), ["sensor.npk_potassium"]);
  assert.deepEqual(ids("rain"), ["sensor.rain_today"]);
  assert.deepEqual(ids("meter"), ["sensor.water_meter"]);
});

test("speech, speakers and covers", () => {
  assert.deepEqual(ids("tts"), ["tts.google_en"]);
  assert.deepEqual(ids("media_player"), ["media_player.kitchen"]);
  assert.ok(entityFits("vent", STATES["cover.gh_window"]));
  assert.ok(!entityFits("vent", STATES["cover.garage"]));
  assert.ok(!entityFits("shade", STATES["cover.gh_window"]));
});
