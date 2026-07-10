import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, categoryBySlug, SITE } from "@/lib/site";
import { productsByCategory } from "@/lib/products";
import { breadcrumbLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/ui/product-card";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";

const GRID = "grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 min-[900px]:gap-5";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const category = categoryBySlug(categoria);
  if (!category) return { title: "Categoría no encontrada" };
  return {
    title: `${category.name} para TV LED`,
    description: category.description,
    alternates: { canonical: `/productos/${category.slug}` },
    openGraph: {
      title: `${category.name} para TV LED · ${SITE.name}`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const category = categoryBySlug(categoria);
  if (!category) notFound();

  const products = productsByCategory(category.slug);

  return (
    <main>
      <div className="mx-auto max-w-[1280px] px-6 pt-[26px]">
        <nav className="flex items-center gap-2 text-[13px] text-muted" aria-label="Migas de pan">
          <Link href="/" className="text-muted">Inicio</Link>
          <span className="text-line-strong">/</span>
          <Link href="/productos" className="text-muted">Productos</Link>
          <span className="text-line-strong">/</span>
          <span className="font-medium text-ink">{category.name}</span>
        </nav>
        <h1 className="mt-3.5 text-4xl font-bold">{category.name}</h1>
        <p className="mt-2 max-w-[70ch] text-[15px] leading-[1.6] text-muted">{category.description}</p>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 pb-[72px] pt-5">
        <CatalogBrowser total={products.length} category={{ slug: category.slug, name: category.name }}>
          <div className={GRID}>
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={Math.min(i, 11) * 0.04} className="h-full">
                <ProductCard product={product} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        </CatalogBrowser>
      </div>

      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", url: SITE.url },
          { name: "Productos", url: `${SITE.url}/productos` },
          { name: category.name, url: `${SITE.url}/productos/${category.slug}` },
        ])}
      />
    </main>
  );
}
