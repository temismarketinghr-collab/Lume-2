"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/CartContext";

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(product);
    setAdded(true);
  };

  return (
    <div className="mt-9 flex flex-wrap items-center gap-4">
      {/* Quantity stepper */}
      <div className="flex items-center gap-4 rounded-full border border-charcoal/15 px-4 py-2">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="text-lg leading-none text-charcoal transition-colors hover:text-brand"
        >
          –
        </button>
        <span className="w-5 text-center text-[15px] font-medium text-charcoal">
          {qty}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQty((q) => q + 1)}
          className="text-lg leading-none text-charcoal transition-colors hover:text-brand"
        >
          +
        </button>
      </div>

      {/* Add to cart */}
      <button
        type="button"
        onClick={handleAdd}
        className={[
          "flex-1 rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300",
          added
            ? "bg-brand/10 text-brand"
            : "bg-brand text-white shadow-glow hover:brightness-110",
        ].join(" ")}
      >
        {added ? "Added to Cart ✓" : "Add to Cart"}
      </button>
    </div>
  );
}
