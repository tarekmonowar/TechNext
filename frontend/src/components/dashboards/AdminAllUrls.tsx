"use client";

import { UrlAPI } from "@/src/lib/api";
import { ApiError } from "@/src/Types/apiTypes";
import { ShortUrl } from "@/src/Types/urlTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UrlTable } from "./UrlTable";

export default function AdminAllUrls() {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await UrlAPI.getAllUrls();
        if (res.success) {
          setUrls(res.data.urls);
        }
      } catch (error) {
        const err = error as ApiError;
        toast("Failed to fetch URLs", {
          description: err.message || "Something went wrong",
        });
        console.error("AdminAllUrls fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await UrlAPI.delete(id);
      setUrls((prev) => prev.filter((url) => url.id !== id));
      toast("URL deleted successfully");
    } catch (error) {
      const err = error as ApiError;
      toast("Failed to delete URL", { description: err.message });
      console.error("Delete URL error:", err);
    }
  };

  if (loading) return <div>Loading URLs...</div>;

  return (
    <div className="p-6 bg-gray-900  rounded-sm border border-accent/50 shadow-soft">
      <h1 className="text-2xl font-semibold text-foreground mb-4">
        All Platform URLs
      </h1>
      {urls.length === 0 ? (
        <p className="text-muted-foreground">No URLs found.</p>
      ) : (
        <UrlTable urls={urls} onDelete={handleDelete} showUser />
      )}
    </div>
  );
}
