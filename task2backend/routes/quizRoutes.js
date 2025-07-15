import express from "express";
import { Question } from "../models/question.models.js";
import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router();


router.get("/categories", async (req, res) => {
    const categories = await Question.distinct("category");
    res.json(categories);
});

router.get("/difficulties", async (req, res) => {
    const difficulty_levels = await Question.distinct("difficulty");
    res.json(difficulty_levels);
})

router.get("/questions", verifyToken, async (req, res) => {
    const { category, difficulty } = req.query;

    const questions = await Question.find({ category, difficulty }).limit(10);
    res.json(questions);
});

export default router;