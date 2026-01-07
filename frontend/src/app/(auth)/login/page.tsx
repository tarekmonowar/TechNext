import LoginClient from "@/src/components/public/LoginClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login Form",
  description:
    "Manage and track your short URLs with ease using TechNext Short Url Manager.",
};

export default function Page() {
  return <LoginClient />;
}
