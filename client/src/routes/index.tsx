import { createFileRoute } from "@tanstack/react-router";
import {
  BestsellersSection,
  BrandStorySection,
  CategorySection,
  CustomArtSection,
  DealsSection,
  FeaturedSection,
  HeroSection,
  HomeStoriesSection,
  PromoBannersSection,
  SignatureBannersSection,
  TexturedCanvasBannerSection,
} from "@/components/home/HomeSections";

const title = "Meer Divine Art — Handcrafted Calligraphy & Islamic Wall Art";
const description =
  "Handcrafted Arabic calligraphy, Islamic wall art and personalised name frames, made in Pakistan with premium finishing and nationwide delivery.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <DealsSection />
      <CategorySection />
      <PromoBannersSection />
      <FeaturedSection />
      <CustomArtSection />
      <BestsellersSection />
      <TexturedCanvasBannerSection />
      <BrandStorySection />
      <SignatureBannersSection />
      <HomeStoriesSection />
    </>
  );
}
