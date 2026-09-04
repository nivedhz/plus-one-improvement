import type { Metadata } from "next";
import { ArrowLeft, GraduationCap } from "lucide-react";
import Link from "next/link";
import AuthForm from "../../components/AuthForm";

export const metadata: Metadata = {
  title: "Log in | improve.",
  description: "Log in to your improve. study companion account.",
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <div aria-hidden className="backdrop-mesh absolute inset-0" />
      <div aria-hidden className="backdrop-dots absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-12">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft size={15} aria-hidden />
          Back home
        </Link>

        <div className="mt-6 rounded-3xl border border-white/60 bg-white/80 p-7 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-xl sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/80 dark:ring-white/5 dark:shadow-black/40">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm dark:bg-indigo-600">
            <GraduationCap size={22} aria-hidden />
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-neutral-300">
            Log in to pick up your October preparation where you left off.
          </p>

          <AuthForm mode="login" />

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-neutral-400">
            New here?{" "}
            <Link
              href="/auth/sign-up"
              className="font-semibold text-emerald-700 hover:underline dark:text-indigo-400"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
