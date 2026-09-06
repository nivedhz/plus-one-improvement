"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, LoaderCircle, Sparkles, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, apiErrorMessage } from "../lib/api";
import { MAX_IMPROVEMENT_SUBJECTS, recommendedTrio } from "../lib/improvement";

export type PickerSubject = { slug: string; name: string };

type ImprovementResponse = { subjects: string[] };

type Priority = { subjectSlug: string; rank: number };

// Marks are read through the same ["marks"] query the planner uses, so no
// second fetch — the recommendation simply follows the saved priorities.
type MarksResponse = { priorities: Priority[] };

// The single place a trio is ever set. Collapsed when a valid trio exists
// (one-line summary + Change); expanded for first pick, edits, and orphan
// recovery after a stream switch.
export default function ImprovementPicker({
  subjects,
  initialTrio,
  dropped,
  stream,
}: {
  subjects: PickerSubject[];
  initialTrio: string[];
  dropped: string[];
  stream: string;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  // Draft starts from server values — no effect sync needed. Remounts (via
  // key={stream}) refresh them after a stream switch.
  const [selected, setSelected] = useState<string[]>(initialTrio);
  const [savedSnap, setSavedSnap] = useState<string[]>(initialTrio);
  const [expanded, setExpanded] = useState(
    initialTrio.length === 0 || dropped.length > 0,
  );
  const [notice, setNotice] = useState<string[]>(dropped);
  const [hint, setHint] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Stream-scoped keys so post-switch caches can never serve old data.
  const marksQuery = useQuery({
    queryKey: ["marks", stream],
    queryFn: async (): Promise<MarksResponse> => {
      const { data } = await api.get<MarksResponse>("/marks");
      return data;
    },
  });

  const recommendation = recommendedTrio(marksQuery.data?.priorities ?? []);

  const nameOf = (slug: string) => subjects.find((s) => s.slug === slug)?.name ?? slug;

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
      // The trio reshapes dashboard schedule, focus, strip, and subjects:
      // clear every client cache, sync local state, re-render servers.
      setError(null);
      setHint(null);
      setSelected(data.subjects);
      setSavedSnap(data.subjects);
      setNotice([]);
      if (data.subjects.length > 0) setExpanded(false);
      queryClient.invalidateQueries();
      router.refresh();
    },
    onError: (err) => setError(apiErrorMessage(err)),
  });

  const dirty =
    selected.length !== savedSnap.length || selected.some((s) => !savedSnap.includes(s));
  const pending = save.isPending;

  if (!expanded && savedSnap.length > 0) {
    return (
      <div id="improvement" className="mt-4 scroll-mt-24">
        <p className="text-xs text-slate-500 dark:text-neutral-400">
          Improving {savedSnap.map(nameOf).join(" · ")} —{" "}
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="font-semibold text-emerald-700 hover:underline dark:text-indigo-400"
          >
            Change
          </button>
        </p>
      </div>
    );
  }

  return (
    <section
      id="improvement"
      aria-labelledby="trio-heading"
      className="mt-4 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <h2 id="trio-heading" className="text-lg font-bold tracking-tight">
        Your {MAX_IMPROVEMENT_SUBJECTS} improvement subjects
      </h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
        The exam lets you improve at most {MAX_IMPROVEMENT_SUBJECTS} subjects. Only these
        show up on your dashboard and subjects list — everything else stays saved, just
        out of focus.
      </p>

      {notice.length > 0 && (
        <p
          role="status"
          className="mt-3 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-800 dark:text-amber-300"
        >
          {notice.join(" · ")} {notice.length === 1 ? "isn't" : "aren't"} in your current
          stream — pick {notice.length === 1 ? "a replacement" : "replacements"} below.
          Your other picks are untouched.
        </p>
      )}

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
            recommendation.length === 0
              ? "Save your marks in the calculator first"
              : undefined
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
        {savedSnap.length > 0 && (
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              setSelected(savedSnap);
              setHint(null);
              setError(null);
              setExpanded(false);
            }}
            className="inline-flex items-center rounded-full border border-slate-400 px-5 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-500 dark:text-neutral-100 dark:hover:border-neutral-300 dark:hover:bg-neutral-800"
          >
            Done
          </button>
        )}
        {!dirty && savedSnap.length > 0 && (
          <span className="text-xs text-slate-500 dark:text-neutral-400">
            Saved — your dashboard shows only these.
          </span>
        )}
      </div>

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
