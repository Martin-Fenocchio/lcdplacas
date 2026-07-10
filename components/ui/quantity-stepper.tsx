"use client";

import { useState } from "react";

/** Small quantity control for the product page. Visual/UX only for now. */
export function QuantityStepper({ min = 1, max = 99 }: { min?: number; max?: number }) {
  const [qty, setQty] = useState(min);

  return (
    <div className="inline-flex items-center overflow-hidden rounded-[10px] border border-line-strong bg-white">
      <button
        type="button"
        aria-label="Restar"
        onClick={() => setQty((q) => Math.max(min, q - 1))}
        className="h-[46px] w-[42px] text-xl text-body transition-colors hover:bg-surface"
      >
        −
      </button>
      <span className="min-w-[40px] text-center font-semibold text-ink" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Sumar"
        onClick={() => setQty((q) => Math.min(max, q + 1))}
        className="h-[46px] w-[42px] text-xl text-body transition-colors hover:bg-surface"
      >
        +
      </button>
    </div>
  );
}
