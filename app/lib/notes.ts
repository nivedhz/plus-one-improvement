// Chapter notes index — links only, never copied content.
// Every URL below was verified live (HTTP 200) before being added.
import { getSubject } from "./subjects";
// Per-chapter pages come from HSSLive's chapter-wise notes; where no
// chapter page exists, chapters fall back to subject-level study material.
// Chapters with no entry at all render no notes section.

export type NoteSource = "HSSLive" | "HSSReporter";

export type ChapterNote = {
  title: string;
  url: string;
  source: NoteSource;
  scope: "chapter" | "subject";
};

const G = "https://www.hsslive.guru";

function chapterNote(url: string, title = "Quick revision notes"): ChapterNote {
  return { title, url, source: "HSSLive", scope: "chapter" };
}

function pc(subject: string, n: number): ChapterNote {
  return chapterNote(`${G}/plus-one-${subject}-notes-chapter-${n}/`);
}

function tb(subject: string, unit: number, chapter?: number): ChapterNote {
  const suffix = chapter ? `-unit-${unit}-chapter-${chapter}` : `-unit-${unit}`;
  return {
    title: "Textbook answers & chapter summary",
    url: `${G}/plus-one-${subject}-textbook-answers${suffix}/`,
    source: "HSSLive",
    scope: "chapter",
  };
}

export const CHAPTER_NOTES: Record<string, Record<string, ChapterNote[]>> = {
  physics: {
    "units-and-measurements": [pc("physics", 2)],
    "motion-in-a-straight-line": [pc("physics", 3)],
    "motion-in-a-plane": [pc("physics", 4)],
    "laws-of-motion": [pc("physics", 5)],
    "work-energy-and-power": [pc("physics", 6)],
    "system-of-particles": [pc("physics", 7)],
    gravitation: [pc("physics", 8)],
    "mechanical-properties-of-solids": [pc("physics", 9)],
    "mechanical-properties-of-fluids": [pc("physics", 10)],
    "thermal-properties-of-matter": [pc("physics", 11)],
    thermodynamics: [pc("physics", 12)],
    "kinetic-theory": [pc("physics", 13)],
    oscillations: [pc("physics", 14)],
    waves: [pc("physics", 15)],
  },
  chemistry: {
    "some-basic-concepts": [pc("chemistry", 1)],
    "structure-of-atom": [pc("chemistry", 2)],
    "classification-of-elements": [pc("chemistry", 3)],
    "chemical-bonding": [pc("chemistry", 4)],
    thermodynamics: [pc("chemistry", 6)],
    equilibrium: [pc("chemistry", 7)],
    "redox-reactions": [pc("chemistry", 8)],
    "organic-chemistry-basics": [pc("chemistry", 12)],
    hydrocarbons: [pc("chemistry", 13)],
  },
  mathematics: {
    sets: [pc("maths", 1)],
    "relations-and-functions": [pc("maths", 2)],
    "trigonometric-functions": [pc("maths", 3)],
    "complex-numbers": [pc("maths", 5)],
    "linear-inequalities": [pc("maths", 6)],
    "permutations-combinations": [pc("maths", 7)],
    "binomial-theorem": [pc("maths", 8)],
    "sequences-and-series": [pc("maths", 9)],
    "straight-lines": [pc("maths", 10)],
    "conic-sections": [pc("maths", 11)],
    "introduction-to-three-dimensional-geometry": [pc("maths", 12)],
    "limits-and-derivatives": [pc("maths", 13)],
    statistics: [pc("maths", 15)],
    probability: [pc("maths", 16)],
  },
  biology: {
    "the-living-world": [pc("zoology", 1)],
    "biological-classification": [pc("botany", 1)],
    "plant-kingdom": [pc("botany", 2)],
    "morphology-of-flowering-plants": [pc("botany", 3)],
    "anatomy-of-flowering-plants": [pc("botany", 4)],
    "cell-the-unit-of-life": [pc("botany", 5)],
    biomolecules: [pc("zoology", 4)],
    "cell-cycle": [pc("botany", 6)],
    photosynthesis: [pc("botany", 9)],
    "respiration-in-plants": [pc("botany", 10)],
    "plant-growth": [pc("botany", 11)],
    "structural-organisation": [pc("zoology", 3)],
    "animal-kingdom": [pc("zoology", 2)],
    "digestion-and-absorption": [pc("zoology", 5)],
    "breathing-and-exchange": [pc("zoology", 6)],
    "body-fluids-and-circulation": [pc("zoology", 7)],
    "excretory-products-and-their-elimination": [pc("zoology", 8)],
    "locomotion-and-movement": [pc("zoology", 9)],
    "neural-control": [pc("zoology", 10)],
    "chemical-coordination-and-integration": [pc("zoology", 11)],
  },
  english: {
    "his-first-flight": [tb("english", 1, 1)],
    "i-will-fly": [tb("english", 1, 2)],
    "quest-for-a-theory-of-everything": [tb("english", 1, 3)],
    if: [tb("english", 1, 4)],
    "and-then-gandhi-came": [tb("english", 2, 1)],
    "price-of-flowers": [tb("english", 2, 2)],
    "death-the-leveller": [tb("english", 2, 3)],
    "sunrise-on-the-hills": [tb("english", 3, 1)],
    "the-trip-of-le-horla": [tb("english", 3, 2)],
    "the-sacred-turtles-of-kadavu": [tb("english", 3, 3)],
    "disasters-and-disaster-management-in-india": [tb("english", 4, 1)],
    "the-serang-of-ranaganji": [tb("english", 4, 2)],
    "the-wreck-of-the-titanic": [tb("english", 4, 3)],
    gooseberries: [tb("english", 5, 1)],
    "to-sleep": [tb("english", 5, 2)],
    "going-out-for-a-walk": [tb("english", 5, 3)],
    "the-cyberspace": [tb("english", 6, 1)],
    "is-society-dead": [tb("english", 6, 2)],
    "conceptual-fruit": [tb("english", 6, 3)],
  },
  malayalam: {
    sandharshanam: [tb("malayalam", 1, 1)],
    "ormayude-njarambu": [tb("malayalam", 1, 2)],
    "verukal-nashtappeduthunnavar": [tb("malayalam", 1, 3)],
    malsyam: [tb("malayalam", 1, 4)],
    kayalarikathu: [tb("malayalam", 2, 1)],
    "sinimayum-samoohavum": [tb("malayalam", 2, 2)],
    "kalavupoya-cycle": [tb("malayalam", 2, 2), tb("malayalam", 2, 3)],
    kaipaadu: [tb("malayalam", 2, 4)],
    kelkkunnundo: [tb("malayalam", 2, 4)],
    "kavyakala-nireekshanangal": [tb("malayalam", 3, 1)],
    oonjaalil: [tb("malayalam", 3, 2)],
    "anargha-nimisham": [tb("malayalam", 3, 3)],
    "lathiyum-vediyundayum": [tb("malayalam", 3, 4)],
    peelikannukal: [tb("malayalam", 4, 1)],
    anukamba: [tb("malayalam", 4, 2)],
    mohiyudheenmaala: [tb("malayalam", 4, 3)],
    vaasanaavikruthi: [tb("malayalam", 4, 4)],
    sankramanam: [tb("malayalam", 4, 5)],
    shasthrakriya: [tb("malayalam", 4, 6)],
  },
};

// Whole-subject study guides, hand-picked from HSSLive's Plus One study
// materials index (https://www.hsslive.in/p/higher-secondary-plus-oneclass-11-study.html).
// Every URL below was verified live (HTTP 200) before being added.
// These render as their own section on subject pages, and double as the
// fallback for chapters with no dedicated page.
const H = "https://www.hsslive.in";

function subjectNote(path: string, title: string): ChapterNote {
  return { title, url: `${H}/${path}`, source: "HSSLive", scope: "subject" };
}

const SUBJECT_NOTES: Record<string, ChapterNote[]> = {
  physics: [
    subjectNote("2021/11/hss-ncert-physics-notes.html", "Class notes by Seema Elizabeth"),
    subjectNote("2023/03/plusone-physics-144-points.html", "144-point quick revision"),
    subjectNote("2026/03/physics-solved-pyq.html", "Solved PYQ, chapter-wise (APT)"),
    subjectNote("2020/05/hss-plusone-physics-qb.html", "Chapter-wise question bank"),
  ],
  chemistry: [
    subjectNote(
      "2023/10/plusone-chemistry-notes-by-ak.html",
      "Class notes by Anil Kumar",
    ),
    subjectNote("2023/03/plusone-chemistry-157-qns-ans.html", "178 most important Q&A"),
    subjectNote(
      "2024/02/plus-one-chemistry-quick-revision.html",
      "Quick revision + chapter weightage",
    ),
    subjectNote(
      "2015/01/plus-one-chemistry-question-bank.html",
      "Solved previous questions, chapter-wise",
    ),
  ],
  mathematics: [
    subjectNote("2024/10/maths-notes.html", "Class notes by Remesh Chennessery"),
    subjectNote("2025/03/maths-exam-points.html", "Exam points by MAM"),
    subjectNote(
      "2016/01/plus-oneplus-two-mathematics-previous.html",
      "Previous questions, chapter-wise",
    ),
  ],
  english: [
    subjectNote("2026/08/plusone-english-notes.html", "Class notes (new scheme)"),
    subjectNote("2023/03/hse-english-poetic-devices.html", "Poetic devices guide"),
    subjectNote("2025/02/english-exam-guide.html", "Complete exam study guide"),
  ],
  malayalam: [
    subjectNote("2026/08/malayalam-notes.html", "Class notes by Jakulin (revised 2026)"),
    subjectNote(
      "2026/07/plusone-malayalam-revised.html",
      "Class notes by Sapna (revised 2026)",
    ),
  ],
  "computer-science": [
    subjectNote(
      "2026/07/plusone-computer-science-notes.html",
      "Class notes + question bank (new scheme)",
    ),
    subjectNote("2026/06/python-installation.html", "Python installation guide"),
    subjectNote("2025/02/xi-cs-capsule-note.html", "Capsule notes"),
  ],
  zoology: [
    subjectNote("2024/09/plusone-zoology-notes.html", "Class notes by Navas Cheemadan"),
    subjectNote(
      "2023/02/hse-biology-question-bank.html",
      "Question bank, chapter-wise (Minhad)",
    ),
    subjectNote("2021/11/plusone-zoology-question-bank.html", "Previous questions bank"),
  ],
  botany: [
    subjectNote("2022/12/hss-botany-notes-by-nandini.html", "Class notes by Nandini"),
    subjectNote(
      "2015/09/plus-one-botany-question-bank.html",
      "Question bank, chapter-wise",
    ),
    subjectNote("2025/11/botany-picture-album.html", "Picture album (diagrams)"),
  ],
};

export function chapterNotes(subject: string, chapter: string): ChapterNote[] {
  return CHAPTER_NOTES[subject]?.[chapter] ?? SUBJECT_NOTES[subject] ?? [];
}

// Whole-subject guides for the subject page section.
export function subjectNotes(subjectSlug: string): ChapterNote[] {
  return SUBJECT_NOTES[subjectSlug] ?? [];
}

// Real totals derived from the same maps the pages render — safe to display.
// Subject guides count once (not once per chapter, which the chapter-level
// fallback would otherwise imply).
export function subjectNoteCount(subjectSlug: string): number {
  const subject = getSubject(subjectSlug);
  if (!subject) return 0;
  const chapterSpecific = subject.chapters.reduce(
    (sum, c) => sum + (CHAPTER_NOTES[subjectSlug]?.[c.slug]?.length ?? 0),
    0,
  );
  return chapterSpecific + subjectNotes(subjectSlug).length;
}
