import { describe, expect, it } from "vitest";
import { SUBJECTS, subjectsForStream } from "./subjects";

describe("subject catalog", () => {
  it("has unique subject and chapter slugs", () => {
    const slugs = SUBJECTS.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of SUBJECTS) {
      const chapters = s.chapters.map((c) => c.slug);
      expect(new Set(chapters).size).toBe(chapters.length);
      expect(s.maxMarks).toBeGreaterThan(0);
    }
  });

  it("splits streams on the sixth subject", () => {
    const cs = subjectsForStream("cs").map((s) => s.slug);
    const bio = subjectsForStream("biology").map((s) => s.slug);
    expect(cs).toContain("computer-science");
    expect(cs).not.toContain("botany");
    expect(bio).toContain("botany");
    expect(bio).toContain("zoology");
    expect(bio).not.toContain("computer-science");
  });
});
