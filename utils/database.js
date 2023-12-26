import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already running!");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "users",
    });

    isConnected = true;
    console.log("MongoDB is connected!");
  } catch (error) {
    console.log(error);
  }
};
