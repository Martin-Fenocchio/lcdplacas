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

/** Query the index and map hits into the Product shape the cards expect. */
export async function searchProducts(query: string, hitsPerPage = 30): Promise<Product[]> {
  try {
    const res = await fetch(`https://${APP_ID}-dsn.algolia.net/1/indexes/${INDEX}/query`, {
      method: "POST",
      headers: {
        "X-Algolia-API-Key": SEARCH_KEY,
        "X-Algolia-Application-Id": APP_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, hitsPerPage }),
    });
    if (!res.ok) return [];
    const data: { hits?: SearchHit[] } = await res.json();
    return (data.hits ?? []).map(hitToProduct);
  } catch {
    return [];
  }
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
