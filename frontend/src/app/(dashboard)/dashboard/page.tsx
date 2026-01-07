import UserDashboards from "@/src/components/dashboards/userDashboards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboards",
  description:
    "Manage and track your short URLs with ease using TechNext Short Url Manager.",
};
export default function Page() {
  return (
    <div>
      <UserDashboards />
    </div>
  );
}
