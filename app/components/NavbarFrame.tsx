"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState, type ReactNode } from "react";
import { CALM_EASE } from "./animate";

// Sticky navbar shell: slides in on mount, then deepens its shadow once
// scrolled (shadow driven by Motion, colors stay theme classes).
export default function NavbarFrame({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  return (
    <motion.header
      initial={{ y: -56, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        boxShadow: scrolled ? "0 8px 30px rgb(0 0 0 / 0.08)" : "0 0 0 rgb(0 0 0 / 0)",
      }}
      transition={{ duration: 0.5, ease: CALM_EASE }}
      className="sticky top-0 z-40 border-b border-slate-200/70 bg-[#fafaf8]/85 backdrop-blur dark:border-neutral-800/70 dark:bg-[#111]/85"
    >
      {children}
    </motion.header>
  );
}
