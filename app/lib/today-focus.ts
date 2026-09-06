import type { CompletedChapter } from "./progress";
import type { PlannedChapter } from "./schedule";

// Sticky Today's Focus: today's set is fixed at the start-of-day quota, so
// completing a chapter ticks it instead of bubbling tomorrow's chapter up.
// `todayPlanned` comes from the schedule (unfinished only — it already
// contains the bubbled replacement); `todayCompleted` are today's finishes
// (all subjects, caller filters to visible). We keep completed rows and
// trim the plan to the slots that remain.
export type TodayFocus = {
  // Original slots for today (2 school days, up to 3 Fri/Sat/Sun at pace).
  quota: number;
  // Today's completions, deduplicated, most-recent first.
  done: CompletedChapter[];
  // Completions counted toward the quota (capped — extras are bonus).
  countedDone: number;
  // Unfinished chapters still owed today (bubbled extras trimmed off).
  remaining: PlannedChapter[];
  // True once the quota is fully ticked (extra study = bonus chooser).
  allDone: boolean;
};

export function buildTodayFocus(opts: {
  todayPlanned: PlannedChapter[];
  todayCompleted: CompletedChapter[];
  quota: number;
}): TodayFocus {
  const quota = Math.max(0, opts.quota);
  const seen = new Set<string>();
  const done = opts.todayCompleted.filter((c) => {
    const key = `${c.subjectSlug}:${c.chapterSlug}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const countedDone = Math.min(done.length, quota);
  const slotsLeft = Math.max(0, quota - countedDone);
  const remaining = opts.todayPlanned
    .filter((p) => !seen.has(`${p.subjectSlug}:${p.chapterSlug}`))
    .slice(0, slotsLeft);
  const allDone = quota > 0 && slotsLeft === 0;
  return { quota, done, countedDone, remaining, allDone };
}
