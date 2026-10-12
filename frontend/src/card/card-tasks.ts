// Pure task selection for the Lovelace card (unit-tested without a DOM).
import type { Task } from "../types";
import { addDays } from "../util/garden";

const PRIORITY = ["urgent", "high", "normal", "low"];

/** Tasks for the card: open, due on or before the horizon, optionally one person's. */
export function cardTasks(tasks: Task[], today: string, days: number, assignee: string | null, max: number): { shown: Task[]; hidden: number } {
  const until = addDays(today, Math.max(0, days));
  const open = tasks
    .filter((t) => t.status === "open" && t.due <= until)
    .filter((t) => (assignee === null ? true : assignee === "" ? !t.assignee : t.assignee === assignee || !t.assignee))
    .sort((a, b) => a.due.localeCompare(b.due) || PRIORITY.indexOf(a.priority) - PRIORITY.indexOf(b.priority));
  return { shown: open.slice(0, max), hidden: Math.max(0, open.length - max) };
}
