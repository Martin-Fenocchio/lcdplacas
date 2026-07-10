#!/usr/bin/env python3
"""Generate an idempotent upsert SQL file from data/products.json.

Usage:
    python3 scripts/gen-seed-sql.py > supabase/seed.sql
    psql "$SUPABASE_DB_URL" -f supabase/seed.sql

Dollar-quoting ($prod$) keeps text values safe without escaping.
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
products = json.load(open(os.path.join(ROOT, "data", "products.json")))

COLS = ["slug", "title", "code", "price", "currency", "condition",
        "category", "category_slug", "description", "url", "images"]


def lit(value):
    if value is None:
        return "null"
    if isinstance(value, (int, float)):
        return str(value)
    return f"$prod${value}$prod$"


def images_lit(images):
    return f"$prod${json.dumps(images, ensure_ascii=False)}$prod$::jsonb"


print("begin;")
for p in products:
    row = [
        lit(p["slug"]), lit(p["title"]), lit(p.get("code")), lit(p["price"]),
        lit(p.get("currency", "ARS")), lit(p.get("condition")), lit(p["category"]),
        lit(p["categorySlug"]), lit(p.get("description")), lit(p.get("url")),
        images_lit(p.get("images", [])),
    ]
    updates = ", ".join(
        f"{c} = excluded.{c}" for c in COLS if c != "slug"
    )
    print(
        f"insert into public.products ({', '.join(COLS)}) values "
        f"({', '.join(row)}) "
        f"on conflict (slug) do update set {updates}, updated_at = now();"
    )
print("commit;")
print(f"-- {len(products)} products", file=sys.stderr)
