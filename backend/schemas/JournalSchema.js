import mongoose, { Schema } from "mongoose";

export default new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  date: { type: String, required: true },
  mood: { type: String, required: true },
  dayType: { type: String, required: true },
  journal: { type: String, required: true },
  emotions: {
    positiveScore: { type: Number },
    negativeScore: { type: Number },
  },
  createdAt: { type: Date, default: Date.now },
});
