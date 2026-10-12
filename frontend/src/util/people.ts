// Household members (person.* entities) for task assignment, refreshed by the panel.
import type { HomeAssistant } from "../types";

export interface Person { id: string; name: string }
let people: Person[] = [];

export function setPersons(hass: HomeAssistant): void {
  people = Object.values(hass.states)
    .filter((s) => s.entity_id.startsWith("person."))
    .map((s) => ({ id: s.entity_id, name: String(s.attributes.friendly_name ?? s.entity_id.slice(7)) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const persons = (): Person[] => people;

export const personName = (id: string | null | undefined): string =>
  (id && people.find((p) => p.id === id)?.name) || (id ? id.replace(/^person\./, "") : "");
