"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { BarChart, User, Link as LinkIcon, LogOut, Link2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session) return null;

  const links = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: <BarChart className="h-4 w-4" />,
    },
    {
      href: "/admin/dashboard/all-urls",
      label: "All URLs",
      icon: <LinkIcon className="h-4 w-4" />,
    },
    {
      href: "/admin/dashboard/users",
      label: "All Users",
      icon: <User className="h-4 w-4" />,
    },
  ];

  return (
    <aside className="sticky top-0 h-screen w-64 flex flex-col justify-between border-r bg-card py-6">
      <div>
        <h2 className="mb-5 px-4">
          <Link href="/" className="flex items-center gap-2 group ">
            <div className="p-2 rounded-xl  shadow-glow group-hover:scale-105 transition-transform">
              <Link2 className="w-5 h-5 " />
            </div>
            <span className={`text-xl font-display font-bold `}>Shortify</span>
          </Link>
        </h2>

        <nav className="flex flex-col gap-2 px-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded px-3 py-2 text-sm border
                ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "bg-background hover:bg-accent/50 hover:text-accent-foreground"
                }`}
              >
                {link.icon} {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-2 px-4">
        <Button
          variant="destructive"
          className="flex items-center gap-2 rounded-none"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>
    </aside>
  );
}
