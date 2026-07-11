import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopCard from "@/components/ShopCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop — LUMÉ",
  description: "Shop the LUMÉ collection of smart skincare devices.",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="px-6 pb-24 pt-[150px] md:px-10 md:pb-32 md:pt-[190px]">
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.28em] text-brand">
            The Collection
          </p>
          <h1 className="mx-auto mt-4 max-w-2xl text-center font-sans text-[40px] font-light leading-[46px] text-charcoal md:text-[48px] md:leading-[56px]">
            Shop the{" "}
            <span className="text-shimmer italic text-brand">Ritual</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-center text-[15px] leading-relaxed text-body">
            Smart skincare devices, engineered for everyday glow, lift, and
            skin confidence.
          </p>

          {/* Product grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {products.map((product) => (
              <ShopCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
