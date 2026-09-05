import { describe, expect, it } from "vitest";
import {
  MAX_IMPROVEMENT_SUBJECTS,
  orphanedSlugs,
  recommendedTrio,
  sanitizeTrio,
} from "./improvement";

describe("improvement trio", () => {
  it("caps at 3 subjects", () => {
    expect(MAX_IMPROVEMENT_SUBJECTS).toBe(3);
    // sanitizeTrio caps overflow (request-shape limits live in the route
    // schema; over-limit and unknown slugs are covered live via curl).
    expect(
      sanitizeTrio(["physics", "chemistry", "zoology", "botany"], "biology"),
    ).toHaveLength(3);
  });

  it("keeps only known in-stream slugs, deduped, in order", () => {
    expect(
      sanitizeTrio(
        ["physics", "nope", "chemistry", "physics", "zoology", "botany"],
        "biology",
      ),
    ).toEqual(["physics", "chemistry", "zoology"]);
    // CS stream excludes the biology pair.
    expect(sanitizeTrio(["botany", "physics"], "cs")).toEqual(["physics"]);
  });

  it("recommends the 3 weakest subjects by rank", () => {
    const ranked = [
      { subjectSlug: "english", rank: 3 },
      { subjectSlug: "physics", rank: 1 },
      { subjectSlug: "chemistry", rank: 2 },
      { subjectSlug: "mathematics", rank: 4 },
    ];
    expect(recommendedTrio(ranked)).toEqual(["physics", "chemistry", "english"]);
  });

  it("recommends fewer when fewer are ranked", () => {
    expect(recommendedTrio([{ subjectSlug: "physics", rank: 1 }])).toEqual(["physics"]);
    expect(recommendedTrio([])).toEqual([]);
  });

  it("reports picks orphaned by a stream switch", () => {
    expect(orphanedSlugs(["zoology", "botany", "physics"], "cs")).toEqual([
      "zoology",
      "botany",
    ]);
    expect(orphanedSlugs(["physics", "chemistry"], "cs")).toEqual([]);
    expect(orphanedSlugs([], "biology")).toEqual([]);
  });
});
