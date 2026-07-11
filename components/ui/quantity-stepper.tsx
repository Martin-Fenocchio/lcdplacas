"use client";

import { useState } from "react";

interface QuantityStepperProps {
  min?: number;
  max?: number;
  /** Controlled value; falls back to internal state when omitted. */
  value?: number;
  onChange?: (qty: number) => void;
}

/** Small quantity control. Works controlled (value + onChange) or standalone. */
export function QuantityStepper({ min = 1, max = 99, value, onChange }: QuantityStepperProps) {
  const [internal, setInternal] = useState(min);
  const qty = value ?? internal;

  const set = (n: number) => {
    const clamped = Math.max(min, Math.min(max, n));
    if (onChange) onChange(clamped);
    else setInternal(clamped);
  };

  return (
    <div className="inline-flex items-center overflow-hidden rounded-[10px] border border-line-strong bg-white">
      <button
        type="button"
        aria-label="Restar"
        onClick={() => set(qty - 1)}
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
        onClick={() => set(qty + 1)}
        className="h-[46px] w-[42px] text-xl text-body transition-colors hover:bg-surface"
      >
        +
      </button>
    </div>
  );
}
