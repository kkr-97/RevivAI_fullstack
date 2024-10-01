import { model } from "mongoose";
import UserSchema from "../schemas/UserSchema.js";

const UserModel = new model("user", UserSchema);

export default UserModel;
