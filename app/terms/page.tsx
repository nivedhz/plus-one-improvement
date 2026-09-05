import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { CONTACT_EMAIL } from "../lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The rules for using improve.",
};

const SECTIONS: { heading: string; body: string }[] = [
  {
    heading: "What improve. is",
    body: "A free study companion for Kerala Plus One improvement exams. It organises links to third-party videos, notes, and question papers, and tracks the progress you record. It is a study aid, not a school, and makes no promise about exam outcomes.",
  },
  {
    heading: "Your account",
    body: "One account per person. Keep your password to yourself — you are responsible for activity under your account. We may suspend accounts used for abuse, spam, or attempts to break the service.",
  },
  {
    heading: "Your content stays yours",
    body: "The marks and progress you enter remain private to your account. We claim no ownership over them and will never publish or sell them.",
  },
  {
    heading: "Third-party resources",
    body: "Videos, notes, and papers belong to their original creators (YouTube channels, HSSLive, HSSReporter). Availability and accuracy are theirs to control; broken links are replaced as they are found.",
  },
  {
    heading: "Fair use",
    body: "Don't scrape the service, don't hammer the API beyond normal study use, and don't use the platform to collect other students' data. Automated abuse may be rate-limited or blocked.",
  },
  {
    heading: "No guarantees",
    body: "The service is provided as-is. Study plans, priorities, and countdowns are guidance based on the data you enter — always verify exam dates and syllabi against official DHSE notifications.",
  },
  {
    heading: "Changes",
    body: "We may update these terms; the date below moves with material changes, and continuing to use the app counts as acceptance.",
  },
];

export default function TermsPage() {
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
            Terms of use
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
