import chaiModule, { expect } from 'chai';
import chaiHttp from 'chai-http';

const chai = chaiModule.use(chaiHttp);

import Database from '../../src/db/db.connection.js';
import Config from '../../src/db/db.config.js';
import Server from '../../src/server/Server.js';
import Router from "../../src/routes/Router.routes.js";
import UserRoutes from '../../src/routes/User.routes.js';
import User from "../../src/models/User.model.js";
import testData from "../data/testData.js";

describe("User Integration Tests", () => {
  let app;
  let server;
  let database;

  before(async () => {
    Config.load();
    const { PORT, HOST, DB_URI } = process.env;
    const router = new Router();
    const userRoutes = new UserRoutes();
    router.addRouter(userRoutes);
    server = new Server(PORT, HOST, router);
    database = new Database(DB_URI);
    app = server.getApp();
    await database.connect();
  });

  describe("POST /users", () => {
    beforeEach(async () => {
      try {
        await User.deleteMany();
        console.log("Database cleared");
      } catch (e) {
        console.log(e.message);
        throw new Error("Error clearing database");
      }
      try {
        await User.insertMany(testData.existingUsers);
        console.log("Database populated with test users");
      } catch (e) {
        console.log(e.message);
        throw new Error("Error inserting");
      }
    });

    it.skip("should add a new user", async () => {
      await chai.request(app)
        .post("/sign-up")
        .send(testData.testSignUpUsers[0])
        .end((err, res) => { 
          console.log(res);
          if (err) { console.log(err); }
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal("User registered");
        });
    });

    it.skip("should return an error when user details are invalid", async () => {
      const invalidUser = testData.testInvalidUsers.invalidEmailLoginUser;
      console.log(invalidUser);
      await chai.request(app)
        .post("/sign-up")
        .send(invalidUser)
        .end((err, res) => {
          if (err) { console.log(err); }
          console.log(res);
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("Unable to create user");
        });
    });
  });
});