"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Link2,
  Users,
  MousePointerClick,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { UrlAPI } from "@/src/lib/api";
import { ShortUrl } from "./../../Types/urlTypes";
import { UrlTable } from "./UrlTable";
import { StatsCard } from "./StatsCard";
import { ApiError } from "@/src/Types/apiTypes";

export default function AdminDashboards() {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [overview, setOverview] = useState({
    totalUrls: 0,
    totalUsers: 0,
    totalClicks: 0,
    avgClicks: 0,
  });
  const [chartData, setChartData] = useState({
    weeklyClicks: [] as { date: string; clicks: number }[],
    weeklyUsers: [] as { date: string; users: number }[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await UrlAPI.getAllUrls();
        if (res.success) {
          setUrls(res.data.urls);
          setOverview({
            totalUrls: res.data.overview.totalUrls ?? 0,
            totalUsers: res.data.overview.totalUsers ?? 0,
            totalClicks: res.data.overview.totalClicks ?? 0,
            avgClicks: res.data.overview.avgClicks ?? 0,
          });
          setChartData(res.data.chartData);
        }
      } catch (error) {
        const err = error as ApiError;
        toast("Failed to fetch URLs", { description: err.message });
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
    }
  };

  // Map last 7 days to day names dynamically
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const clicksData = chartData.weeklyClicks.map((c) => {
    const date = new Date(c.date);
    return { name: weekDays[date.getDay()], clicks: c.clicks };
  });
  const usersData = chartData.weeklyUsers.map((u) => {
    const date = new Date(u.date);
    return { name: weekDays[date.getDay()], users: u.users };
  });

  if (loading) return <p>Loading...</p>;

  return (
    <section className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Admin Dashboard
          </h1>
        </div>
        <p className="text-muted-foreground">
          Monitor platform activity, manage users, and view analytics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total URLs"
          value={overview.totalUrls}
          icon={<Link2 className="w-6 h-6 text-primary" />}
          trend={{ value: 0, isPositive: true }}
        />
        <StatsCard
          title="Total Users"
          value={overview.totalUsers}
          icon={<Users className="w-6 h-6 text-primary" />}
          trend={{ value: 0, isPositive: true }}
        />
        <StatsCard
          title="Total Clicks"
          value={overview.totalClicks.toLocaleString()}
          icon={<MousePointerClick className="w-6 h-6 text-primary" />}
          trend={{ value: 0, isPositive: true }}
        />
        <StatsCard
          title="Avg Clicks/URL"
          value={Math.round(overview.avgClicks)}
          icon={<TrendingUp className="w-6 h-6 text-primary" />}
          trend={{ value: 0, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Clicks Chart */}
        <div className="p-4 rounded-sm border border-accent/50 shadow-soft bg-gray-900">
          <h3 className="text-lg font-display font-semibold text-foreground mb-6">
            Clicks This Week
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={clicksData}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="white" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="white" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="name" stroke="white" fontSize={12} />
                <YAxis stroke="white" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "black",
                    border: "1px solid white",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="white"
                  strokeWidth={2}
                  fill="url(#colorClicks)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users Chart */}
        <div className="p-6 rounded-sm bg-gray-900 border border-accent/50 shadow-soft">
          <h3 className="text-lg font-display font-semibold text-foreground mb-6">
            User Growth
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usersData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="name" stroke="white" fontSize={12} />
                <YAxis stroke="white" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "black",
                    border: "1px solid white",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="white"
                  strokeWidth={3}
                  dot={{ fill: "white", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* All URLs Table */}
      <div className="bg-gray-900 rounded-sm border border-accent/50 shadow-soft p-4 sm:p-6">
        <h2 className="text-xl font-display font-semibold text-foreground mb-6">
          All Platform URLs
        </h2>
        <UrlTable urls={urls} onDelete={handleDelete} showUser />
      </div>
    </section>
  );
}
