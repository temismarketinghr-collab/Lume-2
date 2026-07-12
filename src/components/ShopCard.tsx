"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/CartContext";

export default function ShopCard({ product }: { product: Product }) {
  const { add, items } = useCart();
  const inCart = items.find((it) => it.product.name === product.name);

  return (
    <article className="group flex flex-col rounded-card bg-white p-4 shadow-card transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-glow md:p-6">
      {/* Clickable area → product detail page */}
      <Link
        href={`/shop/${product.slug}`}
        className="flex flex-col"
        aria-label={`View ${product.name}`}
      >
        {/* Top row: tag */}
        <div className="mb-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-body">
            {product.tag}
          </span>
        </div>

        {/* Image panel */}
        <div
          className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-[16px] ${product.panel}`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            draggable={false}
          />
        </div>

        {/* Name + price */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <h3 className="font-sans text-[13px] font-semibold uppercase leading-snug tracking-[0.1em] text-charcoal">
            {product.name}
          </h3>
          <span className="shrink-0 font-sans text-[15px] font-semibold text-brand">
            {product.price}
          </span>
        </div>
      </Link>

      {/* Add to cart (separate — does not navigate) */}
      <button
        type="button"
        onClick={() => add(product)}
        aria-live="polite"
        className={[
          "mt-5 w-full rounded-full py-3 text-[11px] font-semibold uppercase tracking-[0.06em] transition-all duration-300 md:py-3.5 md:text-xs md:tracking-[0.18em]",
          inCart
            ? "bg-brand/10 text-brand"
            : "bg-brand text-white hover:brightness-110",
        ].join(" ")}
      >
        {inCart ? `Added · ${inCart.qty}` : "Add to Cart"}
      </button>
    </article>
  );
}
