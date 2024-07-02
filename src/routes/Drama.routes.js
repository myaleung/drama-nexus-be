import cors from "cors";
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
  // #corsOptions;

  constructor(origin = "http://localhost:5173", controller = new DramaController(), routeStartPoint = "/") {
    this.#origin = origin;
    this.#controller = controller;
    this.#routeStartPoint = routeStartPoint;
    this.#router = Router();
    this.#initialiseRoutes();
    // this.#corsOptions = {
    //   origin: this.#origin, //allow only the react front end to be the origin
    //   credentials: true, //allow for the use of the auth tokens
    //   methods: ['GET', 'DELETE', 'POST', 'PUT'], //allowed methods
    //   allowedHeaders: ['Content-Type', 'Authorization', 'x-userprofile'], //allowed headers
    // };
  }


  #initialiseRoutes = () => {
    // this.#router.use((req, res, next) => {
    //   res.header("Access-Control-Allow-Origin", this.#origin);
    //   res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    //   res.header("Access-Control-Allow-Credentials", true);
    //   next();
    // });
    this.#router.get(
      "/",
      // cors(this.#corsOptions),
      this.#controller.getAllDramas
    );
    this.#router.get(
      "/explore",
      // cors(this.#corsOptions),
      this.#controller.getAllDramas
    );
    this.#router.get(
      "/drama/:id",
      // cors(this.#corsOptions),
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
      // cors(this.#corsOptions),
      this.#controller.populateDramaDB
    );
    this.#router.get(
      "/populate/cast",
      // cors(this.#corsOptions),
      this.#controller.populateCastDB
    );
    this.#router.get(
      "/populate/dramaCast",
      // cors(this.#corsOptions),
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