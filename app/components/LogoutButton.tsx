"use client";

import { LoaderCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function LogoutButton() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setConfirming(false);
    }
    document.addEventListener("keydown", onKeyDown);
    // Lock scrolling and compensate for the disappearing scrollbar so the
    // page doesn't shift sideways. No persistent gutter is reserved, so
    // there is no strip left behind to mismatch the modal scrim.
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [confirming]);

  async function logout() {
    setPending(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Cookie may already be gone — refresh anyway.
    } finally {
      router.refresh();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:text-white"
      >
        <LogOut size={15} aria-hidden />
        Log out
      </button>

      {confirming &&
        // Portaled to <body> so the sticky navbar's backdrop-blur can't trap
        // the fixed overlay inside the header — this keeps the modal at a
        // true 50%/50% viewport center.
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#111]/10 p-5"
            onClick={() => !pending && setConfirming(false)}
          >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            aria-describedby="logout-desc"
            className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400">
              <LogOut size={19} aria-hidden />
            </span>
            <h2
              id="logout-title"
              className="mt-4 text-lg font-bold tracking-tight"
            >
              Are you sure you want to log out?
            </h2>
            <p
              id="logout-desc"
              className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-neutral-300"
            >
              You&apos;ll be signed out on this device and will need to log in
              again to continue your prep. Your account and saved progress stay
              safe.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                autoFocus
                disabled={pending}
                onClick={() => setConfirming(false)}
                className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-60 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={logout}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {pending && (
                  <LoaderCircle
                    size={15}
                    aria-hidden
                    className="animate-spin"
                  />
                )}
                {pending ? "Logging out…" : "Log out"}
              </button>
            </div>
          </div>
          </div>,
          document.body,
        )}
    </>
  );
}
