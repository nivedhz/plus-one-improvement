"use client";

import { useMutation } from "@tanstack/react-query";
import { LoaderCircle, MailCheck, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { api, apiErrorMessage } from "../lib/api";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post<{ ok: boolean; message: string }>(
        "/auth/forgot-password",
        { email },
      );
      return data;
    },
    onSuccess: () => setError(null),
    onError: (err) => setError(apiErrorMessage(err)),
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    mutation.mutate();
  }

  if (mutation.isSuccess) {
    return (
      <p
        role="status"
        className="mt-6 flex items-start gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300"
      >
        <MailCheck size={16} aria-hidden className="mt-0.5 shrink-0" />
        {mutation.data.message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {error && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
        >
          <TriangleAlert size={16} aria-hidden className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}

      <div>
        <label htmlFor="forgot-email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="forgot-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-indigo-600 dark:shadow-indigo-600/25 dark:hover:bg-indigo-500"
      >
        {mutation.isPending && (
          <LoaderCircle size={16} aria-hidden className="animate-spin" />
        )}
        {mutation.isPending ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
