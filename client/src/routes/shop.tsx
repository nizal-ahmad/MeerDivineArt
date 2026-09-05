import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShopBrowser } from "@/components/ShopBrowser";
import { PageHero } from "@/components/ui-kit";
import { products as staticProducts, type Product } from "@/data/catalog";
import { api } from "@/services/api";

const title = "Shop Handcrafted Art — Meer Divine Art";
const description =
  "Browse handcrafted calligraphy, personalised name frames, wall art and gift pieces from the Meer Divine Art studio.";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [productList, setProductList] = useState<Product[]>(staticProducts);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);

  useEffect(() => {
    // Fetch live products from Express API
    api
      .getProducts({ limit: 100 })
      .then((res) => {
        if (res.success && res.data.products && res.data.products.length > 0) {
          // Map DB products to match frontend Product interface
          const mapped: Product[] = res.data.products.map((p: any) => ({
            id: p.slug || p._id,
            name: p.name,
            category: p.category?.slug || p.categoryName?.toLowerCase().replace(/\s+/g, "-") || "custom-frames",
            categoryName: p.categoryName || "Custom Frames",
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
            isBestseller: p.isBestseller,
            isNew: p.isNew,
            images: p.images || [],
          }));
          setProductList(mapped);
        }
      })
      .catch(() => {});

    api.getCategories().then((res) => {
      if (res.success && res.data) {
        setCategoriesList(res.data);
      }
    }).catch(() => {});
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Collection"
        title="Shop Our Collection"
        subtitle="Explore handcrafted art created for meaningful spaces."
      />
      <ShopBrowser allProducts={productList} dynamicCategories={categoriesList} />
    </>
  );
}
