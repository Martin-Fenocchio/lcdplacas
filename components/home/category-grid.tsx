import Link from "next/link";
import { CATEGORIES } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, CategoryGlyph } from "@/components/ui/icons";

export function CategoryGrid() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-[1280px] px-6 py-[72px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-white">Categorías</h2>
            <p className="mt-1.5 text-base text-faint">Encontrá el tipo de repuesto que necesitás.</p>
          </div>
          <Link href="/productos" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky hover:text-sky">
            Ver todos los productos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-[26px] grid grid-cols-2 gap-4 max-[560px]:grid-cols-1 min-[900px]:grid-cols-5">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.slug} delay={0.02 + i * 0.05} className="h-full">
              <Link
                href="/productos"
                className="flex h-full flex-col gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-[22px] transition-[translate,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-sky/60 hover:bg-white/[0.07] hover:shadow-[0_16px_34px_-20px_rgba(37,99,235,0.7)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-sky">
                  <CategoryGlyph icon={cat.icon} className="h-6 w-6" />
                </span>
                <div>
                  <div className="font-display text-base font-semibold text-white">{cat.name}</div>
                  <div className="mt-0.5 text-[13px] text-faint">{cat.tagline}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
