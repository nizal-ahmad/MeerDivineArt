import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductCard";
import { categories, formatPrice, type Product } from "@/data/catalog";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Alphabetical" },
] as const;

const priceBands = [
  { value: "all", label: "All prices", min: 0, max: Infinity },
  { value: "under-5000", label: "Under Rs. 5,000", min: 0, max: 5000 },
  { value: "5000-10000", label: "Rs. 5,000 – 10,000", min: 5000, max: 10000 },
  { value: "over-10000", label: "Above Rs. 10,000", min: 10000, max: Infinity },
] as const;

export function ShopBrowser({
  allProducts,
  lockedCategory,
}: {
  allProducts: Product[];
  lockedCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [band, setBand] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const priceBand = priceBands.find((b) => b.value === band)!;
    const list = allProducts.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q);
      const matchesCategory =
        lockedCategory || category === "all" || p.category === category;
      const matchesPrice = p.price >= priceBand.min && p.price <= priceBand.max;
      return matchesQuery && matchesCategory && matchesPrice;
    });

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [allProducts, query, category, band, sort, lockedCategory]);

  const filters = (
    <div className="space-y-8">
      <div>
        <h3 className="text-[0.65rem] uppercase tracking-[0.24em] text-burnt">
          Search
        </h3>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pieces…"
          className="mt-4 w-full border border-gold/40 bg-card px-4 py-3 text-sm text-brown outline-none transition-colors placeholder:text-brown/40 focus:border-gold"
        />
      </div>

      {!lockedCategory ? (
        <div>
          <h3 className="text-[0.65rem] uppercase tracking-[0.24em] text-burnt">
            Category
          </h3>
          <ul className="mt-4 space-y-2">
            {[{ slug: "all", name: "All Collections" }, ...categories].map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => setCategory(c.slug)}
                  className={`w-full border-l-2 py-1.5 pl-3 text-left text-sm transition-colors ${
                    category === c.slug
                      ? "border-gold text-brown"
                      : "border-transparent text-brown/60 hover:text-burnt"
                  }`}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h3 className="text-[0.65rem] uppercase tracking-[0.24em] text-burnt">
          Price
        </h3>
        <ul className="mt-4 space-y-2">
          {priceBands.map((b) => (
            <li key={b.value}>
              <button
                type="button"
                onClick={() => setBand(b.value)}
                className={`w-full border-l-2 py-1.5 pl-3 text-left text-sm transition-colors ${
                  band === b.value
                    ? "border-gold text-brown"
                    : "border-transparent text-brown/60 hover:text-burnt"
                }`}
              >
                {b.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gold/25 pt-6 text-xs text-brown/55">
        Prices from {formatPrice(Math.min(...allProducts.map((p) => p.price)))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16">
      <div className="flex flex-col gap-10 lg:flex-row">
        <aside className="hidden w-60 shrink-0 lg:block">{filters}</aside>

        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/25 pb-4">
            <p className="text-xs uppercase tracking-[0.2em] text-brown/60">
              {results.length} {results.length === 1 ? "piece" : "pieces"}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 border border-gold/40 px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brown lg:hidden"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
                Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
                className="border border-gold/40 bg-card px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brown outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8">
            {results.length ? (
              <ProductGrid items={results} />
            ) : (
              <p className="py-20 text-center text-sm text-brown/55">
                No pieces match your filters yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${filtersOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!filtersOpen}
      >
        <div
          onClick={() => setFiltersOpen(false)}
          className={`absolute inset-0 bg-charcoal/45 transition-opacity duration-300 ${
            filtersOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-y-0 left-0 w-[85%] max-w-xs overflow-y-auto bg-ivory p-6 transition-transform duration-300 ${
            filtersOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-display text-xl text-brown">Filters</span>
            <button
              type="button"
              aria-label="Close filters"
              onClick={() => setFiltersOpen(false)}
              className="text-brown"
            >
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>
          {filters}
          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="mt-8 w-full bg-brown px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ivory"
          >
            Show {results.length} results
          </button>
        </div>
      </div>
    </div>
  );
}
