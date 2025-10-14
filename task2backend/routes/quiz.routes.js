import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { fetchCategories, fetchDifficulties, fetchQuestions, calculateResult, fetchQuizHistory } from "../controllers/quiz.controller.js";

const router = express.Router();
router.use(verifyToken);

// *------------------Quiz Routes
router.get("/categories", fetchCategories);
router.get("/difficulties", fetchDifficulties)
router.get("/questions", fetchQuestions);

// *------------------Result Routes
router.post("/result", calculateResult);
router.get("/quiz-history", fetchQuizHistory);

export default router;