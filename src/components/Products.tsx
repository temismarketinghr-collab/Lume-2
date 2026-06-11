"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { products, type Product } from "@/lib/products";

function BookmarkIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="group relative flex w-[78vw] shrink-0 snap-center flex-col rounded-card bg-white p-6 shadow-card transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-glow sm:w-[60vw] md:w-auto md:shrink"
    >
      {/* Top row: tag + bookmark icon */}
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-body">
          {product.tag}
        </span>
        <button
          type="button"
          aria-label={`Save ${product.name}`}
          className="text-body/70 transition-colors duration-300 hover:text-brand"
        >
          <BookmarkIcon />
        </button>
      </div>

      {/* Middle: product image on a pastel panel */}
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

      {/* Bottom row: name + price */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <h3 className="font-sans text-[13px] font-semibold uppercase leading-snug tracking-[0.1em] text-charcoal">
          {product.name}
        </h3>
        <span className="shrink-0 font-sans text-[15px] font-semibold text-brand">
          {product.price}
        </span>
      </div>
    </motion.article>
  );
}

export default function Products() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("article");
    const amount = card
      ? (card as HTMLElement).offsetWidth + 24
      : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section
      id="collections"
      className="relative z-10 bg-cream px-6 pb-[140px] pt-24 md:px-10 md:pt-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section title */}
        <h2 className="mb-14 text-center leading-[1.04] md:mb-20">
          <span className="block font-sans text-[48px] font-light uppercase leading-[56px] text-charcoal">
            Your Everyday Skin
          </span>
          <span className="block font-sans text-[48px] font-light italic uppercase leading-[56px] text-brand">
            Rejuvenation Device
          </span>
        </h2>

        {/* Cards: row of 3 on desktop, horizontal snap-scroll on mobile */}
        <div
          ref={trackRef}
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0"
        >
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>

        {/* Carousel controls — bottom-right */}
        <div className="mt-10 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous product"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-brand text-brand transition-all duration-300 hover:bg-brand/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next product"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-glow transition-all duration-300 hover:brightness-110"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
