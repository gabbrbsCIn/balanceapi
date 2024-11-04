const request = require("supertest");
const app = require("../../src/app");
const authServices = require("../../src/services/authServices");

const { Resident } = require("../../src/models");

jest.mock("../../src/models", () => {
  return {
    db: jest.fn(),
    Resident: {
      findOne: jest.fn(),
      create: jest.fn().mockReturnValue(true),
    },
  };
});

jest.mock("../../src/services/authServices", () => ({
  ...jest.requireActual("../../src/services/authServices"),
  sendMessageError: jest.fn((res, error) =>
    res.status(error.statusCode).json({ message: error.message })
  ),
  sendSuccessResponse: jest.fn((res, data, message) => {
    res.status(200).json({ message: message, data: data });
  }),
}));
describe("POST /register", () => {
  it("should return 404 when not all data is provided", async () => {
    const response = await request(app)
      .post("/register")
      .send({ username: "test" })
      .expect(400);

    expect(authServices.sendMessageError).toHaveBeenCalledTimes(1);
    expect(response.body.message).toBe("Todos os campos são obrigatórios");
  });

  it("should return 400 when the user data provided already exists on db", async () => {
    Resident.findOne.mockImplementation((email) => {
      const HandlerError = require("../../src/errors/handlerError");
      const database = { email: "test@email.com" };
      if (email.where.email === database.email) {
        throw new HandlerError("Esse usuário já existe!", 400);
      }
    });
    const response = await request(app)
      .post("/register")
      .send({ username: "test", email: "test@email.com", password: "test123" })
      .expect(400);

    expect(response.body.message).toBe("Esse usuário já existe!");
  });

  it("should return 200 when the user data provided do not exists on db", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        username: "test",
        email: "teste@email.com",
        password: "test123",
      })
      .expect(200);
    expect(authServices.sendSuccessResponse).toHaveBeenCalledTimes(1);
    expect(response.body.message).toBe("Usuário cadastrado!");
    expect(response.body.data).toBe("teste@email.com");
  });
});
