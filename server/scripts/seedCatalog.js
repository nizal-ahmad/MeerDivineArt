import dotenv from "dotenv";
import mongoose from "mongoose";
import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";

dotenv.config();

const categoriesSeedData = [
  {
    slug: "islamic-calligraphy",
    name: "Islamic Calligraphy",
    tagline: "Verses rendered by hand",
    description: "Hand-drawn Arabic calligraphy pieces, finished in gold leaf and matte pigments on premium board.",
  },
  {
    slug: "custom-frames",
    name: "Custom Frames",
    tagline: "Names, dates and moments",
    description: "Personalised name frames and handmade wooden frames crafted around the words that matter to you.",
  },
  {
    slug: "wall-art",
    name: "Wall Art",
    tagline: "Quiet statements for your walls",
    description: "Contemporary handcrafted wall pieces that bring warmth and calm to living rooms and prayer corners.",
  },
  {
    slug: "personalized-art",
    name: "Personalized Art",
    tagline: "Made around your story",
    description: "Commissioned artwork designed with you, from first sketch to the final hand-finished detail.",
  },
  {
    slug: "gift-collection",
    name: "Gift Collection",
    tagline: "Gifts with meaning",
    description: "Ready-to-gift handcrafted pieces, wrapped and packed with care for weddings, homes and new beginnings.",
  },
];

const base = {
  materials: "Hand-finished MDF board, acid-free art paper, gold leaf detailing, solid wood frame with acrylic glazing.",
  care: "Wipe gently with a dry, soft cloth. Keep away from direct sunlight and damp walls.",
};

const productsSeedData = [
  {
    slug: "allah-muhammad-frame",
    sku: "SKU-AMF-01",
    name: "Allah Muhammad Calligraphy Frame",
    categorySlug: "islamic-calligraphy",
    price: 7500,
    discountPrice: 9500,
    badge: "Bestseller",
    rating: 5,
    reviews: 128,
    description: "A pair of hand-drawn calligraphy panels finished in warm gold on ivory, framed in solid wood for a quiet, timeless presence.",
    dimensions: '12" x 12" each panel (pair)',
    sizes: ['12" x 12"', '16" x 16"', '20" x 20"'],
    colors: ["Deep Brown", "Antique Gold", "Matte Black"],
    images: [{ url: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80" }],
    isBestseller: true,
    featured: true,
    active: true,
    ...base,
  },
  {
    slug: "4-qul-frame",
    sku: "SKU-4QUL-02",
    name: "4 Qul Handcrafted Frame",
    categorySlug: "islamic-calligraphy",
    price: 9500,
    badge: "Handcrafted",
    rating: 5,
    reviews: 86,
    description: "The four Quls laid out in a balanced quadrant composition, each panel hand-lettered and finished with a fine gold border.",
    dimensions: '24" x 24" overall',
    sizes: ['20" x 20"', '24" x 24"', '30" x 30"'],
    colors: ["Deep Brown", "Antique Gold", "Ivory"],
    images: [{ url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80" }],
    isBestseller: true,
    featured: true,
    active: true,
    ...base,
  },
  {
    slug: "custom-couple-name-frame",
    sku: "SKU-CCNF-03",
    name: "Custom Couple Name Frame",
    categorySlug: "custom-frames",
    price: 5500,
    discountPrice: 6500,
    badge: "Popular",
    rating: 5,
    reviews: 214,
    description: "Two names woven into a single flowing composition, hand-drawn to order and finished with your chosen frame colour.",
    dimensions: '16" x 12"',
    sizes: ['12" x 9"', '16" x 12"', '20" x 16"'],
    colors: ["Deep Brown", "Antique Gold", "Ivory"],
    images: [{ url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80" }],
    isBestseller: true,
    featured: true,
    active: true,
    ...base,
  },
  {
    slug: "ayat-ul-kursi-gold",
    sku: "SKU-AUKG-04",
    name: "Ayat-ul-Kursi Gold Calligraphy",
    categorySlug: "islamic-calligraphy",
    price: 9500,
    discountPrice: 12000,
    badge: "Bestseller",
    rating: 5,
    reviews: 176,
    description: "An expansive panel of Ayat-ul-Kursi rendered in gold leaf over a deep sand ground, made for a feature wall.",
    dimensions: '36" x 18"',
    sizes: ['30" x 15"', '36" x 18"', '48" x 24"'],
    colors: ["Deep Brown", "Antique Gold", "Matte Black"],
    images: [{ url: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=800&q=80" }],
    isBestseller: true,
    featured: true,
    active: true,
    ...base,
  },
  {
    slug: "personalized-arabic-name",
    sku: "SKU-PAN-05",
    name: "Personalized Arabic Name Frame",
    categorySlug: "personalized-art",
    price: 4500,
    rating: 5,
    reviews: 92,
    badge: "New",
    description: "Your name written in classical Arabic script, hand-finished and mounted on textured ivory board.",
    dimensions: '14" x 10"',
    sizes: ['10" x 8"', '14" x 10"', '18" x 12"'],
    colors: ["Deep Brown", "Antique Gold", "Ivory"],
    images: [{ url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80" }],
    isNew: true,
    featured: true,
    active: true,
    ...base,
  },
  {
    slug: "minimal-bismillah",
    sku: "SKU-MBM-06",
    name: "Minimal Bismillah Frame",
    categorySlug: "wall-art",
    price: 3500,
    discountPrice: 4200,
    rating: 4,
    reviews: 64,
    badge: "Handcrafted",
    description: "A restrained, modern Bismillah in single-stroke script — quiet enough for a hallway, warm enough for a prayer corner.",
    dimensions: '18" x 8"',
    sizes: ['14" x 6"', '18" x 8"', '24" x 10"'],
    colors: ["Deep Brown", "Ivory", "Matte Black"],
    images: [{ url: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80" }],
    featured: false,
    active: true,
    ...base,
  },
  {
    slug: "subhanallah-set",
    sku: "SKU-SCS-07",
    name: "SubhanAllah Calligraphy Set",
    categorySlug: "wall-art",
    price: 6500,
    rating: 5,
    reviews: 58,
    badge: "Popular",
    description: "A set of three tasbeeh panels, each hand-lettered and finished in complementary gold and sand tones.",
    dimensions: 'Three panels, 10" x 10" each',
    sizes: ['8" x 8"', '10" x 10"', '14" x 14"'],
    colors: ["Deep Brown", "Antique Gold", "Ivory"],
    images: [{ url: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80" }],
    isBestseller: true,
    featured: true,
    active: true,
    ...base,
  },
  {
    slug: "custom-family-name-frame",
    sku: "SKU-CFNF-08",
    name: "Custom Family Name Frame",
    categorySlug: "custom-frames",
    price: 5500,
    rating: 5,
    reviews: 143,
    badge: "Bestseller",
    description: "A family name with established date, hand-drawn in a heritage script and framed for the entryway.",
    dimensions: '20" x 14"',
    sizes: ['16" x 12"', '20" x 14"', '24" x 18"'],
    colors: ["Deep Brown", "Antique Gold", "Matte Black"],
    images: [{ url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80" }],
    isBestseller: true,
    featured: true,
    active: true,
    ...base,
  },
  {
    slug: "handmade-wooden-frame",
    sku: "SKU-HWAF-09",
    name: "Handmade Wooden Art Frame",
    categorySlug: "custom-frames",
    price: 4500,
    rating: 4,
    reviews: 37,
    description: "Solid wood frame hand-sanded and oiled in our studio, ready to hold your chosen artwork or calligraphy.",
    dimensions: '16" x 12"',
    sizes: ['12" x 9"', '16" x 12"', '20" x 16"'],
    colors: ["Deep Brown", "Natural Oak", "Matte Black"],
    images: [{ url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80" }],
    isNew: true,
    featured: false,
    active: true,
    ...base,
  },
  {
    slug: "nikkah-gift-frame",
    sku: "SKU-NKGF-10",
    name: "Nikkah Keepsake Gift Frame",
    categorySlug: "gift-collection",
    price: 7500,
    discountPrice: 8900,
    badge: "Popular",
    rating: 5,
    reviews: 101,
    description: "A keepsake piece for newlyweds — names, date and a short dua, presented in a gift-ready box.",
    dimensions: '18" x 12"',
    sizes: ['14" x 10"', '18" x 12"', '22" x 16"'],
    colors: ["Antique Gold", "Deep Brown", "Ivory"],
    images: [{ url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80" }],
    featured: false,
    active: true,
    ...base,
  },
  {
    slug: "gold-leaf-verse-panel",
    sku: "SKU-GLVP-11",
    name: "Gold Leaf Verse Panel",
    categorySlug: "gift-collection",
    price: 12000,
    badge: "Handcrafted",
    rating: 5,
    reviews: 44,
    description: "Our most detailed gifting piece: hand-applied gold leaf over a hand-painted sand ground, signed by the artist.",
    dimensions: '30" x 20"',
    sizes: ['24" x 16"', '30" x 20"', '40" x 26"'],
    colors: ["Antique Gold", "Deep Brown"],
    images: [{ url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80" }],
    featured: false,
    active: true,
    ...base,
  },
  {
    slug: "custom-portrait-artwork",
    sku: "SKU-CPAR-12",
    name: "Custom Commissioned Artwork",
    categorySlug: "personalized-art",
    price: 15000,
    badge: "Made to Order",
    rating: 5,
    reviews: 29,
    description: "A fully commissioned piece developed with you — composition, script, palette and finish chosen together.",
    dimensions: "Sized to your wall",
    sizes: ["Small", "Medium", "Large", "Custom"],
    colors: ["Deep Brown", "Antique Gold", "Ivory", "Matte Black"],
    images: [{ url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80" }],
    isNew: true,
    featured: false,
    active: true,
    ...base,
  },
];

const seedCatalog = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("MONGODB_URI missing in .env");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for catalog seeding...");

    // Seed Categories
    const categoryMap = {};
    for (const catData of categoriesSeedData) {
      let catDoc = await Category.findOne({ slug: catData.slug });
      if (!catDoc) {
        catDoc = await Category.create(catData);
        console.log(`Created Category: ${catDoc.name}`);
      } else {
        console.log(`Category exists: ${catDoc.name}`);
      }
      categoryMap[catData.slug] = catDoc;
    }

    // Seed Products
    for (const prodData of productsSeedData) {
      const catDoc = categoryMap[prodData.categorySlug];
      if (!catDoc) continue;

      let prodDoc = await Product.findOne({ slug: prodData.slug });
      const { categorySlug, ...cleanProdData } = prodData;

      if (!prodDoc) {
        await Product.create({
          ...cleanProdData,
          category: catDoc._id,
          categoryName: catDoc.name,
        });
        console.log(`Created Product: ${prodData.name}`);
      } else {
        prodDoc.category = catDoc._id;
        prodDoc.categoryName = catDoc.name;
        if (!prodDoc.images || prodDoc.images.length === 0) {
          prodDoc.images = prodData.images;
        }
        await prodDoc.save();
        console.log(`Updated Product: ${prodDoc.name}`);
      }
    }

    await mongoose.disconnect();
    console.log("Catalog seeding finished successfully.");
    process.exit(0);
  } catch (err) {
    console.error(`Catalog seeding error: ${err.message}`);
    process.exit(1);
  }
};

seedCatalog();
