require("dotenv").config();

const express = require("express");
const cors = require("cors");
const knex = require("knex");
const { validateUserCredentials } = require("./modules/auth/validateUser");
const { createSession, getSession } = require("./modules/auth/session");
const knexConfig = require("../knexfile");

const app = express();
const database = knex(knexConfig);

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

app.post("/login", async (req, res) => {
  const { user, email, password } = req.body || {};

  try {
    const authenticatedUser = await validateUserCredentials({
      user,
      email,
      password,
      knex: database,
    });

    if (!authenticatedUser) {
      return res.status(401).json({
        success: false,
        error: "Credenciais inválidas",
      });
    }

    const session = await createSession(authenticatedUser);
    await database("si_session").insert({
      id_user: authenticatedUser.id,
      status: 1,
      session_start: database.fn.now(),
    });

    res.setHeader("Set-Cookie", session.cookie);
    return res.json({
      success: true,
      user: authenticatedUser,
    });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    return res.status(500).json({
      success: false,
      error: "Não foi possível realizar o login",
    });
  }
});

app.get("/session", async (req, res) => {
  try {
    const session = await getSession(req);

    if (!session?.user) {
      return res.status(401).json({ success: false });
    }

    return res.json({ success: true, user: session.user });
  } catch (error) {
    console.error("Erro ao consultar sessão:", error);
    return res.status(401).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});