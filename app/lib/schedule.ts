import { EXAM_DATE_ISO } from "./site";

export type DayTone = "red" | "orange" | "green";

export type ScheduleItem = {
  slug: string;
  name: string;
  // Priority level from saved marks, or null when the user hasn't entered any.
  level: string | null;
};

export type CalendarDay = {
  key: string;
  dayNum: number;
  isToday: boolean;
  isPast: boolean;
  subjects: { slug: string; name: string }[];
  tone: DayTone | null;
};

export type Schedule = {
  days: CalendarDay[];
  mode: "priority" | "load";
  rangeLabel: string;
};

const DAY_MS = 86_400_000;

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function short(d: Date): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// Rolling 5-week plan from Monday of this week up to the exam (max 35 days).
// Rotation walks the subjects weakest-first; every third day doubles up and
// Sundays add a revision subject. Day color follows subject priority when
// marks exist (Critical red, High orange, rest green), otherwise day load
// (3+ heavy red, 2 medium orange, 1 light green).
export function buildSchedule(items: ScheduleItem[], now = new Date()): Schedule {
  const today = startOfDay(now);
  const exam = startOfDay(new Date(EXAM_DATE_ISO));
  const last = new Date(Math.min(exam.getTime(), today.getTime() + 34 * DAY_MS));

  const gridStart = new Date(today);
  gridStart.setDate(gridStart.getDate() - ((gridStart.getDay() + 6) % 7));

  const mode: Schedule["mode"] = items.some((i) => i.level) ? "priority" : "load";
  const n = Math.max(1, items.length);
  const days: CalendarDay[] = [];

  for (let d = new Date(gridStart); d <= last; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (date < today) {
      days.push({ key, dayNum: date.getDate(), isToday: false, isPast: true, subjects: [], tone: null });
      continue;
    }
    const idx = Math.round((date.getTime() - today.getTime()) / DAY_MS);
    const picked = [items[idx % n]];
    if (idx % 3 === 2) picked.push(items[(idx + 2) % n]);
    if (date.getDay() === 0) picked.push(items[(idx + 4) % n]);
    const seen = new Set<string>();
    const subjects = picked
      .filter((p) => (seen.has(p.slug) ? false : (seen.add(p.slug), true)))
      .map((p) => ({ slug: p.slug, name: p.name }));
    const levels = picked.map((p) => p.level);

    let tone: DayTone;
    if (levels.includes("Critical")) tone = "red";
    else if (levels.includes("High")) tone = "orange";
    else if (levels.some(Boolean)) tone = "green";
    else tone = subjects.length >= 3 ? "red" : subjects.length === 2 ? "orange" : "green";

    days.push({
      key,
      dayNum: date.getDate(),
      isToday: date.getTime() === today.getTime(),
      isPast: false,
      subjects,
      tone,
    });
  }

  return { days, mode, rangeLabel: `${short(today)} – ${short(last)}` };
}
