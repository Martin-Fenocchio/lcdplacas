import Link from "next/link";
import { relatedProducts, type ProductDetail } from "@/lib/products";
import { ProductScroller } from "@/components/ui/product-scroller";
import { ArrowRight } from "@/components/ui/icons";

export function RelatedProducts({ product }: { product: ProductDetail }) {
  const related = relatedProducts(product);
  if (related.length === 0) return null;

  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1280px] px-6 py-12 min-[900px]:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[26px] font-semibold">Repuestos relacionados</h2>
            <p className="mt-1.5 text-[15px] text-muted">Más repuestos de la categoría {product.category}.</p>
          </div>
          <Link
            href={`/productos/${product.categorySlug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6">
          <ProductScroller products={related} variant="related" />
        </div>
      </div>
    </section>
  );
}
