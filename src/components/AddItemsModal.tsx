"use client";

import { useEffect } from "react";
import { products } from "@/lib/products";
import { useCart } from "@/components/CartContext";

export default function AddItemsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { add, items } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-card bg-white shadow-[0_30px_80px_-20px_rgba(43,43,43,0.45)]">
        <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
          <h3 className="font-sans text-lg font-medium text-charcoal">
            Add Items
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-body/70 transition-colors hover:text-charcoal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <ul className="max-h-[60vh] space-y-3 overflow-y-auto p-6">
          {products.map((p) => {
            const inCart = items.find((it) => it.product.name === p.name);
            return (
              <li
                key={p.slug}
                className="flex items-center gap-4 rounded-[14px] border border-charcoal/10 p-3"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[12px] bg-white">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-charcoal">
                    {p.name}
                  </p>
                  <p className="mt-0.5 text-[13px] font-semibold text-brand">
                    {p.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => add(p)}
                  className={[
                    "shrink-0 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300",
                    inCart
                      ? "bg-brand/10 text-brand"
                      : "bg-brand text-white hover:brightness-110",
                  ].join(" ")}
                >
                  {inCart ? `Added · ${inCart.qty}` : "Add"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
