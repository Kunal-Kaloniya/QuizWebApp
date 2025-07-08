import express from "express";
import { Question } from "../models/question.models.js";
import verifyToken from "../middleware/authMiddleware.js"

const router = express.Router();


// this route contains all the categories
router.get("/categories", async (req, res) => {
    const categories = await Question.distinct("category");
    res.json(categories);
});


// this route contains all the difficulty levels
router.get("/difficulties", async (req, res) => {
    const difficulty_levels = await Question.distinct("difficulty");
    res.json(difficulty_levels);
})


// this route fetches questions based on the category and difficulty provided in the query parameters
router.get("/questions", async (req, res) => {
    const { category, difficulty } = req.query;

    const questions = await Question.find({ category, difficulty });
    res.json(questions);
});


// this route is used to add new questions to the database
router.post("/add-question", verifyToken, async (req, res) => {
    const quesData = req.body;
    const { question } = req.body;

    const existingQuestion = await Question.findOne({ question });
    if (existingQuestion) {
        return res.status(400).json({ message: "question already exists!" });
    }

    const newQuestion = new Question(quesData);
    await newQuestion.save();

    res.status(201).json({ message: "New question entered!", quesData });
})

export default router;