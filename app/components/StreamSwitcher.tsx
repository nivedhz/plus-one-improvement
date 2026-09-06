"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bug, Cpu, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, apiErrorMessage } from "../lib/api";

const OPTIONS = [
  {
    value: "cs",
    title: "Computer Science",
    detail: "Physics · Chemistry · Maths · English · Malayalam · CS",
    icon: Cpu,
  },
  {
    value: "biology",
    title: "Biology",
    detail: "Physics · Chemistry · Maths · English · Malayalam · Biology",
    icon: Bug,
  },
] as const;

export default function StreamSwitcher({ initial }: { initial: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (stream: string) => {
      const { data } = await api.put("/profile", { stream });
      return data as { stream: string };
    },
    onSuccess: (data) => {
      // A stream switch reshapes every server list and client cache:
      // clear all queries, update local state, then re-render servers.
      setError(null);
      setSelected(data.stream);
      queryClient.invalidateQueries();
      router.refresh();
    },
    onError: (err) => setError(apiErrorMessage(err)),
  });

  return (
    <div>
      <div
        className="grid gap-3 sm:grid-cols-2"
        role="radiogroup"
        aria-label="Choose your stream"
      >
        {OPTIONS.map((o) => {
          const active = selected === o.value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={active}
              disabled={mutation.isPending}
              onClick={() => mutation.mutate(o.value)}
              className={`flex items-center gap-3.5 rounded-2xl border p-4 text-left transition disabled:opacity-60 ${
                active
                  ? "border-emerald-600 bg-emerald-500/[0.06] dark:border-indigo-500 dark:bg-indigo-500/[0.08]"
                  : "border-slate-200/80 bg-white hover:border-slate-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              }`}
            >
              <span
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  active
                    ? "bg-emerald-600 text-white dark:bg-indigo-600"
                    : "bg-slate-900/[0.05] text-slate-600 dark:bg-white/[0.07] dark:text-neutral-300"
                }`}
              >
                {mutation.isPending && active ? (
                  <LoaderCircle size={18} aria-hidden className="animate-spin" />
                ) : (
                  <o.icon size={19} aria-hidden />
                )}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold">{o.title}</span>
                <span className="block truncate text-xs text-slate-500 dark:text-neutral-400">
                  {o.detail}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
