import { subjectsForStream } from "./subjects";

// Client-safe: no db, no node built-ins — the picker island imports this.
// DB access lives in users.ts. Improvement exam rule: a student re-appears
// for at most 3 subjects. The stored list is always a deduped subset of
// the student's own stream (at most 3); empty means undecided, and the app
// shows the full stream.

export const MAX_IMPROVEMENT_SUBJECTS = 3;

// Raw stored slugs, sanitized against a stream: unknown or out-of-stream
// slugs (e.g. after a stream switch) are dropped, never shown.
export function sanitizeTrio(slugs: string[], stream: string): string[] {
  const valid = new Set(subjectsForStream(stream).map((s) => s.slug));
  const seen = new Set<string>();
  const out: string[] = [];
  for (const slug of slugs) {
    if (!valid.has(slug) || seen.has(slug)) continue;
    seen.add(slug);
    out.push(slug);
    if (out.length >= MAX_IMPROVEMENT_SUBJECTS) break;
  }
  return out;
}

// Calculator recommendation: the 3 weakest subjects by priority rank.
// Fewer than 3 ranked subjects → return whatever exists.
export function recommendedTrio(
  priorities: { subjectSlug: string; rank: number }[],
): string[] {
  return [...priorities]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, MAX_IMPROVEMENT_SUBJECTS)
    .map((p) => p.subjectSlug);
}
