// Central catalog for every science-batch subject and chapter.
// NOTE: chapter names, lesson counts and key points are PLACEHOLDER mock
// data so routes and UI can be built now. Replace with the official SCERT /
// NCERT Plus One lists before any real launch.

export type Chapter = {
  slug: string;
  title: string;
  lessons: number;
  keyPoints: string[];
  questions: number; // previous-year questions mapped to this chapter
};

export type Subject = {
  slug: string;
  name: string;
  tagline: string;
  // Maximum marks for this subject in the Plus One exam.
  maxMarks: number;
  chapters: Chapter[];
};

function ch(
  slug: string,
  title: string,
  lessons: number,
  keyPoints: string[],
  questions: number,
): Chapter {
  return { slug, title, lessons, keyPoints, questions };
}

export const SUBJECTS: Subject[] = [
  {
    slug: "physics",
    name: "Physics",
    tagline: "Concepts, derivations and numericals that carry the most marks.",
    maxMarks: 60,
    chapters: [
      ch("units-and-measurements", "Units and Measurements", 8, ["SI units and dimensions", "Significant figures", "Error analysis"], 14),
      ch("motion-in-a-straight-line", "Motion in a Straight Line", 12, ["Distance vs displacement", "Velocity-time graphs", "Equations of motion"], 18),
      ch("motion-in-a-plane", "Motion in a Plane", 10, ["Vectors and resolution", "Projectile motion", "Uniform circular motion"], 15),
      ch("laws-of-motion", "Laws of Motion", 11, ["Newton's three laws", "Friction", "Circular motion dynamics"], 17),
      ch("work-energy-and-power", "Work, Energy and Power", 9, ["Work-energy theorem", "Conservation of energy", "Collisions"], 16),
      ch("system-of-particles", "System of Particles and Rotation", 10, ["Centre of mass", "Torque and angular momentum", "Moment of inertia"], 13),
      ch("gravitation", "Gravitation", 8, ["Kepler's laws", "g variation with height", "Escape velocity"], 12),
      ch("mechanical-properties-of-solids", "Mechanical Properties of Solids", 7, ["Stress-strain curve", "Hooke's law", "Modulus of elasticity"], 9),
      ch("mechanical-properties-of-fluids", "Mechanical Properties of Fluids", 9, ["Bernoulli's principle", "Viscosity", "Surface tension"], 11),
      ch("thermal-properties-of-matter", "Thermal Properties of Matter", 8, ["Heat transfer modes", "Newton's law of cooling", "Thermal expansion"], 10),
      ch("thermodynamics", "Thermodynamics", 9, ["Laws of thermodynamics", "Carnot engine", "Entropy basics"], 12),
      ch("kinetic-theory", "Kinetic Theory", 7, ["Ideal gas laws", "Temperature interpretation", "Degrees of freedom"], 9),
      ch("oscillations", "Oscillations", 7, ["SHM equations", "Pendulums", "Damped oscillations"], 9),
      ch("waves", "Waves", 7, ["Wave speed", "Superposition", "Standing waves"], 9),
    ],
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    tagline: "Reactions, mechanisms and named processes in one revision loop.",
    maxMarks: 60,
    chapters: [
      ch("some-basic-concepts", "Some Basic Concepts of Chemistry", 9, ["Mole concept", "Stoichiometry", "Limiting reagent"], 15),
      ch("structure-of-atom", "Structure of Atom", 11, ["Quantum numbers", "Electronic configuration", "Bohr model limits"], 18),
      ch("classification-of-elements", "Classification of Elements", 7, ["Periodic trends", "Ionisation enthalpy", "Electron gain enthalpy"], 12),
      ch("chemical-bonding", "Chemical Bonding and Molecular Structure", 10, ["VSEPR shapes", "Hybridisation", "Molecular orbital basics"], 16),
      ch("thermodynamics", "Thermodynamics", 9, ["Enthalpy and entropy", "Gibbs energy", "Hess's law"], 13),
      ch("equilibrium", "Equilibrium", 10, ["Law of mass action", "Le Chatelier's principle", "pH and buffers"], 15),
      ch("redox-reactions", "Redox Reactions", 7, ["Oxidation numbers", "Balancing redox equations", "Electrochemical series"], 11),
      ch("organic-chemistry-basics", "Organic Chemistry: Basic Principles", 12, ["GOC and resonance", "Isomerism", "Reaction intermediates"], 17),
      ch("hydrocarbons", "Hydrocarbons", 9, ["Alkanes, alkenes, alkynes", "Markovnikov rule", "Aromaticity"], 14),
    ],
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    tagline: "Pattern-first practice: formulas, then previous questions.",
    maxMarks: 60,
    chapters: [
      ch("sets", "Sets", 7, ["Types of sets", "Venn diagrams", "De Morgan's laws"], 10),
      ch("relations-and-functions", "Relations and Functions", 9, ["Domain and range", "Types of functions", "Composition"], 12),
      ch("trigonometric-functions", "Trigonometric Functions", 11, ["Standard identities", "Sum and difference formulas", "General solutions"], 16),
      ch("complex-numbers", "Complex Numbers", 8, ["Modulus and argument", "De Moivre's theorem", "Cube roots of unity"], 11),
      ch("linear-inequalities", "Linear Inequalities", 6, ["Graphical solutions", "System of inequalities", "Word problems"], 8),
      ch("permutations-combinations", "Permutations and Combinations", 9, ["Counting principles", "nPr vs nCr", "Circular arrangements"], 13),
      ch("binomial-theorem", "Binomial Theorem", 7, ["General and middle terms", "Binomial coefficients", "Applications"], 10),
      ch("sequences-and-series", "Sequences and Series", 9, ["AP and GP formulas", "Sum to n terms", "Special series"], 12),
      ch("straight-lines", "Straight Lines", 8, ["Slope forms", "Distance formulas", "Family of lines"], 11),
      ch("conic-sections", "Conic Sections", 9, ["Circle, parabola, ellipse", "Standard equations", "Tangents"], 12),
      ch("limits-and-derivatives", "Limits and Derivatives", 10, ["Standard limits", "First principles", "Rules of differentiation"], 14),
      ch("statistics-and-probability", "Statistics and Probability", 8, ["Mean, median, mode", "Variance", "Classical probability"], 10),
    ],
  },
  {
    slug: "english",
    name: "English",
    tagline: "Lessons, language skills and writing formats for full marks.",
    maxMarks: 80,
    chapters: [
      ch("of-studies", "Of Studies (Essay)", 6, ["Main arguments", "Vocabulary in context", "Summary writing"], 8),
      ch("the-price-of-flowers", "The Price of Flowers (Story)", 7, ["Character sketch", "Theme of sacrifice", "Comprehension"], 9),
      ch("sunrise-on-the-hills", "Sunrise on the Hills (Poem)", 6, ["Imagery and rhyme", "Poetic devices", "Appreciation"], 8),
      ch("speech-writing", "Speech Writing", 5, ["Format and greeting", "Cohesive arguments", "Common topics"], 7),
      ch("notice-and-report", "Notice and Report Writing", 5, ["Formats that fetch marks", "Word limits", "Model answers"], 7),
      ch("grammar-tenses", "Tenses and Modals", 8, ["12 tense forms", "Modal usage", "Error correction"], 11),
      ch("comprehension", "Reading Comprehension", 6, ["Skimming vs scanning", "Inference questions", "Vocabulary"], 9),
      ch("letter-writing", "Letter Writing", 5, ["Formal vs informal", "Body structure", "Common prompts"], 7),
    ],
  },
  {
    slug: "malayalam",
    name: "Malayalam",
    tagline: "Padavali lessons, vyakaranam and upanyasam formats.",
    maxMarks: 80,
    chapters: [
      ch("kavitha-aswadanam", "Kavitha Aswadanam (Poetry)", 7, ["Bhavam and alankaram", "Vritham basics", "Appreciation format"], 9),
      ch("gadya-padanam", "Gadya Padanam (Prose)", 7, ["Aasayam grahiccal", "Character notes", "Summary practice"], 9),
      ch("vyakaranam", "Vyakaranam (Grammar)", 9, ["Sandhi and samasam", "Vibhakti", "Prayogam"], 12),
      ch("upanyasam", "Upanyasam (Essay)", 5, ["Intro-body-conclusion", "Common topics", "Word limit discipline"], 7),
      ch("kathayezhuthu", "Kadha Ezhuthu (Story Writing)", 5, ["Plot structure", "Dialogues", "Moral endings"], 6),
      ch("sangraham", "Sangraham (Precis)", 5, ["One-third rule", "Title selection", "Practice passages"], 6),
      ch("paribhasha", "Paribhasha Padavali (Vocabulary)", 6, ["Paryayapadam", "Vipar beauty", "Idioms and proverbs"], 8),
      ch("vayanasala", "Vayana Sala (Reading Skills)", 5, ["Speed reading", "Comprehension", "Note making"], 7),
    ],
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    tagline: "Python-first: concepts, then code you can actually run.",
    maxMarks: 60,
    chapters: [
      ch("introduction-to-computers", "Introduction to Computers", 6, ["Hardware vs software", "Memory hierarchy", "Number systems"], 9),
      ch("computational-thinking", "Computational Thinking", 7, ["Decomposition", "Algorithms and flowcharts", "Pseudocode"], 10),
      ch("python-basics", "Python Basics", 10, ["Variables and I/O", "Operators", "Conditional statements"], 14),
      ch("loops-in-python", "Loops in Python", 8, ["for vs while", "break and continue", "Pattern programs"], 12),
      ch("strings-and-lists", "Strings and Lists", 9, ["Slicing", "List methods", "Common programs"], 13),
      ch("tuples-and-dictionaries", "Tuples and Dictionaries", 7, ["When to use each", "Dictionary methods", "Nested data"], 10),
      ch("functions-in-python", "Functions in Python", 8, ["Parameters and return", "Recursion basics", "Scope"], 11),
      ch("file-handling", "File Handling", 7, ["Read/write modes", "CSV basics", "Practice programs"], 10),
      ch("sql-basics", "SQL Basics", 8, ["DDL vs DML", "SELECT with WHERE", "Aggregate functions"], 11),
      ch("emerging-trends", "Emerging Trends (AI, IoT, Cloud)", 6, ["Definitions that score", "One-line examples", "Theory questions"], 8),
    ],
  },
  {
    slug: "zoology",
    name: "Zoology",
    tagline: "Diagrams, terms and processes of the animal world.",
    maxMarks: 30,
    chapters: [
      ch("animal-kingdom", "Animal Kingdom", 8, ["Basis of classification", "Major phyla", "Examples that repeat"], 12),
      ch("structural-organisation", "Structural Organisation in Animals", 7, ["Tissues", "Cockroach anatomy", "Frog systems"], 10),
      ch("biomolecules", "Biomolecules", 8, ["Proteins and enzymes", "Nucleic acids", "Enzyme action"], 11),
      ch("cell-cycle", "Cell Cycle and Cell Division", 8, ["Mitosis stages", "Meiosis I vs II", "Significance"], 12),
      ch("digestion-and-absorption", "Digestion and Absorption", 8, ["Enzymes and glands", "Absorption in ileum", "Disorders"], 11),
      ch("breathing-and-exchange", "Breathing and Exchange of Gases", 7, ["Mechanism of breathing", "Oxyhaemoglobin curve", "Regulation"], 10),
      ch("body-fluids-and-circulation", "Body Fluids and Circulation", 9, ["Double circulation", "Cardiac cycle", "ECG basics"], 13),
      ch("neural-control", "Neural Control and Coordination", 8, ["Nerve impulse", "Synapse", "Brain divisions"], 11),
    ],
  },
  {
    slug: "botany",
    name: "Botany",
    tagline: "Plant science with diagrams examiners love.",
    maxMarks: 30,
    chapters: [
      ch("the-living-world", "The Living World", 6, ["Taxonomy ranks", "Binomial nomenclature", "Herbarium basics"], 8),
      ch("plant-kingdom", "Plant Kingdom", 8, ["Algae to angiosperms", "Alternation of generations", "Examples"], 11),
      ch("morphology-of-flowering-plants", "Morphology of Flowering Plants", 9, ["Root, stem, leaf", "Inflorescence", "Floral formula"], 13),
      ch("anatomy-of-flowering-plants", "Anatomy of Flowering Plants", 8, ["Tissue systems", "Dicot vs monocot", "Secondary growth"], 11),
      ch("transport-in-plants", "Transport in Plants", 7, ["Transpiration pull", "Phloem translocation", "Mineral uptake"], 10),
      ch("mineral-nutrition", "Mineral Nutrition", 6, ["Essential elements", "Deficiency symptoms", "Nitrogen cycle"], 8),
      ch("photosynthesis", "Photosynthesis", 9, ["Light vs dark reactions", "C3 vs C4", "Factors affecting rate"], 13),
      ch("plant-growth", "Plant Growth and Development", 7, ["Phases of growth", "Plant hormones", "Vernalisation"], 10),
    ],
  },
];

export function getSubject(slug: string): Subject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

export function getChapter(
  subject: Subject,
  chapterSlug: string,
): Chapter | undefined {
  return subject.chapters.find((c) => c.slug === chapterSlug);
}

// Science batches split on the sixth subject: the CS group takes Computer
// Science instead of the Biology pair (Botany + Zoology).
export const STREAM_SUBJECTS: Record<string, string[]> = {
  cs: ["physics", "chemistry", "mathematics", "english", "malayalam", "computer-science"],
  biology: ["physics", "chemistry", "mathematics", "english", "malayalam", "botany", "zoology"],
};

export const STREAM_LABELS: Record<string, string> = {
  cs: "Computer Science stream",
  biology: "Biology stream",
};

export function subjectsForStream(stream: string): Subject[] {
  const slugs = STREAM_SUBJECTS[stream] ?? STREAM_SUBJECTS.biology;
  return slugs.flatMap((slug) => {
    const s = getSubject(slug);
    return s ? [s] : [];
  });
}

export function totalLessons(subject: Subject): number {
  return subject.chapters.reduce((sum, c) => sum + c.lessons, 0);
}

export function totalQuestions(subject: Subject): number {
  return subject.chapters.reduce((sum, c) => sum + c.questions, 0);
}
