import type { ProductDetail } from "@/lib/products";
import { QUALITY_CHECKS } from "@/lib/products";
import { Check, ShieldCheck } from "@/components/ui/icons";

export function ProductDescription({ product }: { product: ProductDetail }) {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-10">
      <div className="grid grid-cols-1 items-start gap-10 min-[900px]:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="text-[22px] font-semibold">Descripción</h2>
          <div className="mt-3.5 text-[15px] leading-[1.7] text-slate-600">
            {product.description.map((paragraph, i) => (
              <p key={i} className={i > 0 ? "mt-3.5" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-primary-softer bg-primary-soft p-[22px]">
          <div className="flex items-center gap-2.5 font-display text-base font-semibold text-ink">
            <ShieldCheck className="h-5 w-5 text-primary" strokeWidth={2} />
            Probada en 5 puntos
          </div>
          <div className="mt-3.5 flex flex-col gap-2.5">
            {QUALITY_CHECKS.map((check) => (
              <span key={check} className="flex items-center gap-2.5 text-sm text-body">
                <Check className="h-[15px] w-[15px] text-success" strokeWidth={3} />
                {check}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
