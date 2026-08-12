require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { validateUserCredentials } = require("./modules/auth/validateUser");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

app.post("/login", (req, res) => {
  const { user, email, password } = req.body || {};

  const isValid = validateUserCredentials({ user, email, password });

  if (isValid) {
    return res.json({
      success: true,
      token: "fake-jwt-token",
      user: user || email,
    });
  }

  return res.status(401).json({
    success: false,
    error: "Credenciais inválidas",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});