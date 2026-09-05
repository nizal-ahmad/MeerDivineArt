import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} from "../controllers/categoryController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Protected Admin Category Endpoints
router.post("/", protectAdmin, upload.single("image"), createCategory);
router.put("/:id", protectAdmin, upload.single("image"), updateCategory);
router.delete("/:id", protectAdmin, deleteCategory);
router.patch("/:id/status", protectAdmin, toggleCategoryStatus);

export default router;
