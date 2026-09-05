import { describe, expect, it } from "vitest";
import { computePriorities } from "./marks";

describe("computePriorities", () => {
  it("ranks the lowest percentage first with a Critical band", () => {
    const out = computePriorities([
      { subject: "physics", got: 15, max: 60 },
      { subject: "mathematics", got: 55, max: 60 },
    ]);
    expect(out[0].subjectSlug).toBe("physics");
    expect(out[0].rank).toBe(1);
    expect(out[0].level).toBe("Critical");
    expect(out[1].subjectSlug).toBe("mathematics");
  });

  it("caps percentages at 100 and keeps scores private per subject", () => {
    const out = computePriorities([{ subject: "english", got: 90, max: 80 }]);
    expect(out[0].pct).toBe(100);
    expect(out[0].level).toBe("Maintain");
    // No totals leak: each row carries only its own subject numbers.
    expect(out[0]).not.toHaveProperty("total");
  });
});
