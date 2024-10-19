import { Schema } from "mongoose";

const JournalSchema = new Schema({
  userId: { type: String, ref: "user", required: true },
  date: { type: Date, required: true },
  dayType: { type: String, required: true },
  journal: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  emotions: {
    positive: { type: Number, required: true },
    neutral: { type: Number, required: true },
    negative: { type: Number, required: true },
    aiFeedback: { type: String, required: true },
    summary: { type: String },
  },
});
export default JournalSchema;
