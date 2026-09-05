import type { Subject } from "./subjects";
import { subjectsForStream } from "./subjects";
import {
  getImprovementOrphans,
  getImprovementSubjects,
  getUserStream,
  type Stream,
} from "./users";

// Single read for every page that adapts to the improvement trio:
// the student's stream, sanitized trio, orphaned pick names (for the
// switch-stream notice), the full stream list, and the visible subset.
// Undecided (empty trio) → visible is the whole stream.
export type StudyFocus = {
  stream: Stream;
  trio: string[];
  dropped: string[];
  streamSubjects: Subject[];
  visible: Subject[];
};

export async function getStudyFocus(userId: string): Promise<StudyFocus> {
  const stream = await getUserStream(userId);
  const [trio, dropped] = await Promise.all([
    getImprovementSubjects(userId, stream),
    getImprovementOrphans(userId, stream),
  ]);
  const streamSubjects = subjectsForStream(stream);
  const visible =
    trio.length > 0
      ? streamSubjects.filter((s) => trio.includes(s.slug))
      : streamSubjects;
  return { stream, trio, dropped, streamSubjects, visible };
}
