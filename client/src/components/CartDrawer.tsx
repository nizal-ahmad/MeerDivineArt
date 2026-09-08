import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { formatPrice } from "@/data/catalog";
import { cartProduct, useShop } from "@/store/shop";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQuantity, removeFromCart, subtotal, allProducts } =
    useShop();

  return (
    <div
      className={`fixed inset-0 z-50 ${cartOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!cartOpen}
    >
      <div
        onClick={() => setCartOpen(false)}
        className={`absolute inset-0 bg-charcoal/45 transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-[var(--shadow-lift)] transition-transform duration-400 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gold/25 px-5 py-4">
          <h2 className="font-display text-xl text-brown">
            Your Cart{" "}
            <span className="text-sm text-brown/50">({cart.length})</span>
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="text-brown transition-colors hover:text-burnt"
          >
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-sand/40 text-brown">
                <ShoppingBag className="h-5 w-5" strokeWidth={1.2} />
              </span>
              <p className="text-sm text-brown/60">Your cart is still empty.</p>
              <Link
                to="/shop"
                onClick={() => setCartOpen(false)}
                className="border border-brown/40 px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brown transition-colors hover:bg-brown hover:text-ivory"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.map((item) => {
                const product = cartProduct(item, allProducts);
                if (!product) return null;
                const imgUrl = product.images && product.images.length > 0
                  ? (typeof product.images[0] === "string" ? product.images[0] : (product.images[0] as any).url)
                  : "";
                return (
                  <li key={item.productId} className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 border border-gold/30 bg-beige/40 overflow-hidden flex items-center justify-center">
                      {imgUrl ? (
                        <img src={imgUrl} alt={product.name} className="h-full w-full object-cover" />
                      ) : (
                        <ImagePlaceholder
                          type="thumbnail"
                          label=""
                          zoomOnHover={false}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm leading-snug text-brown">
                        {product.name}
                      </p>
                      <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-burnt/80">
                        {product.categoryName}
                      </p>
                      {item.size ? (
                        <p className="mt-1 text-xs text-brown/55">
                          {item.size}
                          {item.frameColor ? ` • ${item.frameColor}` : ""}
                        </p>
                      ) : null}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border border-gold/40">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() =>
                              setQuantity(item.productId, item.quantity - 1)
                            }
                            className="px-2 py-1.5 text-brown hover:bg-sand/50"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs text-brown">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() =>
                              setQuantity(item.productId, item.quantity + 1)
                            }
                            className="px-2 py-1.5 text-brown hover:bg-sand/50"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-brown">
                          {formatPrice(product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => removeFromCart(item.productId)}
                      className="self-start text-brown/45 transition-colors hover:text-burnt"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.4} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {cart.length > 0 ? (
          <div className="border-t border-gold/25 px-5 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-[0.2em] text-brown/70">
                Subtotal
              </span>
              <span className="font-display text-2xl text-brown">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-xs text-brown/50">
              Shipping calculated at checkout.
            </p>
            <Link
              to="/cart"
              onClick={() => setCartOpen(false)}
              className="mt-4 flex w-full items-center justify-center bg-brown px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burnt"
            >
              Checkout
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="mt-2 w-full border border-brown/30 px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brown transition-colors hover:bg-sand/50"
            >
              Continue Shopping
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
