import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, FileText, Layers, Play } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Navbar from "../../components/Navbar";
import SubjectIcon from "../../components/SubjectIcon";
import { getSession } from "../../lib/auth";
import { getUserProgressMap } from "../../lib/progress";
import { chapterNotes, subjectNoteCount } from "../../lib/notes";
import { getSubject } from "../../lib/subjects";
import { chapterVideos, subjectVideoCount } from "../../lib/videos";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const subject = getSubject((await params).subject);
  return {
    title: subject ? `${subject.name} | improve.` : "Subject | improve.",
    description: subject?.tagline,
  };
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const subject = getSubject((await params).subject);
  if (!subject) notFound();

  const progressMap = await getUserProgressMap(session.id);

  return (
    <div className="relative min-h-screen overflow-clip">
      <div aria-hidden className="backdrop-mesh absolute inset-0" />
      <div aria-hidden className="backdrop-dots absolute inset-0" />

      <div className="relative">
        <Navbar />

        <main className="mx-auto max-w-6xl px-5 py-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-slate-500 dark:text-neutral-400"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 transition hover:text-slate-900 dark:hover:text-white"
            >
              <ArrowLeft size={15} aria-hidden />
              Dashboard
            </Link>
            <span aria-hidden>/</span>
            <Link href="/subjects" className="transition hover:text-slate-900 dark:hover:text-white">
              Subjects
            </Link>
            <span aria-hidden>/</span>
            <span className="font-medium text-slate-800 dark:text-neutral-200">
              {subject.name}
            </span>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <span className="inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-emerald-600/10 p-3.5 text-emerald-700 dark:bg-indigo-500/10 dark:text-indigo-300">
              <SubjectIcon slug={subject.slug} size={26} />
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {subject.name}
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-neutral-300">
                {subject.tagline}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5 text-xs font-medium">
            {[
              { icon: Layers, text: `${subject.chapters.length} chapters` },
              { icon: Play, text: `${subjectVideoCount(subject.slug)} video lessons` },
              { icon: FileText, text: `${subjectNoteCount(subject.slug)} notes` },
            ].map((s) => (
              <span
                key={s.text}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70"
              >
                <s.icon size={13} aria-hidden />
                {s.text}
              </span>
            ))}
          </div>

          <ol className="mt-8 space-y-2.5">
            {subject.chapters.map((c, i) => {
              const done =
                (progressMap[`${subject.slug}:${c.slug}`] ?? 0) >= 100;
              const vCount = chapterVideos(subject.slug, c.slug).length;
              const nCount = chapterNotes(subject.slug, c.slug).length;
              return (
                <li key={c.slug}>
                  <Link
                    href={`/subjects/${subject.slug}/${c.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4 backdrop-blur transition hover:-translate-y-px hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-900/[0.05] text-sm font-bold tabular-nums dark:bg-white/[0.07]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">
                        {c.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500 dark:text-neutral-400">
                        {vCount} {vCount === 1 ? "video" : "videos"} · {nCount} {nCount === 1 ? "note" : "notes"}
                      </span>
                    </span>
                    {done ? (
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-600/10 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                        <Check size={13} aria-hidden />
                        Done
                      </span>
                    ) : (
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 dark:border-neutral-700" aria-label="Not started" />
                    )}
                    <ArrowRight
                      size={17}
                      aria-hidden
                      className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500 dark:group-hover:text-neutral-300"
                    />
                  </Link>
                </li>
              );
            })}
          </ol>
        </main>
      </div>
    </div>
  );
}
