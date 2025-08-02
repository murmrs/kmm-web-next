import QuoteCarousel from "@/components/quote-carousel";
import PricingHero from "@/components/pricing/pricing-hero";
import PricingSection from "@/components/pricing/pricing-section";
import FeatureComparison from "@/components/pricing/feature-comparison";
import BenefitsSection from "@/components/pricing/benefits-section";
import PricingFAQ from "@/components/pricing/pricing-faq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Stop paying for features you don't use. Get the complete menu builder and discovery experience with Know My Menu.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b to-white via-white from-(--muted) to-60% -my-12">
      <PricingHero />
      <PricingSection />
      <FeatureComparison />
      <BenefitsSection />
      <QuoteCarousel />
      <PricingFAQ />
    </div>
  );
}
