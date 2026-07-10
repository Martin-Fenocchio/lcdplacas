import Link from "next/link";
import { RELATED_PRODUCTS } from "@/lib/products";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/ui/product-card";
import { ArrowRight } from "@/components/ui/icons";

export function RelatedProducts() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1280px] px-6 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[26px] font-semibold">Repuestos para el mismo TV</h2>
            <p className="mt-1.5 text-[15px] text-muted">Otros repuestos compatibles con Hisense 55U60H.</p>
          </div>
          <Link href="/productos" className="inline-flex items-center gap-1.5 text-sm font-semibold">
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-5 max-[899px]:grid-cols-2 max-[560px]:grid-cols-1">
          {RELATED_PRODUCTS.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.05} className="h-full">
              <ProductCard product={product} variant="related" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
