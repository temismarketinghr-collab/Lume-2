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
  {
    slug: "skin-spatula",
    name: "Skin Spatula",
    price: "$45",
    tag: "New Arrival",
    image: "/products/skin-spatula.png",
    panel: "product-panel",
    description:
      "High-frequency ultrasonic vibration gently exfoliates and lifts — sweeping away dead cells and impurities while helping serums absorb for smoother, refreshed skin.",
    features: [
      "Cleaning · Lifting · Moisturizing modes",
      "Stainless-steel spatula tip",
      "High-frequency ultrasonic waves",
      "USB-C rechargeable",
    ],
  },
  {
    slug: "eye-care-pen",
    name: "Eye Care Pen",
    price: "$25",
    tag: "New Arrival",
    image: "/products/eye-care-pen.png",
    panel: "product-panel",
    description:
      "Gentle warmth and micro-vibration de-puff and smooth the delicate eye area — easing the look of fine lines, dark circles, and morning puffiness.",
    features: [
      "Warmth + micro-vibration",
      "Rounded metal massage tip",
      "Targeted eye & lip care",
      "USB-C rechargeable",
    ],
  },
  {
    slug: "lifting-roller",
    name: "Lifting Roller",
    price: "$39",
    tag: "Best Seller",
    image: "/products/lifting-roller.png",
    panel: "product-panel",
    description:
      "Dual microcurrent roller heads glide along your contours to tone, firm, and sculpt — with UP, SLIM, and BODY modes for the face and body.",
    features: [
      "Dual roller heads",
      "UP · SLIM · BODY modes",
      "Microcurrent toning",
      "Face & body use",
    ],
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
