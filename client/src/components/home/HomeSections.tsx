import { Link } from "@tanstack/react-router";
import { ArrowRight, Hand, Heart, Instagram, PenTool, Sparkles } from "lucide-react";
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
import { useShop } from "@/store/shop";
import heroBg from "@/assets/hero_bg.jpg";

export function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-2.5 sm:px-6 lg:px-8 lg:py-3.5">
      <div className="relative flex min-h-[320px] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[440px] w-full overflow-hidden rounded-2xl border border-gold/30 bg-brown shadow-[var(--shadow-lift)] lg:rounded-3xl items-center">
        {/* User Provided Lifestyle Background Image */}
        <img
          src={heroBg}
          alt="Handcrafted Islamic Calligraphy & Carved Entrance Door Art"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] transition-transform duration-1000 scale-105"
        />

        {/* Ambient Overlay Gradients for Cinematic Depth and Readability (Darker on Left) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/35 lg:bg-gradient-to-r lg:from-black/85 lg:via-black/60 lg:to-black/30" />
        
        {/* Soft Radial Gold Rays Ambient Lighting */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent opacity-70" />

        {/* Hero Content (Positioned on the Left Side) */}
        <div className="relative z-10 grid h-full w-full grid-cols-1 items-center p-5 sm:p-7 md:p-9 lg:grid-cols-12 lg:p-10">
          <div className="flex flex-col items-start lg:col-span-7 lg:col-start-1 xl:col-span-6 xl:col-start-1 fade-up">
            
            {/* Original Top Badge */}
            <div className="inline-block rounded-sm bg-burnt px-3.5 py-1 text-[0.65rem] font-bold tracking-[0.2em] text-ivory uppercase shadow-sm mb-2.5">
              LATEST COLLECTION
            </div>

            {/* Original Main Headline */}
            <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-white leading-[1.08] sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              HANDCRAFTED <br />
              <span className="text-gold">ISLAMIC WALL ART</span>
            </h1>

            {/* Original Description Paragraph */}
            <p className="mt-3 max-w-lg text-xs leading-relaxed text-ivory/85 sm:text-xs md:text-sm font-sans drop-shadow-md">
              For spaces that seek quiet beauty, faith, and personal meaning. We take sacred
              Arabic verses and personalized names and craft them into minimalist, luxury wall
              art. From gold-leaf detailing to solid wood frames.
            </p>

            {/* Original CTA Action Button */}
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-md bg-gold px-7 py-3 text-xs sm:text-sm font-bold tracking-[0.2em] text-brown uppercase shadow-[0_6px_22px_rgba(225,161,64,0.4)] transition-all duration-300 hover:bg-gold-soft hover:shadow-[0_8px_28px_rgba(225,161,64,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
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
              label={card.label}
              src={card.image}
              ratio={i % 3 === 1 ? "aspect-[4/5]" : i % 3 === 2 ? "aspect-square" : undefined}
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
  const { allProducts } = useShop();
  // Dynamic list: show newly added or featured products, fallback to static featuredProducts
  const featuredList = allProducts.filter((p) => p.featured || p.isNew || p.badge);
  const displayItems = (featuredList.length > 0 ? featuredList : allProducts).slice(0, 8);

  return (
    <section className="border-y border-gold/20 bg-card/60">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <SectionHeading
          eyebrow="Featured"
          title="Made to Be Meaningful"
          subtitle="Our most loved handcrafted pieces."
        />
        <div className="mt-12">
          <ProductGrid items={displayItems.length > 0 ? displayItems : featuredProducts} />
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
        <ImagePlaceholder
          type="story"
          label="Custom Artwork Image"
          src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80"
        />
        <div>
          <p className="eyebrow">Custom Art</p>
          <h2 className="mt-4 text-3xl text-brown sm:text-4xl md:text-5xl">
            Made Especially For You
          </h2>
          <div className="rule-gold mt-5 w-24" />
          <p className="mt-5 max-w-md leading-relaxed text-brown/70">
            Turn your name, memories and meaningful words into a handcrafted piece of art.
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
  const { allProducts } = useShop();
  const bestsellersList = allProducts.filter((p) => p.isBestseller);
  const displayBestsellers = (bestsellersList.length > 0 ? bestsellersList : allProducts).slice(
    0,
    8,
  );

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
        {(displayBestsellers.length > 0 ? displayBestsellers : bestsellers).map((p) => (
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
                <span className="font-display text-3xl text-gold/70">{b.number}</span>
              </div>
              <h3 className="mt-5 text-xl text-brown">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brown/65">{b.text}</p>
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
        <ImagePlaceholder
          type="story"
          label="Studio Image"
          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=900&q=80"
        />
        <div>
          <p className="eyebrow">Our Story</p>
          <h2 className="mt-4 text-3xl text-brown sm:text-4xl md:text-5xl">
            Where Craft Meets Meaning
          </h2>
          <div className="rule-gold mt-5 w-24" />
          <p className="mt-6 leading-relaxed text-brown/70">
            At Meer Divine Art, we believe art should be more than something beautiful on a wall. It
            should carry meaning, emotion and a story.
          </p>
          <p className="mt-4 leading-relaxed text-brown/70">
            Every piece is thoughtfully handcrafted to bring timeless beauty into your home and
            create something you can truly connect with.
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

const galleryItems = [
  {
    label: "Craft Process",
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Calligraphy",
    image:
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Handmade Frame",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Finished Artwork",
    image:
      "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Packaging",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Custom Design",
    image:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
  },
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
        {galleryItems.map((item, i) => (
          <div key={item.label} className="mb-4 break-inside-avoid sm:mb-6">
            <ImagePlaceholder
              type="gallery"
              label={item.label}
              src={item.image}
              ratio={ratios[i]}
            />
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
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">Meer Divine Art</p>
        <h2 className="mt-4 text-4xl text-ivory sm:text-5xl">Bring Meaning To Your Space</h2>
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
