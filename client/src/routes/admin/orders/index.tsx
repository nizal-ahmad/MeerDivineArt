import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Eye, ShoppingBag, Truck, CheckCircle2, Clock, X } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { api } from "@/services/api";
import { formatPrice } from "@/data/catalog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders/")({
  component: AdminOrdersPage,
});

function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  // Order Details Modal
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await api.getOrders({
        page,
        limit: 10,
        search,
        status: status === "all" ? "" : status,
      });

      if (res.success) {
        setOrders(res.data.orders);
        setPagination(res.data.pagination);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [page, search, status]);

  const handleUpdateStatus = async (orderId: string, newOrderStatus: string, newPaymentStatus?: string) => {
    try {
      const res = await api.updateOrderStatus(orderId, {
        orderStatus: newOrderStatus,
        paymentStatus: newPaymentStatus,
      });
      if (res.success) {
        toast.success(`Order ${res.data.orderNumber} status updated to ${newOrderStatus}`);
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder(res.data);
        }
        loadOrders();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update order status");
    }
  };

  return (
    <AdminLayout
      title="Customer Orders Management"
      subtitle="Track customer purchases, fulfillment status, and delivery addresses"
    >
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border border-gold/25 bg-card p-4 shadow-[var(--shadow-soft)]">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative min-w-[240px] flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search order #, customer name, phone, city…"
              className="w-full border border-gold/40 bg-ivory pl-9 pr-4 py-2 text-xs text-brown outline-none focus:border-gold"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-brown/40" />
          </div>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="border border-gold/40 bg-ivory px-3 py-2 text-xs text-brown outline-none"
          >
            <option value="all">All Order Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="text-xs uppercase tracking-[0.18em] text-brown/60">
          Total {pagination.total} Orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="mt-6 border border-gold/25 bg-card shadow-[var(--shadow-soft)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gold/25 bg-sand/30 text-[0.65rem] uppercase tracking-[0.2em] text-burnt">
                <th className="py-3.5 px-4">Order #</th>
                <th className="py-3.5 px-4">Customer Info</th>
                <th className="py-3.5 px-4">Items Count</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Order Status</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Order Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/15">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-brown/60">
                    Loading customer orders…
                  </td>
                </tr>
              ) : orders.length > 0 ? (
                orders.map((o) => (
                  <tr key={o._id} className="hover:bg-sand/20 transition-colors">
                    <td className="py-3 px-4 font-semibold text-brown">{o.orderNumber}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-brown">{o.customer?.name}</p>
                      <p className="text-[0.65rem] text-brown/60">{o.customer?.phone} • {o.customer?.city}</p>
                    </td>
                    <td className="py-3 px-4 text-brown/80">{o.items?.length || 0} items</td>
                    <td className="py-3 px-4 font-semibold text-brown">{formatPrice(o.totalAmount)}</td>
                    <td className="py-3 px-4">
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleUpdateStatus(o._id, e.target.value)}
                        className={`border px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider outline-none ${
                          o.orderStatus === "delivered"
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : o.orderStatus === "cancelled"
                              ? "border-rose-300 bg-rose-50 text-rose-800"
                              : "border-amber-300 bg-amber-50 text-amber-900"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 uppercase text-[0.65rem] font-medium text-brown/70">
                      {o.paymentStatus}
                    </td>
                    <td className="py-3 px-4 text-brown/50">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedOrder(o);
                          setModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 border border-brown/30 bg-card px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-wider text-brown hover:bg-brown hover:text-ivory"
                      >
                        <Eye className="h-3.5 w-3.5" /> Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-brown/60">
                    No orders found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 ? (
          <div className="flex items-center justify-between border-t border-gold/25 px-5 py-4 text-xs">
            <span className="text-brown/60">
              Page {pagination.page} of {pagination.pages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="border border-gold/40 px-4 py-2 uppercase text-[0.65rem] font-semibold text-brown disabled:opacity-40 hover:bg-sand/40"
              >
                Previous
              </button>
              <button
                disabled={page >= pagination.pages}
                onClick={() => setPage((p) => p + 1)}
                className="border border-gold/40 px-4 py-2 uppercase text-[0.65rem] font-semibold text-brown disabled:opacity-40 hover:bg-sand/40"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Order Detail Modal */}
      {modalOpen && selectedOrder ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gold/40 bg-ivory p-6 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b border-gold/20 pb-4">
              <div>
                <h3 className="font-display text-2xl text-brown">
                  Order Details: {selectedOrder.orderNumber}
                </h3>
                <p className="text-brown/60">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-brown">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {/* Customer Info */}
              <div className="border border-gold/25 bg-card p-4">
                <h4 className="font-semibold uppercase tracking-[0.18em] text-burnt border-b border-gold/20 pb-2">
                  Customer & Delivery
                </h4>
                <div className="mt-3 space-y-1 text-brown/80">
                  <p className="font-semibold text-brown text-sm">{selectedOrder.customer?.name}</p>
                  <p><strong>Phone:</strong> {selectedOrder.customer?.phone}</p>
                  <p><strong>Email:</strong> {selectedOrder.customer?.email}</p>
                  <p><strong>City:</strong> {selectedOrder.customer?.city}</p>
                  <p className="pt-1"><strong>Address:</strong> {selectedOrder.customer?.address}</p>
                </div>
              </div>

              {/* Payment & Status */}
              <div className="border border-gold/25 bg-card p-4">
                <h4 className="font-semibold uppercase tracking-[0.18em] text-burnt border-b border-gold/20 pb-2">
                  Status & Payment
                </h4>
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-brown/60 uppercase text-[0.6rem] tracking-wider">
                      Fulfillment Status
                    </label>
                    <select
                      value={selectedOrder.orderStatus}
                      onChange={(e) => handleUpdateStatus(selectedOrder._id, e.target.value)}
                      className="mt-1 w-full border border-gold/40 bg-ivory p-2 text-xs text-brown outline-none font-semibold"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-brown/60 uppercase text-[0.6rem] tracking-wider">
                      Payment Status
                    </label>
                    <select
                      value={selectedOrder.paymentStatus}
                      onChange={(e) => handleUpdateStatus(selectedOrder._id, selectedOrder.orderStatus, e.target.value)}
                      className="mt-1 w-full border border-gold/40 bg-ivory p-2 text-xs text-brown outline-none font-semibold"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                  <p className="text-brown/70"><strong>Method:</strong> {selectedOrder.paymentMethod || "Cash on Delivery"}</p>
                </div>
              </div>
            </div>

            {/* Ordered Items List */}
            <div className="mt-6 border border-gold/25 bg-card p-4">
              <h4 className="font-semibold uppercase tracking-[0.18em] text-burnt border-b border-gold/20 pb-2">
                Ordered Artwork Items
              </h4>
              <div className="mt-3 divide-y divide-gold/15">
                {selectedOrder.items?.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-12 w-12 object-cover border border-gold/30" />
                      ) : (
                        <div className="h-12 w-12 bg-sand/40 border border-gold/30 flex items-center justify-center text-[0.6rem]">Art</div>
                      )}
                      <div>
                        <p className="font-semibold text-brown">{item.name}</p>
                        <p className="text-[0.65rem] text-brown/60">
                          {item.size ? `Size: ${item.size}` : ""} {item.frameColor ? `• Frame: ${item.frameColor}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="text-right font-semibold text-brown">
                      <p>{formatPrice(item.price)} × {item.quantity}</p>
                      <p className="text-burnt">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-gold/30 pt-3 flex justify-between items-center text-sm font-semibold text-brown">
                <span>Total Amount Due:</span>
                <span className="font-display text-xl text-burnt">{formatPrice(selectedOrder.totalAmount)}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="bg-brown px-6 py-2.5 uppercase font-semibold text-ivory hover:bg-burnt"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
}
