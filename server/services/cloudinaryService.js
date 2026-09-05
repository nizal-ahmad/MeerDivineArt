import { cloudinary } from "../config/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

export const uploadToCloudinary = (fileBuffer, folder = "meer_divine_art/products") => {
  return new Promise((resolve, reject) => {
    // If Cloudinary credentials are mock or missing, fallback to Data URL format gracefully for local testing
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUDINARY_CLOUD_NAME === "demo_cloud" ||
      !process.env.CLOUDINARY_API_KEY ||
      process.env.CLOUDINARY_API_KEY === "1234567890"
    ) {
      const base64 = fileBuffer.toString("base64");
      const dataUrl = `data:image/jpeg;base64,${base64}`;
      return resolve({
        url: dataUrl,
        public_id: `local_temp_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) {
          return reject(new ApiError(500, `Cloudinary upload failed: ${error.message}`));
        }
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const removeFromCloudinary = async (public_id) => {
  if (!public_id || public_id.startsWith("local_temp_")) return;
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (err) {
    console.error(`Failed to delete Cloudinary image: ${err.message}`);
  }
};
