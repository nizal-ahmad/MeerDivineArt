import { createFileRoute } from "@tanstack/react-router";
import { ShopBrowser } from "@/components/ShopBrowser";
import { PageHero } from "@/components/ui-kit";
import { products } from "@/data/catalog";

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
  return (
    <>
      <PageHero
        eyebrow="Collection"
        title="Shop Our Collection"
        subtitle="Explore handcrafted art created for meaningful spaces."
      />
      <ShopBrowser allProducts={products} />
    </>
  );
}
