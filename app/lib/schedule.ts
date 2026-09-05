import { EXAM_DATE_ISO } from "./site";

export type DayTone = "red" | "orange" | "green";

export type ScheduleSubject = {
  slug: string;
  name: string;
  // Priority level from saved marks, or null when the user hasn't entered any.
  level: string | null;
};

export type BacklogChapter = { slug: string; title: string };

export type PlannedChapter = {
  subjectSlug: string;
  subjectName: string;
  chapterSlug: string;
  title: string;
};

export type CalendarDay = {
  key: string;
  dayNum: number;
  isToday: boolean;
  isPast: boolean;
  // True for the pre-exam revision buffer (no new chapters planned).
  buffer: boolean;
  // True for planned rest: backlog too light to fill the day. Only set
  // while work remains — an empty backlog renders plain empty days.
  rest: boolean;
  subjects: { slug: string; name: string }[];
  chapters: PlannedChapter[];
  // Chapters planned for the day (0 once the backlog is exhausted).
  goal: number;
  tone: DayTone | null;
};

export type Schedule = {
  // Display days: the current calendar month only. Allocation still runs
  // the full horizon, so totals and goals stay correct.
  days: CalendarDay[];
  // Blank cells before the 1st so the month aligns to Monday.
  leadBlanks: number;
  mode: "priority" | "load";
  rangeLabel: string;
  // Weekday chapter pace: ceil(remaining / daysLeft), min 1 (0 when done).
  dailyGoal: number;
  // Chapters left over after the exam day — the load detector.
  behindBy: number;
  remaining: number;
  daysLeft: number;
  // Free days between plan end and the exam.
  bufferDays: number;
};

const DAY_MS = 86_400_000;

// The plan ends this many days before the exam — the buffer stays free
// for revision unless overload spills into it.
const EXAM_BUFFER_DAYS = 6;

// Weekly toughness rhythm (periodization, not linear sorting):
// Fri + Sun go hardest (drain the weakest backlog), Wed is the mid-week
// hard day, Sat carries high volume but spread out, Mon/Tue/Thu recover.
const WEEK_RHYTHM: Record<number, { mult: number; drain: boolean }> = {
  0: { mult: 2, drain: true }, // Sunday — toughest
  1: { mult: 1, drain: false }, // Monday
  2: { mult: 1, drain: false }, // Tuesday
  3: { mult: 1.5, drain: true }, // Wednesday — hard day in between
  4: { mult: 1, drain: false }, // Thursday
  5: { mult: 2, drain: true }, // Friday — toughest
  6: { mult: 1.5, drain: false }, // Saturday — volume, spread
};

export function intensityOf(date: Date): { mult: number; drain: boolean } {
  return WEEK_RHYTHM[date.getDay()];
}

// Weakness weights: lowest marks first. Unknown levels share the base.
const LEVEL_WEIGHT: Record<string, number> = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1.5,
  Maintain: 1,
};

function weightOf(level: string | null): number {
  return level ? (LEVEL_WEIGHT[level] ?? 1) : 1;
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function short(d: Date): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// Past this daily pace the overflow spills into the buffer (then behind).
const SUSTAINABLE_MAX = 4;

export function dailyGoal(remaining: number, daysLeft: number): number {
  if (remaining <= 0) return 0;
  if (daysLeft <= 1) return remaining;
  return Math.min(SUSTAINABLE_MAX, Math.max(1, Math.ceil(remaining / daysLeft)));
}

// Pure planner: subjects with their UNFINISHED chapters in, dated chapter
// plan out. Nothing is stored — every load recomputes from current
// progress, so skipped work automatically redistributes across the days
// that remain (rollover by recompute, no bookkeeping).
//
// Condition stack, in order:
//  1. Fill plan days (today → exam minus buffer) under the weekly rhythm.
//  2. Light load leaves far days empty → those become rest days.
//  3. Heavy overflow spills into buffer days, earliest first.
//  4. Anything left past the exam is behindBy — the load detector.
export function planSchedule(opts: {
  subjects: ScheduleSubject[];
  // Unfinished chapters per subject slug, in catalog order.
  backlogs: Record<string, BacklogChapter[]>;
  now?: Date;
}): Schedule {
  const { subjects, backlogs, now = new Date() } = opts;
  const today = startOfDay(now);
  const exam = startOfDay(new Date(EXAM_DATE_ISO));
  // Plan ends ~a week before the exam; the buffer stays free for revision.
  const planEnd = new Date(
    Math.max(exam.getTime() - EXAM_BUFFER_DAYS * DAY_MS, today.getTime()),
  );
  const gridEnd = new Date(Math.max(exam.getTime(), today.getTime()));

  // planEnd never predates today, so at least 1 day remains.
  const daysLeft = Math.round((planEnd.getTime() - today.getTime()) / DAY_MS) + 1;
  const remaining = subjects.reduce((sum, s) => sum + (backlogs[s.slug]?.length ?? 0), 0);
  const goal = dailyGoal(remaining, daysLeft);
  const bufferDays = Math.max(
    0,
    Math.round((exam.getTime() - planEnd.getTime()) / DAY_MS),
  );

  const mode: Schedule["mode"] = subjects.some((i) => i.level) ? "priority" : "load";
  const ordered = [...subjects].sort((a, b) => weightOf(b.level) - weightOf(a.level));
  const queues = new Map<string, BacklogChapter[]>(
    subjects.map((s) => [s.slug, [...(backlogs[s.slug] ?? [])]]),
  );
  const names = new Map(subjects.map((s) => [s.slug, s.name]));
  const levels = new Map(subjects.map((s) => [s.slug, s.level]));

  const takeNext = (slug: string): PlannedChapter | null => {
    const q = queues.get(slug);
    const head = q?.shift();
    if (!head) return null;
    return {
      subjectSlug: slug,
      subjectName: names.get(slug) ?? slug,
      chapterSlug: head.slug,
      title: head.title,
    };
  };

  const fillDay = (date: Date): PlannedChapter[] => {
    const { mult, drain } = intensityOf(date);
    const cap = Math.round(goal * mult);
    const chapters: PlannedChapter[] = [];
    if (drain) {
      // Hard days: drain the weakest backlog first while time is ample.
      while (chapters.length < cap) {
        const next = ordered.find((s) => (queues.get(s.slug)?.length ?? 0) > 0);
        if (!next) break;
        const planned = takeNext(next.slug);
        if (planned) chapters.push(planned);
      }
    } else {
      // Spread days: round-robin across weakest-first subjects.
      while (chapters.length < cap) {
        let took = false;
        for (const s of ordered) {
          if (chapters.length >= cap) break;
          if ((queues.get(s.slug)?.length ?? 0) === 0) continue;
          const planned = takeNext(s.slug);
          if (planned) {
            chapters.push(planned);
            took = true;
          }
        }
        if (!took) break;
      }
    }
    return chapters;
  };

  const shapeDay = (
    date: Date,
    key: string,
    flags: { isPast?: boolean; buffer?: boolean; rest?: boolean },
    chapters: PlannedChapter[],
  ): CalendarDay => {
    const seen = new Set<string>();
    const daySubjects = chapters
      .map((c) => ({ slug: c.subjectSlug, name: c.subjectName }))
      .filter((s) => (seen.has(s.slug) ? false : (seen.add(s.slug), true)));
    const dayLevels = daySubjects.map((s) => levels.get(s.slug) ?? null);

    // Day color follows subject priority when marks exist (Critical red,
    // High orange, rest green), otherwise day load.
    let tone: DayTone | null;
    if (dayLevels.includes("Critical")) tone = "red";
    else if (dayLevels.includes("High")) tone = "orange";
    else if (dayLevels.some(Boolean)) tone = "green";
    else if (daySubjects.length >= 3) tone = "red";
    else if (daySubjects.length === 2) tone = "orange";
    else if (daySubjects.length === 1) tone = "green";
    else tone = null;

    return {
      key,
      dayNum: date.getDate(),
      isToday: date.getTime() === today.getTime(),
      isPast: flags.isPast ?? false,
      buffer: flags.buffer ?? false,
      rest: flags.rest ?? false,
      subjects: daySubjects,
      chapters,
      goal: chapters.length,
      tone,
    };
  };

  // Full-horizon allocation first (plan days, then buffer spill), so
  // totals stay correct even though display shows one month at a time.
  const planned = new Map<string, CalendarDay>();
  const keyOf = (date: Date) =>
    `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  for (let d = new Date(today); d <= gridEnd; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
    const key = keyOf(date);
    if (date > planEnd) {
      planned.set(key, shapeDay(date, key, { buffer: true }, []));
      continue;
    }
    planned.set(key, shapeDay(date, key, {}, fillDay(date)));
  }
  // Spill: leftover backlog flows into buffer days, earliest first, under
  // the same rhythm. Converted days stop being buffer days.
  for (let d = new Date(today); d <= gridEnd; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
    if (date <= planEnd) continue;
    const key = keyOf(date);
    const chapters = fillDay(date);
    if (chapters.length > 0) {
      planned.set(key, shapeDay(date, key, {}, chapters));
    }
  }
  const behindBy = [...queues.values()].reduce((n, q) => n + q.length, 0);

  // Light load leaves far days empty — those become rest days (never when
  // the backlog is already clear, and never for past or buffer days).
  if (remaining > 0) {
    for (const day of planned.values()) {
      if (!day.isPast && !day.buffer && day.chapters.length === 0) {
        day.rest = true;
      }
    }
  }

  // Display: current calendar month only; next month appears next month.
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const leadBlanks = (monthStart.getDay() + 6) % 7;
  const days: CalendarDay[] = [];
  for (let d = new Date(monthStart); d <= gridEnd; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
    if (date.getMonth() !== today.getMonth()) continue;
    const key = keyOf(date);
    const hit = planned.get(key);
    if (hit) {
      days.push(hit);
      continue;
    }
    // Past days of this month (before today): blanked, never planned.
    days.push({
      key,
      dayNum: date.getDate(),
      isToday: false,
      isPast: true,
      buffer: false,
      rest: false,
      subjects: [],
      chapters: [],
      goal: 0,
      tone: null,
    });
  }

  return {
    days,
    leadBlanks,
    mode,
    rangeLabel: `${short(today)} – ${short(planEnd)}`,
    dailyGoal: goal,
    behindBy,
    remaining,
    daysLeft,
    bufferDays,
  };
}
