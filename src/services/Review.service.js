import Drama from "../models/Drama.model.js";
import Review from "../models/Review.model.js";
import UserProfile from "../models/UserProfile.model.js";

export default class ReviewService {
  async createReview(reviewDetails, userId) {
    try {
      const review = new Review(reviewDetails);
      const userProfile = await UserProfile.findOne({ user: userId });
      const drama = await Drama.findById(reviewDetails.drama);
      if (!userProfile || !drama) {
        throw new Error("User Profile or Drama not found");
      }

      const newReview = await review.save();
      userProfile.reviews.push(newReview._id);
      drama.reviews.push(newReview._id);
      await userProfile.save();
      await drama.save();
      return newReview;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  // async updateReview(id, review) {
  //     return this.reviewModel.findByIdAndUpdate(id, review, { new: true });
  // }

  // async deleteReview(id) {
  //     return this.reviewModel.findByIdAndDelete(id);
  // }
}