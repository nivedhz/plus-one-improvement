export const EXAM_DATE_ISO = "2026-10-12T09:30:00+05:30";
export const EXAM_LABEL = "12 October 2026 · 9:30 AM IST";

export type Quote = { text: string; author: string };

export const QUOTES: Quote[] = [
  {
    text: "Comebacks are built one chapter at a time. Start today's.",
    author: "Your comeback begins now",
  },
  {
    text: "Last year's marks wrote the first draft. October is your rewrite.",
    author: "Second chances favor the prepared",
  },
  {
    text: "Nobody remembers the stumble — only the comeback. Make yours loud.",
    author: "Write the ending yourself",
  },
  {
    text: "You already know exactly where it hurts. That's where comebacks begin.",
    author: "Turn weak chapters into weapons",
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
