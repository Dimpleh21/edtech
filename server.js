import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";

import chapterRoutes from "./routes/chapterRoutes.js";
import rateLimiter from "./middlewares/rateLimiter.js"; // 🔹 new import

config();
const app = express();

app.use(cors());
app.use(json());

// 🔹 Apply rate limiter globally
app.use(rateLimiter);

// 🔹 Chapter route
app.use("/api/v1/chapters", chapterRoutes);

const PORT = process.env.PORT || 5000;

connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
