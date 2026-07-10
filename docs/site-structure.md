# LcdPlacas — Site Structure & Pages

> Planning document for the from-scratch rebuild of **lcdplacas.com**.
> Focus: information architecture, pages, content, search, trust and SEO.
> **Not** covered here (deliberately, for now): database choice, product-upload method, payment gateways.
> Companion doc: [`design-system.md`](./design-system.md).

---

## 1. What we're building

A modern, fast, professional e-commerce for **LcdPlacas** — sale of **repair parts for LED TVs** (main boards, power supplies, T-Con boards, LED strips, components). It replaces the current generic Empretienda template with a custom, SEO-optimized, animated site that transmits **trust and professionalism**.

- **Business:** LcdPlacas / TecnoAudio — Sarandí 467, Merlo, Pcia. de Buenos Aires, Argentina.
- **Contact:** WhatsApp `11-5961-8575` · Tel `011 5961 8575` · `tecnoaudio@yahoo.com.ar`.
- **Language / locale:** Spanish (Argentina) — `es-AR`. All UI copy in Spanish.
- **Currency:** Argentine Peso (ARS), format `$250.000,00`. Show "hasta 12 cuotas" where relevant.
- **No online payment.** Sales close via WhatsApp; payment is offline (transferencia / efectivo / depósito).

### Primary audience
TV **repair technicians / service shops** who search by exact TV brand + model + part code, plus some end consumers repairing their own TV. This drives the **search-first** design.

### Locked decisions (from kickoff)
| Decision | Choice |
|---|---|
| Buy flow | **WhatsApp-first per product** (primary), **cart → WhatsApp order** as secondary for multi-item |
| Discovery | **Search + filters** (brand / part type / condition / TV model), built to swap in **Algolia** later |
| Theme | **White background**, **blue** as primary/highlight color; modern + animated + professional |
| Deploy target | Vercel (technical details out of scope for now) |

---

## 2. Sitemap (information architecture)

```
/                                 Home
/productos                        Catalog (all products) — search + filters
/productos?q=&marca=&tipo=&...    Catalog with search/filter state in URL
/categoria/placas-main            Category: Placas Main y monoplacas
/categoria/fuentes                Category: Fuentes
/categoria/t-con                  Category: T-Con
/categoria/tiras-de-leds          Category: Tiras de LEDs
/categoria/componentes            Category: Componentes
/producto/[slug]                  Product detail
/carrito                          Cart (secondary flow)
/pedido                           Order summary → send to WhatsApp
/buscar?q=                        Search results (can be same as /productos)
/como-comprar                     How to buy (WhatsApp flow explained)
/envios                           Shipping info (Correo Argentino, plazos, costos)
/garantia                         Warranty + "probadas en 5 puntos" quality process
/preguntas-frecuentes             FAQ
/sobre-nosotros                   About / trust story
/contacto                         Contact (form + map + channels)
/boton-de-arrepentimiento         Legal (mandatory in Argentina)
/terminos-y-condiciones           Legal
/politica-de-privacidad           Legal
/404                              Not found
```

**URL notes**
- Keep URLs short, lowercase, accent-free, hyphenated, in Spanish (good for SEO + shareability).
- Decide category prefix: recommend **`/categoria/<cat>`** and **`/producto/<slug>`** (clean, unambiguous, avoids collisions). Product slug pattern: `placa-main-hisense-55u60h-rsag7820-11493`.
- Preserve current live URLs where possible, or add 301 redirects from the old `/categoria/producto` paths to protect existing SEO.

---

## 3. Global elements (present on every page)

### Header (sticky)
- Logo (LcdPlacas mark, links home).
- **Prominent search bar** — "Buscá tu repuesto por modelo de TV o código" — with autocomplete. This is the hero of navigation, not an afterthought.
- Primary nav: Inicio · Productos · Categorías (dropdown/mega-menu of the 5 categories) · Cómo comprar · Contacto.
- Cart icon with item count (secondary flow).
- On mobile: hamburger + full-width search.

### Footer
- Contact block: address, phone, WhatsApp, email (real, verifiable → trust).
- Category links + useful pages (Envíos, Garantía, FAQ, Cómo comprar).
- Legal: Botón de arrepentimiento, Términos, Privacidad.
- Payment methods accepted (transferencia, efectivo, depósito) + shipping (Correo Argentino) as icons.
- Social links if any.
- Small print / copyright. Remove the "Tienda creada con Empretienda" credit.

### Floating WhatsApp button
Fixed bottom-right on all pages; opens chat with a context-aware prefilled message.

### Announcement bar (optional, dismissible)
Thin top strip for one message, e.g. "Envíos a todo el país por Correo Argentino · Placas probadas en 5 puntos".

---

## 4. Page-by-page breakdown

### 4.1 Home `/`
**Purpose:** communicate what LcdPlacas sells, build instant trust, push people into search/categories.

Sections top → bottom:
1. **Hero** — headline ("Repuestos para TV LED, probados y garantizados"), subcopy, big search bar, primary CTA. Modern visual (subtle circuit/tech motif in brand blue; keep it light, not a dark theme). Animated entrance.
2. **Category shortcuts** — 5 category cards with icons (Placas Main, Fuentes, T-Con, Tiras de LEDs, Componentes).
3. **Search-by-TV prompt** — reinforce "Encontrá el repuesto exacto para tu TV" with brand logos (LG, Noblex, Hisense, Philco, Sansei…) as quick filters.
4. **Últimos ingresos** — grid of latest products (product cards).
5. **Trust strip — "Probadas en 5 puntos"** — the quality process (Sintonía · Sonido · Salidas de LEDs · Entradas USB/HDMI · Conectividad), with the real testing photo/video. This is a key differentiator; give it a proper, well-designed section.
6. **Value props row** — Envíos a todo el país · Compra segura · Atención por WhatsApp · Garantía.
7. **How to buy (mini)** — 3 steps: Buscá → Consultá por WhatsApp → Recibí en tu casa.
8. **Testimonials / reviews** (if available; otherwise a "future" placeholder — see §10).
9. Footer.

**SEO:** `Organization` + `LocalBusiness` structured data lives here (or in root layout). Rich meta description covering "repuestos, placas main, fuentes, T-Con, tiras de LED para TV LED".

### 4.2 Catalog `/productos`
**Purpose:** the workhorse — browse, search, filter everything.

- Breadcrumb: Inicio / Productos.
- **Search input** (syncs with `?q=`).
- **Filters** (left sidebar on desktop, bottom-sheet/drawer on mobile):
  - Marca (LG, Noblex, Hisense, Philco, Sansei, …)
  - Tipo / categoría (the 5 categories)
  - Estado / condición (Nueva · Scrap nueva · Scrap usada)
  - Disponibilidad (En stock / Sin stock)
  - Rango de precio
  - (Later, via Algolia) TV model / part code fuzzy match.
- **Sort:** Más nuevo · Precio ↑ · Precio ↓ · Relevancia.
- **Product grid** (2/3/4 cols responsive) with skeleton loaders while fetching.
- **Pagination** or infinite "Ver más" (keep crawlable URLs — see SEO).
- All filter/sort/search state lives in the **URL query string** (shareable, back-button friendly, indexable canonical decisions).

### 4.3 Category pages `/categoria/[cat]`
Same layout as catalog but pre-scoped to one category, with:
- Category H1 + short intro paragraph (SEO copy: what this part does, common failures, TVs it fits).
- Same filters/sort/grid.
- `BreadcrumbList` structured data.

### 4.4 Product detail `/producto/[slug]`
**Purpose:** convert. Lead with WhatsApp.

- Breadcrumb: Inicio / [Categoría] / [Producto].
- **Gallery** — main image + thumbnails, zoom on hover/tap. (Product photos are on white backgrounds — keep the page background white.)
- **Title** (H1) = full descriptive name incl. brand + model + code.
- **Key attributes** block: Marca · Modelo(s) de TV compatibles · Código de parte · Tipo · Estado (Nueva/Scrap…).
- **Price** + "hasta 12 cuotas" + "Ver cuotas y descuentos" (informational).
- **Stock state**: En stock / Sin stock / Bajo pedido.
- **Primary CTA: "Consultar / Comprar por WhatsApp"** — prefilled message: `Hola, quiero consultar por: <título> (código <código>) — <url>`.
- **Secondary CTA: "Agregar al carrito"** + quantity stepper.
- **Shipping calculator** — "Calculá el costo de envío" by postal code (Correo Argentino).
- **Description** — long text (compatibility notes, condition details, what's included).
- **Trust reminders** — "Probada en 5 puntos", garantía, envíos.
- **Related products** — "Repuestos para el mismo TV" / same category.
- **SEO:** `Product` structured data (name, image, description, sku=código, brand, offers with price/availability/priceCurrency ARS), `BreadcrumbList`.

### 4.5 Cart `/carrito` (secondary flow)
- List of items (image, title, código, qty stepper, unit + line price, remove).
- Subtotal.
- **"Finalizar pedido por WhatsApp"** → builds a formatted message with all items, quantities and total, opens WhatsApp.
- Empty state with CTA back to catalog.
- Persist cart in `localStorage` (no accounts needed for v1).

### 4.6 Order summary `/pedido`
Optional intermediate step before WhatsApp: confirm items + optional name/CP, then generate the WhatsApp message. Can be merged into the cart.

### 4.7 Contact `/contacto`
- Channels: WhatsApp (primary), phone, email.
- Contact form (name, email, message) → email/WhatsApp.
- Address + embedded map (Sarandí 467, Merlo).
- Hours.
- `LocalBusiness` structured data.

### 4.8 About / Sobre nosotros `/sobre-nosotros`
New page (current site lacks one). Story, experience, workshop photos, the 5-point testing philosophy → **big trust lever + SEO**.

### 4.9 Support / info pages
- **Cómo comprar** — explains the WhatsApp flow step by step (removes friction from "no online payment").
- **Envíos** — Correo Argentino, plazos, costos, cómo se calcula.
- **Garantía** — warranty terms + the 5-point testing process in detail.
- **Preguntas frecuentes (FAQ)** — with `FAQPage` structured data (great for SEO rich results).

### 4.10 Legal
- **Botón de arrepentimiento** — mandatory in Argentina (link already exists on current site → keep/host our own).
- **Términos y condiciones**, **Política de privacidad**.

### 4.11 404 `/404`
Branded, helpful: search bar + category links + "volver al inicio".

---

## 5. Product content model (fields needed)

Independent of where data is stored, each product needs:

| Field | Notes |
|---|---|
| `title` | Full descriptive name |
| `slug` | URL-safe, unique |
| `category` | One of the 5 |
| `brand` | LG, Noblex, Hisense, Philco, Sansei, … (facet) |
| `compatibleTvModels[]` | e.g. `["55U60H"]` — powers search-by-TV |
| `partCode` | e.g. `RSAG7.820.11493` — acts as SKU (facet + search) |
| `condition` | Nueva · Scrap nueva · Scrap usada (facet) |
| `price` (ARS) | + `installments` flag |
| `stock` | En stock / Sin stock / Bajo pedido |
| `images[]` | 1..n, white background, consistent aspect ratio |
| `shortDescription` | brand/model/código/estado summary |
| `longDescription` | rich text |
| `seo` | meta title, meta description, OG image |
| `createdAt` | for "Últimos ingresos" + default sort |

**Taxonomy / facets for search:** `brand`, `category`, `condition`, `availability`, `priceRange`, `compatibleTvModels`, `partCode`.

---

## 6. Search & filtering (the killer feature)

- **Search input** is prominent in the header and hero; accepts TV model, part code, brand, or free text.
- **Autocomplete/suggestions** as the user types (product names, part codes, TV models).
- **Filters** as in §4.2. Multi-select facets; active filters shown as removable chips.
- **URL-driven state** so results are shareable and crawlable.
- **Architecture note (for later):** design the search UI and data shape so a hosted search engine (**Algolia**) can be dropped in — records = products with `brand/category/condition/partCode/compatibleTvModels` as facets, `title/description` searchable. Until then, a simple client/server filter over the product list is fine. (Implementation deferred.)

---

## 7. Trust & conversion elements (used across the site)

The whole point of the rebuild is trust + professionalism. Recurring cues:
- **"Probadas en 5 puntos"** badge/section (unique selling point).
- **Garantía** messaging.
- Real, verifiable **address, phone, WhatsApp, email**.
- **Envíos a todo el país** (Correo Argentino).
- Known **payment methods** iconography.
- **Botón de arrepentimiento** + legal pages (signals legitimacy in AR market).
- **Reviews/testimonials** (future — needs a source).
- Fast load + polished animations = perceived quality.

---

## 8. SEO plan (must be excellent)

**Structure-level (do from day one):**
- Clean, keyword-rich Spanish URLs (§2).
- Unique `<title>` + meta description per page; templated for products/categories.
- **Structured data (JSON-LD):**
  - `Organization` + `LocalBusiness` (site-wide) — name, address, geo, phone, opening hours.
  - `Product` + `Offer` on product pages (price, ARS, availability, sku=partCode, brand).
  - `BreadcrumbList` on category + product pages.
  - `FAQPage` on the FAQ.
- **Open Graph + Twitter cards** for rich sharing (esp. WhatsApp link previews — important since sharing happens there).
- **`sitemap.xml`** (dynamic: all products + categories + static pages) and **`robots.txt`**.
- **Canonical URLs**; decide canonical handling for filtered/sorted catalog URLs (canonical to the clean category/catalog URL).
- **`hreflang="es-AR"`** / `lang="es-AR"`.
- **Image SEO:** descriptive `alt` (brand + model + part), optimized/next-gen formats, explicit dimensions.
- **Performance / Core Web Vitals:** image optimization, lazy-load below the fold, minimal JS, good LCP on hero + product images. (Vercel + Next.js image tooling helps — details later.)
- **Crawlable pagination** for the catalog (real paginated URLs, not JS-only infinite scroll).
- **Internal linking:** related products, category cross-links, breadcrumbs.
- Keyword themes: "repuesto/placa/fuente/T-Con/tira de LED para [marca] [modelo]", "placa main [modelo]", part codes.

---

## 9. Animations & interactions (high level)

Detailed spec lives in [`design-system.md`](./design-system.md). At the structure level:
- Hero entrance + subtle background motion.
- Scroll-reveal (staggered) for category cards, product grids, trust sections.
- Product card hover (lift + image zoom).
- Add-to-cart feedback (fly-to-cart / toast).
- Skeleton loaders for grids and product pages.
- Smooth page/route transitions.
- Mobile filter drawer + cart drawer slide-ins.
- All motion respects `prefers-reduced-motion`.

---

## 10. Content to migrate & to create

**Migrate from current site:** 5 categories, all existing products (title, price, image, código, estado), contact details, legal (botón de arrepentimiento), the 5-point testing photo/video, brand list.

**Create new:** Sobre nosotros, Cómo comprar, Envíos, Garantía, FAQ pages; hero + category imagery; refined product photography guidelines (see design doc); OG images.

---

## 11. Out of scope for v1 (future)

- Online payments / payment gateway.
- User accounts / login (cart persists in `localStorage` instead).
- Algolia integration (UI is built to accept it later).
- Reviews/testimonials backend.
- Blog / guides (SEO growth channel — later).
- Multi-language.

---

## 12. Open questions

1. Confirm final category names/slugs (keep current 5, or rename e.g. "Placas Main y monoplacas" → "Placas Main"?).
2. Is there a logo source file, or should the current TV+circuit mark be recreated/refined? (See design doc — brand section.)
3. Any real testimonials/reviews we can use for trust?
4. Should we keep the exact old product URLs (301 redirects) to preserve SEO, or accept new clean URLs?
5. Confirm business hours + whether to show a map embed on Contact.
