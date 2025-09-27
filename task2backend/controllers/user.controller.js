import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";
import { generateToken } from "../helpers/generateToken.js";

const validateToken = (req, res) => {
    res.status(200).json({
        message: "Token is valid",
        user: req.user,
    })
}

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(401).json({ message: "All credentials are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Sign up successfull", user });
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Both fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found! Please register" });
        }

        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const tokenPayload = {
            username: user.username,
            email: user.email,
            role: user.role
        };
        const token = generateToken(tokenPayload);

        res.status(200).json({ message: "Login successfull", token, tokenPayload });
    } catch (error) {
        console.log("Server Error! Unable to login");
        res.status(500).json({ message: "Server Error! Unable to login" });
    }
}

export { validateToken, registerUser, loginUser };