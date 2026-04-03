import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conn succ");
  } catch (err) {
    console.log(`Error:${err.message}`);
  }
};

export default connectDB;
