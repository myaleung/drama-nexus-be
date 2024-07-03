import { assert, expect } from "chai";
import Sinon from "sinon";
import Review from "../../src/models/Review.model.js";
import testReviewData from "../data/testReviewData.js";

describe("Review Service", () => {
  describe("Review Creation Tests", () => {
    let testReview1;
    let testReview2;
    let saveStub;
    beforeEach(() => {
      testReview1 = testReviewData.testReviews[0];
      testReview2 = testReviewData.testReviews[1];
      if (saveStub && typeof saveStub.restore === 'function') {
        saveStub.restore();
      }
      saveStub = Sinon.stub(Review.prototype, "save");
    });
    afterEach(() => {
      testReview1 = null;
      testReview2 = null;
      if (saveStub && typeof saveStub.restore === 'function') {
        saveStub.restore();
      }
    });

    it("should return a new review upon valid creation", async () => {
      const review = new Review(testReview1);
      saveStub.returns(review);

      const newReview = await review.save();

      assert.equal(newReview, review);
      Sinon.assert.calledOnce(saveStub);
    });

    it("should throw an error when review details are invalid", async () => {
      const review = new Review(testReview2);
      saveStub.throws(new Error("Invalid Review"));

      try {
        await review.save();
      } catch (e) {
        expect(e.message).to.equal("Invalid Review");
      }
      Sinon.assert.calledOnce(saveStub);
    });

    it("should save a review with the user's objectId", async () => { 
      const review = new Review(testReview1);
      saveStub.returns(review);

      const newReview = await review.save();

      assert.equal(newReview.user, testReview1.user);
      Sinon.assert.calledOnce(saveStub);
    });
  });
});