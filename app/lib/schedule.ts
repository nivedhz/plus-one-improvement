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
  subjects: { slug: string; name: string }[];
  chapters: PlannedChapter[];
  // Chapters planned for the day (0 once the backlog is exhausted).
  goal: number;
  tone: DayTone | null;
};

export type Schedule = {
  days: CalendarDay[];
  mode: "priority" | "load";
  rangeLabel: string;
  // Weekday chapter pace: ceil(remaining / daysLeft), min 1 (0 when done).
  dailyGoal: number;
  // Chapters that can't fit even at a sustainable max pace.
  behindBy: number;
  remaining: number;
  daysLeft: number;
};

const DAY_MS = 86_400_000;

// Weekends fit twice the chapters — more time, harder push.
const WEEKEND_MULTIPLE = 2;
// Above this daily pace we call the plan behind instead of compressing.
const SUSTAINABLE_MAX = 4;

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

function isWeekend(d: Date): boolean {
  return d.getDay() === 0 || d.getDay() === 6;
}

export function dailyGoal(remaining: number, daysLeft: number): number {
  if (remaining <= 0) return 0;
  if (daysLeft <= 1) return remaining;
  return Math.max(1, Math.ceil(remaining / daysLeft));
}

// Pure planner: subjects with their UNFINISHED chapters in, dated chapter
// plan out. Nothing is stored — every load recomputes from current
// progress, so skipped work automatically redistributes across the days
// that remain (rollover by recompute, no bookkeeping).
export function planSchedule(opts: {
  subjects: ScheduleSubject[];
  // Unfinished chapters per subject slug, in catalog order.
  backlogs: Record<string, BacklogChapter[]>;
  now?: Date;
}): Schedule {
  const { subjects, backlogs, now = new Date() } = opts;
  const today = startOfDay(now);
  const exam = startOfDay(new Date(EXAM_DATE_ISO));
  const last = new Date(Math.min(exam.getTime(), today.getTime() + 34 * DAY_MS));

  const gridStart = new Date(today);
  gridStart.setDate(gridStart.getDate() - ((gridStart.getDay() + 6) % 7));

  const daysLeft = Math.max(
    0,
    Math.round((last.getTime() - today.getTime()) / DAY_MS) + 1,
  );
  const remaining = subjects.reduce((sum, s) => sum + (backlogs[s.slug]?.length ?? 0), 0);
  const goal = dailyGoal(remaining, daysLeft);
  const behindBy = Math.max(0, remaining - SUSTAINABLE_MAX * daysLeft);

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

  const days: CalendarDay[] = [];
  for (let d = new Date(gridStart); d <= last; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (date < today) {
      days.push({
        key,
        dayNum: date.getDate(),
        isToday: false,
        isPast: true,
        subjects: [],
        chapters: [],
        goal: 0,
        tone: null,
      });
      continue;
    }
    const cap = isWeekend(date) ? WEEKEND_MULTIPLE * goal : goal;
    const chapters: PlannedChapter[] = [];
    if (isWeekend(date)) {
      // Deep work: drain the weakest backlog first while time is ample.
      while (chapters.length < cap) {
        const next = ordered.find((s) => (queues.get(s.slug)?.length ?? 0) > 0);
        if (!next) break;
        const planned = takeNext(next.slug);
        if (planned) chapters.push(planned);
      }
    } else {
      // Balanced days: round-robin across weakest-first subjects.
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

    days.push({
      key,
      dayNum: date.getDate(),
      isToday: date.getTime() === today.getTime(),
      isPast: false,
      subjects: daySubjects,
      chapters,
      goal: chapters.length,
      tone,
    });
  }

  return {
    days,
    mode,
    rangeLabel: `${short(today)} – ${short(last)}`,
    dailyGoal: goal,
    behindBy,
    remaining,
    daysLeft,
  };
}
