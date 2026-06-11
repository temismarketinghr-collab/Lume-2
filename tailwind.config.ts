import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FEFBF0",
        brand: "#367FB6",
        body: "#777171",
        charcoal: "#2B2B2B",
        coral: "#F6D9CF",
        steel: "#D9E4EC",
        lavender: "#E7E0F2",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 40px -12px rgba(43, 43, 43, 0.12)",
        glow: "0 18px 50px -10px rgba(54, 127, 182, 0.35)",
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
