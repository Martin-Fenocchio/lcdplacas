/**
 * Custom PostHog events. Safe to import anywhere client-side — each helper
 * no-ops until PostHog is initialised (so nothing fires locally without a key,
 * and nothing errors). Product context rides along; PostHog's automatic
 * `$current_url` tells us *where* the event happened.
 */
import posthog from "posthog-js";

interface ProductLike {
  slug: string;
  title: string;
  code?: string;
  brand?: string;
  type?: string;
  category?: string;
  price: number;
}

// Matches the provider's init condition: if the key is configured, PostHog was
// initialised at module load, so capture is safe.
function ready(): boolean {
  return typeof window !== "undefined" && Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);
}

function productProps(p: ProductLike) {
  return {
    slug: p.slug,
    title: p.title,
    code: p.code || undefined,
    brand: p.brand || undefined,
    type: p.type || undefined,
    category: p.category || undefined,
    price: p.price,
  };
}

export function trackProductView(p: ProductLike) {
  if (ready()) posthog.capture("product_viewed", productProps(p));
}

export function trackProductClick(p: ProductLike) {
  if (ready()) posthog.capture("product_clicked", productProps(p));
}

export function trackConsulta(p: ProductLike | null, source: string) {
  if (ready()) posthog.capture("consulta_whatsapp", { source, ...(p ? productProps(p) : {}) });
}

export function trackSearch(query: string, results: number) {
  if (ready()) posthog.capture("search", { query, results });
}

export function trackFilter(attribute: string, value: string) {
  if (ready()) posthog.capture("filter_applied", { attribute, value });
}
