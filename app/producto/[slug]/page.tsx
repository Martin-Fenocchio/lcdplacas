import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS, getProductBySlug } from "@/lib/products";
import { SITE } from "@/lib/site";
import { breadcrumbLd, productLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/ui/json-ld";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { ProductAttributes } from "@/components/product/product-attributes";
import { ProductDescription } from "@/components/product/product-description";
import { RelatedProducts } from "@/components/product/related-products";
import { PdpMobileBar } from "@/components/product/pdp-mobile-bar";
import { ProductViewTracker } from "@/components/analytics/product-view-tracker";

export function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Producto no encontrado" };

  return {
    title: p.title,
    description: p.description[0],
    alternates: { canonical: `/producto/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.description[0],
      images: p.images[0] ? [p.images[0]] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main>
        <div className="mx-auto max-w-[1280px] px-6 pt-[22px]">
          <nav className="flex flex-wrap items-center gap-2 text-[13px] text-muted" aria-label="Migas de pan">
            <Link href="/" className="text-muted">Inicio</Link>
            <span className="text-line-strong">/</span>
            <Link href={`/productos/${product.categorySlug}`} className="text-muted">{product.category}</Link>
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
        <RelatedProducts product={product} />

        <PdpMobileBar title={product.title} code={product.code} price={product.price} slug={product.slug} />
        <ProductViewTracker product={product} />

        <JsonLd data={productLd(product)} />
        <JsonLd
          data={breadcrumbLd([
            { name: "Inicio", url: SITE.url },
            { name: product.category, url: `${SITE.url}/productos/${product.categorySlug}` },
            { name: product.title, url: `${SITE.url}/producto/${product.slug}` },
          ])}
        />
    </main>
  );
}
