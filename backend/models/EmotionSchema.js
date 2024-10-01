import { model } from "mongoose";
import EmotionSchema from "../schemas/EmotionSchema";

export default new model("emotion", EmotionSchema);
