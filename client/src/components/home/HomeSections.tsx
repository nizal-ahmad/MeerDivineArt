import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Hand,
  Heart,
  Instagram,
  PenTool,
  Sparkles,
} from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ProductCard, ProductGrid } from "@/components/ProductCard";
import { LinkButton, SectionHeading, Stars } from "@/components/ui-kit";
import {
  benefits,
  bestsellers,
  featuredProducts,
  homeCategoryCards,
  testimonials,
} from "@/data/catalog";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-gold/20 bg-beige/40">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rotate-45 border border-gold/25" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full border border-gold/20" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 md:gap-16 md:py-24">
        <div className="fade-up">
          <p className="eyebrow">Handcrafted Islamic Art</p>
          <h1 className="mt-5 text-[2.6rem] leading-[1.05] text-brown sm:text-6xl lg:text-7xl">
            Art That Holds Meaning
          </h1>
          <div className="rule-gold mt-6 w-28" />
          <p className="mt-6 max-w-md text-base leading-relaxed text-brown/70">
            Handcrafted calligraphy and timeless frames, created to bring beauty
            and meaning into your space.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <LinkButton to="/shop">Shop Collection</LinkButton>
            <LinkButton to="/category/personalized-art" variant="outline">
              Explore Custom Art
            </LinkButton>
          </div>
        </div>

        <div className="relative fade-up">
          <div className="absolute -left-4 -top-4 hidden h-24 w-24 border-l border-t border-gold sm:block" />
          <div className="absolute -bottom-4 -right-4 hidden h-24 w-24 border-b border-r border-gold sm:block" />
          <ImagePlaceholder type="hero" label="Hero Artwork" />
        </div>
      </div>
    </section>
  );
}

export function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
      <SectionHeading
        eyebrow="Collections"
        title="Explore Our Collections"
        subtitle="Discover handcrafted pieces made to add meaning and beauty to your space."
      />
      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {homeCategoryCards.map((card, i) => (
          <Link
            key={card.label}
            to="/category/$slug"
            params={{ slug: card.slug }}
            className="group block bg-card transition-shadow duration-500 hover:shadow-[var(--shadow-soft)]"
          >
            <ImagePlaceholder
              type="category"
              label="Collection Image"
              ratio={
                i % 3 === 1 ? "aspect-[4/5]" : i % 3 === 2 ? "aspect-square" : undefined
              }
            />
            <div className="flex items-center justify-between px-4 py-4 sm:px-5">
              <div>
                <h3 className="text-lg text-brown">{card.label}</h3>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-burnt/80">
                  Explore Collection
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.4}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function FeaturedSection() {
  return (
    <section className="border-y border-gold/20 bg-card/60">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <SectionHeading
          eyebrow="Featured"
          title="Made to Be Meaningful"
          subtitle="Our most loved handcrafted pieces."
        />
        <div className="mt-12">
          <ProductGrid items={featuredProducts} />
        </div>
        <div className="mt-12 flex justify-center">
          <LinkButton to="/shop" variant="outline">
            View All Artwork
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

export function CustomArtSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <ImagePlaceholder type="story" label="Custom Artwork Image" />
        <div>
          <p className="eyebrow">Custom Art</p>
          <h2 className="mt-4 text-3xl text-brown sm:text-4xl md:text-5xl">
            Made Especially For You
          </h2>
          <div className="rule-gold mt-5 w-24" />
          <p className="mt-5 max-w-md leading-relaxed text-brown/70">
            Turn your name, memories and meaningful words into a handcrafted
            piece of art.
          </p>
          <ul className="mt-7 space-y-3">
            {[
              "Personalized designs",
              "Handcrafted finishing",
              "Premium frames",
              "Made according to your requirements",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-brown/80">
                <span className="text-gold">✓</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <LinkButton to="/category/personalized-art" variant="gold">
              Create Your Custom Piece
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BestsellersSection() {
  return (
    <section className="border-y border-gold/20 bg-beige/40 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Loved Most"
          title="Our Bestsellers"
          subtitle="Pieces our customers return to, again and again."
        />
      </div>
      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:gap-6 sm:px-8 lg:mx-auto lg:max-w-7xl">
        {bestsellers.map((p) => (
          <div
            key={p.id}
            className="w-[72%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(25%-1.125rem)]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

const icons = { hand: Hand, heart: Heart, sparkles: Sparkles, pen: PenTool };

export function BenefitsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
      <SectionHeading eyebrow="Why Meer Divine Art" title="Crafted With Care" />
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b) => {
          const Icon = icons[b.icon];
          return (
            <div
              key={b.number}
              className="border-t border-gold/40 pt-6 transition-colors duration-300 hover:border-gold"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-burnt" strokeWidth={1.2} />
                <span className="font-display text-3xl text-gold/70">
                  {b.number}
                </span>
              </div>
              <h3 className="mt-5 text-xl text-brown">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brown/65">
                {b.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function BrandStorySection() {
  return (
    <section className="border-y border-gold/20 bg-card/60">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:gap-16 md:py-24">
        <ImagePlaceholder type="story" label="Studio Image" />
        <div>
          <p className="eyebrow">Our Story</p>
          <h2 className="mt-4 text-3xl text-brown sm:text-4xl md:text-5xl">
            Where Craft Meets Meaning
          </h2>
          <div className="rule-gold mt-5 w-24" />
          <p className="mt-6 leading-relaxed text-brown/70">
            At Meer Divine Art, we believe art should be more than something
            beautiful on a wall. It should carry meaning, emotion and a story.
          </p>
          <p className="mt-4 leading-relaxed text-brown/70">
            Every piece is thoughtfully handcrafted to bring timeless beauty into
            your home and create something you can truly connect with.
          </p>
          <div className="mt-9">
            <LinkButton to="/about" variant="outline">
              Discover Our Story
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}

const galleryLabels = [
  "Craft Process",
  "Calligraphy",
  "Handmade Frame",
  "Finished Artwork",
  "Packaging",
  "Custom Design",
];

export function GallerySection() {
  const ratios = [
    "aspect-[4/5]",
    "aspect-square",
    "aspect-[4/5]",
    "aspect-square",
    "aspect-[4/5]",
    "aspect-square",
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
      <SectionHeading
        eyebrow="Gallery"
        title="Follow Our Craft"
        subtitle="Behind every piece is a story, the process and a little bit of creativity."
      />
      <div className="mt-12 columns-2 gap-4 sm:gap-6 lg:columns-3">
        {galleryLabels.map((label, i) => (
          <div key={label} className="mb-4 break-inside-avoid sm:mb-6">
            <ImagePlaceholder type="gallery" label={label} ratio={ratios[i]} />
          </div>
        ))}
      </div>
      <div className="mt-10 flex items-center justify-center gap-3 text-brown">
        <Instagram className="h-5 w-5 text-burnt" strokeWidth={1.4} />
        <span className="text-sm uppercase tracking-[0.24em]">@meerdivineart</span>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="border-y border-gold/20 bg-beige/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <SectionHeading eyebrow="Reviews" title="Loved By Our Customers" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col bg-card p-7 transition-shadow duration-500 hover:shadow-[var(--shadow-soft)]"
            >
              <Stars />
              <blockquote className="mt-5 flex-1 font-display text-xl leading-relaxed text-brown">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-gold/25 pt-4 text-[0.65rem] uppercase tracking-[0.2em] text-burnt">
                {t.name} — {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-brown">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 md:py-28">
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
          Meer Divine Art
        </p>
        <h2 className="mt-4 text-4xl text-ivory sm:text-5xl">
          Bring Meaning To Your Space
        </h2>
        <p className="mx-auto mt-5 max-w-lg leading-relaxed text-ivory/70">
          Explore handcrafted art created to make your walls feel personal.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <LinkButton to="/shop" variant="gold">
            Shop Now
          </LinkButton>
          <LinkButton to="/category/personalized-art" variant="outlineLight">
            Create Custom Art
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
