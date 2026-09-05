import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Create new order (Customer Checkout)
// @route   POST /api/orders
// @access  Public
export const createOrder = asyncHandler(async (req, res, next) => {
  const { customer, items, paymentMethod } = req.body;

  if (!customer || !customer.name || !customer.phone || !customer.address || !customer.city) {
    return next(new ApiError(400, "Please provide complete customer details (Name, Phone, Address, City)"));
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(new ApiError(400, "Order must contain at least one item"));
  }

  let totalAmount = 0;
  const processedItems = [];

  for (const item of items) {
    let productDoc;
    if (item.productId && item.productId.match(/^[0-9a-fA-F]{24}$/)) {
      productDoc = await Product.findById(item.productId);
    } else if (item.productId) {
      productDoc = await Product.findOne({ slug: item.productId });
    }

    const price = productDoc ? productDoc.price : item.price || 0;
    const name = productDoc ? productDoc.name : item.name || "Custom Frame";
    const image = productDoc && productDoc.images && productDoc.images[0] ? productDoc.images[0].url : "";

    const itemTotal = price * (item.quantity || 1);
    totalAmount += itemTotal;

    processedItems.push({
      product: productDoc ? productDoc._id : null,
      name,
      quantity: item.quantity || 1,
      price,
      size: item.size || "",
      frameColor: item.frameColor || "",
      image,
    });

    // Reduce stock if product exists
    if (productDoc && productDoc.stock >= (item.quantity || 1)) {
      productDoc.stock -= item.quantity || 1;
      await productDoc.save();
    }
  }

  const orderNumber = `MDA-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  const order = await Order.create({
    orderNumber,
    customer,
    items: processedItems,
    totalAmount,
    orderStatus: "pending",
    paymentStatus: "pending",
    paymentMethod: paymentMethod || "Cash on Delivery",
  });

  res.status(201).json({
    success: true,
    message: "Order placed successfully!",
    data: order,
  });
});

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private (Admin)
export const getOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  const { status, paymentStatus, search } = req.query;
  const filter = {};

  if (status && status !== "all") filter.orderStatus = status;
  if (paymentStatus && paymentStatus !== "all") filter.paymentStatus = paymentStatus;

  if (search) {
    const regex = new RegExp(search.trim(), "i");
    filter.$or = [
      { orderNumber: regex },
      { "customer.name": regex },
      { "customer.email": regex },
      { "customer.phone": regex },
      { "customer.city": regex },
    ];
  }

  const total = await Order.countDocuments(filter);
  const orders = await Order.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: {
      orders,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

// @desc    Get order details by ID
// @route   GET /api/orders/:id
// @access  Private (Admin)
export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError(404, "Order not found"));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Private (Admin)
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { orderStatus, paymentStatus } = req.body;

  const order = await Order.findById(id);
  if (!order) {
    return next(new ApiError(404, "Order not found"));
  }

  if (orderStatus) {
    const validStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(orderStatus)) {
      return next(new ApiError(400, "Invalid order status"));
    }
    order.orderStatus = orderStatus;
  }

  if (paymentStatus) {
    const validPaymentStatuses = ["pending", "paid", "failed", "refunded"];
    if (!validPaymentStatuses.includes(paymentStatus)) {
      return next(new ApiError(400, "Invalid payment status"));
    }
    order.paymentStatus = paymentStatus;
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
});
