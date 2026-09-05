import { z } from "zod";
import { db } from "./db";
import { getChapter, getSubject } from "./subjects";

export const progressInputSchema = z.object({
  subject: z.string().min(1),
  chapter: z.string().min(1),
  completed: z.boolean(),
});

export type ProgressInput = z.infer<typeof progressInputSchema>;

// "subject:chapter" -> percent. Only 0 and 100 are ever written now —
// anything below 100 simply means "not done yet".
export type ProgressMap = Record<string, number>;

export function isComplete(percent: number | undefined): boolean {
  return (percent ?? 0) >= 100;
}

export async function getUserProgressMap(userId: string): Promise<ProgressMap> {
  const rows = await db.chapterProgress.findMany({ where: { userId } });
  const map: ProgressMap = {};
  for (const r of rows) map[`${r.subject}:${r.chapter}`] = r.percent;
  return map;
}

export async function setChapterProgress(
  userId: string,
  input: ProgressInput,
): Promise<{ completed: boolean }> {
  // Reject slugs outside the catalog so junk can't pollute progress.
  const subject = getSubject(input.subject);
  if (!subject || !getChapter(subject, input.chapter)) {
    throw new Error("Unknown subject or chapter.");
  }
  const percent = input.completed ? 100 : 0;
  await db.chapterProgress.upsert({
    where: {
      userId_subject_chapter: {
        userId,
        subject: input.subject,
        chapter: input.chapter,
      },
    },
    update: { percent },
    create: {
      userId,
      subject: input.subject,
      chapter: input.chapter,
      percent,
    },
  });
  return { completed: input.completed };
}

// Consecutive-day streak ending today (or yesterday, to be kind) from the
// days on which any chapter progress was saved.
export function studyStreak(days: Date[]): number {
  const set = new Set(days.map((d) => d.toISOString().slice(0, 10)));
  const cursor = new Date();
  if (!set.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1); // allow today to still be played
  }
  let streak = 0;
  while (set.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export async function studyStreakFor(userId: string): Promise<number> {
  const rows = await db.chapterProgress.findMany({
    where: { userId },
    select: { updatedAt: true },
  });
  return studyStreak(rows.map((r) => r.updatedAt));
}

export type CompletedChapter = {
  subjectSlug: string;
  subjectName: string;
  chapterSlug: string;
  title: string;
};

// Most recently completed chapters, resolved to catalog titles.
export async function completedChapters(
  userId: string,
  limit = 3,
): Promise<CompletedChapter[]> {
  const rows = await db.chapterProgress.findMany({
    where: { userId, percent: { gte: 100 } },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });
  const out: CompletedChapter[] = [];
  for (const r of rows) {
    const subject = getSubject(r.subject);
    const chapter = subject && getChapter(subject, r.chapter);
    if (!subject || !chapter) continue;
    out.push({
      subjectSlug: subject.slug,
      subjectName: subject.name,
      chapterSlug: chapter.slug,
      title: chapter.title,
    });
  }
  return out;
}
