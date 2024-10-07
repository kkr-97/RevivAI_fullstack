import mongoose, { Schema } from "mongoose";

export default new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  date: { type: String, required: true },
  dayType: { type: String, required: true },
  journal: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  emotions: {
    positiveScore: { type: Number },
    negativeScore: { type: Number },
    aiAssessment: { type: String },
    // aiResponse: { type: String },
    trimmedJournal: { type: String },
  },
});
