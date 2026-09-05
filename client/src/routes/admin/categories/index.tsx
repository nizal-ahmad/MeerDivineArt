import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Edit, Trash2, CheckCircle, XCircle, Upload, X } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { api } from "@/services/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/categories/")({
  component: AdminCategoriesPage,
});

function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetCategory, setTargetCategory] = useState<any>(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await api.getCategories(true);
      if (res.success) {
        setCategories(res.data);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName("");
    setTagline("");
    setDescription("");
    setActive(true);
    setImageFile(null);
    setImagePreview("");
    setModalOpen(true);
  };

  const openEditModal = (cat: any) => {
    setEditingCategory(cat);
    setName(cat.name || "");
    setTagline(cat.tagline || "");
    setDescription(cat.description || "");
    setActive(Boolean(cat.active));
    setImageFile(null);
    setImagePreview(cat.image?.url || "");
    setModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await api.toggleCategoryStatus(id);
      if (res.success) {
        toast.success(res.message);
        loadCategories();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to toggle category status");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("tagline", tagline);
      formData.append("description", description);
      formData.append("active", String(active));
      if (imageFile) formData.append("image", imageFile);

      if (editingCategory) {
        const res = await api.updateCategory(editingCategory._id, formData);
        if (res.success) {
          toast.success("Category updated successfully!");
          setModalOpen(false);
          loadCategories();
        }
      } else {
        const res = await api.createCategory(formData);
        if (res.success) {
          toast.success("Category created successfully!");
          setModalOpen(false);
          loadCategories();
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!targetCategory) return;
    try {
      const res = await api.deleteCategory(targetCategory._id);
      if (res.success) {
        toast.success("Category deleted successfully");
        setDeleteModalOpen(false);
        setTargetCategory(null);
        loadCategories();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete category");
    }
  };

  return (
    <AdminLayout
      title="Category Management"
      subtitle="Organize product collections, taglines, and category banners"
      action={
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-brown px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-burnt"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      }
    >
      <div className="border border-gold/25 bg-card shadow-[var(--shadow-soft)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gold/25 bg-sand/30 text-[0.65rem] uppercase tracking-[0.2em] text-burnt">
                <th className="py-3.5 px-4">Banner Image</th>
                <th className="py-3.5 px-4">Category Name / Slug</th>
                <th className="py-3.5 px-4">Tagline</th>
                <th className="py-3.5 px-4">Products</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/15">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-brown/60">
                    Loading categories…
                  </td>
                </tr>
              ) : categories.length > 0 ? (
                categories.map((c) => (
                  <tr key={c._id} className="hover:bg-sand/20 transition-colors">
                    <td className="py-3 px-4">
                      <div className="h-12 w-16 border border-gold/30 bg-beige/60 overflow-hidden flex items-center justify-center">
                        {c.image?.url ? (
                          <img src={c.image.url} alt={c.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-[0.6rem] text-brown/40 uppercase">No Banner</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-brown">{c.name}</p>
                      <p className="text-[0.65rem] text-brown/50 uppercase tracking-wider">{c.slug}</p>
                    </td>
                    <td className="py-3 px-4 italic text-brown/70">{c.tagline || "—"}</td>
                    <td className="py-3 px-4 font-semibold text-brown">
                      {c.productCount !== undefined ? c.productCount : 0} items
                    </td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(c._id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider transition-colors ${
                          c.active
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                        }`}
                      >
                        {c.active ? (
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
                        <button
                          onClick={() => openEditModal(c)}
                          className="p-1.5 text-brown/70 hover:text-burnt transition-colors"
                          title="Edit Category"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setTargetCategory(c);
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 text-brown/50 hover:text-burnt transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-brown/60">
                    No categories created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4">
          <div className="w-full max-w-lg border border-gold/40 bg-ivory p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-gold/20 pb-3">
              <h3 className="font-display text-2xl text-brown">
                {editingCategory ? "Edit Category" : "Create New Category"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-brown">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-[0.18em] text-burnt">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Islamic Calligraphy"
                  className="mt-1.5 w-full border border-gold/40 bg-card px-3 py-2 text-sm text-brown outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-[0.18em] text-burnt">
                  Tagline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Verses rendered by hand"
                  className="mt-1.5 w-full border border-gold/40 bg-card px-3 py-2 text-sm text-brown outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-[0.18em] text-burnt">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of this collection..."
                  className="mt-1.5 w-full border border-gold/40 bg-card px-3 py-2 text-sm text-brown outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-[0.18em] text-burnt">
                  Category Banner Image (Cloudinary)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1.5 block w-full text-xs text-brown"
                />
                {imagePreview ? (
                  <div className="mt-3 h-24 w-full border border-gold/30 bg-beige/40 overflow-hidden">
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                ) : null}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="catActive"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="h-4 w-4 accent-brown"
                />
                <label htmlFor="catActive" className="font-semibold text-brown cursor-pointer">
                  Active (Visible on public store)
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-gold/20 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="border border-brown/30 px-4 py-2 uppercase font-semibold text-brown hover:bg-sand/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-brown px-6 py-2 uppercase font-semibold text-ivory hover:bg-burnt disabled:opacity-50"
                >
                  {submitting ? "Saving…" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && targetCategory ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4">
          <div className="w-full max-w-md border border-gold/40 bg-ivory p-6 shadow-xl">
            <h3 className="font-display text-2xl text-brown">Delete Category</h3>
            <p className="mt-2 text-sm text-brown/70">
              Are you sure you want to delete category{" "}
              <strong className="text-brown">{targetCategory.name}</strong>?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="border border-brown/30 px-4 py-2 text-xs uppercase font-semibold text-brown hover:bg-sand/40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-burnt px-5 py-2 text-xs uppercase font-semibold text-ivory hover:bg-brown"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
}
