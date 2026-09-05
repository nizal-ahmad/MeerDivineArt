import { Admin } from "../models/Admin.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/generateToken.js";

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError(400, "Please provide email and password"));
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) {
    return next(new ApiError(401, "Invalid email or password"));
  }

  const isMatch = await admin.matchPassword(password);
  if (!isMatch) {
    return next(new ApiError(401, "Invalid email or password"));
  }

  const token = generateToken({ id: admin._id, email: admin.email });

  res.status(200).json({
    success: true,
    message: "Admin login successful",
    data: {
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    },
  });
});

// @desc    Get logged in admin profile
// @route   GET /api/auth/me
// @access  Private (Admin)
export const getAdminProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      id: req.admin._id,
      email: req.admin.email,
    },
  });
});

// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Private (Admin)
export const logoutAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
