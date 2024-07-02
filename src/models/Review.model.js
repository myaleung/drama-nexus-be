import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        drama: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Drama',
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile',
        },
        stars: {
            type: Number,
            required: [true, "A rating is required for your review"],
            default: 0,
        },
        title: {
            type: String,
            required: [true, "Please enter a summary of your review"],
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const review = mongoose.model("Review", reviewSchema);

export default review;