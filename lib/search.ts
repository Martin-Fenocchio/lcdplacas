/**
 * Algolia search — called directly over the REST API (no SDK dependency).
 * These are the *public* search-only credentials (safe to ship to the client,
 * that's what Algolia front-end search uses); the write key stays server-side.
 */
import type { Condition, Product } from "@/lib/products";

const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "9INIGG8HOQ";
const SEARCH_KEY =
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY ?? "c76b5b85131c88ba70b621a7bfe9bb49";
const INDEX = process.env.NEXT_PUBLIC_ALGOLIA_INDEX ?? "products";

const HEADERS = {
  "X-Algolia-API-Key": SEARCH_KEY,
  "X-Algolia-Application-Id": APP_ID,
  "Content-Type": "application/json",
};

interface SearchHit {
  slug: string;
  title: string;
  code: string | null;
  brand: string;
  type: string;
  compatibleModels: string;
  condition: string;
  price: number;
  category: string;
  categorySlug: string;
  image: string | null;
}

function hitToProduct(hit: SearchHit): Product {
  return {
    slug: hit.slug,
    title: hit.title,
    code: hit.code ?? "",
    brand: hit.brand ?? "",
    condition: (hit.condition as Condition) ?? "Nueva",
    price: hit.price,
    inStock: true,
    category: hit.category,
    categorySlug: hit.categorySlug,
    type: hit.type ?? "",
    compatibleModels: hit.compatibleModels ?? "",
    images: hit.image ? [hit.image] : [],
  };
}

export type SortOption = "relevance" | "price_asc" | "price_desc";

/** The facets users can filter by, in display order. */
export const FACET_ATTRS = ["brand", "type", "condition"] as const;
export type FacetAttr = (typeof FACET_ATTRS)[number];

export interface CatalogState {
  query: string;
  sort: SortOption;
  brand: string[];
  type: string[];
  condition: string[];
  priceMin: number | null;
  priceMax: number | null;
}

export type FacetCounts = Record<string, number>;

export interface CatalogResult {
  hits: Product[];
  nbHits: number;
  facets: Record<FacetAttr, FacetCounts>;
}

const EMPTY: CatalogResult = {
  hits: [],
  nbHits: 0,
  facets: { brand: {}, type: {}, condition: {} },
};

/**
 * Faceted catalog query. Uses Algolia's multi-query endpoint to compute
 * *disjunctive* facet counts (each facet is counted ignoring its own
 * selection), so multi-select within a facet behaves correctly. Price sort is
 * applied client-side (the catalog is small, so no sort replicas are needed).
 */
export async function searchCatalog(state: CatalogState): Promise<CatalogResult> {
  const selected: Record<FacetAttr, string[]> = {
    brand: state.brand,
    type: state.type,
    condition: state.condition,
  };

  const numericFilters: string[] = [];
  if (state.priceMin != null) numericFilters.push(`price>=${state.priceMin}`);
  if (state.priceMax != null) numericFilters.push(`price<=${state.priceMax}`);

  const facetFilters = (exclude: FacetAttr | null) => {
    const groups: string[][] = [];
    for (const attr of FACET_ATTRS) {
      if (attr === exclude) continue;
      if (selected[attr].length) groups.push(selected[attr].map((v) => `${attr}:${v}`));
    }
    return groups;
  };

  const base = { indexName: INDEX, query: state.query, numericFilters };
  const requests = [
    { ...base, hitsPerPage: 1000, facetFilters: facetFilters(null) },
    ...FACET_ATTRS.map((attr) => ({
      ...base,
      hitsPerPage: 0,
      facets: [attr],
      maxValuesPerFacet: 100,
      facetFilters: facetFilters(attr),
    })),
  ];

  try {
    const res = await fetch(`https://${APP_ID}-dsn.algolia.net/1/indexes/*/queries`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ requests }),
    });
    if (!res.ok) return EMPTY;
    const data = await res.json();
    const main = data.results?.[0] ?? {};
    let hits: Product[] = (main.hits ?? []).map(hitToProduct);
    if (state.sort === "price_asc") hits = [...hits].sort((a, b) => a.price - b.price);
    else if (state.sort === "price_desc") hits = [...hits].sort((a, b) => b.price - a.price);
    return {
      hits,
      nbHits: main.nbHits ?? hits.length,
      facets: {
        brand: data.results?.[1]?.facets?.brand ?? {},
        type: data.results?.[2]?.facets?.type ?? {},
        condition: data.results?.[3]?.facets?.condition ?? {},
      },
    };
  } catch {
    return EMPTY;
  }
}
