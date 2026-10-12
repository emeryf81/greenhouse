// Tool catalogue shared by the task dialog (loaded once by the panel).
import type { Supplies } from "../types";

let supplies: Supplies | null = null;

export function setSupplies(next: Supplies): void {
  supplies = next;
}

/** "✂️ Secateurs, 🧤 Gloves" for a task type, or "" when unknown. */
export function toolsFor(taskType: string): string {
  const ids = supplies?.task_tools[taskType] ?? [];
  return ids.map((id) => `${supplies?.tools[id]?.emoji ?? ""} ${supplies?.tools[id]?.name ?? id}`.trim()).join(", ");
}
