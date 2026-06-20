import mongoose from "mongoose";
import dns from "dns";

try {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
} catch (error) {
  console.warn("Setting DNS servers failed:", error.message);
}

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected successfully"),
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
