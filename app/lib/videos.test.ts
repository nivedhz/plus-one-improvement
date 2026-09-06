import { describe, expect, it } from "vitest";
import { chapterVideos, recentVideos } from "./videos";

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
      lJqvNoHQdi0: ["botany", "morphology-of-flowering-plants"],
      igeezdakcKQ: ["botany", "plant-kingdom"],
      iKRSnSsWOTA: ["botany", "biological-classification"],
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
});
