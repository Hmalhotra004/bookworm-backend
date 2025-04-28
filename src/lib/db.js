import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Databse connected: ${conn.connection.host}`);
  } catch (e) {
    console.log("Error connecting to MongoDB", e);
    process.exit(1);
  }
};
