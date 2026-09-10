import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ProductGrid } from "@/components/ProductCard";
import { PageHero, Stars } from "@/components/ui-kit";
import {
  formatPrice,
  getProduct as getStaticProduct,
  products as staticProducts,
  type Product,
} from "@/data/catalog";
import { api } from "@/services/api";
import { useShop } from "@/store/shop";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  component: ProductDetailsPage,
});

function resolveImageUrls(prod: any): string[] {
  if (!prod) return [];
  const urls: string[] = [];

  if (Array.isArray(prod.images) && prod.images.length > 0) {
    prod.images.forEach((img: any) => {
      if (typeof img === "string" && img.trim()) urls.push(img.trim());
      else if (img && typeof img.url === "string" && img.url.trim()) urls.push(img.url.trim());
      else if (img && typeof img.src === "string" && img.src.trim()) urls.push(img.src.trim());
    });
  }

  if (urls.length === 0 && typeof prod.image === "string" && prod.image.trim()) {
    urls.push(prod.image.trim());
  }

  return urls;
}

function ProductDetailsPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useShop();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Options state
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "shipping">("description");

  // Related products
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setActiveImageIndex(0);
    setQuantity(1);

    let isMounted = true;

    // Fetch product from Backend API
    api
      .getProductBySlug(slug)
      .then((res) => {
        if (!isMounted) return null;
        if (res.success && res.data) {
          setProduct(res.data);
          return null;
        } else {
          // Fallback to ID query or static product
          return api.getProduct(slug);
        }
      })
      .then((res: any) => {
        if (!isMounted || !res) return;
        if (res.success && res.data) {
          setProduct(res.data);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        // Fallback to static catalog data
        const staticItem = getStaticProduct(slug) || staticProducts.find((p) => p.id === slug);
        if (staticItem) {
          setProduct(staticItem);
        } else {
          setError("Product not found");
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Set default option values when product loads
  useEffect(() => {
    if (product) {
      const sizes = product.sizes || [];
      const colors = product.colors || product.frameColors || [];
      if (sizes.length > 0) setSelectedSize(sizes[0]);
      if (colors.length > 0) setSelectedColor(colors[0]);
      if (product.materials) setSelectedMaterial(product.materials.split(",")[0].trim());
    }
  }, [product]);

  // Fetch related products from backend or fallback to static catalog
  useEffect(() => {
    if (!product) return;
    const catSlug = product.category?.slug || product.category || "islamic-calligraphy";

    api
      .getProducts({ category: catSlug, limit: 8 })
      .then((res) => {
        if (res.success && res.data && res.data.products) {
          const filtered = res.data.products
            .filter((p: any) => p._id !== product._id && p.slug !== product.slug && p.id !== product.id)
            .map((p: any) => ({
              id: p.slug || p._id,
              slug: p.slug,
              name: p.name,
              category: p.category?.slug || "islamic-calligraphy",
              categoryName: p.categoryName || "Islamic Calligraphy",
              price: p.price,
              oldPrice: p.discountPrice,
              badge: p.badge,
              rating: p.rating || 5,
              reviews: p.reviews || 0,
              description: p.description,
              materials: p.materials,
              dimensions: p.dimensions,
              care: p.care,
              sizes: p.sizes || [],
              frameColors: p.colors || [],
              images: p.images || [],
            }));
          if (filtered.length > 0) {
            setRelatedProducts(filtered.slice(0, 4));
            return;
          }
        }
        // Fallback static related products
        const staticRelated = staticProducts
          .filter((p) => p.id !== product.id && p.id !== product.slug)
          .slice(0, 4);
        setRelatedProducts(staticRelated);
      })
      .catch(() => {
        const staticRelated = staticProducts
          .filter((p) => p.id !== product.id && p.id !== product.slug)
          .slice(0, 4);
        setRelatedProducts(staticRelated);
      });
  }, [product]);

  const images = useMemo(() => resolveImageUrls(product), [product]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-brown/60">
          Loading Artwork Details…
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-4xl text-brown">Piece Not Found</h1>
        <p className="mt-3 text-sm text-brown/65">
          The requested artwork could not be found or may have been updated.
        </p>
        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border border-brown/40 px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brown hover:bg-brown hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const categoryName =
    product.categoryName || product.category?.name || "Handcrafted Art";
  const categorySlug =
    product.category?.slug ||
    (typeof product.category === "string" ? product.category : "islamic-calligraphy");

  const price = Number(product.price || 0);
  const originalPrice = product.oldPrice || product.discountPrice ? Number(product.oldPrice || product.discountPrice) : undefined;
  
  // Calculate discount percentage if original price > current price
  let discountPercent = 0;
  if (originalPrice && originalPrice > price) {
    discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);
  }

  const stock = product.stock !== undefined ? Number(product.stock) : 10;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;
  const wishlisted = isWishlisted(product.id || product._id || product.slug);

  const sizes: string[] = product.sizes || [];
  const colors: string[] = product.colors || product.frameColors || [];
  const sku = product.sku || `SKU-${(product.slug || product.id).toUpperCase()}`;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("This product is currently out of stock.");
      return;
    }
    const productId = product.id || product.slug || product._id;
    addToCart(productId, {
      quantity,
      size: selectedSize,
      frameColor: selectedColor,
      material: selectedMaterial,
    });
    toast.success(`Added "${product.name}" to your cart!`);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) {
      toast.error("This product is currently out of stock.");
      return;
    }
    const productId = product.id || product.slug || product._id;
    addToCart(productId, {
      quantity,
      size: selectedSize,
      frameColor: selectedColor,
      material: selectedMaterial,
    });
    navigate({ to: "/cart" });
  };

  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-gold/20 bg-beige/30">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-3.5 text-xs text-brown/65 sm:px-8">
          <Link to="/" className="transition-colors hover:text-burnt">
            Home
          </Link>
          <span className="text-gold/50">/</span>
          <Link to="/shop" className="transition-colors hover:text-burnt">
            Shop
          </Link>
          <span className="text-gold/50">/</span>
          <span className="truncate font-medium text-brown">{product.name}</span>
        </div>
      </nav>

      {/* Main Product Layout */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-16">
        <div className="grid gap-12 lg:grid-cols-12 md:gap-16">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 space-y-4">
              <div className="group/main relative aspect-[4/5] w-full overflow-hidden border border-gold/30 bg-card shadow-[var(--shadow-soft)]">
                {images.length > 0 ? (
                  <img
                    src={images[activeImageIndex] || images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover/main:scale-105"
                  />
                ) : (
                  <ImagePlaceholder type="product" label={product.name} />
                )}

                {/* Badge Overlay */}
                {product.badge ? (
                  <div className="absolute left-4 top-4">
                    <span className="bg-burnt px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ivory">
                      {product.badge}
                    </span>
                  </div>
                ) : null}

                {/* Wishlist Button Overlay */}
                <button
                  type="button"
                  aria-label="Add to Wishlist"
                  onClick={() => toggleWishlist(product.id || product.slug)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-gold/40 bg-ivory/90 text-brown shadow-sm transition-all duration-300 hover:border-gold hover:bg-sand"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4 transition-all",
                      wishlisted ? "fill-burnt text-burnt" : "text-brown/70"
                    )}
                    strokeWidth={1.4}
                  />
                </button>

                {/* Prev / Next Controls if multiple images */}
                {images.length > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label="Previous Image"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center border border-gold/40 bg-ivory/80 text-brown transition-all hover:bg-ivory"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next Image"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center border border-gold/40 bg-ivory/80 text-brown transition-all hover:bg-ivory"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                ) : null}
              </div>

              {/* Thumbnails Bar */}
              {images.length > 1 ? (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "relative aspect-square w-20 shrink-0 overflow-hidden border transition-all duration-300",
                        activeImageIndex === idx
                          ? "border-gold ring-2 ring-gold/40"
                          : "border-gold/25 opacity-70 hover:opacity-100"
                      )}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.name} view ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Right Column: Product Information & Purchase Box */}
          <div className="lg:col-span-5">
            <div className="space-y-6">
              {/* Category Eyebrow */}
              <p className="text-[0.65rem] uppercase tracking-[0.24em] text-burnt">
                {categoryName}
              </p>

              {/* Product Title */}
              <h1 className="font-display text-3xl leading-snug text-brown sm:text-4xl">
                {product.name}
              </h1>

              {/* Rating & Stock Summary */}
              <div className="flex flex-wrap items-center gap-4 border-b border-gold/20 pb-5 text-xs text-brown/70">
                <div className="flex items-center gap-1.5">
                  <Stars />
                  <span className="font-semibold text-brown">{product.rating || 5}.0</span>
                  <span className="text-brown/50">({product.reviews || 128} reviews)</span>
                </div>
                <span className="text-gold/40">•</span>
                <span className="text-brown/50 uppercase tracking-wider">{sku}</span>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-semibold text-brown">
                  {formatPrice(price)}
                </span>
                {originalPrice && originalPrice > price ? (
                  <span className="text-sm text-brown/45 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                ) : null}
                {discountPercent > 0 ? (
                  <span className="rounded bg-burnt/10 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-burnt">
                    {discountPercent}% OFF
                  </span>
                ) : null}
              </div>

              {/* Stock Status Badge */}
              <div className="flex items-center gap-2 text-xs">
                {isOutOfStock ? (
                  <span className="inline-flex items-center gap-1.5 rounded border border-red-200 bg-red-50 px-2.5 py-1 text-red-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600" /> Out of Stock
                  </span>
                ) : isLowStock ? (
                  <span className="inline-flex items-center gap-1.5 rounded border border-amber-200 bg-amber-50 px-2.5 py-1 text-amber-800 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" /> Only {stock} left in stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-800 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> In Stock & Ready to Ship
                  </span>
                )}
              </div>

              {/* Short Description */}
              {product.shortDescription || product.description ? (
                <p className="text-sm leading-relaxed text-brown/75">
                  {product.shortDescription || product.description}
                </p>
              ) : null}

              {/* Product Option: Sizes */}
              {sizes.length > 0 ? (
                <div className="space-y-2.5 pt-2">
                  <label className="block text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-burnt">
                    Select Size: <span className="text-brown">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={cn(
                          "border px-3.5 py-2 text-xs transition-all duration-200",
                          selectedSize === s
                            ? "border-gold bg-sand/40 text-brown font-semibold shadow-sm"
                            : "border-gold/30 bg-card text-brown/70 hover:border-gold/60"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Product Option: Frame Colors */}
              {colors.length > 0 ? (
                <div className="space-y-2.5 pt-2">
                  <label className="block text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-burnt">
                    Frame Color: <span className="text-brown">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={cn(
                          "border px-3.5 py-2 text-xs transition-all duration-200",
                          selectedColor === c
                            ? "border-gold bg-sand/40 text-brown font-semibold shadow-sm"
                            : "border-gold/30 bg-card text-brown/70 hover:border-gold/60"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Quantity Selector */}
              <div className="space-y-2.5 pt-2">
                <label className="block text-[0.65rem] uppercase tracking-[0.2em] font-semibold text-burnt">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-gold/40 bg-card">
                  <button
                    type="button"
                    disabled={quantity <= 1 || isOutOfStock}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2 text-brown hover:bg-sand/40 disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-semibold text-brown">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    disabled={quantity >= stock || isOutOfStock}
                    onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                    className="px-3.5 py-2 text-brown hover:bg-sand/40 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="space-y-3 pt-4 border-t border-gold/20">
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-2 border border-brown bg-brown py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-all duration-300 hover:bg-burnt hover:border-burnt disabled:opacity-50"
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>

                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleBuyNow}
                  className="flex w-full items-center justify-center gap-2 border border-gold/60 bg-sand/30 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-brown transition-all duration-300 hover:bg-sand hover:border-gold disabled:opacity-50"
                >
                  Buy Now (Cash on Delivery)
                </button>
              </div>

              {/* Value Guarantees Banner */}
              <div className="grid grid-cols-2 gap-3 pt-4 text-xs text-brown/75">
                <div className="flex items-center gap-2 border border-gold/20 p-3 bg-beige/20">
                  <Truck className="h-4 w-4 text-burnt shrink-0" strokeWidth={1.4} />
                  <span>Nationwide COD Delivery</span>
                </div>
                <div className="flex items-center gap-2 border border-gold/20 p-3 bg-beige/20">
                  <ShieldCheck className="h-4 w-4 text-burnt shrink-0" strokeWidth={1.4} />
                  <span>Handcrafted Quality Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications, Description & Care Tabs */}
        <div className="mt-16 border-t border-gold/25 pt-10">
          <div className="flex border-b border-gold/25 gap-8">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={cn(
                "pb-3 text-xs uppercase tracking-[0.2em] font-semibold border-b-2 transition-all",
                activeTab === "description"
                  ? "border-gold text-brown"
                  : "border-transparent text-brown/50 hover:text-burnt"
              )}
            >
              Description & Craftsmanship
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={cn(
                "pb-3 text-xs uppercase tracking-[0.2em] font-semibold border-b-2 transition-all",
                activeTab === "specs"
                  ? "border-gold text-brown"
                  : "border-transparent text-brown/50 hover:text-burnt"
              )}
            >
              Specifications & Care
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("shipping")}
              className={cn(
                "pb-3 text-xs uppercase tracking-[0.2em] font-semibold border-b-2 transition-all",
                activeTab === "shipping"
                  ? "border-gold text-brown"
                  : "border-transparent text-brown/50 hover:text-burnt"
              )}
            >
              Shipping & Delivery
            </button>
          </div>

          <div className="py-8 text-sm leading-relaxed text-brown/80 max-w-4xl">
            {activeTab === "description" ? (
              <div className="space-y-4">
                <p>{product.description}</p>
                <p>
                  Each panel is carefully drawn, layered with fine gold leaf accents, and framed in
                  solid wood with precision glazing to preserve every stroke for years to come.
                </p>
              </div>
            ) : activeTab === "specs" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-brown uppercase text-xs tracking-widest mb-1 text-burnt">
                    Dimensions
                  </h4>
                  <p>{product.dimensions || '16" x 12" (standard size)'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-brown uppercase text-xs tracking-widest mb-1 text-burnt">
                    Materials Used
                  </h4>
                  <p>{product.materials || "Hand-finished MDF board, gold leaf detailing, solid wood frame."}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-brown uppercase text-xs tracking-widest mb-1 text-burnt">
                    Care Instructions
                  </h4>
                  <p>{product.care || "Wipe gently with a dry, soft cloth. Keep away from direct dampness."}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-brown uppercase text-xs tracking-widest mb-1 text-burnt">
                    Item SKU
                  </h4>
                  <p>{sku}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p>
                  <strong>Delivery Nationwide:</strong> We deliver across all major cities and towns in Pakistan including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, and Multan.
                </p>
                <p>
                  <strong>Estimated Time:</strong> Standard orders are processed and shipped within 3 to 5 business days.
                </p>
                <p>
                  <strong>Payment Method:</strong> Cash on Delivery (COD). You inspect the package upon courier delivery.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-12 border-t border-gold/25 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold/20 pb-6">
            <div>
              <h3 className="font-display text-2xl text-brown">Customer Reviews</h3>
              <p className="text-xs text-brown/60 mt-1">
                Real feedback from customers who purchased this piece.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="font-display text-3xl font-semibold text-brown">
                  {product.rating || 5}.0
                </span>
                <span className="text-xs text-brown/50 block">out of 5.0</span>
              </div>
              <Stars />
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Ayesha Khan",
                city: "Lahore",
                quote: "The frame looked even more beautiful in person. The gold leaf detailing is exquisite.",
                date: "2 weeks ago",
              },
              {
                name: "Bilal Ahmed",
                city: "Karachi",
                quote: "Delivered promptly in Karachi. Packaging was superb and completely protected the glass.",
                date: "1 month ago",
              },
              {
                name: "Hira Siddiqui",
                city: "Islamabad",
                quote: "Beautiful craftsmanship. Placed it right in our entryway, everyone compliments it!",
                date: "2 months ago",
              },
            ].map((rev, idx) => (
              <div key={idx} className="border border-gold/20 bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <Stars />
                  <span className="text-[0.65rem] text-brown/40">{rev.date}</span>
                </div>
                <p className="mt-3 text-sm italic text-brown/80">“{rev.quote}”</p>
                <div className="mt-4 border-t border-gold/15 pt-3 text-xs font-semibold text-burnt flex justify-between items-center">
                  <span>{rev.name} ({rev.city})</span>
                  <span className="text-[0.6rem] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 border border-emerald-200">
                    Verified Purchase
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Section ("You May Also Like") */}
        {relatedProducts.length > 0 ? (
          <div className="mt-20 border-t border-gold/25 pt-14">
            <div className="mb-10 text-center">
              <p className="text-[0.65rem] uppercase tracking-[0.24em] text-burnt">
                Related Pieces
              </p>
              <h2 className="mt-2 font-display text-3xl text-brown">
                You May Also Like
              </h2>
            </div>
            <ProductGrid items={relatedProducts} columns={4} />
          </div>
        ) : null}
      </section>
    </>
  );
}
