export const EXAM_DATE_ISO = "2026-10-12T09:30:00+05:30";
export const EXAM_LABEL = "12 October 2026 · 9:30 AM IST";

export type Quote = { text: string; author: string };

export const QUOTES: Quote[] = [
  {
    text: "Improvement means one thing: you get a second chance. Use it well.",
    author: "For every student who came back stronger",
  },
  {
    text: "You don't need 10 hours a day. You need 2 focused hours, daily.",
    author: "Small steps beat last-minute rush",
  },
  {
    text: "Previous questions are the syllabus telling you what matters.",
    author: "Study smart, not scattered",
  },
  {
    text: "A low mark last time is data, not destiny.",
    author: "Fix the weak chapters first",
  },
];

export type Partner = {
  name: string;
  href: string;
  kind: "youtube" | "site";
  detail: string;
};

export const PARTNERS: Partner[] = [
  {
    name: "Xylem",
    href: "https://www.youtube.com/@xylemclass11science",
    kind: "youtube",
    detail: "Chapter videos",
  },
  {
    name: "Eduport",
    href: "https://www.youtube.com/@Eduportplusone-2026",
    kind: "youtube",
    detail: "Revision series",
  },
  {
    name: "Exam Winner",
    href: "https://www.youtube.com/@examwinnerplusone",
    kind: "youtube",
    detail: "Exam practice",
  },
  {
    name: "HSSLive",
    href: "https://www.hsslive.in/",
    kind: "site",
    detail: "Notes & textbooks",
  },
  {
    name: "HSSReporter",
    href: "https://www.hssreporter.com/",
    kind: "site",
    detail: "Previous papers",
  },
];
