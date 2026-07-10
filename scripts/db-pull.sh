#!/usr/bin/env bash
# Pull products from Supabase into data/products.json (the build-time snapshot
# the app reads). Run this after products change in the DB, then redeploy.
#
# Usage:  SUPABASE_DB_URL="postgresql://...:5432/postgres" ./scripts/db-pull.sh
set -euo pipefail

: "${SUPABASE_DB_URL:?Set SUPABASE_DB_URL to the Supabase session-mode connection string}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

psql "$SUPABASE_DB_URL" -tAc "
  select coalesce(json_agg(
    json_build_object(
      'slug', slug, 'title', title, 'code', code, 'price', price,
      'currency', currency, 'condition', condition, 'category', category,
      'categorySlug', category_slug, 'description', description,
      'url', url, 'images', images
    ) order by category_slug, slug
  ), '[]')
  from public.products
" | python3 -m json.tool > "$ROOT/data/products.json"

echo "wrote data/products.json ($(python3 -c "import json;print(len(json.load(open('$ROOT/data/products.json'))))") products)"
