"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddItemsModal from "@/components/AddItemsModal";
import { useCart } from "@/components/CartContext";

const priceToNumber = (price: string) =>
  Number(price.replace(/[^0-9.]/g, "")) || 0;

const inputClass =
  "w-full rounded-[10px] border border-charcoal/15 bg-white px-4 py-3 text-[15px] text-charcoal placeholder:text-body/50 transition-colors focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/40";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-medium text-charcoal">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, count, subtotal, setQty, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    card: "",
    exp: "",
    cvv: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    taxId: "",
  });
  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clear();
    setPlaced(true);
  };

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="px-6 pb-24 pt-[130px] md:px-10 md:pb-32 md:pt-[170px]">
        <div className="mx-auto max-w-5xl">
          {placed ? (
            <div className="rounded-card bg-white p-12 text-center shadow-card">
              <p className="font-serif text-4xl italic text-brand">Thank you</p>
              <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-body">
                Your order has been placed. A confirmation is on its way to your
                inbox.
              </p>
              <Link
                href="/shop"
                className="mt-8 inline-block rounded-full bg-brand px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
              >
                Continue Shopping
              </Link>
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-card bg-white p-12 text-center shadow-card">
              <p className="text-[15px] text-body">Your cart is empty.</p>
              <Link
                href="/shop"
                className="mt-6 inline-block rounded-full bg-brand px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
              >
                Shop the Collection
              </Link>
            </div>
          ) : (
            <form
              onSubmit={placeOrder}
              className="rounded-card bg-white p-7 shadow-card md:p-10"
            >
              <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
                {/* LEFT — Payment details */}
                <div>
                  <h1 className="font-sans text-2xl font-medium text-charcoal">
                    Payment Details
                  </h1>

                  <div className="mt-7 space-y-5">
                    <Field label="Full name">
                      <input
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Your name"
                        className={inputClass}
                        autoComplete="name"
                        required
                      />
                    </Field>

                    <Field label="Card Details">
                      <div className="relative">
                        <input
                          value={form.card}
                          onChange={set("card")}
                          placeholder="1234 5678 9012 3456"
                          inputMode="numeric"
                          className={`${inputClass} pr-12`}
                          required
                        />
                        <svg
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-body/50"
                          width="26"
                          height="18"
                          viewBox="0 0 32 22"
                          fill="none"
                          aria-hidden="true"
                        >
                          <rect x="0.5" y="0.5" width="31" height="21" rx="3.5" stroke="currentColor" />
                          <rect x="0" y="4" width="32" height="4" fill="currentColor" opacity="0.5" />
                        </svg>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <input
                          value={form.exp}
                          onChange={set("exp")}
                          placeholder="MM / YY"
                          className={inputClass}
                          required
                        />
                        <input
                          value={form.cvv}
                          onChange={set("cvv")}
                          placeholder="CVV"
                          inputMode="numeric"
                          className={inputClass}
                          required
                        />
                      </div>
                    </Field>

                    <div>
                      <button
                        type="button"
                        onClick={() => setShowAddress((v) => !v)}
                        aria-expanded={showAddress}
                        className="flex items-center gap-2 text-[13px] font-medium text-charcoal transition-colors hover:text-brand"
                      >
                        <span className="text-lg leading-none">
                          {showAddress ? "–" : "+"}
                        </span>{" "}
                        Add address or tax ID
                        <span className="text-body/60">Optional</span>
                      </button>

                      {showAddress && (
                        <div className="mt-4 space-y-3">
                          <input
                            value={form.address}
                            onChange={set("address")}
                            placeholder="Address"
                            autoComplete="street-address"
                            className={inputClass}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              value={form.city}
                              onChange={set("city")}
                              placeholder="City"
                              className={inputClass}
                            />
                            <input
                              value={form.zip}
                              onChange={set("zip")}
                              placeholder="Postal code"
                              className={inputClass}
                            />
                          </div>
                          <input
                            value={form.country}
                            onChange={set("country")}
                            placeholder="Country"
                            className={inputClass}
                          />
                          <input
                            value={form.taxId}
                            onChange={set("taxId")}
                            placeholder="Tax ID (optional)"
                            className={inputClass}
                          />
                        </div>
                      )}
                    </div>

                    <p className="border-t border-charcoal/10 pt-5 text-[12px] leading-relaxed text-body/80">
                      This is a demo store — no real payment is processed and no
                      card details are stored. By placing the order you agree to
                      LUMÉ&apos;s terms.
                    </p>
                  </div>
                </div>

                {/* RIGHT — Your Order */}
                <div className="rounded-[16px] bg-[#F1F5F9] p-6 md:p-7">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-brand">
                    Your Order
                  </h2>

                  <ul className="mt-5 space-y-4">
                    {items.map((it) => (
                      <li key={it.product.name} className="flex gap-3">
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[12px] bg-white">
                          <img
                            src={it.product.image}
                            alt={it.product.name}
                            className="h-full w-full object-cover"
                            draggable={false}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-semibold uppercase tracking-[0.04em] text-charcoal">
                            {it.product.name}
                          </p>
                          <p className="mt-0.5 text-[12px] text-body">
                            {it.product.price} each
                          </p>
                          <div className="mt-2 flex items-center gap-2.5">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(it.product.name, it.qty - 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:border-brand hover:text-brand"
                            >
                              –
                            </button>
                            <span className="w-4 text-center text-[13px] font-medium text-charcoal">
                              {it.qty}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQty(it.product.name, it.qty + 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:border-brand hover:text-brand"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <span className="text-[14px] font-semibold text-charcoal">
                          ${priceToNumber(it.product.price) * it.qty}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => setPickerOpen(true)}
                    className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-brand transition-colors hover:brightness-110"
                  >
                    <span className="text-base leading-none">+</span> Add more
                    items
                  </button>

                  <div className="mt-6 space-y-2 border-t border-charcoal/10 pt-5 text-[14px]">
                    <div className="flex justify-between text-body">
                      <span>Subtotal ({count})</span>
                      <span className="text-charcoal">${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-body">
                      <span>Shipping</span>
                      <span className="text-brand">Free</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-end justify-between border-t border-charcoal/10 pt-5">
                    <span className="text-[13px] uppercase tracking-[0.14em] text-body">
                      Due today
                    </span>
                    <span className="font-sans text-3xl font-light text-charcoal">
                      ${subtotal}
                    </span>
                  </div>
                  <p className="mt-1 text-right text-[11px] text-body/70">
                    + applicable tax
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex items-center justify-between border-t border-charcoal/10 pt-6">
                <Link
                  href="/cart"
                  className="rounded-full border border-charcoal/20 px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors hover:border-charcoal/40"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="rounded-full bg-brand px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-glow transition hover:brightness-110"
                >
                  Place Order · ${subtotal}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <AddItemsModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
      />

      <Footer />
    </main>
  );
}
