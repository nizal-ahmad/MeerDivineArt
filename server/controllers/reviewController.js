import { Product } from "../models/Product.js";
import { Review } from "../models/Review.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: reviews,
  });
});

// @desc    Create review for product
// @route   POST /api/reviews
// @access  Public
export const createReview = asyncHandler(async (req, res, next) => {
  const { productId, name, rating, comment } = req.body;

  if (!productId || !name || !rating || !comment) {
    return next(new ApiError(400, "Please provide productId, name, rating, and comment"));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  const review = await Review.create({
    product: productId,
    name,
    rating: Number(rating),
    comment,
  });

  // Recalculate average rating & count
  const reviewsList = await Review.find({ product: productId });
  const totalRating = reviewsList.reduce((acc, item) => acc + item.rating, 0);
  product.reviews = reviewsList.length;
  product.rating = Number((totalRating / reviewsList.length).toFixed(1));
  await product.save();

  res.status(201).json({
    success: true,
    message: "Review submitted successfully",
    data: review,
  });
});
