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
        error: "Usuário e/ou Senha incorretos!",
      });
    }

    const sessionId = await database.transaction(async (transaction) => {
      await transaction("si_users")
        .select("id")
        .where({ id: authenticatedUser.id })
        .forUpdate()
        .first();

      const activeSession = await transaction("si_session")
        .select("id")
        .where({ id_user: authenticatedUser.id, status: 1 })
        .first();

      if (activeSession) {
        return null;
      }

      const [createdSessionId] = await transaction("si_session").insert({
        id_user: authenticatedUser.id,
        status: 1,
        session_start: transaction.fn.now(),
      });

      return createdSessionId;
    });

    if (!sessionId) {
      return res.status(409).json({
        success: false,
        error: "Usuário ativo em outro computador! Acesso negado!",
      });
    }

    const session = await createSession(authenticatedUser, sessionId);

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

app.post("/logout", async (req, res) => {
  try {
    const session = await getSession(req);
    const sessionId = Number(session?.sessionId);
    const userId = Number(session?.user?.id);

    if (!Number.isInteger(sessionId) || !Number.isInteger(userId)) {
      return res.status(401).json({ success: false });
    }

    const updatedRows = await database("si_session")
      .where({ id: sessionId, id_user: userId, status: 1 })
      .update({ status: 0, session_end: database.fn.now() });

    if (!updatedRows) {
      return res.status(404).json({ success: false });
    }

    res.setHeader(
      "Set-Cookie",
      "app-contas.session-token=; Max-Age=0; HttpOnly; Path=/; SameSite=Lax" +
        (process.env.NODE_ENV === "production" ? "; Secure" : "")
    );
    return res.json({ success: true });
  } catch (error) {
    console.error("Erro ao encerrar sessão:", error);
    return res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});