require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
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
app.use(helmet());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const API_PREFIX = "/api/v1";
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    error: "Muitas tentativas de login. Tente novamente mais tarde.",
  },
});

function sendError(res, status, error) {
  return res.status(status).json({ success: false, error });
}

app.get("/health", (req, res) => {
  res.json({ success: true, status: "ok" });
});

app.post(`${API_PREFIX}/login`, loginLimiter, async (req, res) => {
  const { user, email, password } = req.body || {};

  try {
    const authenticatedUser = await validateUserCredentials({
      user,
      email,
      password,
      knex: database,
    });

    if (!authenticatedUser) {
      return sendError(res, 401, "Usuário e/ou Senha incorretos!");
    }

    if (authenticatedUser.status === 0) {
      return sendError(res, 403, "Usuário inativo! Acesso negado!");
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
      return sendError(res, 409, "Usuário ativo em outro computador! Acesso negado!");
    }

    const session = await createSession(authenticatedUser, sessionId);

    res.setHeader("Set-Cookie", session.cookie);
    return res.json({
      success: true,
      user: authenticatedUser,
    });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    return sendError(res, 500, "Não foi possível realizar o login");
  }
});

app.get(`${API_PREFIX}/session`, async (req, res) => {
  try {
    const session = await getSession(req);

    if (!session?.user) {
      return sendError(res, 401, "Sessão não encontrada");
    }

    return res.json({ success: true, user: session.user });
  } catch (error) {
    console.error("Erro ao consultar sessão:", error);
    return sendError(res, 401, "Sessão não encontrada");
  }
});

app.post(`${API_PREFIX}/logout`, async (req, res) => {
  try {
    const session = await getSession(req);
    const sessionId = Number(session?.sessionId);
    const userId = Number(session?.user?.id);

    if (!Number.isInteger(sessionId) || !Number.isInteger(userId)) {
      return sendError(res, 401, "Sessão não encontrada");
    }

    const updatedRows = await database("si_session")
      .where({ id: sessionId, id_user: userId, status: 1 })
      .update({ status: 0, session_end: database.fn.now() });

    if (!updatedRows) {
      return sendError(res, 404, "Sessão não encontrada");
    }

    res.setHeader(
      "Set-Cookie",
      "app-contas.session-token=; Max-Age=0; HttpOnly; Path=/; SameSite=Lax" +
        (process.env.NODE_ENV === "production" ? "; Secure" : "")
    );
    return res.json({ success: true });
  } catch (error) {
    console.error("Erro ao encerrar sessão:", error);
    return sendError(res, 500, "Não foi possível encerrar a sessão");
  }
});

app.use((req, res) => sendError(res, 404, "Rota não encontrada"));

app.use((error, req, res, next) => {
  console.error("Erro inesperado na API:", error);
  return sendError(res, 500, "Erro interno do servidor");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});