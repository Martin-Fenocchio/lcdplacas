"use client";

import { motion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Wraps page content in a per-navigation transition. A template (unlike a
 * layout) remounts on every route change, so the entrance replays when the
 * user navigates — e.g. clicking a product fades/rises the new page in.
 * Only the main content transitions; the header/footer live in the layout.
 * `reducedMotion="user"` makes all Motion animations honor the OS setting.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
