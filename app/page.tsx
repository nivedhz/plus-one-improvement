import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CalendarDays,
  FileText,
  Globe,
  KeyRound,
  Layers,
  Play,
  Sparkles,
  TvMinimalPlay,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Item, Reveal, Stagger } from "./components/animate";
import CountdownTimer from "./components/CountdownTimer";
import Navbar from "./components/Navbar";
import QuoteRotator from "./components/QuoteRotator";
import { getSession } from "./lib/auth";
import { EXAM_LABEL, PARTNERS, mailto } from "./lib/site";

const FEATURES = [
  {
    icon: Layers,
    title: "Everything grouped",
    text: "Videos, summaries, textbooks and previous questions — organised by subject and chapter.",
  },
  {
    icon: KeyRound,
    title: "Weakest first",
    text: "Start with what actually carries marks, then go deeper only where you need to.",
  },
  {
    icon: Bot,
    title: "Doubts with context",
    text: "Ask within the chapter you are studying, so explanations stay relevant and precise.",
  },
];

const STEPS = [
  {
    icon: Layers,
    title: "Pick your subject",
    text: "Choose Physics, Chemistry, Maths or Biology and see chapters at a glance.",
  },
  {
    icon: Play,
    title: "Learn the chapter",
    text: "Open the chapter, work through trusted videos and notes, then mark it complete.",
  },
  {
    icon: FileText,
    title: "Practice old questions",
    text: "Solve previous-year questions from that exact chapter and build confidence.",
  },
];

export default async function Home() {
  // Marketing page is for visitors only — members go to their dashboard.
  if (await getSession()) redirect("/dashboard");

  return (
    <div id="top" className="relative min-h-screen overflow-clip">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent dark:via-indigo-400/50"
      />

      <div className="relative">
        <Navbar />

        <main className="mx-auto max-w-6xl px-5">
          {/* Hero */}
          <section className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Stagger>
              <Item>
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <Sparkles size={14} aria-hidden />
                  Kerala Plus One Improvement · October 2026
                </p>
              </Item>
              <Item>
                <h1 className="mt-5 text-4xl font-bold leading-[1.04] tracking-tight sm:text-6xl">
                  Make this comeback
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-400 text-transparent">
                    <i>amazing.</i>
                  </span>
                </h1>
              </Item>
              <Item>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                  Last time didn&apos;t go your way — fine. improve. groups all your
                  notes, trusted videos and previous questions in one space, so every day
                  from now is a step in the comeback.
                </p>
              </Item>
              <Item>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/auth/sign-up"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 dark:bg-indigo-600 dark:shadow-indigo-600/25 dark:hover:bg-indigo-500"
                  >
                    Start now
                    <ArrowRight
                      size={16}
                      aria-hidden
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </a>
                  <a
                    href="#how"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300/80 bg-white px-7 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-slate-100 dark:hover:border-slate-600"
                  >
                    See how it works
                  </a>
                </div>
              </Item>
              <Item>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Layers size={14} aria-hidden /> Chapter-wise organisation
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <KeyRound size={14} aria-hidden /> Marks-first revision
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Bot size={14} aria-hidden /> Chapter-aware help
                  </span>
                </div>
              </Item>
            </Stagger>

            {/* Countdown + motivation */}
            <Reveal
              y={26}
              delay={0.15}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <CalendarDays size={14} aria-hidden />
                Exam countdown
              </p>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                {EXAM_LABEL}
              </p>
              <CountdownTimer />
              <QuoteRotator />
            </Reveal>
          </section>

          {/* Why */}
          <section id="why" aria-labelledby="why-heading" className="scroll-mt-24 py-12">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-indigo-400">
                Why improve.
              </p>
              <h2
                id="why-heading"
                className="mt-2 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Built for one job: do better in October.
              </h2>
            </Reveal>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.07} className="h-full">
                  <article className="group h-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                      <f.icon size={19} aria-hidden />
                    </span>
                    <h3 className="mt-4 font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {f.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Trusted partners */}
          <section
            id="resources"
            aria-labelledby="resources-heading"
            className="scroll-mt-24 border-t border-slate-200/70 py-12 dark:border-neutral-800/70"
          >
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-indigo-400">
                Trusted sources
              </p>
              <h2
                id="resources-heading"
                className="mt-2 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Learn from creators you already trust.
              </h2>
              <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
                We organise and link to the originals. Every view and credit goes to them
                — you save hours of searching.
              </p>
            </Reveal>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PARTNERS.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.05} className="h-full">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 transition hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-indigo-400/30"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900/[0.04] text-slate-700 dark:bg-white/[0.06] dark:text-slate-200">
                      {p.kind === "youtube" ? (
                        <TvMinimalPlay size={19} aria-hidden />
                      ) : (
                        <Globe size={18} aria-hidden />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 font-semibold">
                        {p.name}
                        <ArrowUpRight
                          size={15}
                          aria-hidden
                          className="text-slate-400 transition group-hover:translate-x-px group-hover:text-emerald-600 dark:group-hover:text-indigo-400"
                        />
                      </span>
                      <span className="block truncate text-sm text-slate-500 dark:text-slate-400">
                        {p.detail}
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
              <Reveal delay={0.1}>
                <div className="flex h-full items-center rounded-2xl border border-dashed border-slate-300 bg-transparent p-4 text-sm text-slate-500 dark:border-neutral-700 dark:text-slate-400">
                  More chapter links are added as the syllabus grows.
                </div>
              </Reveal>
            </div>
          </section>

          {/* How */}
          <section
            id="how"
            aria-labelledby="how-heading"
            className="scroll-mt-24 border-t border-slate-200/70 py-12 dark:border-neutral-800/70"
          >
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-indigo-400">
                Study loop
              </p>
              <h2
                id="how-heading"
                className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Three steps, every day.
              </h2>
            </Reveal>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.07} className="h-full">
                  <article className="h-full rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-white text-sm font-bold dark:bg-white dark:text-black">
                        {i + 1}
                      </span>
                      <s.icon
                        size={18}
                        aria-hidden
                        className="text-slate-400 dark:text-slate-500"
                      />
                    </div>
                    <h3 className="mt-4 font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {s.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section
            id="start"
            aria-labelledby="start-heading"
            className="scroll-mt-24 pb-14"
          >
            <Reveal
              y={28}
              scale={0.98}
              className="relative overflow-hidden rounded-2xl bg-[#111] px-6 py-12 text-center text-white ring-1 ring-black/5 sm:px-12 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#111] dark:ring-white/10"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(34rem_16rem_at_50%_-20%,rgb(16_185_129/0.35),transparent_70%),radial-gradient(28rem_14rem_at_85%_120%,rgb(56_189_248/0.25),transparent_70%)]"
              />
              <div className="relative">
                <h2
                  id="start-heading"
                  className="mx-auto max-w-xl text-3xl font-bold tracking-tight"
                >
                  Your October self will thank you.
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
                  Pick one chapter today. Watch one trusted video. Solve 5 previous
                  questions. Repeat tomorrow.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href="/auth/login"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                  >
                    Log in to start
                    <ArrowRight size={16} aria-hidden />
                  </a>
                  <a
                    href="#resources"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                  >
                    Browse trusted sources
                  </a>
                </div>
              </div>
            </Reveal>
          </section>
        </main>

        <footer className="border-t border-slate-200/70 dark:border-neutral-800/70">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
            <p>
              improve. — a student-built companion for Kerala Plus One improvement exams.
            </p>
            <p>All learning resources belong to their original creators.</p>
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              <a href="/privacy" className="hover:underline">
                Privacy
              </a>
              <a href="/terms" className="hover:underline">
                Terms
              </a>
              <a
                href={mailto("improve. suggestion", "Your suggestion:")}
                className="hover:underline"
              >
                Suggestions
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
