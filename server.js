// Importa o framework Express (facilita criação de APIs)
const express = require("express");

// Importa biblioteca para trabalhar com autenticação via token
const jwt = require("jsonwebtoken");

// Cria a aplicação Express
const app = express();

// Middleware que permite receber JSON no corpo das requisições
app.use(express.json());

// Chave usada para gerar e validar tokens (simples para fins didáticos)
const SECRET = "segredo";

// Rota inicial para testar se o servidor está funcionando
app.get("/", (req, res) => {
  res.send("Servidor com Express funcionando!");
});

app.post("/login", (req, res) => {
  // Extrai o username enviado no corpo da requisição
  const { username } = req.body;

  // Validação simples para evitar dados vazios
  if (!username) {
    return res.status(400).json({ error: "Username obrigatório" });
  }

  // Gera um token contendo o username
  // Esse token será usado para autenticar o usuário depois
  const token = jwt.sign({ username }, SECRET);

  // Retorna o token para o cliente
  res.json({ token });
});

function authMiddleware(req, res, next) {
  // Pega o token enviado no header Authorization
  const token = req.headers.authorization;

  // Se não houver token, bloqueia o acesso
  if (!token) {
    return res.status(401).json({ error: "Acesso negado" });
  }

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, SECRET);

    // Salva os dados do usuário na requisição
    req.user = decoded;

    // Permite continuar para a próxima função
    next();
  } catch {
    // Caso o token seja inválido
    res.status(401).json({ error: "Token inválido" });
  }
}

app.get("/profile", authMiddleware, (req, res) => {
  // Essa rota só será acessada se o token for válido

  res.json({
    message: "Rota protegida acessada!",
    // Retorna os dados do usuário que vieram do token
    user: req.user
  });
});

// Só inicia o servidor se não estiver sendo executado em ambiente de teste
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
  });
}

// Exporta o app para permitir testes automatizados
module.exports = app;