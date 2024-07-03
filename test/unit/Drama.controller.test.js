import Sinon from "sinon";
import DramaController from "../../src/controllers/Drama.controller.js";
import DramaService from "../../src/services/Drama.service.js";
import testDramaData from "../data/testDramaData.js";

describe("Drama Controller", () => { 
  let service;
  let controller;
  let drama;
  let dramas;

  beforeEach(() => {
    service = new DramaService();
    controller = new DramaController(service);
  });

  describe("getAllDramas", () => {
    it("should return all dramas", async () => {
      dramas = testDramaData.results;
      const req = {};
      const res = { status: Sinon.stub().returnsThis(), json: Sinon.stub() };
      Sinon.stub(service, "getAllDramas").returns(dramas);

      await controller.getAllDramas(req, res);

      Sinon.assert.calledWith(res.status, 200);
      Sinon.assert.calledWith(res.json, { dramas });
    });

    it("should return a 500 status code and an error message", async () => {
      const req = {};
      const res = { status: Sinon.stub().returnsThis(), json: Sinon.stub() };
      Sinon.stub(service, "getAllDramas").throws(new Error("Dramas not found"));

      await controller.getAllDramas(req, res);

      Sinon.assert.calledWith(res.status, 500);
      Sinon.assert.calledWith(res.json, { status: 500, message: "Dramas not found" });
    });
  });

  describe("getDrama", () => {
    it("should return a drama", async () => {
      drama = testDramaData.results[0];
      const req = { params: { id: 1 } };
      const res = { status: Sinon.stub().returnsThis(), json: Sinon.stub() };
      Sinon.stub(service, "getDrama").returns(drama);

      await controller.getDrama(req, res);

      Sinon.assert.calledWith(res.status, 200);
      Sinon.assert.calledWith(res.json, { drama });
    });

    it("should return a 500 status code and an error message", async () => {
      const req = { params: { id: 1 } };
      const res = { status: Sinon.stub().returnsThis(), json: Sinon.stub() };
      Sinon.stub(service, "getDrama").throws(new Error("Drama not found"));

      await controller.getDrama(req, res);

      Sinon.assert.calledWith(res.status, 500);
      Sinon.assert.calledWith(res.json, { status: 500, message: "Drama not found" });
    });
  });
});