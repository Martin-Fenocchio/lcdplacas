import type { Metadata } from "next";
import Link from "next/link";
import { FEATURED_PRODUCT } from "@/lib/products";
import { SITE } from "@/lib/site";
import { breadcrumbLd, productLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/ui/json-ld";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { ProductAttributes } from "@/components/product/product-attributes";
import { ProductDescription } from "@/components/product/product-description";
import { RelatedProducts } from "@/components/product/related-products";

// UI build: every product route renders the featured sample product.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  await params;
  const p = FEATURED_PRODUCT;
  return {
    title: p.title,
    description: `${p.title} (Cód. ${p.code}). ${p.type} para ${p.compatibleModels}. Probada en 5 puntos, con garantía. Envíos a todo el país.`,
    alternates: { canonical: `/producto/${p.slug}` },
    openGraph: {
      title: p.title,
      description: `${p.type} para ${p.compatibleModels}. Probada en 5 puntos, con garantía.`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;
  const product = FEATURED_PRODUCT;

  return (
    <main>
        <div className="mx-auto max-w-[1280px] px-6 pt-[22px]">
          <nav className="flex flex-wrap items-center gap-2 text-[13px] text-muted" aria-label="Migas de pan">
            <Link href="/" className="text-muted">Inicio</Link>
            <span className="text-line-strong">/</span>
            <Link href="/productos" className="text-muted">{product.category}</Link>
            <span className="text-line-strong">/</span>
            <span className="font-medium text-ink">{product.title}</span>
          </nav>
        </div>

        <section className="mx-auto max-w-[1280px] px-6 pb-2 pt-6">
          <div className="grid grid-cols-1 items-start gap-[52px] min-[900px]:grid-cols-2">
            <ProductGallery product={product} />
            <ProductPurchase product={product} />
          </div>
        </section>

        <ProductAttributes product={product} />
        <ProductDescription product={product} />
        <RelatedProducts />

        <JsonLd data={productLd(product)} />
        <JsonLd
          data={breadcrumbLd([
            { name: "Inicio", url: SITE.url },
            { name: product.category, url: `${SITE.url}/productos` },
            { name: product.title, url: `${SITE.url}/producto/${product.slug}` },
          ])}
        />
    </main>
  );
}
