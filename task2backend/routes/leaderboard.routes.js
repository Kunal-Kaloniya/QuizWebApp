import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { fetchLeaderboard } from "../controllers/leaderboard.controller.js";

const router = express.Router();

router.get('/leaderboard', verifyToken, fetchLeaderboard);

export default router;