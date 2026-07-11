import ShopCard from "@/components/ShopCard";
import { products } from "@/lib/products";

export default function Products() {
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
          <span className="text-shimmer block font-sans text-[48px] font-light italic uppercase leading-[56px] text-brand">
            Rejuvenation Device
          </span>
        </h2>

        {/* Cards — identical to the shop grid: Add to Cart + link to detail */}
        <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {products.map((product) => (
            <ShopCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
