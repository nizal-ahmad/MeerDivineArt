import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShoppingBag, Trash2, CheckCircle2, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/ui-kit";
import { formatPrice } from "@/data/catalog";
import { useShop } from "@/store/shop";
import { api } from "@/services/api";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  component: CartCheckoutPage,
});

function CartCheckoutPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, setQuantity, subtotal } = useShop();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Lahore");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!name || !phone || !address || !city) {
      toast.error("Please fill in your name, phone number, city, and shipping address.");
      return;
    }

    setSubmitting(true);

    try {
      const orderPayload = {
        customer: {
          name,
          email: email || `${phone.replace(/\D/g, "")}@customer.com`,
          phone,
          address,
          city,
        },
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          frameColor: item.frameColor,
        })),
        paymentMethod: "Cash on Delivery",
      };

      const res = await api.createOrder(orderPayload);
      if (res.success) {
        toast.success("Order placed successfully! We will contact you to confirm delivery.");
        setPlacedOrder(res.data);
      }
    } catch (err: any) {
      toast.error(err.message || "Could not place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-4 font-display text-4xl text-brown">Thank You for Your Order!</h1>
        <p className="mt-2 text-sm text-brown/70">
          Your order number is <strong className="text-burnt">{placedOrder.orderNumber}</strong>.
        </p>
        <p className="mt-1 text-xs text-brown/60">
          We have received your order details and will call or WhatsApp you at {placedOrder.customer?.phone} to confirm delivery.
        </p>

        <div className="mt-8 border border-gold/30 bg-card p-6 text-left text-xs">
          <h3 className="font-semibold text-brown uppercase tracking-widest border-b border-gold/20 pb-2">
            Order Summary
          </h3>
          <div className="mt-3 space-y-2">
            {placedOrder.items?.map((item: any, i: number) => (
              <div key={i} className="flex justify-between text-brown/80">
                <span>{item.name} ({item.quantity}×)</span>
                <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-gold/20 pt-2 flex justify-between font-semibold text-brown text-sm">
              <span>Total Payable (COD):</span>
              <span className="text-burnt font-display text-lg">{formatPrice(placedOrder.totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-brown px-8 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ivory hover:bg-burnt"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title="Review Cart & Checkout"
        subtitle="Complete your order with Cash on Delivery anywhere in Pakistan."
      />

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        {cart.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-brown/40" />
            <h2 className="mt-4 font-display text-2xl text-brown">Your Cart is Empty</h2>
            <p className="mt-2 text-xs text-brown/60">Explore our catalog and select art pieces for your walls.</p>
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 border border-brown/40 px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brown hover:bg-brown hover:text-ivory"
              >
                <ArrowLeft className="h-4 w-4" /> Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Cart Items List */}
            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl text-brown border-b border-gold/25 pb-3">
                Selected Items ({cart.length})
              </h2>

              <ul className="mt-6 space-y-6">
                {cart.map((item) => {
                  const prod = getProduct(item.productId);
                  const title = prod ? prod.name : item.productId;
                  const itemPrice = prod ? prod.price : 0;
                  const imgUrl = prod && prod.images && prod.images.length > 0
                    ? (typeof prod.images[0] === "string" ? prod.images[0] : prod.images[0].url)
                    : "";

                  return (
                    <li key={item.productId} className="flex gap-4 border-b border-gold/15 pb-6">
                      <div className="w-20 shrink-0 border border-gold/30 bg-beige/40 h-24 overflow-hidden flex items-center justify-center">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-[0.6rem] uppercase tracking-wider text-brown/50 text-center px-1">
                            Art Piece
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-brown text-base">{title}</h3>
                          {itemPrice ? (
                            <span className="text-sm font-semibold text-brown">
                              {formatPrice(itemPrice * item.quantity)}
                            </span>
                          ) : null}
                        </div>

                        {item.size ? (
                          <p className="mt-1 text-xs text-brown/60">
                            Size: {item.size} {item.frameColor ? `• Frame: ${item.frameColor}` : ""}
                          </p>
                        ) : null}

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-gold/40">
                            <button
                              type="button"
                              onClick={() => setQuantity(item.productId, item.quantity - 1)}
                              className="px-2.5 py-1 text-brown hover:bg-sand/50"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => setQuantity(item.productId, item.quantity + 1)}
                              className="px-2.5 py-1 text-brown hover:bg-sand/50"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.productId)}
                            className="text-brown/50 hover:text-burnt transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex justify-between items-center text-sm font-semibold text-brown">
                <span className="uppercase tracking-widest text-brown/70">Subtotal:</span>
                <span className="font-display text-2xl text-brown">{formatPrice(subtotal)}</span>
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="lg:col-span-5">
              <div className="border border-gold/30 bg-card p-6 shadow-[var(--shadow-lift)]">
                <h2 className="font-display text-2xl text-brown border-b border-gold/25 pb-3">
                  Shipping Information
                </h2>

                <form onSubmit={handleSubmitOrder} className="mt-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold uppercase tracking-[0.18em] text-burnt">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ayesha Khan"
                      className="mt-1.5 w-full border border-gold/40 bg-ivory px-3.5 py-2.5 text-sm text-brown outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-[0.18em] text-burnt">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="mt-1.5 w-full border border-gold/40 bg-ivory px-3.5 py-2.5 text-sm text-brown outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-[0.18em] text-burnt">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ayesha@example.com"
                      className="mt-1.5 w-full border border-gold/40 bg-ivory px-3.5 py-2.5 text-sm text-brown outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-[0.18em] text-burnt">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Lahore, Karachi, Islamabad..."
                      className="mt-1.5 w-full border border-gold/40 bg-ivory px-3.5 py-2.5 text-sm text-brown outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-[0.18em] text-burnt">
                      Complete Shipping Address *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House number, street, sector/area..."
                      className="mt-1.5 w-full border border-gold/40 bg-ivory px-3.5 py-2.5 text-sm text-brown outline-none focus:border-gold"
                    />
                  </div>

                  <div className="pt-2 border-t border-gold/20">
                    <div className="flex justify-between items-center text-sm font-semibold text-brown mb-4">
                      <span>Total Amount:</span>
                      <span className="font-display text-2xl text-burnt">{formatPrice(subtotal)}</span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-brown py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory hover:bg-burnt transition-colors disabled:opacity-50"
                    >
                      {submitting ? "Placing Order…" : "Confirm & Place Order (COD)"}
                    </button>
                    <p className="mt-2 text-[0.65rem] text-center text-brown/60">
                      Payment via Cash on Delivery upon parcel arrival.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
