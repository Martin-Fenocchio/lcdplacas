import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { CATALOG_PRODUCTS, LATEST_PRODUCTS, RELATED_PRODUCTS, FEATURED_PRODUCT } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE.url}/productos`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  const slugs = new Set(
    [...LATEST_PRODUCTS, ...CATALOG_PRODUCTS, ...RELATED_PRODUCTS, FEATURED_PRODUCT].map((p) => p.slug),
  );

  const productRoutes: MetadataRoute.Sitemap = [...slugs].map((slug) => ({
    url: `${SITE.url}/producto/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
