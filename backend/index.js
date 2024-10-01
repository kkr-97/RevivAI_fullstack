import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

import UserModel from "./models/UserModel.js";

const app = express();
configDotenv();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3002;

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Database Connected!"))
    .catch((e) => console.error("Error: ", e));
};

app.listen(port, () => {
  connectDB();
  console.log(`Server is Running on ${port} port`);
});
