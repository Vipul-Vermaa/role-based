import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Enter title']
    },
    description: {
        type: String,
        required: [true, 'Enter required']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const Post = mongoose.model('Post', schema)