import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db/mongoose.js";

import adminRoutes from "./routes/adminRoute.js";
import productRouter from "./routes/productRoute.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRouter);

app.get("/test", (req, res) => {
  res.json({ message: "Test route working!" });
});

// React Build
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
