import Link from "next/link";
import { LATEST_PRODUCTS } from "@/lib/products";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/ui/product-card";
import { ArrowRight } from "@/components/ui/icons";

export function LatestProducts() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">Últimos ingresos</h2>
            <p className="mt-1.5 text-base text-muted">Repuestos recién agregados al catálogo.</p>
          </div>
          <Link href="/productos" className="inline-flex items-center gap-1.5 text-sm font-semibold">
            Ver catálogo completo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-[26px] grid grid-cols-2 gap-5 max-[560px]:grid-cols-1 min-[900px]:grid-cols-4">
          {LATEST_PRODUCTS.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.05} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
