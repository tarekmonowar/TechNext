import AdminDashboards from "@/src/components/dashboards/AdminDashboards";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Manage and track your short URLs with ease using TechNext Short Url Manager.",
};
export default function Page() {
  return <AdminDashboards />;
}
