import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { WishlistButton } from "@/components/ProductCard";
import { formatPrice, type Product } from "@/data/catalog";
import { useShop } from "@/store/shop";

function getProductImageUrl(product: any): string {
  if (!product) return "";
  if (Array.isArray(product.images) && product.images.length > 0) {
    const first = product.images[0];
    if (typeof first === "string" && first.trim()) return first.trim();
    if (first && typeof first.url === "string" && first.url.trim()) return first.url.trim();
    if (first && typeof first.src === "string" && first.src.trim()) return first.src.trim();
  }
  if (typeof product.image === "string" && product.image.trim()) {
    return product.image.trim();
  }
  return "";
}

export function DealsSection() {
  const { allProducts } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbWidthRatio, setThumbWidthRatio] = useState(0.2);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // Prepare products for LIMITED TIME DEALS section with brand discounts & badges
  const dealProducts = useMemo(() => {
    const items = allProducts.length > 0 ? allProducts : [];
    const discountItems = items.filter((p) => p.oldPrice && p.oldPrice > p.price);
    const fallbackItems = items.filter((p) => !p.oldPrice || p.oldPrice <= p.price);

    const combined = [...discountItems, ...fallbackItems].slice(0, 10);
    const rates = [0.10, 0.15, 0.17, 0.20, 0.21, 0.25];

    return combined.map((item, idx) => {
      const rate = rates[idx % rates.length] ?? 0.15;
      const oldPrice =
        item.oldPrice && item.oldPrice > item.price
          ? item.oldPrice
          : Math.round((item.price * (1 + rate)) / 100) * 100;
      
      const discountPercent = Math.round(((oldPrice - item.price) / oldPrice) * 100);

      return {
        ...item,
        oldPrice,
        discountPercent,
      };
    });
  }, [allProducts]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      setThumbWidthRatio(1);
    } else {
      const progress = scrollLeft / maxScroll;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
      setThumbWidthRatio(Math.max(clientWidth / scrollWidth, 0.15));
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [handleScroll, dealProducts]);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.clientWidth;
    const scrollAmount = direction === "left" ? -containerWidth * 0.75 : containerWidth * 0.75;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (!dealProducts || dealProducts.length === 0) return null;

  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - LIMITED TIME DEALS */}
        <div className="relative flex flex-col items-center justify-center mb-8 sm:mb-10">
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-brown text-center">
            LIMITED TIME DEALS
          </h2>

          {/* Arrow Navigation Buttons (Desktop) */}
          <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount("left")}
              aria-label="Previous Deals"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-white text-brown shadow-sm transition-all duration-200 hover:bg-beige hover:border-gold active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount("right")}
              aria-label="Next Deals"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-white text-brown shadow-sm transition-all duration-200 hover:bg-beige hover:border-gold active:scale-95 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Card Slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="no-scrollbar flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1"
        >
          {dealProducts.map((product) => {
            const imageUrl = getProductImageUrl(product);
            const isError = imgErrors[product.id];
            const slug = product.slug || product.id;

            return (
              <div
                key={product.id}
                className="group flex flex-col min-w-[210px] w-[210px] sm:min-w-[250px] sm:w-[250px] md:min-w-[270px] md:w-[270px] flex-shrink-0 snap-start select-none"
              >
                {/* Image Frame with Badges */}
                <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl border border-gold/20 bg-[#f8f6f0] shadow-xs transition-shadow duration-300 group-hover:shadow-md">
                  <Link to="/products/$slug" params={{ slug }} className="block h-full w-full">
                    {imageUrl && !isError ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [product.id]: true }))
                        }
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <ImagePlaceholder type="product" label={product.name} />
                    )}
                  </Link>

                  {/* Top-Left Badges (Red Discount Pill + Optional Orange Tag) */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start pointer-events-none">
                    {product.discountPercent > 0 && (
                      <span className="inline-block rounded-xs bg-[#e53935] px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-white uppercase shadow-sm tracking-tight">
                        -{product.discountPercent}%
                      </span>
                    )}
                    {product.badge && product.badge.toLowerCase() !== "bestseller" && (
                      <span className="inline-block rounded-xs bg-[#fb8c00] px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-white uppercase shadow-sm tracking-tight">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Top-Right Wishlist Heart */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <WishlistButton productId={product.id} className="rounded-full shadow-xs" />
                  </div>
                </div>

                {/* Info Details below Image */}
                <div className="flex flex-col pt-3 px-1">
                  <h3 className="text-xs sm:text-sm font-medium text-brown/90 leading-snug line-clamp-2 min-h-[2.4rem] transition-colors group-hover:text-burnt">
                    <Link to="/products/$slug" params={{ slug }}>
                      {product.name}
                    </Link>
                  </h3>

                  {/* Prices */}
                  <div className="mt-1.5 flex items-baseline gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-normal text-brown/45 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#e53935]">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Scroll Progress Bar Indicator */}
        <div className="mt-6 sm:mt-8 w-full px-1">
          <div className="relative h-[3px] w-full rounded-full bg-neutral-200 overflow-hidden">
            <div
              className="absolute top-0 bottom-0 bg-[#1a1a1a] rounded-full transition-all duration-150 ease-out"
              style={{
                width: `${thumbWidthRatio * 100}%`,
                left: `${scrollProgress * (100 - thumbWidthRatio * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
