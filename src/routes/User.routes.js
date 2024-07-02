import { Router } from "express";
import UserController from "../controllers/User.controller.js";
import UserValidator from "../middleware/User.validator.js";
import ProfileValidator from "../middleware/Profile.validator.js";
import Jwt from "../middleware/Jwt.authenticator.js";

export default class UserRoutes {
  #controller;
  #router;
  #routeStartPoint;
  #origin;

  constructor(controller = new UserController(), routeStartPoint = "/") {
    this.#controller = controller;
    this.#routeStartPoint = routeStartPoint;
    this.#router = Router();
    this.#initialiseRoutes();
    this.#origin = process.env.FRONT_END_URL;
  }

  #initialiseRoutes = () => {
    this.#router.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", this.#origin);
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-userprofile");
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
    this.#router.post(
      "/login",
      this.#controller.loginUser
    );
    this.#router.post(
      "/sign-up",
      UserValidator.validate(),
      UserValidator.checkDuplicateEmail,
      this.#controller.addUser
    );
    this.#router.get(
      "/members/:id",
      this.#controller.getUserProfile
    );
    this.#router.put(
      "/members/:id/edit",
      Jwt.verifyToken,
      ProfileValidator.validate(),
      this.#controller.editUserProfile
    );
    this.#router.get(
      "/members/:id/watchlist",
      Jwt.verifyToken,
      this.#controller.getUserWatchlist
    );
    this.#router.put(
      "/members/:id/watchlist",
      Jwt.verifyToken,
      this.#controller.updateUserWatchlist
    );
  };

  getRouter = () => {
    return this.#router;
  };

  getRouteStartPoint = () => {
    return this.#routeStartPoint;
  };
}