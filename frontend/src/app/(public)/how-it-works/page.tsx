import HowItWorks from "@/src/components/public/howItWorks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Manage and track your short URLs with ease using TechNext Short Url Manager.",
};
export default function Page() {
  return (
    <div>
      <HowItWorks />
    </div>
  );
}
