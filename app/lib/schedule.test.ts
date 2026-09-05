import { describe, expect, it } from "vitest";
import {
  dailyGoal,
  dayCapacity,
  isDrainDay,
  isFreeDay,
  planSchedule,
  type BacklogChapter,
  type ScheduleSubject,
} from "./schedule";

// Monday 7 Sep 2026 — pins weekday positions deterministically.
// (Sep 2026: Fri 4th, Sat 5th, Sun 6th, Mon 7th, Tue 8th, Wed 9th, Thu 10th.)
const MONDAY = new Date(2026, 8, 7, 12, 0, 0);
// Monday 5 Oct 2026 — short horizon week (plan Oct 5–6, buffer Oct 7–12).
const OCTOBER_MONDAY = new Date(2026, 9, 5, 12, 0, 0);

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
    expect(dailyGoal(71, 35)).toBe(2);
  });

  it("caps at a humane pace so overload spills instead", () => {
    expect(dailyGoal(200, 30)).toBe(2);
  });

  it("assigns everything on the last day", () => {
    expect(dailyGoal(5, 1)).toBe(5);
    expect(dailyGoal(5, 0)).toBe(5);
  });
});

describe("weekly rhythm", () => {
  it("frees Fri/Sat/Sun and drains Wed/Fri/Sun", () => {
    // Fri 4th + Sat 5th + Sun 6th are free days; Mon/Tue/Thu are not.
    for (const day of [4, 5, 6]) {
      expect(isFreeDay(new Date(2026, 8, day, 12))).toBe(true);
    }
    for (const day of [7, 8, 9, 10]) {
      expect(isFreeDay(new Date(2026, 8, day, 12))).toBe(false);
    }
    // Wed 9th, Fri 4th, Sun 6th drain the weakest backlog.
    for (const day of [9, 4, 6]) {
      expect(isDrainDay(new Date(2026, 8, day, 12))).toBe(true);
    }
    for (const day of [7, 8, 10, 5]) {
      expect(isDrainDay(new Date(2026, 8, day, 12))).toBe(false);
    }
  });

  it("caps school days at 2 and free days at 3", () => {
    // Goal 1: school days take 1, free days take one extra.
    expect(dayCapacity(new Date(2026, 8, 7, 12), 1)).toBe(1);
    expect(dayCapacity(new Date(2026, 8, 4, 12), 1)).toBe(2);
    // Goal 2: school days take 2, free days top out at 3 — never more.
    expect(dayCapacity(new Date(2026, 8, 7, 12), 2)).toBe(2);
    expect(dayCapacity(new Date(2026, 8, 6, 12), 2)).toBe(3);
    expect(dayCapacity(new Date(2026, 8, 6, 12), 0)).toBe(0);
  });

  it("never plans more than 2 chapters on a school day", () => {
    // Inexhaustible backlog: every day fills to its cap.
    const backlogs = {
      physics: ch(300, "p"),
      chemistry: ch(300, "c"),
      mathematics: ch(300, "m"),
    };
    const s = planSchedule({ subjects: [PHY, CHE, MAT], backlogs, now: MONDAY });
    for (const d of s.days.filter((d) => !d.isPast && !d.buffer)) {
      // Keys are Y-M-D with a 0-indexed month; parse them back exactly.
      const [y, m, day] = d.key.split("-").map(Number);
      const weekday = new Date(y, m, day).getDay();
      const max = weekday === 5 || weekday === 6 || weekday === 0 ? 3 : 2;
      expect(d.chapters.length).toBeLessThanOrEqual(max);
    }
    // First full week hits every cap exactly: school days 2, free days 3.
    // (Wednesday's hardness is ordering, not volume — see Sunday drain test.)
    const week = s.days.filter((d) => !d.isPast).slice(0, 7);
    expect(week.map((d) => d.chapters.length)).toEqual([2, 2, 2, 2, 3, 3, 3]);
  });
});

describe("planSchedule", () => {
  it("shows only the current month with alignment blanks", () => {
    const sep = planSchedule({ subjects: [PHY], backlogs: {}, now: MONDAY });
    expect(sep.days.every((d) => d.dayNum >= 1)).toBe(true);
    // September 2026 starts on a Tuesday → one leading blank.
    expect(sep.leadBlanks).toBe(1);
    const oct = planSchedule({ subjects: [PHY], backlogs: {}, now: OCTOBER_MONDAY });
    // October 2026 starts on a Thursday → three blanks; exam ends the view.
    expect(oct.leadBlanks).toBe(3);
    expect(oct.days.at(-1)?.dayNum).toBe(12);
  });

  it("ends the plan ~a week before the exam, buffer flagged", () => {
    // Mon 7 Sep → plan ends Tue 6 Oct (30 days), buffer 7–12 Oct.
    const s = planSchedule({ subjects: [PHY], backlogs: {}, now: MONDAY });
    expect(s.daysLeft).toBe(30);
    expect(s.bufferDays).toBe(6);
    const oct = planSchedule({ subjects: [PHY], backlogs: {}, now: OCTOBER_MONDAY });
    expect(oct.daysLeft).toBe(2);
    const buffer = oct.days.filter((d) => d.buffer);
    expect(buffer.map((d) => d.dayNum)).toEqual([7, 8, 9, 10, 11, 12]);
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

  it("rests light days and never rests heavy ones", () => {
    const light = planSchedule({
      subjects: [PHY, CHE],
      backlogs: { physics: ch(3, "p"), chemistry: ch(2, "c") },
      now: MONDAY,
    });
    const restDays = light.days.filter((d) => d.rest);
    expect(restDays.length).toBeGreaterThan(0);
    for (const d of restDays) {
      expect(d.chapters).toEqual([]);
      expect(d.buffer).toBe(false);
      expect(d.isPast).toBe(false);
    }
    expect(
      light.days
        .filter((d) => !d.isPast && !d.buffer)
        .reduce((n, d) => n + d.chapters.length, 0),
    ).toBe(5);
    const heavy = planSchedule({
      subjects: [PHY],
      backlogs: { physics: ch(200, "p") },
      now: MONDAY,
    });
    expect(heavy.days.filter((d) => d.rest)).toEqual([]);
  });

  it("spills overload into buffer days, earliest first", () => {
    // Oct 5–6 plan caps (2 + 2) can't hold 16 chapters.
    const s = planSchedule({
      subjects: [PHY],
      backlogs: { physics: ch(16, "p") },
      now: OCTOBER_MONDAY,
    });
    expect(s.behindBy).toBe(0);
    const converted = s.days.filter((d) => !d.buffer && d.chapters.length > 0);
    // Plan days plus converted buffer days hold all 16 exactly once.
    const allocated = s.days.flatMap((d) =>
      d.chapters.map((c) => `${c.subjectSlug}:${c.chapterSlug}`),
    );
    expect(allocated).toHaveLength(16);
    expect(new Set(allocated).size).toBe(16);
    expect(converted.length).toBeGreaterThan(2);
    // Untouched tail buffer stays revision.
    expect(s.days.filter((d) => d.buffer).length).toBeGreaterThan(0);
  });

  it("reports behindBy only past the exam", () => {
    // Plan caps 2 + 2, buffer caps 2 + 2 + 3 + 3 + 3 + 2 = 15; 60 leaves 41.
    const s = planSchedule({
      subjects: [PHY],
      backlogs: { physics: ch(60, "p") },
      now: OCTOBER_MONDAY,
    });
    expect(s.behindBy).toBe(41);
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

  it("rests when the backlog is light but stays blank when clear", () => {
    const s = planSchedule({ subjects: [PHY, CHE], backlogs: {}, now: MONDAY });
    expect(s.remaining).toBe(0);
    expect(s.dailyGoal).toBe(0);
    expect(s.behindBy).toBe(0);
    for (const d of s.days.filter((d) => !d.isPast && !d.buffer)) {
      expect(d.chapters).toEqual([]);
      expect(d.rest).toBe(false);
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
