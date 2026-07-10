import type { Metadata } from "next";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/lib/products";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/ui/product-card";
import { FiltersSidebar } from "@/components/catalog/filters-sidebar";
import { ChevronDown, Search, Sliders } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Catálogo de repuestos para TV LED: placas main, fuentes, T-Con, tiras de LED y componentes. Filtrá por marca, modelo de TV y estado.",
  alternates: { canonical: "/productos" },
};

const SORT_OPTIONS = ["Más nuevo", "Precio: menor a mayor", "Precio: mayor a menor", "Relevancia"];

export default function CatalogPage() {
  return (
    <main>
      {/* Breadcrumb + title */}
      <div className="mx-auto max-w-[1280px] px-6 pt-[26px]">
          <nav className="flex items-center gap-2 text-[13px] text-muted" aria-label="Migas de pan">
            <Link href="/" className="text-muted">Inicio</Link>
            <span className="text-line-strong">/</span>
            <span className="font-medium text-ink">Productos</span>
          </nav>

          <div className="mt-3.5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold">Productos</h1>
              <p className="mt-1.5 text-[15px] text-muted">
                <strong className="text-ink">{ALL_PRODUCTS.length}</strong> repuestos probados y garantizados
              </p>
            </div>
            <div className="flex w-full items-center justify-between gap-2.5 min-[1000px]:w-auto min-[1000px]:justify-end">
              <button
                type="button"
                className="inline-flex h-[42px] items-center gap-[7px] rounded-[10px] border border-line bg-white px-4 text-sm font-semibold text-body min-[1000px]:hidden"
              >
                <Sliders className="h-4 w-4" />
                Filtrar
              </button>
              <div className="flex items-center gap-2">
                <span className="hidden whitespace-nowrap text-[13px] text-muted min-[400px]:inline">Ordenar:</span>
                <div className="relative">
                  <select
                    aria-label="Ordenar productos"
                    className="h-[42px] cursor-pointer appearance-none rounded-[10px] border border-line bg-white pl-3.5 pr-[38px] text-sm font-medium text-ink outline-none"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-[13px] top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters + results */}
        <div className="mx-auto max-w-[1280px] px-6 pb-[72px] pt-[22px]">
          <div className="grid grid-cols-1 items-start gap-8 min-[1000px]:grid-cols-[272px_1fr]">
            <FiltersSidebar />

            <div>
              <form action="/productos" className="relative mb-5">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-[19px] w-[19px] -translate-y-1/2 text-muted" />
                <input
                  type="search"
                  name="q"
                  placeholder="Buscá por modelo de TV o código…"
                  aria-label="Buscar repuestos"
                  className="h-[50px] w-full rounded-xl border border-line-strong bg-white pl-[46px] pr-[18px] text-[15px] text-ink outline-none focus:border-primary"
                />
              </form>

              <div className="grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 min-[900px]:gap-5">
                {ALL_PRODUCTS.map((product, i) => (
                  <Reveal key={product.slug} delay={Math.min(i, 11) * 0.04} className="h-full">
                    <ProductCard product={product} priority={i < 3} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}
