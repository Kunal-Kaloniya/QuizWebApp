import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { fetchCategories, fetchDifficulties, fetchQuestions, calculateResult, fetchQuizHistory } from "../controllers/quiz.controller.js";

const router = express.Router();

// *------------------Quiz Routes
router.get("/categories", fetchCategories);
router.get("/difficulties", fetchDifficulties)
router.get("/questions", verifyToken, fetchQuestions);

// *------------------Result Routes
router.post("/result", verifyToken, calculateResult);
router.get("/quiz-history", verifyToken, fetchQuizHistory);

export default router;