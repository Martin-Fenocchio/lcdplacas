# LcdPlacas — TODO & Roadmap

Shared tracking file. **Section 1** = things only Martín can do (accounts, deploy,
real-world assets). **Section 2** = things Claude can build or is proposing.

> **Scope reminder:** WhatsApp-only sales. No online payments, no cookie tracking,
> no legal / trust / FAQ pages. (See `scripts/README.md` for the data pipeline.)

---

## ✅ Already done
- Full storefront (Home, Catálogo, Producto) — responsive, mobile-polished, animated.
- **218 real products** in **Supabase** (source of truth) → committed snapshot → static site.
- **Algolia** search: instant text search + faceted filters (brand / type / condition / price) + sort, on `/productos` and per-category pages.
- **Category landing pages** (`/productos/[categoria]`) — SEO'd, in the sitemap.
- Product photo **zoom** (desktop hover + mobile fullscreen lightbox).
- **PostHog** cookieless analytics — wired, waiting on the project key (see below).

---

## 👤 Section 1 — For Martín (only you can do these)

### PostHog
- [ ] Create the PostHog project.
- [ ] Send Claude the **Project API key** (`phc_…`) + **region** (US / EU) so it can be enabled + verified.
- [ ] Add to Vercel env vars: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`.

### Deploy (Vercel)
- [ ] Finish deploying the repo to Vercel.
- [ ] Env vars on Vercel: **only the 2 PostHog vars above are needed.**
      (Supabase isn't needed at runtime — the site reads a committed snapshot.
      Algolia works with built-in public keys.)
- [ ] Connect the domain **www.lcdplacas.com** (DNS) once happy with the preview.

### Product photos
- [ ] Get **high-resolution** product images (current ones are ~600px from the old
      CDN, so they look soft when zoomed). Re-photograph or source the originals.
      → Then Claude can host them properly (see Section 2).

### Content / data
- [ ] Review the 218 products in Supabase (fix any wrong price / title / model).
      When you change products, tell Claude to re-sync (or run
      `scripts/db-pull.sh` + `scripts/push-algolia.py`, then redeploy).

### Security (recommended)
- [ ] **Rotate the Supabase DB password** (it was shared in chat).
      Supabase → Settings → Database → Reset password. Nothing in the live app
      depends on it, so this is safe anytime.
- [ ] Optionally rotate the Algolia **Write** key (also shared in chat). The
      public Search key is fine to keep.

---

## 🤖 Section 2 — For Claude (build / propose)

### Ready to build — just say the word
- [ ] **Enable + verify PostHog** (as soon as the key arrives).
- [ ] **Cart → WhatsApp** — add several parts (main + fuente + tiras) and send
      them as one prefilled WhatsApp message. The secondary buy flow you wanted.
- [ ] **Wire the dead links to WhatsApp** — "Contacto" / "Cómo comprar" in the
      nav & footer currently go to `#`. Point them at WhatsApp (no new pages),
      and tidy the footer. Small, makes the site feel finished.
- [ ] **Search polish** — Algolia **synonyms** (tira↔tiras, fuente↔power, led↔leds)
      + an **autocomplete dropdown** in the header search.
- [ ] **Custom analytics events** — track "consulta por WhatsApp" per product and
      search terms, so you get a clean funnel (richer than autocapture alone).

### Proposals — worth considering
- [ ] **Rich WhatsApp link previews** — per-product Open Graph images (image +
      price + code) so pasting a product link in WhatsApp shows a nice card.
      High value since sharing happens on WhatsApp.
- [ ] **Brand landing pages** (e.g. `/marcas/hisense`) for SEO on
      "repuestos hisense" type searches.
- [ ] **Hi-res image integration** (after you get the photos) — host them on
      Supabase Storage, add blur-up placeholders, and use them for the zoom.
- [ ] **Auto-sync** — a Supabase webhook + Vercel deploy hook so editing a
      product republishes the site automatically (no manual scripts).
- [ ] **Lighthouse + accessibility re-audit** once the above land.

---

_Last updated: 2026-07-10._
