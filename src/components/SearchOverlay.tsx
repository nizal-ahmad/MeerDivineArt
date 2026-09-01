import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { formatPrice, products } from "@/data/catalog";
import { useShop } from "@/store/shop";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useShop();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [query]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        searchOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!searchOpen}
    >
      <div
        onClick={() => setSearchOpen(false)}
        className="absolute inset-0 bg-charcoal/50"
      />
      <div
        className={`absolute inset-x-0 top-0 max-h-[85vh] overflow-y-auto bg-ivory shadow-[var(--shadow-lift)] transition-transform duration-300 ${
          searchOpen ? "translate-y-0" : "-translate-y-6"
        }`}
      >
        <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Search</p>
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
              className="text-brown transition-colors hover:text-burnt"
            >
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3 border-b border-gold/40 pb-3">
            <Search className="h-5 w-5 text-brown/50" strokeWidth={1.4} />
            <input
              autoFocus={searchOpen}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search calligraphy, frames, custom art…"
              className="w-full bg-transparent font-display text-2xl text-brown outline-none placeholder:text-brown/35 sm:text-3xl"
            />
          </div>

          <div className="mt-6">
            {query && results.length === 0 ? (
              <p className="py-8 text-center text-sm text-brown/55">
                No pieces match “{query}”.
              </p>
            ) : null}

            <ul className="space-y-3">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/product/$id"
                    params={{ id: p.id }}
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-4 border border-transparent p-2 transition-colors hover:border-gold/30 hover:bg-beige/40"
                  >
                    <div className="w-16 shrink-0">
                      <ImagePlaceholder type="thumbnail" label="" zoomOnHover={false} />
                    </div>
                    <div className="flex-1">
                      <p className="text-brown">{p.name}</p>
                      <p className="text-[0.6rem] uppercase tracking-[0.2em] text-burnt/80">
                        {p.categoryName}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-brown">
                      {formatPrice(p.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {!query ? (
              <div className="mt-2">
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-brown/50">
                  Popular searches
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Ayat-ul-Kursi", "Name Frame", "Bismillah", "Gift", "4 Qul"].map(
                    (term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="border border-gold/40 px-4 py-2 text-xs text-brown transition-colors hover:bg-sand/50"
                      >
                        {term}
                      </button>
                    ),
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
