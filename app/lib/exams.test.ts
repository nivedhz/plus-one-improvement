import { describe, expect, it } from "vitest";
import { daysUntilPaper, examsForSubjects, EXAM_TIMETABLE } from "./exams";

describe("exam timetable", () => {
  it("covers nine sessions, Oct 12 to 17", () => {
    expect(EXAM_TIMETABLE).toHaveLength(9);
    expect(EXAM_TIMETABLE[0].startIso.startsWith("2026-10-12")).toBe(true);
    expect(EXAM_TIMETABLE.at(-1)?.startIso.startsWith("2026-10-17")).toBe(true);
    for (const s of EXAM_TIMETABLE) {
      expect(s.subjects.length).toBeGreaterThan(0);
    }
  });

  it("maps trio subjects to their earliest paper", () => {
    const papers = examsForSubjects(["physics", "chemistry", "biology"]);
    expect(papers.map((p) => p.slug)).toEqual(["physics", "chemistry", "biology"]);
    expect(papers[0].dayLabel).toBe("Mon 12 Oct");
    expect(papers[2].dayLabel).toBe("Sat 17 Oct");
  });

  it("skips unknown slugs and subjects with no paper", () => {
    expect(examsForSubjects(["nope"])).toEqual([]);
    expect(examsForSubjects([])).toEqual([]);
  });

  it("counts whole days until a paper", () => {
    const now = new Date("2026-10-10T10:00:00+05:30");
    expect(daysUntilPaper("2026-10-12T09:30:00+05:30", now)).toBe(2);
    expect(daysUntilPaper("2026-10-10T09:30:00+05:30", now)).toBe(0);
    expect(daysUntilPaper("2026-10-08T09:30:00+05:30", now)).toBe(-2);
  });
});
