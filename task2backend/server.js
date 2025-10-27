import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config"

import connectDB from "./db/database.js";
import userRouter from "./routes/user.routes.js";
import quizRouter from "./routes/quiz.routes.js";
import leaderboardRouter from "./routes/leaderboard.routes.js";
import adminRouter from "./routes/admin.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

// *------------- For production
app.use(cors({ origin: "https://intellectra-quiz.netlify.app" }));
// *------------- For localhost testing
// app.use(cors({ origin: "http://localhost:5173" }));

app.get('/', (req, res) => {
    res.send("Server is running.");
});

// *------------- Auto ping backend
setInterval(() => {
    fetch("https://intellectra-quiz.netlify.app");
}, 1000 * 60 * 5);


connectDB()
    .then(() => {

        app.use('/api/auth', userRouter);
        app.use('/api/quiz', quizRouter);
        app.use('/api', leaderboardRouter);
        app.use('/api/admin', adminRouter);

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to the database: ", err);
    });
