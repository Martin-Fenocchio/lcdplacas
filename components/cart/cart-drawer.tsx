"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/components/cart/cart-context";
import { waLink } from "@/lib/site";
import { formatARS } from "@/lib/format";
import { Cart, Whatsapp, X } from "@/components/ui/icons";

export function CartDrawer() {
  const { items, count, total, open, setOpen, removeItem, setQty, clear } = useCart();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (typeof document === "undefined") return null;

  const message = () => {
    const lines = items.map(
      (i) => `• ${i.title}${i.code ? ` (Cód. ${i.code})` : ""} x${i.qty} — ${formatARS(i.price * i.qty)}`,
    );
    return `Hola, quiero comprar:\n${lines.join("\n")}\n\nTotal: ${formatARS(total)}`;
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.button
            type="button"
            aria-label="Cerrar carrito"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: "rgba(15,23,42,0.5)" }}
            className="absolute inset-0"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-display text-lg font-semibold text-ink">
                Tu carrito{count > 0 ? ` (${count})` : ""}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-surface"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <Cart className="h-10 w-10 text-line-strong" />
                <p className="text-[15px] text-ink">Tu carrito está vacío</p>
                <Link
                  href="/productos"
                  onClick={() => setOpen(false)}
                  className="mt-1 rounded-[10px] border border-line-strong bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:bg-surface"
                >
                  Ver productos
                </Link>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-4 py-2">
                {items.map((i) => (
                  <div key={i.slug} className="flex gap-3 border-b border-line py-3 last:border-0">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-white">
                      {i.image && <Image src={i.image} alt="" fill sizes="64px" className="object-contain p-1" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-2 text-[13px] font-medium text-ink">{i.title}</div>
                      {i.code && <div className="mt-0.5 font-mono text-[11px] text-muted">{i.code}</div>}
                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center rounded-lg border border-line">
                          <button
                            type="button"
                            onClick={() => setQty(i.slug, i.qty - 1)}
                            aria-label="Restar"
                            className="h-7 w-8 text-body hover:bg-surface"
                          >
                            −
                          </button>
                          <span className="min-w-[28px] text-center text-sm font-semibold text-ink">{i.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(i.slug, i.qty + 1)}
                            aria-label="Sumar"
                            className="h-7 w-8 text-body hover:bg-surface"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-display text-sm font-bold text-ink">{formatARS(i.price * i.qty)}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(i.slug)}
                      aria-label={`Quitar ${i.title}`}
                      className="self-start text-muted hover:text-danger"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="border-t border-line px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-muted">Total</span>
                  <span className="font-display text-xl font-bold text-ink">{formatARS(total)}</span>
                </div>
                <a
                  href={waLink(message())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center gap-2.5 rounded-xl bg-whatsapp font-display text-[15px] font-semibold text-whatsapp-ink"
                >
                  <Whatsapp className="h-5 w-5" />
                  Finalizar compra por WhatsApp
                </a>
                <button
                  type="button"
                  onClick={clear}
                  className="mt-2 w-full text-center text-[13px] font-medium text-muted hover:text-danger"
                >
                  Vaciar carrito
                </button>
                <p className="mt-2 text-center text-[12px] text-muted">Coordinás pago y envío por WhatsApp.</p>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
