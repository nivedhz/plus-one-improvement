import { describe, expect, it } from "vitest";
import type { CompletedChapter } from "./progress";
import type { PlannedChapter } from "./schedule";
import { buildTodayFocus } from "./today-focus";

function planned(n: number): PlannedChapter[] {
  return Array.from({ length: n }, (_, i) => ({
    subjectSlug: "physics",
    subjectName: "Physics",
    chapterSlug: `ch-${i + 1}`,
    title: `Chapter ${i + 1}`,
  }));
}

function done(n: number): CompletedChapter[] {
  return Array.from({ length: n }, (_, i) => ({
    subjectSlug: "physics",
    subjectName: "Physics",
    chapterSlug: `done-${i + 1}`,
    title: `Done ${i + 1}`,
  }));
}

describe("buildTodayFocus", () => {
  it("keeps the full plan when nothing is done", () => {
    const f = buildTodayFocus({ todayPlanned: planned(2), todayCompleted: [], quota: 2 });
    expect(f.remaining).toHaveLength(2);
    expect(f.done).toEqual([]);
    expect(f.allDone).toBe(false);
  });

  it("ticks completions instead of bubbling replacements up", () => {
    // Start-of-day quota 2: one finished, plan recomputed to 2 (1 owed +
    // 1 bubbled from tomorrow) — display must trim back to 1 remaining.
    const [owed, bubbled] = planned(2);
    const f = buildTodayFocus({
      todayPlanned: [owed, bubbled],
      todayCompleted: done(1),
      quota: 2,
    });
    expect(f.done).toHaveLength(1);
    expect(f.remaining.map((c) => c.chapterSlug)).toEqual([owed.chapterSlug]);
    expect(f.allDone).toBe(false);
  });

  it("marks the goal done once the quota is ticked", () => {
    const f = buildTodayFocus({
      todayPlanned: planned(3),
      todayCompleted: done(3),
      quota: 3,
    });
    expect(f.remaining).toEqual([]);
    expect(f.countedDone).toBe(3);
    expect(f.allDone).toBe(true);
  });

  it("caps counted completions so bonus study stays bonus", () => {
    const f = buildTodayFocus({
      todayPlanned: planned(2),
      todayCompleted: done(5),
      quota: 2,
    });
    expect(f.countedDone).toBe(2);
    expect(f.remaining).toEqual([]);
    expect(f.allDone).toBe(true);
  });

  it("stays empty when there is no quota", () => {
    const f = buildTodayFocus({ todayPlanned: [], todayCompleted: [], quota: 0 });
    expect(f.allDone).toBe(false);
  });
});
