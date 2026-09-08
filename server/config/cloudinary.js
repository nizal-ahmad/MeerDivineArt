// import { v2 as cloudinary } from "cloudinary";

// export const configureCloudinary = () => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
// };

// export { cloudinary };

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const configureCloudinary = () => {
  return (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_CLOUD_NAME !== "demo_cloud_name" &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_KEY !== "123456789012345" &&
    process.env.CLOUDINARY_API_SECRET
  );
};

if (configureCloudinary()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("Cloudinary SDK configured successfully.");
} else {
  console.log(
    "Cloudinary SDK running in fallback mode (Unsplash / Local placeholders enabled).",
  );
}

export { cloudinary, configureCloudinary };
