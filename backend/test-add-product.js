import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModule.js";

dotenv.config();

const testAddProduct = async () => {
  try {
    console.log("[DB] Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[DB] Connected!");

    // First, let's see what's already there
    const existingProducts = await Product.find();
    console.log(`\n[DB] Found ${existingProducts.length} existing products`);

    // Create a test product with a sample image filename
    const testProductData = {
      name: "Test Product - Manual Add",
      sku: "TEST-MANUAL-001",
      category: "Bottles",
      color: "Clear",
      size: "1L",
      moqPackaging: "500",
      capType: "Screw Cap",
      usage: "Beverages",
      keySpecs: "Test product for debugging image display",
      image: "1782104235856-500ml-pharma-pet-bottle.jpg.png" // Use an existing file from uploads
    };

    console.log("\n[DB] Creating test product:", testProductData);
    const newProduct = await Product.create(testProductData);
    console.log("\n[DB] Test product created successfully!");
    console.log("New product data:", newProduct);

    console.log("\nDisconnecting from DB...");
    await mongoose.disconnect();
    console.log("[DB] Disconnected!");

  } catch (error) {
    console.error("ERROR:", error);
    process.exit(1);
  }
};

testAddProduct();
