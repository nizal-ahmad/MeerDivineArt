import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { uploadToCloudinary, removeFromCloudinary } from "../services/cloudinaryService.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createSlug } from "../utils/slugify.js";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const { includeInactive } = req.query;
  const filter = includeInactive === "true" ? {} : { active: true };
  const categories = await Category.find(filter).sort({ name: 1 });

  // Get product count per category
  const categoriesWithCount = await Promise.all(
    categories.map(async (cat) => {
      const productCount = await Product.countDocuments({ category: cat._id });
      return {
        ...cat.toObject(),
        productCount,
      };
    })
  );

  res.status(200).json({
    success: true,
    data: categoriesWithCount,
  });
});

// @desc    Get single category by ID or Slug
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let category;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    category = await Category.findById(id);
  } else {
    category = await Category.findOne({ slug: id });
  }

  if (!category) {
    return next(new ApiError(404, "Category not found"));
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private (Admin)
export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, tagline, description } = req.body;

  if (!name) {
    return next(new ApiError(400, "Category name is required"));
  }

  let slug = createSlug(name);
  const existing = await Category.findOne({ slug });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  let imageObj = { url: "", public_id: "" };
  if (req.file) {
    imageObj = await uploadToCloudinary(req.file.buffer, "meer_divine_art/categories");
  }

  const category = await Category.create({
    name,
    slug,
    tagline: tagline || "",
    description: description || "",
    image: imageObj,
    active: req.body.active !== undefined ? req.body.active : true,
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, tagline, description, active } = req.body;

  let category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(404, "Category not found"));
  }

  if (name && name !== category.name) {
    category.name = name;
    let newSlug = createSlug(name);
    const existing = await Category.findOne({ slug: newSlug, _id: { $ne: id } });
    if (existing) {
      newSlug = `${newSlug}-${Date.now()}`;
    }
    category.slug = newSlug;
  }

  if (tagline !== undefined) category.tagline = tagline;
  if (description !== undefined) category.description = description;
  if (active !== undefined) category.active = active;

  if (req.file) {
    if (category.image && category.image.public_id) {
      await removeFromCloudinary(category.image.public_id);
    }
    category.image = await uploadToCloudinary(req.file.buffer, "meer_divine_art/categories");
  }

  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(404, "Category not found"));
  }

  // Check if products exist in category
  const productsCount = await Product.countDocuments({ category: id });
  if (productsCount > 0) {
    return next(
      new ApiError(
        400,
        `Cannot delete category containing ${productsCount} products. Move or delete products first.`
      )
    );
  }

  if (category.image && category.image.public_id) {
    await removeFromCloudinary(category.image.public_id);
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

// @desc    Toggle category status
// @route   PATCH /api/categories/:id/status
// @access  Private (Admin)
export const toggleCategoryStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(404, "Category not found"));
  }

  category.active = !category.active;
  await category.save();

  res.status(200).json({
    success: true,
    message: `Category ${category.active ? "activated" : "deactivated"} successfully`,
    data: category,
  });
});
