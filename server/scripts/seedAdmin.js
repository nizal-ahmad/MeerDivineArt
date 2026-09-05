import dotenv from "dotenv";
import mongoose from "mongoose";
import { Admin } from "../models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("MONGODB_URI not found in .env");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for admin seeding...");

    const email = (process.env.ADMIN_EMAIL || "admin@meerdivineart.com").toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD || "AdminPassword123!";

    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      const existingAdmin = await Admin.findOne();
      existingAdmin.email = email;
      existingAdmin.password = password; // pre-save hook will hash it automatically
      await existingAdmin.save();
      console.log(`Single Admin account updated: ${email}`);
    } else {
      await Admin.create({ email, password });
      console.log(`Single Admin account created successfully: ${email}`);
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
