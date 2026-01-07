import RegisterClient from "@/src/components/public/RegisterClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Register Form",
  description:
    "Manage and track your short URLs with ease using TechNext Short Url Manager.",
};

export default function Page() {
  return <RegisterClient />;
}
