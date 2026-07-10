import type { Metadata } from "next";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/lib/products";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/ui/product-card";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Catálogo de repuestos para TV LED: placas main, fuentes, T-Con, tiras de LED y componentes. Filtrá por marca, modelo de TV y estado.",
  alternates: { canonical: "/productos" },
};

const GRID = "grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 min-[900px]:gap-5";

export default function CatalogPage() {
  return (
    <main>
      <div className="mx-auto max-w-[1280px] px-6 pt-[26px]">
        <nav className="flex items-center gap-2 text-[13px] text-muted" aria-label="Migas de pan">
          <Link href="/" className="text-muted">Inicio</Link>
          <span className="text-line-strong">/</span>
          <span className="font-medium text-ink">Productos</span>
        </nav>
        <h1 className="mt-3.5 text-4xl font-bold">Productos</h1>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 pb-[72px] pt-5">
        <CatalogBrowser total={ALL_PRODUCTS.length}>
          <div className={GRID}>
            {ALL_PRODUCTS.map((product, i) => (
              <Reveal key={product.slug} delay={Math.min(i, 11) * 0.04} className="h-full">
                <ProductCard product={product} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        </CatalogBrowser>
      </div>
    </main>
  );
}
