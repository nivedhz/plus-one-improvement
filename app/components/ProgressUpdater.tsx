"use client";

import { useMutation } from "@tanstack/react-query";
import { Check, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, apiErrorMessage } from "../lib/api";

const STEPS = [25, 50, 75, 100];

export default function ProgressUpdater({
  subject,
  chapter,
  initial,
}: {
  subject: string;
  chapter: string;
  initial: number;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (percent: number) => {
      const { data } = await api.put("/progress", { subject, chapter, percent });
      return data as { percent: number };
    },
    onSuccess: () => {
      setError(null);
      // Server components re-read progress from the database on refresh.
      router.refresh();
    },
    onError: (err) => setError(apiErrorMessage(err)),
  });

  const shown = mutation.data?.percent ?? initial;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Set chapter progress">
        {STEPS.map((s) => (
          <button
            key={s}
            type="button"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate(s)}
            aria-pressed={shown === s}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition disabled:opacity-60 ${
              shown === s
                ? "border-emerald-600 bg-emerald-600 text-white dark:border-indigo-500 dark:bg-indigo-600"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:text-white"
            }`}
          >
            {mutation.isPending ? (
              <LoaderCircle size={13} aria-hidden className="animate-spin" />
            ) : (
              shown === s && <Check size={13} aria-hidden />
            )}
            {s === 100 ? "Done" : `${s}%`}
          </button>
        ))}
        {shown > 0 && shown !== 100 && (
          <button
            type="button"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate(100)}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Mark complete
          </button>
        )}
      </div>
      {mutation.isSuccess && !error && (
        <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-400">
          Saved. Refreshing your progress…
        </p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
