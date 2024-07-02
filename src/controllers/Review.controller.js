import ReviewService from "../services/Review.service.js";

export default class ReviewController {
  #service;

  constructor(service = new ReviewService()) {
    this.#service = service;
  }

  createReview = async (req, res) => {
    try {
      const reviewDetails = {
        drama: req.params.id,
        author: req.headers['x-userprofile'],
        stars: req.body.stars,
        title: req.body.title,
        description: req.body.description,
      };
      const review = await this.#service.createReview(reviewDetails, req.user._id);
      if (!review) throw new Error("Review not created");
      return res.status(201).json({ review });
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  };

  // updateReview = async (req, res) => {
  //   try {
  //     const review = await this.#service.updateReview(req.params.id, req.body);
  //     if (!review) throw new Error("Review not updated");
  //     return res.status(200).json({ review });
  //   } catch (e) {
  //     return res.status(500).json({ status: 500, message: e.message });
  //   }
  // };

  // deleteReview = async (req, res) => {
  //   try {
  //     const review = await this.#service.deleteReview(req.params.id);
  //     if (!review) throw new Error("Review not deleted");
  //     return res.status(200).json({ review });
  //   } catch (e) {
  //     return res.status(500).json({ status: 500, message: e.message });
  //   }
  // };
}