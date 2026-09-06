"use client";

import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, LoaderCircle, TriangleAlert } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, apiErrorMessage } from "../lib/api";

type Mode = "login" | "sign-up";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const isSignUp = mode === "sign-up";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stream, setStream] = useState<"cs" | "biology">("biology");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = isSignUp ? { name, email, password, stream } : { email, password };
      const { data } = await api.post(`/auth/${mode}`, payload);
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
    setError(null);
    mutation.mutate();
  }

  const pending = mutation.isPending;

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {error && (
        <motion.p
          key={error}
          role="alert"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: [0, -9, 9, -6, 6, 0], opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
        >
          <TriangleAlert size={16} aria-hidden className="mt-0.5 shrink-0" />
          {error}
        </motion.p>
      )}

      {isSignUp && (
        <div>
          <label htmlFor="auth-name" className="mb-1.5 block text-sm font-medium">
            Full name
          </label>
          <input
            id="auth-name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Aarav Menon"
            className={inputClass}
          />
        </div>
      )}

      {isSignUp && (
        <div>
          <span id="auth-stream-label" className="mb-1.5 block text-sm font-medium">
            Your stream
          </span>
          <div
            role="radiogroup"
            aria-labelledby="auth-stream-label"
            className="grid grid-cols-2 gap-2"
          >
            {(
              [
                {
                  value: "biology",
                  title: "Biology",
                  detail: "Biology in one paper",
                },
                {
                  value: "cs",
                  title: "Computer Science",
                  detail: "CS instead of Biology",
                },
              ] as const
            ).map((o) => (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={stream === o.value}
                onClick={() => setStream(o.value)}
                className={`rounded-xl border p-3 text-left transition ${
                  stream === o.value
                    ? "border-emerald-600 bg-emerald-500/[0.06] dark:border-indigo-500 dark:bg-indigo-500/[0.08]"
                    : "border-slate-200 hover:border-slate-300 dark:border-neutral-800 dark:hover:border-neutral-700"
                }`}
              >
                <span className="block text-sm font-semibold">{o.title}</span>
                <span className="mt-0.5 block text-xs text-slate-500 dark:text-neutral-400">
                  {o.detail}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label htmlFor="auth-email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="auth-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="auth-password" className="mb-1.5 block text-sm font-medium">
          Password
          {isSignUp && (
            <span className="ml-2 text-xs font-normal text-slate-500 dark:text-neutral-400">
              min. 8 characters
            </span>
          )}
        </label>
        <div className="relative">
          <input
            id="auth-password"
            type={showPassword ? "text" : "password"}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            required
            minLength={isSignUp ? 8 : 1}
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

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-indigo-600 dark:shadow-indigo-600/25 dark:hover:bg-indigo-500"
      >
        {pending && <LoaderCircle size={16} aria-hidden className="animate-spin" />}
        {pending
          ? isSignUp
            ? "Creating your account…"
            : "Logging you in…"
          : isSignUp
            ? "Create account"
            : "Log in"}
      </button>
    </form>
  );
}
