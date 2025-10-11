import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    quizMeta: {
        category: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        }
    },
    questionsAttempted: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

export const Result = new mongoose.model("Result", resultSchema);