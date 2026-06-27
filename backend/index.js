import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./db/mongoose.js";
import adminRoutes from "./routes/adminRoute.js";
import productRouter from "./routes/productRoute.js";
import blogRouter from "./routes/blogRoute.js";
import careerRouter from "./routes/careerRoute.js";

dotenv.config();

console.log("Starting application...");
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Missing");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "Missing");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect Database
connectDB();

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/careers", careerRouter);

// Global error handler - this will catch any errors from middleware or routes
app.use((error, req, res, next) => {
  console.error('\n❌ UNHANDLED ERROR ❌');
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  console.error('❌ END OF ERROR ❌\n');
  res.status(500).json({
    success: false,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
});

// Test Route
app.get("/test", (req, res) => {
  res.json({ message: "Test route working!" });
});

// React Build Path
const distPath = path.join(__dirname, "dist");

console.log("Dist Path:", distPath);

// Serve React Build
app.use(express.static(distPath));

// React Router Catch-All
app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;

console.log("About to start server...");

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});