export type CategorySlug =
  | "islamic-calligraphy"
  | "custom-frames"
  | "wall-art"
  | "personalized-art"
  | "gift-collection";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
}

export interface ProductImage {
  url: string;
  public_id?: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  categoryName: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  rating: number;
  reviews: number;
  description: string;
  materials: string;
  dimensions: string;
  care: string;
  sizes: string[];
  frameColors: string[];
  images?: ProductImage[] | string[];
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface Testimonial {
  name: string;
  city: string;
  quote: string;
}

export const categories: Category[] = [
  {
    slug: "islamic-calligraphy",
    name: "Islamic Calligraphy",
    tagline: "Verses rendered by hand",
    description:
      "Hand-drawn Arabic calligraphy pieces, finished in gold leaf and matte pigments on premium board.",
  },
  {
    slug: "custom-frames",
    name: "Custom Frames",
    tagline: "Names, dates and moments",
    description:
      "Personalised name frames and handmade wooden frames crafted around the words that matter to you.",
  },
  {
    slug: "wall-art",
    name: "Wall Art",
    tagline: "Quiet statements for your walls",
    description:
      "Contemporary handcrafted wall pieces that bring warmth and calm to living rooms and prayer corners.",
  },
  {
    slug: "personalized-art",
    name: "Personalized Art",
    tagline: "Made around your story",
    description:
      "Commissioned artwork designed with you, from first sketch to the final hand-finished detail.",
  },
  {
    slug: "gift-collection",
    name: "Gift Collection",
    tagline: "Gifts with meaning",
    description:
      "Ready-to-gift handcrafted pieces, wrapped and packed with care for weddings, homes and new beginnings.",
  },
];

export const homeCategoryCards = [
  { slug: "islamic-calligraphy", label: "Islamic Calligraphy", image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80" },
  { slug: "custom-frames", label: "Custom Name Frames", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80" },
  { slug: "custom-frames", label: "Handmade Frames", image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80" },
  { slug: "wall-art", label: "Wall Art", image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80" },
  { slug: "personalized-art", label: "Custom Artwork", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80" },
  { slug: "gift-collection", label: "Gift Collection", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80" },
] as const;

const base = {
  materials:
    "Hand-finished MDF board, acid-free art paper, gold leaf detailing, solid wood frame with acrylic glazing.",
  care: "Wipe gently with a dry, soft cloth. Keep away from direct sunlight and damp walls.",
};

export const products: Product[] = [
  {
    id: "allah-muhammad-frame",
    name: "Allah Muhammad Calligraphy Frame",
    category: "islamic-calligraphy",
    categoryName: "Islamic Calligraphy",
    price: 7500,
    oldPrice: 9500,
    badge: "Bestseller",
    rating: 5,
    reviews: 128,
    description:
      "A pair of hand-drawn calligraphy panels finished in warm gold on ivory, framed in solid wood for a quiet, timeless presence.",
    dimensions: '12" x 12" each panel (pair)',
    sizes: ['12" x 12"', '16" x 16"', '20" x 20"'],
    frameColors: ["Deep Brown", "Antique Gold", "Matte Black"],
    images: [{ url: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80" }],
    isBestseller: true,
    ...base,
  },
  {
    id: "4-qul-frame",
    name: "4 Qul Handcrafted Frame",
    category: "islamic-calligraphy",
    categoryName: "Islamic Calligraphy",
    price: 9500,
    badge: "Handcrafted",
    rating: 5,
    reviews: 86,
    description:
      "The four Quls laid out in a balanced quadrant composition, each panel hand-lettered and finished with a fine gold border.",
    dimensions: '24" x 24" overall',
    sizes: ['20" x 20"', '24" x 24"', '30" x 30"'],
    frameColors: ["Deep Brown", "Antique Gold", "Ivory"],
    images: [{ url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80" }],
    isBestseller: true,
    ...base,
  },
  {
    id: "custom-couple-name-frame",
    name: "Custom Couple Name Frame",
    category: "custom-frames",
    categoryName: "Custom Frames",
    price: 5500,
    oldPrice: 6500,
    badge: "Popular",
    rating: 5,
    reviews: 214,
    description:
      "Two names woven into a single flowing composition, hand-drawn to order and finished with your chosen frame colour.",
    dimensions: '16" x 12"',
    sizes: ['12" x 9"', '16" x 12"', '20" x 16"'],
    frameColors: ["Deep Brown", "Antique Gold", "Ivory"],
    images: [{ url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80" }],
    isBestseller: true,
    ...base,
  },
  {
    id: "ayat-ul-kursi-gold",
    name: "Ayat-ul-Kursi Gold Calligraphy",
    category: "islamic-calligraphy",
    categoryName: "Islamic Calligraphy",
    price: 9500,
    oldPrice: 12000,
    badge: "Bestseller",
    rating: 5,
    reviews: 176,
    description:
      "An expansive panel of Ayat-ul-Kursi rendered in gold leaf over a deep sand ground, made for a feature wall.",
    dimensions: '36" x 18"',
    sizes: ['30" x 15"', '36" x 18"', '48" x 24"'],
    frameColors: ["Deep Brown", "Antique Gold", "Matte Black"],
    images: [{ url: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=800&q=80" }],
    isBestseller: true,
    ...base,
  },
  {
    id: "personalized-arabic-name",
    name: "Personalized Arabic Name Frame",
    category: "personalized-art",
    categoryName: "Personalized Art",
    price: 4500,
    rating: 5,
    reviews: 92,
    badge: "New",
    description:
      "Your name written in classical Arabic script, hand-finished and mounted on textured ivory board.",
    dimensions: '14" x 10"',
    sizes: ['10" x 8"', '14" x 10"', '18" x 12"'],
    frameColors: ["Deep Brown", "Antique Gold", "Ivory"],
    images: [{ url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80" }],
    isNew: true,
    ...base,
  },
  {
    id: "minimal-bismillah",
    name: "Minimal Bismillah Frame",
    category: "wall-art",
    categoryName: "Wall Art",
    price: 3500,
    oldPrice: 4200,
    rating: 4,
    reviews: 64,
    badge: "Handcrafted",
    description:
      "A restrained, modern Bismillah in single-stroke script — quiet enough for a hallway, warm enough for a prayer corner.",
    dimensions: '18" x 8"',
    sizes: ['14" x 6"', '18" x 8"', '24" x 10"'],
    frameColors: ["Deep Brown", "Ivory", "Matte Black"],
    images: [{ url: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80" }],
    ...base,
  },
  {
    id: "subhanallah-set",
    name: "SubhanAllah Calligraphy Set",
    category: "wall-art",
    categoryName: "Wall Art",
    price: 6500,
    rating: 5,
    reviews: 58,
    badge: "Popular",
    description:
      "A set of three tasbeeh panels, each hand-lettered and finished in complementary gold and sand tones.",
    dimensions: 'Three panels, 10" x 10" each',
    sizes: ['8" x 8"', '10" x 10"', '14" x 14"'],
    frameColors: ["Deep Brown", "Antique Gold", "Ivory"],
    images: [{ url: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80" }],
    isBestseller: true,
    ...base,
  },
  {
    id: "custom-family-name-frame",
    name: "Custom Family Name Frame",
    category: "custom-frames",
    categoryName: "Custom Frames",
    price: 5500,
    rating: 5,
    reviews: 143,
    badge: "Bestseller",
    description:
      "A family name with established date, hand-drawn in a heritage script and framed for the entryway.",
    dimensions: '20" x 14"',
    sizes: ['16" x 12"', '20" x 14"', '24" x 18"'],
    frameColors: ["Deep Brown", "Antique Gold", "Matte Black"],
    images: [{ url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80" }],
    isBestseller: true,
    ...base,
  },
  {
    id: "handmade-wooden-frame",
    name: "Handmade Wooden Art Frame",
    category: "custom-frames",
    categoryName: "Custom Frames",
    price: 4500,
    rating: 4,
    reviews: 37,
    description:
      "Solid wood frame hand-sanded and oiled in our studio, ready to hold your chosen artwork or calligraphy.",
    dimensions: '16" x 12"',
    sizes: ['12" x 9"', '16" x 12"', '20" x 16"'],
    frameColors: ["Deep Brown", "Natural Oak", "Matte Black"],
    images: [{ url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80" }],
    isNew: true,
    ...base,
  },
  {
    id: "nikkah-gift-frame",
    name: "Nikkah Keepsake Gift Frame",
    category: "gift-collection",
    categoryName: "Gift Collection",
    price: 7500,
    oldPrice: 8900,
    badge: "Popular",
    rating: 5,
    reviews: 101,
    description:
      "A keepsake piece for newlyweds — names, date and a short dua, presented in a gift-ready box.",
    dimensions: '18" x 12"',
    sizes: ['14" x 10"', '18" x 12"', '22" x 16"'],
    frameColors: ["Antique Gold", "Deep Brown", "Ivory"],
    images: [{ url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80" }],
    ...base,
  },
  {
    id: "gold-leaf-verse-panel",
    name: "Gold Leaf Verse Panel",
    category: "gift-collection",
    categoryName: "Gift Collection",
    price: 12000,
    badge: "Handcrafted",
    rating: 5,
    reviews: 44,
    description:
      "Our most detailed gifting piece: hand-applied gold leaf over a hand-painted sand ground, signed by the artist.",
    dimensions: '30" x 20"',
    sizes: ['24" x 16"', '30" x 20"', '40" x 26"'],
    frameColors: ["Antique Gold", "Deep Brown"],
    images: [{ url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80" }],
    ...base,
  },
  {
    id: "custom-portrait-artwork",
    name: "Custom Commissioned Artwork",
    category: "personalized-art",
    categoryName: "Personalized Art",
    price: 15000,
    badge: "Made to Order",
    rating: 5,
    reviews: 29,
    description:
      "A fully commissioned piece developed with you — composition, script, palette and finish chosen together.",
    dimensions: "Sized to your wall",
    sizes: ["Small", "Medium", "Large", "Custom"],
    frameColors: ["Deep Brown", "Antique Gold", "Ivory", "Matte Black"],
    images: [{ url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80" }],
    isNew: true,
    ...base,
  },
];

export const featuredProducts = products.slice(0, 8);
export const bestsellers = products.filter((p) => p.isBestseller);

export const testimonials: Testimonial[] = [
  {
    name: "Ayesha Khan",
    city: "Lahore",
    quote:
      "The frame looked even more beautiful in person. The detailing was amazing.",
  },
  {
    name: "Bilal Ahmed",
    city: "Karachi",
    quote:
      "Absolutely loved the customization. It made the perfect gift.",
  },
  {
    name: "Hira Siddiqui",
    city: "Islamabad",
    quote:
      "Beautiful craftsmanship and premium finishing. Highly recommended.",
  },
];

export const benefits = [
  {
    number: "01",
    title: "Handcrafted",
    text: "Every piece is created with attention to detail.",
    icon: "hand",
  },
  {
    number: "02",
    title: "Made With Meaning",
    text: "Art designed to carry beauty, faith and personal meaning.",
    icon: "heart",
  },
  {
    number: "03",
    title: "Premium Finishing",
    text: "Carefully selected materials and refined finishing.",
    icon: "sparkles",
  },
  {
    number: "04",
    title: "Made For You",
    text: "Personalized artwork created around your vision.",
    icon: "pen",
  },
] as const;

export const navigation = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Calligraphy", to: "/category/islamic-calligraphy" },
  { label: "Frames", to: "/category/custom-frames" },
  { label: "Custom Art", to: "/category/personalized-art" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export const formatPrice = (value: number) =>
  `Rs. ${value.toLocaleString("en-PK")}`;

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const productsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);
