import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);