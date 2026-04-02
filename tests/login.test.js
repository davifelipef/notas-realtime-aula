// test/login.test.js
const request = require("supertest");
const mongoose = require("../db");
const app = require("../server"); // seu express app
const User = require("../models/User");

beforeAll(async () => {
  // Limpa usuários e cria um usuário de teste
  await User.deleteMany({});
  await User.create({ username: "teste", password: "123" }); // use hash se o seu controller faz hash
});

afterAll(async () => {
  // Fecha conexão com o MongoDB
  await mongoose.connection.close();
});

describe("POST /login", () => {
  it("deve retornar um token com username válido", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "teste", password: "123" });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("deve retornar erro se username ou senha não forem enviados", async () => {
    const response = await request(app)
      .post("/login")
      .send({});

    expect(response.statusCode).toBe(400);
  });

  it("deve retornar erro se senha estiver errada", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "teste", password: "errada" });

    expect(response.statusCode).toBe(401);
  });
});