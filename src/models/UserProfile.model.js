import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
        },
        profilePicture: {
            type: String,
            default: "/assets/images/avatar.png",
        },
        bio: {
            type: String,
            default: "This user has not set a bio yet",
        },
        watchlist: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Drama',
            default: [],
        }],
        reviews: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Review',
            default: [],
        }],
    }, {
        toJSON: {virtuals: true},
    }
);

const userProfile = mongoose.model("UserProfile", userProfileSchema);

export default userProfile;