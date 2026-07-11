"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { formatARS } from "@/lib/format";
import {
  searchCatalog,
  FACET_ATTRS,
  type CatalogResult,
  type FacetAttr,
  type SortOption,
} from "@/lib/search";
import { trackFilter, trackSearch } from "@/lib/analytics";
import { ProductCard } from "@/components/ui/product-card";
import { FilterPanel } from "@/components/catalog/filter-panel";
import { ProductCardSkeleton } from "@/components/catalog/product-card-skeleton";
import { ChevronDown, Search, Sliders, X } from "@/components/ui/icons";

const GRID = "grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 min-[900px]:gap-5";

const SORTS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevancia" },
  { value: "price_asc", label: "Precio: menor a mayor" },
  { value: "price_desc", label: "Precio: mayor a menor" },
];

const FACET_LABEL: Record<FacetAttr, string> = { brand: "Marca", type: "Tipo", condition: "Estado" };

export function CatalogBrowser({
  total,
  category,
  children,
}: {
  total: number;
  /** When set, results are locked to this category (category landing pages). */
  category?: { slug: string; name: string };
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("relevance");
  const [brand, setBrand] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [condition, setCondition] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [result, setResult] = useState<CatalogResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const reqId = useRef(0);
  const lastSearched = useRef("");

  const selected: Record<FacetAttr, string[]> = { brand, type, condition };
  const setters: Record<FacetAttr, (v: string[]) => void> = { brand: setBrand, type: setType, condition: setCondition };

  const facetCount = brand.length + type.length + condition.length + (priceMin ? 1 : 0) + (priceMax ? 1 : 0);
  const hasFilters = facetCount > 0;
  const active = query.trim() !== "" || hasFilters || sort !== "relevance";

  // Deep-link support: pick up ?q= from the header / hero search boxes.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  useEffect(() => {
    const id = ++reqId.current;
    setLoading(true);
    const timer = setTimeout(async () => {
      const r = await searchCatalog({
        query,
        sort,
        brand,
        type,
        condition,
        priceMin: priceMin ? Number(priceMin) : null,
        priceMax: priceMax ? Number(priceMax) : null,
        categorySlug: category?.slug ?? null,
      });
      if (id === reqId.current) {
        setResult(r);
        setLoading(false);
        const q = query.trim();
        if (q && q !== lastSearched.current) {
          lastSearched.current = q;
          trackSearch(q, r.nbHits);
        }
      }
    }, 180);
    return () => clearTimeout(timer);
  }, [query, sort, brand, type, condition, priceMin, priceMax, category?.slug]);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  const toggle = (attr: FacetAttr, value: string) => {
    const list = selected[attr];
    const adding = !list.includes(value);
    setters[attr](adding ? [...list, value] : list.filter((v) => v !== value));
    if (adding) trackFilter(attr, value);
  };
  const clearFilters = () => {
    setBrand([]);
    setType([]);
    setCondition([]);
    setPriceMin("");
    setPriceMax("");
  };

  const facets = result?.facets ?? { brand: {}, type: {}, condition: {} };

  // "busy" = we have nothing meaningful to show yet, so render skeletons instead
  // of an empty screen or a premature "0 resultados".
  const busy = active && (!result || (loading && result.hits.length === 0));

  const panelProps = {
    facets,
    selected,
    onToggle: toggle,
    priceMin,
    priceMax,
    onPriceMin: setPriceMin,
    onPriceMax: setPriceMax,
    attrs: category ? (["brand", "condition"] as FacetAttr[]) : undefined,
  };

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-[19px] w-[19px] -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={category ? `Buscá dentro de ${category.name}…` : "Buscá por modelo de TV o código…"}
          aria-label="Buscar repuestos"
          className="h-[50px] w-full rounded-xl border border-line-strong bg-white pl-[46px] pr-[46px] text-[15px] text-ink outline-none focus:border-primary"
        />
        {query && (
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

      {/* Count + controls */}
      <div className="mb-4 flex flex-col gap-3 min-[560px]:flex-row min-[560px]:items-center min-[560px]:justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          {!active ? (
            <>
              <strong className="text-ink">{total}</strong> repuestos probados y garantizados
            </>
          ) : busy ? (
            "Buscando…"
          ) : (
            <>
              <strong className="text-ink">{result?.nbHits ?? 0}</strong> resultado
              {result?.nbHits === 1 ? "" : "s"}
              {query.trim() && (
                <>
                  {" "}
                  para <strong className="text-ink">“{query.trim()}”</strong>
                </>
              )}
            </>
          )}
        </p>
        <div className="flex shrink-0 items-center justify-between gap-2.5 min-[560px]:justify-end">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="relative inline-flex h-[42px] items-center gap-[7px] rounded-[10px] border border-line bg-white px-4 text-sm font-semibold text-body min-[1000px]:hidden"
          >
            <Sliders className="h-4 w-4" />
            Filtrar
            {facetCount > 0 && (
              <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">
                {facetCount}
              </span>
            )}
          </button>
          <div className="relative">
            <select
              aria-label="Ordenar productos"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="h-[42px] cursor-pointer appearance-none rounded-[10px] border border-line bg-white pl-3.5 pr-[38px] text-sm font-medium text-ink outline-none"
            >
              {SORTS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-[13px] top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-muted" />
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {FACET_ATTRS.flatMap((attr) =>
            selected[attr].map((value) => (
              <button
                key={`${attr}:${value}`}
                type="button"
                onClick={() => toggle(attr, value)}
                className="inline-flex items-center gap-[7px] rounded-full border border-primary-softer bg-primary-soft px-3 py-1.5 text-[13px] font-medium text-primary-hover"
              >
                <span className="text-muted">{FACET_LABEL[attr]}:</span> {value}
                <X className="h-[13px] w-[13px]" />
              </button>
            )),
          )}
          {(priceMin || priceMax) && (
            <button
              type="button"
              onClick={() => {
                setPriceMin("");
                setPriceMax("");
              }}
              className="inline-flex items-center gap-[7px] rounded-full border border-primary-softer bg-primary-soft px-3 py-1.5 text-[13px] font-medium text-primary-hover"
            >
              {priceMin ? formatARS(Number(priceMin)) : "$0"} – {priceMax ? formatARS(Number(priceMax)) : "∞"}
              <X className="h-[13px] w-[13px]" />
            </button>
          )}
          <button type="button" onClick={clearFilters} className="ml-1 text-[13px] font-medium text-primary">
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Sidebar + results */}
      <div className="grid grid-cols-1 items-start gap-8 min-[1000px]:grid-cols-[272px_1fr]">
        <aside className="sticky top-[88px] hidden rounded-2xl border border-line bg-white px-5 pb-5 pt-1.5 min-[1000px]:block">
          <div className="flex items-center justify-between pb-1 pt-4">
            <span className="font-display text-base font-semibold text-ink">Filtros</span>
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="text-[13px] font-medium text-primary">
                Limpiar
              </button>
            )}
          </div>
          <FilterPanel {...panelProps} />
        </aside>

        <div>
          {!active ? (
            children
          ) : busy ? (
            <div className={cn(GRID, "fade-in")} aria-busy="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : result && result.hits.length > 0 ? (
            <div className={cn(GRID, "fade-in transition-opacity duration-200", loading && "opacity-60")}>
              {result.hits.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-[15px] text-ink">No encontramos repuestos con esos criterios.</p>
              <p className="mt-1.5 text-sm text-muted">Probá con otro modelo, código, o quitá algún filtro.</p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 rounded-[10px] border border-line-strong bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:bg-surface"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex flex-col justify-end min-[1000px]:hidden">
            <button
              type="button"
              aria-label="Cerrar filtros"
              onClick={() => setDrawerOpen(false)}
              style={{ backgroundColor: "rgba(15,23,42,0.5)" }}
              className="absolute inset-0"
            />
            <div className="relative max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white">
              <div className="sticky top-0 flex items-center justify-between border-b border-line bg-white px-5 py-4">
                <span className="font-display text-base font-semibold text-ink">Filtros</span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Cerrar"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="px-5">
                <FilterPanel {...panelProps} />
              </div>
              <div className="sticky bottom-0 flex gap-3 border-t border-line bg-white px-5 py-3.5">
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="h-12 flex-1 rounded-xl border border-line-strong bg-white font-display text-sm font-semibold text-ink"
                  >
                    Limpiar
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="h-12 flex-[2] rounded-xl bg-primary font-display text-sm font-semibold text-white"
                >
                  Ver {result?.nbHits ?? total} resultados
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
