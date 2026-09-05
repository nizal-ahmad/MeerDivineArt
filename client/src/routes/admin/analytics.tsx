import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, ShoppingBag, FolderTree, Calendar } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { api } from "@/services/api";
import { formatPrice } from "@/data/catalog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/analytics")({
  component: AdminAnalyticsPage,
});

function AdminAnalyticsPage() {
  const [range, setRange] = useState("30days");
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.getAnalytics(range);
      if (res.success) {
        setAnalytics(res.data);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [range]);

  return (
    <AdminLayout
      title="Store Analytics & Insights"
      subtitle="Comprehensive sales performance, category metrics, and customer purchasing trends"
      action={
        <div className="flex items-center gap-2 border border-gold/40 bg-card px-3 py-1.5 text-xs text-brown">
          <Calendar className="h-4 w-4 text-burnt" />
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="bg-transparent font-semibold uppercase text-brown outline-none cursor-pointer"
          >
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="6months">Last 6 Months</option>
            <option value="year">This Year</option>
          </select>
        </div>
      }
    >
      {/* Revenue Over Time Chart */}
      <div className="border border-gold/25 bg-card p-6 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between border-b border-gold/20 pb-4">
          <div>
            <h2 className="font-display text-2xl text-brown">Revenue Trend Analysis</h2>
            <p className="text-xs text-brown/60">Total earnings aggregated over time</p>
          </div>
          <TrendingUp className="h-6 w-6 text-burnt" />
        </div>

        <div className="mt-6 h-80 w-full">
          {analytics && analytics.salesChart && analytics.salesChart.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.salesChart}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E1A140" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#E1A140" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFCFA0" opacity={0.4} />
                <XAxis dataKey="date" stroke="#532200" fontSize={11} />
                <YAxis stroke="#532200" fontSize={11} />
                <Tooltip
                  formatter={(val: any) => [formatPrice(val), "Revenue"]}
                  contentStyle={{
                    backgroundColor: "#FAF7F2",
                    borderColor: "#E1A140",
                    borderRadius: "0px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#914110"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-brown/50">
              No revenue data recorded for the selected timeframe.
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Orders Volume Chart */}
        <div className="border border-gold/25 bg-card p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between border-b border-gold/20 pb-4">
            <div>
              <h2 className="font-display text-xl text-brown">Order Volumes</h2>
              <p className="text-xs text-brown/60">Number of orders placed</p>
            </div>
            <ShoppingBag className="h-5 w-5 text-burnt" />
          </div>

          <div className="mt-6 h-64 w-full">
            {analytics && analytics.salesChart && analytics.salesChart.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.salesChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFCFA0" opacity={0.4} />
                  <XAxis dataKey="date" stroke="#532200" fontSize={11} />
                  <YAxis stroke="#532200" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FAF7F2",
                      borderColor: "#E1A140",
                    }}
                  />
                  <Bar dataKey="orders" fill="#532200" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-brown/50">
                No orders recorded.
              </div>
            )}
          </div>
        </div>

        {/* Category Performance */}
        <div className="border border-gold/25 bg-card p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between border-b border-gold/20 pb-4">
            <div>
              <h2 className="font-display text-xl text-brown">Category Distribution</h2>
              <p className="text-xs text-brown/60">Number of active products per collection</p>
            </div>
            <FolderTree className="h-5 w-5 text-burnt" />
          </div>

          <div className="mt-6 h-64 w-full">
            {analytics && analytics.categoryPerformance && analytics.categoryPerformance.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.categoryPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFCFA0" opacity={0.4} />
                  <XAxis type="number" stroke="#532200" fontSize={11} />
                  <YAxis dataKey="name" type="category" stroke="#532200" fontSize={10} width={110} />
                  <Tooltip contentStyle={{ backgroundColor: "#FAF7F2", borderColor: "#E1A140" }} />
                  <Bar dataKey="productsCount" name="Products" fill="#914110" radius={[0, 2, 2, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-brown/50">
                No categories available.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
