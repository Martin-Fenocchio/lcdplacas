"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { waLink } from "@/lib/site";
import type { ProductDetail } from "@/lib/products";
import { trackConsulta } from "@/lib/analytics";
import { fadeUp, stagger } from "@/lib/motion";
import { useCart } from "@/components/cart/cart-context";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { Cart, Truck, Whatsapp } from "@/components/ui/icons";

export function ProductPurchase({ product }: { product: ProductDetail }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const priceFull = product.price.toLocaleString("es-AR", { minimumFractionDigits: 2 });
  const codeSuffix = product.code ? ` (Cód. ${product.code})` : "";
  const waMessage = `Hola, quiero consultar por: ${product.title}${codeSuffix} — https://www.lcdplacas.com/producto/${product.slug}`;

  return (
    <motion.div variants={stagger(0.08, 0.1)} initial="hidden" animate="show">
      <motion.div variants={fadeUp} className="text-[13px] font-medium text-muted">
        {product.brand || product.type}
      </motion.div>
      <motion.h1 variants={fadeUp} className="mt-[5px] text-3xl font-bold leading-[1.15]">
        {product.title}
      </motion.h1>

      <motion.div variants={fadeUp} className="mt-2.5 flex flex-wrap items-center gap-2.5">
        {product.code && (
          <span className="rounded-lg border border-line bg-slate-100 px-2.5 py-1 font-mono text-[13px] text-body">
            Cód. {product.code}
          </span>
        )}
        {product.inStock && (
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-green-700">
            <span className="h-2 w-2 rounded-full bg-success" />
            En stock
          </span>
        )}
      </motion.div>

      <motion.div variants={fadeUp} className="mt-[22px] rounded-2xl border border-line bg-surface p-5">
        <div className="font-display text-[34px] font-bold text-ink">${priceFull}</div>
        <div className="mt-1 text-sm text-muted">
          Hasta <strong className="text-ink">12 cuotas</strong>
        </div>

        <div className="mt-[18px] flex items-center gap-3">
          <QuantityStepper value={qty} onChange={setQty} />
          <span className="text-[13px] text-muted">Cantidad</span>
        </div>

        <motion.a
          href={waLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackConsulta(product, "pdp")}
          whileTap={{ scale: 0.98 }}
          className="mt-4 flex h-14 items-center justify-center gap-2.5 rounded-xl bg-whatsapp font-display text-base font-semibold text-whatsapp-ink shadow-[0_8px_24px_rgba(37,211,102,0.28)]"
        >
          <Whatsapp className="h-[22px] w-[22px]" />
          Consultar<span className="hidden min-[560px]:inline">/Comprar</span> por WhatsApp
        </motion.a>
        <motion.button
          type="button"
          onClick={() => addItem(product, qty)}
          whileTap={{ scale: 0.98 }}
          className="mt-2.5 flex h-[50px] w-full items-center justify-center gap-2.5 rounded-xl border border-primary bg-white font-display text-[15px] font-semibold text-primary transition-colors hover:bg-primary-soft"
        >
          <Cart className="h-[19px] w-[19px]" strokeWidth={1.9} />
          Agregar al carrito
        </motion.button>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-4 rounded-[14px] border border-line px-[18px] py-4">
        <div className="flex items-center gap-2.5 text-sm font-semibold text-ink">
          <Truck className="h-[18px] w-[18px] text-primary" />
          Calculá el costo de envío
        </div>
        <div className="mt-3 flex gap-2.5">
          <input
            placeholder="Código postal"
            aria-label="Código postal"
            className="h-11 flex-1 rounded-[10px] border border-line px-3.5 text-sm outline-none focus:border-primary"
          />
          <button
            type="button"
            className="h-11 rounded-[10px] border border-line-strong bg-white px-5 text-sm font-semibold text-ink transition-colors hover:bg-surface"
          >
            Calcular
          </button>
        </div>
        <div className="mt-2.5 text-[12.5px] text-muted">Envíos a todo el país por Correo Argentino.</div>
      </motion.div>
    </motion.div>
  );
}
