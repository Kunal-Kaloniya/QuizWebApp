import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import "dotenv/config"

import connectDB from "./src/db/database.js";
import { User } from "./src/models/user.models.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Server is running.");
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

        app.post("/signup", async (req, res) => {
            const { username, email, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: "User already exists!" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({ username, email, password: hashedPassword });
            await user.save();

            res.status(201).json({ message: "Sign up successfull", user });
        })

        app.post("/login", async (req, res) => {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ message: "Invalid credentials!" });
            }

            const isUser = await bcrypt.compare(password, user.password);
            if (!isUser) {
                res.status(400).json({ message: "Incorrect password!" });
            }

            res.status(201).json({ message: "Logged in successfully", user });
        })
    })
    .catch((err) => {
        console.error("Unable to connect to the database: ", err);
    });
