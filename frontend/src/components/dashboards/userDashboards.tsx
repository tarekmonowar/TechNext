"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Link2,
  MousePointerClick,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { ShortUrl, UserUrlsResponse } from "@/src/Types/urlTypes";
import { UrlAPI } from "@/src/lib/api";
import { StatsCard } from "./StatsCard";
import { UrlShortenerForm } from "./UrlShortenerForm";
import { UrlTable } from "./UrlTable";

export default function UserDashboards() {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [overview, setOverview] = useState<UserUrlsResponse["overview"] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const res = await UrlAPI.getUserUrls();
      if (res.success) {
        setUrls(res.data.urls);
        setOverview(res.data.overview);
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

  const handleUrlCreated = (newUrl: ShortUrl) => {
    setUrls((prev) => [newUrl, ...prev]);
    if (overview) {
      setOverview({
        ...overview,
        totalUrls: overview.totalUrls + 1,
        totalClicks: overview.totalClicks,
        avgClicks: Math.round(overview.totalClicks / (overview.totalUrls + 1)),
        thisMonthUrls: overview.thisMonthUrls ? overview.thisMonthUrls + 1 : 1,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await UrlAPI.delete(id);
      if (res.success) {
        setUrls((prev) => prev.filter((url) => url.id !== id));
        if (overview) {
          setOverview({
            ...overview,
            totalUrls: overview.totalUrls - 1,
          });
        }
      }
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

  const totalClicks = overview?.totalClicks ?? 0;
  const avgClicks = overview?.avgClicks ?? 0;
  const thisMonthUrls = overview?.thisMonthUrls ?? 0;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Welcome back!
        </h1>
        <p className="text-muted-foreground">
          Manage your shortened URLs and track their performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total URLs"
          value={overview?.totalUrls ?? 0}
          icon={<Link2 className="w-6 h-6 text-primary" />}
        />
        <StatsCard
          title="Total Clicks"
          value={totalClicks.toLocaleString()}
          icon={<MousePointerClick className="w-6 h-6 text-primary" />}
        />
        <StatsCard
          title="Avg. Clicks/URL"
          value={avgClicks}
          icon={<TrendingUp className="w-6 h-6 text-primary" />}
        />
        <StatsCard
          title="This Month"
          value={thisMonthUrls}
          icon={<Calendar className="w-6 h-6 text-primary" />}
        />
      </div>

      {/* URL Shortener */}
      <div className="my-10 xl:my-20">
        <UrlShortenerForm
          onUrlCreated={handleUrlCreated}
          urlCount={overview?.totalUrls ?? 0}
          maxUrls={100}
        />
      </div>

      {/* URLs Table */}
      <div className="bg-gray-900 rounded-sm border border-accent/50 shadow-soft p-6">
        <h2 className="text-xl font-display font-semibold text-foreground mb-6">
          Your Shortened URLs
        </h2>
        <UrlTable urls={urls} onDelete={handleDelete} />
      </div>
    </div>
  );
}
