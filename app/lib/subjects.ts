// Central catalog for every science-batch subject and chapter.
// NOTE: chapter names, lesson counts and key points are PLACEHOLDER mock
// data so routes and UI can be built now. Replace with the official SCERT /
// NCERT Plus One lists before any real launch.

export type Chapter = {
  slug: string;
  title: string;
  keyPoints: string[];
};

export type Subject = {
  slug: string;
  name: string;
  tagline: string;
  // Maximum marks for this subject in the Plus One exam.
  maxMarks: number;
  chapters: Chapter[];
};

function ch(slug: string, title: string, keyPoints: string[]): Chapter {
  return { slug, title, keyPoints };
}

export const SUBJECTS: Subject[] = [
  {
    slug: "physics",
    name: "Physics",
    tagline: "Concepts, derivations and numericals that carry the most marks.",
    maxMarks: 60,
    chapters: [
      ch("units-and-measurements", "Units and Measurements", ["SI units and dimensions", "Significant figures", "Error analysis"]),
      ch("motion-in-a-straight-line", "Motion in a Straight Line", ["Distance vs displacement", "Velocity-time graphs", "Equations of motion"]),
      ch("motion-in-a-plane", "Motion in a Plane", ["Vectors and resolution", "Projectile motion", "Uniform circular motion"]),
      ch("laws-of-motion", "Laws of Motion", ["Newton's three laws", "Friction", "Circular motion dynamics"]),
      ch("work-energy-and-power", "Work, Energy and Power", ["Work-energy theorem", "Conservation of energy", "Collisions"]),
      ch("system-of-particles", "System of Particles and Rotation", ["Centre of mass", "Torque and angular momentum", "Moment of inertia"]),
      ch("gravitation", "Gravitation", ["Kepler's laws", "g variation with height", "Escape velocity"]),
      ch("mechanical-properties-of-solids", "Mechanical Properties of Solids", ["Stress-strain curve", "Hooke's law", "Modulus of elasticity"]),
      ch("mechanical-properties-of-fluids", "Mechanical Properties of Fluids", ["Bernoulli's principle", "Viscosity", "Surface tension"]),
      ch("thermal-properties-of-matter", "Thermal Properties of Matter", ["Heat transfer modes", "Newton's law of cooling", "Thermal expansion"]),
      ch("thermodynamics", "Thermodynamics", ["Laws of thermodynamics", "Carnot engine", "Entropy basics"]),
      ch("kinetic-theory", "Kinetic Theory", ["Ideal gas laws", "Temperature interpretation", "Degrees of freedom"]),
      ch("oscillations", "Oscillations", ["SHM equations", "Pendulums", "Damped oscillations"]),
      ch("waves", "Waves", ["Wave speed", "Superposition", "Standing waves"]),
    ],
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    tagline: "Reactions, mechanisms and named processes in one revision loop.",
    maxMarks: 60,
    chapters: [
      ch("some-basic-concepts", "Some Basic Concepts of Chemistry", ["Mole concept", "Stoichiometry", "Limiting reagent"]),
      ch("structure-of-atom", "Structure of Atom", ["Quantum numbers", "Electronic configuration", "Bohr model limits"]),
      ch("classification-of-elements", "Classification of Elements", ["Periodic trends", "Ionisation enthalpy", "Electron gain enthalpy"]),
      ch("chemical-bonding", "Chemical Bonding and Molecular Structure", ["VSEPR shapes", "Hybridisation", "Molecular orbital basics"]),
      ch("thermodynamics", "Thermodynamics", ["Enthalpy and entropy", "Gibbs energy", "Hess's law"]),
      ch("equilibrium", "Equilibrium", ["Law of mass action", "Le Chatelier's principle", "pH and buffers"]),
      ch("redox-reactions", "Redox Reactions", ["Oxidation numbers", "Balancing redox equations", "Electrochemical series"]),
      ch("organic-chemistry-basics", "Organic Chemistry: Basic Principles", ["GOC and resonance", "Isomerism", "Reaction intermediates"]),
      ch("hydrocarbons", "Hydrocarbons", ["Alkanes, alkenes, alkynes", "Markovnikov rule", "Aromaticity"]),
    ],
  },
  {
    slug: "mathematics",
    name: "Mathematics",
    tagline: "Pattern-first practice: formulas, then previous questions.",
    maxMarks: 60,
    chapters: [
      ch("sets", "Sets", ["Types of sets", "Venn diagrams", "De Morgan's laws"]),
      ch("relations-and-functions", "Relations and Functions", ["Domain and range", "Types of functions", "Composition"]),
      ch("trigonometric-functions", "Trigonometric Functions", ["Standard identities", "Sum and difference formulas", "General solutions"]),
      ch("complex-numbers", "Complex Numbers", ["Modulus and argument", "De Moivre's theorem", "Cube roots of unity"]),
      ch("linear-inequalities", "Linear Inequalities", ["Graphical solutions", "System of inequalities", "Word problems"]),
      ch("permutations-combinations", "Permutations and Combinations", ["Counting principles", "nPr vs nCr", "Circular arrangements"]),
      ch("binomial-theorem", "Binomial Theorem", ["General and middle terms", "Binomial coefficients", "Applications"]),
      ch("sequences-and-series", "Sequences and Series", ["AP and GP formulas", "Sum to n terms", "Special series"]),
      ch("straight-lines", "Straight Lines", ["Slope forms", "Distance formulas", "Family of lines"]),
      ch("conic-sections", "Conic Sections", ["Circle, parabola, ellipse", "Standard equations", "Tangents"]),
      ch("introduction-to-three-dimensional-geometry", "Introduction to Three Dimensional Geometry", ["Coordinate axes and planes", "Distance formula in 3D", "Section formula"]),
      ch("limits-and-derivatives", "Limits and Derivatives", ["Standard limits", "First principles", "Rules of differentiation"]),
      ch("statistics", "Statistics", ["Mean, median, mode", "Variance and standard deviation", "Grouped data"]),
      ch("probability", "Probability", ["Classical probability", "Addition theorems", "Conditional basics"]),
    ],
  },
  {
    slug: "english",
    name: "English",
    tagline: "Lessons, language skills and writing formats for full marks.",
    maxMarks: 80,
    chapters: [
      ch("his-first-flight", "His First Flight", ["Theme of courage", "Character sketch", "Comprehension"]),
      ch("i-will-fly", "I Will Fly", ["Dreams and determination", "Key speeches", "Summary writing"]),
      ch("quest-for-a-theory-of-everything", "Quest for a Theory of Everything", ["Science and curiosity", "Key arguments", "Vocabulary in context"]),
      ch("if", "If (Poem)", ["Virtues listed", "Poetic devices", "Appreciation"]),
      ch("and-then-gandhi-came", "And Then Gandhi Came", ["Historical context", "Main events", "Character notes"]),
      ch("price-of-flowers", "Price of Flowers", ["Character sketch", "Theme of sacrifice", "Comprehension"]),
      ch("death-the-leveller", "Death the Leveller (Poem)", ["Theme of mortality", "Imagery", "Appreciation"]),
      ch("sunrise-on-the-hills", "Sunrise on the Hills (Poem)", ["Nature imagery", "Rhyme scheme", "Appreciation"]),
      ch("the-trip-of-le-horla", "The Trip of Le Horla", ["Plot and narrator", "Supernatural elements", "Summary"]),
      ch("the-sacred-turtles-of-kadavu", "The Sacred Turtles of Kadavu", ["Setting and culture", "Key events", "Comprehension"]),
      ch("disasters-and-disaster-management-in-india", "Disasters and Disaster Management in India", ["Types of disasters", "Management phases", "Case points"]),
      ch("the-serang-of-ranaganji", "The Serang of Ranaganji", ["Character sketch", "Courage at sea", "Summary"]),
      ch("the-wreck-of-the-titanic", "The Wreck of the Titanic (Poem)", ["Narrative flow", "Poetic devices", "Appreciation"]),
      ch("gooseberries", "Gooseberries", ["Theme of happiness", "Character views", "Comprehension"]),
      ch("to-sleep", "To Sleep (Poem)", ["Theme of rest", "Imagery", "Appreciation"]),
      ch("going-out-for-a-walk", "Going Out for a Walk", ["Observations", "Descriptive style", "Summary"]),
      ch("the-cyberspace", "The Cyberspace", ["Digital world pros and cons", "Key terms", "Comprehension"]),
      ch("is-society-dead", "Is Society Dead?", ["Central question", "Arguments", "Opinion writing"]),
      ch("conceptual-fruit", "Conceptual Fruit", ["Core concept", "Examples", "Summary"]),
    ],
  },
  {
    slug: "malayalam",
    name: "Malayalam",
    tagline: "Padavali lessons, vyakaranam and upanyasam formats.",
    maxMarks: 80,
    chapters: [
      ch("sandharshanam", "സന്ദർശനം", ["കഥാപാത്രങ്ങൾ", "ആശയം", "സംഗ്രഹം"]),
      ch("ormayude-njarambu", "ഓർമ്മയുടെ ഞരമ്പ്", ["ഓർമ്മകൾ", "ആശയം", "സംഗ്രഹം"]),
      ch("verukal-nashtappeduthunnavar", "വേരുകൾ നഷ്ടപ്പെടുത്തുന്നവർ", ["ആശയം", "കഥാപാത്രങ്ങൾ", "ചോദ്യങ്ങൾ"]),
      ch("malsyam", "മത്സ്യം", ["കഥാപാത്രങ്ങൾ", "ആശയം", "സംഗ്രഹം"]),
      ch("kayalarikathu", "കായലരികത്ത്", ["ഭാവം", "അലങ്കാരം", "ആസ്വാദനം"]),
      ch("sinimayum-samoohavum", "സിനിമയും സമൂഹവും", ["ആശയം", "വാദങ്ങൾ", "സംഗ്രഹം"]),
      ch("kalavupoya-cycle", "കളവുപോയ സൈക്കിളും കഴിഞ്ഞുപോയ കാലഘട്ടവും", ["കഥാപാത്രങ്ങൾ", "ആശയം", "സംഗ്രഹം"]),
      ch("kaipaadu", "കൈപ്പാട്", ["ആശയം", "പ്രധാന ഭാഗങ്ങൾ", "ചോദ്യങ്ങൾ"]),
      ch("kelkkunnundo", "കേൾക്കുന്നുണ്ടോ?", ["ആശയം", "സംഗ്രഹം", "ചോദ്യങ്ങൾ"]),
      ch("kavyakala-nireekshanangal", "കാവ്യകലയെക്കുറിച്ച് ചില നിരീക്ഷണങ്ങൾ", ["കാവ്യഭാവം", "അലങ്കാരം", "ആസ്വാദനം"]),
      ch("oonjaalil", "ഊഞ്ഞാലിൽ", ["ഭാവം", "അലങ്കാരം", "പരീക്ഷാ ചോദ്യങ്ങൾ"]),
      ch("anargha-nimisham", "അനർഘനിമിഷം", ["ആശയം", "കഥാപാത്രങ്ങൾ", "സംഗ്രഹം"]),
      ch("lathiyum-vediyundayum", "ലാത്തിയും വെടിയുണ്ടയും", ["കഥാപാത്രങ്ങൾ", "ആശയം", "സംഗ്രഹം"]),
      ch("peelikannukal", "പീലിക്കണ്ണുകൾ", ["ആശയം", "പ്രധാന ഭാഗങ്ങൾ", "ചോദ്യങ്ങൾ"]),
      ch("anukamba", "അനുകമ്പ", ["ആശയം", "കഥാപാത്രങ്ങൾ", "സംഗ്രഹം"]),
      ch("mohiyudheenmaala", "മുഹ്‌യിദ്ദീൻമാല", ["ഭക്തിഭാവം", "ആശയം", "ആസ്വാദനം"]),
      ch("vaasanaavikruthi", "വാസനാവികൃതി", ["ആശയം", "കഥാപാത്രങ്ങൾ", "ചോദ്യങ്ങൾ"]),
      ch("sankramanam", "സംക്രമണം", ["ആശയം", "പ്രധാന ഭാഗങ്ങൾ", "സംഗ്രഹം"]),
      ch("shasthrakriya", "ശസ്ത്രക്രിയ", ["കഥാപാത്രങ്ങൾ", "ആശയം", "സംഗ്രഹം"]),
    ],
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    tagline: "C++-first: concepts, then code you can actually run.",
    maxMarks: 60,
    chapters: [
      ch("discipline-of-computing", "Discipline of Computing", ["Computing disciplines", "Career paths", "Ethics basics"]),
      ch("data-representation-and-boolean-algebra", "Data Representation and Boolean Algebra", ["Number systems", "Boolean algebra", "Logic gates"]),
      ch("components-of-computer-system", "Components of Computer System", ["CPU and memory", "I/O devices", "System software"]),
      ch("principles-of-programming-and-problem-solving", "Principles of Programming and Problem Solving", ["Algorithms", "Flowcharts", "Problem solving steps"]),
      ch("introduction-to-cpp-programming", "Introduction to C++ Programming", ["Program structure", "First program", "Compilation"]),
      ch("data-types-and-operators", "Data Types and Operators", ["Fundamental types", "Operators", "Type conversion"]),
      ch("control-statements", "Control Statements", ["if-else", "Loops", "switch"]),
      ch("arrays", "Arrays", ["Declaration", "Traversal", "Searching basics"]),
      ch("string-handling-and-io-functions", "String Handling and I/O Functions", ["String functions", "I/O functions", "Common programs"]),
      ch("functions", "Functions", ["Declaration and definition", "Parameters", "Scope"]),
      ch("computer-networks", "Computer Networks", ["Types of networks", "Topologies", "Network devices"]),
      ch("internet-and-mobile-computing", "Internet and Mobile Computing", ["Internet services", "Mobile computing", "Security basics"]),
    ],
  },
  {
    slug: "zoology",
    name: "Zoology",
    tagline: "Diagrams, terms and processes of the animal world.",
    maxMarks: 30,
    chapters: [
      ch("animal-kingdom", "Animal Kingdom", ["Basis of classification", "Major phyla", "Examples that repeat"]),
      ch("structural-organisation", "Structural Organisation in Animals", ["Tissues", "Cockroach anatomy", "Frog systems"]),
      ch("biomolecules", "Biomolecules", ["Proteins and enzymes", "Nucleic acids", "Enzyme action"]),
      ch("cell-cycle", "Cell Cycle and Cell Division", ["Mitosis stages", "Meiosis I vs II", "Significance"]),
      ch("digestion-and-absorption", "Digestion and Absorption", ["Enzymes and glands", "Absorption in ileum", "Disorders"]),
      ch("breathing-and-exchange", "Breathing and Exchange of Gases", ["Mechanism of breathing", "Oxyhaemoglobin curve", "Regulation"]),
      ch("body-fluids-and-circulation", "Body Fluids and Circulation", ["Double circulation", "Cardiac cycle", "ECG basics"]),
      ch("neural-control", "Neural Control and Coordination", ["Nerve impulse", "Synapse", "Brain divisions"]),
    ],
  },
  {
    slug: "botany",
    name: "Botany",
    tagline: "Plant science with diagrams examiners love.",
    maxMarks: 30,
    chapters: [
      ch("the-living-world", "The Living World", ["Taxonomy ranks", "Binomial nomenclature", "Herbarium basics"]),
      ch("plant-kingdom", "Plant Kingdom", ["Algae to angiosperms", "Alternation of generations", "Examples"]),
      ch("morphology-of-flowering-plants", "Morphology of Flowering Plants", ["Root, stem, leaf", "Inflorescence", "Floral formula"]),
      ch("anatomy-of-flowering-plants", "Anatomy of Flowering Plants", ["Tissue systems", "Dicot vs monocot", "Secondary growth"]),
      ch("transport-in-plants", "Transport in Plants", ["Transpiration pull", "Phloem translocation", "Mineral uptake"]),
      ch("mineral-nutrition", "Mineral Nutrition", ["Essential elements", "Deficiency symptoms", "Nitrogen cycle"]),
      ch("photosynthesis", "Photosynthesis", ["Light vs dark reactions", "C3 vs C4", "Factors affecting rate"]),
      ch("plant-growth", "Plant Growth and Development", ["Phases of growth", "Plant hormones", "Vernalisation"]),
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
