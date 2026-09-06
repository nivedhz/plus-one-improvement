// Curated video lessons per chapter — static data only, no API calls.
// Every entry was hand-verified by title against one of the three trusted
// channels (Xylem, Eduport, Exam Winner). Chapters without an entry fall back
// to the generic partner links on the chapter page. To add a video, paste its
// YouTube ID below — never add a video you haven't title-checked.
import { getChapter, getSubject } from "./subjects";

export type VideoChannel =
  "Xylem" | "Xylem Plus Two" | "Eduport" | "Exam Winner" | "Other";

export type ChapterVideo = {
  youtubeId: string;
  title: string;
  channel: VideoChannel;
  // Optional start time in seconds — the player and watch link jump to it.
  startAt?: number;
  // Marks freshly added videos with a "New" badge in the UI.
  recent?: boolean;
};

function v(
  youtubeId: string,
  title: string,
  channel: VideoChannel,
  startAt?: number,
  recent?: boolean,
): ChapterVideo {
  return {
    youtubeId,
    title,
    channel,
    ...(startAt ? { startAt } : {}),
    ...(recent ? { recent } : {}),
  };
}

export const CHAPTER_VIDEOS: Record<string, Record<string, ChapterVideo[]>> = {
  physics: {
    "units-and-measurements": [
      v(
        "GijQMbCcjiE",
        "+1 Physics Onam Exam | Units And Measurements | Oneshot",
        "Exam Winner",
      ),
      v("L66Pxtb02rQ", "Plus One Physics | Units And Measurements", "Xylem"),
      v("TOh2Hp_d4G0", "Plus One Physics - 1. Units and Measurement One Shot", "Eduport"),
    ],
    "motion-in-a-straight-line": [
      v(
        "Zw5iNIbEFiY",
        "+1 Physics Onam Exam | Chapter 2 | Motion In a Straight Line | Oneshot",
        "Exam Winner",
      ),
      v(
        "x_iAka-s6Gw",
        "Plus One Physics | Chapter 2 Motion In Straight Line - Full Chapter Revision",
        "Xylem",
      ),
      v("TdEmF-PE1IQ", "Plus One Physics Motion in a Straight Line Chapter 2", "Eduport"),
    ],
    "motion-in-a-plane": [
      v("mss_p1EnclM", "Plus One Physics | Motion In a Plane | Oneshot", "Exam Winner"),
      v(
        "Q7Lf8mB_pqo",
        "Plus One Physics | Chapter 2 Motion In A Plane - Full Chapter Revision",
        "Xylem",
      ),
      v("TNwGv7Dvgfc", "Plus One Physics Public Exam | 3. Motion in a Plane", "Eduport"),
    ],
    "laws-of-motion": [
      v(
        "zI8ojhqKOgU",
        "Plus One Physics | Laws Of Motion - Full Chapter Revision",
        "Xylem",
      ),
      v(
        "Y-VCuhLD1GI",
        "+1 Physics Onam Exam | Chapter 4 | Laws of Motion | Oneshot",
        "Exam Winner",
      ),
      v(
        "RN79DWlYBpA",
        "Plus One Onam Exam Physics | Chapter 4 | Laws of Motion - One Shot",
        "Eduport",
      ),
      v(
        "wmXVVsMhO9I",
        "Plus One Improvement Physics | Laws Of Motion",
        "Xylem Plus Two",
        undefined,
        true,
      ),
    ],
    "work-energy-and-power": [
      v(
        "zU_9bdn6gnM",
        "Plus One Physics | Work, Energy and Power | Full Chapter Revision",
        "Xylem",
      ),
      v(
        "ZCDnmNCqzjE",
        "Plus One Physics | Work Energy And Power | Chapter 5 | Full Chapter",
        "Exam Winner",
      ),
      v(
        "xRl4p-TElHM",
        "Plus One Physics Public Exam | 5. Work, Energy and Power Summary",
        "Eduport",
      ),
    ],
    "system-of-particles": [
      v(
        "KQq85jsxpp4",
        "System of Particles and Rotational Motion in 40 minutes | Plus One Physics Chapter 6",
        "Eduport",
      ),
      v(
        "U68l6gry1Is",
        "Plus One Physics | Systems Of Particles And Rotational - Motion Important Topic",
        "Xylem",
      ),
      v(
        "9qEImDal_qU",
        "Plus One Physics | System Of Particles And Rotational Motion | Oneshot",
        "Exam Winner",
      ),
    ],
    gravitation: [
      v(
        "K4A9j1ic7wo",
        "Plus One Improvement Physics | Gravitation Full Set",
        "Xylem Plus Two",
        undefined,
        true,
      ),
      v("5wO0Sy1YeNg", "Plus One Physics | Gravitation | Full Chapter", "Exam Winner"),
      v("c6z_nbH8-M0", "Plus One Physics | Gravitation Complete Summary", "Eduport"),
    ],
    "mechanical-properties-of-solids": [
      v(
        "AcPxEHn0454",
        "Plus One Christmas Exam | Physics | Mechanical Properties of Solids",
        "Xylem",
      ),
      v(
        "UC5ZgM6FyJQ",
        "Plus one Physics | Mechanical Properties of Solids Summary",
        "Eduport",
      ),
      v(
        "sphT06v41Wg",
        "Plus One Physics | Mechanical Properties Of Solids | Full Chapter",
        "Exam Winner",
      ),
    ],
    "mechanical-properties-of-fluids": [
      v(
        "eh2IYk21SP0",
        "Plus One Physics | Mechanical Properties Of Fluids Set",
        "Xylem Plus Two",
        undefined,
        true,
      ),
      v(
        "JlVUyUiO05E",
        "Plus One Physics | Mechanical Properties of Fluids | Oneshot",
        "Exam Winner",
      ),
      v(
        "-tzpSsSTLvQ",
        "Plus One Physics | Mechanical Properties of Fluids | Sure Questions",
        "Eduport",
      ),
    ],
    "thermal-properties-of-matter": [
      v("-kVxitoy8-Q", "Plus One Physics - Thermal Properties of Matter", "Xylem"),
      v(
        "-eOBQJn8sWA",
        "Plus One Physics | Thermal Properties of Matter | Chapter 10 | Full Chapter",
        "Exam Winner",
      ),
      v(
        "09D3FjCR2Wc",
        "Plus One Physics Public Exam | 10. Thermal Properties of Matter",
        "Eduport",
      ),
    ],
    thermodynamics: [
      v(
        "zqTheu1TSws",
        "Plus One Physics Public Exam | Thermodynamics in 50 Minutes",
        "Eduport",
      ),
      v(
        "13BRKr0mE-o",
        "Plus One Physics Christmas Exam | Thermodynamics | Full Mark in 10 Minutes",
        "Exam Winner",
      ),
      v("06hzGq-SIbA", "Plus One Physics - Thermodynamics", "Xylem"),
    ],
    "kinetic-theory": [
      v("WDcc1QJEc-A", "Plus One Physics Kinetic Theory Oneshot | Chapter 11", "Eduport"),
      v(
        "_Cj7uwI2HGA",
        "Plus One Physics | Kinetic Theory - Full Chapter Revision",
        "Xylem",
      ),
      v(
        "jE73LmEcX5A",
        "Plus One Physics | Chapters 1, 7, 11, 12 | Full Chapters Revision",
        "Exam Winner",
        9361,
      ),
    ],
    oscillations: [
      v("beYeb1BgeSM", "Plus One Physics | Oscillations | Full Chapter", "Exam Winner"),
      v("ktRyzVFsbrY", "Plus One Physics - Oscillations", "Xylem"),
      v(
        "dOqt_nbrJTc",
        "Plus One Physics Public Exam | Chapter 13. Oscillations",
        "Eduport",
      ),
    ],
    waves: [
      v("ILzSlIdyGwM", "Plus One Physics - Waves", "Xylem"),
      v("xO4SkV3_nVA", "Plus One Physics | Waves | One Shot Revision", "Eduport"),
      v(
        "Ko-3u9oMbjk",
        "Plus one Physics Public Exam | Waves - Sure Questions | All Questions in One Video",
        "Exam Winner",
      ),
    ],
  },
  chemistry: {
    "some-basic-concepts": [
      v(
        "yI8CkASrpXY",
        "Plus One Chemistry | Chapter 1 Some Basic Concepts Of Chemistry Summary",
        "Eduport",
      ),
      v(
        "QNiZafNKdtk",
        "Plus One Chemistry | Chapter 1 - Some Basic Concepts of Chemistry | Full Chapter",
        "Exam Winner",
      ),
      v(
        "EoEJKMpEKd0",
        "Plus One Chemistry | Chapter 1 Some Basic Concepts Of Chemistry - Full Chapter Revision",
        "Xylem",
      ),
      v(
        "LFnMg64MIIw",
        "Plus One Improvement Exam Chemistry | Basic Concepts Of Chemistry - Concept Revision",
        "Xylem Plus Two",
        undefined,
        true,
      ),
    ],
    "structure-of-atom": [
      v(
        "qTwxtlwK5U0",
        "Plus One Chemistry | Chapter 2 - Structure Of Atom | Full Chapter Oneshot",
        "Exam Winner",
      ),
      v(
        "Ji_a1YfttNI",
        "Plus One Improvement Exam - Chemistry - Structure of Atom",
        "Xylem Plus Two",
      ),
      v("O0ouJtHZ79A", "Plus One Chemistry | Structure of Atom Summary", "Eduport"),
      v(
        "GG7zvJpabfY",
        "Plus One Improvement Exam Chemistry | Structure Of Atom",
        "Xylem Plus Two",
        undefined,
        true,
      ),
    ],
    "classification-of-elements": [
      v(
        "rYd5NqDr9w4",
        "Plus One Chemistry | Classification Of Elements And Periodicity In Properties | Oneshot",
        "Exam Winner",
      ),
      v(
        "XymTwLcE93c",
        "Classification of Elements and Periodicity in Properties in 22 Minutes",
        "Eduport",
      ),
      v(
        "9uyWKl3D8xg",
        "Plus One Chemistry | Classification of Elements & Periodicity in Properties | Full Chapter Revision",
        "Xylem",
      ),
    ],
    "chemical-bonding": [
      v(
        "r8uW4yjkgMA",
        "Plus One Chemistry | Chemical Bonding and Molecular Structure | Full Chapter",
        "Exam Winner",
      ),
      v(
        "o3BObQg1BoM",
        "Plus One Chemistry | Chemical Bonding & Molecular Structure - Full Chapter Revision",
        "Xylem",
      ),
      v(
        "5h81iAsfjeA",
        "Plus One Chemistry Chemical Bonding and Molecular Structure Chapter 4 Christmas Exam 2025",
        "Eduport",
      ),
    ],
    thermodynamics: [
      v(
        "VOIQM5yUlFU",
        "Plus One Chemistry | Thermodynamics | Full Chapter",
        "Exam Winner",
      ),
      v(
        "0U07F8Akrbg",
        "Plus One Chemistry |Thermodynamics | Full Chapter Revision",
        "Xylem",
      ),
      v(
        "WG9ErGYG_e8",
        "Thermodynamics in 35 Minutes | Plus one Chemistry Chapter 5",
        "Eduport",
      ),
    ],
    equilibrium: [
      v(
        "W8eTVvkPq1I",
        "Plus One Chemistry | Equilibrium - Full Chapter Revision",
        "Xylem",
      ),
      v("kSg5LQiG3cE", "Plus One Chemistry | Equilibrium | Full Chapter", "Exam Winner"),
      v(
        "1LMShVXOcgs",
        "Plus One Chemistry Equilibrium Chapter 6 Christmas Exam 2025",
        "Eduport",
      ),
    ],
    "redox-reactions": [
      v(
        "9KlwOz_5XdE",
        "Plus One Chemistry | Redox Reactions | Full Chapter",
        "Exam Winner",
      ),
      v("zliJClnv6vU", "Redox Reactions in 33 Minutes | Chapter 7", "Eduport"),
      v(
        "AU2oFz2_Vi4",
        "Plus One Chemistry: Redox Reactions | Full Chapter Revision",
        "Xylem",
      ),
    ],
    "organic-chemistry-basics": [
      v(
        "J4KoQ-K6uFs",
        "+1 Chemistry | Organic Chemistry: Some Basic Principles and Techniques | Full Chapter",
        "Exam Winner",
      ),
      v(
        "RMULYGp212M",
        "Plus One Chemistry Organic Chemistry Oneshot | Chapter 8",
        "Eduport",
      ),
      v(
        "JaCEgk9GNgk",
        "Plus One Chemistry - Organic Chemistry : Some Basic Principles and Techniques",
        "Xylem",
      ),
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
      v(
        "KbXXlaI-_tI",
        "Plus One Maths | Chapter 1 - Sets | Full Chapter One Shot",
        "Exam Winner",
      ),
      v("_Y_CVe8osn0", "Plus One Maths - Sets", "Xylem"),
    ],
    "relations-and-functions": [
      v(
        "bIjQKlvu5Cs",
        "Plus One Maths | Chapter 2 - Relations And Functions | Full Chapter Oneshot",
        "Exam Winner",
      ),
      v(
        "F0H7kwWA99I",
        "Relations and Functions in 35 Minutes | Plus One Maths",
        "Eduport",
      ),
      v(
        "Q96ZWfe9iYs",
        "Plus One Mathematics | Onam Exam Chapter 2 - Relations And Function - Full Chapter Revision",
        "Xylem",
      ),
    ],
    "trigonometric-functions": [
      v(
        "XQjf139YlUU",
        "Plus One Maths | Chapter 3 | Trigonometric Functions | Oneshot",
        "Exam Winner",
      ),
      v(
        "LlRIjLWrDmA",
        "Plus One Maths | Trigonometric Functions - Full Chapter Revision",
        "Xylem",
        8411,
      ),
      v(
        "ZqDm9ljeNmU",
        "Trigonometric Functions | One Shot | Plus One Maths Chapter 3",
        "Eduport",
      ),
    ],
    "complex-numbers": [
      v(
        "jG6ZtPxq80s",
        "+1 Maths | Complex Numbers and Quadratic Equations | Full Chapter Revision | Chapter 4",
        "Exam Winner",
      ),
      v(
        "zt25bVEqQGw",
        "Plus One Maths | Complex Numbers And Quadratic Equations - Full Chapter Revision",
        "Xylem",
      ),
      v(
        "1e11M1mGgvE",
        "Plus One Maths Complex Numbers and Quadratic Equations, Relations and Functions",
        "Eduport",
      ),
    ],
    "linear-inequalities": [
      v("AiIs41AN_Qw", "Plus One Maths - Linear Inequalities in 15 Minutes", "Xylem"),
      v(
        "CT405oFbt8Q",
        "Plus One Maths | Sure Questions | Linear Inequalities | Public Exam 2025",
        "Eduport",
      ),
      v(
        "XZ4rk2VgaLw",
        "Plus One Maths | Linear Inequalities | Limits and Derivatives | Probability",
        "Exam Winner",
        8758,
      ),
    ],
    "permutations-combinations": [
      v(
        "-2k_e9ql9pg",
        "Plus One Maths | Permutations And Combinations | Full Chapter",
        "Exam Winner",
      ),
      v(
        "zpiqvf0Yvck",
        "Permutations and Combinations in 40 Minutes | Plus One Maths Chapter 6",
        "Eduport",
      ),
      v(
        "bFYNHsJh0fY",
        "Plus One Maths | Permutation And Combination - Full Chapter Revision",
        "Xylem",
        6348,
      ),
      v(
        "ksTIKpbK9Kw",
        "Plus One Improvement Maths | Permutations And Combinations",
        "Xylem Plus Two",
        undefined,
        true,
      ),
    ],
    "binomial-theorem": [
      v("8CeFWL5DMt0", "Plus One Maths | Binomial Theorem | Full Chapter", "Exam Winner"),
      v("NUGNHRRl3Ig", "Binomial Theorem 5 മിനുട്ടിൽ ?", "Eduport"),
      v(
        "kk9SgC4ZFVY",
        "Plus One Maths - Concept Revision - Binomial Theorem in Just 15 Minutes",
        "Xylem",
      ),
    ],
    "sequences-and-series": [
      v(
        "lE88H7dNHTo",
        "Plus One Maths Christmas Exam | Sequences and Series | Chapter 9",
        "Exam Winner",
      ),
      v("w9tYCSj7O5Y", "Sequence & Series in 30 Minutes | Plus one Maths", "Eduport"),
      v(
        "9Saw1VTe4bc",
        "Plus One Maths | Maths | Sequences and Series - Full Chapter Revision",
        "Xylem",
        3491,
      ),
    ],
    "straight-lines": [
      v("O2eu0dW9YPc", "Plus One Maths | Straight Lines | Full Chapter", "Exam Winner"),
      v("TTUL82cR81A", "Plus One Maths | Straight Lines Summary", "Eduport"),
      v(
        "JDEGBeFKS2E",
        "Plus One Maths | Straight Lines - Full Chapter Revision",
        "Xylem",
      ),
      v(
        "C7sibtoTOyE",
        "Plus One Improvement Maths | Straightlines in 14 Minutes",
        "Xylem Plus Two",
        undefined,
        true,
      ),
    ],
    "conic-sections": [
      v(
        "NFryKwj_2KA",
        "Plus One Improvement Maths | Conic Section In 50 Minutes",
        "Xylem Plus Two",
        undefined,
        true,
      ),
      v("a7fHnQtnKJQ", "Plus One Maths | Conic Sections | Full Chapter", "Exam Winner"),
      v("MDeEvvnvPZU", "Plus One Maths | Conic Section | In 40 Minutes", "Eduport"),
    ],
    "introduction-to-three-dimensional-geometry": [
      v(
        "UgbCDY_qPW0",
        "Introduction to 3D Geometry in 28 Minutes | Plus One Maths Chapter 11",
        "Eduport",
      ),
      v(
        "7UiYBREuplE",
        "Plus One Maths - Introduction To 3d Geometry In 10 Minutes",
        "Xylem",
      ),
      v(
        "2EWNcURPHZs",
        "Plus One Maths | Straight Lines | Conic Sections | Introduction to 3 D Geometry",
        "Exam Winner",
        5484,
      ),
    ],
    "limits-and-derivatives": [
      v(
        "4_5L8DQW4DY",
        "Plus One Maths | Chapters : 12, 14 | Full Chapters",
        "Exam Winner",
        374,
      ),
      v(
        "P8rqbjAtbGo",
        "Limits and Derivatives in 47 Minutes | Plus One Maths Chapter 12",
        "Eduport",
      ),
      v("ja2fujK-o0w", "Plus One Christmas Exam Maths | Limits And Derivatives", "Xylem"),
    ],
    statistics: [
      v(
        "0p_IW3tEX7I",
        "Plus One Maths | Sure Questions | Statistics | Public Exam 2025",
        "Eduport",
      ),
      v(
        "O1BPiZCU2fg",
        "Plus One Mathematics | Statistics - Full Chapter Revision",
        "Xylem",
      ),
      v(
        "4_5L8DQW4DY",
        "Plus One Maths | Chapters : 12, 14 | Full Chapters",
        "Exam Winner",
        4164,
      ),
    ],
    probability: [
      v("puEhbfMtchA", "Plus One Mathematics - Probability", "Xylem"),
      v(
        "NyrmOIoaWjo",
        "Plus One Maths Public Exam | Probabilty One Shot in 54 Minutes | Chapter 13",
        "Eduport",
      ),
      v(
        "XZ4rk2VgaLw",
        "Plus One Maths | Linear Inequalities | Limits and Derivatives | Probability",
        "Exam Winner",
        6679,
      ),
    ],
  },
  english: {
    "his-first-flight": [
      v(
        "au1bwb1t2rE",
        "Plus One English Chapter 1 | His First Flight Short Summary in Malayalam",
        "Eduport",
      ),
      v(
        "3ru1AlsMI8o",
        "Plus One English - His First Flight | I Will Fly | Quest for a Theory of Everything - One Shot Revision",
        "Xylem",
        59,
      ),
    ],
    "i-will-fly": [
      v(
        "aPSv99r0UGs",
        "Plus One English Chapter 2 | I Will Fly Short Summary in Malayalam",
        "Eduport",
      ),
      v(
        "3ru1AlsMI8o",
        "Plus One English - His First Flight | I Will Fly | Quest for a Theory of Everything - One Shot Revision",
        "Xylem",
        646,
      ),
    ],
    "quest-for-a-theory-of-everything": [
      v(
        "Cf37_Np3Prk",
        "Plus One English Improvement Exam - Quest for a Theory of Everything",
        "Xylem Plus Two",
      ),
      v(
        "3ru1AlsMI8o",
        "Plus One English - His First Flight | I Will Fly | Quest for a Theory of Everything - One Shot Revision",
        "Xylem",
        1181,
      ),
    ],
    if: [
      v("yL0u2G1D3Yw", "Plus One English | Chapter 4 IF Summary", "Eduport"),
      v("NiZbvBaUQgM", "Plus One English - IF Poem - A Quick Revision", "Xylem"),
    ],
    "and-then-gandhi-came": [
      v("1sgzvmxXKj4", "Plus One English - And Then Gandhi Came", "Xylem"),
      v(
        "qYYRuNCDkaw",
        "Plus One English | Focus Area | And Then Gandhi Came | Malayalam",
        "Exam Winner",
      ),
    ],
    "price-of-flowers": [
      v(
        "VcI7aR157QE",
        "Price of Flowers in 18 minutes | Plus One English Summary",
        "Eduport",
      ),
      v(
        "W0Zc-rIstyU",
        "Plus One Improvement Exam - English - And Then Gandhi Came The Price Of Flowers",
        "Xylem Plus Two",
        1592,
      ),
    ],
    "death-the-leveller": [
      v(
        "OumMDotku7c",
        "Plus One English | Christmas Exam Special - Death the Leveller | Line by Line Explanation",
        "Xylem",
      ),
      v(
        "hZFd4chhdag",
        "Plus One English Exam | Death the Leveller | Poem",
        "Exam Winner",
      ),
    ],
    "sunrise-on-the-hills": [
      v("xYHA2lZAHGg", "Plus One English | Sunrise On The Hills", "Xylem"),
      v(
        "_YDGp8-9Trw",
        "Plus One English Exam | Sunrise on the Hills | Poem | Summary and Revision",
        "Exam Winner",
      ),
    ],
    "the-trip-of-le-horla": [
      v("7lqeU4y87GA", "Plus One English | The Trip Of Le Horla", "Xylem"),
      v("KUvT0pKqURI", "The Trip of Le Horla in 10 minutes | Chapter Summary", "Eduport"),
    ],
    "the-sacred-turtles-of-kadavu": [
      v(
        "JXLefv9DrpI",
        "Sacred Turtles of Kadavu in 10 Mins | Chapter Summary",
        "Eduport",
      ),
      v(
        "UsO3OKM_azM",
        "PlusOne-English-Sunrise on the Hills | The Trip of Le Horla | The Sacred Turtles of Kadavu",
        "Xylem",
        2201,
      ),
    ],
    "disasters-and-disaster-management-in-india": [
      v(
        "xberPMZMBK8",
        "Plus One English | Disasters and Disaster Management in India - Short Summary",
        "Eduport",
      ),
      v(
        "zq5s_sYnnSo",
        "Plus One English | Disaster And Disaster Management In India",
        "Xylem",
      ),
    ],
    "the-serang-of-ranaganji": [
      v(
        "beYoho9zAzw",
        "Plus One English - The Serang of Ranaganji - A Quick Revision",
        "Xylem",
      ),
      v(
        "gWOIhS7tZog",
        "Plus One Model Exam | English | Serang of Ranaganji",
        "Exam Winner",
      ),
      v("b4ojH6_2zV4", "Serang of Ranagangi in 15 minutes | Plus One English", "Eduport"),
    ],
    "the-wreck-of-the-titanic": [
      v(
        "htzVzS7FQfc",
        "Plus One English Public Exam | The Wreck of the Titanic",
        "Exam Winner",
      ),
      v(
        "c7Yt950tUTE",
        "Plus One English - Revision Series : Poem - the Wreck of the Titanic - in One Shot",
        "Xylem",
      ),
    ],
    gooseberries: [
      v("JzChc-K_-80", "Plus One English | Gooseberries Summary", "Eduport"),
      v("yanjHV7Ijeg", "Plus One English - Gooseberries - Quick Summary", "Xylem"),
    ],
    "to-sleep": [
      v(
        "3Sm77Um6e3I",
        "Plus One English Public Exam | To Sleep | Poem | Summary and Revision",
        "Exam Winner",
      ),
      v("UO7_xk1S_wY", "Plus One English | To Sleep - Revision Series", "Xylem"),
    ],
    "going-out-for-a-walk": [
      v(
        "m8DoQN2SWp4",
        "Going out for a walk Essay in 17 Minutes | Unit 5 Chapter 3",
        "Eduport",
      ),
      v(
        "QmDv1KbpwAA",
        "Plus One Improvement Exam - English - Going Out for a Walk & The Cyberspace",
        "Xylem Plus Two",
        661,
      ),
    ],
    "the-cyberspace": [
      v("DT5HGJf56UM", "Plus One English - Cyber Space - Quick Summary", "Xylem"),
    ],
    "is-society-dead": [
      v("F_4XeY2CaxI", "Plus One English | Is Society Dead - Quick Revision", "Xylem"),
      v(
        "3YDVywUayzs",
        "To sleep | The trip of le horla | Cyberspace | Is society dead? | Conceptual fruit",
        "Exam Winner",
        3709,
      ),
    ],
    "conceptual-fruit": [
      v("pzYUgSwyJIk", "Plus One English - Conceptual Fruit - Quick Summary", "Xylem"),
      v(
        "4JUKhoe9zGM",
        "Plus One English Public Exam | All Chapters in One live",
        "Exam Winner",
        11045,
      ),
    ],
  },
  malayalam: {
    sandharshanam: [
      v("ta7iFKD6Ex4", "Plus One മലയാളം - സന്ദർശനം", "Xylem"),
      v("VxW1ljGSV5o", "Plus One മലയാളം | Unit 1 - Important Questions", "Xylem"),
      v("zTJLLLRSMR0", "Plus One Malayalam 1 Public Exam | Marathon", "Exam Winner", 155),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        10727,
      ),
    ],
    "ormayude-njarambu": [
      v("VxW1ljGSV5o", "Plus One മലയാളം | Unit 1 - Important Questions", "Xylem"),
      v("zTJLLLRSMR0", "Plus One Malayalam 1 Public Exam | Marathon", "Exam Winner", 911),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        10858,
      ),
    ],
    "verukal-nashtappeduthunnavar": [
      v("VxW1ljGSV5o", "Plus One മലയാളം | Unit 1 - Important Questions", "Xylem"),
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        1490,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        11107,
      ),
    ],
    malsyam: [
      v("Y8QdnjPni30", "Plus One Malayalam | മത്സ്യം", "Xylem"),
      v("VxW1ljGSV5o", "Plus One മലയാളം | Unit 1 - Important Questions", "Xylem"),
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        2134,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        11307,
      ),
    ],
    kayalarikathu: [
      v("uRxu6F4D6Vo", "Plus One മലയാളം - കായലരികത്ത്", "Xylem"),
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        2624,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        8299,
      ),
    ],
    "sinimayum-samoohavum": [
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        2881,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        9017,
      ),
    ],
    "kalavupoya-cycle": [
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        3193,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        9835,
      ),
    ],
    kaipaadu: [
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        3556,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        10205,
      ),
    ],
    kelkkunnundo: [
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        3770,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        10497,
      ),
    ],
    "kavyakala-nireekshanangal": [
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        3939,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        5070,
      ),
    ],
    oonjaalil: [
      v("dxaYJzDWXkQ", "Plus One Malayalam | ഊഞ്ഞാലിൽ - പരീക്ഷാ ചോദ്യങ്ങൾ", "Xylem"),
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        4213,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        6024,
      ),
    ],
    "anargha-nimisham": [
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        4565,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        6537,
      ),
    ],
    "lathiyum-vediyundayum": [
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        4763,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        7268,
      ),
    ],
    peelikannukal: [
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        5076,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        685,
      ),
    ],
    anukamba: [
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        5351,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        1369,
      ),
    ],
    mohiyudheenmaala: [
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        5598,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        2030,
      ),
    ],
    vaasanaavikruthi: [
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        5715,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        2528,
      ),
    ],
    sankramanam: [
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        5964,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        3431,
      ),
    ],
    shasthrakriya: [
      v(
        "zTJLLLRSMR0",
        "Plus One Malayalam 1 Public Exam | Marathon",
        "Exam Winner",
        6340,
      ),
      v(
        "s0amSyZWHGw",
        "Plus One Public Exam 2026 | Malayalam - Mega Marathon",
        "Xylem",
        4536,
      ),
    ],
  },
  "computer-science": {
    "discipline-of-computing": [
      v(
        "HXQ9vzuiABQ",
        "Plus One Computer Science | Chapter 1 | Discipline of Computing | Full Chapter Revision",
        "Exam Winner",
      ),
      v(
        "O_Z6xGGMRDI",
        "Plus One Computer Science | Chapter 1 | Discipline of Computing",
        "Eduport",
      ),
      v(
        "Mta5V7xrhVM",
        "Plus One Computer Science: Chapter 1 | The Discipiline of Computing",
        "Xylem",
      ),
      v("GyTe9pO3YYk", "Plus One CS Marathon | One Shot", "Eduport", 2042),
      v(
        "AU08LNmH3hs",
        "Plus One Model Exam Computer Science | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        180,
      ),
      v(
        "HehW4CzKLzE",
        "Plus One Computer Science | Discipline Of Computing In 20 Minutes",
        "Xylem Plus Two",
        undefined,
        true,
      ),
    ],
    "data-representation-and-boolean-algebra": [
      v(
        "5z2FIyzdmAU",
        "Plus One Computer Science | Chapter 2 Data Representation and Boolean Algebra | Full Chapter Revision",
        "Exam Winner",
      ),
      v(
        "BbEVuPkzLCU",
        "Plus One Computer Science | Chapter 2 Data Representation and Boolean Algebra",
        "Eduport",
      ),
      v(
        "T0FmGeY-iFQ",
        "Plus One Computer Science | Chapter 2 - Data Representation And Boolean Algebra - Part 1",
        "Xylem",
      ),
      v("GyTe9pO3YYk", "Plus One CS Marathon | One Shot", "Eduport", 2743),
      v(
        "AU08LNmH3hs",
        "Plus One Model Exam Computer Science | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        2209,
      ),
      v(
        "FPhrsxmauvY",
        "Plus One Computer Science | Data Representation And Boolean Algebra In 30 Minutes",
        "Xylem Plus Two",
        undefined,
        true,
      ),
    ],
    "components-of-computer-system": [
      v(
        "P3bXZEQrkl8",
        "Plus One Computer Science | Chapter 3 Components of Computer System | Full Chapter Revision",
        "Exam Winner",
      ),
      v(
        "1OLzrLhkbcQ",
        "Plus One Onam Exam Computer Science | Chapter 3 | Components of the Computer System - One Shot",
        "Eduport",
      ),
      v(
        "_mZSd_igivU",
        "Plus One Computer Science | Data Representation And Boolean Algebra, Components Of Computer System",
        "Xylem",
        4557,
      ),
      v("GyTe9pO3YYk", "Plus One CS Marathon | One Shot", "Eduport", 4504),
      v(
        "AU08LNmH3hs",
        "Plus One Model Exam Computer Science | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        9164,
      ),
    ],
    "principles-of-programming-and-problem-solving": [
      v("E-0nsPFFxEo", "Plus One Computer Science | Chapter 4, 5, 6", "Exam Winner", 275),
      v(
        "8xbxyh1i0BM",
        "Plus One CS | Principle of Programming & Problem Solving in 15 minutes",
        "Eduport",
      ),
      v(
        "3chId5iqtSQ",
        "Plus One Computer Science - Principles of Programming and Problem Solving",
        "Xylem",
      ),
      v("GyTe9pO3YYk", "Plus One CS Marathon | One Shot", "Eduport", 5684),
      v(
        "AU08LNmH3hs",
        "Plus One Model Exam Computer Science | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        11654,
      ),
    ],
    "introduction-to-cpp-programming": [
      v(
        "1YzXpTOmvJM",
        "Plus One CS Introduction to C++ Programming Chapter 5 Christmas Exam 2025",
        "Eduport",
      ),
      v(
        "Ebe2NSVax0w",
        "Plus One Computer Science Public Exam | Chapters: 5, 6, 7, 8",
        "Exam Winner",
        235,
      ),
      v(
        "bnIab8lQw7k",
        "Plus One - Computer Science - Introduction to C++ Programming",
        "Xylem",
      ),
      v("GyTe9pO3YYk", "Plus One CS Marathon | One Shot", "Eduport", 6942),
      v(
        "AU08LNmH3hs",
        "Plus One Model Exam Computer Science | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        19648,
      ),
    ],
    "data-types-and-operators": [
      v(
        "hsUF2bRG258",
        "Plus One Computer Science | Data Types and Operations | Chapter 6 | Full Chapter Revision",
        "Exam Winner",
      ),
      v(
        "UjeYssftPts",
        "Plus One Computer Science | Data Types and Operators | Chapter 6",
        "Eduport",
      ),
      v("GyTe9pO3YYk", "Plus One CS Marathon | One Shot", "Eduport", 7463),
      v(
        "AU08LNmH3hs",
        "Plus One Model Exam Computer Science | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        20565,
      ),
    ],
    "control-statements": [
      v(
        "lwADOfsFQAU",
        "Plus One Computer Science | Control statement | Chapter 7 | Full Chapter Revision",
        "Exam Winner",
      ),
      v(
        "fnKzVXlWQho",
        "Plus One Computer Science | Control Statements - Full Chapter Revision",
        "Xylem",
      ),
      v("3-uhwXrJ7ok", "Plus One CS | Control Statements in 14 minutes", "Eduport"),
      v("GyTe9pO3YYk", "Plus One CS Marathon | One Shot", "Eduport", 8784),
      v(
        "AU08LNmH3hs",
        "Plus One Model Exam Computer Science | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        23993,
      ),
    ],
    arrays: [
      v(
        "LmXQBBNHNlo",
        "Plus One Computer Science | Arrays | Chapter 8 | Full Chapter revision",
        "Exam Winner",
      ),
      v(
        "-1N5LFWXP28",
        "Plus One Christmas Exam Computer Science | String Handling And I/O Functions, Arrays",
        "Xylem",
        62,
      ),
      v("GyTe9pO3YYk", "Plus One CS Marathon | One Shot", "Eduport", 9074),
      v(
        "AU08LNmH3hs",
        "Plus One Model Exam Computer Science | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        26820,
      ),
    ],
    "string-handling-and-io-functions": [
      v(
        "ruBOK204J9w",
        "Plus One Computer Science | Chapters: 9, 10, 11, 12 | Full Chapters",
        "Exam Winner",
        39,
      ),
      v(
        "Qcpc_Q_VklM",
        "Plus One Christmas Exam - Computer Science - Day 7",
        "Xylem",
        2819,
      ),
      v("GyTe9pO3YYk", "Plus One CS Marathon | One Shot", "Eduport", 9792),
      v(
        "AU08LNmH3hs",
        "Plus One Model Exam Computer Science | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        28422,
      ),
    ],
    functions: [
      v(
        "tF2uJ5CqDRo",
        "Plus One Computer Science | Functions - One Shot Revision",
        "Xylem",
      ),
      v(
        "ruBOK204J9w",
        "Plus One Computer Science | Chapters: 9, 10, 11, 12 | Full Chapters",
        "Exam Winner",
        339,
      ),
      v("GyTe9pO3YYk", "Plus One CS Marathon | One Shot", "Eduport", 10060),
      v(
        "AU08LNmH3hs",
        "Plus One Model Exam Computer Science | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        28849,
      ),
    ],
    "computer-networks": [
      v(
        "ruBOK204J9w",
        "Plus One Computer Science | Chapters: 9, 10, 11, 12 | Full Chapters",
        "Exam Winner",
        966,
      ),
      v("GyTe9pO3YYk", "Plus One CS Marathon | One Shot", "Eduport", 410),
      v(
        "AU08LNmH3hs",
        "Plus One Model Exam Computer Science | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        30565,
      ),
    ],
    "internet-and-mobile-computing": [
      v(
        "tL5NUdr459M",
        "Plus One Computer Science | 12. Internet and Mobile Computing",
        "Eduport",
      ),
      v(
        "qHrq1oBOtmg",
        "+1 Computer Science | Internet & Mobile Computing | Full Chapter",
        "Exam Winner",
      ),
      v("GyTe9pO3YYk", "Plus One CS Marathon | One Shot", "Eduport", 10692),
      v(
        "AU08LNmH3hs",
        "Plus One Model Exam Computer Science | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        31277,
      ),
    ],
  },
  zoology: {
    "animal-kingdom": [
      v(
        "rTFyvekBb-k",
        "Plus One Biology | Chapter 4 | Animal Kingdom | Oneshot",
        "Exam Winner",
      ),
      v(
        "3vrJtWo2JWc",
        "Animal Kingdom | One Shot | Plus One Biology Chapter 4",
        "Eduport",
      ),
      v(
        "HQS_T9Q7I8A",
        "Plus One Biology Public Exam | Chapters 1, 2, 3, 4, 5, 6, 8, 9 & 10 | Full Chapter",
        "Exam Winner",
        4133,
      ),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        157,
      ),
    ],
    "structural-organisation": [
      v(
        "aUtOs-8UGEI",
        "+1 Biology Onam Exam | Chapter 7 | Structural Organisation In Animals | Oneshot",
        "Exam Winner",
      ),
      v(
        "3yH4feQfCUk",
        "Plus One Zoology | Structural Organisation In Animals - Revision",
        "Xylem",
      ),
      v(
        "0zusmy1Vi0M",
        "Structural Organisation in Animals | One Shot | Plus One Biology Chapter 7",
        "Eduport",
      ),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        32211,
      ),
    ],
    "cell-the-unit-of-life": [
      v("M9qiOsTGhRs", "Plus One Biology | Cell the Unit Of Life", "Exam Winner"),
      v(
        "YotYDIpyPUU",
        "Plus One Botany | Cell The Unit Of Life - Complete Revision In One Video",
        "Xylem",
      ),
      v(
        "GYqkx2U9Jvg",
        "Plus One Biology | Chapter 8 | Cell: The Unit of Life - One Shot",
        "Eduport",
      ),
      v(
        "HQS_T9Q7I8A",
        "Plus One Biology Public Exam | Chapters 1, 2, 3, 4, 5, 6, 8, 9 & 10 | Full Chapter",
        "Exam Winner",
        25205,
      ),
    ],
    biomolecules: [
      v("0naYRk2bgW4", "Plus One Zoology | 9. Biomolecules - One Shot", "Eduport"),
      v("fs_h8kFzOww", "Plus One Biology | Biomolecules Full Chapter Revision", "Xylem"),
      v(
        "HQS_T9Q7I8A",
        "Plus One Biology Public Exam | Chapters 1, 2, 3, 4, 5, 6, 8, 9 & 10 | Full Chapter",
        "Exam Winner",
        15144,
      ),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        10316,
      ),
    ],
    "cell-cycle": [
      v(
        "PhpJlwEaAZ0",
        "Plus One Biology | Cell Cycle and Cell Division | Full Chapter in 10 Minutes",
        "Exam Winner",
      ),
      v(
        "Vc-6ymhIqQU",
        "Plus One Biology | Cell Cycle and Cell Division | Chapter 10 | Full Chapter Revision",
        "Exam Winner",
      ),
      v(
        "VU1_qf9Atro",
        "Plus One Biology Cell Cycle and Cell Division Chapter 10 Christmas Exam 2025",
        "Eduport",
      ),
      v(
        "HQS_T9Q7I8A",
        "Plus One Biology Public Exam | Chapters 1, 2, 3, 4, 5, 6, 8, 9 & 10 | Full Chapter",
        "Exam Winner",
        28871,
      ),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        34438,
      ),
    ],
    "digestion-and-absorption": [
      v(
        "3qRdKSZDk_Y",
        "REVISION 2.0; DIGESTION & ABSORPTION | BIO-WAR | +1 FOCUS AREA BIOLOGY",
        "Xylem Plus Two",
      ),
      v(
        "dKt67UpEeBM",
        "Plus One | Biology Focus Area | Chap-16 | Digestion and Absorption",
        "Exam Winner",
      ),
    ],
    "breathing-and-exchange": [
      v(
        "4VqDpH618Lg",
        "Plus One Biology | Breathing And Exchange Of Gases | Full Chapter",
        "Exam Winner",
      ),
      v(
        "-ORQgBMA8zI",
        "Plus One Zoology Breathing and Exchange of Gases Christmas Exam Important Portions Chapter 14",
        "Eduport",
      ),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        7621,
      ),
    ],
    "body-fluids-and-circulation": [
      v(
        "SxHGlZdEjUk",
        "Plus One Zoology Body Fluids and Circulation Christmas Exam Important Portions Chapter 15",
        "Eduport",
      ),
      v(
        "fy81GLg9now",
        "Plus One Biology | Bodyfluids And Circulation | Chapter 18 | Full Chapter Revision",
        "Exam Winner",
      ),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        23793,
      ),
    ],
    "excretory-products-and-their-elimination": [
      v(
        "j4FoJK9m1Js",
        "Plus One Biology | Excretory Products and Their Elimination | Chapter 16 | Full Chapter",
        "Exam Winner",
      ),
      v(
        "wIR9DXX9vfk",
        "Plus One Improvement Exam - Biology - Excretory Products and Their Elimination",
        "Xylem Plus Two",
      ),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        26826,
      ),
    ],
    "locomotion-and-movement": [
      v("xTIsy_V4SjM", "Plus One Biology | 17. Locomotion and Movement", "Eduport"),
      v("RUcFlrgXJaY", "Plus One Zoology - Locomotion and Movement", "Xylem"),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        13496,
      ),
    ],
    "neural-control": [
      v("nx58mBqMT9Y", "Plus One Zoology - Neural Control and Coordination", "Xylem"),
      v(
        "Di1zgSgqDgM",
        "Plus One Biology | 18. Neural Control and Coordination",
        "Eduport",
      ),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        29689,
      ),
    ],
    "chemical-coordination-and-integration": [
      v(
        "m2rhapvrdL8",
        "Plus One Zoology - Chemical Coordination and Integration",
        "Xylem",
      ),
      v(
        "8QbE9NUZ0PI",
        "Plus One Improvement Exam - Biology - Chemical Coordination And Integration",
        "Eduport",
      ),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        15707,
      ),
    ],
  },
  botany: {
    "the-living-world": [
      v(
        "zCiCc8DQS9U",
        "Plus One Biology | Chapter 1 The Living World Summary",
        "Eduport",
      ),
      v(
        "3a6EitDusqs",
        "Plus One Biology | Chapter 1 - The Living World | Full Chapter Oneshot",
        "Exam Winner",
      ),
      v(
        "HQS_T9Q7I8A",
        "Plus One Biology Public Exam | Chapters 1, 2, 3, 4, 5, 6, 8, 9 & 10 | Full Chapter",
        "Exam Winner",
        515,
      ),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        33221,
      ),
    ],
    "biological-classification": [
      v(
        "hvZlr9d_VZU",
        "Plus One Biology | Chapter 2 - Biological Classification | Full Chapter Oneshot",
        "Exam Winner",
      ),
      v(
        "XKZLJ9CiY8A",
        "+1 Biology Onam Exam | Chapter 2 | Biological Classification | Oneshot",
        "Exam Winner",
      ),
      v(
        "DMf4hYDa5rc",
        "Plus Two Botany | Biological Classifications | One Shot Revision",
        "Xylem",
      ),
      v(
        "HQS_T9Q7I8A",
        "Plus One Biology Public Exam | Chapters 1, 2, 3, 4, 5, 6, 8, 9 & 10 | Full Chapter",
        "Exam Winner",
        1296,
      ),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        18580,
      ),
      v(
        "iKRSnSsWOTA",
        "Plus One Improvement Botany | Biological Classification In 30 Minutes | Xylem Plus Two",
        "Xylem Plus Two",
        undefined,
        true,
      ),
    ],
    "plant-kingdom": [
      v("jFBukFHKY6c", "Plus One Biology | Plant Kingdom Summary", "Eduport"),
      v(
        "s2sx3mCDiF0",
        "PLUS ONE BIOLOGY ONAM EXAM | PLANT KINGDOM PART 1 | CHAPTER 3",
        "Exam Winner",
      ),
      v("JX2WCF7KHu8", "Plus One - Botany - Plant Kingdom", "Xylem"),
      v(
        "HQS_T9Q7I8A",
        "Plus One Biology Public Exam | Chapters 1, 2, 3, 4, 5, 6, 8, 9 & 10 | Full Chapter",
        "Exam Winner",
        19026,
      ),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        21708,
      ),
      v(
        "igeezdakcKQ",
        "Plus One Improvement Botany | Plant Kingdom In 30 Minutes | Xylem Plus Two",
        "Xylem Plus Two",
        undefined,
        true,
      ),
    ],
    "morphology-of-flowering-plants": [
      v(
        "FgXcmFvbmn4",
        "Plus One Botany | Morphology of Flowering Plants | One Shot Revision",
        "Xylem",
      ),
      v(
        "iTEmhalDNsE",
        "Plus One Christmas Exam | Biology | Morphology of Flowering Plants | Full Chapter",
        "Exam Winner",
      ),
      v(
        "HQS_T9Q7I8A",
        "Plus One Biology Public Exam | Chapters 1, 2, 3, 4, 5, 6, 8, 9 & 10 | Full Chapter",
        "Exam Winner",
        11724,
      ),
      v(
        "lJqvNoHQdi0",
        "Plus One Improvement Botany | Morphology Of Flowering Plants In 30 Minutes",
        "Xylem Plus Two",
        undefined,
        true,
      ),
    ],
    "anatomy-of-flowering-plants": [
      v(
        "rtiqxE5rG9I",
        "Plus One Biology Christmas Exam | Anatomy of Flowering Plants | Full Chapter",
        "Exam Winner",
      ),
      v(
        "nK-eMYMdvRk",
        "Plus One Botany - Anatomy of Flowering Plants in 15 Minutes",
        "Xylem",
      ),
    ],
    "transport-in-plants": [
      v(
        "xSUtLNhoLow",
        "Plus One | Biology Focus Area | Chap-11 | Transport in Plants",
        "Exam Winner",
      ),
      v(
        "f0o3geEsK84",
        "TRANSPORT IN PLANTS & MINERAL NUTRITION | PLUS ONE FOCUS AREA",
        "Xylem Plus Two",
      ),
    ],
    "mineral-nutrition": [
      v(
        "JMy_o22mTA0",
        "Plus One | Biology Focus Area | Chap-12 | Mineral Nutrition",
        "Exam Winner",
      ),
      v(
        "6WXf5RWyyL4",
        "REVISION 2.0; MINERAL NUTRITION | BIO-WAR | +1 FOCUS AREA BIOLOGY",
        "Xylem Plus Two",
      ),
    ],
    photosynthesis: [
      v(
        "VR-7Tj3JvdI",
        "Plus One Botany | Photosynthesis in Higher Plants in 30 Minutes",
        "Eduport",
      ),
      v(
        "jdqS0IbR7ZA",
        "Plus One Biology | Photosynthesis In Higher Plants | Oneshot",
        "Exam Winner",
      ),
      v("PeVNtXctTM0", "Photosynthesis in Higher Plants — Full", "Exam Winner"),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        36477,
      ),
    ],
    "respiration-in-plants": [
      v("bnz_45dkbc4", "Respiration in Plants", "Exam Winner"),
      v(
        "xvy9iLe7654",
        "Plus One Biology | Respiration in Plants | Chapter 14 | Full Chapter",
        "Exam Winner",
      ),
      v(
        "BCm2bdgLRtg",
        "Plus One Biology | Respiration in Plants | Sure Questions",
        "Eduport",
      ),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        38751,
      ),
    ],
    "plant-growth": [
      v(
        "L6IaDUR6dz0",
        "Plus One Biology | Plant Growth & Development | Full Chapter",
        "Exam Winner",
      ),
      v("UTLfdVXrXcM", "Plant Growth and Development", "Xylem"),
      v(
        "gPK7ih63SVM",
        "Plus One Model Exam Biology | Full Chapters In One Live - Mega Marathon",
        "Xylem",
        41055,
      ),
    ],
  },
};

export function chapterVideos(subject: string, chapter: string): ChapterVideo[] {
  return CHAPTER_VIDEOS[subject]?.[chapter] ?? [];
}

// Improvement-season motivation and strategy picks for the dashboard.
// Hand-verified titles; YUMtwCVoDDc is third-party commentary included
// on explicit request.
export const MOTIVATION_VIDEOS: ChapterVideo[] = [
  v("YUMtwCVoDDc", "I analysed 37.5 hours of +2 youtube classes", "Other"),
  v("K8v3xLi_asw", "+1 Improvement | Prove Them Wrong - KATTA MOTIVATION", "Eduport"),
  v("dzg7hH5d_D0", "Plus One Improvement Study Plan Motivation", "Eduport"),
  v(
    "dxUBuJrLXWw",
    "+1 Improvement Exam - Big Trap | Preparation Strategy",
    "Exam Winner",
  ),
  v("FTtF4DEE_gk", "Plus One Improvement Exam Study Plan", "Exam Winner"),
  v("HRrBk7VON7Y", "Plus One Improvement Exam Study Plan (Malayalam)", "Eduport"),
];

export type RecentVideo = {
  subjectSlug: string;
  subjectName: string;
  chapterSlug: string;
  chapterTitle: string;
  video: ChapterVideo;
};

// Recently added videos across all subjects, newest mapping first so fresh
// additions surface instead of being cut by the limit. (True upload order
// would need an addedAt field — mapping position is the proxy for now.)
export function recentVideos(limit = 8): RecentVideo[] {
  const out: RecentVideo[] = [];
  const entries = Object.entries(CHAPTER_VIDEOS).reverse();
  for (const [subjectSlug, chapters] of entries) {
    const subject = getSubject(subjectSlug);
    if (!subject) continue;
    for (const [chapterSlug, list] of Object.entries(chapters)) {
      const chapter = getChapter(subject, chapterSlug);
      if (!chapter) continue;
      for (const video of list) {
        if (video.recent) {
          out.push({
            subjectSlug,
            subjectName: subject.name,
            chapterSlug,
            chapterTitle: chapter.title,
            video,
          });
        }
      }
    }
  }
  return out.slice(0, limit);
}

// Real counts derived from the curated mapping — safe to display.
export function subjectVideoCount(subject: string): number {
  return Object.values(CHAPTER_VIDEOS[subject] ?? {}).reduce(
    (sum, list) => sum + list.length,
    0,
  );
}
