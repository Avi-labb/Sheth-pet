import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModule.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const checkProducts = async () => {
  try {
    console.log("[DB] Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[DB] Connected!");

    console.log("\n========== ALL PRODUCTS ==========");
    const products = await Product.find().sort({ createdAt: -1 });
    
    if (products.length === 0) {
      console.log("No products found in DB!");
    } else {
      products.forEach((product, i) => {
        console.log(`\n[${i+1}] ${product.name} (ID: ${product._id})`);
        console.log(`  Image: "${product.image}"`);
        console.log(`  Created: ${product.createdAt}`);
        console.log(`  Show In Popup: ${product.showInPopup ? 'YES' : 'NO'}`);
        
        if (product.image) {
          const imagePath = path.join(__dirname, "uploads", product.image);
          const exists = fs.existsSync(imagePath);
          console.log(`  Image file exists in uploads: ${exists}`);
        }
      });
    }
    console.log("\n==================================");

    console.log("\nDisconnecting from DB...");
    await mongoose.disconnect();
    console.log("[DB] Disconnected!");
  } catch (error) {
    console.error("ERROR:", error);
    process.exit(1);
  }
};

checkProducts();
