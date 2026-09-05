"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, LoaderCircle, Sparkles, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { api, apiErrorMessage } from "../lib/api";
import { MAX_IMPROVEMENT_SUBJECTS, recommendedTrio } from "../lib/improvement";
import type { CalcSubject } from "./Calculator";

type ImprovementResponse = { subjects: string[] };

type Priority = { subjectSlug: string; rank: number };

// Marks are read through the same ["marks"] query the planner uses, so no
// second fetch — the recommendation simply follows the saved priorities.
type MarksResponse = { priorities: Priority[] };

export default function ImprovementPicker({
  subjects,
  initialTrio,
}: {
  subjects: CalcSubject[];
  initialTrio: string[];
}) {
  const queryClient = useQueryClient();
  // Draft starts from the server value — no effect sync needed.
  const [selected, setSelected] = useState<string[]>(initialTrio);
  const [hint, setHint] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trioQuery = useQuery({
    queryKey: ["improvement"],
    queryFn: async (): Promise<ImprovementResponse> => {
      const { data } = await api.get<ImprovementResponse>("/improvement");
      return data;
    },
  });

  const marksQuery = useQuery({
    queryKey: ["marks"],
    queryFn: async (): Promise<MarksResponse> => {
      const { data } = await api.get<MarksResponse>("/marks");
      return data;
    },
  });

  const recommendation = recommendedTrio(marksQuery.data?.priorities ?? []);

  function toggle(slug: string) {
    setHint(null);
    setSelected((sel) => {
      if (sel.includes(slug)) return sel.filter((s) => s !== slug);
      if (sel.length >= MAX_IMPROVEMENT_SUBJECTS) {
        setHint(
          `You can improve at most ${MAX_IMPROVEMENT_SUBJECTS} subjects — remove one first.`,
        );
        return sel;
      }
      return [...sel, slug];
    });
  }

  const save = useMutation({
    mutationFn: async () => {
      const { data } = await api.put<ImprovementResponse>("/improvement", {
        subjects: selected,
      });
      return data;
    },
    onSuccess: (data) => {
      setError(null);
      setHint(null);
      setSelected(data.subjects);
      queryClient.invalidateQueries({ queryKey: ["improvement"] });
    },
    onError: (err) => setError(apiErrorMessage(err)),
  });

  const saved = trioQuery.data?.subjects ?? [];
  const dirty =
    selected.length !== saved.length || selected.some((s) => !saved.includes(s));
  const pending = save.isPending;

  return (
    <section
      aria-labelledby="trio-heading"
      className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <h2 id="trio-heading" className="text-lg font-bold tracking-tight">
        Your {MAX_IMPROVEMENT_SUBJECTS} improvement subjects
      </h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
        The exam lets you improve at most {MAX_IMPROVEMENT_SUBJECTS} subjects. Only these
        show up on your dashboard and subjects list — everything else stays saved, just
        out of focus.
      </p>

      {trioQuery.isLoading ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-neutral-400">
          <LoaderCircle size={15} aria-hidden className="animate-spin" />
          Loading your choice…
        </p>
      ) : (
        <>
          <div
            className="mt-4 flex flex-wrap gap-2"
            role="group"
            aria-label="Choose improvement subjects"
          >
            {subjects.map((s) => {
              const active = selected.includes(s.slug);
              return (
                <button
                  key={s.slug}
                  type="button"
                  aria-pressed={active}
                  disabled={pending}
                  onClick={() => toggle(s.slug)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition disabled:opacity-60 ${
                    active
                      ? "border-emerald-600 bg-emerald-600 text-white dark:border-indigo-500 dark:bg-indigo-600"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:text-white"
                  }`}
                >
                  {active && <Check size={13} aria-hidden />}
                  {s.name}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={pending || recommendation.length === 0}
              onClick={() => {
                setHint(null);
                setSelected(recommendation);
              }}
              title={
                recommendation.length === 0 ? "Save your marks above first" : undefined
              }
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
            >
              <Sparkles size={15} aria-hidden />
              Use recommended trio
            </button>
            <button
              type="button"
              disabled={pending || !dirty}
              onClick={() => {
                setError(null);
                save.mutate();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-indigo-600 dark:shadow-indigo-600/25 dark:hover:bg-indigo-500"
            >
              {pending && <LoaderCircle size={15} aria-hidden className="animate-spin" />}
              {pending ? "Saving…" : "Save choice"}
            </button>
            {!dirty && saved.length > 0 && (
              <span className="text-xs text-slate-500 dark:text-neutral-400">
                Saved — your dashboard shows only these.
              </span>
            )}
          </div>
        </>
      )}

      {hint && (
        <p role="status" className="mt-3 text-xs text-amber-600 dark:text-amber-400">
          {hint}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
        >
          <TriangleAlert size={16} aria-hidden className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </section>
  );
}
