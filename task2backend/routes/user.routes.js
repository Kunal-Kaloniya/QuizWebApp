import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { validateToken, registerUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/verify-token", verifyToken, validateToken);
router.post('/signup', registerUser);
router.post('/login', loginUser);

export default router;