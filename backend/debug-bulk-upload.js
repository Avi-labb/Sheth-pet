
import dotenv from "dotenv";
import connectDB from "./db/mongoose.js";
import Product from "./models/productModule.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
connectDB();

console.log("🔍 Bulk Upload Debug Script");
console.log("-----------------------------");

// Step 1: Check uploads directory
const uploadsDir = path.join(__dirname, "uploads");
console.log("\n1️⃣ Checking uploads directory...");
console.log(`   Uploads path: ${uploadsDir}`);

try {
  const files = fs.readdirSync(uploadsDir);
  console.log(`   Total files in uploads: ${files.length}`);
  console.log("   Files:");
  files.forEach(file => {
    const stats = fs.statSync(path.join(uploadsDir, file));
    console.log(`      - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  });
} catch (error) {
  console.error("   Error reading uploads directory:", error.message);
}

// Step 2: Check products in database
console.log("\n2️⃣ Checking products in database...");
Product.find().sort({ createdAt: -1 }).then(products => {
  console.log(`   Total products: ${products.length}`);
  
  products.forEach(product => {
    console.log(`
      Product: ${product.name}
      ID: ${product._id}
      SKU: ${product.sku || 'N/A'}
      Category: ${product.category}
      Image: ${product.image || 'NO IMAGE'}
      Has image file? ${product.image && fs.existsSync(path.join(uploadsDir, product.image)) ? '✅ YES' : '❌ NO'}
    `);
  });

  console.log("\n✅ Debug complete!");
  process.exit(0);
}).catch(err => {
  console.error("❌ Error fetching products:", err);
  process.exit(1);
});
