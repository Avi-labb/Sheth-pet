import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne({
      email: "avidevelop60@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@098",
      10
    );

    await Admin.create({
      email: "avidevelop60@gmail.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin()