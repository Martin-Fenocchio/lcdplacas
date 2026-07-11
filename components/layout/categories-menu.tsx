"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { CATEGORIES } from "@/lib/site";
import { ArrowRight, CategoryGlyph, ChevronDown } from "@/components/ui/icons";

/**
 * Desktop nav "Categorías" item: a hover/click dropdown listing every category,
 * each linking to its landing page. Opens on hover (with a short close delay so
 * the mouse can cross the gap) and on click/keyboard, closes on navigation,
 * Escape, or pointer-leave.
 */
export function CategoriesMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close whenever the route changes (the header persists across navigations).
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => () => clearTimeout(closeTimer.current ?? undefined), []);

  const cancelClose = () => clearTimeout(closeTimer.current ?? undefined);
  const openNow = () => {
    cancelClose();
    setOpen(true);
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className={cn(
          "inline-flex items-center gap-1 transition-colors",
          open ? "text-ink" : "text-body hover:text-ink",
        )}
      >
        Categorías
        <ChevronDown className={cn("h-[15px] w-[15px] transition-transform duration-200", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 w-[288px] -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.45)]">
              {CATEGORIES.map((cat) => {
                const isActive = pathname === `/productos/${cat.slug}`;
                return (
                  <Link
                    key={cat.slug}
                    href={`/productos/${cat.slug}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors",
                      isActive ? "bg-primary-soft" : "hover:bg-surface",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                        isActive
                          ? "bg-primary text-white"
                          : "bg-primary-soft text-primary group-hover:bg-primary group-hover:text-white",
                      )}
                    >
                      <CategoryGlyph icon={cat.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className={cn("block font-display text-[14px] font-semibold", isActive ? "text-primary" : "text-ink")}>
                        {cat.name}
                      </span>
                      <span className="block truncate text-[12.5px] text-muted">{cat.tagline}</span>
                    </span>
                  </Link>
                );
              })}

              <Link
                href="/productos"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-between rounded-xl border-t border-line px-2.5 py-3 text-[13px] font-semibold text-primary transition-colors hover:bg-surface"
              >
                Ver todo el catálogo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
