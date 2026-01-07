import AdminAllUrls from "@/src/components/dashboards/AdminAllUrls";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Urls",
  description:
    "Manage and track your short URLs with ease using TechNext Short Url Manager.",
};

export default function Page() {
  return <AdminAllUrls />;
}
