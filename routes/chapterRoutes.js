import { Router } from "express";
const router = Router();

import {
  getChapters,
  getChapterById,
  uploadChapters,
} from "../controllers/chapterController.js";

import upload from "../middlewares/upload.js";

router.get("/", getChapters);
router.get("/:id", getChapterById);
router.post("/", upload.single("file"), uploadChapters); // Use .single here

export default router;
