"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { NAV_ITEMS } from "@/lib/site";
import { Cart, ChevronDown, Search, TvLogo } from "@/components/ui/icons";

const LOGO_GRADIENT = { backgroundImage: "linear-gradient(135deg,#2563EB,#06B6D4)" };

function activeKey(pathname: string): string | null {
  if (pathname === "/") return "inicio";
  if (pathname.startsWith("/productos")) return "productos";
  return null;
}

export function SiteHeader() {
  const active = activeKey(usePathname());

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-6 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-[11px]">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-[11px] shadow-[0_4px_12px_rgba(37,99,235,0.28)]"
            style={LOGO_GRADIENT}
          >
            <TvLogo className="h-[22px] w-[22px] text-white" />
          </span>
          <span className="font-display text-xl font-bold tracking-[-0.02em] text-ink">
            Lcd<span className="text-primary">Placas</span>
          </span>
        </Link>

        <form action="/productos" className="relative mx-auto hidden max-w-[560px] flex-1 min-[900px]:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
          <input
            type="search"
            name="q"
            placeholder="Buscá por modelo de TV o código…"
            aria-label="Buscar repuestos"
            className="h-11 w-full rounded-[10px] border border-line bg-surface pl-[42px] pr-4 text-sm text-body outline-none focus:border-primary"
          />
        </form>

        <nav className="hidden shrink-0 items-center gap-[22px] text-sm font-medium min-[900px]:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "inline-flex items-center gap-1 transition-colors",
                active === item.key ? "font-semibold text-primary" : "text-body hover:text-ink",
              )}
            >
              {item.label}
              {"hasChevron" in item && item.hasChevron && <ChevronDown className="h-[15px] w-[15px]" />}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Ver carrito"
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-line bg-white"
        >
          <Cart className="h-5 w-5 text-ink" />
          <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">
            0
          </span>
        </button>
      </div>
    </header>
  );
}
