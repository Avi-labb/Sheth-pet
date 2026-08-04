import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  filePath,
  folder = "sheth-pet/products",
  options = {}
) => {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`[Cloudinary] File not found: ${filePath}`);
      return null;
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      resource_type: "auto",
      ...options,
    });

    console.log(`[Cloudinary] Uploaded: ${result.secure_url}`);

    try {
      fs.unlinkSync(filePath);
      console.log(`[Cloudinary] Cleaned up local file: ${filePath}`);
    } catch (_cleanupError) {
      console.warn(`[Cloudinary] Could not delete local file: ${filePath}`);
    }

    return {
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error) {
    console.error("[Cloudinary] Upload error:", error.message);
    return null;
  }
};

export const uploadBufferToCloudinary = async (
  buffer,
  folder = "sheth-pet/products",
  options = {}
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        use_filename: true,
        unique_filename: true,
        overwrite: false,
        resource_type: "auto",
        ...options,
      },
      (error, result) => {
        if (error) {
          console.error("[Cloudinary] Stream upload error:", error.message);
          reject(error);
        } else {
          console.log(`[Cloudinary] Stream uploaded: ${result.secure_url}`);
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
          });
        }
      }
    );
    uploadStream.end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return false;
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`[Cloudinary] Deleted ${publicId}:`, result.result);
    return result.result === "ok";
  } catch (error) {
    console.error("[Cloudinary] Delete error:", error.message);
    return false;
  }
};

export const isCloudinaryUrl = (url) => {
  return typeof url === "string" && url.includes("res.cloudinary.com");
};

export default cloudinary;
