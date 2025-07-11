import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";
import { Question } from "../models/question.models.js";

const router = express.Router();

router.post("/add-question", verifyToken, verifyAdmin, async (req, res) => {
    const quesData = req.body;
    const { question } = quesData;

    if (!question || !quesData.options || !quesData.category || !quesData.difficulty || !quesData.correctAnswer || !quesData.explanation) {
        return res.status(400).json({ message: "All fields required!" });
    }

    const existingQuestion = await Question.findOne({ question });
    if (existingQuestion) {
        return res.status(400).json({ message: "question already exists!" });
    }

    const newQuestion = new Question(quesData);
    await newQuestion.save();

    res.status(200).json({ message: "New question entered!", quesData });
});

router.put("/update-question/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        await Question.findByIdAndUpdate(id, updatedData);
        res.status(200).json({ message: "Question updated seccessfully!" });
    } catch (err) {
        res.status(400).json({ message: "Failed to update the question!" });
    }
})

router.delete("/delete-question/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Question.findByIdAndDelete(id);
        res.status(200).json({ message: "Question deleted successfully!" });
    } catch (err) {
        res.status(400).json({ message: "Failed to delete the question!" });
    }
});

export default router;