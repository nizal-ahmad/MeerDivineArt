import { Category } from "../models/Category.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Get Admin Dashboard Overview Metrics
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
export const getDashboardOverview = asyncHandler(async (req, res) => {
  // Aggregate KPI Cards
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ orderStatus: "pending" });
  const completedOrders = await Order.countDocuments({ orderStatus: "delivered" });

  const totalRevenueAggregate = await Order.aggregate([
    { $match: { orderStatus: { $ne: "cancelled" } } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);
  const totalRevenue = totalRevenueAggregate.length > 0 ? totalRevenueAggregate[0].total : 0;

  // Unique customers based on unique phone or email in orders
  const uniqueCustomersAggregate = await Order.distinct("customer.phone");
  const uniqueCustomersCount = uniqueCustomersAggregate.length;

  // Recent 5 orders
  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("orderNumber customer totalAmount orderStatus paymentStatus createdAt");

  res.status(200).json({
    success: true,
    data: {
      metrics: {
        totalRevenue,
        totalOrders,
        totalProducts,
        uniqueCustomers: uniqueCustomersCount,
        pendingOrders,
        completedOrders,
      },
      recentOrders,
    },
  });
});

// @desc    Get Analytics for Recharts
// @route   GET /api/admin/analytics
// @access  Private (Admin)
export const getAnalytics = asyncHandler(async (req, res) => {
  const { range } = req.query; // 'today', '7days', '30days', '6months', 'year'

  let startDate = new Date();
  if (range === "today") {
    startDate.setHours(0, 0, 0, 0);
  } else if (range === "7days") {
    startDate.setDate(startDate.getDate() - 7);
  } else if (range === "6months") {
    startDate.setMonth(startDate.getMonth() - 6);
  } else if (range === "year") {
    startDate.setFullYear(startDate.getFullYear() - 1);
  } else {
    // Default 30 days
    startDate.setDate(startDate.getDate() - 30);
  }

  // Sales & Orders over time
  const salesOverTime = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate },
        orderStatus: { $ne: "cancelled" },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        revenue: { $sum: "$totalAmount" },
        orders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Format chart data
  const chartData = salesOverTime.map((item) => ({
    date: item._id,
    revenue: item.revenue,
    orders: item.orders,
  }));

  // Best selling products (by item count in orders)
  const bestSellingProductsAggregate = await Order.aggregate([
    { $match: { orderStatus: { $ne: "cancelled" } } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.name",
        quantitySold: { $sum: "$items.quantity" },
        totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
      },
    },
    { $sort: { quantitySold: -1 } },
    { $limit: 5 },
  ]);

  // Category Performance
  const categoryDocs = await Category.find();
  const categoryPerformance = await Promise.all(
    categoryDocs.map(async (cat) => {
      const count = await Product.countDocuments({ category: cat._id });
      return {
        name: cat.name,
        productsCount: count,
      };
    })
  );

  res.status(200).json({
    success: true,
    data: {
      salesChart: chartData,
      bestSellingProducts: bestSellingProductsAggregate,
      categoryPerformance,
    },
  });
});
