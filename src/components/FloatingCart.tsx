"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function FloatingCart() {
  const { count } = useCart();

  // Appears once something is in the cart.
  if (count === 0) return null;

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
      className="fixed right-5 top-1/2 z-40 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-glow transition-transform duration-300 hover:scale-105 md:right-7"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <path d="M2 3h2l2.4 12.3a1 1 0 0 0 1 .7h9.7a1 1 0 0 0 1-.8L21 7H5" />
      </svg>
      <span className="absolute -right-1 -top-1 flex h-6 min-w-[24px] items-center justify-center rounded-full border-2 border-cream bg-white px-1 text-[11px] font-bold text-brand">
        {count}
      </span>
    </Link>
  );
}
