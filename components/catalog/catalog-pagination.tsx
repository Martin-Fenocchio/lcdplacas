import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";

const PAGE_BTN = "flex h-[38px] w-[38px] items-center justify-center rounded-[9px] border text-sm font-semibold";

export function CatalogPagination() {
  return (
    <div className="mt-10 flex flex-col items-center gap-5">
      <button
        type="button"
        className="h-[46px] rounded-[10px] border border-line-strong bg-white px-7 font-display text-sm font-semibold text-ink transition-colors hover:bg-surface"
      >
        Ver más productos
      </button>

      <nav className="flex items-center gap-1.5" aria-label="Paginación">
        <button type="button" aria-label="Anterior" className={cn(PAGE_BTN, "border-line bg-white text-muted")}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button type="button" aria-current="page" className={cn(PAGE_BTN, "border-primary bg-primary text-white")}>
          1
        </button>
        <button type="button" className={cn(PAGE_BTN, "border-line bg-white text-body")}>2</button>
        <button type="button" className={cn(PAGE_BTN, "border-line bg-white text-body")}>3</button>
        <span className="px-1 text-muted">…</span>
        <button type="button" className={cn(PAGE_BTN, "border-line bg-white text-body")}>9</button>
        <button type="button" aria-label="Siguiente" className={cn(PAGE_BTN, "border-line bg-white text-body")}>
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
}
