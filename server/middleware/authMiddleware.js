import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { ApiError } from "../utils/ApiError.js";

export const protectAdmin = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ApiError(401, "Not authorized, token missing"));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret"
    );

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return next(new ApiError(401, "Not authorized, admin user not found"));
    }

    req.admin = admin;
    next();
  } catch (error) {
    return next(new ApiError(401, "Not authorized, invalid or expired token"));
  }
};
