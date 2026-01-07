"use client";

import UserSidebar from "@/src/components/navbar/dashboardsUserSidebar";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session || session.user.role !== "user") {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <UserSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
