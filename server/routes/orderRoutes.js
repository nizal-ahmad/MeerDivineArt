import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createOrder); // Public checkout

// Protected Admin Order Endpoints
router.get("/", protectAdmin, getOrders);
router.get("/:id", protectAdmin, getOrderById);
router.patch("/:id/status", protectAdmin, updateOrderStatus);

export default router;
