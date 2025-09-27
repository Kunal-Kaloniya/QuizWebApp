import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";
import { addQuestion, updateQuestion, deleteQuestion, searchQuestion, fetchQuestions, fetchUsers, deleteUser } from "../controllers/admin.controller.js";

const router = express.Router();
router.use(verifyToken, verifyAdmin);

router.post("/add-question", addQuestion);
router.put("/update-question/:id", updateQuestion);
router.delete("/delete-question/:id", deleteQuestion);
router.get("/search-question/:id", searchQuestion);
router.get("/all-questions", fetchQuestions);
router.get("/fetch-users", fetchUsers);
router.delete("/delete-user/:id", deleteUser);

export default router;