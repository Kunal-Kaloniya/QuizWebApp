import mongoose, { Schema } from "mongoose";

const historySchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    totalQuizesTaken: {
        type: Number,
        required: true,
    },
});

export const History = new mongoose.model("History", historySchema);