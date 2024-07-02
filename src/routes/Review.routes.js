import { Router } from "express";
import ReviewController from "../controllers/Review.controller.js";
import Jwt from "../middleware/Jwt.authenticator.js";
import ReviewValidator from "../middleware/Review.authenticator.js";

export default class DramaRoutes {
  #controller;
  #router;
  #routeStartPoint;
  #origin;

  constructor(origin = "http://localhost:5173", controller = new ReviewController(), routeStartPoint = "/") {
    this.#origin = origin;
    this.#controller = controller;
    this.#routeStartPoint = routeStartPoint;
    this.#router = Router();
    this.#initialiseRoutes();
  }

  #initialiseRoutes = () => {
    this.#router.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", this.#origin);
      res.header("Access-Control-Allow-Methods", "GET, DELETE, POST, PUT");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token, x-userprofile");
      res.header("Access-Control-Allow-Credentials", true);
      next();
    });
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