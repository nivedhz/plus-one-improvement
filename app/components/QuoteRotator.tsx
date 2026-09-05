"use client";

import { Quote } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { QUOTES } from "../lib/site";

export default function QuoteRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const quote = QUOTES[index];

  return (
    <div className="mt-5 rounded-2xl bg-white p-4 ring-1 ring-slate-200 dark:bg-neutral-900 dark:ring-neutral-800">
      <Quote size={16} className="text-emerald-600 dark:text-indigo-400" aria-hidden />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <p
            className="mt-2 min-h-10 text-sm font-medium leading-relaxed"
            aria-live="polite"
          >
            “{quote.text}”
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {quote.author}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="mt-3 flex gap-2">
        {QUOTES.map((q, i) => (
          <button
            key={q.text}
            type="button"
            aria-label={`Show quote ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index
                ? "w-6 bg-emerald-500 dark:bg-indigo-500"
                : "w-1.5 bg-slate-300 hover:bg-slate-400 dark:bg-neutral-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
