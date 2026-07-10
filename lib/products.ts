/**
 * Sample catalog data. This is placeholder content for the UI build —
 * the real data source (CMS / DB) is intentionally out of scope for now.
 */

export type Condition = "Nueva" | "Scrap nueva" | "Scrap usada";

export interface Product {
  slug: string;
  title: string;
  code: string;
  brand: string;
  condition: Condition;
  price: number;
  inStock: boolean;
  /** Placeholder image filename shown until real photography is wired in. */
  imageLabel?: string;
}

/** Home — "Últimos ingresos". */
export const LATEST_PRODUCTS: Product[] = [
  { slug: "placa-main-hisense-55u60h-rsag7820-11493", title: "Placa Main Hisense 55U60H", code: "RSAG7.820.11493", brand: "Hisense", condition: "Nueva", price: 84500, inStock: true },
  { slug: "fuente-noblex-dk55x7500-jcm55", title: "Fuente Noblex DK55X7500", code: "JCM55-D.CJ", brand: "Noblex", condition: "Scrap nueva", price: 42000, inStock: true },
  { slug: "placa-tcon-lg-43lm6300-6870c-0532a", title: "Placa T-Con LG 43LM6300", code: "6870C-0532A", brand: "LG", condition: "Nueva", price: 38900, inStock: true },
  { slug: "tira-led-philco-pld43fs7a-svj430a05", title: "Tira de LED Philco PLD43FS7A", code: "SVJ430A05", brand: "Philco", condition: "Nueva", price: 26500, inStock: false },
  { slug: "placa-main-sansei-tds2400-cv338h-a42", title: "Placa Main Sansei TDS2400", code: "CV338H-A42", brand: "Sansei", condition: "Scrap usada", price: 31000, inStock: true },
  { slug: "fuente-lg-50un7300-eax67872805", title: "Fuente LG 50UN7300 EAX67872805", code: "EAX67872805", brand: "LG", condition: "Nueva", price: 57800, inStock: true },
  { slug: "placa-tcon-samsung-un40j5200-bn41-02111a", title: "Placa T-Con Samsung UN40J5200", code: "BN41-02111A", brand: "Samsung", condition: "Scrap nueva", price: 29900, inStock: true },
  { slug: "tira-led-noblex-di43x6500-crh-k430", title: "Tira de LED Noblex DI43X6500", code: "CRH-K430", brand: "Noblex", condition: "Nueva", price: 22400, inStock: true },
];

/** Catálogo — results grid. */
export const CATALOG_PRODUCTS: Product[] = [
  { slug: "placa-main-hisense-55u60h-rsag7820-11493", title: "Placa Main Hisense 55U60H", code: "RSAG7.820.11493", brand: "Hisense", condition: "Nueva", price: 84500, inStock: true },
  { slug: "fuente-hisense-55u60h-rsag7820-10820", title: "Fuente Hisense 55U60H RSAG7", code: "RSAG7.820.10820", brand: "Hisense", condition: "Nueva", price: 51200, inStock: true },
  { slug: "placa-tcon-hisense-55u60h-hv550qub-f5a", title: "Placa T-Con Hisense 55U60H", code: "HV550QUB-F5A", brand: "Hisense", condition: "Scrap nueva", price: 39800, inStock: true },
  { slug: "tira-led-hisense-55u60h-jld550ea", title: "Tira de LED Hisense 55U60H", code: "JL.D550EA", brand: "Hisense", condition: "Nueva", price: 34500, inStock: true },
  { slug: "placa-main-hisense-50a6h-rsag7820-12146", title: "Placa Main Hisense 50A6H", code: "RSAG7.820.12146", brand: "Hisense", condition: "Nueva", price: 78900, inStock: true },
  { slug: "fuente-hisense-43a4h-rsag7820-11288", title: "Fuente Hisense 43A4H", code: "RSAG7.820.11288", brand: "Hisense", condition: "Scrap nueva", price: 44300, inStock: true },
  { slug: "placa-main-hisense-32a4h-rsag7820-12421", title: "Placa Main Hisense 32A4H", code: "RSAG7.820.12421", brand: "Hisense", condition: "Nueva", price: 62000, inStock: false },
  { slug: "placa-tcon-hisense-43a6h-cv338h-a50", title: "Placa T-Con Hisense 43A6H", code: "CV338H-A50", brand: "Hisense", condition: "Scrap usada", price: 28700, inStock: true },
  { slug: "tira-led-hisense-50a6h-jld500ea", title: "Tira de LED Hisense 50A6H", code: "JL.D500EA", brand: "Hisense", condition: "Nueva", price: 31900, inStock: true },
];

/** Producto — "Repuestos para el mismo TV". */
export const RELATED_PRODUCTS: Product[] = [
  { slug: "fuente-hisense-55u60h-rsag7820-10820", title: "Fuente Hisense 55U60H", code: "RSAG7.820.10820", brand: "Hisense", condition: "Nueva", price: 51200, inStock: true, imageLabel: "hisense_repuesto.jpg" },
  { slug: "placa-tcon-hisense-55u60h-hv550qub-f5a", title: "Placa T-Con Hisense 55U60H", code: "HV550QUB-F5A", brand: "Hisense", condition: "Scrap nueva", price: 39800, inStock: true, imageLabel: "hisense_repuesto.jpg" },
  { slug: "tira-led-hisense-55u60h-jld550ea", title: "Tira de LED Hisense 55U60H", code: "JL.D550EA", brand: "Hisense", condition: "Nueva", price: 34500, inStock: true, imageLabel: "hisense_repuesto.jpg" },
  { slug: "flex-hisense-55u60h-ccpd-tc550", title: "Flex de conexión Hisense 55U60H", code: "CCPD-TC550", brand: "Hisense", condition: "Nueva", price: 9800, inStock: true, imageLabel: "hisense_repuesto.jpg" },
];

export interface ProductDetail extends Product {
  category: string;
  categorySlug: string;
  type: string;
  compatibleModels: string;
  images: string[];
  description: string[];
  included: string;
}

/** Featured product used by the Producto detail page (UI build). */
export const FEATURED_PRODUCT: ProductDetail = {
  slug: "placa-main-hisense-55u60h-rsag7820-11493",
  title: "Placa Main Hisense 55U60H",
  code: "RSAG7.820.11493",
  brand: "Hisense",
  condition: "Nueva",
  price: 84500,
  inStock: true,
  category: "Placas Main",
  categorySlug: "placas-main",
  type: "Placa Main",
  compatibleModels: "55U60H · 55U6H",
  images: [
    "hisense_55u60h_main_01.jpg",
    "hisense_55u60h_main_02.jpg",
    "hisense_55u60h_main_03.jpg",
    "hisense_55u60h_main_04.jpg",
  ],
  description: [
    "Placa main (monoplaca) original para TV LED Hisense 55U60H. Reemplazo directo para fallas de encendido, imagen sin sonido, cartelería o falta de señal. Compatible con los modelos indicados.",
    "Cada unidad es probada en 5 puntos antes del envío: sintonía, sonido, salidas de LEDs, entradas USB/HDMI y conectividad. Se entrega lista para instalar.",
    "Incluye: 1 (una) placa main. No incluye cables ni flexes, salvo aclaración.",
  ],
  included: "1 (una) placa main. No incluye cables ni flexes, salvo aclaración.",
};

/** The 5-point quality check, reused across pages. */
export const QUALITY_CHECKS = [
  "Sintonía",
  "Sonido",
  "Salidas de LEDs",
  "Entradas USB / HDMI",
  "Conectividad",
] as const;

/** Tailwind classes for a condition badge. */
export function conditionBadgeClass(condition: Condition): string {
  return condition === "Nueva"
    ? "bg-success-soft text-success border border-success-border"
    : "bg-slate-100 text-slate-600 border border-line";
}

/** Placeholder image filename for a product card. */
export function imageLabelFor(product: Product): string {
  return product.imageLabel ?? `${product.brand.toLowerCase()}_placa.jpg`;
}
