"use client";

import { UserAPI } from "@/src/lib/api";
import { ApiError } from "@/src/Types/apiTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserTable } from "./UserTable";
import { AdminUser } from "@/src/Types/userTypes";

export default function AdminAllUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await UserAPI.getAllUsers();
        if (res.success) setUsers(res.data);
      } catch (error) {
        const err = error as ApiError;
        toast("Failed to fetch users", { description: err.message });
        console.error("AdminAllUsers fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast("User deleted successfully");
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="p-6 bg-gray-900 rounded-sm border border-accent/50 shadow-soft">
      <h1 className="text-2xl font-semibold text-foreground mb-4">All Users</h1>
      <UserTable users={users} onDelete={handleDelete} />
    </div>
  );
}
