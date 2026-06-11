export type Product = {
  name: string;
  price: string;
  tag: string;
  image: string;
  panel: string; // class for the soft image panel
};

export const products: Product[] = [
  {
    name: "Neck & Face Lifting Device",
    price: "$30",
    tag: "Best Seller",
    image: "/products/lifting-device.png",
    panel: "product-panel",
  },
  {
    name: "Pore Cleansing Tool",
    price: "$59",
    tag: "Best Seller",
    image: "/products/cleansing-tool.png",
    panel: "product-panel",
  },
  {
    name: "LED Therapy Mask",
    price: "$89",
    tag: "New Arrival",
    image: "/products/led-mask.png",
    panel: "product-panel",
  },
];
