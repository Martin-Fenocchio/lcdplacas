# LcdPlacas

Online catalog for a TV-repair-parts business (placas main, fuentes, T-Con, tiras de LED,
componentes). Spanish (`es-AR`), ARS pricing. **Buying happens over WhatsApp** — the site's
job is to help people find the exact part for their TV, then contact via WhatsApp.

Built with **Next.js 16** (App Router) + **React 19** + **Tailwind CSS v4**. Data lives in
**Supabase**, search runs on **Algolia**, analytics on **PostHog** (cookieless).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
npm run lint
```

The site builds with **no environment variables** (it reads a committed data snapshot and
uses a public Algolia search key). Env vars are only for analytics and the data pipeline —
see below.

## How the data works

**Supabase is the source of truth. The site is fully static**, built from a committed
snapshot at `data/products.json`. Algolia holds a copy of the data for search.

```
Supabase  ──scripts/db-pull.sh──▶  data/products.json  ──build──▶  static site
   └────────────────────────────  scripts/push-algolia.py  ──▶  Algolia (search)
```

**To update products:** edit them in the Supabase dashboard, then:

```bash
# .env.local must contain SUPABASE_DB_URL, ALGOLIA_APP_ID, ALGOLIA_WRITE_KEY
./scripts/db-pull.sh                 # Supabase → data/products.json
python3 scripts/push-algolia.py      # → Algolia index
git commit -am "update products" && git push   # redeploy
```

Full details in [`scripts/README.md`](scripts/README.md).

## Environment variables

Runtime (Vercel) — **optional**, only for analytics:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project key (`phc_…`) |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://us.i.posthog.com` or `https://eu.i.posthog.com` |

Local pipeline only (`.env.local`, git-ignored): `SUPABASE_DB_URL`, `ALGOLIA_APP_ID`,
`ALGOLIA_WRITE_KEY`.

## Deploy

Deploys to **Vercel** as a static Next.js app. Add the two PostHog vars if you want
analytics; everything else works without configuration. Product photos are served from the
store's CDN (configured in `next.config.ts`).

## Project docs

- [`CLAUDE.md`](CLAUDE.md) — architecture + conventions + scope constraints.
- [`TODO.md`](TODO.md) — roadmap (owner tasks + planned work).
- [`docs/`](docs/) — original planning (site structure, design system).
