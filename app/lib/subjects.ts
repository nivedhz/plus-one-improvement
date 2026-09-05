// Central catalog for every science-batch subject and chapter.
// Chapter lists follow the official SCERT / NCERT Plus One syllabus.
// Study content itself (notes, videos, papers) lives in links only —
// never copied or generated into this catalog.

export type Chapter = {
  slug: string;
  title: string;
};

export type Subject = {
  slug: string;
  name: string;
  tagline: string;
  // Maximum marks for this subject in the Plus One exam.
  maxMarks: number;
  chapters: Chapter[];
};

function ch(slug: string, title: string): Chapter {
  return { slug, title };
}

export const SUBJECTS: Subject[] = [
  {
    slug: "physics",
    name: "Physics",
    tagline: "Concepts, derivations and numericals that carry the most marks.",
    maxMarks: 60,
    chapters: [
      ch("units-and-measurements", "Units and Measurements"),
      ch("motion-in-a-straight-line", "Motion in a Straight Line"),
      ch("motion-in-a-plane", "Motion in a Plane"),
      ch("laws-of-motion", "Laws of Motion"),
      ch("work-energy-and-power", "Work, Energy and Power"),
      ch("system-of-particles", "System of Particles and Rotation"),
      ch("gravitation", "Gravitation"),
      ch("mechanical-properties-of-solids", "Mechanical Properties of Solids"),
      ch("mechanical-properties-of-fluids", "Mechanical Properties of Fluids"),
      ch("thermal-properties-of-matter", "Thermal Properties of Matter"),
      ch("thermodynamics", "Thermodynamics"),
      ch("kinetic-theory", "Kinetic Theory"),
      ch("oscillations", "Oscillations"),
      ch("waves", "Waves"),
    ],
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    tagline: "Reactions, mechanisms and named processes in one revision loop.",
    maxMarks: 60,
    chapters: [
      ch("some-basic-concepts", "Some Basic Concepts of Chemistry"),
      ch("structure-of-atom", "Structure of Atom"),
      ch("classification-of-elements", "Classification of Elements"),
      ch("chemical-bonding", "Chemical Bonding and Molecular Structure"),
      ch("thermodynamics", "Thermodynamics"),
      ch("equilibrium", "Equilibrium"),
      ch("redox-reactions", "Redox Reactions"),
      ch("organic-chemistry-basics", "Organic Chemistry: Basic Principles"),
      ch("hydrocarbons", "Hydrocarbons"),
    ],
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    tagline: "Pattern-first practice: formulas, then previous questions.",
    maxMarks: 60,
    chapters: [
      ch("sets", "Sets"),
      ch("relations-and-functions", "Relations and Functions"),
      ch("trigonometric-functions", "Trigonometric Functions"),
      ch("complex-numbers", "Complex Numbers"),
      ch("linear-inequalities", "Linear Inequalities"),
      ch("permutations-combinations", "Permutations and Combinations"),
      ch("binomial-theorem", "Binomial Theorem"),
      ch("sequences-and-series", "Sequences and Series"),
      ch("straight-lines", "Straight Lines"),
      ch("conic-sections", "Conic Sections"),
      ch(
        "introduction-to-three-dimensional-geometry",
        "Introduction to Three Dimensional Geometry",
      ),
      ch("limits-and-derivatives", "Limits and Derivatives"),
      ch("statistics", "Statistics"),
      ch("probability", "Probability"),
    ],
  },
  {
    slug: "english",
    name: "English",
    tagline: "Lessons, language skills and writing formats for full marks.",
    maxMarks: 80,
    chapters: [
      ch("his-first-flight", "His First Flight"),
      ch("i-will-fly", "I Will Fly"),
      ch("quest-for-a-theory-of-everything", "Quest for a Theory of Everything"),
      ch("if", "If (Poem)"),
      ch("and-then-gandhi-came", "And Then Gandhi Came"),
      ch("price-of-flowers", "Price of Flowers"),
      ch("death-the-leveller", "Death the Leveller (Poem)"),
      ch("sunrise-on-the-hills", "Sunrise on the Hills (Poem)"),
      ch("the-trip-of-le-horla", "The Trip of Le Horla"),
      ch("the-sacred-turtles-of-kadavu", "The Sacred Turtles of Kadavu"),
      ch(
        "disasters-and-disaster-management-in-india",
        "Disasters and Disaster Management in India",
      ),
      ch("the-serang-of-ranaganji", "The Serang of Ranaganji"),
      ch("the-wreck-of-the-titanic", "The Wreck of the Titanic (Poem)"),
      ch("gooseberries", "Gooseberries"),
      ch("to-sleep", "To Sleep (Poem)"),
      ch("going-out-for-a-walk", "Going Out for a Walk"),
      ch("the-cyberspace", "The Cyberspace"),
      ch("is-society-dead", "Is Society Dead?"),
      ch("conceptual-fruit", "Conceptual Fruit"),
    ],
  },
  {
    slug: "malayalam",
    name: "Malayalam",
    tagline: "Padavali lessons, vyakaranam and upanyasam formats.",
    maxMarks: 80,
    chapters: [
      ch("sandharshanam", "സന്ദർശനം"),
      ch("ormayude-njarambu", "ഓർമ്മയുടെ ഞരമ്പ്"),
      ch("verukal-nashtappeduthunnavar", "വേരുകൾ നഷ്ടപ്പെടുത്തുന്നവർ"),
      ch("malsyam", "മത്സ്യം"),
      ch("kayalarikathu", "കായലരികത്ത്"),
      ch("sinimayum-samoohavum", "സിനിമയും സമൂഹവും"),
      ch("kalavupoya-cycle", "കളവുപോയ സൈക്കിളും കഴിഞ്ഞുപോയ കാലഘട്ടവും"),
      ch("kaipaadu", "കൈപ്പാട്"),
      ch("kelkkunnundo", "കേൾക്കുന്നുണ്ടോ?"),
      ch("kavyakala-nireekshanangal", "കാവ്യകലയെക്കുറിച്ച് ചില നിരീക്ഷണങ്ങൾ"),
      ch("oonjaalil", "ഊഞ്ഞാലിൽ"),
      ch("anargha-nimisham", "അനർഘനിമിഷം"),
      ch("lathiyum-vediyundayum", "ലാത്തിയും വെടിയുണ്ടയും"),
      ch("peelikannukal", "പീലിക്കണ്ണുകൾ"),
      ch("anukamba", "അനുകമ്പ"),
      ch("mohiyudheenmaala", "മുഹ്‌യിദ്ദീൻമാല"),
      ch("vaasanaavikruthi", "വാസനാവികൃതി"),
      ch("sankramanam", "സംക്രമണം"),
      ch("shasthrakriya", "ശസ്ത്രക്രിയ"),
    ],
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    tagline: "C++-first: concepts, then code you can actually run.",
    maxMarks: 60,
    chapters: [
      ch("discipline-of-computing", "Discipline of Computing"),
      ch(
        "data-representation-and-boolean-algebra",
        "Data Representation and Boolean Algebra",
      ),
      ch("components-of-computer-system", "Components of Computer System"),
      ch(
        "principles-of-programming-and-problem-solving",
        "Principles of Programming and Problem Solving",
      ),
      ch("introduction-to-cpp-programming", "Introduction to C++ Programming"),
      ch("data-types-and-operators", "Data Types and Operators"),
      ch("control-statements", "Control Statements"),
      ch("arrays", "Arrays"),
      ch("string-handling-and-io-functions", "String Handling and I/O Functions"),
      ch("functions", "Functions"),
      ch("computer-networks", "Computer Networks"),
      ch("internet-and-mobile-computing", "Internet and Mobile Computing"),
    ],
  },
  {
    slug: "zoology",
    name: "Zoology",
    tagline: "Diagrams, terms and processes of the animal world.",
    maxMarks: 30,
    chapters: [
      ch("animal-kingdom", "Animal Kingdom"),
      ch("structural-organisation", "Structural Organisation in Animals"),
      ch("cell-the-unit-of-life", "Cell: The Unit of Life"),
      ch("biomolecules", "Biomolecules"),
      ch("cell-cycle", "Cell Cycle and Cell Division"),
      ch("digestion-and-absorption", "Digestion and Absorption"),
      ch("breathing-and-exchange", "Breathing and Exchange of Gases"),
      ch("body-fluids-and-circulation", "Body Fluids and Circulation"),
      ch(
        "excretory-products-and-their-elimination",
        "Excretory Products and Their Elimination",
      ),
      ch("locomotion-and-movement", "Locomotion and Movement"),
      ch("neural-control", "Neural Control and Coordination"),
      ch(
        "chemical-coordination-and-integration",
        "Chemical Coordination and Integration",
      ),
    ],
  },
  {
    slug: "botany",
    name: "Botany",
    tagline: "Plant science with diagrams examiners love.",
    maxMarks: 30,
    chapters: [
      ch("the-living-world", "The Living World"),
      ch("biological-classification", "Biological Classification"),
      ch("plant-kingdom", "Plant Kingdom"),
      ch("morphology-of-flowering-plants", "Morphology of Flowering Plants"),
      ch("anatomy-of-flowering-plants", "Anatomy of Flowering Plants"),
      ch("transport-in-plants", "Transport in Plants"),
      ch("mineral-nutrition", "Mineral Nutrition"),
      ch("photosynthesis", "Photosynthesis"),
      ch("respiration-in-plants", "Respiration in Plants"),
      ch("plant-growth", "Plant Growth and Development"),
    ],
  },
];

export function getSubject(slug: string): Subject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

export function getChapter(subject: Subject, chapterSlug: string): Chapter | undefined {
  return subject.chapters.find((c) => c.slug === chapterSlug);
}

// Science batches split on the sixth subject: the CS group takes Computer
// Science instead of the Biology pair (Botany + Zoology).
export const STREAM_SUBJECTS: Record<string, string[]> = {
  cs: ["physics", "chemistry", "mathematics", "english", "malayalam", "computer-science"],
  biology: [
    "physics",
    "chemistry",
    "mathematics",
    "english",
    "malayalam",
    "botany",
    "zoology",
  ],
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
