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

        return res.status(200).json({ message: "Fetched the categories from DB", categories });
    } catch (error) {
        return res.status(500).json({ message: "Server Error! Unable to fetch categories", error: error.message });
    }
}

const fetchDifficulties = async (req, res) => {
    try {
        const difficulty_levels = ["Easy", "Medium", "Hard"];
        return res.json({ message: "Difficulties fetched successfully", difficulties: difficulty_levels });
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

        return res.status(200).json({ message: "Quiz questions fetched successfully", questions });
    } catch (error) {
        return res.status(500).json({ message: "Server Error! Unable to fetch questions", error: error.message });
    }
}

const calculateResult = async (req, res) => {
    try {
        const { answers, category, difficulty, allQuestionIds } = req.body;
        const userId = req.user?.id;

        if (!allQuestionIds || allQuestionIds.length === 0) {
            return res.status(400).json({ message: "No question IDs were provided." });
        }

        // Use `allQuestionIds` to fetch every question from the original quiz.
        const questions = await Question.find({
            _id: { $in: allQuestionIds }
        });

        // This validation ensures all provided IDs were valid.
        if (questions.length !== allQuestionIds.length) {
            return res.status(404).json({ message: "One or more questions could not be found." });
        }

        let score = 0;

        const detailedResults = questions.map(question => {
            const qId = question._id.toString();
            const selectedAnswer = answers[qId]; // This will be undefined if the user skipped it
            const isCorrect = selectedAnswer === question.correctAnswer;

            if (isCorrect) {
                score += 1;
            }

            return {
                _id: qId,
                questionText: question.question,
                options: question.options,
                selectedAnswer: selectedAnswer || null, // Send null if skipped
                correctAnswer: question.correctAnswer,
                explanation: question.explanation,
                status: selectedAnswer === undefined
                    ? 'skipped'
                    : isCorrect ? 'correct' : 'incorrect'
            };
        });

        await Result.create({
            userId,
            score,
            questionsAttempted: Object.keys(answers).length, // Tracks actual attempts
            quizMeta: { category, difficulty },
        });

        return res.status(200).json({
            message: "Result calculated successfully!",
            score,
            detailedResults
        });

    } catch (error) {
        console.error("Result calculation failed:", error);
        return res.status(500).json({ message: "Server Error! Unable to calculate result" });
    }
}

const fetchQuizHistory = async (req, res) => {
    try {
        const history = await Result.find({ userId: req?.user?.id });

        if (history.length === 0) {
            return res.status(404).json({ message: "No quiz history" });
        }

        return res.status(200).json({ message: "Quiz history fetched successfully", history });
    } catch (error) {
        return res.status(500).json({ message: "Server Error! Unable to fetch quiz history", error: error.message });
    }
}

export { fetchCategories, fetchDifficulties, fetchQuestions, calculateResult, fetchQuizHistory };