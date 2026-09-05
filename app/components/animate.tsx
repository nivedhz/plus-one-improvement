"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

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
