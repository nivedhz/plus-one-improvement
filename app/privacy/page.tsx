import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { CONTACT_EMAIL } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How improve. handles your account data.",
};

const SECTIONS: { heading: string; body: string }[] = [
  {
    heading: "What we collect",
    body: "Your name, email address, and an encrypted password hash when you create an account; your science stream; the chapter progress you mark; and the previous-exam marks you enter into the planner. Nothing else — no tracking pixels, no analytics, no advertising identifiers.",
  },
  {
    heading: "Why we collect it",
    body: "Solely to run the study companion: signing you in, showing your dashboard, planning priorities from your marks, and tracking the chapters you complete. Your marks and progress are private to your account and never shared or published.",
  },
  {
    heading: "Cookies",
    body: "One strictly-necessary session cookie keeps you signed in for 7 days. It is httpOnly (JavaScript can't read it) and secure in production. We set no other cookies.",
  },
  {
    heading: "Third parties",
    body: "Video lessons play from YouTube and notes link to HSSLive and HSSReporter. Those sites apply their own privacy policies when you open them — we never send them your account data.",
  },
  {
    heading: "Students and minors",
    body: "improve. is built for Plus One students, who are often under 18. Parents and guardians: the account lives entirely on the student's device and login — supervise it there.",
  },
  {
    heading: "Export and deletion",
    body: "Everything stored about you — name, email, stream, progress, marks — lives only in your account and is never shared or published. Logging out ends every session on all devices.",
  },
  {
    heading: "Changes",
    body: "If this policy changes materially, the updated date below moves and continuing to use the app counts as acceptance.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-clip">
      <div className="relative">
        <Navbar />
        <main className="mx-auto max-w-3xl px-5 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <ArrowLeft size={15} aria-hidden />
            Home
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-indigo-400">
            Legal
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy policy
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-neutral-400">
            Last updated September 2026 · Contact:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
          <div className="mt-8 space-y-7">
            {SECTIONS.map((s) => (
              <section key={s.heading}>
                <h2 className="text-lg font-bold tracking-tight">{s.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-neutral-300">
                  {s.body}
                </p>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
