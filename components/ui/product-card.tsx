import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { conditionBadgeClass, type Product } from "@/lib/products";
import { formatARS } from "@/lib/format";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Cart, Whatsapp } from "@/components/ui/icons";

interface ProductCardProps {
  product: Product;
  /** "related" drops the cart button + stock overlay (used on the PDP). */
  variant?: "default" | "related";
  /** Eager-load the image (use for above-the-fold cards to improve LCP). */
  priority?: boolean;
}

export function ProductCard({ product, variant = "default", priority = false }: ProductCardProps) {
  const showStockOverlay = variant === "default" && !product.inStock;

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary-softer hover:shadow-[0_18px_36px_-22px_rgba(15,23,42,0.4)]"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            priority={priority}
            sizes="(max-width: 560px) 78vw, (max-width: 900px) 45vw, 22vw"
            className="object-contain p-3 transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder
            stripe="card"
            glyph="board"
            className="absolute inset-0"
            glyphClassName="w-[34px] h-[34px]"
          />
        )}
        <span
          className={cn(
            "absolute left-2.5 top-2.5 rounded-full px-2.5 py-[3px] text-[11px] font-semibold",
            conditionBadgeClass(product.condition),
          )}
        >
          {product.condition}
        </span>
        {showStockOverlay && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/70 font-display text-[15px] font-bold text-danger">
            Sin stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-[15px] pb-4 pt-3.5">
        <div className="text-[11.5px] font-medium text-muted">{product.brand || product.type}</div>
        <div className="mt-[3px] line-clamp-2 min-h-[39px] font-display text-[15px] font-semibold leading-[1.3] text-ink">
          {product.title}
        </div>
        <div className="mt-1.5 min-h-[16px] font-mono text-[11.5px] text-muted">{product.code}</div>

        <div className="mt-3">
          <div className="font-display text-xl font-bold text-ink">{formatARS(product.price)}</div>
          <div className="mt-px text-xs text-muted">hasta 12 cuotas</div>
        </div>

        {variant === "default" ? (
          <div className="mt-3.5 flex gap-2">
            <span className="flex h-10 flex-1 items-center justify-center gap-[7px] rounded-[10px] bg-whatsapp text-[13.5px] font-semibold text-whatsapp-ink">
              <Whatsapp className="h-4 w-4" />
              Consultar
            </span>
            <span
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-line bg-white text-primary min-[560px]:flex"
              aria-hidden="true"
            >
              <Cart className="h-[18px] w-[18px]" />
            </span>
          </div>
        ) : (
          <span className="mt-3.5 flex h-10 items-center justify-center gap-[7px] rounded-[10px] bg-whatsapp text-[13.5px] font-semibold text-whatsapp-ink">
            <Whatsapp className="h-4 w-4" />
            Consultar
          </span>
        )}
      </div>
    </Link>
  );
}
