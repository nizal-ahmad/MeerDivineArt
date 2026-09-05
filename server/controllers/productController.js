import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { uploadToCloudinary, removeFromCloudinary } from "../services/cloudinaryService.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createSlug } from "../utils/slugify.js";

// @desc    Get products with search, pagination, category & price filtering, sorting
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  const {
    category,
    search,
    minPrice,
    maxPrice,
    featured,
    active,
    isBestseller,
    isNew,
    sort,
    includeInactive,
  } = req.query;

  const filter = {};

  // Public users only see active products unless admin requests inactive
  if (includeInactive !== "true") {
    filter.active = true;
  } else if (active !== undefined) {
    filter.active = active === "true";
  }

  if (featured !== undefined) filter.featured = featured === "true";
  if (isBestseller !== undefined) filter.isBestseller = isBestseller === "true";
  if (isNew !== undefined) filter.isNew = isNew === "true";

  // Price filtering
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // Category filter by ID or slug
  if (category && category !== "all") {
    if (category.match(/^[0-9a-fA-F]{24}$/)) {
      filter.category = category;
    } else {
      const catDoc = await Category.findOne({ slug: category });
      if (catDoc) {
        filter.category = catDoc._id;
      } else {
        filter.categoryName = new RegExp(category, "i");
      }
    }
  }

  // Search filter
  if (search) {
    const regex = new RegExp(search.trim(), "i");
    filter.$or = [
      { name: regex },
      { description: regex },
      { categoryName: regex },
      { sku: regex },
    ];
  }

  // Sorting logic
  let sortOption = { createdAt: -1 };
  if (sort === "price-asc") sortOption = { price: 1 };
  if (sort === "price-desc") sortOption = { price: -1 };
  if (sort === "name") sortOption = { name: 1 };
  if (sort === "rating") sortOption = { rating: -1 };

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .populate("category", "name slug tagline")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: {
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let product;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    product = await Product.findById(id).populate("category", "name slug tagline");
  } else {
    product = await Product.findOne({ slug: id }).populate("category", "name slug tagline");
  }

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Get single product by Slug
// @route   GET /api/products/slug/:slug
// @access  Public
export const getProductBySlug = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate("category", "name slug tagline");
  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }
  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
export const createProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    shortDescription,
    price,
    discountPrice,
    category,
    sizes,
    materials,
    dimensions,
    care,
    colors,
    stock,
    sku,
    badge,
    featured,
    active,
    isBestseller,
    isNew,
  } = req.body;

  if (!name || !description || !price || !category) {
    return next(new ApiError(400, "Please provide name, description, price, and category"));
  }

  // Find category doc
  let categoryDoc;
  if (category.match(/^[0-9a-fA-F]{24}$/)) {
    categoryDoc = await Category.findById(category);
  } else {
    categoryDoc = await Category.findOne({ slug: category });
  }

  if (!categoryDoc) {
    return next(new ApiError(404, "Category not found"));
  }

  let slug = createSlug(name);
  const existingSlug = await Product.findOne({ slug });
  if (existingSlug) {
    slug = `${slug}-${Date.now()}`;
  }

  const generatedSku = sku || `SKU-${Date.now().toString().slice(-6)}`;

  // Handle uploaded images
  let images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const img = await uploadToCloudinary(file.buffer, "meer_divine_art/products");
      images.push(img);
    }
  }

  // Parse arrays if stringified JSON
  const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes || [];
  const parsedColors = typeof colors === "string" ? JSON.parse(colors) : colors || [];

  const product = await Product.create({
    name,
    slug,
    description,
    shortDescription: shortDescription || "",
    price: Number(price),
    discountPrice: discountPrice ? Number(discountPrice) : undefined,
    category: categoryDoc._id,
    categoryName: categoryDoc.name,
    images,
    sizes: parsedSizes,
    materials: materials || "",
    dimensions: dimensions || "",
    care: care || "",
    colors: parsedColors,
    stock: stock !== undefined ? Number(stock) : 10,
    sku: generatedSku,
    badge: badge || "",
    featured: featured === "true" || featured === true,
    active: active !== undefined ? (active === "true" || active === true) : true,
    isBestseller: isBestseller === "true" || isBestseller === true,
    isNew: isNew === "true" || isNew === true,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let product = await Product.findById(id);

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  const {
    name,
    description,
    shortDescription,
    price,
    discountPrice,
    category,
    sizes,
    materials,
    dimensions,
    care,
    colors,
    stock,
    sku,
    badge,
    featured,
    active,
    isBestseller,
    isNew,
    retainedImages,
  } = req.body;

  if (name && name !== product.name) {
    product.name = name;
    let newSlug = createSlug(name);
    const existingSlug = await Product.findOne({ slug: newSlug, _id: { $ne: id } });
    if (existingSlug) {
      newSlug = `${newSlug}-${Date.now()}`;
    }
    product.slug = newSlug;
  }

  if (category) {
    let catDoc;
    if (category.match(/^[0-9a-fA-F]{24}$/)) {
      catDoc = await Category.findById(category);
    } else {
      catDoc = await Category.findOne({ slug: category });
    }
    if (catDoc) {
      product.category = catDoc._id;
      product.categoryName = catDoc.name;
    }
  }

  if (description !== undefined) product.description = description;
  if (shortDescription !== undefined) product.shortDescription = shortDescription;
  if (price !== undefined) product.price = Number(price);
  if (discountPrice !== undefined) product.discountPrice = discountPrice ? Number(discountPrice) : undefined;
  if (materials !== undefined) product.materials = materials;
  if (dimensions !== undefined) product.dimensions = dimensions;
  if (care !== undefined) product.care = care;
  if (stock !== undefined) product.stock = Number(stock);
  if (sku !== undefined) product.sku = sku;
  if (badge !== undefined) product.badge = badge;
  if (featured !== undefined) product.featured = featured === "true" || featured === true;
  if (active !== undefined) product.active = active === "true" || active === true;
  if (isBestseller !== undefined) product.isBestseller = isBestseller === "true" || isBestseller === true;
  if (isNew !== undefined) product.isNew = isNew === "true" || isNew === true;

  if (sizes !== undefined) {
    product.sizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
  }
  if (colors !== undefined) {
    product.colors = typeof colors === "string" ? JSON.parse(colors) : colors;
  }

  // Manage image updates
  let currentImages = product.images;
  if (retainedImages) {
    const keepList = typeof retainedImages === "string" ? JSON.parse(retainedImages) : retainedImages;
    currentImages = product.images.filter((img) => keepList.includes(img.url));
  }

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const newImg = await uploadToCloudinary(file.buffer, "meer_divine_art/products");
      currentImages.push(newImg);
    }
  }
  product.images = currentImages;

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  // Delete images from Cloudinary
  for (const img of product.images) {
    if (img.public_id) {
      await removeFromCloudinary(img.public_id);
    }
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// @desc    Toggle product active status
// @route   PATCH /api/products/:id/status
// @access  Private (Admin)
export const toggleProductStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  product.active = !product.active;
  await product.save();

  res.status(200).json({
    success: true,
    message: `Product ${product.active ? "activated" : "deactivated"} successfully`,
    data: product,
  });
});

// @desc    Quick update product stock
// @route   PATCH /api/products/:id/stock
// @access  Private (Admin)
export const updateProductStock = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { stock } = req.body;

  if (stock === undefined || Number(stock) < 0) {
    return next(new ApiError(400, "Please provide a valid stock count"));
  }

  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  product.stock = Number(stock);
  await product.save();

  res.status(200).json({
    success: true,
    message: "Stock updated successfully",
    data: product,
  });
});
