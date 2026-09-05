import type { Metadata } from "next";
import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This improve. page doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-5 py-12 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:bg-indigo-500/10 dark:text-indigo-300">
          <Compass size={22} aria-hidden />
        </span>
        <p className="mt-5 text-sm font-semibold tabular-nums text-slate-400 dark:text-neutral-500">
          404
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-neutral-300">
          The link may be mistyped, or the chapter moved. Your progress is safe — pick up
          where you left off.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 dark:bg-indigo-600 dark:shadow-indigo-600/25 dark:hover:bg-indigo-500"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-300/80 bg-white px-7 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-slate-100 dark:hover:border-slate-600"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
