import Link from "next/link";
import {
  CATEGORIES,
  HELP_LINKS,
  LEGAL_LINKS,
  PAYMENT_METHODS,
  SITE,
} from "@/lib/site";
import { Mail, MapPin, Phone, TvLogo } from "@/components/ui/icons";

const LOGO_GRADIENT = { backgroundImage: "linear-gradient(135deg,#2563EB,#06B6D4)" };

function ColumnTitle({ children }: { children: string }) {
  return (
    <div className="font-display text-sm font-semibold uppercase tracking-[0.02em] text-white">
      {children}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink text-faint">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 pb-7 pt-14 md:grid-cols-2 min-[900px]:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <div className="flex items-center gap-[11px]">
            <span className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-[11px]" style={LOGO_GRADIENT}>
              <TvLogo className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-[19px] font-bold text-white">
              Lcd<span className="text-sky">Placas</span>
            </span>
          </div>
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed">
            Repuestos para TV LED, probados y garantizados. Placas main, fuentes, T-Con, tiras de LED y componentes.
          </p>
          <div className="mt-[18px] flex flex-col gap-2 text-sm">
            <span className="flex items-center gap-[9px]">
              <MapPin className="h-4 w-4 shrink-0 text-sky" />
              {SITE.address}
            </span>
            <a href={SITE.phoneHref} className="flex items-center gap-[9px] text-faint hover:text-white">
              <Phone className="h-4 w-4 shrink-0 text-sky" />
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-[9px] text-faint hover:text-white">
              <Mail className="h-4 w-4 shrink-0 text-sky" />
              {SITE.email}
            </a>
          </div>
        </div>

        <div>
          <ColumnTitle>Categorías</ColumnTitle>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href="/productos" className="text-faint hover:text-white">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <ColumnTitle>Ayuda</ColumnTitle>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            {HELP_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="text-faint hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <ColumnTitle>Medios de pago y envío</ColumnTitle>
          <div className="mt-4 flex flex-wrap gap-2">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="rounded-lg border border-white/[0.12] px-3 py-1.5 text-[12.5px] text-slate-300"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-[18px] text-[13px]">
          <span>© 2026 LcdPlacas · TecnoAudio. Todos los derechos reservados.</span>
          <div className="flex gap-[18px]">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="text-faint hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
