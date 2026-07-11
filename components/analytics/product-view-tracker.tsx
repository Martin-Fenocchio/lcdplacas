"use client";

import { useEffect } from "react";
import { trackProductView } from "@/lib/analytics";
import type { ProductDetail } from "@/lib/products";

/** Fires a `product_viewed` event when a product page mounts. */
export function ProductViewTracker({ product }: { product: ProductDetail }) {
  useEffect(() => {
    trackProductView(product);
  }, [product.slug]);
  return null;
}
