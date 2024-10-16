import { model } from "mongoose";
import JournalSchema from "../schemas/JournalSchema.js";

const JournalModel = new model("journal", JournalSchema);

export default JournalModel;
