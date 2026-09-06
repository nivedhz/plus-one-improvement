import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../components/animate";
import Navbar from "../components/Navbar";
import { redirect } from "next/navigation";
import { getSession } from "../lib/auth";
import { recommendedTrio } from "../lib/improvement";
import { computePriorities, getUserMarks } from "../lib/marks";
import { STREAM_LABELS, subjectsForStream } from "../lib/subjects";
import { getImprovementSubjects, getUserStream } from "../lib/users";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Marks calculator",
  description:
    "Plan subject priorities from your last Plus One marks. Private to your account.",
};

// Members-only: marks are saved to the student's own account, so planning
// requires a login. Nothing here is ever shared or published.
export default async function CalculatorPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  const stream = await getUserStream(session.id);
  const subjects = subjectsForStream(stream);
  const trio = await getImprovementSubjects(session.id, stream);
  const weakest = recommendedTrio(computePriorities(await getUserMarks(session.id)));
  const weakestNames = weakest.map(
    (slug) => subjects.find((s) => s.slug === slug)?.name ?? slug,
  );
  return (
    <div className="relative min-h-screen overflow-clip">
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
          <Reveal>
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-indigo-400">
              Improvement planner · {STREAM_LABELS[stream] ?? stream}
            </p>
            <Link
              href="/subjects"
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
            >
              Wrong stream? Change it in Subjects
              <ArrowRight size={13} aria-hidden />
            </Link>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Where should your hours go?
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-neutral-300">
              Enter your last Plus One marks. The server ranks each subject on its own
              need — lower marks, higher priority. Only you can see this.
            </p>
            {weakestNames.length > 0 && (
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-neutral-300">
                Weakest {weakestNames.length === 1 ? "subject" : "subjects"} right now:{" "}
                <strong className="text-slate-900 dark:text-white">
                  {weakestNames.join(" · ")}
                </strong>{" "}
                — lock {weakestNames.length === 1 ? "it" : "them"} in on your{" "}
                <Link
                  href="/dashboard#improvement"
                  className="font-semibold text-emerald-700 hover:underline dark:text-indigo-400"
                >
                  dashboard
                </Link>
                .
              </p>
            )}
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8">
              <Calculator key={stream} subjects={subjects} stream={stream} trio={trio} />
            </div>
          </Reveal>
        </main>
      </div>
    </div>
  );
}
