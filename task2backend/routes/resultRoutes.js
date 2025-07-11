import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { Question } from "../models/question.models.js";

const router = express.Router();

router.post("/result", verifyToken, async (req, res) => {
    const data = req.body;
    let score = 0;

    if (Object.entries(data).length === 0) {
        return res.status(200).json({ message: "Atleast try doing some questions!", score });
    }

    for (let [qId, ans] of Object.entries(data)) {
        const question = await Question.findOne({ _id: qId });

        if (!question) {
            return res.status(404).json({ message: "No such question found." });
        }

        if (ans == question.correctAnswer) {
            score += 1;
        }
    };

res.status(200).json({ message: "all questions checked!", score });
});

// router.post("/update-history", (req, res) => {
//     const { category, difficulty } = req.body;

    
// })

export default router;