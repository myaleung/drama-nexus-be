import { assert, expect } from "chai";
import Sinon from "sinon";
import User from "../../src/models/User.model.js";
import testUserData from "../data/testData.js";

describe("User Service Tests", () => {
  describe("User Sign Up Tests", () => {
    let testUser1;
    let testUser2;
    let saveStub;
    beforeEach(() => {
      testUser1 = testUserData.testSignUpUsers[0];
      testUser2 = testUserData.testSignUpUsers[1];
      if (saveStub && typeof saveStub.restore === 'function') {
        saveStub.restore();
      }
      saveStub = Sinon.stub(User.prototype, "save");
    });
    afterEach(() => {
      testUser1 = null;
      testUser2 = null;
      if (saveStub && typeof saveStub.restore === 'function') {
        saveStub.restore();
      }
    });

    it("should return a new user upon valid sign up", async () => {
      const user = new User(testUser1);
      saveStub.returns(user);

      const newUser = await user.save();

      assert.equal(newUser, user);
      Sinon.assert.calledOnce(saveStub);
    });

    it("should throw an error when user details are invalid", async () => {
      const user = new User(testUser2);
      saveStub.throws(new Error("Invalid User"));

      try {
        await user.save();
      } catch (e) {
        expect(e.message).to.equal("Invalid User");
      }
      Sinon.assert.calledOnce(saveStub);
    });
  });

  describe("User Login Tests", () => {
    let findOneStub;
    beforeEach(() => {
      if (findOneStub && typeof findOneStub.restore === 'function') {
        findOneStub.restore();
      }
      findOneStub = Sinon.stub(User, "findOne");
    });

    afterEach(() => {
      if (findOneStub && typeof findOneStub.restore === 'function') {
        findOneStub.restore();
      }
    });

    it("should return a user upon valid login", async () => {
      const user = new User(testUserData.testLoginUser);
      findOneStub.returns(user);

      const foundUser = await User.findOne({ email: testUserData.testLoginUser.email });

      expect(foundUser).to.equal(user);
    });

    it("should throw an error when login details are invalid", async () => {
      findOneStub.throws(new Error("User not found"));

      try {
        await User.findOne({ id: "invalidEmail" });
      } catch (e) {
        expect(e.message).to.equal("User not found");
      }
    });
  });
});