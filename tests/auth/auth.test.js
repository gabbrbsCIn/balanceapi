const request = require("supertest");
const app = require("../../src/app");
const authServices = require("../../src/services/authServices");

jest.mock("../../src/models", () => ({
  db: jest.fn(),
}));

jest.mock("../../src/services/authServices", () => ({
  ...jest.requireActual("../../src/services/authServices"),
  sendMessageError: jest.fn((res, error) =>
    res.status(error.statusCode).json({ message: error.message })
  ),
}));
describe("POST /register", () => {
  it("should return 404 when not all data is provided", async () => {
    const response = await request(app)
      .post("/register")
      .send({ username: "gabriel" })
      .expect(400);

    expect(authServices.sendMessageError).toHaveBeenCalledTimes(1);
    expect(response.body.message).toBe("Todos os campos são obrigatórios");
  });
});
