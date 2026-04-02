# Notas Realtime - Projeto Node.js

Projeto de back-end em Node.js para aplicação de notas em tempo real. Este repositório será usado nas aulas para aprender **Express, JWT, MongoDB e modularização**.

---

## 1. Preparando o projeto

1. Extraia o arquivo ZIP do projeto em uma pasta de sua preferência.
2. Abra a pasta no VS Code.
3. No terminal do VS Code, instale as dependências:

```bash
npm install
```

4. Rode o servidor:

```bash
node server.js
```

O servidor estará disponível em http://localhost:3000.

## 2. Testando a API

**Login**

Método: POST  
URL: http://localhost:3000/login  
Body (JSON):

```JSON
{
  "username": "teste",
  "password": "123"
}
```

Resposta:

```JSON
{
  "token": "seu_token_jwt"
}
```

**Rota protegida**

Método: GET  
URL: http://localhost:3000/profile  
Header:

```bash
Authorization: Bearer <token_recebido_no_login>
```

Resposta:

```JSON
{
  "message": "Rota protegida acessada!",
  "user": {
    "username": "teste"
  }
}
```
