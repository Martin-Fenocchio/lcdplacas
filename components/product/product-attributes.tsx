import { cn } from "@/lib/cn";
import type { ProductDetail } from "@/lib/products";

export function ProductAttributes({ product }: { product: ProductDetail }) {
  const attributes: { label: string; value: string; mono?: boolean }[] = [
    { label: "Marca", value: product.brand },
    { label: "Tipo", value: product.type },
    { label: "Estado", value: product.condition },
    { label: "Código de parte", value: product.code, mono: true },
    { label: "Modelos de TV compatibles", value: product.compatibleModels },
    { label: "Garantía", value: "Probada en 5 puntos" },
  ];

  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-2 pt-10">
      <h2 className="mb-[18px] text-[22px] font-semibold">Características</h2>
      <div className="grid grid-cols-3 gap-3.5 max-[899px]:grid-cols-1">
        {attributes.map((attr) => (
          <div key={attr.label} className="rounded-xl border border-line px-[18px] py-4">
            <div className="text-[12.5px] font-medium text-muted">{attr.label}</div>
            <div className={cn("mt-[3px] font-semibold text-ink", attr.mono && "font-mono text-sm")}>
              {attr.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
