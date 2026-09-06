import { z } from "zod";
import { db } from "./db";
import { SUBJECTS, getSubject } from "./subjects";

const markRowSchema = z.object({
  subject: z.string().min(1),
  got: z.number().min(0).max(1000),
  max: z.number().int().min(1).max(1000),
});

export const marksInputSchema = z.object({
  marks: z.array(markRowSchema).min(1).max(20),
});

export type MarksInput = z.infer<typeof marksInputSchema>;

export type StoredMark = { subject: string; got: number; max: number };

export type SubjectPriority = {
  subjectSlug: string;
  subjectName: string;
  got: number;
  max: number;
  pct: number;
  rank: number;
  level: "Critical" | "High" | "Medium" | "Low" | "Maintain";
  guidance: string;
};

const LEVELS: { min: number; level: SubjectPriority["level"]; guidance: string }[] = [
  { min: 70, level: "Critical", guidance: "Study first, every day. Previous questions on repeat." },
  { min: 50, level: "High", guidance: "A daily slot until the weak chapters turn." },
  { min: 30, level: "Medium", guidance: "Steady revision alongside harder subjects." },
  { min: 10, level: "Low", guidance: "Weekly touch-ups are enough to hold this." },
  { min: 0, level: "Maintain", guidance: "Light revision keeps it warm. Protect this lead." },
];

// Individual priorities only: each subject is scored against itself
// (100 − percentage), never merged into an overall total. Marks for
// subjects outside the catalog (e.g. retired slugs) are dropped so stale
// rows can never render.
export function computePriorities(marks: StoredMark[]): SubjectPriority[] {
  const scored = marks.filter((m) => getSubject(m.subject)).map((m) => {
    const pct = Math.min(100, (m.got / m.max) * 100);
    const score = 100 - pct;
    const band = LEVELS.find((l) => score >= l.min) ?? LEVELS[LEVELS.length - 1];
    const subject = getSubject(m.subject);
    return {
      subjectSlug: m.subject,
      subjectName: subject?.name ?? m.subject,
      got: m.got,
      max: m.max,
      pct: Math.round(pct),
      score,
      level: band.level,
      guidance: band.guidance,
    };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .map((s, i) => ({
      subjectSlug: s.subjectSlug,
      subjectName: s.subjectName,
      got: s.got,
      max: s.max,
      pct: s.pct,
      level: s.level,
      guidance: s.guidance,
      rank: i + 1,
    }));
}

export async function getUserMarks(userId: string): Promise<StoredMark[]> {
  const rows = await db.previousMark.findMany({ where: { userId } });
  return rows.map((r) => ({ subject: r.subject, got: r.got, max: r.max }));
}

export async function saveUserMarks(
  userId: string,
  input: MarksInput,
): Promise<SubjectPriority[]> {
  const clean = input.marks.filter((m) => getSubject(m.subject));
  if (clean.length === 0) throw new Error("No known subjects submitted.");
  await db.$transaction(
    clean.map((m) =>
      db.previousMark.upsert({
        where: { userId_subject: { userId, subject: m.subject } },
        update: { got: Math.floor(m.got), max: Math.floor(m.max) },
        create: {
          userId,
          subject: m.subject,
          got: Math.floor(m.got),
          max: Math.floor(m.max),
        },
      }),
    ),
  );
  return computePriorities(
    clean.map((m) => ({
      subject: m.subject,
      got: Math.floor(m.got),
      max: Math.floor(m.max),
    })),
  );
}

export function blankMarks(): StoredMark[] {
  return SUBJECTS.map((s) => ({ subject: s.slug, got: 0, max: s.maxMarks }));
}
