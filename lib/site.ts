/**
 * Central site configuration: brand, contact channels, navigation and taxonomy.
 * Everything user-facing that isn't page-specific lives here.
 */

export const SITE = {
  name: "LcdPlacas",
  legalName: "LcdPlacas · TecnoAudio",
  url: "https://www.lcdplacas.com",
  description:
    "Repuestos para TV LED, probados y garantizados. Placas main, fuentes, T-Con, tiras de LED y componentes. Encontrá la placa exacta para tu TV por marca, modelo o código de parte.",
  locale: "es-AR",
  email: "tecnoaudio@yahoo.com.ar",
  phoneDisplay: "011 5961 8575",
  phoneHref: "tel:+541159618575",
  address: "Sarandí 467, Merlo, Buenos Aires",
  /** International format for wa.me links (54 + 9 + area 11 + number). */
  whatsappNumber: "5491159618575",
} as const;

/** Build a WhatsApp deep link, optionally with a prefilled message. */
export function waLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const NAV_ITEMS = [
  { label: "Inicio", href: "/", key: "inicio" },
  { label: "Productos", href: "/productos", key: "productos" },
  { label: "Categorías", href: "/productos", key: "categorias", hasChevron: true },
  { label: "Cómo comprar", href: "#", key: "como-comprar" },
  { label: "Contacto", href: "#", key: "contacto" },
] as const;

export type CategoryIcon =
  | "placas"
  | "fuentes"
  | "tcon"
  | "tiras"
  | "componentes";

export const CATEGORIES: {
  name: string;
  tagline: string;
  slug: string;
  icon: CategoryIcon;
}[] = [
  { name: "Placas Main", tagline: "Monoplacas y main", slug: "placas-main", icon: "placas" },
  { name: "Fuentes", tagline: "Power supply", slug: "fuentes", icon: "fuentes" },
  { name: "T-Con", tagline: "Placas T-Con", slug: "t-con", icon: "tcon" },
  { name: "Tiras de LEDs", tagline: "Backlight", slug: "tiras-de-leds", icon: "tiras" },
  { name: "Componentes", tagline: "Repuestos varios", slug: "componentes", icon: "componentes" },
];

export const BRANDS = ["Hisense", "Noblex", "Sansei", "LG", "Philco", "Sanyo"] as const;

export const PAYMENT_METHODS = ["Transferencia", "Efectivo", "Depósito", "Correo Argentino"] as const;

export const HELP_LINKS = [
  { label: "Cómo comprar", href: "#" },
  { label: "Envíos", href: "#" },
  { label: "Garantía", href: "#" },
  { label: "Preguntas frecuentes", href: "#" },
  { label: "Contacto", href: "#" },
] as const;

export const LEGAL_LINKS = [
  { label: "Botón de arrepentimiento", href: "#" },
  { label: "Términos y condiciones", href: "#" },
  { label: "Privacidad", href: "#" },
] as const;
