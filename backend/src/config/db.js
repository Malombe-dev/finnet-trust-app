import mongoose from "mongoose";

export let usingMemoryStore = false;

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    usingMemoryStore = true;
    console.log("⚠️  No MONGO_URI set — running on the in-memory data store.");
    return;
  }

  try {
    await mongoose.connect(uri);
    usingMemoryStore = false;
    console.log("Connected to MongoDB");
  } catch (err) {
    usingMemoryStore = true;
    console.error("MongoDB connection failed, falling back to in-memory store:", err.message);
  }
}
