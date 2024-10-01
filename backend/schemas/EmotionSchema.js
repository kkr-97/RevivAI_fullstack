import mongoose, { Schema } from "mongoose";

export default new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  date: { type: String, required: true },
  trimmedJournal: { type: String },
  aiResponse: { type: String },
  aiAssessment: { type: String },
});
