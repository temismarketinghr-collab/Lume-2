export type Product = {
  slug: string;
  name: string;
  price: string;
  tag: string;
  image: string;
  panel: string; // class for the soft image panel
  description: string;
  features: string[];
};

export const products: Product[] = [
  {
    slug: "neck-face-lifting-device",
    name: "Neck & Face Lifting Device",
    price: "$30",
    tag: "Best Seller",
    image: "/products/lifting-device.png",
    panel: "product-panel",
    description:
      "Microcurrent stimulation and gentle warmth work together to lift, firm, and sculpt the neck and jawline — for a visibly toned, more defined profile over time.",
    features: [
      "Red LED array",
      "Polished metal head frame",
      "Multi-axial contouring joint",
      "Ergonomic power button",
    ],
  },
  {
    slug: "pore-cleansing-tool",
    name: "Pore Cleansing Tool",
    price: "$59",
    tag: "Best Seller",
    image: "/products/cleansing-tool.png",
    panel: "product-panel",
    description:
      "Precise, gentle suction lifts away impurities, oil, and buildup from deep within pores — revealing smoother, clearer, refreshingly refined skin.",
    features: [
      "Adjustable suction levels",
      "Rose-gold precision tip",
      "USB-C rechargeable",
      "Skin-safe silicone seal",
    ],
  },
  {
    slug: "led-therapy-mask",
    name: "LED Therapy Mask",
    price: "$89",
    tag: "New Arrival",
    image: "/products/led-mask.png",
    panel: "product-panel",
    description:
      "Full-face LED light therapy bathes the complexion in soothing, rejuvenating light — calming redness and supporting a healthier, more radiant glow.",
    features: [
      "7 LED light modes",
      "Hands-free contoured fit",
      "Wireless & rechargeable",
      "Clinically-inspired wavelengths",
    ],
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
