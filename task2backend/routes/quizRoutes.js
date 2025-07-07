import express from "express";
import { Question } from "../models/question.models";

const router = express.Router();

router.get("/categories", async (req, res) => {
    const categories = await Question.distinct("category");
    res.json(categories);
});

router.get("/questions", async (req, res) => {
    const { category, difficulty } = req.query;

    const questions = await Question.find({ category, difficulty });
    res.json(questions);
});
