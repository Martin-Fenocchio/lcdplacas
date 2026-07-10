# Data pipeline

**Supabase** is the source of truth. **Algolia** holds a denormalised copy for
search. The Next.js app reads a build-time snapshot committed at
`data/products.json` (keeps the site fully static → fast + great SEO, no runtime
DB dependency, deploy never breaks).

```
Supabase (edit here) ──db-pull──▶ data/products.json ──build──▶ site
        │
        └── push-algolia ─▶ Algolia index "products" (search)
```

## One-time / after schema changes
```bash
psql "$SUPABASE_DB_URL" -f supabase/schema.sql
```

## Load / update the DB from the scraped data
```bash
python3 scripts/gen-seed-sql.py > supabase/seed.sql
psql "$SUPABASE_DB_URL" -f supabase/seed.sql        # idempotent upsert by slug
```

## Refresh the app snapshot from the DB, then push search
```bash
SUPABASE_DB_URL="postgres://…:5432/postgres" ./scripts/db-pull.sh
python3 scripts/push-algolia.py                     # needs ALGOLIA_WRITE_KEY
```

`SUPABASE_DB_URL` = the **session-mode** (port 5432) connection string from
Supabase → Project Settings → Database. Keep it in `.env.local` (git-ignored).
