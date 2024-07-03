import { assert, expect } from "chai";
import Sinon from "sinon";
import BcryptHash from "../../src/middleware/Bcrypt.hash.js";
import testUserData from "../data/testData.js";
import User from "../../src/models/User.model.js";
import UserController from "../../src/controllers/User.controller.js";
import UserService from "../../src/services/User.service.js";

describe.skip("User Controller Tests", () => { 
  let userController;
  let saveStub;
  let req;
  let res;
  let testUser1;
  // let testUser2;
  let userService;
  beforeEach(() => {
    testUser1 = testUserData.testSignUpUsers[0];
    // testUser2 = testUserData.testSignUpUsers[1];
    saveStub = Sinon.stub(User.prototype, "save");
    // addUserServiceStub = Sinon.stub(UserService, "addUser");
    req = {
      body: testUser1
    };
    res = {
      json: Sinon.spy(),
      status: 201
    };
    userService = {
      addUser: Sinon.stub().returns(res),
    };
    userController = new UserController(userService);
  });
  afterEach(() => {
    testUser1 = null;
    // testUser2 = null;
    if (saveStub && typeof saveStub.restore === 'function') {
      saveStub.restore();
    }
  });

  it("should return a new user upon valid sign up", async () => {
    const user = new User(testUser1);
    const newUser = await userController.addUser(req, res);
    
    assert.equal(newUser, user);
    // expect(res).to.have.status(201);
  });

  it("should add a new user and return a success message", async () => {
    const hashedPassword = "hashedPassword";
    const newUser = {
      _id: "user123",
      name: {
        firstName: "Kyung",
        lastName: "Bandile",
      },
      email: "kyung.bandile@gmail.com",
      password: hashedPassword,
    };
  
    Sinon.stub(BcryptHash, "hash").returns(hashedPassword);
  
    await userController.addUser(req, res);
  
    // expect(res).to.have.status(201);
    Sinon.assert.calledWith(userService.addUser, req.body);
    Sinon.assert.calledWith(res.json, {
      message: "User registered",
      newUser,
    });
  
    BcryptHash.hash.restore();
    UserService.prototype.addUser.restore();
  });
});