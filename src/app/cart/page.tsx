"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartContext";

const priceToNumber = (price: string) =>
  Number(price.replace(/[^0-9.]/g, "")) || 0;

function QtyButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors duration-200 hover:border-brand hover:text-brand"
    >
      {children}
    </button>
  );
}

export default function CartPage() {
  const { items, count, subtotal, setQty, remove } = useCart();

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="px-6 pb-24 pt-[150px] md:px-10 md:pb-32 md:pt-[190px]">
        <div className="mx-auto max-w-3xl">
          {items.length === 0 ? (
            <div className="mt-14 rounded-card bg-white p-10 text-center shadow-card">
              <p className="text-[15px] text-body">Your cart is empty.</p>
              <Link
                href="/shop"
                className="mt-6 inline-block rounded-full bg-brand px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
              >
                Shop the Collection
              </Link>
            </div>
          ) : (
            <div className="mt-12 rounded-card bg-white px-6 py-2 shadow-card md:px-8">
              <ul>
                {items.map((it) => (
                  <li
                    key={it.product.name}
                    className="flex items-center gap-4 border-b border-charcoal/10 py-5 last:border-b-0"
                  >
                    <div
                      className={`h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[14px] ${it.product.panel}`}
                    >
                      <img
                        src={it.product.image}
                        alt={it.product.name}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-charcoal">
                        {it.product.name}
                      </h3>
                      <p className="mt-1 text-[13px] text-body">
                        {it.product.price} each
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <QtyButton
                        label="Decrease quantity"
                        onClick={() => setQty(it.product.name, it.qty - 1)}
                      >
                        –
                      </QtyButton>
                      <span className="w-5 text-center text-[15px] font-medium text-charcoal">
                        {it.qty}
                      </span>
                      <QtyButton
                        label="Increase quantity"
                        onClick={() => setQty(it.product.name, it.qty + 1)}
                      >
                        +
                      </QtyButton>
                    </div>

                    <div className="w-16 text-right text-[15px] font-semibold text-brand">
                      ${priceToNumber(it.product.price) * it.qty}
                    </div>

                    <button
                      type="button"
                      aria-label={`Remove ${it.product.name}`}
                      onClick={() => remove(it.product.name)}
                      className="ml-1 text-body/60 transition-colors hover:text-charcoal"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Summary */}
              <div className="flex flex-col gap-6 border-t border-charcoal/10 pt-7 pb-3">
                <div className="flex items-center gap-10 self-start">
                  <span className="text-[13px] uppercase tracking-[0.16em] text-body">
                    Subtotal ({count} item{count === 1 ? "" : "s"})
                  </span>
                  <span className="font-sans text-2xl font-light text-charcoal">
                    ${subtotal}
                  </span>
                </div>

                <div className="flex w-full items-center justify-between gap-4">
                  <Link
                    href="/shop"
                    className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-body transition-colors hover:text-charcoal"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Back
                  </Link>
                  <Link
                    href="/checkout"
                    className="rounded-full bg-brand px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-glow transition hover:brightness-110"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
