require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // mock simples
  if (email === "admin@test.com" && password === "123456") {
    return res.json({ token: "fake-jwt-token" });
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});