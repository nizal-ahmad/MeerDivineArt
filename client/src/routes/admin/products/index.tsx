import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Star,
  SlidersHorizontal,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { api } from "@/services/api";
import { formatPrice } from "@/data/catalog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products/")({
  component: AdminProductsPage,
});

function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [active, setActive] = useState("all");
  const [page, setPage] = useState(1);

  // Delete Confirmation Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetProduct, setTargetProduct] = useState<any>(null);

  const loadCategories = async () => {
    try {
      const res = await api.getCategories(true);
      if (res.success) setCategories(res.data);
    } catch (err) {}
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await api.getProducts({
        page,
        limit: 10,
        search,
        category: category === "all" ? "" : category,
        active: active === "all" ? "" : active,
        includeInactive: "true",
      });

      if (res.success) {
        setProducts(res.data.products);
        setPagination(res.data.pagination);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [page, search, category, active]);

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await api.toggleProductStatus(id);
      if (res.success) {
        toast.success(res.message);
        loadProducts();
      }
    } catch (err: any) {
      toast.error(err.message || "Could not toggle product status");
    }
  };

  const handleDelete = async () => {
    if (!targetProduct) return;
    try {
      const res = await api.deleteProduct(targetProduct._id);
      if (res.success) {
        toast.success("Product deleted successfully");
        setDeleteModalOpen(false);
        setTargetProduct(null);
        loadProducts();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete product");
    }
  };

  return (
    <AdminLayout
      title="Product Catalog Management"
      subtitle="Add, edit, filter, and manage your handcrafted frames and art inventory"
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
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border border-gold/25 bg-card p-4 shadow-[var(--shadow-soft)]">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search product name, SKU…"
              className="w-full border border-gold/40 bg-ivory pl-9 pr-4 py-2 text-xs text-brown outline-none focus:border-gold"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-brown/40" />
          </div>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="border border-gold/40 bg-ivory px-3 py-2 text-xs text-brown outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={active}
            onChange={(e) => {
              setActive(e.target.value);
              setPage(1);
            }}
            className="border border-gold/40 bg-ivory px-3 py-2 text-xs text-brown outline-none"
          >
            <option value="all">All Status</option>
            <option value="true">Active Only</option>
            <option value="false">Inactive Only</option>
          </select>
        </div>

        <div className="text-xs uppercase tracking-[0.18em] text-brown/60">
          Total {pagination.total} Products
        </div>
      </div>

      {/* Product Table */}
      <div className="mt-6 border border-gold/25 bg-card shadow-[var(--shadow-soft)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gold/25 bg-sand/30 text-[0.65rem] uppercase tracking-[0.2em] text-burnt">
                <th className="py-3.5 px-4">Image</th>
                <th className="py-3.5 px-4">Product Name / SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/15">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-brown/60">
                    Loading products catalog…
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((p) => {
                  const imgUrl = p.images && p.images[0] ? p.images[0].url : "";
                  return (
                    <tr key={p._id} className="hover:bg-sand/20 transition-colors">
                      <td className="py-3 px-4">
                        <div className="h-12 w-12 border border-gold/30 bg-beige/60 overflow-hidden flex items-center justify-center">
                          {imgUrl ? (
                            <img src={imgUrl} alt={p.name} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-[0.6rem] text-brown/40 uppercase">No Img</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-brown">{p.name}</p>
                          {p.featured ? (
                            <span title="Featured">
                              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                            </span>
                          ) : null}
                          {p.badge ? (
                            <span className="bg-brown/80 text-ivory text-[0.55rem] uppercase px-1.5 py-0.5">
                              {p.badge}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-0.5 text-[0.65rem] text-brown/50 uppercase tracking-wider">
                          {p.sku}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-brown/80">{p.categoryName}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-brown">{formatPrice(p.price)}</span>
                        {p.discountPrice ? (
                          <span className="block text-[0.65rem] text-brown/40 line-through">
                            {formatPrice(p.discountPrice)}
                          </span>
                        ) : null}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            p.stock > 5 ? "text-emerald-700" : p.stock > 0 ? "text-amber-700" : "text-burnt"
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(p._id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider transition-colors ${
                            p.active
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                          }`}
                        >
                          {p.active ? (
                            <>
                              <CheckCircle className="h-3 w-3" /> Active
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3" /> Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/products/${p._id}/edit` as any}
                            className="p-1.5 text-brown/70 hover:text-burnt transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              setTargetProduct(p);
                              setDeleteModalOpen(true);
                            }}
                            className="p-1.5 text-brown/50 hover:text-burnt transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-brown/60">
                    No products match your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
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

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && targetProduct ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4">
          <div className="w-full max-w-md border border-gold/40 bg-ivory p-6 shadow-xl">
            <h3 className="font-display text-2xl text-brown">Confirm Delete</h3>
            <p className="mt-2 text-sm text-brown/70">
              Are you sure you want to permanently delete{" "}
              <strong className="text-brown">{targetProduct.name}</strong>?
            </p>
            <p className="mt-1 text-xs text-burnt">
              This action will also remove associated Cloudinary images and cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="border border-brown/30 px-5 py-2.5 text-xs uppercase font-semibold text-brown hover:bg-sand/40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-burnt px-5 py-2.5 text-xs uppercase font-semibold text-ivory hover:bg-brown"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
}
