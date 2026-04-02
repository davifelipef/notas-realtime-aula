// Importa o framework Express (facilita criação de APIs)
const express = require("express");

// Importa biblioteca para trabalhar com autenticação via token
const jwt = require("jsonwebtoken");

// Importa model de usuário
const User = require("./models/User");

// Cria a aplicação Express
const app = express();

// Middleware que permite receber JSON no corpo das requisições
app.use(express.json());

// Conexão com banco
require("./db");

// Rotas de usuário
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// Chave usada para gerar e validar tokens (simples para fins didáticos)
const SECRET = "segredo";

// Rota inicial para testar se o servidor está funcionando
app.get("/", (req, res) => {
  res.send("Servidor com Express funcionando!");
});

// =====================
// LOGIN
// =====================
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validação básica
    if (!username || !password) {
      return res.status(400).json({
        error: "Username e password são obrigatórios"
      });
    }

    // Busca usuário no banco
    const user = await User.findOne({ username });

    if (!user) {
      return res.sendStatus(401);
    }

    // Compara senha com hash
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.sendStatus(401);
    }

    // Gera token (já preparado para roles)
    const token = jwt.sign(
      {
        username: user.username,
        role: user.role || "user"
      },
      SECRET
    );

    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// =====================
// MIDDLEWARE DE AUTENTICAÇÃO
// =====================
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Verifica se existe header
  if (!authHeader) {
    return res.status(401).json({ error: "Acesso negado" });
  }

  // Formato esperado: Bearer TOKEN
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}

// =====================
// ROTA PROTEGIDA
// =====================
app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Rota protegida acessada!",
    user: req.user
  });
});

// =====================
// INICIALIZAÇÃO DO SERVIDOR
// =====================

// Só inicia o servidor se não estiver sendo executado em teste
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
  });
}

// Exporta o app para testes
module.exports = app;