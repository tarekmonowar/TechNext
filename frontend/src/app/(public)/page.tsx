import { AppDownloadSection } from "@/src/components/public/AppDownload";
import CTASection from "@/src/components/public/CTASection";
import HeroComponents from "@/src/components/public/herocomponents";
import HowItWorks from "@/src/components/public/howItWorks";
import PricingSection from "@/src/components/public/pricingSection";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "TechNext",
  description:
    "Manage and track your short URLs with ease using TechNext Short Url Manager.",
};

export default function Home() {
  return (
    <div>
      <main>
        <HeroComponents />
        <HowItWorks />
        <PricingSection />
        <AppDownloadSection />
        <CTASection />
      </main>
    </div>
  );
}
