import dotenv from "dotenv";
import mongoose from "mongoose";
import { Product } from "../models/Product.js";

dotenv.config();

const clearCatalog = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("MONGODB_URI is not defined in .env file.");
      process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB...");
    
    const result = await Product.deleteMany({});
    console.log(`✓ Cleared database: Successfully removed ${result.deletedCount} products.`);
    
    process.exit(0);
  } catch (err) {
    console.error("Error clearing products from database:", err);
    process.exit(1);
  }
};

clearCatalog();
