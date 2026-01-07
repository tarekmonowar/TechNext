"use client";

import { logoutUser } from "@/src/lib/logoutUser";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Link2, LogOut, Shield, User } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
} from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";

export default function UserNavbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  // console.log(user);
  const pathname = usePathname();

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) router.push("/login");
  };

  const isHeroPage = pathname === "/";
  const isActive = (path: string) => pathname === path;

  return (
    <header className="border-b bg-background backdrop-blur-sm sticky top-0 z-50">
      <nav className="flex items-center max-w-7xl justify-between py-3  mx-auto px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl  shadow-glow group-hover:scale-105 transition-transform">
            <Link2 className="w-5 h-5 " />
          </div>
          <span
            className={`text-xl font-display font-bold ${
              isHeroPage ? "text-hero-foreground" : "text-foreground"
            }`}
          >
            Shortify
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/apps"
            className={`text-md font-semibold transition-colors hover:text-primary ${
              isActive("/apps")
                ? "text-primary"
                : isHeroPage
                ? "text-hero-muted hover:text-hero-foreground"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Apps
          </Link>
          <Link
            href="/how-it-works"
            className={`text-md font-semibold transition-colors hover:text-primary  ${
              isActive("/how-it-works")
                ? "text-primary"
                : isHeroPage
                ? "text-hero-muted hover:text-hero-foreground"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className={`text-md font-semibold transition-colors hover:text-primary ${
              isActive("/pricing")
                ? "text-primary"
                : isHeroPage
                ? "text-hero-muted hover:text-hero-foreground"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button variant="outline">
                  <Link
                    href={
                      user.role === "admin" ? "/admin/dashboard" : "/dashboard"
                    }
                    className="flex cursor-pointer justify-center items-center"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="gap-2">
                      <User className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {user.role === "user" && (
                      <DropdownMenuItem>
                        <Link
                          href="/dashboard"
                          className="flex cursor-pointer hover:bg-"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {user.role === "admin" && (
                      <DropdownMenuItem>
                        <Link
                          href="/admin/dashboard"
                          className="flex justify-center items-center"
                        >
                          {" "}
                          <Shield className="w-4 h-4 mr-2" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => signIn()}>
                  Login
                </Button>
                <Button>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
