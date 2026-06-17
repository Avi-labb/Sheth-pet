
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

console.log("=== ADMIN CREATION DEBUG ===");
console.log("1. Loading environment variables...");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ NOT LOADED");

const debugCreateAdmin = async () => {
  try {
    console.log("\n2. Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");

    console.log("\n3. Checking for existing admin...");
    const existingAdmin = await Admin.findOne({
      email: "avidevelop60@gmail.com",
    });

    if (existingAdmin) {
      console.log("ℹ️ Admin already exists with this email!");
      console.log("Admin data:", JSON.stringify(existingAdmin, null, 2));
      process.exit();
    }

    console.log("✅ No existing admin found, proceeding to create...");

    console.log("\n4. Hashing password...");
    const hashedPassword = await bcrypt.hash("Admin@098", 10);
    console.log("✅ Password hashed successfully!");

    console.log("\n5. Creating admin document...");
    const newAdmin = await Admin.create({
      email: "avidevelop60@gmail.com",
      password: hashedPassword,
    });
    console.log("✅ Admin created successfully!");
    console.log("New admin data:", JSON.stringify(newAdmin, null, 2));

    process.exit();
  } catch (error) {
    console.error("\n❌ ERROR OCCURRED!");
    console.error("Error type:", error.name);
    console.error("Error message:", error.message);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  }
};

debugCreateAdmin();
