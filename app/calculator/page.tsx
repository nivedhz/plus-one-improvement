import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { redirect } from "next/navigation";
import { getSession } from "../lib/auth";
import { STREAM_LABELS, subjectsForStream } from "../lib/subjects";
import { getUserStream } from "../lib/users";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Marks calculator | improve.",
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
            Enter your last Plus One marks. The server ranks each subject on
            its own need — lower marks, higher priority. Only you can see this.
          </p>

          <div className="mt-8">
            <Calculator subjects={subjects} />
          </div>
        </main>
      </div>
    </div>
  );
}
