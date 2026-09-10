import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  mapApiProductToProduct,
  products as staticProducts,
  type Product,
} from "@/data/catalog";
import { api } from "@/services/api";

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string | undefined;
  frameColor?: string | undefined;
  material?: string | undefined;
}

interface ShopState {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  subtotal: number;
  cartOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  allProducts: Product[];
  getProduct: (idOrSlug: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
  clearCart: () => void;
  addToCart: (
    productId: string,
    options?: { quantity?: number; size?: string; frameColor?: string; material?: string },
  ) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>(staticProducts);

  const fetchLiveProducts = useCallback(async () => {
    try {
      const res = await api.getProducts({ limit: 100 });
      if (res.success && res.data && Array.isArray(res.data.products)) {
        const dbMapped = res.data.products.map((p: any) => mapApiProductToProduct(p));
        setAllProducts(dbMapped);
      }
    } catch (err) {
      // Fallback stays with staticProducts if offline/network error
    }
  }, []);

  useEffect(() => {
    fetchLiveProducts();
  }, [fetchLiveProducts]);

  const getProduct = useCallback(
    (idOrSlug: string): Product | undefined => {
      if (!idOrSlug) return undefined;
      return allProducts.find(
        (p) => p.id === idOrSlug || p.slug === idOrSlug || (p as any)._id === idOrSlug
      );
    },
    [allProducts]
  );

  const priceOf = useCallback(
    (id: string) => {
      const prod = getProduct(id);
      return prod ? prod.price : 0;
    },
    [getProduct]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const addToCart: ShopState["addToCart"] = useCallback(
    (productId, options) => {
      setCart((prev) => {
        const existing = prev.find(
          (i) =>
            i.productId === productId &&
            i.size === options?.size &&
            i.frameColor === options?.frameColor &&
            i.material === options?.material
        );
        if (existing) {
          return prev.map((i) =>
            i === existing
              ? { ...i, quantity: i.quantity + (options?.quantity ?? 1) }
              : i
          );
        }
        return [
          ...prev,
          {
            productId,
            quantity: options?.quantity ?? 1,
            size: options?.size,
            frameColor: options?.frameColor,
            material: options?.material,
          },
        ];
      });
      setCartOpen(true);
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const value = useMemo<ShopState>(() => {
    const cartCount = cart.reduce((n, i) => n + i.quantity, 0);
    const subtotal = cart.reduce(
      (sum, i) => sum + priceOf(i.productId) * i.quantity,
      0
    );
    return {
      cart,
      wishlist,
      cartCount,
      subtotal,
      cartOpen,
      searchOpen,
      menuOpen,
      allProducts,
      getProduct,
      refreshProducts: fetchLiveProducts,
      clearCart,
      addToCart,
      removeFromCart,
      setQuantity,
      toggleWishlist,
      isWishlisted: (id: string) => wishlist.includes(id),
      setCartOpen,
      setSearchOpen,
      setMenuOpen,
    };
  }, [
    cart,
    wishlist,
    cartOpen,
    searchOpen,
    menuOpen,
    allProducts,
    getProduct,
    fetchLiveProducts,
    priceOf,
    clearCart,
    addToCart,
    removeFromCart,
    setQuantity,
    toggleWishlist,
  ]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

export const cartProduct = (
  item: CartItem,
  catalog: Product[] = staticProducts
): Product | undefined =>
  catalog.find(
    (p) =>
      p.id === item.productId ||
      p.slug === item.productId ||
      (p as any)._id === item.productId
  );
