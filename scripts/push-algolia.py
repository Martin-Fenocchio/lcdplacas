#!/usr/bin/env python3
"""Push data/products.json to Algolia as enriched search records + settings.

Algolia holds a denormalised copy purely for search; the DB stays the source of
truth. Reads credentials from the environment (never commit keys):

    ALGOLIA_APP_ID=...  ALGOLIA_WRITE_KEY=...  python3 scripts/push-algolia.py
"""
import json
import os
import re
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP_ID = os.environ["ALGOLIA_APP_ID"]
WRITE_KEY = os.environ["ALGOLIA_WRITE_KEY"]
INDEX = os.environ.get("ALGOLIA_INDEX", "products")

KNOWN_BRANDS = [
    "Hisense", "Noblex", "Sansei", "Sanyo", "Philco", "Samsung", "TCL", "RCA",
    "BGH", "JVC", "Kanji", "Enova", "Hitachi", "Panasonic", "Sharp", "Sony",
    "Top House", "Ken Brown", "Admiral", "Panavox", "LG",
]
TYPE_BY_CATEGORY = {
    "placas-main-y-monoplacas": "Placa Main",
    "fuentes": "Fuente",
    "t-con": "T-Con",
    "tiras-de-leds": "Tira de LED",
    "componentes": "Componente",
}


def derive_brand(title):
    for b in KNOWN_BRANDS:
        if re.search(r"\b" + re.escape(b), title, re.I):
            return b
    return ""


def derive_models(title, brand):
    if not brand:
        return ""
    head = re.split(r",|c[oó]digo", title, flags=re.I)[0]
    idx = head.lower().find(brand.lower())
    return re.sub(r"\s+", " ", head[idx + len(brand):]).strip() if idx >= 0 else ""


def normalize_condition(raw):
    v = (raw or "").lower()
    if "usad" in v:
        return "Scrap usada"
    if "scrap" in v:
        return "Scrap nueva"
    return "Nueva"


def record(p):
    brand = derive_brand(p["title"])
    return {
        "objectID": p["slug"],
        "slug": p["slug"],
        "title": p["title"],
        "code": p.get("code") or "",
        "brand": brand,
        "type": TYPE_BY_CATEGORY.get(p["categorySlug"], "Repuesto"),
        "compatibleModels": derive_models(p["title"], brand),
        "condition": normalize_condition(p.get("condition")),
        "price": p["price"],
        "currency": p.get("currency", "ARS"),
        "category": p["category"],
        "categorySlug": p["categorySlug"],
        "image": p["images"][0] if p["images"] else None,
        "url": f"/producto/{p['slug']}",
    }


def api(method, path, payload):
    req = urllib.request.Request(
        f"https://{APP_ID}.algolia.net/1/indexes/{path}",
        data=json.dumps(payload).encode(),
        method=method,
        headers={
            "X-Algolia-API-Key": WRITE_KEY,
            "X-Algolia-Application-Id": APP_ID,
            "Content-Type": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode())


def main():
    products = json.load(open(os.path.join(ROOT, "data", "products.json")))
    records = [record(p) for p in products]

    api("PUT", f"{INDEX}/settings", {
        "searchableAttributes": [
            "title", "code", "compatibleModels", "brand", "type", "category",
        ],
        "attributesForFaceting": [
            "searchable(brand)", "searchable(type)", "categorySlug", "condition",
        ],
        "customRanking": ["desc(price)"],
    })
    resp = api("POST", f"{INDEX}/batch",
               {"requests": [{"action": "addObject", "body": r} for r in records]})
    print(f"pushed {len(records)} records, taskID={resp.get('taskID')}")


if __name__ == "__main__":
    main()
