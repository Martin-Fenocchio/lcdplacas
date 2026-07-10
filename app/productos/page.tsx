import type { Metadata } from "next";
import Link from "next/link";
import { CATALOG_PRODUCTS } from "@/lib/products";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/ui/product-card";
import { FiltersSidebar } from "@/components/catalog/filters-sidebar";
import { CatalogPagination } from "@/components/catalog/catalog-pagination";
import { ChevronDown, Search, Sliders, X } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Catálogo de repuestos para TV LED: placas main, fuentes, T-Con, tiras de LED y componentes. Filtrá por marca, modelo de TV y estado.",
  alternates: { canonical: "/productos" },
};

const SORT_OPTIONS = ["Más nuevo", "Precio: menor a mayor", "Precio: mayor a menor", "Relevancia"];
const ACTIVE_FILTERS = ["Hisense", "En stock"];

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
                <strong className="text-ink">124</strong> repuestos · resultados para{" "}
                <strong className="text-ink">“55U60H”</strong>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2.5">
              <button
                type="button"
                className="inline-flex h-[42px] items-center gap-[7px] rounded-[10px] border border-line bg-white px-4 text-sm font-semibold text-body min-[1000px]:hidden"
              >
                <Sliders className="h-4 w-4" />
                Filtrar
              </button>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-[13px] text-muted">Ordenar:</span>
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
              <form action="/productos" className="relative mb-4">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-[19px] w-[19px] -translate-y-1/2 text-muted" />
                <input
                  type="search"
                  name="q"
                  defaultValue="55U60H"
                  placeholder="Buscá por modelo de TV o código…"
                  aria-label="Buscar repuestos"
                  className="h-[50px] w-full rounded-xl border border-line-strong bg-white pl-[46px] pr-[18px] text-[15px] text-ink outline-none focus:border-primary"
                />
              </form>

              <div className="mb-5 flex flex-wrap items-center gap-2">
                {ACTIVE_FILTERS.map((filter) => (
                  <span
                    key={filter}
                    className="inline-flex items-center gap-[7px] rounded-full border border-primary-softer bg-primary-soft px-3 py-1.5 text-[13px] font-medium text-primary-hover"
                  >
                    {filter}
                    <X className="h-[13px] w-[13px]" />
                  </span>
                ))}
                <Link href="/productos" className="ml-1 text-[13px] font-medium">
                  Limpiar filtros
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-5 max-[899px]:grid-cols-2 max-[560px]:grid-cols-1">
                {CATALOG_PRODUCTS.map((product, i) => (
                  <Reveal key={product.slug} delay={i * 0.04} className="h-full">
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>

              <CatalogPagination />
            </div>
          </div>
        </div>
    </main>
  );
}
