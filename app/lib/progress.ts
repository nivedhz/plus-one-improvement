import { z } from "zod";
import { db } from "./db";
import { getChapter, getSubject } from "./subjects";

export const progressInputSchema = z.object({
  subject: z.string().min(1),
  chapter: z.string().min(1),
  percent: z.number().int().min(0).max(100),
});

export type ProgressInput = z.infer<typeof progressInputSchema>;

export type ProgressMap = Record<string, number>; // "subject:chapter" -> percent

export async function getUserProgressMap(userId: string): Promise<ProgressMap> {
  const rows = await db.chapterProgress.findMany({ where: { userId } });
  const map: ProgressMap = {};
  for (const r of rows) map[`${r.subject}:${r.chapter}`] = r.percent;
  return map;
}

export async function setChapterProgress(
  userId: string,
  input: ProgressInput,
): Promise<{ percent: number }> {
  // Reject slugs outside the catalog so junk can't pollute progress.
  const subject = getSubject(input.subject);
  if (!subject || !getChapter(subject, input.chapter)) {
    throw new Error("Unknown subject or chapter.");
  }
  const row = await db.chapterProgress.upsert({
    where: {
      userId_subject_chapter: {
        userId,
        subject: input.subject,
        chapter: input.chapter,
      },
    },
    update: { percent: input.percent },
    create: {
      userId,
      subject: input.subject,
      chapter: input.chapter,
      percent: input.percent,
    },
  });
  return { percent: row.percent };
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

export type ActiveChapter = {
  subjectSlug: string;
  subjectName: string;
  chapterSlug: string;
  title: string;
  percent: number;
};

// Most recently touched unfinished chapters, resolved to catalog titles.
export async function activeChapters(
  userId: string,
  limit = 3,
): Promise<ActiveChapter[]> {
  const rows = await db.chapterProgress.findMany({
    where: { userId, percent: { lt: 100 } },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });
  const out: ActiveChapter[] = [];
  for (const r of rows) {
    const subject = getSubject(r.subject);
    const chapter = subject && getChapter(subject, r.chapter);
    if (!subject || !chapter) continue;
    out.push({
      subjectSlug: subject.slug,
      subjectName: subject.name,
      chapterSlug: chapter.slug,
      title: chapter.title,
      percent: r.percent,
    });
  }
  return out;
}
