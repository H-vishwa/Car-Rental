import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

const connectDB = async (retries = MAX_RETRIES) => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ Database connected successfully"),
    );
    mongoose.connection.on("error", (err) =>
      console.error("❌ MongoDB connection error:", err.message),
    );
    mongoose.connection.on("disconnected", () =>
      console.warn("⚠️  MongoDB disconnected. Attempting to reconnect..."),
    );

    await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`, {
      serverSelectionTimeoutMS: 10000, // fail fast instead of hanging
    });
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);

    if (retries > 0) {
      console.log(`🔄 Retrying connection... (${retries} attempts left)`);
      await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
      return connectDB(retries - 1);
    } else {
      console.error("💀 Could not connect to MongoDB after multiple retries. Exiting.");
      process.exit(1);
    }
  }
};

export default connectDB;


