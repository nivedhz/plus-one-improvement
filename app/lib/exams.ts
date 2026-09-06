import { getSubject } from "./subjects";

// Kerala Plus One improvement exams, October 2026 (FN 9:30 AM, AN 1:30 PM
// IST). Raw labels keep every paper truthful; `slugs` links the ones our
// catalog covers so trio students see only their papers.

export type ExamSession = {
  startIso: string;
  dayLabel: string;
  session: "FN" | "AN";
  subjects: string[];
  slugs: string[];
};

function fn(day: number): string {
  return `2026-10-${String(day).padStart(2, "0")}T09:30:00+05:30`;
}

function an(day: number): string {
  return `2026-10-${String(day).padStart(2, "0")}T13:30:00+05:30`;
}

export const EXAM_TIMETABLE: ExamSession[] = [
  {
    startIso: fn(12),
    dayLabel: "Mon 12 Oct",
    session: "FN",
    subjects: ["Physics", "Sociology", "Anthropology"],
    slugs: ["physics"],
  },
  {
    startIso: an(12),
    dayLabel: "Mon 12 Oct",
    session: "AN",
    subjects: ["Geography", "Music", "Social Work", "Geology", "Accountancy"],
    slugs: [],
  },
  {
    startIso: fn(13),
    dayLabel: "Tue 13 Oct",
    session: "FN",
    subjects: ["Part I English"],
    slugs: ["english"],
  },
  {
    startIso: fn(14),
    dayLabel: "Wed 14 Oct",
    session: "FN",
    subjects: ["Mathematics", "Part III Languages", "Sanskrit Sastra", "Psychology"],
    slugs: ["mathematics"],
  },
  {
    startIso: an(14),
    dayLabel: "Wed 14 Oct",
    session: "AN",
    subjects: ["Economics", "Electronic Systems"],
    slugs: [],
  },
  {
    startIso: fn(15),
    dayLabel: "Thu 15 Oct",
    session: "FN",
    subjects: ["Part II Languages", "Computer Science and Information Technology"],
    slugs: ["malayalam", "computer-science"],
  },
  {
    startIso: an(15),
    dayLabel: "Thu 15 Oct",
    session: "AN",
    subjects: [
      "Home Science",
      "Gandhian Studies",
      "Philosophy",
      "Journalism",
      "Computer Science",
      "Statistics",
    ],
    slugs: ["computer-science"],
  },
  {
    startIso: fn(16),
    dayLabel: "Fri 16 Oct",
    session: "FN",
    subjects: [
      "Chemistry",
      "History",
      "Islamic History & Culture",
      "Business Studies",
      "Communicative English",
    ],
    slugs: ["chemistry"],
  },
  {
    startIso: fn(17),
    dayLabel: "Sat 17 Oct",
    session: "FN",
    subjects: [
      "Biology",
      "Electronics",
      "Political Science",
      "Sanskrit Sahithya",
      "Computer Application",
      "English Literature",
    ],
    slugs: ["biology"],
  },
];

export type SubjectPaper = {
  slug: string;
  name: string;
  startIso: string;
  dayLabel: string;
  session: "FN" | "AN";
};

// One row per catalog subject: its earliest session. Unknown slugs and
// subjects with no paper are skipped, never invented.
export function examsForSubjects(slugs: string[]): SubjectPaper[] {
  const out: SubjectPaper[] = [];
  for (const slug of slugs) {
    const subject = getSubject(slug);
    if (!subject) continue;
    const session = EXAM_TIMETABLE.find((s) => s.slugs.includes(slug));
    if (!session) continue;
    out.push({
      slug,
      name: subject.name,
      startIso: session.startIso,
      dayLabel: session.dayLabel,
      session: session.session,
    });
  }
  return out.sort((a, b) => a.startIso.localeCompare(b.startIso));
}

// Whole days from now until the paper starts (0 = today, negative = over).
export function daysUntilPaper(startIso: string, now = new Date()): number {
  const start = new Date(startIso).getTime();
  const day = new Date(now);
  day.setHours(0, 0, 0, 0);
  return Math.round((start - day.getTime()) / 86_400_000);
}
