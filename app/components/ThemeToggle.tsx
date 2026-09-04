"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const el = document.documentElement;
  const observer = new MutationObserver(onChange);
  observer.observe(el, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("improve-theme", next ? "dark" : "light");
    } catch {
      // storage unavailable — theme still applies for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:text-white"
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
