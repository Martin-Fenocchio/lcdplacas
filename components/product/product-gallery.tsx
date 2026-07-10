"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { conditionBadgeClass, type ProductDetail } from "@/lib/products";
import { fadeUp, scaleIn, stagger } from "@/lib/motion";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

/** How far the main image magnifies on hover. */
const ZOOM = 2.2;

export function ProductGallery({ product }: { product: ProductDetail }) {
  const images = product.images;
  const [active, setActive] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const current = Math.min(active, Math.max(images.length - 1, 0));
  const hasImages = images.length > 0;

  // Track the cursor over the frame and pin the zoom origin to it, so the
  // image pans under the pointer like a magnifier.
  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <motion.div variants={stagger(0.1)} initial="hidden" animate="show">
      <motion.div
        variants={scaleIn}
        onMouseEnter={() => hasImages && setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={handleMove}
        className={cn(
          "relative aspect-square overflow-hidden rounded-[20px] border border-line bg-white",
          hasImages && "cursor-zoom-in",
        )}
      >
        {hasImages ? (
          <Image
            key={images[current]}
            src={images[current]}
            alt={`${product.title} — imagen ${current + 1}`}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 45vw"
            style={{
              transformOrigin: origin,
              transform: zooming ? `scale(${ZOOM})` : "scale(1)",
            }}
            className="object-contain p-5 transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none"
          />
        ) : (
          <ImagePlaceholder stripe="gallery" glyph="board" className="h-full" glyphClassName="w-[60px] h-[60px]" />
        )}
        <span
          className={cn(
            "pointer-events-none absolute left-3.5 top-3.5 rounded-full px-3 py-[5px] text-xs font-semibold",
            conditionBadgeClass(product.condition),
          )}
        >
          {product.condition}
        </span>
      </motion.div>

      {images.length > 1 && (
        <motion.div variants={stagger(0.06, 0.05)} className="mt-3.5 grid grid-cols-5 gap-2.5">
          {images.map((image, i) => (
            <motion.button
              key={image}
              type="button"
              variants={fadeUp}
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={i === current}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl bg-white transition-colors",
                i === current ? "border-2 border-primary" : "border border-line hover:border-line-strong",
              )}
            >
              <Image src={image} alt="" fill sizes="120px" className="object-contain p-1.5" />
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
