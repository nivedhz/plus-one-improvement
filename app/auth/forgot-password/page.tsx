import type { Metadata } from "next";
import { ArrowLeft, KeyRound } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";
import { getSession } from "../../lib/auth";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Request a password reset link for your improve. account.",
};

export default async function ForgotPasswordPage() {
  if (await getSession()) redirect("/");

  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <div aria-hidden className="backdrop-mesh absolute inset-0" />
      <div aria-hidden className="backdrop-dots absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-12">
        <Link
          href="/auth/login"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft size={15} aria-hidden />
          Back to login
        </Link>

        <div className="mt-6 rounded-3xl border border-white/60 bg-white/80 p-7 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-xl sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/80 dark:ring-white/5 dark:shadow-black/40">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm dark:bg-indigo-600">
            <KeyRound size={22} aria-hidden />
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            Forgot password
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-neutral-300">
            Enter your account email and we&apos;ll send a one-time reset
            link, valid for 60 minutes.
          </p>

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
