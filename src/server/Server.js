import cors from "cors";
import express from "express";

export default class Server { 
  #app;
  #host;
  #port;
  #router;
  #server;
  #allowedOrigin  
  #corsOptions;

  constructor(port = 5000, host, router, allowedOrigin) {
    this.#app = express();
    this.#port = port;
    this.#host = host;
    this.#server = null;
    this.#router = router;
    this.#allowedOrigin = allowedOrigin;
    this.#corsOptions = {
      origin: this.#allowedOrigin, //allow only the react front end to be the origin
      credentials: true, //allow for the use of the auth tokens
      methods: ['GET', 'DELETE', 'POST', 'PUT'], //allowed methods
      allowedHeaders: ['Content-Type', 'Authorization', 'x-userprofile'], //allowed headers
    };
  }

  getApp = () => {
    return this.#app;
  };

  start = () => {
    this.#app.use(cors(this.#corsOptions));
    this.#app.use(express.json());
    this.#router.getRouter().forEach((router) => {
      this.#app.use(router.getRouteStartPoint(), router.getRouter());
    });
    this.#server = this.#app.listen(this.#port, this.#host, () => {
      console.log(`Server is listening on http://${this.#host}:${this.#port}`);
    });
  };

  close = () => {
    this.#server.close();
  };
}