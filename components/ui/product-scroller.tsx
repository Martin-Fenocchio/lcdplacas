import { cn } from "@/lib/cn";
import type { Product } from "@/lib/products";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/ui/product-card";

/**
 * Responsive product list: a horizontal, snap-scrolling carousel on mobile
 * (with a peek of the next card to signal swipeability) that becomes a 4-column
 * grid on desktop. Bleeds to the viewport edges on mobile via -mx-6/px-6.
 * Pure CSS — no JS.
 */
const CONTAINER =
  "no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 pb-2 " +
  "min-[900px]:mx-0 min-[900px]:grid min-[900px]:grid-cols-4 min-[900px]:gap-5 min-[900px]:overflow-visible min-[900px]:px-0 min-[900px]:pb-0";

const ITEM =
  "h-full shrink-0 basis-[78%] snap-start min-[520px]:basis-[45%] min-[768px]:basis-[31%] min-[900px]:basis-auto";

export function ProductScroller({
  products,
  variant = "default",
}: {
  products: Product[];
  variant?: "default" | "related";
}) {
  return (
    <div className={CONTAINER}>
      {products.map((product, i) => (
        <Reveal key={product.slug} delay={i * 0.04} className={cn(ITEM)}>
          <ProductCard product={product} variant={variant} />
        </Reveal>
      ))}
    </div>
  );
}
