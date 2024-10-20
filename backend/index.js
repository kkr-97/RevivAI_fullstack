import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

import UserModel from "./models/UserModel.js";
import JournalModel from "./models/JournalModel.js";

import sentimentAnalyze from "./operations/sentimentAnalyse.js";
import summarizeJournal from "./operations/summarizeJournal.js";
import getFeedback from "./operations/getFeedback.js";
import verifyUser from "./middleware/verifyUser.js";

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

      const salt = await bcryptjs.genSalt(7);
      const hashedPass = await bcryptjs.hash(password, salt);

      const newUser = new UserModel({
        email: email,
        username: username,
        passwordHash: hashedPass,
      });

      const token = jwt.sign({ ...newUser }, process.env.SECRET_KEY);

      await newUser.save();
      console.log("Registered & Login Successful!");
      res.status(200).json({
        message: "User Registered Successfully",
        token,
        username: username,
        id: newUser._id,
      });
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
        return res.status(401).json({ message: "No User Found!!" });
      }
      const isValidPass = await bcryptjs.compare(password, user.passwordHash);
      if (!isValidPass) {
        return res.status(401).json({ message: "Invalid Password!" });
      }
      const token = jwt.sign({ ...user }, process.env.SECRET_KEY, {
        expiresIn: 360000,
      });
      console.log("Login Successful!");
      res.status(200).json({
        username: user.username,
        id: user._id,
        message: "Login Successful",
        token,
      });
    } catch (e) {
      console.error("Login Error: ", e);
      res.status(500).json({ message: e });
    }
  }
);

app.post("/create-journal", verifyUser, async (req, res) => {
  const { userId, date, dayType, journal } = req.body;

  try {
    const summary = await summarizeJournal(journal);
    const result = await sentimentAnalyze(journal);
    const aiFeedback = await getFeedback(dayType, summary);

    const journalEntry = new JournalModel({
      userId,
      date,
      dayType,
      journal,
      emotions: {
        ...result,
        aiFeedback,
        summary,
      },
    });
    await journalEntry.save();
    console.log("Journal Created!");
    res.status(200).json({ ...journalEntry.emotions });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Try Submitting again!!" });
  }
});

app.get("/journal-items/", verifyUser, async (req, res) => {
  try {
    const userId = req.userId;
    const journalItems = await JournalModel.find({ userId: userId }).sort({
      date: -1,
    });

    const journalItemsByDate = journalItems.reduce((acc, item) => {
      const dateOnly = new Date(item.date).toLocaleDateString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      if (!acc[dateOnly]) {
        acc[dateOnly] = [];
      }
      acc[dateOnly].push(item);
      return acc;
    }, {});

    const journalArray = Object.keys(journalItemsByDate).map((date) => ({
      date: date,
      journalItems: journalItemsByDate[date],
    }));

    res.status(200).json({ journalArray });
    console.log("Journal Items Sent Successfully");
  } catch (err) {
    console.error("Error while retrieving journals: ", err);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving journal items." });
  }
});

app.get("/journal/:id", verifyUser, async (req, res) => {
  try {
    const { id } = req.params;
    const journal = await JournalModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!journal) {
      res.status(404).json({ message: "Journal not found!" });
    } else {
      res.status(200).json({ journal });
    }
  } catch (err) {
    console.error("Error while retrieving journal: ", err);
    res
      .status(500)
      .json({ message: "Error while retrieving journal details!" });
  }
});

app.get("/journals/pie-chart", verifyUser, async (req, res) => {
  try {
    const userId = req.userId;
    const aggregation = await JournalModel.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $limit: 10,
      },
      {
        $group: {
          _id: "$dayType",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          value: "$count",
          label: "$_id",
        },
      },
    ]);

    res.json({ aggregation });
  } catch (e) {
    console.error("Error running aggregation:", e);
    res.status(500).json({ message: "Error while retrieving Aggregate data" });
  }
});

app.get("/journals/emotions-trends-data", verifyUser, async (req, res) => {
  const userId = req.userId;
  try {
    const trendsData = await JournalModel.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          name: {
            $dateToString: { format: "%d-%b", date: "$date" },
          },
          positive: "$emotions.positive",
          negative: "$emotions.negative",
          neutral: "$emotions.neutral",
        },
      },
    ]);
    res.status(200).json({ trendsData });
  } catch (err) {
    console.error("Error while retrieving Emotional Trends: ", err);
    res
      .status(500)
      .json({ message: "Error while retrieving Emotional Trends" });
  }
});

app.get("/journals/top-moments", verifyUser, async (req, res) => {
  const userId = req.userId;
  try {
    const topMoments = await JournalModel.aggregate([
      {
        $match: { dayType: "Happy", userId: userId },
      },
      {
        $sort: { "emotions.positive": -1 },
      },
      {
        $limit: 3,
      },
      {
        $project: {
          id: "$_id",
          date: "$date",
          summary: "$emotions.summary",
          positiveScore: "$emotions.positive",
        },
      },
    ]);
    res.status(200).json({ topMoments });
  } catch (err) {
    console.error("Error while retrieving Top Moments: ", err);
    res.status(500).json({ message: "Error while retrieving Top Moments" });
  }
});

app.get("/", async (req, res) => {
  res.send("Reviva - Server Activated");
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

export default app;
