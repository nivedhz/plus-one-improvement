// Previous-year question papers per subject, grouped by year — links only.
// Every URL below was verified live (HTTP 200) before being added, and each
// paper page carries full questions with answers. Model papers are grouped
// last within each subject. Chemistry March 2023 is intentionally absent:
// the publisher links to it, but the page itself returns 404.

export type PyqKind = "board" | "say" | "improvement" | "model";

export type PyqPaper = {
  title: string;
  url: string;
  kind: PyqKind;
};

export type PyqYear = {
  year: string;
  papers: PyqPaper[];
};

const H = "https://www.hsslive.guru";

function paper(
  slug: string,
  title: string,
  kind: PyqKind,
): PyqPaper {
  return { title, url: `${H}/${slug}/`, kind };
}

function board(sub: string, label: string): PyqPaper {
  return paper(
    `kerala-plus-one-${sub}-question-paper-${label
      .toLowerCase()
      .replace(/ /g, "-")}`,
    `${label} Board Paper`,
    "board",
  );
}

function old(sub: string, year: number): PyqPaper {
  return paper(
    `plus-one-${sub}-previous-year-question-paper-${year}`,
    `March ${year} Board Paper`,
    "board",
  );
}

function modelSet(sub: string, n: number): PyqPaper {
  return paper(
    `plus-one-${sub}-model-question-paper-${n}`,
    `Model Set ${n}`,
    "model",
  );
}

function boardModel(sub: string, year: number): PyqPaper {
  return paper(
    `kerala-plus-one-${sub}-board-model-paper-${year}`,
    `Board Model Paper ${year}`,
    "model",
  );
}

function models(sub: string, years: number[], sets: number[]): PyqYear {
  return {
    year: "Model papers",
    papers: [
      ...years.map((y) => boardModel(sub, y)),
      ...sets.map((n) => modelSet(sub, n)),
    ],
  };
}

export const SUBJECT_PYQ: Record<string, PyqYear[]> = {
  physics: [
    { year: "2023", papers: [board("physics", "March 2023")] },
    { year: "2022", papers: [board("physics", "June 2022")] },
    {
      year: "2021",
      papers: [
        paper(
          "kerala-plus-one-physics-question-paper-september-2021",
          "September 2021 Board Paper",
          "board",
        ),
      ],
    },
    { year: "2020", papers: [board("physics", "March 2020")] },
    {
      year: "2019",
      papers: [
        board("physics", "March 2019"),
        paper(
          "kerala-plus-one-physics-question-paper-say-2019",
          "SAY 2019",
          "say",
        ),
      ],
    },
    {
      year: "2018",
      papers: [
        old("physics", 2018),
        paper(
          "plus-one-physics-improvement-question-paper-2018",
          "Improvement 2018",
          "improvement",
        ),
      ],
    },
    { year: "2017", papers: [old("physics", 2017)] },
    models("physics", [2023, 2022, 2021], [1, 2, 3, 4]),
  ],
  chemistry: [
    { year: "2022", papers: [board("chemistry", "June 2022")] },
    {
      year: "2021",
      papers: [
        paper(
          "kerala-plus-one-chemistry-question-paper-sep-2021",
          "September 2021 Board Paper",
          "board",
        ),
      ],
    },
    { year: "2020", papers: [board("chemistry", "March 2020")] },
    { year: "2019", papers: [board("chemistry", "March 2019")] },
    {
      year: "2018",
      papers: [
        old("chemistry", 2018),
        paper(
          "plus-one-chemistry-improvement-question-paper-2018",
          "Improvement 2018",
          "improvement",
        ),
      ],
    },
    { year: "2017", papers: [old("chemistry", 2017)] },
    models("chemistry", [2023, 2022, 2021, 2020, 2019], [1, 2, 3, 4]),
  ],
  mathematics: [
    { year: "2023", papers: [board("mathematics", "March 2023")] },
    { year: "2022", papers: [board("mathematics", "June 2022")] },
    {
      year: "2021",
      papers: [
        paper(
          "kerala-plus-one-maths-question-paper-september-2021",
          "September 2021 Board Paper",
          "board",
        ),
      ],
    },
    { year: "2020", papers: [board("mathematics", "March 2020")] },
    { year: "2019", papers: [board("mathematics", "March 2019")] },
    {
      year: "2018",
      papers: [
        old("mathematics", 2018),
        paper(
          "plus-one-maths-improvement-question-paper-2018",
          "Improvement 2018",
          "improvement",
        ),
      ],
    },
    { year: "2017", papers: [old("mathematics", 2017)] },
    models("mathematics", [2023, 2022, 2021, 2018], [1, 2, 3, 4]),
  ],
  botany: [
    { year: "2023", papers: [board("botany", "March 2023")] },
    { year: "2022", papers: [board("botany", "June 2022")] },
    {
      year: "2021",
      papers: [
        paper(
          "kerala-plus-one-botany-question-paper-september-2021",
          "September 2021 Board Paper",
          "board",
        ),
      ],
    },
    { year: "2020", papers: [board("botany", "March 2020")] },
    { year: "2019", papers: [board("botany", "March 2019")] },
    { year: "2018", papers: [old("botany", 2018)] },
    { year: "2017", papers: [old("botany", 2017)] },
    models("botany", [2023, 2022, 2021, 2020], [1, 2, 3, 4, 5]),
  ],
  zoology: [
    { year: "2023", papers: [board("zoology", "March 2023")] },
    { year: "2022", papers: [board("zoology", "June 2022")] },
    {
      year: "2021",
      papers: [
        paper(
          "kerala-plus-one-zoology-question-paper-september-2021",
          "September 2021 Board Paper",
          "board",
        ),
      ],
    },
    { year: "2020", papers: [board("zoology", "March 2020")] },
    { year: "2019", papers: [board("zoology", "March 2019")] },
    { year: "2018", papers: [old("zoology", 2018)] },
    { year: "2017", papers: [old("zoology", 2017)] },
    models("zoology", [2023, 2022, 2021, 2020], [1, 2, 3, 4, 5]),
  ],
  english: [
    { year: "2023", papers: [board("english", "March 2023")] },
    { year: "2022", papers: [board("english", "June 2022")] },
    {
      year: "2021",
      papers: [
        paper(
          "kerala-plus-one-english-question-paper-sept-2021",
          "September 2021 Board Paper",
          "board",
        ),
      ],
    },
    { year: "2020", papers: [board("english", "March 2020")] },
    { year: "2019", papers: [board("english", "March 2019")] },
    { year: "2018", papers: [old("english", 2018)] },
    { year: "2017", papers: [old("english", 2017)] },
    { year: "2016", papers: [old("english", 2016)] },
    { year: "2015", papers: [old("english", 2015)] },
    {
      year: "Model papers",
      papers: [1, 2, 3].map((n) =>
        paper(
          `plus-one-english-model-question-papers-paper-${n}`,
          `Model Set ${n}`,
          "model",
        ),
      ),
    },
  ],
  malayalam: [
    { year: "2023", papers: [board("malayalam", "March 2023")] },
    { year: "2022", papers: [board("malayalam", "June 2022")] },
    {
      year: "2021",
      papers: [
        paper(
          "kerala-plus-one-malayalam-question-paper-sept-2021",
          "September 2021 Board Paper",
          "board",
        ),
      ],
    },
    { year: "2020", papers: [board("malayalam", "March 2020")] },
    { year: "2019", papers: [board("malayalam", "March 2019")] },
    { year: "2018", papers: [board("malayalam", "March 2018")] },
    models("malayalam", [2023, 2022, 2021, 2019], []),
  ],
  "computer-science": [
    { year: "2023", papers: [board("computer-science", "March 2023")] },
    { year: "2022", papers: [board("computer-science", "June 2022")] },
    {
      year: "2021",
      papers: [
        paper(
          "kerala-plus-one-computer-science-question-paper-sept-2021",
          "September 2021 Board Paper",
          "board",
        ),
      ],
    },
    { year: "2020", papers: [board("computer-science", "March 2020")] },
    {
      year: "2019",
      papers: [
        board("computer-science", "March 2019"),
        paper(
          "kerala-plus-one-computer-science-question-paper-say-2019",
          "SAY 2019",
          "say",
        ),
      ],
    },
    { year: "2018", papers: [old("computer-science", 2018)] },
    { year: "2017", papers: [old("computer-science", 2017)] },
    models("computer-science", [2023, 2022, 2021, 2020], [1, 2, 3]),
  ],
};

export function subjectPyq(subject: string): PyqYear[] {
  return SUBJECT_PYQ[subject] ?? [];
}

export function subjectPyqCount(subject: string): number {
  return subjectPyq(subject).reduce((sum, g) => sum + g.papers.length, 0);
}
