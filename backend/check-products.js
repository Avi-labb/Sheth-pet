import mongoose from "mongoose";
import Product from "./models/productModule.js";
import dotenv from "dotenv";

dotenv.config();

const checkProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/sheth");
    console.log("Connected to MongoDB!");

    const products = await Product.find();
    console.log(`Found ${products.length} products:`);
    products.forEach(product => {
      console.log(`- ${product.name} (SKU: ${product.sku})`);
      console.log(`  Market Segments: ${product.marketSegments ? product.marketSegments.join(", ") : "None"}`);
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
};

checkProducts();
