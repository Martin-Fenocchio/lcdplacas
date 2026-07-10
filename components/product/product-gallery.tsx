"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { conditionBadgeClass, type ProductDetail } from "@/lib/products";
import { fadeUp, scaleIn, stagger } from "@/lib/motion";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

const THUMB_STRIPE = { background: "repeating-linear-gradient(135deg,#F5F8FC 0 10px,#EDF2F8 10px 20px)" } as const;

export function ProductGallery({ product }: { product: ProductDetail }) {
  return (
    <motion.div variants={stagger(0.1)} initial="hidden" animate="show">
      <motion.div
        variants={scaleIn}
        className="relative overflow-hidden rounded-[20px] border border-line bg-white"
      >
        <ImagePlaceholder
          stripe="gallery"
          glyph="board"
          label={product.images[0]}
          className="aspect-square"
          glyphClassName="w-[60px] h-[60px]"
        />
        <span
          className={cn(
            "absolute left-3.5 top-3.5 rounded-full px-3 py-[5px] text-xs font-semibold",
            conditionBadgeClass(product.condition),
          )}
        >
          {product.condition}
        </span>
      </motion.div>

      <motion.div variants={stagger(0.06, 0.05)} className="mt-3.5 grid grid-cols-4 gap-3">
        {product.images.map((image, i) => (
          <motion.div
            key={image}
            variants={fadeUp}
            className={cn(
              "aspect-square overflow-hidden rounded-xl",
              i === 0 ? "border-2 border-primary" : "border border-line",
            )}
            style={THUMB_STRIPE}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
