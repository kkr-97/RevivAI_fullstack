import { Model } from "mongoose";
import JournalSchema from "../schemas/JournalSchema";

export default new Model("journal", JournalSchema);
