import Link from "next/link";
import { BRANDS } from "@/lib/site";

const PANEL = { background: "linear-gradient(180deg,#F8FAFC,#ffffff)" } as const;

export function SearchByBrand() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-10 min-[900px]:py-[52px]">
      <div className="rounded-[20px] border border-line px-8 py-[34px]" style={PANEL}>
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="text-[26px] font-semibold">Encontrá el repuesto exacto para tu TV</h2>
          <p className="mt-2 text-[15px] text-muted">
            Elegí la marca y filtramos los repuestos compatibles con tu modelo.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {BRANDS.map((brand) => (
            <Link
              key={brand}
              href="/productos"
              className="min-w-[110px] rounded-xl border border-line bg-white px-[22px] py-3 text-center font-display text-[15px] font-semibold text-body transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary"
            >
              {brand}
            </Link>
          ))}
          <Link
            href="/productos"
            className="min-w-[110px] rounded-xl border border-dashed border-line-strong bg-white px-[22px] py-3 text-center font-display text-[15px] font-semibold text-primary"
          >
            Ver todas →
          </Link>
        </div>
      </div>
    </section>
  );
}
