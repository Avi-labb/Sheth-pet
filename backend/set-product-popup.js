import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModule.js";

dotenv.config();

const setProductPopup = async () => {
  try {
    console.log("[DB] Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[DB] Connected!");

    // Get the first product
    const products = await Product.find().sort({ createdAt: -1 }).limit(1);
    if (products.length > 0) {
      const product = products[0];
      console.log(`[DB] Updating product: ${product.name} (ID: ${product._id})`);
      
      product.showInPopup = true;
      await product.save();
      
      console.log(`[DB] Product updated successfully! showInPopup = ${product.showInPopup}`);
    } else {
      console.log("[DB] No products found!");
    }

    console.log("\nDisconnecting from DB...");
    await mongoose.disconnect();
    console.log("[DB] Disconnected!");
  } catch (error) {
    console.error("ERROR:", error);
    process.exit(1);
  }
};

setProductPopup();
