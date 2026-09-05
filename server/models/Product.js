import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    shortDescription: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category reference is required"],
      index: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, default: "" },
      },
    ],
    sizes: [{ type: String }],
    materials: {
      type: String,
      default: "",
    },
    dimensions: {
      type: String,
      default: "",
    },
    care: {
      type: String,
      default: "",
    },
    colors: [{ type: String }],
    stock: {
      type: Number,
      required: true,
      default: 10,
      min: [0, "Stock cannot be negative"],
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    badge: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);

productSchema.index({ name: "text", description: "text" });

export const Product = mongoose.model("Product", productSchema);
