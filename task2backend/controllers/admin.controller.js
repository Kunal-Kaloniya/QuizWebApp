import { Question } from "../models/question.models.js";
import { User } from "../models/user.models.js";

const addQuestion = async (req, res) => {
    try {
        const quesData = req.body;
        const { question } = quesData;

        if (!question || !quesData.options || !quesData.category || !quesData.difficulty || !quesData.correctAnswer || !quesData.explanation) {
            return res.status(400).json({ message: "All fields required!" });
        }

        const existingQuestion = await Question.findOne({ question });
        if (existingQuestion) {
            return res.status(409).json({ message: "question already exists!" });
        }

        const newQuestion = new Question(quesData);
        await newQuestion.save();

        return res.status(200).json({ message: "New question entered!", quesData });
    } catch (error) {
        return res.status(500).json({ message: "Server error! Unable to add question", error: error.message });
    }
}

const deleteQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        await Question.findByIdAndDelete(id);
        return res.status(200).json({ message: "Question deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Server error! Failed to delete the question!", error: error.message });
    }
}

const updateQuestion = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const { question } = updatedData;

    if (!question || !updatedData.options || !updatedData.category || !updatedData.difficulty || !updatedData.correctAnswer || !updatedData.explanation) {
        return res.status(400).json({ message: "All fields required!" });
    }

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(id, updatedData);
        return res.status(200).json({ message: "Question updated successfully!", updatedQuestion });
    } catch (error) {
        return res.status(500).json({ message: "Server error! Failed to update the question!", error: error.message });
    }
}

const searchQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const question = await Question.findOne({ _id: id });

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        return res.status(200).json({ message: "Question found!", question });

    } catch (error) {
        return res.status(500).json({ message: "Server error! Failed to search question!", error: error.message });
    }
}

const fetchQuestions = async (req, res) => {
    try {
        const { category, difficulty } = req.query;

        const query = {};
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;

        const questions = await Question.find(query);

        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found" });
        }

        return res.status(200).json({ message: "Questions found", questions });
    } catch (error) {
        return res.status(500).json({ message: "Server error! Failed to fetch question!", error: error.message });
    }
}

const fetchUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        return res.status(200).json({ message: "Users successfully fetched", users });
    } catch (error) {
        return res.status(500).json({ message: "Server error! Failed to fetch users", error: error.message });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        return res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Server error! Failed to delete user", error: error.message });
    }
}

export { addQuestion, updateQuestion, deleteQuestion, searchQuestion, fetchQuestions, fetchUsers, deleteUser };