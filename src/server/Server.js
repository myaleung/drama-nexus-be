import cors from "cors";
import express from "express";

export default class Server { 
  #app;
  #host;
  #port;
  #router;
  #server;

  constructor(port, host, router) {
    this.#app = express();
    this.#port = port;
    this.#host = host;
    this.#server = null;
    this.#router = router;
  }

  getApp = () => {
    return this.#app;
  };

  start = () => {
    this.#app.use(cors());
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