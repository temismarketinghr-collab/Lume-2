"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/products";

export type CartItem = { product: Product; qty: number };

type CartValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (product: Product) => void;
  setQty: (name: string, qty: number) => void;
  remove: (name: string) => void;
  clear: () => void;
};

const CartCtx = createContext<CartValue | null>(null);

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

const STORAGE_KEY = "lume-cart";

const priceToNumber = (price: string) =>
  Number(price.replace(/[^0-9.]/g, "")) || 0;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load persisted cart on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  // Persist on change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const value = useMemo<CartValue>(() => {
    const add = (product: Product) =>
      setItems((prev) => {
        const i = prev.findIndex((it) => it.product.name === product.name);
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + 1 };
          return next;
        }
        return [...prev, { product, qty: 1 }];
      });

    const setQty = (name: string, qty: number) =>
      setItems((prev) =>
        qty <= 0
          ? prev.filter((it) => it.product.name !== name)
          : prev.map((it) =>
              it.product.name === name ? { ...it, qty } : it,
            ),
      );

    const remove = (name: string) =>
      setItems((prev) => prev.filter((it) => it.product.name !== name));

    const clear = () => setItems([]);

    const count = items.reduce((n, it) => n + it.qty, 0);
    const subtotal = items.reduce(
      (s, it) => s + priceToNumber(it.product.price) * it.qty,
      0,
    );

    return { items, count, subtotal, add, setQty, remove, clear };
  }, [items]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
