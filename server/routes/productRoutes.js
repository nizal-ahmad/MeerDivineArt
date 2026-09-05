import express from "express";
import {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  updateProductStock,
} from "../controllers/productController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getProductById);

// Protected Admin Product Endpoints
router.post("/", protectAdmin, upload.array("images", 10), createProduct);
router.put("/:id", protectAdmin, upload.array("images", 10), updateProduct);
router.delete("/:id", protectAdmin, deleteProduct);
router.patch("/:id/status", protectAdmin, toggleProductStatus);
router.patch("/:id/stock", protectAdmin, updateProductStock);

export default router;
