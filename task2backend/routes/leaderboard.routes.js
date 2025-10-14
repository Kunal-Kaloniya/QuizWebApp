import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { fetchLeaderboard } from "../controllers/leaderboard.controller.js";

const router = express.Router();
router.use(verifyToken);

router.get('/leaderboard', fetchLeaderboard);

export default router;