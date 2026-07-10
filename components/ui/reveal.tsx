import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  /** Animation delay in seconds (for staggering siblings). */
  delay?: number;
  className?: string;
}

/**
 * Wraps children in the entrance animation that plays on load.
 * Pure CSS (see `.reveal` in globals.css) — no client JS, and it is
 * disabled under `prefers-reduced-motion`. Content is always in the DOM.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <div
      className={cn("reveal", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
