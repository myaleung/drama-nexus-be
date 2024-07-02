import cors from "cors";
import express from "express";

export default class Server { 
  #app;
  #host;
  #port;
  #router;
  #server;
  #allowedOrigin

  #corsOptions = {
    origin: this.#allowedOrigin, //allow only the react front end to be the origin
    credentials: true, //allow for the use of the auth tokens
    methods: ['GET', 'DELETE', 'POST', 'PATCH', 'PUT'], //allowed methods
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-access-token', 'x-userprofile'], //allowed headers
  };

  constructor(port, host, router, allowedOrigin) {
    this.#app = express();
    this.#port = port;
    this.#host = host;
    this.#server = null;
    this.#router = router;
    this.#allowedOrigin = allowedOrigin;
  }

  getApp = () => {
    return this.#app;
  };

  start = () => {
    this.#app.use(cors(this.#corsOptions));
    this.#server = this.#app.listen(this.#port, this.#host, () => {
      console.log(`Server is listening on http://${this.#host}:${this.#port}`);
    });
    this.#app.use(express.json());
    this.#router.getRouter().forEach((router) => {
      this.#app.use(router.getRouteStartPoint(), router.getRouter());
    });
  };

  close = () => {
    this.#server.close();
  };
}