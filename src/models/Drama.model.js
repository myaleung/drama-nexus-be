import mongoose from "mongoose";

const dramaSchema = new mongoose.Schema(
    {
        dramaId: {
            type: Number,
            unique: true,
        },
        title: {
            type: String,
            required: [true, "Please add a title"],
        },
        year: {
            type: Number,
            required: [true, "The year of release is required"],
        },
        voteAverage: {
            type: Number,
            default: 0,
        },
        voteCount: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            required: [true, "Please include a main image for the drama"],
        },
        poster: {
            type: String,
            required: [true, "Please include a poster image for the drama"],
        },
        synopsis: {
            type: String,
        },
        genreIds: {
            type: [Number],
            required: [true, "Please add at least one genre"],
        },
        cast: [{
            actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Actor' },
            role: { type: String },
        }],
        reviews: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Review',
        }],
    }
);

const drama = mongoose.model("Drama", dramaSchema);

export default drama;