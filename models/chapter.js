import { Schema, model } from "mongoose";

const chapterSchema = new Schema({
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  class: { type: String, required: true },
  unit: { type: String, required: true },
  yearWiseQuestionCount: {
    type: Map,
    of: Number,
    default: {},
  },
  questionSolved: { type: Number, default: 0 },
  status: { type: String, required: true },
  isWeakChapter: { type: Boolean, default: false },
});

export default model("Chapter", chapterSchema);
