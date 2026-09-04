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
    "some-basic-concepts": [
      v("yI8CkASrpXY", "Plus One Chemistry | Chapter 1 Some Basic Concepts Of Chemistry Summary", "Eduport"),
      v("QNiZafNKdtk", "Plus One Chemistry | Chapter 1 - Some Basic Concepts of Chemistry | Full Chapter", "Exam Winner"),
      v("EoEJKMpEKd0", "Plus One Chemistry | Chapter 1 Some Basic Concepts Of Chemistry - Full Chapter Revision", "Xylem"),
    ],
    "structure-of-atom": [
      v("qTwxtlwK5U0", "Plus One Chemistry | Chapter 2 - Structure Of Atom | Full Chapter Oneshot", "Exam Winner"),
      v("Ji_a1YfttNI", "Plus One Improvement Exam - Chemistry - Structure of Atom", "Xylem Plus Two"),
      v("O0ouJtHZ79A", "Plus One Chemistry | Structure of Atom Summary", "Eduport"),
    ],
    "classification-of-elements": [
      v("rYd5NqDr9w4", "Plus One Chemistry | Classification Of Elements And Periodicity In Properties | Oneshot", "Exam Winner"),
      v("XymTwLcE93c", "Classification of Elements and Periodicity in Properties in 22 Minutes", "Eduport"),
      v("9uyWKl3D8xg", "Plus One Chemistry | Classification of Elements & Periodicity in Properties | Full Chapter Revision", "Xylem"),
    ],
    "chemical-bonding": [
      v("r8uW4yjkgMA", "Plus One Chemistry | Chemical Bonding and Molecular Structure | Full Chapter", "Exam Winner"),
      v("o3BObQg1BoM", "Plus One Chemistry | Chemical Bonding & Molecular Structure - Full Chapter Revision", "Xylem"),
      v("5h81iAsfjeA", "Plus One Chemistry Chemical Bonding and Molecular Structure Chapter 4 Christmas Exam 2025", "Eduport"),
    ],
    thermodynamics: [
      v("VOIQM5yUlFU", "Plus One Chemistry | Thermodynamics | Full Chapter", "Exam Winner"),
      v("0U07F8Akrbg", "Plus One Chemistry |Thermodynamics | Full Chapter Revision", "Xylem"),
      v("WG9ErGYG_e8", "Thermodynamics in 35 Minutes | Plus one Chemistry Chapter 5", "Eduport"),
    ],
    equilibrium: [
      v("W8eTVvkPq1I", "Plus One Chemistry | Equilibrium - Full Chapter Revision", "Xylem"),
      v("kSg5LQiG3cE", "Plus One Chemistry | Equilibrium | Full Chapter", "Exam Winner"),
      v("1LMShVXOcgs", "Plus One Chemistry Equilibrium Chapter 6 Christmas Exam 2025", "Eduport"),
    ],
    "redox-reactions": [
      v("9KlwOz_5XdE", "Plus One Chemistry | Redox Reactions | Full Chapter", "Exam Winner"),
      v("zliJClnv6vU", "Redox Reactions in 33 Minutes | Chapter 7", "Eduport"),
      v("AU2oFz2_Vi4", "Plus One Chemistry: Redox Reactions | Full Chapter Revision", "Xylem"),
    ],
    "organic-chemistry-basics": [
      v("J4KoQ-K6uFs", "+1 Chemistry | Organic Chemistry: Some Basic Principles and Techniques | Full Chapter", "Exam Winner"),
      v("RMULYGp212M", "Plus One Chemistry Organic Chemistry Oneshot | Chapter 8", "Eduport"),
      v("JaCEgk9GNgk", "Plus One Chemistry - Organic Chemistry : Some Basic Principles and Techniques", "Xylem"),
    ],
    hydrocarbons: [
      v("2Xnn6jhQUnw", "+1 Chemistry | Hydrocarbons | Full Chapter", "Exam Winner"),
      v("2d8RPhWB5I0", "Plus One Chemistry - Hydrocarbons", "Xylem"),
      v("ce4En671A74", "Plus One Chemistry Hydrocarbons One Shot", "Eduport"),
    ],
  },
  mathematics: {
    sets: [
      v("YALEUfz4PDU", "Sets In 28 Minutes | Plus One Maths Chapter 1", "Eduport"),
      v("KbXXlaI-_tI", "Plus One Maths | Chapter 1 - Sets | Full Chapter One Shot", "Exam Winner"),
      v("_Y_CVe8osn0", "Plus One Maths - Sets", "Xylem"),
    ],
    "relations-and-functions": [
      v("bIjQKlvu5Cs", "Plus One Maths | Chapter 2 - Relations And Functions | Full Chapter Oneshot", "Exam Winner"),
      v("F0H7kwWA99I", "Relations and Functions in 35 Minutes | Plus One Maths", "Eduport"),
      v("Q96ZWfe9iYs", "Plus One Mathematics | Onam Exam Chapter 2 - Relations And Function - Full Chapter Revision", "Xylem"),
    ],
    "trigonometric-functions": [
      v("XQjf139YlUU", "Plus One Maths | Chapter 3 | Trigonometric Functions | Oneshot", "Exam Winner"),
      v("LlRIjLWrDmA", "Plus One Maths | Trigonometric Functions - Full Chapter Revision", "Xylem", 8411),
      v("ZqDm9ljeNmU", "Trigonometric Functions | One Shot | Plus One Maths Chapter 3", "Eduport"),
    ],
    "complex-numbers": [
      v("jG6ZtPxq80s", "+1 Maths | Complex Numbers and Quadratic Equations | Full Chapter Revision | Chapter 4", "Exam Winner"),
      v("zt25bVEqQGw", "Plus One Maths | Complex Numbers And Quadratic Equations - Full Chapter Revision", "Xylem"),
      v("1e11M1mGgvE", "Plus One Maths Complex Numbers and Quadratic Equations, Relations and Functions", "Eduport"),
    ],
    "linear-inequalities": [
      v("AiIs41AN_Qw", "Plus One Maths - Linear Inequalities in 15 Minutes", "Xylem"),
      v("CT405oFbt8Q", "Plus One Maths | Sure Questions | Linear Inequalities | Public Exam 2025", "Eduport"),
      v("XZ4rk2VgaLw", "Plus One Maths | Linear Inequalities | Limits and Derivatives | Probability", "Exam Winner", 8758),
    ],
    "permutations-combinations": [
      v("-2k_e9ql9pg", "Plus One Maths | Permutations And Combinations | Full Chapter", "Exam Winner"),
      v("zpiqvf0Yvck", "Permutations and Combinations in 40 Minutes | Plus One Maths Chapter 6", "Eduport"),
      v("bFYNHsJh0fY", "Plus One Maths | Permutation And Combination - Full Chapter Revision", "Xylem", 6348),
    ],
    "binomial-theorem": [
      v("8CeFWL5DMt0", "Plus One Maths | Binomial Theorem | Full Chapter", "Exam Winner"),
      v("NUGNHRRl3Ig", "Binomial Theorem 5 മിനുട്ടിൽ ?", "Eduport"),
      v("kk9SgC4ZFVY", "Plus One Maths - Concept Revision - Binomial Theorem in Just 15 Minutes", "Xylem"),
    ],
    "sequences-and-series": [
      v("lE88H7dNHTo", "Plus One Maths Christmas Exam | Sequences and Series | Chapter 9", "Exam Winner"),
      v("w9tYCSj7O5Y", "Sequence & Series in 30 Minutes | Plus one Maths", "Eduport"),
      v("9Saw1VTe4bc", "Plus One Maths | Maths | Sequences and Series - Full Chapter Revision", "Xylem", 3491),
    ],
    "straight-lines": [
      v("O2eu0dW9YPc", "Plus One Maths | Straight Lines | Full Chapter", "Exam Winner"),
      v("TTUL82cR81A", "Plus One Maths | Straight Lines Summary", "Eduport"),
      v("JDEGBeFKS2E", "Plus One Maths | Straight Lines - Full Chapter Revision", "Xylem"),
    ],
    "conic-sections": [
      v("NFryKwj_2KA", "Plus One Improvement Maths | Conic Section In 50 Minutes", "Xylem Plus Two"),
      v("a7fHnQtnKJQ", "Plus One Maths | Conic Sections | Full Chapter", "Exam Winner"),
      v("MDeEvvnvPZU", "Plus One Maths | Conic Section | In 40 Minutes", "Eduport"),
    ],
    "introduction-to-three-dimensional-geometry": [
      v("UgbCDY_qPW0", "Introduction to 3D Geometry in 28 Minutes | Plus One Maths Chapter 11", "Eduport"),
      v("7UiYBREuplE", "Plus One Maths - Introduction To 3d Geometry In 10 Minutes", "Xylem"),
      v("2EWNcURPHZs", "Plus One Maths | Straight Lines | Conic Sections | Introduction to 3 D Geometry", "Exam Winner", 5484),
    ],
    "limits-and-derivatives": [
      v("4_5L8DQW4DY", "Plus One Maths | Chapters : 12, 14 | Full Chapters", "Exam Winner", 374),
      v("P8rqbjAtbGo", "Limits and Derivatives in 47 Minutes | Plus One Maths Chapter 12", "Eduport"),
      v("ja2fujK-o0w", "Plus One Christmas Exam Maths | Limits And Derivatives", "Xylem"),
    ],
    statistics: [
      v("0p_IW3tEX7I", "Plus One Maths | Sure Questions | Statistics | Public Exam 2025", "Eduport"),
      v("O1BPiZCU2fg", "Plus One Mathematics | Statistics - Full Chapter Revision", "Xylem"),
      v("4_5L8DQW4DY", "Plus One Maths | Chapters : 12, 14 | Full Chapters", "Exam Winner", 4164),
    ],
    probability: [
      v("puEhbfMtchA", "Plus One Mathematics - Probability", "Xylem"),
      v("NyrmOIoaWjo", "Plus One Maths Public Exam | Probabilty One Shot in 54 Minutes | Chapter 13", "Eduport"),
      v("XZ4rk2VgaLw", "Plus One Maths | Linear Inequalities | Limits and Derivatives | Probability", "Exam Winner", 6679),
    ],
  },
  english: {
    "his-first-flight": [
      v("au1bwb1t2rE", "Plus One English Chapter 1 | His First Flight Short Summary in Malayalam", "Eduport"),
      v("3ru1AlsMI8o", "Plus One English - His First Flight | I Will Fly | Quest for a Theory of Everything - One Shot Revision", "Xylem", 59),
    ],
    "i-will-fly": [
      v("aPSv99r0UGs", "Plus One English Chapter 2 | I Will Fly Short Summary in Malayalam", "Eduport"),
      v("3ru1AlsMI8o", "Plus One English - His First Flight | I Will Fly | Quest for a Theory of Everything - One Shot Revision", "Xylem", 646),
    ],
    "quest-for-a-theory-of-everything": [
      v("Cf37_Np3Prk", "Plus One English Improvement Exam - Quest for a Theory of Everything", "Xylem Plus Two"),
      v("3ru1AlsMI8o", "Plus One English - His First Flight | I Will Fly | Quest for a Theory of Everything - One Shot Revision", "Xylem", 1181),
    ],
    if: [
      v("yL0u2G1D3Yw", "Plus One English | Chapter 4 IF Summary", "Eduport"),
      v("NiZbvBaUQgM", "Plus One English - IF Poem - A Quick Revision", "Xylem"),
    ],
    "and-then-gandhi-came": [
      v("1sgzvmxXKj4", "Plus One English - And Then Gandhi Came", "Xylem"),
      v("qYYRuNCDkaw", "Plus One English | Focus Area | And Then Gandhi Came | Malayalam", "Exam Winner"),
    ],
    "price-of-flowers": [
      v("VcI7aR157QE", "Price of Flowers in 18 minutes | Plus One English Summary", "Eduport"),
      v("W0Zc-rIstyU", "Plus One Improvement Exam - English - And Then Gandhi Came The Price Of Flowers", "Xylem Plus Two", 1592),
    ],
    "death-the-leveller": [
      v("OumMDotku7c", "Plus One English | Christmas Exam Special - Death the Leveller | Line by Line Explanation", "Xylem"),
      v("hZFd4chhdag", "Plus One English Exam | Death the Leveller | Poem", "Exam Winner"),
    ],
    "sunrise-on-the-hills": [
      v("xYHA2lZAHGg", "Plus One English | Sunrise On The Hills", "Xylem"),
      v("_YDGp8-9Trw", "Plus One English Exam | Sunrise on the Hills | Poem | Summary and Revision", "Exam Winner"),
    ],
    "the-trip-of-le-horla": [
      v("7lqeU4y87GA", "Plus One English | The Trip Of Le Horla", "Xylem"),
      v("KUvT0pKqURI", "The Trip of Le Horla in 10 minutes | Chapter Summary", "Eduport"),
    ],
    "the-sacred-turtles-of-kadavu": [
      v("JXLefv9DrpI", "Sacred Turtles of Kadavu in 10 Mins | Chapter Summary", "Eduport"),
      v("UsO3OKM_azM", "PlusOne-English-Sunrise on the Hills | The Trip of Le Horla | The Sacred Turtles of Kadavu", "Xylem", 2201),
    ],
    "disasters-and-disaster-management-in-india": [
      v("xberPMZMBK8", "Plus One English | Disasters and Disaster Management in India - Short Summary", "Eduport"),
      v("zq5s_sYnnSo", "Plus One English | Disaster And Disaster Management In India", "Xylem"),
    ],
    "the-serang-of-ranaganji": [
      v("beYoho9zAzw", "Plus One English - The Serang of Ranaganji - A Quick Revision", "Xylem"),
      v("gWOIhS7tZog", "Plus One Model Exam | English | Serang of Ranaganji", "Exam Winner"),
      v("b4ojH6_2zV4", "Serang of Ranagangi in 15 minutes | Plus One English", "Eduport"),
    ],
    "the-wreck-of-the-titanic": [
      v("htzVzS7FQfc", "Plus One English Public Exam | The Wreck of the Titanic", "Exam Winner"),
      v("c7Yt950tUTE", "Plus One English - Revision Series : Poem - the Wreck of the Titanic - in One Shot", "Xylem"),
    ],
    gooseberries: [
      v("JzChc-K_-80", "Plus One English | Gooseberries Summary", "Eduport"),
      v("yanjHV7Ijeg", "Plus One English - Gooseberries - Quick Summary", "Xylem"),
    ],
    "to-sleep": [
      v("3Sm77Um6e3I", "Plus One English Public Exam | To Sleep | Poem | Summary and Revision", "Exam Winner"),
      v("UO7_xk1S_wY", "Plus One English | To Sleep - Revision Series", "Xylem"),
    ],
    "going-out-for-a-walk": [
      v("m8DoQN2SWp4", "Going out for a walk Essay in 17 Minutes | Unit 5 Chapter 3", "Eduport"),
      v("QmDv1KbpwAA", "Plus One Improvement Exam - English - Going Out for a Walk & The Cyberspace", "Xylem Plus Two", 661),
    ],
    "the-cyberspace": [
      v("DT5HGJf56UM", "Plus One English - Cyber Space - Quick Summary", "Xylem"),
    ],
    "is-society-dead": [
      v("F_4XeY2CaxI", "Plus One English | Is Society Dead - Quick Revision", "Xylem"),
      v("3YDVywUayzs", "To sleep | The trip of le horla | Cyberspace | Is society dead? | Conceptual fruit", "Exam Winner", 3709),
    ],
    "conceptual-fruit": [
      v("pzYUgSwyJIk", "Plus One English - Conceptual Fruit - Quick Summary", "Xylem"),
      v("4JUKhoe9zGM", "Plus One English Public Exam | All Chapters in One live", "Exam Winner", 11045),
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

// Real counts derived from the curated mapping — safe to display.
export function subjectVideoCount(subject: string): number {
  return Object.values(CHAPTER_VIDEOS[subject] ?? {}).reduce(
    (sum, list) => sum + list.length,
    0,
  );
}
