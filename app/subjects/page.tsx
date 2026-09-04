import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import SubjectIcon from "../components/SubjectIcon";
import { getSession } from "../lib/auth";
import { SUBJECTS, mockProgress, totalLessons } from "../lib/subjects";

export const metadata: Metadata = {
  title: "Subjects | improve.",
  description: "Every science-batch subject, chapter by chapter.",
};

export default async function SubjectsPage() {
  if (!(await getSession())) redirect("/auth/login");

  return (
    <div className="relative min-h-screen overflow-clip">
      <div aria-hidden className="backdrop-mesh absolute inset-0" />
      <div aria-hidden className="backdrop-dots absolute inset-0" />

      <div className="relative">
        <Navbar />

        <main className="mx-auto max-w-6xl px-5 py-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <ArrowLeft size={15} aria-hidden />
            Dashboard
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-indigo-400">
            Science batch
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            All your subjects.
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-neutral-300">
            Pick a subject to see its chapters, key points and previous
            questions — everything grouped, nothing scattered.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {SUBJECTS.map((s) => {
              const progress = mockProgress(s.slug);
              return (
                <Link
                  key={s.slug}
                  href={`/subjects/${s.slug}`}
                  className="group rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/70"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                      <SubjectIcon slug={s.slug} size={21} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5 font-semibold">
                        {s.name}
                        <ArrowRight
                          size={15}
                          aria-hidden
                          className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500 dark:group-hover:text-neutral-300"
                        />
                      </span>
                      <span className="block text-xs text-slate-500 dark:text-neutral-400">
                        {s.chapters.length} chapters · {totalLessons(s)} lessons
                      </span>
                    </div>
                    <span className="text-sm font-bold tabular-nums">
                      {progress}%
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-neutral-300">
                    {s.tagline}
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-neutral-800">
                    <div
                      className="h-full rounded-full bg-emerald-500 dark:bg-indigo-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
