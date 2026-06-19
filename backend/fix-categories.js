import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/categoryModel.js";

dotenv.config();

console.log("=== FIXING CATEGORIES ===");

const fixCategories = async () => {
  try {
    console.log("\n1. Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");

    console.log("\n2. Deleting all existing categories...");
    await Category.deleteMany({});
    console.log("✅ All categories deleted!");

    console.log("\n3. Creating default categories...");
    const defaultCategories = ['Bottles', 'Jars', 'Caps', 'Preforms'];
    
    for (const catName of defaultCategories) {
      await Category.create({ name: catName });
      console.log(`✅ Created category: ${catName}`);
    }

    console.log("\n4. Verifying categories...");
    const categories = await Category.find().sort({ name: 1 });
    console.log("\nFinal categories in database:");
    categories.forEach(cat => console.log(`  - ${cat.name}`));

    console.log("\n=== CATEGORIES FIXED SUCCESSFULLY ===");
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

fixCategories();
