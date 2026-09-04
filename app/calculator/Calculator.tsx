"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ListOrdered, LoaderCircle, Lock, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { api, apiErrorMessage } from "../lib/api";

export type CalcSubject = { slug: string; name: string; maxMarks: number };

type Priority = {
  subjectSlug: string;
  subjectName: string;
  got: number;
  max: number;
  pct: number;
  rank: number;
  level: "Critical" | "High" | "Medium" | "Low" | "Maintain";
  guidance: string;
};

type MarksResponse = {
  marks: { subject: string; got: number; max: number }[];
  priorities: Priority[];
};

const LEVEL_STYLE: Record<Priority["level"], string> = {
  Critical: "bg-red-500/10 text-red-600 dark:text-red-400",
  High: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Low: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Maintain: "bg-slate-500/10 text-slate-500 dark:text-neutral-400",
};

const LEVEL_BAR: Record<Priority["level"], string> = {
  Critical: "bg-red-500",
  High: "bg-orange-500",
  Medium: "bg-amber-500",
  Low: "bg-emerald-500",
  Maintain: "bg-slate-400 dark:bg-neutral-500",
};

export default function Calculator({ subjects }: { subjects: CalcSubject[] }) {
  const queryClient = useQueryClient();
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const marksQuery = useQuery({
    queryKey: ["marks"],
    queryFn: async (): Promise<MarksResponse> => {
      const { data } = await api.get("/marks");
      return data;
    },
  });

  const saved: Record<string, { got: number; max: number }> = {};
  for (const m of marksQuery.data?.marks ?? []) saved[m.subject] = m;

  const save = useMutation({
    mutationFn: async () => {
      // Totals are fixed per subject (60 sciences, 80 languages, 30 botany/zoology)
      // and never edited — percentages stay comparable across subjects.
      const marks = subjects.map((s) => ({
        subject: s.slug,
        got: Math.min(
          s.maxMarks,
          Math.max(0, Number(edits[s.slug] ?? saved[s.slug]?.got ?? 0)),
        ),
        max: s.maxMarks,
      }));
      const { data } = await api.put("/marks", { marks });
      return data as MarksResponse;
    },
    onSuccess: () => {
      setError(null);
      setEdits({});
      queryClient.invalidateQueries({ queryKey: ["marks"] });
    },
    onError: (err) => setError(apiErrorMessage(err)),
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    save.mutate();
  }

  const priorities = marksQuery.data?.priorities ?? [];
  const pending = save.isPending;

  return (
    <div className="grid content-start gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        onSubmit={onSubmit}
        aria-labelledby="input-heading"
        className="self-start rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="input-heading" className="text-lg font-bold tracking-tight">
              Your last Plus One marks
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
              Saved privately to your account. Lower marks earn higher priority.
            </p>
          </div>
          <button
            type="submit"
            disabled={pending || marksQuery.isLoading}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-indigo-600 dark:shadow-indigo-600/25 dark:hover:bg-indigo-500"
          >
            {pending && <LoaderCircle size={15} aria-hidden className="animate-spin" />}
            {pending ? "Saving…" : "Save"}
          </button>
        </div>
        {marksQuery.isLoading ? (
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-neutral-400">
            <LoaderCircle size={15} aria-hidden className="animate-spin" />
            Loading your saved marks…
          </p>
        ) : (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {subjects.map((s) => (
              <div
                key={s.slug}
                className="flex items-center gap-2 rounded-xl border border-slate-200/70 px-2.5 py-2 dark:border-neutral-800"
              >
                <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                  {s.name}
                </span>
                <input
                  type="number"
                  min={0}
                  max={s.maxMarks}
                  inputMode="numeric"
                  value={edits[s.slug] ?? saved[s.slug]?.got ?? ""}
                  onChange={(e) =>
                    setEdits((ed) => ({ ...ed, [s.slug]: e.target.value }))
                  }
                  placeholder="0"
                  aria-label={`${s.name} marks obtained out of ${s.maxMarks}`}
                  className="w-14 rounded-lg border border-slate-200 bg-white px-2 py-1 text-right text-[13px] tabular-nums text-slate-900 outline-none focus:border-emerald-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                />
                <span className="shrink-0 text-xs tabular-nums text-slate-400 dark:text-neutral-500">
                  /{s.maxMarks}
                </span>
              </div>
            ))}
          </div>
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
      </form>

      <section
        aria-labelledby="result-heading"
        aria-live="polite"
        className="h-fit rounded-3xl bg-[#111] p-6 text-white ring-1 ring-black/5 sm:p-7 lg:sticky lg:top-24 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#111] dark:ring-white/10"
      >
        <h2 id="result-heading" className="inline-flex items-center gap-2 text-lg font-bold tracking-tight">
          <ListOrdered size={18} aria-hidden />
          Your subject priorities
        </h2>
        {priorities.length === 0 ? (
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            No saved marks yet. Fill in last time&apos;s scores and hit{" "}
            <strong className="text-white">Save and plan priorities</strong> —
            each subject gets its own priority, ranked by need.
          </p>
        ) : (
          <>
            <p className="mt-2 text-sm text-white/65">
              <strong className="text-white">{priorities[0].subjectName}</strong>{" "}
              needs you most. Work down the list in order.
            </p>
            <ol className="mt-4 space-y-3">
              {priorities.map((p) => (
                <li key={p.subjectSlug} className="rounded-2xl bg-white/[0.06] p-4">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/10 text-[11px] font-bold tabular-nums">
                      {p.rank}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                      {p.subjectName}
                    </span>
                    <span className="shrink-0 text-xs tabular-nums text-white/60">
                      {p.got}/{p.max} · {p.pct}%
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${LEVEL_STYLE[p.level]}`}
                    >
                      {p.level}
                    </span>
                  </div>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${LEVEL_BAR[p.level]}`}
                      style={{ width: `${Math.max(4, 100 - p.pct)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">
                    {p.guidance}
                  </p>
                </li>
              ))}
            </ol>
          </>
        )}
        <p className="mt-5 inline-flex items-start gap-2 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55">
          <Lock size={14} aria-hidden className="mt-0.5 shrink-0" />
          Private to your account: only you can see these marks. Nothing is
          shared or published.
        </p>
      </section>
    </div>
  );
}
