import { describe, expect, it } from "vitest";
import {
  dailyGoal,
  intensityOf,
  planSchedule,
  type BacklogChapter,
  type ScheduleSubject,
} from "./schedule";

// Monday 7 Sep 2026 — pins weekday positions deterministically.
// (Sep 2026: Fri 4th, Sat 5th, Sun 6th, Mon 7th, Tue 8th, Wed 9th, Thu 10th.)
const MONDAY = new Date(2026, 8, 7, 12, 0, 0);

function ch(n: number, prefix = "ch"): BacklogChapter[] {
  return Array.from({ length: n }, (_, i) => ({
    slug: `${prefix}-${i + 1}`,
    title: `${prefix} ${i + 1}`,
  }));
}

const PHY: ScheduleSubject = { slug: "physics", name: "Physics", level: "Critical" };
const CHE: ScheduleSubject = { slug: "chemistry", name: "Chemistry", level: "High" };
const MAT: ScheduleSubject = { slug: "mathematics", name: "Mathematics", level: null };

describe("dailyGoal", () => {
  it("is 0 when nothing remains", () => {
    expect(dailyGoal(0, 30)).toBe(0);
  });

  it("spreads the backlog, minimum 1", () => {
    expect(dailyGoal(10, 35)).toBe(1);
    expect(dailyGoal(70, 35)).toBe(2);
    expect(dailyGoal(71, 35)).toBe(3);
  });

  it("assigns everything on the last day", () => {
    expect(dailyGoal(5, 1)).toBe(5);
    expect(dailyGoal(5, 0)).toBe(5);
  });
});

describe("weekly rhythm", () => {
  it("peaks Fri and Sun, hard Wed, spread elsewhere", () => {
    // Fri 4th, Sun 6th: toughest (double capacity, drain weakest).
    expect(intensityOf(new Date(2026, 8, 4, 12))).toEqual({ mult: 2, drain: true });
    expect(intensityOf(new Date(2026, 8, 6, 12))).toEqual({ mult: 2, drain: true });
    // Wed 9th: the hard day in between.
    expect(intensityOf(new Date(2026, 8, 9, 12))).toEqual({ mult: 1.5, drain: true });
    // Mon/Tue/Thu: spread, base pace.
    for (const day of [7, 8, 10]) {
      expect(intensityOf(new Date(2026, 8, day, 12))).toEqual({
        mult: 1,
        drain: false,
      });
    }
    // Sat 5th: high volume, still spread.
    expect(intensityOf(new Date(2026, 8, 5, 12))).toEqual({
      mult: 1.5,
      drain: false,
    });
  });
});

describe("planSchedule", () => {
  it("ends the plan ~a week before the exam, buffer flagged", () => {
    // Mon 7 Sep → plan ends Tue 6 Oct (30 days), buffer 7–12 Oct.
    const s = planSchedule({ subjects: [PHY], backlogs: {}, now: MONDAY });
    expect(s.daysLeft).toBe(30);
    expect(s.bufferDays).toBe(6);
    const future = s.days.filter((d) => !d.isPast);
    const lastPlanned = future.filter((d) => !d.buffer).at(-1);
    expect([lastPlanned?.dayNum, lastPlanned?.goal]).toEqual([6, 0]);
    const buffer = future.filter((d) => d.buffer);
    expect(buffer).toHaveLength(6);
    expect(buffer[0].dayNum).toBe(7);
    for (const d of buffer) {
      expect(d.chapters).toEqual([]);
      expect(d.tone).toBeNull();
    }
  });

  it("spreads Saturdays, drains Sundays into the weakest backlog", () => {
    const s = planSchedule({
      subjects: [PHY, CHE],
      backlogs: { physics: ch(10, "p"), chemistry: ch(10, "c") },
      now: MONDAY,
    });
    const future = s.days.filter((d) => !d.isPast);
    // Monday: single weakest chapter.
    expect(future[0].chapters.map((c) => c.subjectSlug)).toEqual(["physics"]);
    // Saturday (spread day, cap 2): one chapter each.
    const saturday = future[5];
    expect(saturday.chapters).toHaveLength(2);
    expect(new Set(saturday.chapters.map((c) => c.subjectSlug)).size).toBe(2);
    // Sunday (peak drain, cap 2): both from the weakest backlog.
    const sunday = future[6];
    expect(sunday.chapters).toHaveLength(2);
    expect(sunday.chapters.every((c) => c.subjectSlug === "physics")).toBe(true);
  });

  it("round-robins balanced days across equal subjects", () => {
    const even: ScheduleSubject[] = [
      { slug: "a", name: "A", level: null },
      { slug: "b", name: "B", level: null },
      { slug: "c", name: "C", level: null },
    ];
    const s = planSchedule({
      subjects: even,
      backlogs: { a: ch(30, "a"), b: ch(30, "b"), c: ch(30, "c") },
      now: MONDAY,
    });
    expect(s.dailyGoal).toBeGreaterThanOrEqual(2);
    const first = s.days.filter((d) => !d.isPast)[0];
    const order = first.chapters.map((c) => c.subjectSlug);
    expect(order).toEqual([...order].sort());
    expect(new Set(order).size).toBe(order.length);
  });

  it("allocates every chapter exactly once and only from the backlog", () => {
    const backlogs = {
      physics: ch(14, "p"),
      chemistry: ch(9, "c"),
      mathematics: ch(5, "m"),
    };
    const pool = new Set(
      Object.entries(backlogs).flatMap(([sub, list]) =>
        list.map((c) => `${sub}:${c.slug}`),
      ),
    );
    const s = planSchedule({ subjects: [PHY, CHE, MAT], backlogs, now: MONDAY });
    const allocated = s.days.flatMap((d) =>
      d.chapters.map((c) => `${c.subjectSlug}:${c.chapterSlug}`),
    );
    expect(allocated).toHaveLength(28);
    expect(new Set(allocated).size).toBe(28);
    for (const key of allocated) expect(pool.has(key)).toBe(true);
  });

  it("rolls over by recompute: completed chapters vanish from the plan", () => {
    const full = { physics: ch(10, "p"), chemistry: ch(6, "c") };
    const before = planSchedule({ subjects: [PHY, CHE], backlogs: full, now: MONDAY });
    const totalBefore = before.days.reduce((n, d) => n + d.chapters.length, 0);
    expect(totalBefore).toBe(16);
    // Simulate finishing 5 chapters, then replan from current progress.
    const after = planSchedule({
      subjects: [PHY, CHE],
      backlogs: { physics: full.physics.slice(5), chemistry: full.chemistry },
      now: MONDAY,
    });
    const totalAfter = after.days.reduce((n, d) => n + d.chapters.length, 0);
    expect(totalAfter).toBe(11);
    expect(after.dailyGoal).toBeLessThanOrEqual(before.dailyGoal);
  });

  it("reports behindBy when the backlog cannot fit a sustainable pace", () => {
    const probe = planSchedule({ subjects: [PHY], backlogs: {}, now: MONDAY });
    const big = ch(probe.daysLeft * 4 + 7, "p");
    const s = planSchedule({
      subjects: [PHY],
      backlogs: { physics: big },
      now: MONDAY,
    });
    expect(s.behindBy).toBe(7);
  });

  it("rests when the backlog is empty", () => {
    const s = planSchedule({ subjects: [PHY, CHE], backlogs: {}, now: MONDAY });
    expect(s.remaining).toBe(0);
    expect(s.dailyGoal).toBe(0);
    expect(s.behindBy).toBe(0);
    for (const d of s.days.filter((d) => !d.isPast && !d.buffer)) {
      expect(d.chapters).toEqual([]);
      expect(d.tone).toBeNull();
    }
  });

  it("keeps priority tones and blanks the past", () => {
    const s = planSchedule({
      subjects: [PHY, CHE, MAT],
      backlogs: { physics: ch(3, "p") },
      now: MONDAY,
    });
    const first = s.days.filter((d) => !d.isPast)[0];
    expect(first.tone).toBe("red");
    for (const d of s.days.filter((d) => d.isPast)) {
      expect(d.chapters).toEqual([]);
      expect(d.subjects).toEqual([]);
      expect(d.tone).toBeNull();
    }
  });
});
