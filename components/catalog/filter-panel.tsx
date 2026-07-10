"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { formatARS } from "@/lib/format";
import type { CatalogResult, FacetAttr } from "@/lib/search";

const GROUPS: { attr: FacetAttr; title: string }[] = [
  { attr: "brand", title: "Marca" },
  { attr: "type", title: "Tipo de repuesto" },
  { attr: "condition", title: "Estado" },
];

const INITIAL_VISIBLE = 6;

interface FilterPanelProps {
  facets: CatalogResult["facets"];
  selected: Record<FacetAttr, string[]>;
  onToggle: (attr: FacetAttr, value: string) => void;
  priceMin: string;
  priceMax: string;
  onPriceMin: (v: string) => void;
  onPriceMax: (v: string) => void;
}

function FacetGroup({
  attr,
  title,
  facets,
  selected,
  onToggle,
}: {
  attr: FacetAttr;
  title: string;
} & Pick<FilterPanelProps, "facets" | "selected" | "onToggle">) {
  const [expanded, setExpanded] = useState(false);

  // Show every option that has hits, plus any selected value even at count 0.
  const values = new Set<string>([...Object.keys(facets[attr]), ...selected[attr]]);
  values.delete("");
  const options = [...values].sort((a, b) => {
    const diff = (facets[attr][b] ?? 0) - (facets[attr][a] ?? 0);
    return diff !== 0 ? diff : a.localeCompare(b);
  });
  if (options.length === 0) return null;

  const shown = expanded ? options : options.slice(0, INITIAL_VISIBLE);

  return (
    <div className="border-t border-line py-4">
      <div className="mb-3 text-sm font-semibold text-ink">{title}</div>
      {shown.map((value) => {
        const count = facets[attr][value] ?? 0;
        const checked = selected[attr].includes(value);
        return (
          <label key={value} className="flex cursor-pointer items-center gap-2.5 py-[5px] text-sm text-body">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(attr, value)}
              className="h-[17px] w-[17px] accent-primary"
            />
            {value}
            <span className={cn("ml-auto text-xs", count ? "text-muted" : "text-faint")}>{count}</span>
          </label>
        );
      })}
      {options.length > INITIAL_VISIBLE && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-[13px] font-medium text-primary"
        >
          {expanded ? "Ver menos" : `Ver ${options.length - INITIAL_VISIBLE} más`}
        </button>
      )}
    </div>
  );
}

export function FilterPanel({
  facets,
  selected,
  onToggle,
  priceMin,
  priceMax,
  onPriceMin,
  onPriceMax,
}: FilterPanelProps) {
  return (
    <div>
      {GROUPS.map((g) => (
        <FacetGroup key={g.attr} {...g} facets={facets} selected={selected} onToggle={onToggle} />
      ))}

      <div className="border-t border-line pb-1 pt-4">
        <div className="mb-3.5 text-sm font-semibold text-ink">Rango de precio</div>
        <div className="flex items-center gap-2.5">
          <input
            inputMode="numeric"
            value={priceMin}
            onChange={(e) => onPriceMin(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="Mín"
            aria-label="Precio mínimo"
            className="h-[38px] w-1/2 rounded-lg border border-line px-3 text-[13px] outline-none focus:border-primary"
          />
          <span className="text-muted">–</span>
          <input
            inputMode="numeric"
            value={priceMax}
            onChange={(e) => onPriceMax(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="Máx"
            aria-label="Precio máximo"
            className="h-[38px] w-1/2 rounded-lg border border-line px-3 text-[13px] outline-none focus:border-primary"
          />
        </div>
        {(priceMin || priceMax) && (
          <p className="mt-2 text-[12.5px] text-muted">
            {priceMin ? formatARS(Number(priceMin)) : "$0"} — {priceMax ? formatARS(Number(priceMax)) : "sin tope"}
          </p>
        )}
      </div>
    </div>
  );
}
