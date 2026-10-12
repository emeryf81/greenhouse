import { test } from "node:test";
import assert from "node:assert/strict";
import { History } from "../src/planner/history";

test("undo / redo / branch", () => {
  const h = new History<number>(0, 3);
  h.commit(1);
  h.commit(2);
  assert.equal(h.undo(), 1);
  assert.equal(h.undo(), 0);
  assert.equal(h.canUndo, false);
  assert.equal(h.redo(), 1);
  h.commit(5); // new branch clears redo
  assert.equal(h.canRedo, false);
  assert.equal(h.current, 5);
});

test("history is bounded", () => {
  const h = new History<number>(0, 3);
  for (let i = 1; i <= 10; i++) h.commit(i);
  let steps = 0;
  while (h.canUndo) { h.undo(); steps++; }
  assert.equal(steps, 3);
});
