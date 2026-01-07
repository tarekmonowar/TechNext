"use client";
import { UrlTable } from "@/src/components/dashboards/UrlTable";
import { UrlAPI } from "@/src/lib/api";
import { ShortUrl } from "@/src/Types/urlTypes";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [urls, setUrls] = useState<ShortUrl[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const res = await UrlAPI.getUserUrls();
      if (res.success) {
        setUrls(res.data.urls);
      }
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await UrlAPI.delete(id);
      if (res.success) {
        setUrls((prev) => prev.filter((url) => url.id !== id));
      }
      toast.success("Url delete successfully");
    } catch (err) {
      console.error("Failed to delete URL:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-sm border border-accent/50 shadow-soft p-6">
      <h2 className="text-xl font-display font-semibold text-foreground mb-6">
        Your Shortened URLs
      </h2>
      <UrlTable urls={urls} onDelete={handleDelete} />
    </div>
  );
}
