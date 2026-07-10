/**
 * Product catalog. Data is loaded from `data/products.json` — real products
 * scraped from the current lcdplacas.com storefront (test batch of 30). Brand,
 * type, compatible model and display copy are derived here from the raw title
 * so the JSON can stay a faithful snapshot of what the live site exposes.
 * Swap the JSON import for a CMS/DB fetch when the real data source lands.
 */
import rawProducts from "@/data/products.json";

export type Condition = "Nueva" | "Scrap nueva" | "Scrap usada";

export interface Product {
  slug: string;
  title: string;
  /** Part number, e.g. "RSAG7.820.11493". Empty when the listing has none. */
  code: string;
  /** TV brand derived from the title. Empty for generic components. */
  brand: string;
  condition: Condition;
  price: number;
  inStock: boolean;
  category: string;
  categorySlug: string;
  /** "Placa Main", "Fuente", … derived from the category. */
  type: string;
  /** TV model(s) the part fits, derived from the title. Empty when unknown. */
  compatibleModels: string;
  /** Public image paths (`/products/…`). Empty falls back to a placeholder. */
  images: string[];
}

export interface ProductDetail extends Product {
  description: string[];
}

interface RawProduct {
  slug: string;
  title: string;
  code: string | null;
  price: number;
  currency: string;
  condition: string | null;
  category: string;
  categorySlug: string;
  description: string;
  url: string;
  images: string[];
}

/** TV brands sold, matched against the product title (longest-first-ish). */
const KNOWN_BRANDS = [
  "Hisense", "Noblex", "Sansei", "Sanyo", "Philco", "Samsung", "TCL", "RCA",
  "BGH", "JVC", "Kanji", "Enova", "Hitachi", "Panasonic", "Sharp", "Sony",
  "Top House", "Ken Brown", "Admiral", "Panavox", "LG",
];

const TYPE_BY_CATEGORY: Record<string, string> = {
  "placas-main-y-monoplacas": "Placa Main",
  fuentes: "Fuente",
  "t-con": "T-Con",
  "tiras-de-leds": "Tira de LED",
  componentes: "Componente",
};

function deriveBrand(title: string): string {
  for (const brand of KNOWN_BRANDS) {
    if (new RegExp(`\\b${brand}`, "i").test(title)) return brand;
  }
  return "";
}

/** Pull the TV model out of the title: the text between the brand and the code. */
function deriveModels(title: string, brand: string): string {
  if (!brand) return "";
  const head = title.split(/,|c[oó]digo/i)[0];
  const idx = head.toLowerCase().indexOf(brand.toLowerCase());
  if (idx < 0) return "";
  return head
    .slice(idx + brand.length)
    .replace(/\s+/g, " ")
    .trim();
}

/** Normalise the scraped condition; default unspecified listings to "Nueva". */
function normalizeCondition(raw: string | null): Condition {
  const value = (raw ?? "").toLowerCase();
  if (value.includes("usad")) return "Scrap usada";
  if (value.includes("scrap")) return "Scrap nueva";
  return "Nueva";
}

/** Build clean display copy from real attributes (site copy is very thin). */
function buildDescription(p: {
  title: string;
  type: string;
  brand: string;
  compatibleModels: string;
  code: string;
}): string[] {
  const intro = p.brand
    ? `${p.type} para TV LED ${p.brand}${p.compatibleModels ? ` ${p.compatibleModels}` : ""}` +
      `${p.code ? `, código ${p.code}` : ""}. Repuesto probado y listo para instalar.`
    : `${p.title}.`;

  return [
    intro,
    "Escribinos por WhatsApp para confirmar la compatibilidad con tu modelo antes de comprar. " +
      "Hacemos envíos a todo el país por Correo Argentino.",
  ];
}

function toProduct(raw: RawProduct): ProductDetail {
  const brand = deriveBrand(raw.title);
  const type = TYPE_BY_CATEGORY[raw.categorySlug] ?? "Repuesto";
  const code = raw.code ?? "";
  const compatibleModels = deriveModels(raw.title, brand);

  return {
    slug: raw.slug,
    title: raw.title,
    code,
    brand,
    condition: normalizeCondition(raw.condition),
    price: raw.price,
    inStock: true,
    category: raw.category,
    categorySlug: raw.categorySlug,
    type,
    compatibleModels,
    images: raw.images ?? [],
    description: buildDescription({ title: raw.title, type, brand, compatibleModels, code }),
  };
}

/** Every product, in catalog order. */
export const ALL_PRODUCTS: ProductDetail[] = (rawProducts as RawProduct[]).map(toProduct);

const BY_SLUG = new Map(ALL_PRODUCTS.map((p) => [p.slug, p]));

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return BY_SLUG.get(slug);
}

/** Round-robin across categories so the home strip shows variety. */
function interleaveByCategory(list: ProductDetail[], limit: number): ProductDetail[] {
  const groups = new Map<string, ProductDetail[]>();
  for (const p of list) {
    const g = groups.get(p.categorySlug);
    if (g) g.push(p);
    else groups.set(p.categorySlug, [p]);
  }
  const out: ProductDetail[] = [];
  let added = true;
  while (out.length < limit && added) {
    added = false;
    for (const g of groups.values()) {
      const next = g.shift();
      if (next) {
        out.push(next);
        added = true;
        if (out.length >= limit) break;
      }
    }
  }
  return out;
}

/** Home — "Últimos ingresos". */
export const LATEST_PRODUCTS: ProductDetail[] = interleaveByCategory(ALL_PRODUCTS, 8);

/** Producto — other parts in the same category (fallback: same brand). */
export function relatedProducts(product: Product, limit = 8): ProductDetail[] {
  const sameCategory = ALL_PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.categorySlug === product.categorySlug,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const sameBrand = product.brand
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.slug !== product.slug &&
          p.categorySlug !== product.categorySlug &&
          p.brand === product.brand,
      )
    : [];
  return [...sameCategory, ...sameBrand].slice(0, limit);
}

/** The quality check, reused across pages. */
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
    ? "bg-success-soft text-green-700 border border-success-border"
    : "bg-slate-100 text-slate-600 border border-line";
}
