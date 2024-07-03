import Sinon from "sinon";
import ReviewController from "../../src/controllers/Review.controller.js";
import ReviewService from "../../src/services/Review.service.js";
import testReviewData from "../data/testReviewData.js";

describe("Review Controller", () => { 
  let service;
  let controller;
  let review;
  let req;

  beforeEach(() => {
    service = new ReviewService();
    controller = new ReviewController(service);
    req = {
      params: { id: 1 },
      headers: { "x-userprofile": "user" },
      body: { stars: 5, title: "Great drama", description: "I loved this drama" },
      user: { _id: 1 },
    };
  });

  describe("addReview", () => {
    it("should return a review", async () => {
      review = testReviewData.testReviews[0];
      const res = { status: Sinon.stub().returnsThis(), json: Sinon.stub() };
      Sinon.stub(service, "createReview").returns(review);

      await controller.createReview(req, res);

      Sinon.assert.calledWith(res.status, 201);
      Sinon.assert.calledWith(res.json, { review });
    });

    it("should return a 500 status code and an error message", async () => { 
      const res = { status: Sinon.stub().returnsThis(), json: Sinon.stub() };
      Sinon.stub(service, "createReview").throws(new Error("Review not created"));

      await controller.createReview(req, res);

      Sinon.assert.calledWith(res.status, 500);
      Sinon.assert.calledWith(res.json, { status: 500, message: "Review not created" });
    });
  });
});