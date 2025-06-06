import Chapter from "../models/chapter.js";
import { join } from "path";
import { unlinkSync } from "fs";
import parseAndUploadChapters from "../utils/parseChapters.js";
import redis from "../config/redis.js";
export async function getChapters(req, res) {
  try {
    const cached = await redis.get("chapters");
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

    const chapters = await Chapter.find();
    res.status(200).json(chapters);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chapters" });
  }
}

// GET chapter by ID
export async function getChapterById(req, res) {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ message: "Not found" });
    res.status(200).json(chapter);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving chapter" });
  }
}

// POST JSON file upload
export async function uploadChapters(req, res) {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const filePath = join(__dirname, "..", "uploads", req.file.filename);

  try {
    const failedUploads = await parseAndUploadChapters(filePath);
    unlinkSync(filePath); // optional: clean up file
    res.status(200).json({ message: "Chapters uploaded", failedUploads });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
