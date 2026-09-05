import type { Metadata } from "next";
import {
  ArrowRight,
  Bot,
  Calculator,
  CalendarDays,
  Check,
  Flame,
  Layers,
  Play,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CountUp, ProgressBar, Reveal } from "../components/animate";
import CountdownTimer from "../components/CountdownTimer";
import Navbar from "../components/Navbar";
import QuoteRotator from "../components/QuoteRotator";
import SubjectIcon from "../components/SubjectIcon";
import StudyCalendar from "../components/StudyCalendar";
import { getSession } from "../lib/auth";
import { computePriorities, getUserMarks } from "../lib/marks";
import { buildSchedule } from "../lib/schedule";
import { completedChapters, getUserProgressMap, studyStreakFor } from "../lib/progress";
import { EXAM_LABEL } from "../lib/site";
import { STREAM_LABELS, subjectsForStream } from "../lib/subjects";
import { getUserStream } from "../lib/users";
import { MOTIVATION_VIDEOS, recentVideos } from "../lib/videos";
import VideoFacade from "../components/VideoFacade";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Plus One improvement study dashboard.",
};

export default async function DashboardPage() {
  const session = await getSession();
  // Members-only route — visitors go through login first.
  if (!session) redirect("/auth/login");

  const firstName = session.name.split(" ")[0];
  const [progressMap, streak, done, stream, savedMarks] = await Promise.all([
    getUserProgressMap(session.id),
    studyStreakFor(session.id),
    completedChapters(session.id, 3),
    getUserStream(session.id),
    getUserMarks(session.id),
  ]);
  const schedule = buildSchedule(
    subjectsForStream(stream).map((s) => {
      const p = computePriorities(savedMarks).find((x) => x.subjectSlug === s.slug);
      return { slug: s.slug, name: s.name, level: p ? p.level : null };
    }),
  );
  const visibleSubjects = subjectsForStream(stream);
  const fresh = recentVideos(6);
  const subjectDone = (slug: string) => {
    const s = visibleSubjects.find((x) => x.slug === slug);
    if (!s || s.chapters.length === 0) return { done: 0, total: 0 };
    const done = s.chapters.filter(
      (c) => (progressMap[`${slug}:${c.slug}`] ?? 0) >= 100,
    ).length;
    return { done, total: s.chapters.length };
  };
  // First unfinished chapter in stream order — the suggested next step.
  const nextUp = (() => {
    for (const s of visibleSubjects) {
      for (const c of s.chapters) {
        if ((progressMap[`${s.slug}:${c.slug}`] ?? 0) < 100) {
          return {
            subjectSlug: s.slug,
            subjectName: s.name,
            chapterSlug: c.slug,
            title: c.title,
          };
        }
      }
    }
    return null;
  })();

  return (
    <div id="top" className="relative min-h-screen overflow-clip">
      <div aria-hidden className="backdrop-mesh absolute inset-0" />
      <div aria-hidden className="backdrop-dots absolute inset-0" />

      <div className="relative">
        <Navbar />

        <main className="mx-auto max-w-6xl px-5 py-10">
          <Reveal>
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
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <StudyCalendar schedule={schedule} />
          </Reveal>

          <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="h-full">
              <section
                aria-labelledby="countdown-heading"
                className="h-full rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2
                    id="countdown-heading"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-neutral-400"
                  >
                    <CalendarDays size={14} aria-hidden />
                    Exam countdown
                  </h2>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium dark:border-neutral-800 dark:bg-neutral-900">
                    <Flame size={13} aria-hidden className="text-orange-500" />
                    {streak > 0 ? (
                      <>
                        <CountUp value={streak} className="tabular-nums" />
                        -day streak
                      </>
                    ) : (
                      "Start your streak"
                    )}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-neutral-300">
                  {EXAM_LABEL}
                </p>
                <CountdownTimer />
                <QuoteRotator />
              </section>
            </Reveal>

            <Reveal delay={0.08} className="h-full">
              <section
                aria-labelledby="focus-heading"
                className="flex h-full flex-col rounded-3xl bg-[#111] p-6 text-white ring-1 ring-black/5 sm:p-7 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#111] dark:ring-white/10"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Today&apos;s focus
                </p>
                <h2 id="focus-heading" className="mt-3 text-2xl font-bold tracking-tight">
                  {nextUp?.title ?? "Everything is complete"}
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  {nextUp
                    ? `${nextUp.subjectName} · up next`
                    : "Every chapter in your stream is done"}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-white/75">
                  {nextUp
                    ? "Open it, study it, and mark it complete when finished."
                    : "Sit back — or revisit any chapter for revision."}
                </p>
                <Link
                  href={
                    nextUp
                      ? `/subjects/${nextUp.subjectSlug}/${nextUp.chapterSlug}`
                      : "/subjects"
                  }
                  className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                >
                  <Play size={15} aria-hidden />
                  {nextUp ? "Open chapter" : "Browse subjects"}
                  <ArrowRight
                    size={15}
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </section>
            </Reveal>
          </div>

          <Reveal>
            <section aria-labelledby="subjects-heading" className="mt-10">
              <div className="flex items-end justify-between gap-4">
                <h2
                  id="subjects-heading"
                  className="inline-flex items-center gap-2 text-lg font-bold tracking-tight"
                >
                  <Layers size={18} aria-hidden />
                  Subjects
                  <span className="rounded-full bg-slate-900/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-white/[0.07] dark:text-neutral-400">
                    {STREAM_LABELS[stream] ?? stream}
                  </span>
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
                {visibleSubjects.map((s, i) => {
                  const { done, total } = subjectDone(s.slug);
                  const fraction = total > 0 ? done / total : 0;
                  return (
                    <Reveal
                      key={s.slug}
                      delay={Math.min(i * 0.05, 0.3)}
                      className="h-full"
                    >
                      <Link
                        href={`/subjects/${s.slug}`}
                        className="group block h-full rounded-2xl border border-slate-200/80 bg-white/80 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/70"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                          <SubjectIcon slug={s.slug} size={18} />
                        </span>
                        <span className="mt-3 block truncate text-sm font-semibold">
                          {s.name}
                        </span>
                        <span className="mt-1 block text-xs tabular-nums text-slate-500 dark:text-neutral-400">
                          {done}/{total} done
                        </span>
                        <ProgressBar
                          value={fraction * 100}
                          trackClassName="mt-2 h-1 bg-slate-200/80 dark:bg-neutral-800"
                          barClassName="bg-emerald-500 dark:bg-indigo-500"
                        />
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <Link
              href="/calculator"
              className="group mt-10 flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/70"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                <Calculator size={20} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">Where should your hours go?</span>
                <span className="block text-xs text-slate-500 dark:text-neutral-400">
                  Priority planner · saved only to your account
                </span>
              </span>
              <ArrowRight
                size={17}
                aria-hidden
                className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500 dark:group-hover:text-neutral-300"
              />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Reveal className="h-full">
              <section
                id="continue"
                aria-labelledby="continue-heading"
                className="h-full scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70"
              >
                <h2 id="continue-heading" className="text-lg font-bold tracking-tight">
                  Recently completed
                </h2>
                {done.length === 0 ? (
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-neutral-300">
                    Nothing completed yet. Open any chapter and mark it complete — it will
                    show up here.
                  </p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {done.map((c) => (
                      <li key={`${c.subjectSlug}:${c.chapterSlug}`}>
                        <Link
                          href={`/subjects/${c.subjectSlug}/${c.chapterSlug}`}
                          className="group flex items-center gap-3 rounded-2xl border border-transparent p-2 transition hover:border-slate-200 hover:bg-slate-50 dark:hover:border-neutral-800 dark:hover:bg-neutral-800/50"
                        >
                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                            <Check size={14} aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-xs text-slate-500 dark:text-neutral-400">
                              {c.subjectName}
                            </span>
                            <span className="block truncate text-sm font-semibold">
                              {c.title}
                            </span>
                          </span>
                          <ArrowRight
                            size={16}
                            aria-hidden
                            className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500 dark:group-hover:text-neutral-300"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>

            <Reveal delay={0.08} className="h-full">
              <section
                aria-labelledby="tutor-heading"
                className="flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <Bot size={19} aria-hidden />
                </span>
                <h2 id="tutor-heading" className="mt-4 text-lg font-bold tracking-tight">
                  Chapter AI tutor
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-neutral-300">
                  Ask doubts within the chapter you are studying and get explanations
                  grounded in that chapter&apos;s content. Wiring up next.
                </p>
                <span className="mt-6 inline-flex w-fit cursor-not-allowed rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-400 dark:border-neutral-800 dark:text-neutral-500">
                  Coming soon
                </span>
              </section>
            </Reveal>
          </div>

          {fresh.length > 0 && (
            <Reveal>
              <section aria-labelledby="fresh-heading" className="mt-10">
                <h2
                  id="fresh-heading"
                  className="inline-flex items-center gap-2 text-lg font-bold tracking-tight"
                >
                  Fresh videos
                  <span className="rounded-full bg-emerald-600/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                    New
                  </span>
                </h2>
                <div className="scroll-slim mt-4 flex gap-3 overflow-x-auto pb-2">
                  {fresh.map((item) => (
                    <Link
                      key={item.video.youtubeId}
                      href={`/subjects/${item.subjectSlug}/${item.chapterSlug}`}
                      className="group w-44 shrink-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/70"
                    >
                      <span className="relative block aspect-video w-full">
                        <Image
                          src={`https://i.ytimg.com/vi/${item.video.youtubeId}/hqdefault.jpg`}
                          alt=""
                          fill
                          sizes="176px"
                          className="object-cover"
                        />
                      </span>
                      <span className="block p-2.5">
                        <span className="block truncate text-xs font-semibold">
                          {item.video.title}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-slate-500 dark:text-neutral-400">
                          {item.subjectName} · {item.chapterTitle}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          <Reveal>
            <section
              aria-labelledby="fire-heading"
              className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 p-6 text-white shadow-xl shadow-orange-500/20 sm:p-8 dark:from-[#2a0f0a] dark:via-[#3a1508] dark:to-[#2a1a05] dark:shadow-none dark:ring-1 dark:ring-orange-500/20"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl dark:bg-orange-500/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-yellow-300/30 blur-3xl dark:bg-red-500/10"
              />
              <div className="relative">
                <h2
                  id="fire-heading"
                  className="inline-flex items-center gap-2 text-lg font-bold tracking-tight"
                >
                  <Flame size={19} aria-hidden />
                  Fuel for the comeback
                </h2>
                <p className="mt-1 max-w-xl text-sm text-white/80 dark:text-orange-100/60">
                  Improvement-season motivation and strategy. Press play when the fire
                  dips.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {MOTIVATION_VIDEOS.map((video) => (
                    <VideoFacade key={video.youtubeId} video={video} />
                  ))}
                </div>
              </div>
            </section>
          </Reveal>

          <footer className="mt-12 border-t border-slate-200/70 py-6 text-xs text-slate-500 dark:border-neutral-800/70 dark:text-neutral-400">
            <p>
              improve. — your study companion for Kerala Plus One improvement exams. All
              learning resources belong to their original creators.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
