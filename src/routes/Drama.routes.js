import { Router } from "express";
import DramaController from "../controllers/Drama.controller.js";
// import DramaValidator from "../middleware/Drama.validator.js";
// import ProfileValidator from "../middleware/Profile.validator.js";
// import Jwt from "../middleware/Jwt.authenticator.js";

export default class DramaRoutes {
  #controller;
  #router;
  #routeStartPoint;
  #origin;

  constructor(controller = new DramaController(), routeStartPoint = "/") {
    this.#controller = controller;
    this.#routeStartPoint = routeStartPoint;
    this.#router = Router();
    this.#initialiseRoutes();
    this.#origin = process.env.FRONT_END_URL;
  }

  #initialiseRoutes = () => {
    this.#router.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", this.#origin);
      res.header("Access-Control-Allow-Methods", "GET, POST");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
    this.#router.get(
      "/",
      this.#controller.getAllDramas
    );
    this.#router.get(
      "/explore",
      this.#controller.getAllDramas
    );
    this.#router.get(
      "/drama/:id",
      this.#controller.getDrama,
    );
    // this.#router.put(
    //   "/drama/:id/edit",
    //   Jwt.verifyToken,
    //   DramaValidator.validate(),
    //   Jwt.verifyAdmin,
    //   this.#controller.editDrama
    // );
    // this.#router.post(
    //   "/drama/:id/add",
    //   Jwt.verifyToken,
    //   Jwt.verifyAdmin,
      // DramaValidator.validate(),
    //   this.#controller.addDrama
    // );
    this.#router.get(
      "/populate/dramas",
      this.#controller.populateDramaDB
    );
    this.#router.get(
      "/populate/cast",
      this.#controller.populateCastDB
    );
    this.#router.get(
      "/populate/dramaCast",
      this.#controller.populateDramaCastInDB
    );
  };

  getRouter = () => {
    return this.#router;
  };

  getRouteStartPoint = () => {
    return this.#routeStartPoint;
  };
}