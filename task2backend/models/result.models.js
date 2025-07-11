import mongoose, { Schema } from "mongoose";

const resultSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    score: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    questionsAttempted: {
        type: Number,
    }
}, { timestamps: true });

export const Result = new mongoose.model("Result", resultSchema);