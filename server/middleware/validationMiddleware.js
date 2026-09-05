import { ApiError } from "../utils/ApiError.js";

export const validateRequest = (schema) => (req, res, next) => {
  if (!schema) return next();
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorDetails = error.details.map((d) => d.message);
    return next(new ApiError(400, "Validation Error", errorDetails));
  }
  next();
};
