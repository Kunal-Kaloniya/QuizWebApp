import { Question } from "../models/question.models.js";
import { Result } from "../models/result.models.js";

const fetchCategories = async (req, res) => {
    try {
        const categories = await Question.distinct("category");
        res.json(categories);
    } catch (error) {
        console.log("Unable to fetch categories: ", error.message);
    }
}

const fetchDifficulties = async (req, res) => {
    try {
        const difficulty_levels = ["Easy", "Medium", "Hard"];
        res.json(difficulty_levels);
    } catch (error) {
        console.log("Unable to fetch difficulties: ", error.message);
    }
}

const fetchQuestions = async (req, res) => {
    try {
        const { category, difficulty } = req.query;

        if (!category || !difficulty) {
            return res.status(400).json("Please provide both category and difficulty");
        }

        const questions = await Question.find({ category, difficulty }).limit(10);
        res.json(questions);
    } catch (error) {
        console.log("Unable to fetch questions: ", error.message);
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
            userId: req.user.id,
            score,
            questionsAttempted: Object.keys(answers).length,
            quizMeta: {
                category: category,
                difficulty: difficulty,
            },
            createdAt: new Date()
        })

        res.status(200).json({ message: "all questions checked!", score });
    } catch (error) {
        console.log("Server Error! Unable to calculate result: ", error.message);
        res.status(500).json({ message: "Server Error! Unable to calculate result", error: error.message });
    }
}

const fetchQuizHistory = async (req, res) => {
    try {
        const history = await Result.find({ userId: req.user.id })
        res.status(200).json(history);
    } catch (error) {
        console.log("Unable to fetch quiz history: ", error.message);
    }
}

export { fetchCategories, fetchDifficulties, fetchQuestions, calculateResult, fetchQuizHistory };