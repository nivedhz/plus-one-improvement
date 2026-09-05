"use client";

import { motion, useInView, useSpring, useTransform, type Variants } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

// Shared motion primitives (Motion library only — no CSS keyframes).
// Calm language: short rises, soft ease-out, transform/opacity only so
// low-end phones stay on the compositor thread.

type EaseTuple = [number, number, number, number];

export const CALM_EASE: EaseTuple = [0.22, 1, 0.36, 1];

// Fade-and-rise when scrolled into view (also fires on load when already
// visible). Fires once so revisits stay still.
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  scale = 1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, delay, ease: CALM_EASE }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: CALM_EASE } },
};

// Orchestrated mount choreography (hero). Use <Item> for each child;
// plays once on load.
export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function Item({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

// Animated 0→value% bar fill for progress and priority displays.
// Color classes stay at the call site; only the width is Motion-driven.
export function ProgressBar({
  value,
  trackClassName,
  barClassName,
}: {
  value: number;
  trackClassName: string;
  barClassName: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <span className={`block overflow-hidden rounded-full ${trackClassName}`}>
      <motion.span
        className={`block h-full rounded-full ${barClassName}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: CALM_EASE }}
      />
    </span>
  );
}

// Spring count-up for stats like the study streak. Renders the final value
// for reduced-motion users (MotionConfig handles that globally).
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const text = useTransform(spring, (v) => String(Math.round(v)));
  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, value, spring]);
  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
