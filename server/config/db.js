import mongoose from "mongoose";
import dns from "node:dns";

if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

export const connectDB = async () => {
  const mongoUri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/meerdivineart";

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    if (error.message.includes("querySrv") && mongoUri.includes("mongodb+srv://")) {
      console.log("SRV DNS resolution blocked on local network. Retrying with direct cluster host string...");
      const match = mongoUri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)(\/.*)?/);
      if (match) {
        try {
          const [, user, pass, , rest] = match;
          const dbAndQuery = rest || "/meer_divine_art";
          const cleanDb = dbAndQuery.split("?")[0] || "/meer_divine_art";
          const directUri = `mongodb://${user}:${pass}@ac-yl4kzkg-shard-00-00.awl4fa6.mongodb.net:27017,ac-yl4kzkg-shard-00-01.awl4fa6.mongodb.net:27017,ac-yl4kzkg-shard-00-02.awl4fa6.mongodb.net:27017${cleanDb}?ssl=true&authSource=admin&retryWrites=true&w=majority`;
          const conn = await mongoose.connect(directUri, { serverSelectionTimeoutMS: 10000 });
          console.log(`MongoDB Connected (via direct shard cluster): ${conn.connection.host}`);
          return conn;
        } catch (directErr) {
          console.error(`MongoDB Connection Error: ${directErr.message}`);
        }
      }
    } else {
      console.error(`MongoDB Connection Error: ${error.message}`);
    }
  }
};
