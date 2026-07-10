"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { waLink } from "@/lib/site";
import { Grid, Home, Search, Whatsapp } from "@/components/ui/icons";

const tab = (active: boolean) =>
  cn(
    "flex flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors",
    active ? "text-primary" : "text-muted",
  );

/**
 * App-like bottom navigation for mobile. Hidden on desktop, and hidden on
 * product pages (which show a sticky purchase bar instead). Replaces the
 * floating WhatsApp button on mobile.
 */
export function MobileTabBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/producto/")) return null;

  const focusSearch = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("lcd:open-search"));
  };

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-50 flex h-16 border-t border-line bg-white/95 backdrop-blur-md min-[900px]:hidden"
    >
      <Link href="/" className={tab(pathname === "/")}>
        <Home className="h-5 w-5" />
        Inicio
      </Link>
      <Link href="/productos" className={tab(pathname.startsWith("/productos"))}>
        <Grid className="h-5 w-5" />
        Productos
      </Link>
      <button type="button" onClick={focusSearch} className={tab(false)}>
        <Search className="h-5 w-5" />
        Buscar
      </button>
      <a href={waLink("Hola, tengo una consulta sobre un repuesto.")} target="_blank" rel="noopener noreferrer" className={tab(false)}>
        <Whatsapp className="h-5 w-5 text-whatsapp" />
        WhatsApp
      </a>
    </nav>
  );
}
