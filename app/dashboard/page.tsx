import type { Metadata } from "next";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Flame,
  Layers,
  Play,
} from "lucide-react";
import { redirect } from "next/navigation";
import CountdownTimer from "../components/CountdownTimer";
import Navbar from "../components/Navbar";
import QuoteRotator from "../components/QuoteRotator";
import { getSession } from "../lib/auth";
import { EXAM_LABEL } from "../lib/site";

export const metadata: Metadata = {
  title: "Dashboard | improve.",
  description: "Your Plus One improvement study dashboard.",
};

// TODO: replace every MOCK block below with real progress from the database.
const MOCK_SUBJECTS = [
  { name: "Physics", chapters: "12 / 18 chapters", progress: 67 },
  { name: "Chemistry", chapters: "9 / 16 chapters", progress: 56 },
  { name: "Mathematics", chapters: "7 / 14 chapters", progress: 50 },
  { name: "Biology", chapters: "5 / 12 chapters", progress: 42 },
];

const MOCK_CONTINUE = [
  { subject: "Physics", title: "Motion in a straight line", progress: 68 },
  { subject: "Chemistry", title: "Structure of atom", progress: 42 },
  { subject: "Mathematics", title: "Sets and functions", progress: 81 },
];

export default async function DashboardPage() {
  const session = await getSession();
  // Members-only route — visitors go through login first.
  if (!session) redirect("/auth/login");

  const firstName = session.name.split(" ")[0];

  return (
    <div id="top" className="relative min-h-screen overflow-clip">
      <div aria-hidden className="backdrop-mesh absolute inset-0" />
      <div aria-hidden className="backdrop-dots absolute inset-0" />

      <div className="relative">
        <Navbar />

        <main className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-indigo-400">
                Your dashboard
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back, {firstName}.
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-neutral-300">
                Small steps today. A stronger result in October.
              </p>
            </div>
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70">
              <Flame size={15} aria-hidden className="text-orange-500" />
              4-day streak
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <section
              aria-labelledby="countdown-heading"
              className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70"
            >
              <h2
                id="countdown-heading"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-neutral-400"
              >
                <CalendarDays size={14} aria-hidden />
                Exam countdown
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-neutral-300">
                {EXAM_LABEL}
              </p>
              <CountdownTimer />
              <QuoteRotator />
            </section>

            <section
              aria-labelledby="focus-heading"
              className="flex flex-col rounded-3xl bg-[#111] p-6 text-white ring-1 ring-black/5 sm:p-7 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#111] dark:ring-white/10"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Today&apos;s focus
              </p>
              <h2 id="focus-heading" className="mt-3 text-2xl font-bold tracking-tight">
                Motion in a straight line
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Physics · Chapter 02 · 25 min
              </p>
              <div
                className="mt-5 h-2 overflow-hidden rounded-full bg-white/15"
                role="progressbar"
                aria-valuenow={68}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Chapter progress"
              >
                <div
                  className="h-full rounded-full bg-emerald-400 dark:bg-indigo-400"
                  style={{ width: "68%" }}
                />
              </div>
              <p className="mt-2 text-xs text-white/60">68% complete</p>
              <a
                href="#continue"
                className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                <Play size={15} aria-hidden />
                Continue learning
                <ArrowRight
                  size={15}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </section>
          </div>

          <section aria-labelledby="subjects-heading" className="mt-10">
            <h2
              id="subjects-heading"
              className="inline-flex items-center gap-2 text-lg font-bold tracking-tight"
            >
              <Layers size={18} aria-hidden />
              Subjects
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {MOCK_SUBJECTS.map((s) => (
                <article
                  key={s.name}
                  className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold">{s.name}</h3>
                    <span className="text-sm font-bold tabular-nums">
                      {s.progress}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                    {s.chapters}
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-neutral-800">
                    <div
                      className="h-full rounded-full bg-emerald-500 dark:bg-indigo-500"
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <section
              id="continue"
              aria-labelledby="continue-heading"
              className="scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70"
            >
              <h2 id="continue-heading" className="text-lg font-bold tracking-tight">
                Pick up where you left off
              </h2>
              <ul className="mt-4 space-y-3">
                {MOCK_CONTINUE.map((c) => (
                  <li key={c.title}>
                    <a
                      href="#continue"
                      className="group flex items-center gap-3 rounded-2xl border border-transparent p-2 transition hover:border-slate-200 hover:bg-slate-50 dark:hover:border-neutral-800 dark:hover:bg-neutral-800/50"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-slate-500 dark:text-neutral-400">
                          {c.subject}
                        </span>
                        <span className="block truncate text-sm font-semibold">
                          {c.title}
                        </span>
                      </span>
                      <span className="text-xs font-bold tabular-nums text-slate-500 dark:text-neutral-400">
                        {c.progress}%
                      </span>
                      <ArrowRight
                        size={16}
                        aria-hidden
                        className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500 dark:group-hover:text-neutral-300"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="tutor-heading"
              className="flex flex-col rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                <Bot size={19} aria-hidden />
              </span>
              <h2 id="tutor-heading" className="mt-4 text-lg font-bold tracking-tight">
                Chapter AI tutor
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-neutral-300">
                Ask doubts within the chapter you are studying and get
                explanations grounded in that chapter&apos;s content. Wiring up
                next.
              </p>
              <span className="mt-6 inline-flex w-fit cursor-not-allowed rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-400 dark:border-neutral-800 dark:text-neutral-500"
              >
                Coming soon
              </span>
            </section>
          </div>

          <footer className="mt-12 border-t border-slate-200/70 py-6 text-xs text-slate-500 dark:border-neutral-800/70 dark:text-neutral-400">
            <p>
              improve. — your study companion for Kerala Plus One improvement
              exams. All learning resources belong to their original creators.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
