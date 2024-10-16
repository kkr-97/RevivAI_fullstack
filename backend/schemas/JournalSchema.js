import mongoose, { Schema } from "mongoose";

const JournalSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  date: { type: String, required: true },
  dayType: { type: String, required: true },
  journal: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  emotions: {
    label: { type: String, required: true },
    score: { type: Number, required: true },
    summary: { type: String },
  },
});
export default JournalSchema;
