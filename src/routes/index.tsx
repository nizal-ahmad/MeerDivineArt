import { createFileRoute } from "@tanstack/react-router";
import {
  BenefitsSection,
  BestsellersSection,
  BrandStorySection,
  CategorySection,
  CustomArtSection,
  FeaturedSection,
  FinalCta,
  GallerySection,
  HeroSection,
  TestimonialsSection,
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
      <CategorySection />
      <FeaturedSection />
      <CustomArtSection />
      <BestsellersSection />
      <BenefitsSection />
      <BrandStorySection />
      <GallerySection />
      <TestimonialsSection />
      <FinalCta />
    </>
  );
}
