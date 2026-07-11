"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { formatARS } from "@/lib/format";
import { suggestProducts } from "@/lib/search";
import { trackProductClick } from "@/lib/analytics";
import type { Product } from "@/lib/products";
import { Search } from "@/components/ui/icons";

/**
 * Search input with an instant Algolia suggestions dropdown. Products deep-link
 * to their page; "Ver todos" (and Enter) go to the full results on /productos.
 * The dropdown is portaled + fixed-positioned so it isn't clipped by the
 * header's (overflow-hidden) mobile search container.
 */
export function SearchAutocomplete({
  autoFocus,
  className,
  onNavigate,
}: {
  autoFocus?: boolean;
  className?: string;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [box, setBox] = useState<{ top: number; left: number; width: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const reqId = useRef(0);

  const term = query.trim();
  const showDropdown = open && term.length >= 2;

  useEffect(() => {
    if (term.length < 2) {
      setHits([]);
      setLoading(false);
      return;
    }
    const id = ++reqId.current;
    setLoading(true);
    const t = setTimeout(async () => {
      const results = await suggestProducts(term, 6);
      if (id === reqId.current) {
        setHits(results);
        setLoading(false);
        setActive(-1);
      }
    }, 150);
    return () => clearTimeout(t);
  }, [term]);

  useEffect(() => {
    if (!showDropdown) return;
    const place = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setBox({ top: r.bottom + 6, left: r.left, width: r.width });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [showDropdown]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (wrapRef.current?.contains(t) || dropRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const goSearch = (q: string) => {
    const s = q.trim();
    if (!s) return;
    setOpen(false);
    onNavigate?.();
    router.push(`/productos?q=${encodeURIComponent(s)}`);
  };
  const goProduct = (p: Product) => {
    setOpen(false);
    onNavigate?.();
    trackProductClick(p);
    router.push(`/producto/${p.slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!showDropdown) {
      if (e.key === "Enter") {
        e.preventDefault();
        goSearch(query);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, hits.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && active < hits.length) goProduct(hits[active]);
      else goSearch(query);
    }
  };

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <form onSubmit={(e) => { e.preventDefault(); goSearch(query); }}>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Buscá por modelo de TV o código…"
          aria-label="Buscar repuestos"
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          className="h-11 w-full rounded-[10px] border border-line bg-surface pl-[42px] pr-4 text-sm text-body outline-none focus:border-primary"
        />
      </form>

      {showDropdown &&
        box &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={dropRef}
            style={{ position: "fixed", top: box.top, left: box.left, width: box.width, zIndex: 60 }}
            className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_18px_40px_-16px_rgba(15,23,42,0.35)]"
          >
            {loading && hits.length === 0 ? (
              <ul className="animate-pulse">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="flex items-center gap-3 px-3 py-2.5">
                    <span className="h-11 w-11 shrink-0 rounded-md bg-line" />
                    <span className="min-w-0 flex-1">
                      <span className="block h-3 w-3/4 rounded bg-line" />
                      <span className="mt-1.5 block h-2.5 w-1/3 rounded bg-line" />
                    </span>
                  </li>
                ))}
              </ul>
            ) : hits.length === 0 ? (
              <p className="px-4 py-4 text-sm text-muted">Sin sugerencias para “{term}”.</p>
            ) : (
              <ul>
                {hits.map((p, i) => (
                  <li key={p.slug}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => goProduct(p)}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors",
                        active === i ? "bg-surface" : "bg-white",
                      )}
                    >
                      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border border-line bg-white">
                        {p.images[0] && (
                          <Image src={p.images[0]} alt="" fill sizes="44px" className="object-contain p-0.5" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-ink">{p.title}</span>
                        {p.code && <span className="block truncate font-mono text-[11px] text-muted">{p.code}</span>}
                      </span>
                      <span className="shrink-0 font-display text-[13px] font-bold text-ink">{formatARS(p.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              onMouseEnter={() => setActive(hits.length)}
              onClick={() => goSearch(query)}
              className={cn(
                "flex w-full items-center gap-2 border-t border-line px-4 py-2.5 text-left text-[13px] font-semibold text-primary transition-colors",
                active === hits.length ? "bg-primary-soft" : "bg-white",
              )}
            >
              <Search className="h-4 w-4" />
              Ver todos los resultados de “{term}”
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
