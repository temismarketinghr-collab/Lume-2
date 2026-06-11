import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Products from "@/components/Products";
import TreatmentProcess from "@/components/TreatmentProcess";
import Science from "@/components/Science";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-cream">
      <Navbar />
      <Hero />
      <Products />
      <Showcase />
      <TreatmentProcess />
      <Science />
      <Footer />
    </main>
  );
}
