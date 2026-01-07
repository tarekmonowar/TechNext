"use client";

import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { UserAPI } from "./api";

export const logoutUser = async (): Promise<boolean> => {
  try {
    const res = await UserAPI.logout();

    if (res.success) {
      toast.success("Logged out successfully");
      await signOut({ redirect: false });
      return true;
    } else {
      toast.error(res.message || "Logout failed");
      return false;
    }
  } catch (err: unknown) {
    console.error("Logout error:", err);
    toast.error(
      (err as { message?: string })?.message || "Something went wrong",
    );
    return false;
  }
};
