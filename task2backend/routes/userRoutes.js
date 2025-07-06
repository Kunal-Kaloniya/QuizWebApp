import express from "express";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyToken, (req, res) => {
    const msg = {message: "Welcome to Home route."};
    res.send(msg);
})

export default router;