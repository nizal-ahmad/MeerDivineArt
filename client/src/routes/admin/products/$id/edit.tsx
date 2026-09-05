import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { Upload, X, ArrowLeft } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { api } from "@/services/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products/$id/edit")({
  component: EditProductPage,
});

function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/admin/products/$id/edit" });

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("10");
  const [materials, setMaterials] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [care, setCare] = useState("");
  const [badge, setBadge] = useState("");
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);
  const [isBestseller, setIsBestseller] = useState(false);

  // Attributes
  const [sizes, setSizes] = useState<string[]>([]);
  const [newSize, setNewSize] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [newColor, setNewColor] = useState("");

  // Existing vs New Images
  const [existingImages, setExistingImages] = useState<{ url: string; public_id: string }[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([api.getCategories(true), api.getProduct(id)])
      .then(([catRes, prodRes]) => {
        if (catRes.success) setCategories(catRes.data);
        if (prodRes.success && prodRes.data) {
          const p = prodRes.data;
          setName(p.name || "");
          setSku(p.sku || "");
          setShortDescription(p.shortDescription || "");
          setDescription(p.description || "");
          setCategory(p.category?.slug || p.category || "");
          setPrice(String(p.price || 0));
          setDiscountPrice(p.discountPrice ? String(p.discountPrice) : "");
          setStock(String(p.stock !== undefined ? p.stock : 10));
          setMaterials(p.materials || "");
          setDimensions(p.dimensions || "");
          setCare(p.care || "");
          setBadge(p.badge || "");
          setFeatured(Boolean(p.featured));
          setActive(Boolean(p.active));
          setIsBestseller(Boolean(p.isBestseller));
          setSizes(p.sizes || []);
          setColors(p.colors || []);
          setExistingImages(p.images || []);
        }
      })
      .catch((err) => toast.error("Failed to load product data"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeExistingImage = (url: string) => {
    setExistingImages((prev) => prev.filter((img) => img.url !== url));
  };

  const removeNewImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sku", sku);
      formData.append("shortDescription", shortDescription);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("discountPrice", discountPrice);
      formData.append("stock", stock);
      formData.append("materials", materials);
      formData.append("dimensions", dimensions);
      formData.append("care", care);
      formData.append("badge", badge);
      formData.append("featured", String(featured));
      formData.append("active", String(active));
      formData.append("isBestseller", String(isBestseller));
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("colors", JSON.stringify(colors));
      formData.append("retainedImages", JSON.stringify(existingImages.map((i) => i.url)));

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      const res = await api.updateProduct(id, formData);
      if (res.success) {
        toast.success("Product updated successfully!");
        navigate({ to: "/admin/products" });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Product">
        <div className="py-20 text-center text-sm text-brown/60">
          Loading product details…
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={`Edit Product: ${name}`}
      subtitle="Modify information, prices, stock, or replace Cloudinary images"
      action={
        <button
          onClick={() => navigate({ to: "/admin/products" })}
          className="inline-flex items-center gap-2 border border-brown/30 bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brown hover:bg-sand/40"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </button>
      }
    >
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        {/* Basic Info */}
        <div className="border border-gold/25 bg-card p-6 shadow-[var(--shadow-soft)]">
          <h2 className="border-b border-gold/20 pb-3 font-display text-xl text-brown">
            Basic Details
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full border border-gold/40 bg-ivory px-4 py-3 text-sm text-brown outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                SKU Code
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="mt-2 w-full border border-gold/40 bg-ivory px-4 py-3 text-sm text-brown outline-none focus:border-gold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full border border-gold/40 bg-ivory px-4 py-3 text-sm text-brown outline-none focus:border-gold"
              >
                {categories.map((c) => (
                  <option key={c._id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                Full Description *
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 w-full border border-gold/40 bg-ivory px-4 py-3 text-sm text-brown outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="border border-gold/25 bg-card p-6 shadow-[var(--shadow-soft)]">
          <h2 className="border-b border-gold/20 pb-3 font-display text-xl text-brown">
            Pricing & Stock
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                Price (PKR) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-2 w-full border border-gold/40 bg-ivory px-4 py-3 text-sm text-brown outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                Discount Price (PKR)
              </label>
              <input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="mt-2 w-full border border-gold/40 bg-ivory px-4 py-3 text-sm text-brown outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="mt-2 w-full border border-gold/40 bg-ivory px-4 py-3 text-sm text-brown outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Image Management */}
        <div className="border border-gold/25 bg-card p-6 shadow-[var(--shadow-soft)]">
          <h2 className="border-b border-gold/20 pb-3 font-display text-xl text-brown">
            Image Gallery Management
          </h2>

          {/* Existing Images */}
          {existingImages.length > 0 ? (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burnt">
                Current Images
              </p>
              <div className="mt-3 grid grid-cols-3 gap-4 sm:grid-cols-5">
                {existingImages.map((img) => (
                  <div key={img.url} className="relative border border-gold/30">
                    <img src={img.url} alt="Existing" className="h-24 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(img.url)}
                      className="absolute right-1 top-1 rounded-full bg-burnt p-1 text-ivory hover:opacity-100"
                      title="Delete image"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Upload New Images */}
          <div className="mt-6">
            <label className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gold/40 bg-beige/30 p-6 hover:border-gold">
              <Upload className="h-6 w-6 text-burnt" />
              <span className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-brown">
                Add More Images
              </span>
              <input type="file" multiple accept="image/*" onChange={handleImageSelect} className="hidden" />
            </label>

            {imagePreviews.length > 0 ? (
              <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-5">
                {imagePreviews.map((prev, i) => (
                  <div key={i} className="relative border border-gold/30">
                    <img src={prev} alt="New Preview" className="h-24 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(i)}
                      className="absolute right-1 top-1 rounded-full bg-burnt p-1 text-ivory"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate({ to: "/admin/products" })}
            className="border border-brown/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-brown hover:bg-sand/40"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="bg-brown px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ivory hover:bg-burnt disabled:opacity-50"
          >
            {submitting ? "Saving Changes…" : "Update Product"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
