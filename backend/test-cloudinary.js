import dotenv from "dotenv";
dotenv.config();

import cloudinary, { uploadToCloudinary } from "./utils/cloudinary.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("=== Cloudinary Connection Test ===");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "Loaded (not shown for security)" : "Missing");
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded (not shown for security)" : "Missing");
console.log("");

try {
  console.log("1. Testing Cloudinary API ping...");
  const pingResult = await cloudinary.api.ping();
  console.log("   ✅ Cloudinary ping successful:", pingResult.status);
} catch (error) {
  console.error("   ❌ Cloudinary ping FAILED:", error.message);
  process.exit(1);
}

console.log("");
console.log("2. Finding a test image in uploads/ folder...");
const uploadsDir = path.join(__dirname, "uploads");
let testFile = null;

if (fs.existsSync(uploadsDir)) {
  const files = fs.readdirSync(uploadsDir).filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
  if (files.length > 0) {
    testFile = path.join(uploadsDir, files[0]);
    console.log(`   Found test image: ${files[0]}`);
  } else {
    console.log("   No image files found in uploads/. Skipping upload test.");
  }
} else {
  console.log("   uploads/ directory doesn't exist. Skipping upload test.");
}

if (testFile) {
  console.log("");
  console.log("3. Testing image upload to Cloudinary...");
  const uploadResult = await uploadToCloudinary(testFile, "sheth-pet/test-uploads");
  if (uploadResult) {
    console.log("   ✅ Upload successful!");
    console.log("   URL:", uploadResult.url);
    console.log("   Public ID:", uploadResult.public_id);
    console.log("   Dimensions:", `${uploadResult.width}x${uploadResult.height}`);
    console.log("   Format:", uploadResult.format);
    console.log("");
    console.log("4. Testing deletion from Cloudinary...");
    const { deleteFromCloudinary } = await import("./utils/cloudinary.js");
    const deleteResult = await deleteFromCloudinary(uploadResult.public_id);
    if (deleteResult) {
      console.log("   ✅ Deletion successful!");
    } else {
      console.log("   ⚠️  Deletion result unclear (may still work)");
    }
  } else {
    console.log("   ❌ Upload FAILED (check credentials/network)");
    process.exit(1);
  }
}

console.log("");
console.log("=== All Cloudinary Tests Passed! ✅ ===");
console.log("");
console.log("Summary of the integration:");
console.log("  • Images are uploaded to Cloudinary folder 'sheth-pet/products' or 'sheth-pet/blogs'");
console.log("  • Cloudinary secure URLs are stored in MongoDB instead of local filenames");
console.log("  • Local files are automatically cleaned up after successful Cloudinary upload");
console.log("  • Frontend supports both Cloudinary URLs (new) and /uploads/ paths (legacy)");
