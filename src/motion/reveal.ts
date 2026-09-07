import type { Variants } from "motion/react";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const VIEW = { once: true, amount: 0.3 } as const;

export const stagger = (children = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: children, delayChildren: delay } },
});

export const rise = (y = 24): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
});

export const SPRING = { type: "spring", stiffness: 300, damping: 22 } as const;
