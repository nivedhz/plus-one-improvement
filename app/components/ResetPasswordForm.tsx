"use client";

import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, LoaderCircle, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, apiErrorMessage } from "../lib/api";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/auth/reset-password", {
        token,
        password,
      });
      return data;
    },
    onSuccess: () => {
      router.push("/dashboard");
      router.refresh();
    },
    onError: (err) => setError(apiErrorMessage(err)),
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match. Type them again carefully.");
      return;
    }
    setError(null);
    mutation.mutate();
  }

  const pending = mutation.isPending;

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
        <label
          htmlFor="reset-password"
          className="mb-1.5 block text-sm font-medium"
        >
          New password
          <span className="ml-2 text-xs font-normal text-slate-500 dark:text-neutral-400">
            min. 8 characters
          </span>
        </label>
        <div className="relative">
          <input
            id="reset-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`${inputClass} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 dark:hover:text-neutral-200"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="reset-confirm"
          className="mb-1.5 block text-sm font-medium"
        >
          Confirm new password
        </label>
        <input
          id="reset-confirm"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          required
          minLength={8}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="••••••••"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-indigo-600 dark:shadow-indigo-600/25 dark:hover:bg-indigo-500"
      >
        {pending && <LoaderCircle size={16} aria-hidden className="animate-spin" />}
        {pending ? "Saving…" : "Set new password"}
      </button>
    </form>
  );
}
