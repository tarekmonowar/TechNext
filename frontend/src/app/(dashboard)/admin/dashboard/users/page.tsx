import AdminAllUsers from "@/src/components/dashboards/AdminAllusers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Users",
  description:
    "Manage and track your short URLs with ease using TechNext Short Url Manager.",
};
export default function Page() {
  return <AdminAllUsers />;
}
