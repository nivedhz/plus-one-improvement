import type { Metadata } from "next";
import { ArrowLeft, KeyRound, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ResetPasswordForm from "../../components/ResetPasswordForm";
import { getSession } from "../../lib/auth";

export const metadata: Metadata = {
  title: "Set a new password",
  description: "Choose a new password for your improve. account.",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  if (await getSession()) redirect("/");

  const { token } = await searchParams;

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
            Set a new password
          </h1>

          {!token ? (
            <div className="mt-6">
              <p
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
              >
                <TriangleAlert size={16} aria-hidden className="mt-0.5 shrink-0" />
                This link is missing its token. Request a new one to try again.
              </p>
              <Link
                href="/auth/forgot-password"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 dark:bg-indigo-600 dark:shadow-indigo-600/25 dark:hover:bg-indigo-500"
              >
                Request a new link
              </Link>
            </div>
          ) : (
            <>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-neutral-300">
                Choose something strong — you&apos;ll be logged in right away
                and your other sessions will be signed out.
              </p>
              <ResetPasswordForm token={token} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
