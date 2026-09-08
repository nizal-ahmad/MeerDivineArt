import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShopBrowser } from "@/components/ShopBrowser";
import { PageHero } from "@/components/ui-kit";
import { api } from "@/services/api";
import { useShop } from "@/store/shop";

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
  const { allProducts } = useShop();
  const [categoriesList, setCategoriesList] = useState<any[]>([]);

  useEffect(() => {
    api
      .getCategories()
      .then((res) => {
        if (res.success && res.data) {
          setCategoriesList(res.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Collection"
        title="Shop Our Collection"
        subtitle="Explore handcrafted art created for meaningful spaces."
      />
      <ShopBrowser allProducts={allProducts} dynamicCategories={categoriesList} />
    </>
  );
}
