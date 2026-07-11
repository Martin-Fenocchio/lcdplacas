"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { NAV_ITEMS } from "@/lib/site";
import { useCart } from "@/components/cart/cart-context";
import { CategoriesMenu } from "@/components/layout/categories-menu";
import { SearchAutocomplete } from "@/components/search/search-autocomplete";
import { Cart, Search, TvLogo, X } from "@/components/ui/icons";

const LOGO_GRADIENT = { backgroundImage: "linear-gradient(135deg,#2563EB,#06B6D4)" };

function activeKey(pathname: string): string | null {
  if (pathname === "/") return "inicio";
  if (pathname.startsWith("/productos")) return "productos";
  return null;
}

export function SiteHeader() {
  const active = activeKey(usePathname());
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  // The bottom tab bar's "Buscar" opens this same collapsible search.
  useEffect(() => {
    const open = () => setSearchOpen(true);
    window.addEventListener("lcd:open-search", open);
    return () => window.removeEventListener("lcd:open-search", open);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-6 py-3 min-[900px]:gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-[11px]">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-[11px] shadow-[0_4px_12px_rgba(37,99,235,0.28)]"
            style={LOGO_GRADIENT}
          >
            <TvLogo className="h-[22px] w-[22px] text-white" />
          </span>
          <span className="font-display text-xl font-bold tracking-[-0.02em] text-ink">
            LCD<span className="text-primary">Placas</span>
          </span>
        </Link>

        <SearchAutocomplete className="mx-auto hidden max-w-[560px] flex-1 min-[900px]:block" />

        <nav className="hidden shrink-0 items-center gap-[22px] text-sm font-medium min-[900px]:flex">
          {NAV_ITEMS.map((item) => {
            if (item.hasChevron) return <CategoriesMenu key={item.key} />;

            const className = cn(
              "inline-flex items-center gap-1 transition-colors",
              active === item.key ? "font-semibold text-primary" : "text-body hover:text-ink",
            );
            return item.external ? (
              <a key={item.key} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                {item.label}
              </a>
            ) : (
              <Link key={item.key} href={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 min-[900px]:ml-0">
          {/* Mobile: search is a toggle that expands the field below. */}
          <button
            type="button"
            aria-label={searchOpen ? "Cerrar búsqueda" : "Buscar"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-white text-ink min-[900px]:hidden"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Ver carrito, ${count} producto${count === 1 ? "" : "s"}`}
            className="relative flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-white"
          >
            <Cart className="h-5 w-5 text-ink" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile-only collapsible search, opened by the icon or the tab bar. */}
      <AnimatePresence initial={false}>
        {searchOpen && (
          <motion.div
            key="mobile-search"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden min-[900px]:hidden"
          >
            <div className="mx-auto max-w-[1280px] px-6 pb-3">
              <SearchAutocomplete autoFocus onNavigate={() => setSearchOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
