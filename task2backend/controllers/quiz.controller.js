import { Question } from "../models/question.models.js";
import { Result } from "../models/result.models.js";
import { CACHE_DURATION } from "../constants.js";

let categoryCache = {
    data: null,
    lastFetch: 0
};

const fetchCategories = async (req, res) => {
    try {

        if (categoryCache.data && (Date.now() - categoryCache.lastFetch) < CACHE_DURATION) {
            return res.status(200).json({ message: "Fetched the categories from cache", categories: categoryCache.data });
        }

        const categories = await Question.distinct("category");

        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }

        categoryCache = {
            data: categories,
            lastFetch: Date.now()
        }

        return res.status(200).json({ message: "Fetched the categories from DB", categories: categories });
    } catch (error) {
        return res.status(500).json({ message: "Server Error! Unable to fetch categories", error: error.message });
    }
}

const fetchDifficulties = async (req, res) => {
    try {
        const difficulty_levels = ["Easy", "Medium", "Hard"];
        return res.json(difficulty_levels);
    } catch (error) {
        return res.status(500).json({ message: "Server Error! Unable to fetch difficulties", error: error.message });
    }
}

const fetchQuestions = async (req, res) => {
    try {
        const { category, difficulty } = req.query;

        if (!category || !difficulty) {
            return res.status(400).json("Please provide both category and difficulty");
        }

        const questions = await Question.aggregate([
            { $match: { category, difficulty } },
            { $sample: { size: 10 } },
            { $project: { correctAnswer: 0, explanation: 0 } }
        ]);

        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found!" });
        }

        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({ message: "Server Error! Unable to fetch questions", error: error.message });
    }
}

const calculateResult = async (req, res) => {
    try {
        const { answers, category, difficulty } = req.body;
        let score = 0;

        if (Object.entries(answers).length === 0) {
            return res.status(200).json({ message: "Atleast try doing some questions!", score });
        }

        for (let [qId, ans] of Object.entries(answers)) {
            const question = await Question.findOne({ _id: qId });

            if (!question) {
                return res.status(404).json({ message: "No such question found." });
            }

            if (ans == question.correctAnswer) {
                score += 1;
            }
        };

        await Result.create({
            userId: req.user?.id,
            score,
            questionsAttempted: Object.keys(answers).length,
            quizMeta: {
                category: category,
                difficulty: difficulty,
            },
            createdAt: new Date()
        });

        return res.status(200).json({ message: "all questions checked!", score });
    } catch (error) {
        return res.status(500).json({ message: "Server Error! Unable to calculate result", error: error.message });
    }
}

const fetchQuizHistory = async (req, res) => {
    try {
        const history = await Result.find({ userId: req?.user?.id });

        if (history.length === 0) {
            return res.status(404).json({ message: "No quiz history" });
        }

        return res.status(200).json(history);
    } catch (error) {
        return res.status(500).json({ message: "Server Error! Unable to fetch quiz history", error: error.message });
    }
}

export { fetchCategories, fetchDifficulties, fetchQuestions, calculateResult, fetchQuizHistory };