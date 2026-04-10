import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Features } from "@/components/sections/Features";
import { ProductDemo } from "@/components/sections/ProductDemo";
import { UseCases } from "@/components/sections/UseCases";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Hero />
        <TrustBar />
        <Features />
        <ProductDemo />
        <UseCases />
        <HowItWorks />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
