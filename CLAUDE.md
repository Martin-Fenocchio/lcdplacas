# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

**LcdPlacas** — a storefront for a TV-repair-parts business (placas main, fuentes, T-Con,
tiras de LED, componentes). Spanish (`es-AR`), ARS pricing. **Sales happen entirely over
WhatsApp and in person** — the site is a findable catalog that funnels to WhatsApp, not a
transactional store.

### Scope constraints — do NOT build these
- **No online payments / checkout.** The buy action is a prefilled WhatsApp message
  (`waLink()` in `lib/site.ts`). A cart, if ever added, only compiles items into one
  WhatsApp message.
- **No cookie tracking.** Analytics (PostHog) runs cookieless (`persistence: "memory"`),
  so no consent banner exists or is needed.
- **No legal / trust / FAQ pages** (owner's decision). Point dead nav/footer links at
  WhatsApp rather than creating pages.

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build (static; prerenders all product + category pages)
npm run start    # Serve the production build
npm run lint     # ESLint (flat config)
```

No test runner is configured. Data-pipeline scripts live in `scripts/` (run with
`psql` / `python3`, not npm) — see `scripts/README.md`.

## Architecture — how data flows

**Supabase = source of truth → committed snapshot → fully static site. Algolia = search.**

```
Supabase (edit products here) ──scripts/db-pull.sh──▶ data/products.json ──build──▶ static site
        └── scripts/push-algolia.py ─▶ Algolia index "products" (search)
```

- The app reads the **committed `data/products.json`** synchronously (`lib/products.ts`).
  It does **not** query Supabase at runtime → the site is fully static (fast, SEO-friendly,
  deploy-safe, no runtime DB env needed).
- **To change products:** edit in Supabase → `scripts/db-pull.sh` → `scripts/push-algolia.py`
  → redeploy. (`supabase/schema.sql` defines the table; `scripts/README.md` has the flow.)
- **Search:** Algolia via plain REST (no SDK) in `lib/search.ts` — `searchCatalog()` does
  faceted search with disjunctive facet counts + client-side price sort. UI is
  `components/catalog/catalog-browser.tsx`. The public search key is inlined (env-overridable),
  so search works with zero config.
- **Analytics:** `app/providers.tsx` — cookieless PostHog. No-ops unless
  `NEXT_PUBLIC_POSTHOG_KEY` is set.

### Key files
- `lib/products.ts` — loads `data/products.json`; derives brand/type/compatible-model/description;
  exports `ALL_PRODUCTS`, `getProductBySlug`, `productsByCategory`, `relatedProducts`, `LATEST_PRODUCTS`.
- `lib/search.ts` — Algolia faceted search + `hitToProduct`.
- `lib/site.ts` — `SITE` config, `waLink()`, `CATEGORIES` (slug === product `categorySlug`), `BRANDS`.
- `lib/structured-data.ts` — JSON-LD (Product, Breadcrumb, Organization, …).
- `app/productos/` (catalog), `app/productos/[categoria]/` (category landing), `app/producto/[slug]/` (PDP).
- `data/products.json` — the build-time snapshot generated from Supabase (committed).

### Environment
- **App runtime:** only `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` (optional).
  Products and search need **no** runtime env. Set the PostHog vars on Vercel for analytics.
- **Pipeline scripts** (local `.env.local`, git-ignored): `SUPABASE_DB_URL`, `ALGOLIA_APP_ID`,
  `ALGOLIA_WRITE_KEY`.

## Stack & conventions

- **Next.js 16 (App Router)** — routing/layouts/pages in `app/`. Per `@AGENTS.md`, this version
  has breaking changes vs. training data; consult `node_modules/next/dist/docs/` (start with
  `01-app/`) before writing framework code.
- **React 19** + **TypeScript** (`strict`).
- **Tailwind CSS v4** — CSS-first, **no `tailwind.config.js`**. Design tokens live in
  `app/globals.css` via `@import "tailwindcss"` and the `@theme inline` block; PostCSS uses
  `@tailwindcss/postcss`. ⚠️ v4 gotcha: `-translate-y-1` compiles to the `translate` property
  (not `transform`) — transition the right property (`transition-[translate,box-shadow,…]`).
- **Import alias:** `@/*` → repo root.
- **Fonts:** Inter (`--font-inter`, body) + Space Grotesk (`--font-space-grotesk`, display),
  via `next/font/google` in `app/layout.tsx`.
- **Theme:** single **light** theme — white background, blue primary (product photos are on
  white). No dark mode.
- **Images:** product photos come from the store's CloudFront CDN (`next.config.ts`
  `images.remotePatterns`), rendered with `next/image`.
