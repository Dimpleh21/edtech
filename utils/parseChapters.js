import { readFileSync } from "fs";
import Chapter from "../models/chapter.js";

async function parseAndUploadChapters(filePath) {
  try {
    const data = readFileSync(filePath, "utf8");
    const chapters = JSON.parse(data);

    const failedUploads = [];

    for (const chapterData of chapters) {
      try {
        const chapter = new Chapter({
          subject: chapterData.subject,
          chapter: chapterData.chapter,
          class: chapterData.class,
          unit: chapterData.unit,
          yearWiseQuestionCount: chapterData.yearWiseQuestionCount,
          questionSolved: chapterData.questionSolved,
          status: chapterData.status,
          isWeakChapter: chapterData.isWeakChapter,
        });
        await chapter.save();
      } catch (err) {
        failedUploads.push({ error: err.message, data: chapterData });
      }
    }

    return failedUploads;
  } catch (error) {
    throw new Error("Failed to parse file: " + error.message);
  }
}

export default { parseAndUploadChapters };
