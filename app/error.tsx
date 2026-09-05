"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import { useEffect } from "react";

// Route-level boundary: standalone minimal layout (no navbar/providers)
// so a crash above can't cascade into this screen.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-5 py-12 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400">
          <TriangleAlert size={22} aria-hidden />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight">Something went wrong</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-neutral-300">
          This page hit a snag. Your account and saved progress are safe — try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 dark:bg-indigo-600 dark:shadow-indigo-600/25 dark:hover:bg-indigo-500"
        >
          <RotateCcw size={16} aria-hidden />
          Try again
        </button>
      </div>
    </div>
  );
}
