"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export interface CartItem {
  slug: string;
  title: string;
  code: string;
  price: number;
  image: string | null;
  qty: number;
}

interface AddInput {
  slug: string;
  title: string;
  code?: string;
  price: number;
  images?: string[];
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (product: AddInput, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "lcd-cart";
const MAX_QTY = 99;

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

// Functional local persistence (not tracking) — no cookies, so no consent needed.
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const firstRun = useRef(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addItem = (product: AddInput, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.slug === product.slug);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: Math.min(MAX_QTY, next[idx].qty + qty) };
        return next;
      }
      return [
        ...prev,
        {
          slug: product.slug,
          title: product.title,
          code: product.code ?? "",
          price: product.price,
          image: product.images?.[0] ?? null,
          qty: Math.min(MAX_QTY, qty),
        },
      ];
    });
    setOpen(true);
  };

  const removeItem = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug));

  const setQty = (slug: string, qty: number) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty: Math.min(MAX_QTY, qty) } : i)),
    );

  const clear = () => setItems([]);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((n, i) => n + i.price * i.qty, 0);

  const value = useMemo(
    () => ({ items, count, total, open, setOpen, addItem, removeItem, setQty, clear }),
    [items, count, total, open],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
