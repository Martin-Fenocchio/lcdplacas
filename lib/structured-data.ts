/**
 * JSON-LD (schema.org) builders for SEO rich results.
 * Rendered via the <JsonLd> component using the Next-recommended pattern.
 */
import { SITE } from "@/lib/site";
import type { ProductDetail } from "@/lib/products";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sarandí 467",
      addressLocality: "Merlo",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: SITE.name,
    image: `${SITE.url}/opengraph-image`,
    url: SITE.url,
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sarandí 467",
      addressLocality: "Merlo",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.locale,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/productos?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function productLd(product: ProductDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    sku: product.code,
    mpn: product.code,
    category: product.category,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description.join(" "),
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE.url}/producto/${product.slug}`,
    },
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
