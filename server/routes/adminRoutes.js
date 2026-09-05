import express from "express";
import { getDashboardOverview, getAnalytics } from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protectAdmin, getDashboardOverview);
router.get("/analytics", protectAdmin, getAnalytics);

export default router;
