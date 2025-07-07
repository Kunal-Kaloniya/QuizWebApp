import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    category: {
        type: String,
        unique: true,
        required: true,
    },
    difficulty: {
        type: String,
        unique: true,
        required: true,
    },
    question: {
        type: String,
        unique: true,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: true,
    },
});

export const Question = mongoose.model("Question", questionSchema);