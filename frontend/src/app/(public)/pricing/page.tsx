import PricingSection from "@/src/components/public/pricingSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Manage and track your short URLs with ease using TechNext Short Url Manager.",
};

export default function Page() {
  return (
    <div>
      <PricingSection />
    </div>
  );
}
