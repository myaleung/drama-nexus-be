import chaiModule, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from "sinon";
import supertest from "supertest";

const chai = chaiModule.use(chaiHttp);

import Database from '../../src/db/db.connection.js';
import Config from '../../src/db/db.config.js';
import Server from '../../src/server/Server.js';
import Router from "../../src/routes/Router.routes.js";
import UserRoutes from '../../src/routes/User.routes.js';
import User from "../../src/models/User.model.js";
import testData from "../data/testData.js";
import UserController from '../../src/controllers/User.controller.js';
import UserService from "../../src/services/User.service.js";

describe("User Integration Tests", () => {
  let app;
  let database;
  let request;
  let userServer;
  let userService;

  before(async () => {
    Config.load();
    const { PORT, HOST, DB_URI } = process.env;
    userService = new UserService();
    const userController = new UserController(userService);
    const userRoutes = new UserRoutes(userController);
    const router = new Router();
    router.addRouter(userRoutes);
    database = new Database(DB_URI);
    await database.connect();
    userServer = new Server(PORT, HOST, router);
    userServer.start();
    request = supertest(userServer.getApp());
  });

  describe("GET /users", () => {
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

    it.skip("should respond with a 200 status code for a GET request to /explore", async () => {
      const response = await request.get("/explore");
      expect(response.status).to.equal(200);
    });
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
      try { 
        const res = await chai.request(app)
          .post("/sign-up")
          .send(testData.testSignUpUsers[0]);
        
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal("User registered");
      } catch (e) {
        console.log(e.message);
        throw new Error("Error adding user");
      }
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

    it.skip("should return success when user logs in", async () => { 
      try {
        const res = await chai.request(app)
          .post("/login")
          .send(testData.testLoginUser);
        
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.equal(testData.testLoginUser.email);
      } catch (e) {
        console.log(e.message);
        throw new Error("Error logging in user");
      }
    });
  });
});