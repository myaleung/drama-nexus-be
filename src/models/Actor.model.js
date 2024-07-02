import mongoose from "mongoose";

const actorSchema = new mongoose.Schema(
    {
        actorId: {
            type: Number,
            unique: true,
        },
        name: {
            type: String,
            required: [true, "Please enter actor's name"],
        },
        image: {
            type: String,
            default: "/assets/images/avatar.png",
        },
    },
);

const actor = mongoose.model("Actor", actorSchema);

export default actor;