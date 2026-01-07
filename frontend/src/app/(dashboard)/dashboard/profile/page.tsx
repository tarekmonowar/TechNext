import UserProfile from "@/src/components/dashboards/UserProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Manage and track your short URLs with ease using TechNext Short Url Manager.",
};
export default function Page() {
  return <UserProfile />;
}
