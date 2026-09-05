import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Upload, X, ArrowLeft, Plus } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { api } from "@/services/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products/new")({
  component: AddProductPage,
});

function AddProductPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("10");
  const [materials, setMaterials] = useState(
    "Hand-finished MDF board, acid-free art paper, gold leaf detailing, solid wood frame."
  );
  const [dimensions, setDimensions] = useState('16" x 12"');
  const [care, setCare] = useState(
    "Wipe gently with a dry, soft cloth. Keep away from direct sunlight."
  );
  const [badge, setBadge] = useState("");
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // Attributes
  const [sizes, setSizes] = useState<string[]>(['12" x 12"', '16" x 16"', '20" x 20"']);
  const [newSize, setNewSize] = useState("");

  const [colors, setColors] = useState<string[]>(["Deep Brown", "Antique Gold", "Matte Black"]);
  const [newColor, setNewColor] = useState("");

  // Images
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    api
      .getCategories(true)
      .then((res) => {
        if (res.success && res.data.length > 0) {
          setCategories(res.data);
          setCategory(res.data[0].slug);
        }
      })
      .catch(() => {});
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);

    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addSize = () => {
    if (newSize.trim() && !sizes.includes(newSize.trim())) {
      setSizes((prev) => [...prev, newSize.trim()]);
      setNewSize("");
    }
  };

  const addColor = () => {
    if (newColor.trim() && !colors.includes(newColor.trim())) {
      setColors((prev) => [...prev, newColor.trim()]);
      setNewColor("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !price || !category) {
      toast.error("Please fill in all required fields (Name, Description, Price, Category).");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sku", sku || `SKU-${Date.now().toString().slice(-6)}`);
      formData.append("shortDescription", shortDescription);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      if (discountPrice) formData.append("discountPrice", discountPrice);
      formData.append("stock", stock);
      formData.append("materials", materials);
      formData.append("dimensions", dimensions);
      formData.append("care", care);
      formData.append("badge", badge);
      formData.append("featured", String(featured));
      formData.append("active", String(active));
      formData.append("isBestseller", String(isBestseller));
      formData.append("isNew", String(isNew));
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("colors", JSON.stringify(colors));

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      const res = await api.createProduct(formData);

      if (res.success) {
        toast.success("Product created successfully & published to live store!");
        navigate({ to: "/admin/products" });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout
      title="Create New Product"
      subtitle="Fill in details and upload product artwork to store in Cloudinary & MongoDB"
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
            Basic Information
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
                placeholder="e.g. Ayat-ul-Kursi Gold Calligraphy"
                className="mt-2 w-full border border-gold/40 bg-ivory px-4 py-3 text-sm text-brown outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                SKU Code (Auto-generated if empty)
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. SKU-AUKG-01"
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
                    {c.name} ({c.slug})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                Short Description
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief summary for product card summary"
                className="mt-2 w-full border border-gold/40 bg-ivory px-4 py-3 text-sm text-brown outline-none focus:border-gold"
              />
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
                placeholder="Detailed craft description, gold leaf detailing, pair composition details…"
                className="mt-2 w-full border border-gold/40 bg-ivory px-4 py-3 text-sm text-brown outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="border border-gold/25 bg-card p-6 shadow-[var(--shadow-soft)]">
          <h2 className="border-b border-gold/20 pb-3 font-display text-xl text-brown">
            Pricing & Inventory
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                Regular Price (PKR) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="7500"
                className="mt-2 w-full border border-gold/40 bg-ivory px-4 py-3 text-sm text-brown outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                Original / Strikethrough Price (PKR)
              </label>
              <input
                type="number"
                min="0"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                placeholder="9500"
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
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="mt-2 w-full border border-gold/40 bg-ivory px-4 py-3 text-sm text-brown outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Multi-Image Cloudinary Uploader */}
        <div className="border border-gold/25 bg-card p-6 shadow-[var(--shadow-soft)]">
          <h2 className="border-b border-gold/20 pb-3 font-display text-xl text-brown">
            Cloudinary Image Gallery
          </h2>
          <p className="mt-2 text-xs text-brown/60">
            Select multiple high-resolution images. They will be uploaded directly to Cloudinary and returned as secure URLs.
          </p>

          <div className="mt-6">
            <label className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gold/40 bg-beige/30 p-8 transition-colors hover:border-gold hover:bg-sand/20">
              <Upload className="h-8 w-8 text-burnt" />
              <span className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-brown">
                Select Images to Upload
              </span>
              <span className="mt-1 text-[0.65rem] text-brown/50">
                PNG, JPG, WEBP up to 5MB each
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>

            {imagePreviews.length > 0 ? (
              <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-5">
                {imagePreviews.map((preview, i) => (
                  <div key={i} className="group relative border border-gold/30 bg-beige/40">
                    <img src={preview} alt="Preview" className="h-28 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute right-1 top-1 rounded-full bg-burnt p-1 text-ivory opacity-90 transition-opacity hover:opacity-100"
                      title="Remove Image"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    {i === 0 ? (
                      <span className="absolute bottom-1 left-1 bg-brown/90 px-1.5 py-0.5 text-[0.55rem] text-ivory uppercase">
                        Primary
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Specifications & Attributes */}
        <div className="border border-gold/25 bg-card p-6 shadow-[var(--shadow-soft)]">
          <h2 className="border-b border-gold/20 pb-3 font-display text-xl text-brown">
            Frame Specifications & Variants
          </h2>
          <div className="mt-6 space-y-5">
            <div>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                Available Sizes
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 border border-gold/40 bg-sand/40 px-3 py-1 text-xs text-brown"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => setSizes(sizes.filter((item) => item !== s))}
                      className="text-burnt hover:text-brown"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  placeholder='Add size (e.g. 24" x 24")'
                  className="border border-gold/40 bg-ivory px-3 py-1.5 text-xs text-brown outline-none"
                />
                <button
                  type="button"
                  onClick={addSize}
                  className="bg-brown px-3 py-1.5 text-xs uppercase font-semibold text-ivory hover:bg-burnt"
                >
                  Add Size
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                Frame Colors / Palettes
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {colors.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 border border-gold/40 bg-sand/40 px-3 py-1 text-xs text-brown"
                  >
                    {c}
                    <button
                      type="button"
                      onClick={() => setColors(colors.filter((item) => item !== c))}
                      className="text-burnt hover:text-brown"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="Add color (e.g. Antique Gold)"
                  className="border border-gold/40 bg-ivory px-3 py-1.5 text-xs text-brown outline-none"
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="bg-brown px-3 py-1.5 text-xs uppercase font-semibold text-ivory hover:bg-burnt"
                >
                  Add Color
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                  Dimensions Spec
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="mt-2 w-full border border-gold/40 bg-ivory px-3 py-2 text-xs text-brown outline-none"
                />
              </div>

              <div>
                <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                  Materials
                </label>
                <input
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="mt-2 w-full border border-gold/40 bg-ivory px-3 py-2 text-xs text-brown outline-none"
                />
              </div>

              <div>
                <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                  Care Instructions
                </label>
                <input
                  type="text"
                  value={care}
                  onChange={(e) => setCare(e.target.value)}
                  className="mt-2 w-full border border-gold/40 bg-ivory px-3 py-2 text-xs text-brown outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="border border-gold/25 bg-card p-6 shadow-[var(--shadow-soft)]">
          <h2 className="border-b border-gold/20 pb-3 font-display text-xl text-brown">
            Status & Badging
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
                Badge Tag
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Bestseller, Handcrafted"
                className="mt-2 w-full border border-gold/40 bg-ivory px-3 py-2 text-xs text-brown outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="active"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="h-4 w-4 accent-brown"
              />
              <label htmlFor="active" className="text-xs font-semibold text-brown cursor-pointer">
                Active in Store
              </label>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 accent-brown"
              />
              <label htmlFor="featured" className="text-xs font-semibold text-brown cursor-pointer">
                Mark as Featured
              </label>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="isBestseller"
                checked={isBestseller}
                onChange={(e) => setIsBestseller(e.target.checked)}
                className="h-4 w-4 accent-brown"
              />
              <label htmlFor="isBestseller" className="text-xs font-semibold text-brown cursor-pointer">
                Include in Bestsellers
              </label>
            </div>
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
            disabled={loading}
            className="bg-brown px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ivory hover:bg-burnt disabled:opacity-50"
          >
            {loading ? "Publishing Product…" : "Save & Publish Product"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
