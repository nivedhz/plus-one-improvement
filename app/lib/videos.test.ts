import { describe, expect, it } from "vitest";
import { getChapter, getSubject } from "./subjects";
import { CHAPTER_VIDEOS, chapterVideos, recentVideos } from "./videos";

// New additions must surface first in the Fresh strip — guards against
// the limit silently burying them again.
const NEW_IDS = [
  "lJqvNoHQdi0",
  "igeezdakcKQ",
  "iKRSnSsWOTA",
  "FPhrsxmauvY",
  "HehW4CzKLzE",
] as const;

describe("recent videos", () => {
  it("maps each new video to its chapter", () => {
    const expected: Record<string, [string, string]> = {
      lJqvNoHQdi0: ["biology", "morphology-of-flowering-plants"],
      igeezdakcKQ: ["biology", "plant-kingdom"],
      iKRSnSsWOTA: ["biology", "biological-classification"],
      FPhrsxmauvY: ["computer-science", "data-representation-and-boolean-algebra"],
      HehW4CzKLzE: ["computer-science", "discipline-of-computing"],
    };
    for (const [id, [subject, chapter]] of Object.entries(expected)) {
      expect(
        chapterVideos(subject, chapter).some((v) => v.youtubeId === id && v.recent),
      ).toBe(true);
    }
  });

  it("lists new additions before older recents", () => {
    const firstFive = recentVideos()
      .slice(0, 5)
      .map((r) => r.video.youtubeId);
    for (const id of NEW_IDS) {
      expect(firstFive).toContain(id);
    }
  });

  it("filters to the visible subjects when asked", () => {
    const all = recentVideos(20);
    expect(all.length).toBeGreaterThan(0);
    const filtered = recentVideos(20, ["physics"]);
    expect(filtered.length).toBeGreaterThan(0);
    for (const r of filtered) expect(r.subjectSlug).toBe("physics");
    expect(recentVideos(20, ["nope"])).toEqual([]);
  });

  it("maps every recent to a real catalog chapter", () => {
    // Catches mapping typos (wrong chapter slugs) that would silently
    // drop videos from the strip.
    for (const [subjectSlug, chapters] of Object.entries(CHAPTER_VIDEOS)) {
      const subject = getSubject(subjectSlug);
      for (const [chapterSlug, list] of Object.entries(chapters)) {
        if (!list.some((v) => v.recent)) continue;
        expect(subject, subjectSlug).toBeDefined();
        expect(
          subject && getChapter(subject, chapterSlug),
          `${subjectSlug}/${chapterSlug}`,
        ).toBeDefined();
      }
    }
  });
});
