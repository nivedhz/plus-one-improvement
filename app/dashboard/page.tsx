import type { Metadata } from "next";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Flame,
  Layers,
  Play,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import CountdownTimer from "../components/CountdownTimer";
import Navbar from "../components/Navbar";
import QuoteRotator from "../components/QuoteRotator";
import SubjectIcon from "../components/SubjectIcon";
import { getSession } from "../lib/auth";
import { EXAM_LABEL } from "../lib/site";
import { SUBJECTS, mockProgress } from "../lib/subjects";

export const metadata: Metadata = {
  title: "Dashboard | improve.",
  description: "Your Plus One improvement study dashboard.",
};

// TODO: replace mock progress with real per-user progress from the database.
const MOCK_CONTINUE = [
  { subject: "physics", title: "Motion in a Straight Line", progress: 68 },
  { subject: "chemistry", title: "Structure of Atom", progress: 42 },
  { subject: "mathematics", title: "Sets", progress: 81 },
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
                Motion in a Straight Line
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
              <Link
                href="/subjects/physics/motion-in-a-straight-line"
                className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                <Play size={15} aria-hidden />
                Continue learning
                <ArrowRight
                  size={15}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </section>
          </div>

          <section aria-labelledby="subjects-heading" className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <h2
                id="subjects-heading"
                className="inline-flex items-center gap-2 text-lg font-bold tracking-tight"
              >
                <Layers size={18} aria-hidden />
                Subjects
              </h2>
              <Link
                href="/subjects"
                className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
              >
                View all
                <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {SUBJECTS.map((s) => {
                const progress = mockProgress(s.slug);
                return (
                  <Link
                    key={s.slug}
                    href={`/subjects/${s.slug}`}
                    className="group rounded-2xl border border-slate-200/80 bg-white/80 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/70"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                      <SubjectIcon slug={s.slug} size={18} />
                    </span>
                    <span className="mt-3 block truncate text-sm font-semibold">
                      {s.name}
                    </span>
                    <span className="mt-1 block text-xs tabular-nums text-slate-500 dark:text-neutral-400">
                      {s.chapters.length} chapters · {progress}%
                    </span>
                    <span className="mt-2 block h-1 overflow-hidden rounded-full bg-slate-200/80 dark:bg-neutral-800">
                      <span
                        className="block h-full rounded-full bg-emerald-500 dark:bg-indigo-500"
                        style={{ width: `${progress}%` }}
                      />
                    </span>
                  </Link>
                );
              })}
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
