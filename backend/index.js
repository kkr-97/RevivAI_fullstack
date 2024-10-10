import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

import UserModel from "./models/UserModel.js";

import sentimentAnalyze from "./operations/sentimentAnalyse.js";
import summarizeJournal from "./operations/summarizeJournal.js";

const app = express();
configDotenv();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3002;

app.post(
  "/register",
  [
    check("email", "Please Enter Valid Email").isEmail(),
    check("username", "Please enter username").not().isEmpty(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors[0].msg });
    }

    try {
      const { email, username, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User Already Exist!!" });
      }

      const salt = await bcrypt.genSalt(7);
      const hashedPass = await bcrypt.hash(password, salt);

      const newUser = new UserModel({
        email: email,
        username: username,
        passwordHash: hashedPass,
      });

      const token = jwt.sign({ ...newUser }, process.env.SECRET_KEY);

      await newUser.save();
      console.log("Registered & Login Successful!");
      res.status(200).json({ message: "User Registered Successfully", token });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: e });
    }
  }
);

app.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors[0].msg });
    }

    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "No User Find!!" });
      }
      const isValidPass = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPass) {
        return res.status(401).json({ message: "Invalid Password!" });
      }
      const token = jwt.sign({ ...user }, process.env.SECRET_KEY, {
        expiresIn: 360000,
      });
      console.log("Login Successful!");
      res.status(200).json({ message: "Login Successful", token });
    } catch (e) {
      console.error("Login Error: ", e);
      res.status(500).json({ message: e });
    }
  }
);

app.post("/create-journal", async (req, res) => {
  const { userId, date, mood, dayType, journal } = req.body;

  try {
    const summary = await summarizeJournal(
      journal,
      process.env.HUGGINGFACE_TOKEN
    );
    const result = await sentimentAnalyze(
      summary,
      process.env.HUGGINGFACE_TOKEN
    );

    res.status(200).json({ summary, ...result });
  } catch (e) {
    console.error("Error while Summarizing:", e);
  }
});

app.get("/", async (req, res) => {
  res.send("Server Activated");
});

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
