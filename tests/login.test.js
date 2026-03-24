// Biblioteca para testar requisições HTTP
const request = require("supertest");

// Importa o app do servidor (não inicia o servidor)
const app = require("../server");

describe("POST /login", () => {

  it("deve retornar um token com username válido", async () => {

    // Envia requisição POST para /login
    const response = await request(app)
      .post("/login")
      .send({ username: "teste" });

    // Verifica se o status HTTP é 200
    expect(response.statusCode).toBe(200);

    // Verifica se o token foi retornado
    expect(response.body.token).toBeDefined();
  });

  it("deve retornar erro se username não for enviado", async () => {

    const response = await request(app)
      .post("/login")
      .send({});

    // Espera erro de validação
    expect(response.statusCode).toBe(400);
  });

});
