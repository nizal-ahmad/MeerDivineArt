import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Compass, Heart, Layers, ShieldCheck, Sparkles, Star } from "lucide-react";
import { LinkButton, PageHero, SectionHeading } from "@/components/ui-kit";

const title = "About Us — Meer Divine Art Studio";
const description =
  "Discover the story, heritage, and craftsmanship behind Meer Divine Art. Handcrafted Arabic calligraphy, Islamic wall art, and bespoke frames crafted in Pakistan.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Devotional Craftsmanship",
      text: "Every piece is crafted with deep reverence, precision, and passion, honoring the sacred art of traditional Islamic calligraphy.",
    },
    {
      icon: Award,
      title: "Authentic Materials",
      text: "We use high-grade solid hardwood frames, real 24k gold leaf gilding, and gallery-quality canvas to ensure museum-grade longevity.",
    },
    {
      icon: Sparkles,
      title: "Personalized Elegance",
      text: "From family names to custom Quranic verses, we tailor every piece to harmonize with your interior space and personal story.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Guaranteed",
      text: "Our studio inspects every detail—from joinery to acrylic glazing—ensuring flawlessness before nationwide delivery to your doorstep.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Concept & Calligraphy Design",
      desc: "Sacred script and artistic compositions are digitized and drafted by master calligraphers with classical proportions.",
    },
    {
      num: "02",
      title: "Precision Cut & Gilding",
      desc: "Materials are laser-carved or hand-painted with gold leaf, creating dramatic 3D depth and subtle luminous luster.",
    },
    {
      num: "03",
      title: "Hardwood Framing",
      desc: "Custom frames are cut, stained, and assembled by seasoned wood artisans with protective UV-resistant backing.",
    },
    {
      num: "04",
      title: "Safe Packaging & Delivery",
      desc: "Artworks are multi-layered in shockproof protective casing and shipped with insured courier service nationwide.",
    },
  ];

  const stats = [
    { value: "2,500+", label: "Artworks Handcrafted" },
    { value: "100%", label: "Solid Wood & Premium Finishing" },
    { value: "4.9/5", label: "Customer Satisfaction Score" },
    { value: "Nationwide", label: "Insured Safe Shipping" },
  ];

  return (
    <div className="bg-background">
      {/* Page Hero */}
      <PageHero
        eyebrow="Our Heritage & Philosophy"
        title="Where Faith Meets Fine Craftsmanship"
        subtitle="Transforming sacred Arabic script and personal names into timeless wall art for modern luxury homes."
      />

      {/* Main Story Section */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Studio Image Showcase */}
          <div className="relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl border border-gold/30 shadow-[var(--shadow-lift)]">
              <img
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85"
                alt="Meer Divine Art Studio Craftsmen"
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown/60 via-transparent to-transparent" />
            </div>
            {/* Floating Gold Accent Card */}
            <div className="absolute -bottom-6 -right-4 rounded-xl border border-gold/40 bg-brown p-5 shadow-xl sm:bottom-6 sm:right-6 sm:max-w-xs">
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-gold fill-gold shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ivory">Handmade in Pakistan</p>
                  <p className="mt-0.5 text-[0.7rem] text-gold">Dedicated Studio Artistry</p>
                </div>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="lg:col-span-6">
            <p className="eyebrow">The Meer Divine Art Story</p>
            <h2 className="mt-4 text-3xl font-display text-brown sm:text-4xl lg:text-5xl leading-tight">
              Art Born out of Devotion and Detail
            </h2>
            <div className="rule-gold mt-5 w-24" />
            <p className="mt-6 text-sm leading-relaxed text-brown/80 sm:text-base">
              Founded with a passion for preserving traditional Islamic art forms while infusing modern minimalist aesthetics, <strong>Meer Divine Art</strong> crafts pieces that serve as constant reminders of peace, gratitude, and spiritual beauty.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brown/75">
              Each piece begins with sacred Quranic verses, names of the Almighty, or personalized family calligraphy. Our studio combines age-old hand-carving techniques with contemporary gold foil and hardwood joinery, delivering statement artworks designed to elevate residential and spiritual sanctuaries.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LinkButton to="/shop" variant="solid">
                Explore Artworks
              </LinkButton>
              <LinkButton to="/category/personalized-art" variant="outline">
                Order Custom Art
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Pillars / Core Values */}
      <section className="border-y border-gold/20 bg-card/60 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Our Values"
            title="The Principles That Guide Our Studio"
            subtitle="Built on artistic integrity, uncompromising quality, and spiritual resonance."
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-xl border border-gold/25 bg-ivory/80 p-7 transition-all duration-300 hover:border-gold hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-burnt/10 text-burnt">
                    <Icon className="h-6 w-6 text-burnt" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-xl font-display text-brown">{v.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-brown/70">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Counter Banner */}
      <section className="bg-brown text-ivory py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="p-4">
                <p className="font-display text-4xl font-bold text-gold sm:text-5xl">{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ivory/75">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Process Timeline */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <SectionHeading
          eyebrow="Craftsmanship"
          title="From Studio to Your Sanctuary"
          subtitle="A look behind the scenes at how our artisans bring each artwork to life."
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((st) => (
            <div key={st.num} className="relative rounded-xl border border-gold/30 bg-beige/30 p-7">
              <span className="font-display text-4xl font-bold text-gold/40">{st.num}</span>
              <h3 className="mt-4 text-lg font-display text-brown">{st.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-brown/70">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="border-t border-gold/20 bg-card py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-3xl text-brown sm:text-4xl">Ready to Transform Your Space?</h2>
          <p className="mt-4 text-sm text-brown/75 leading-relaxed">
            Whether you seek a timeless Ayatul Kursi artwork or a custom wedding name gift, our studio is ready to create it for you.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <LinkButton to="/shop" variant="gold">
              Browse Collection
            </LinkButton>
            <LinkButton to="/contact" variant="outline">
              Contact Studio
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
