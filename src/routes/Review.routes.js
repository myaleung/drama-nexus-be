import { Router } from "express";
import ReviewController from "../controllers/Review.controller.js";
import Jwt from "../middleware/Jwt.authenticator.js";
import ReviewValidator from "../middleware/Review.authenticator.js";

export default class DramaRoutes {
  #controller;
  #router;
  #routeStartPoint;

  constructor(controller = new ReviewController(), routeStartPoint = "/") {
    this.#controller = controller;
    this.#routeStartPoint = routeStartPoint;
    this.#router = Router();
    this.#initialiseRoutes();
  }

  #initialiseRoutes = () => {
    // this.#router.put(
    //   "/drama/:id/edit-review/:reviewId",
    //   Jwt.verifyToken,
    //   ReviewValidator.validate(),
    //   this.#controller.editReview
    // );
    this.#router.post(
      "/drama/:id/add-review",
      Jwt.verifyToken,
      ReviewValidator.validate(),
      this.#controller.createReview
    );
  };

  getRouter = () => {
    return this.#router;
  };

  getRouteStartPoint = () => {
    return this.#routeStartPoint;
  };
}