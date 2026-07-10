# LcdPlacas — Design System

> Visual language for the rebuild: color, type, spacing, components, motion.
> Direction: **white background, blue as the primary/highlight color**, modern & animated but **professional and trustworthy**.
> Companion doc: [`site-structure.md`](./site-structure.md).
> Note: token names below are suggestions for the eventual Tailwind v4 `@theme` in `app/globals.css`. Actual wiring is deferred (we're planning, not coding yet).

---

## 1. Design principles

1. **Trust first.** Clean, uncluttered, honest. Real photos, real contact info, generous whitespace. Nothing gimmicky.
2. **Blue = the brand.** White canvas, blue does the talking (CTAs, links, highlights, accents, price).
3. **Photos stay clean.** Product boards are shot on white — the UI stays light so they never fight a dark background.
4. **Fast + polished.** Motion is purposeful and quick, never blocking. Perceived performance is part of the design.
5. **Search-forward.** The search bar is a first-class visual element, not a small icon.
6. **Mobile-first & accessible.** Most Argentine shoppers are on mobile via WhatsApp; AA contrast and reduced-motion support are non-negotiable.

---

## 2. Brand

- **Mark:** the existing LcdPlacas logo — a TV screen drawn with circuit-board traces. Keep the concept; **refine** it into a crisp vector in the new blue palette (current mark is a light cyan). Provide a horizontal lockup (mark + "LcdPlacas") and a standalone mark for favicons/mobile.
- **Clear space & min size:** define once the vector exists.
- **Voice/tone:** confident, technical, friendly, plain Argentine Spanish. Speaks to technicians ("encontrá la placa exacta") without being cold to consumers.
- **Tagline options:** "Repuestos para TV LED, probados y garantizados" · "La placa exacta para tu TV".

---

## 3. Color palette

White base. A strong, professional blue as primary; a deep navy for text and dramatic surfaces; a cyan secondary that nods to the logo and enables a modern blue→cyan gradient.

### Primary — Blue
| Token | Hex | Use |
|---|---|---|
| `blue-50` | `#EFF6FF` | tinted section backgrounds, hover fills |
| `blue-100` | `#DBEAFE` | chips, subtle highlights |
| `blue-200` | `#BFDBFE` | borders on blue surfaces |
| `blue-500` | `#3B82F6` | accents, focus glow, gradients |
| **`blue-600`** | **`#2563EB`** | **primary** — buttons, links, active states |
| `blue-700` | `#1D4ED8` | primary hover; small text on white (better contrast) |
| `blue-800` | `#1E40AF` | pressed states |
| `blue-900` | `#1E3A8A` | deep accents |

> Contrast: `#2563EB` on white ≈ 4.5:1 (AA for normal text, just passing). For **small** text/links on white, prefer `blue-700 #1D4ED8` (≈ 5.9:1).

### Ink / Navy (text & dramatic surfaces)
| Token | Hex | Use |
|---|---|---|
| `ink-900` | `#0F172A` | headings, primary text; hero/footer surfaces |
| `ink-700` | `#334155` | body text |
| `ink-500` | `#64748B` | secondary text, captions |
| `ink-400` | `#94A3B8` | placeholder, disabled text |

> A navy surface (`ink-900`) is allowed for the **footer** and small accent bands to add depth — the *content/product* areas stay white per the brief.

### Neutrals
| Token | Hex | Use |
|---|---|---|
| `white` | `#FFFFFF` | page background (default everywhere) |
| `surface` | `#F8FAFC` | alternating section background, cards on white |
| `border` | `#E2E8F0` | dividers, card borders, inputs |
| `border-strong` | `#CBD5E1` | hover borders |

### Secondary — Cyan (accent only)
| Token | Hex | Use |
|---|---|---|
| `cyan-500` | `#06B6D4` | tech accent, icon details, gradient end |
| `cyan-400` | `#22D3EE` | glow/gradient highlight |

**Signature gradient:** `linear-gradient(135deg, #2563EB → #06B6D4)` — hero accents, highlights, active underlines. Use sparingly.

### Semantic
| Token | Hex | Use |
|---|---|---|
| `success` | `#16A34A` | "En stock", "Nueva" |
| `warning` | `#D97706` | "Bajo pedido", low stock |
| `danger` | `#DC2626` | "Sin stock", errors |
| **`whatsapp`** | **`#25D366`** | the WhatsApp CTA (primary buy channel — brand-accurate green, used deliberately) |

---

## 4. Typography

**Pairing (recommended):**
- **Display / headings:** `Space Grotesk` — geometric, engineered feel that fits electronics; supports Latin-Extended (accents, ñ).
- **Body / UI:** `Inter` — highly legible, trusted, excellent es-AR glyph coverage.
- **Numeric/código:** Inter tabular figures (or `Geist Mono` for part codes if we want a technical touch).

> Safe fallback: **Inter for everything** (headings just heavier/tighter). Fonts self-hosted via `next/font` for performance + no layout shift.

### Type scale
| Role | Size (rem/px) | Weight | Notes |
|---|---|---|---|
| Display | 3.5rem / 56 | 700 | hero only |
| H1 | 2.5rem / 40 | 700 | page titles |
| H2 | 1.875rem / 30 | 600 | section headers |
| H3 | 1.5rem / 24 | 600 | card/subsection |
| H4 | 1.25rem / 20 | 600 | |
| Body-lg | 1.125rem / 18 | 400 | intros |
| Body | 1rem / 16 | 400 | default |
| Small | 0.875rem / 14 | 400/500 | meta, código |
| Caption | 0.75rem / 12 | 500 | labels, badges |

Line-height: 1.15–1.25 headings, 1.5–1.6 body. Headings: `letter-spacing: -0.01em` to -0.02em. Fluid sizing (`clamp()`) between breakpoints.

---

## 5. Spacing, layout & grid

- **Base unit: 4px.** Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
- **Container:** max-width `1280px`, gutters 16px (mobile) → 24–32px (desktop).
- **Breakpoints (Tailwind defaults):** `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.
- **Product grid columns:** 2 (mobile) → 3 (md) → 4 (lg+). Consistent gap (16–24px).
- **Section rhythm:** vertical padding 64–96px desktop, 40–56px mobile.

---

## 6. Radius, shadows, elevation

- **Radius:** `sm 6px · md 10px · lg 16px · xl 24px · full 9999px`. Cards `lg`; buttons `md` (or `full` for pill CTAs); inputs `md`.
- **Shadows (soft, professional):**
  - `sm` — subtle card rest.
  - `md` — card hover / dropdowns.
  - `lg` — modals, cart drawer.
  - **`glow`** — blue-tinted shadow on primary CTA hover: `0 8px 24px rgba(37,99,235,0.25)`.
- Prefer borders + soft shadows over heavy drop shadows. Elevation increases on hover/active.

---

## 7. Iconography & imagery

- **Icons:** `Lucide` (consistent, modern line icons). Default 20–24px, `1.5–2px` stroke, `currentColor`.
- **Category icons:** one distinct icon per category (board, power, T-Con, LED strip, components).
- **Product photography:**
  - White/transparent background (matches the site) — this is why the site stays light.
  - Consistent aspect ratio (recommend **1:1** for cards, allow taller on detail gallery).
  - Consistent lighting/margins; centered part.
  - Optional brand-blue frame/backing on cards for cohesion.
- **Badges over images:** condition (Nueva / Scrap) top-left; "Sin stock" overlay when applicable.
- All images: next-gen formats, explicit dimensions, descriptive alt (brand + model + part).

---

## 8. Component specs (states matter)

### Buttons
- **Primary:** `blue-600` bg, white text, `md`/pill radius; hover `blue-700` + `glow`; active `blue-800`; disabled `ink-400` on `surface`; loading spinner.
- **WhatsApp CTA:** `whatsapp` green bg, white text, WhatsApp glyph — the main product/detail action.
- **Secondary:** white bg, `blue-600` text + border; hover `blue-50` fill.
- **Ghost/tertiary:** text-only blue link with animated underline.
- Sizes: sm / md / lg. Min touch target 44px on mobile.

### Product card
- Image (1:1) with subtle zoom on hover; condition/stock badge overlay.
- Title (2-line clamp), part code (small/mono), brand.
- Price (bold, `ink-900`) + "hasta 12 cuotas" small.
- Actions: **"Consultar por WhatsApp"** (green) primary + "Agregar" (blue) secondary, or reveal on hover.
- Hover: lift (`translateY(-4px)`) + `md` shadow + image zoom (motion §10).

### Category card / chip
- Icon + label; blue-tinted hover; used on home + as filter chips.

### Search bar
- Large, rounded, prominent; leading search icon; placeholder "Buscá por modelo de TV o código…"; autocomplete dropdown with grouped suggestions (Productos / Modelos / Códigos); recent searches.

### Filters
- Desktop: left sidebar with grouped facets (checkbox lists, price range, collapsible groups).
- Mobile: "Filtrar" button → bottom-sheet drawer.
- Active filters as removable chips above the grid; "Limpiar filtros".

### Header / nav
- Sticky, white, subtle bottom border on scroll; logo left, search center, nav + cart right.
- Categories via dropdown/mega-menu (icons + names).
- Mobile: hamburger drawer + full-width search.

### Price & cuotas
- Price prominent; "hasta 12 cuotas" secondary; "Ver cuotas y descuentos" as info link/popover.

### Badges / pills
- Condition (Nueva = success tint, Scrap = neutral/warning tint), stock (En stock = success, Sin stock = danger), "Nuevo ingreso".

### Cart drawer
- Slide-in from right; line items with qty stepper + remove; subtotal; **"Finalizar por WhatsApp"** (green) primary. Empty state illustration + CTA.

### Quantity stepper
- `– [ n ] +`, min 1, keyboard accessible.

### Breadcrumbs
- Inicio / Categoría / Producto; small, `ink-500`, current in `ink-900`.

### Forms & inputs
- `md` radius, `border` default, `blue-500` focus ring (2px) + subtle glow; clear labels; inline validation; error in `danger`.

### Feedback
- **Toasts** for add-to-cart / copied-código.
- **Skeleton loaders** (shimmer) for grids and product pages.
- **Empty states** (no results) with search tips + category links.

### Pagination / "Ver más"
- Crawlable numbered pages (SEO) with an optional "Ver más" enhancement.

### Trust strip
- "Probadas en 5 puntos" as an icon row (5 checks) + supporting photo/video; value-props row (envíos, compra segura, garantía, WhatsApp).

### WhatsApp floating button
- Fixed bottom-right, green, gentle pulse on load, tooltip "¿Necesitás ayuda?".

---

## 9. Responsive behavior (key adaptations)

- Header: full nav → hamburger + full-width search under `md`.
- Product grid: 4 → 3 → 2 cols.
- Filters: sidebar → bottom-sheet drawer.
- Product detail: two-column (gallery | info) → stacked.
- Cart: drawer on all sizes; full-page fallback on very small screens.
- Tap targets ≥ 44px; sticky "Consultar por WhatsApp" bar on mobile product pages.

---

## 10. Motion & animation system

**Principles:** purposeful, quick, subtle; enhances perceived speed; never blocks interaction; always respects `prefers-reduced-motion` (disable transforms/parallax, keep instant states).

**Tokens**
- Duration: `fast 150ms · base 200ms · slow 300ms · reveal 500ms`.
- Easing: enter `cubic-bezier(0.16, 1, 0.3, 1)` (smooth-out); exit `ease-in`; hovers `ease-out`.
- Recommended lib: **Motion / Framer Motion** for orchestration; plain CSS for hovers/transitions. (Choice confirmable at build time.)

**Catalog of animations**
| Where | Animation |
|---|---|
| Hero | fade/slide-up entrance; subtle animated blue→cyan gradient or slow circuit-line parallax |
| Section reveal | scroll-triggered fade + slide-up, **staggered** for grids/cards |
| Product card hover | lift + soft shadow + image zoom (1.03–1.05) |
| Category cards | icon micro-motion + blue tint on hover |
| Add to cart | button success morph + fly-to-cart + toast + cart badge bump |
| Search | dropdown fade/slide; highlight matched text |
| Drawers (cart/filters) | slide-in + backdrop fade |
| Route change | quick cross-fade / top progress bar |
| Loading | skeleton shimmer; button spinner |
| Numbers | optional count-up on stats (e.g. "5 puntos") |
| Nav | animated underline / mega-menu fade |
| WhatsApp FAB | gentle pulse |

Keep total motion tasteful — a couple of signature moments (hero, card hover, add-to-cart), not motion everywhere.

---

## 11. Accessibility

- Color contrast AA min (use `blue-700` for small text/links on white).
- Visible focus states (blue focus ring) on all interactive elements.
- Full keyboard nav (menus, drawers, steppers, modals with focus trap).
- Semantic HTML + ARIA on custom widgets (search combobox, dialogs).
- `prefers-reduced-motion` honored throughout.
- Descriptive `alt` text; form labels; adequate tap targets.

---

## 12. Dark mode (future, optional)

Primary experience is **light** (white background keeps product photos clean — a firm project constraint). A dark mode is possible later but would require product images with transparent/neutralized backgrounds first. Not part of v1.

---

## 13. Tailwind v4 mapping (reference, deferred)

The repo already uses **Tailwind v4 (CSS-first, no `tailwind.config.js`)**. When we build, these tokens become `@theme` variables in `app/globals.css` (e.g. `--color-blue-600: #2563EB;`, `--color-whatsapp: #25D366;`, `--font-display`, `--font-sans`, radius/shadow variables). Fonts load via `next/font`. Exact wiring is out of scope for this planning phase.

---

## 14. Visual guardrails (do / don't)

**Do:** keep it white + airy; let blue lead; one or two signature animations; consistent 1:1 product images; generous spacing; real photos and real contact info.

**Don't:** dark full-page backgrounds; rainbow of accent colors; heavy drop shadows; motion on everything; tiny low-contrast blue text on white; clip-art or stocky imagery that undercuts trust.
