import { describe, expect, it } from "vitest";
import { studyStreak } from "./progress";

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

describe("studyStreak", () => {
  it("counts consecutive days ending today", () => {
    expect(studyStreak([daysAgo(0), daysAgo(1), daysAgo(2)])).toBe(3);
  });

  it("stays alive when only yesterday was active", () => {
    expect(studyStreak([daysAgo(1), daysAgo(2)])).toBe(2);
  });

  it("breaks on a missed day", () => {
    expect(studyStreak([daysAgo(0), daysAgo(2)])).toBe(1);
  });

  it("is zero with no activity", () => {
    expect(studyStreak([])).toBe(0);
  });
});
