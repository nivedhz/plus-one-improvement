import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  ExternalLink,
  Play,
} from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { Reveal } from "../../../components/animate";
import CompleteToggle from "../../../components/CompleteToggle";
import ResourceCard from "../../../components/ResourceCard";
import VideoFacade from "../../../components/VideoFacade";
import { getSession } from "../../../lib/auth";
import { chapterNotes } from "../../../lib/notes";
import { getUserProgressMap, isComplete } from "../../../lib/progress";
import { PARTNERS } from "../../../lib/site";
import { getChapter, getSubject } from "../../../lib/subjects";
import { chapterVideos } from "../../../lib/videos";

type Params = { subject: string; chapter: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { subject: subjectSlug, chapter: chapterSlug } = await params;
  const subject = getSubject(subjectSlug);
  const chapter = subject && getChapter(subject, chapterSlug);
  return {
    title: chapter ? `${chapter.title} · ${subject?.name}` : "Chapter",
  };
}

export default async function ChapterPage({ params }: { params: Promise<Params> }) {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const { subject: subjectSlug, chapter: chapterSlug } = await params;
  const subject = getSubject(subjectSlug);
  const chapter = subject && getChapter(subject, chapterSlug);
  if (!subject || !chapter) notFound();

  const progressMap = await getUserProgressMap(session.id);
  const completed = isComplete(progressMap[`${subject.slug}:${chapter.slug}`]);
  // New videos first — recency is a manual flag, not upload dates.
  const videos = chapterVideos(subject.slug, chapter.slug).sort(
    (a, b) => Number(b.recent ?? false) - Number(a.recent ?? false),
  );
  const notes = chapterNotes(subject.slug, chapter.slug);
  const index = subject.chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = subject.chapters[index - 1];
  const next = subject.chapters[index + 1];

  return (
    <div className="relative min-h-screen overflow-clip">
      <div className="relative">
        <Navbar />

        <main className="mx-auto max-w-6xl px-5 py-10">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-neutral-400"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 transition hover:text-slate-900 dark:hover:text-white"
            >
              <ArrowLeft size={15} aria-hidden />
              Dashboard
            </Link>
            <span aria-hidden>/</span>
            <Link
              href={`/subjects/${subject.slug}`}
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              {subject.name}
            </Link>
            <span aria-hidden>/</span>
            <span className="font-medium text-slate-800 dark:text-neutral-200">
              {chapter.title}
            </span>
          </nav>

          <Reveal>
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-indigo-400">
              {subject.name} · Chapter {String(index + 1).padStart(2, "0")} of{" "}
              {String(subject.chapters.length).padStart(2, "0")}
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              {chapter.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2.5 text-xs font-medium">
              {videos.length > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 dark:border-neutral-800 dark:bg-neutral-900">
                  <Play size={13} aria-hidden />
                  {videos.length} video lessons
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 dark:border-neutral-800 dark:bg-neutral-900">
                {completed ? "Completed" : "Not started"}
              </span>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <Reveal className="h-full">
              <section
                aria-labelledby="keys-heading"
                className="h-full rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <h2 id="keys-heading" className="text-lg font-bold tracking-tight">
                  Key points
                </h2>
                <ul className="mt-4 space-y-3">
                  {chapter.keyPoints.map((k) => (
                    <li
                      key={k}
                      className="flex items-start gap-2.5 text-sm leading-relaxed"
                    >
                      <CheckCircle2
                        size={17}
                        aria-hidden
                        className="mt-0.5 shrink-0 text-emerald-600 dark:text-indigo-400"
                      />
                      {k}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.08} className="h-full">
              <div className="h-full space-y-4">
                <section
                  aria-labelledby="tutor-heading"
                  className="rounded-2xl bg-[#111] p-6 text-white ring-1 ring-black/5 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#111] dark:ring-white/10"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                    <Bot size={19} aria-hidden />
                  </span>
                  <h2
                    id="tutor-heading"
                    className="mt-4 text-lg font-bold tracking-tight"
                  >
                    Stuck on this chapter?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    The chapter tutor will answer only from {chapter.title} — definitions,
                    examples and quiz questions on demand.
                  </p>
                  <span className="mt-5 inline-flex w-fit cursor-not-allowed rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/50">
                    Tutor coming soon
                  </span>
                </section>

                <section
                  aria-labelledby="res-heading"
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <h2 id="res-heading" className="text-lg font-bold tracking-tight">
                    Trusted resources
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {PARTNERS.map((p) => (
                      <li key={p.name}>
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 text-sm"
                        >
                          <span>
                            <span className="font-semibold">{p.name}</span>
                            <span className="ml-2 text-xs text-slate-500 dark:text-neutral-400">
                              {p.detail}
                            </span>
                          </span>
                          <ExternalLink
                            size={15}
                            aria-hidden
                            className="shrink-0 text-slate-300 transition group-hover:text-slate-500 dark:group-hover:text-neutral-300"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </Reveal>
          </div>

          {videos.length > 0 && (
            <Reveal>
              <section aria-labelledby="videos-heading" className="mt-8">
                <h2 id="videos-heading" className="text-lg font-bold tracking-tight">
                  Video lessons
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                  Hand-picked video lessons — the creators keep the views, you keep the
                  context.
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {videos.map((video, vi) => (
                    <Reveal key={video.youtubeId} delay={Math.min(vi * 0.06, 0.24)}>
                      <VideoFacade video={video} />
                    </Reveal>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {notes.length > 0 && (
            <Reveal>
              <section aria-labelledby="notes-heading" className="mt-8">
                <h2 id="notes-heading" className="text-lg font-bold tracking-tight">
                  Chapter notes
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                  Linked reading from the original publishers — nothing copied, everything
                  attributed.
                </p>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {notes.map((note) => (
                    <li key={note.url}>
                      <ResourceCard
                        title={note.title}
                        url={note.url}
                        detail={`${note.source}${note.scope === "subject" ? " · covers full subject" : ""}`}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          <Reveal>
            <section
              aria-labelledby="done-heading"
              className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 text-center sm:p-8 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <h2 id="done-heading" className="text-lg font-bold tracking-tight">
                {completed ? "Nice work — chapter done." : "Done with this chapter?"}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-neutral-300">
                {completed
                  ? "This chapter counts toward your progress. Changed your mind? Mark it incomplete."
                  : "Mark it complete and watch your subjects fill up."}
              </p>
              <div className="mt-5 flex justify-center">
                <CompleteToggle
                  subject={subject.slug}
                  chapter={chapter.slug}
                  completed={completed}
                />
              </div>
            </section>
          </Reveal>

          <nav aria-label="Chapter navigation" className="mt-8 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/subjects/${subject.slug}/${prev.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 transition hover:-translate-y-px hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <ArrowLeft
                  size={17}
                  aria-hidden
                  className="shrink-0 text-slate-400 transition group-hover:-translate-x-0.5"
                />
                <span className="min-w-0">
                  <span className="block text-xs text-slate-500 dark:text-neutral-400">
                    Previous
                  </span>
                  <span className="block truncate text-sm font-semibold">
                    {prev.title}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/subjects/${subject.slug}/${next.slug}`}
                className="group flex items-center justify-end gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 text-right transition hover:-translate-y-px hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <span className="min-w-0">
                  <span className="block text-xs text-slate-500 dark:text-neutral-400">
                    Next
                  </span>
                  <span className="block truncate text-sm font-semibold">
                    {next.title}
                  </span>
                </span>
                <ArrowRight
                  size={17}
                  aria-hidden
                  className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5"
                />
              </Link>
            )}
          </nav>
        </main>
      </div>
    </div>
  );
}
