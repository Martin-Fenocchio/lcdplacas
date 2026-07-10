"use client";

import { useEffect, useState } from "react";
import { searchProducts } from "@/lib/search";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/ui/product-card";
import { Search, X } from "@/components/ui/icons";

const GRID = "grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 min-[900px]:gap-5";

/**
 * Instant Algolia search over the catalog. With no query it renders `children`
 * (the server-rendered full grid, kept for SEO); as the user types it debounces
 * and shows live results. The header/hero search boxes deep-link here via ?q=.
 */
export function CatalogSearch({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);

  // Pick up ?q= from the URL on mount (e.g. arriving from the header search).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setHits(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      const results = await searchProducts(q);
      setHits(results);
      setLoading(false);
    }, 220);
    return () => clearTimeout(timer);
  }, [query]);

  const searching = query.trim().length > 0;

  return (
    <div>
      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-[19px] w-[19px] -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscá por modelo de TV o código…"
          aria-label="Buscar repuestos"
          className="h-[50px] w-full rounded-xl border border-line-strong bg-white pl-[46px] pr-[46px] text-[15px] text-ink outline-none focus:border-primary"
        />
        {searching && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Limpiar búsqueda"
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-surface"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
        )}
      </div>

      {!searching ? (
        children
      ) : hits === null || (loading && hits.length === 0) ? (
        <p className="py-10 text-center text-[15px] text-muted">Buscando…</p>
      ) : hits.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-[15px] text-ink">
            No encontramos repuestos para <strong>“{query}”</strong>.
          </p>
          <p className="mt-1.5 text-sm text-muted">Probá con el modelo de TV o el código de la placa.</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted">
            <strong className="text-ink">{hits.length}</strong> resultado{hits.length === 1 ? "" : "s"} para{" "}
            <strong className="text-ink">“{query}”</strong>
          </p>
          <div className={GRID}>
            {hits.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
