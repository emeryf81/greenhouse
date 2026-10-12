import { test } from "node:test";
import assert from "node:assert/strict";
import { cardTasks } from "../src/card/card-tasks";
import type { Task } from "../src/types";

const task = (id: string, due: string, extra: Partial<Task> = {}): Task =>
  ({ id, due, title: id, type: "weed", status: "open", priority: "normal", estimated_minutes: 10, assignee: null, ...extra }) as Task;

const tasks = [
  task("late", "2026-10-10"),
  task("today", "2026-10-12", { priority: "high" }),
  task("today-low", "2026-10-12", { priority: "low" }),
  task("next-week", "2026-10-18"),
  task("done", "2026-10-12", { status: "done" }),
  task("emery", "2026-10-12", { assignee: "person.emery" }),
  task("sam", "2026-10-12", { assignee: "person.sam" }),
];

test("card shows overdue and today's open tasks, sorted by date and priority", () => {
  const { shown, hidden } = cardTasks(tasks, "2026-10-12", 0, null, 10);
  assert.deepEqual(shown.map((t) => t.id), ["late", "today", "emery", "sam", "today-low"]);
  assert.equal(hidden, 0);
});

test("card horizon, assignee filter and max rows", () => {
  assert.ok(cardTasks(tasks, "2026-10-12", 7, null, 10).shown.some((t) => t.id === "next-week"));
  const mine = cardTasks(tasks, "2026-10-12", 0, "person.emery", 10).shown.map((t) => t.id);
  assert.ok(mine.includes("emery") && mine.includes("today") && !mine.includes("sam"));
  assert.deepEqual(cardTasks(tasks, "2026-10-12", 0, "", 10).shown.map((t) => t.assignee), [null, null, null]);
  const capped = cardTasks(tasks, "2026-10-12", 0, null, 2);
  assert.equal(capped.shown.length, 2);
  assert.equal(capped.hidden, 3);
});
