import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ALL_PRODUCTS } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE.url}/productos`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  const productRoutes: MetadataRoute.Sitemap = ALL_PRODUCTS.map((product) => ({
    url: `${SITE.url}/producto/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
