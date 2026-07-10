"use client";

import { waLink } from "@/lib/site";
import { Whatsapp } from "@/components/ui/icons";

/**
 * Sticky purchase bar shown on the product page on mobile only. Keeps the
 * price + WhatsApp CTA reachable without scrolling. Sits in the bottom slot
 * (the mobile tab bar hides itself on product pages).
 */
export function PdpMobileBar({
  title,
  code,
  price,
  slug,
}: {
  title: string;
  code: string;
  price: number;
  slug: string;
}) {
  const priceFull = price.toLocaleString("es-AR", { minimumFractionDigits: 2 });
  const codeSuffix = code ? ` (Cód. ${code})` : "";
  const message = `Hola, quiero consultar por: ${title}${codeSuffix} — https://www.lcdplacas.com/producto/${slug}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 border-t border-line bg-white/95 px-4 py-2.5 backdrop-blur-md min-[900px]:hidden">
      <div className="shrink-0">
        <div className="font-display text-lg font-bold leading-none text-ink">${priceFull}</div>
        <div className="mt-0.5 text-[11px] text-muted">hasta 12 cuotas</div>
      </div>
      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp font-display text-[15px] font-semibold text-whatsapp-ink"
      >
        <Whatsapp className="h-5 w-5" />
        Consultar por WhatsApp
      </a>
    </div>
  );
}
