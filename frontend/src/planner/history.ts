// Snapshot-based undo/redo. A "commit" happens once per finished gesture
// (drop, resize end, form change), never during pointer moves.

export class History<T> {
  private past: T[] = [];
  private future: T[] = [];

  constructor(private present: T, private readonly limit = 100) {}

  get current(): T {
    return this.present;
  }

  get canUndo(): boolean {
    return this.past.length > 0;
  }

  get canRedo(): boolean {
    return this.future.length > 0;
  }

  /** Record a new state; clears the redo stack. */
  commit(next: T): T {
    this.past.push(this.present);
    if (this.past.length > this.limit) this.past.shift();
    this.present = next;
    this.future = [];
    return next;
  }

  undo(): T {
    const prev = this.past.pop();
    if (prev === undefined) return this.present;
    this.future.push(this.present);
    this.present = prev;
    return prev;
  }

  redo(): T {
    const next = this.future.pop();
    if (next === undefined) return this.present;
    this.past.push(this.present);
    this.present = next;
    return next;
  }

  /** Replace everything (e.g. after a server reload). */
  reset(state: T): void {
    this.past = [];
    this.future = [];
    this.present = state;
  }
}
