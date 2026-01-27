import GlassBackground from "../components/landing/GlassBackground";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import PricingSection from "../components/landing/PricingSection";
import FaqSection from "../components/landing/FaqSection";
import FinalCtaSection from "../components/landing/FinalCtaSection";
import Footer from "../components/landing/Footer";




export default function LandingPage() {
  return (
    <GlassBackground>
      <Navbar />

      <div className="mx-auto w-full max-w-6xl px-4 pb-16">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
        <Footer />
      </div>
    </GlassBackground>
  );
}
