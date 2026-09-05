import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { navigation } from "@/data/catalog";
import { useShop } from "@/store/shop";

export function AnnouncementBar() {
  return (
    <div className="bg-brown text-ivory">
      <p className="mx-auto max-w-7xl px-5 py-2.5 text-center text-[0.63rem] uppercase tracking-[0.24em] sm:px-8">
        Handcrafted with Love <span className="text-gold">•</span> Nationwide
        Delivery Available
      </p>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center text-brown transition-colors hover:text-burnt"
    >
      {children}
    </button>
  );
}

export function Header() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen, menuOpen, setMenuOpen } =
    useShop();

  return (
    <header className="sticky top-0 z-40">
      <AnnouncementBar />
      <div className="border-b border-gold/25 bg-ivory/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link to="/" className="shrink-0">
            <span className="block font-display text-xl leading-none tracking-[0.18em] text-brown sm:text-2xl">
              MEER
            </span>
            <span className="block text-[0.55rem] uppercase tracking-[0.42em] text-burnt">
              Divine Art
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                to={item.to as any}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-burnt" }}
                className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brown/80 transition-colors hover:text-burnt"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5">
            <IconButton label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </IconButton>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative hidden h-10 w-10 items-center justify-center text-brown transition-colors hover:text-burnt sm:flex"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.4} />
              {wishlist.length > 0 ? (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-burnt px-1 text-[0.55rem] font-semibold text-ivory">
                  {wishlist.length}
                </span>
              ) : null}
            </Link>

            <Link
              to="/contact"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center text-brown transition-colors hover:text-burnt lg:flex"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </Link>

            <IconButton label="Cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
              {cartCount > 0 ? (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[0.55rem] font-bold text-brown">
                  {cartCount}
                </span>
              ) : null}
            </IconButton>

            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-brown lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-charcoal/45 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-[82%] max-w-sm bg-ivory shadow-[var(--shadow-lift)] transition-transform duration-400 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gold/25 px-5 py-4">
            <span className="font-display text-lg tracking-[0.18em] text-brown">
              MEER DIVINE ART
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="text-brown"
            >
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>
          <nav className="flex flex-col px-5 py-4">
            {navigation.map((item) => (
              <Link
                key={item.label}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                to={item.to as any}
                onClick={() => setMenuOpen(false)}
                className="border-b border-gold/15 py-4 font-display text-2xl text-brown transition-colors hover:text-burnt"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="border-b border-gold/15 py-4 font-display text-2xl text-brown"
            >
              Wishlist
            </Link>
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="py-4 font-display text-2xl text-brown"
            >
              Cart
            </Link>
          </nav>
        </aside>
      </div>
    </header>
  );
}
