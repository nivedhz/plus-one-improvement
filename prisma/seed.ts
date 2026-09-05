// Catalog integrity seed: validates the static SUBJECTS catalog until the
// official SCERT import replaces it. Run with `npm run db:seed`.
// Writes nothing — fails fast on duplicate slugs or empty chapters.

import { SUBJECTS, STREAM_SUBJECTS } from "../app/lib/subjects";

async function main() {
  const subjectSlugs = new Set<string>();
  let chapters = 0;

  for (const s of SUBJECTS) {
    if (subjectSlugs.has(s.slug)) throw new Error(`Duplicate subject: ${s.slug}`);
    subjectSlugs.add(s.slug);
    if (s.chapters.length === 0) throw new Error(`No chapters: ${s.slug}`);
    const chapterSlugs = new Set<string>();
    for (const c of s.chapters) {
      if (chapterSlugs.has(c.slug)) {
        throw new Error(`Duplicate chapter ${s.slug}/${c.slug}`);
      }
      chapterSlugs.add(c.slug);
      chapters += 1;
    }
    if (s.maxMarks <= 0) throw new Error(`Bad maxMarks: ${s.slug}`);
  }

  for (const [stream, slugs] of Object.entries(STREAM_SUBJECTS)) {
    for (const slug of slugs) {
      if (!subjectSlugs.has(slug)) {
        throw new Error(`Stream ${stream} references unknown subject ${slug}`);
      }
    }
  }

  console.log(
    `[seed] catalog ok: ${SUBJECTS.length} subjects, ${chapters} chapters, streams: ${Object.keys(STREAM_SUBJECTS).join(", ")}`,
  );
}

main().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
