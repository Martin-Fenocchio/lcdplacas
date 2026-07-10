import type { Variants } from "motion/react";

/** Shared easing — the smooth "ease-out" curve used across the design. */
export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Fade + rise, for text and blocks entering. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Fade + gentle scale, for imagery/panels entering. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/** A parent orchestrator that staggers its children's entrance. */
export function stagger(staggerChildren = 0.08, delayChildren = 0): Variants {
  return { hidden: {}, show: { transition: { staggerChildren, delayChildren } } };
}
