import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCart from "@/components/AddToCart";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  return {
    title: product ? `${product.name} — LUMÉ` : "LUMÉ",
    description: product?.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="px-6 pb-24 pt-[130px] md:px-10 md:pb-32 md:pt-[170px]">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-body transition-colors hover:text-charcoal"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to Shop
          </Link>

          <div className="mt-8 grid items-start gap-10 md:grid-cols-2 md:gap-14">
            {/* Image */}
            <div
              className={`overflow-hidden rounded-card shadow-card ${product.panel}`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
                draggable={false}
              />
            </div>

            {/* Info */}
            <div className="md:pt-6">
              <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-brand">
                {product.tag}
              </span>
              <h1 className="mt-4 font-sans text-[34px] font-light uppercase leading-[1.1] text-charcoal md:text-[42px]">
                {product.name}
              </h1>
              <p className="mt-4 font-sans text-3xl font-light text-brand">
                {product.price}
              </p>

              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-body">
                {product.description}
              </p>

              <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-[14px] text-charcoal"
                  >
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-brand" />
                    {f}
                  </li>
                ))}
              </ul>

              <AddToCart product={product} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
