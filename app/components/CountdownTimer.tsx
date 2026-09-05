"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { EXAM_DATE_ISO } from "../lib/site";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

const FALLBACK: TimeLeft = {
  days: 37,
  hours: 15,
  minutes: 38,
  seconds: 0,
  done: false,
};

function compute(): TimeLeft {
  const diff = new Date(EXAM_DATE_ISO).getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
    done: false,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(FALLBACK);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(compute()), 1000);
    return () => clearInterval(id);
  }, []);

  if (timeLeft.done) {
    return (
      <p className="mt-5 text-2xl font-bold tracking-tight">
        Exams are on. All the best!
      </p>
    );
  }

  const units = [
    { value: String(timeLeft.days), label: "days" },
    { value: pad(timeLeft.hours), label: "hrs" },
    { value: pad(timeLeft.minutes), label: "min" },
    { value: pad(timeLeft.seconds), label: "sec" },
  ];

  return (
    <div
      className="mt-5 grid grid-cols-4 gap-2"
      role="timer"
      aria-label="Time left until the improvement exams"
    >
      {units.map((u) => (
        <div
          key={u.label}
          className="rounded-2xl bg-white px-2 py-4 text-center shadow-sm ring-1 ring-slate-200 dark:bg-neutral-900 dark:ring-neutral-800"
        >
          <p className="relative overflow-hidden text-2xl font-bold tabular-nums sm:text-3xl">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={u.value}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="block"
              >
                {u.value}
              </motion.span>
            </AnimatePresence>
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{u.label}</p>
        </div>
      ))}
    </div>
  );
}
