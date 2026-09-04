// Curated video lessons per chapter — static data only, no API calls.
// Every entry was hand-verified by title against one of the three trusted
// channels (Xylem, Eduport, Exam Winner). Chapters without an entry fall back
// to the generic partner links on the chapter page. To add a video, paste its
// YouTube ID below — never add a video you haven't title-checked.

export type VideoChannel = "Xylem" | "Xylem Plus Two" | "Eduport" | "Exam Winner";

export type ChapterVideo = {
  youtubeId: string;
  title: string;
  channel: VideoChannel;
  // Optional start time in seconds — the player and watch link jump to it.
  startAt?: number;
};

function v(
  youtubeId: string,
  title: string,
  channel: VideoChannel,
  startAt?: number,
): ChapterVideo {
  return { youtubeId, title, channel, ...(startAt ? { startAt } : {}) };
}

export const CHAPTER_VIDEOS: Record<string, Record<string, ChapterVideo[]>> = {
  physics: {
    "units-and-measurements": [
      v("GijQMbCcjiE", "+1 Physics Onam Exam | Units And Measurements | Oneshot", "Exam Winner"),
      v("L66Pxtb02rQ", "Plus One Physics | Units And Measurements", "Xylem"),
      v("TOh2Hp_d4G0", "Plus One Physics - 1. Units and Measurement One Shot", "Eduport"),
    ],
    "motion-in-a-straight-line": [
      v("Zw5iNIbEFiY", "+1 Physics Onam Exam | Chapter 2 | Motion In a Straight Line | Oneshot", "Exam Winner"),
      v("x_iAka-s6Gw", "Plus One Physics | Chapter 2 Motion In Straight Line - Full Chapter Revision", "Xylem"),
      v("TdEmF-PE1IQ", "Plus One Physics Motion in a Straight Line Chapter 2", "Eduport"),
    ],
    "motion-in-a-plane": [
      v("mss_p1EnclM", "Plus One Physics | Motion In a Plane | Oneshot", "Exam Winner"),
      v("Q7Lf8mB_pqo", "Plus One Physics | Chapter 2 Motion In A Plane - Full Chapter Revision", "Xylem"),
      v("TNwGv7Dvgfc", "Plus One Physics Public Exam | 3. Motion in a Plane", "Eduport"),
    ],
    "laws-of-motion": [
      v("zI8ojhqKOgU", "Plus One Physics | Laws Of Motion - Full Chapter Revision", "Xylem"),
      v("Y-VCuhLD1GI", "+1 Physics Onam Exam | Chapter 4 | Laws of Motion | Oneshot", "Exam Winner"),
      v("RN79DWlYBpA", "Plus One Onam Exam Physics | Chapter 4 | Laws of Motion - One Shot", "Eduport"),
    ],
    "work-energy-and-power": [
      v("zU_9bdn6gnM", "Plus One Physics | Work, Energy and Power | Full Chapter Revision", "Xylem"),
      v("ZCDnmNCqzjE", "Plus One Physics | Work Energy And Power | Chapter 5 | Full Chapter", "Exam Winner"),
      v("xRl4p-TElHM", "Plus One Physics Public Exam | 5. Work, Energy and Power Summary", "Eduport"),
    ],
    "system-of-particles": [
      v("KQq85jsxpp4", "System of Particles and Rotational Motion in 40 minutes | Plus One Physics Chapter 6", "Eduport"),
      v("U68l6gry1Is", "Plus One Physics | Systems Of Particles And Rotational - Motion Important Topic", "Xylem"),
      v("9qEImDal_qU", "Plus One Physics | System Of Particles And Rotational Motion | Oneshot", "Exam Winner"),
    ],
    gravitation: [
      v("K4A9j1ic7wo", "Plus One Improvement Physics | Gravitation Full Set", "Xylem Plus Two"),
      v("5wO0Sy1YeNg", "Plus One Physics | Gravitation | Full Chapter", "Exam Winner"),
      v("c6z_nbH8-M0", "Plus One Physics | Gravitation Complete Summary", "Eduport"),
    ],
    "mechanical-properties-of-solids": [
      v("AcPxEHn0454", "Plus One Christmas Exam | Physics | Mechanical Properties of Solids", "Xylem"),
      v("UC5ZgM6FyJQ", "Plus one Physics | Mechanical Properties of Solids Summary", "Eduport"),
      v("sphT06v41Wg", "Plus One Physics | Mechanical Properties Of Solids | Full Chapter", "Exam Winner"),
    ],
    "mechanical-properties-of-fluids": [
      v("eh2IYk21SP0", "Plus One Physics | Mechanical Properties Of Fluids Set", "Xylem Plus Two"),
      v("JlVUyUiO05E", "Plus One Physics | Mechanical Properties of Fluids | Oneshot", "Exam Winner"),
      v("-tzpSsSTLvQ", "Plus One Physics | Mechanical Properties of Fluids | Sure Questions", "Eduport"),
    ],
    "thermal-properties-of-matter": [
      v("-kVxitoy8-Q", "Plus One Physics - Thermal Properties of Matter", "Xylem"),
      v("-eOBQJn8sWA", "Plus One Physics | Thermal Properties of Matter | Chapter 10 | Full Chapter", "Exam Winner"),
      v("09D3FjCR2Wc", "Plus One Physics Public Exam | 10. Thermal Properties of Matter", "Eduport"),
    ],
    thermodynamics: [
      v("zqTheu1TSws", "Plus One Physics Public Exam | Thermodynamics in 50 Minutes", "Eduport"),
      v("13BRKr0mE-o", "Plus One Physics Christmas Exam | Thermodynamics | Full Mark in 10 Minutes", "Exam Winner"),
      v("06hzGq-SIbA", "Plus One Physics - Thermodynamics", "Xylem"),
    ],
    "kinetic-theory": [
      v("WDcc1QJEc-A", "Plus One Physics Kinetic Theory Oneshot | Chapter 11", "Eduport"),
      v("_Cj7uwI2HGA", "Plus One Physics | Kinetic Theory - Full Chapter Revision", "Xylem"),
      v("jE73LmEcX5A", "Plus One Physics | Chapters 1, 7, 11, 12 | Full Chapters Revision", "Exam Winner", 9361),
    ],
    oscillations: [
      v("beYeb1BgeSM", "Plus One Physics | Oscillations | Full Chapter", "Exam Winner"),
      v("ktRyzVFsbrY", "Plus One Physics - Oscillations", "Xylem"),
      v("dOqt_nbrJTc", "Plus One Physics Public Exam | Chapter 13. Oscillations", "Eduport"),
    ],
    waves: [
      v("ILzSlIdyGwM", "Plus One Physics - Waves", "Xylem"),
      v("xO4SkV3_nVA", "Plus One Physics | Waves | One Shot Revision", "Eduport"),
      v("Ko-3u9oMbjk", "Plus one Physics Public Exam | Waves - Sure Questions | All Questions in One Video", "Exam Winner"),
    ],
  },
  chemistry: {
    "structure-of-atom": [
      v("b5A9QIAMnfI", "Structure of Atom — Full Chapter", "Xylem"),
      v("HN7yLa4LzvE", "Structure of Atom — Part 1", "Eduport"),
      v("qTwxtlwK5U0", "Structure of Atom — Full Chapter One Shot", "Exam Winner"),
    ],
    "classification-of-elements": [
      v("yXEdN0UjFjg", "Classification of Elements — Full Chapter Revision", "Xylem"),
    ],
    "chemical-bonding": [
      v("GW33EhK7-FU", "Chemical Bonding and Molecular Structure", "Exam Winner"),
    ],
    thermodynamics: [
      v("0U07F8Akrbg", "Thermodynamics — Full Chapter Revision", "Xylem"),
      v("gqtNFUR0M18", "Thermodynamics — Full Chapter", "Exam Winner"),
    ],
    equilibrium: [
      v("_0HnIVmlMg0", "Equilibrium — Full Chapter", "Exam Winner"),
    ],
    "redox-reactions": [
      v("AU2oFz2_Vi4", "Redox Reactions — Full Chapter Revision", "Xylem"),
    ],
    "organic-chemistry-basics": [
      v("JaCEgk9GNgk", "Organic Chemistry: Basic Principles and Techniques", "Xylem"),
    ],
    hydrocarbons: [
      v("2d8RPhWB5I0", "Hydrocarbons", "Xylem"),
    ],
  },
  mathematics: {
    sets: [
      v("qgsaTdGcLt4", "Sets — Full Chapter Revision", "Xylem"),
      v("YALEUfz4PDU", "Sets in 28 Minutes", "Eduport"),
      v("Mk7EPtnYOK0", "Sets Part 1 — Chapter 1", "Exam Winner"),
    ],
    "relations-and-functions": [
      v("F0H7kwWA99I", "Relations and Functions in 35 Minutes", "Eduport"),
    ],
    "trigonometric-functions": [
      v("LlRIjLWrDmA", "Trigonometric Functions — Full Chapter Revision", "Xylem"),
    ],
    "complex-numbers": [
      v("jG6ZtPxq80s", "Complex Numbers and Quadratic Equations — Full", "Exam Winner"),
    ],
    "permutations-combinations": [
      v("IeLgMOlLXL0", "Permutations and Combinations", "Xylem"),
    ],
    "binomial-theorem": [
      v("Co6HMuVY71o", "Binomial Theorem", "Eduport"),
    ],
    "sequences-and-series": [
      v("9Saw1VTe4bc", "Sequences and Series — Full Chapter", "Xylem"),
    ],
    "straight-lines": [
      v("oGYHmsCE5Og", "Straight Lines — Full Chapter Revision", "Xylem"),
    ],
    "conic-sections": [
      v("D_kJBxMs4NE", "Conic Sections", "Xylem"),
    ],
    "limits-and-derivatives": [
      v("uvAYhF3gw4A", "Limits and Derivatives — One Shot", "Exam Winner"),
    ],
    "statistics-and-probability": [
      v("puEhbfMtchA", "Probability", "Xylem"),
    ],
  },
  english: {
    "grammar-tenses": [
      v("rdBFGjLuzM0", "Grammar Revision for the Public Exam", "Xylem"),
    ],
    comprehension: [
      v("oeISzJIVcgs", "English — Full Chapter Revision", "Xylem"),
    ],
  },
  malayalam: {
    vayanasala: [
      v("s0amSyZWHGw", "Malayalam — Mega Marathon", "Xylem"),
    ],
  },
  "computer-science": {
    "introduction-to-computers": [
      v("T0FmGeY-iFQ", "Data Representation and Boolean Algebra — Part 1", "Xylem"),
      v("1i3rJNRxQpI", "Data Representation and Boolean Algebra — One Shot", "Eduport"),
    ],
    "python-basics": [
      v("TrasrXuadME", "Getting Started with Python", "Xylem"),
    ],
    "strings-and-lists": [
      v("Leg79Sfg3bI", "Arrays and String Handling in Python", "Xylem"),
    ],
    "functions-in-python": [
      v("tF2uJ5CqDRo", "Functions — One Shot Revision", "Xylem"),
      v("CpqaDT-92RI", "Functions — Full Chapter", "Exam Winner"),
    ],
  },
  zoology: {
    "animal-kingdom": [
      v("bdwP48JBah0", "The Living World — Chapter 1", "Xylem"),
    ],
    biomolecules: [
      v("fs_h8kFzOww", "Biomolecules — Full Chapter Revision", "Xylem"),
    ],
  },
  botany: {
    "the-living-world": [
      v("XYpHPMdYm6g", "Biological Classification — Full Chapter Revision", "Xylem"),
    ],
    "plant-kingdom": [
      v("JX2WCF7KHu8", "Plant Kingdom", "Xylem"),
    ],
    photosynthesis: [
      v("PeVNtXctTM0", "Photosynthesis in Higher Plants — Full", "Exam Winner"),
    ],
  },
};

export function chapterVideos(subject: string, chapter: string): ChapterVideo[] {
  return CHAPTER_VIDEOS[subject]?.[chapter] ?? [];
}
