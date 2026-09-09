const assert = require("node:assert/strict");

const apiUrl = process.env.API_URL || "http://localhost:3001";
const loginUrl = `${apiUrl}/api/v1/login`;
const healthUrl = `${apiUrl}/health`;

async function waitForApi() {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      const response = await fetch(healthUrl);

      if (response.ok) {
        return;
      }
    } catch (error) {
      // The server may still be starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error("A API não ficou disponível a tempo.");
}

async function verifyLogin() {
  await waitForApi();

  const validResponse = await fetch(loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: process.env.VERIFICATION_USER || "admin@contasgo.com",
      password: process.env.VERIFICATION_PASSWORD || "adminsenha0",
    }),
  });
  const validData = await validResponse.json();
  const setCookie = validResponse.headers.get("set-cookie") || "";

  assert.equal(validResponse.status, 200);
  assert.equal(validData.success, true);
  assert.equal(validData.user.email, "admin@contasgo.com");
  assert.match(setCookie, /HttpOnly/i);
  assert.match(setCookie, /app-contas\.session-token=/i);

  const invalidResponse = await fetch(loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: "admin@contasgo.com",
      password: "senha-invalida",
    }),
  });

  assert.equal(invalidResponse.status, 401);
  console.log("Login do usuário padrão validado com sucesso.");
}

verifyLogin().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});