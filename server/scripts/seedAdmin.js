import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns";
import { Admin } from "../models/Admin.js";

dotenv.config();

if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

const connectToMongo = async (rawUri) => {
  try {
    return await mongoose.connect(rawUri, { serverSelectionTimeoutMS: 10000 });
  } catch (error) {
    if (error.message.includes("querySrv") && rawUri.includes("mongodb+srv://")) {
      console.log("SRV DNS resolution blocked on local network. Retrying with direct cluster host string...");
      const match = rawUri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)(\/.*)?/);
      if (match) {
        const [, user, pass, , rest] = match;
        const dbAndQuery = rest || "/meer_divine_art";
        const cleanDb = dbAndQuery.split("?")[0] || "/meer_divine_art";
        const directUri = `mongodb://${user}:${pass}@ac-yl4kzkg-shard-00-00.awl4fa6.mongodb.net:27017,ac-yl4kzkg-shard-00-01.awl4fa6.mongodb.net:27017,ac-yl4kzkg-shard-00-02.awl4fa6.mongodb.net:27017${cleanDb}?ssl=true&authSource=admin&retryWrites=true&w=majority`;
        return await mongoose.connect(directUri, { serverSelectionTimeoutMS: 10000 });
      }
    }
    throw error;
  }
};

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("MONGODB_URI not found in .env");
      process.exit(1);
    }

    await connectToMongo(mongoUri);
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
