import { AppDownloadSection } from "@/src/components/public/AppDownload";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps",
  description:
    "Manage and track your short URLs with ease using TechNext Short Url Manager.",
};
export default function Page() {
  return (
    <div>
      <AppDownloadSection />
    </div>
  );
}
