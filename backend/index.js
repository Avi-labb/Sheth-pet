import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

import connectDB from "./db/mongoose.js";
import adminRoutes from "./routes/adminRoute.js";
import productRouter from "./routes/productRoute.js";
import blogRouter from "./routes/blogRoute.js";
import careerRouter from "./routes/careerRoute.js";
import contactRouter from "./routes/contactRoute.js";
import { initSmtp } from "./utils/Mail.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log("📁 Created missing uploads/ directory at:", uploadsPath);
}
app.use("/uploads", express.static(uploadsPath));

const dbPromise = connectDB();

app.use("/api/admin", adminRoutes);
app.use("/api/products", productRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/careers", careerRouter);
app.use("/api/contact", contactRouter);

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

app.get("/test", (req, res) => {
  res.json({ message: "Test route working!" });
});

const distPath = path.join(__dirname, "dist");
const indexHtmlPath = path.join(distPath, "index.html");
const distExists = fs.existsSync(distPath);
const indexExists = fs.existsSync(indexHtmlPath);

console.log("\n========================================");
console.log("📦 Deployment Artifacts:");
console.log("   distPath:     ", distPath);
console.log("   dist/ exists: ", distExists ? "✅ yes" : "❌ NO — client/dist build is missing!");
console.log("   index.html:   ", indexExists ? "✅ yes" : "❌ NO — run: cd client && npm run build && cp -r dist/* ../backend/dist/");
console.log("   uploads/:      ", uploadsPath, fs.existsSync(uploadsPath) ? "✅" : "created");
console.log("========================================\n");

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    ts: new Date().toISOString(),
    mongo: mongoose.connection.readyState === 1 ? "connected" : "connecting",
    dist: fs.existsSync(indexHtmlPath),
  });
});

if (distExists && indexExists) {
  app.use(express.static(distPath, {
    fallthrough: true,
    maxAge: "1y",
    setHeaders: (res, filePath) => {
      if (path.basename(filePath) === "index.html") {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      }
    },
  }));
}

const FALLBACK_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Sheth PET — Deploying…</title>
    <style>
      body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#050506;color:#e4e4e7;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
      .c{max-width:520px;border:1px solid #262626;border-radius:16px;padding:28px;background:#0a0a0b}
      h1{font-size:18px;margin:0 0 8px;color:#fff}
      p{margin:8px 0;font-size:14px;line-height:1.6;color:#a1a1aa}
      code{background:#171717;border:1px solid #262626;border-radius:6px;padding:2px 6px;font-size:12px;color:#f4f4f5}
      .b{margin-top:16px;padding:12px 14px;border-left:3px solid #ef4444;border-radius:6px;background:rgba(239,68,68,.06);color:#fca5a5;font-size:13px}
    </style>
  </head>
  <body>
    <div class="c">
      <h1>🔧 Frontend build is not deployed yet.</h1>
      <p>The Express server is running, but the React production build was not uploaded alongside it.</p>
      <p>Run locally, commit the <code>backend/dist/</code> folder, then re-deploy to Hostinger VPS:</p>
      <p><code>cd client && npm.cmd run build ; Remove-Item -Recurse -Force ../backend/dist ; Copy-Item -Recurse dist ../backend/dist</code></p>
      <div class="b">If you just triggered a fresh deploy: the page will auto-refresh in 10 seconds once the bundle is live.</div>
    </div>
    <script>setTimeout(()=>location.reload(),10000);</script>
  </body>
</html>`;

let cachedIndexHtml = null;
let cachedIndexHtmlMtime = 0;

function loadIndexHtml() {
  try {
    if (!fs.existsSync(indexHtmlPath)) {
      return null;
    }
    const stat = fs.statSync(indexHtmlPath);
    if (cachedIndexHtml !== null && stat.mtimeMs === cachedIndexHtmlMtime) {
      return cachedIndexHtml;
    }
    cachedIndexHtml = fs.readFileSync(indexHtmlPath, "utf8");
    cachedIndexHtmlMtime = stat.mtimeMs;
    return cachedIndexHtml;
  } catch (_err) {
    return null;
  }
}

const ASSET_EXT_RE = /\.(?:css|js|json|png|jpe?g|gif|svg|ico|webp|bmp|woff2?|ttf|eot|otf|mp4|webm|mp3|wav|ogg|pdf|zip|rar|7z|tar|gz|map|wasm|mjs|cjs)$/i;

app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return next();
  }

  if (req.path.startsWith("/api/") || req.path.startsWith("/uploads/")) {
    return res.status(404).json({ success: false, message: "Not Found", path: req.path });
  }

  if (ASSET_EXT_RE.test(req.path)) {
    return res.status(404).type("text/plain").send("Not Found");
  }

  const accept = req.headers.accept || "";
  const wantsHtml = accept.includes("text/html") || !accept;
  if (!wantsHtml) {
    return res.status(404).json({ success: false, message: "Not Found", path: req.path });
  }

  const html = loadIndexHtml();
  if (html !== null) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    return res.status(200).type("html").send(html);
  }

  res.status(200).type("html").send(FALLBACK_HTML);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log("\n========================================");
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`   Local:    http://localhost:${PORT}`);
  console.log(`   API Base: http://localhost:${PORT}/api`);
  console.log(`   Health:   http://localhost:${PORT}/api/health`);
  console.log("========================================\n");
  try {
    await dbPromise;
  } catch (_) {
    process.exit(1);
  }
  initSmtp().catch(() => {});
});
