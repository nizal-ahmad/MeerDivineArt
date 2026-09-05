import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { api } from "@/services/api";
import { formatPrice } from "@/data/catalog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboardOverviewPage,
});

function AdminDashboardOverviewPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("30days");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dashRes, analyticsRes] = await Promise.all([
        api.getDashboardOverview(),
        api.getAnalytics(range),
      ]);

      if (dashRes.success) {
        setMetrics(dashRes.data.metrics);
        setRecentOrders(dashRes.data.recentOrders);
      }
      if (analyticsRes.success) {
        setAnalytics(analyticsRes.data);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [range]);

  const cards = [
    {
      title: "Total Revenue",
      value: metrics ? formatPrice(metrics.totalRevenue) : "Rs. 0",
      icon: DollarSign,
      color: "text-amber-700 bg-amber-100/60 border-amber-300/60",
    },
    {
      title: "Total Orders",
      value: metrics ? metrics.totalOrders : 0,
      icon: ShoppingBag,
      color: "text-brown bg-sand/60 border-gold/40",
    },
    {
      title: "Active Products",
      value: metrics ? metrics.totalProducts : 0,
      icon: Package,
      color: "text-emerald-800 bg-emerald-100/60 border-emerald-300/60",
    },
    {
      title: "Unique Customers",
      value: metrics ? metrics.uniqueCustomers : 0,
      icon: Users,
      color: "text-blue-800 bg-blue-100/60 border-blue-300/60",
    },
    {
      title: "Pending Orders",
      value: metrics ? metrics.pendingOrders : 0,
      icon: Clock,
      color: "text-burnt bg-burnt/10 border-burnt/30",
    },
    {
      title: "Completed Orders",
      value: metrics ? metrics.completedOrders : 0,
      icon: CheckCircle2,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
  ];

  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Real-time sales, order metrics, and catalog highlights"
      action={
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 bg-brown px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-burnt"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      }
    >
      {/* Metric Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="flex items-center justify-between border border-gold/25 bg-card p-5 shadow-[var(--shadow-soft)] transition-all hover:border-gold/60"
            >
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                  {card.title}
                </p>
                <p className="mt-2 font-display text-3xl text-brown">
                  {loading ? "…" : card.value}
                </p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-none border ${card.color}`}
              >
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts Section */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Sales Chart */}
        <div className="border border-gold/25 bg-card p-6 shadow-[var(--shadow-soft)] lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/20 pb-4">
            <div>
              <h2 className="font-display text-xl text-brown">Revenue Trend</h2>
              <p className="text-xs text-brown/60">Sales over selected timeframe</p>
            </div>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="border border-gold/40 bg-card px-3 py-1.5 text-xs text-brown outline-none"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="6months">Last 6 months</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="mt-6 h-72 w-full">
            {analytics && analytics.salesChart && analytics.salesChart.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.salesChart}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E1A140" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#E1A140" stopOpacity={0} />
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
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-brown/50">
                No revenue records for this period.
              </div>
            )}
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="border border-gold/25 bg-card p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between border-b border-gold/20 pb-4">
            <h2 className="font-display text-xl text-brown">Best Sellers</h2>
            <TrendingUp className="h-5 w-5 text-burnt" />
          </div>

          <div className="mt-6 space-y-4">
            {analytics &&
            analytics.bestSellingProducts &&
            analytics.bestSellingProducts.length > 0 ? (
              analytics.bestSellingProducts.map((p: any, idx: number) => (
                <div
                  key={p._id || idx}
                  className="flex items-center justify-between border-b border-gold/15 pb-3 text-xs"
                >
                  <div>
                    <p className="font-medium text-brown">{p._id}</p>
                    <p className="text-[0.65rem] text-brown/50 uppercase">
                      {p.quantitySold} units sold
                    </p>
                  </div>
                  <span className="font-semibold text-burnt">
                    {formatPrice(p.totalRevenue)}
                  </span>
                </div>
              ))
            ) : (
              <p className="py-10 text-center text-xs text-brown/50">
                No best sellers recorded yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="mt-8 border border-gold/25 bg-card p-6 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between border-b border-gold/20 pb-4">
          <div>
            <h2 className="font-display text-xl text-brown">Recent Customer Orders</h2>
            <p className="text-xs text-brown/60">Latest incoming orders</p>
          </div>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-burnt hover:text-brown"
          >
            View All Orders
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gold/20 text-[0.65rem] uppercase tracking-[0.2em] text-burnt">
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Order Status</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/15">
              {recentOrders && recentOrders.length > 0 ? (
                recentOrders.map((order: any) => (
                  <tr key={order._id} className="hover:bg-sand/20">
                    <td className="py-3 px-3 font-semibold text-brown">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-medium text-brown">{order.customer?.name}</p>
                      <p className="text-[0.65rem] text-brown/50">
                        {order.customer?.phone}
                      </p>
                    </td>
                    <td className="py-3 px-3 font-semibold text-brown">
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider ${
                          order.orderStatus === "delivered"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.orderStatus === "cancelled"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-900"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 uppercase text-[0.65rem] text-brown/70">
                      {order.paymentStatus}
                    </td>
                    <td className="py-3 px-3 text-brown/50">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-brown/50">
                    No orders placed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
