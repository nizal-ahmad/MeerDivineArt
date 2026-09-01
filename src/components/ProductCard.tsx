import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Badge } from "@/components/ui-kit";
import { formatPrice, type Product } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { cn } from "@/lib/utils";

export function WishlistButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { toggleWishlist, isWishlisted } = useShop();
  const active = isWishlisted(productId);
  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className={cn(
        "flex h-9 w-9 items-center justify-center border border-gold/40 bg-ivory/90 text-brown transition-all duration-300 hover:border-gold hover:bg-sand active:scale-90",
        className,
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all duration-300",
          active ? "scale-110 fill-burnt text-burnt" : "text-brown/70",
        )}
        strokeWidth={1.4}
      />
    </button>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useShop();

  return (
    <article className="group flex h-full flex-col bg-card transition-shadow duration-500 hover:shadow-[var(--shadow-soft)]">
      <div className="relative">
        <Link to="/product/$id" params={{ id: product.id }} className="block">
          <ImagePlaceholder type="product" label="Product Image" />
        </Link>
        {product.badge ? (
          <div className="absolute left-3 top-3">
            <Badge>{product.badge}</Badge>
          </div>
        ) : null}
        <div className="absolute right-3 top-3">
          <WishlistButton productId={product.id} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 sm:px-5">
        <p className="text-[0.6rem] uppercase tracking-[0.22em] text-burnt/80">
          {product.categoryName}
        </p>
        <h3 className="mt-2 text-lg leading-snug text-brown">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="transition-colors hover:text-burnt"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-brown">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice ? (
            <span className="text-xs text-brown/45 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => addToCart(product.id)}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-brown/30 px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brown transition-all duration-300 hover:border-brown hover:bg-brown hover:text-ivory"
        >
          <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export function ProductGrid({
  items,
  columns = 4,
}: {
  items: Product[];
  columns?: 3 | 4;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-6",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
      )}
    >
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
