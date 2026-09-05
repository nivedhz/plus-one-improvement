"use client";

import { useMutation } from "@tanstack/react-query";
import { Check, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, apiErrorMessage } from "../lib/api";

// Odin-style binary toggle: a chapter is either done or it isn't.
export default function CompleteToggle({
  subject,
  chapter,
  completed,
}: {
  subject: string;
  chapter: string;
  completed: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (next: boolean) => {
      const { data } = await api.put("/progress", {
        subject,
        chapter,
        completed: next,
      });
      return data as { completed: boolean };
    },
    onSuccess: () => {
      setError(null);
      // Server components re-read progress from the database on refresh.
      router.refresh();
    },
    onError: (err) => setError(apiErrorMessage(err)),
  });

  const shown = mutation.data?.completed ?? completed;

  return (
    <div>
      <button
        type="button"
        disabled={mutation.isPending}
        onClick={() => mutation.mutate(!shown)}
        aria-pressed={shown}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-10 ${
          shown
            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 dark:bg-indigo-600 dark:shadow-indigo-600/25 dark:hover:bg-indigo-500"
            : "border-2 border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {mutation.isPending ? (
            <motion.span
              key="saving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="inline-flex"
            >
              <LoaderCircle size={16} aria-hidden className="animate-spin" />
            </motion.span>
          ) : shown ? (
            <motion.span
              key="done"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className="inline-flex"
            >
              <Check size={16} aria-hidden />
            </motion.span>
          ) : null}
        </AnimatePresence>
        {mutation.isPending
          ? "Saving…"
          : shown
            ? "Completed — tap to mark incomplete"
            : "Mark as complete"}
      </button>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
