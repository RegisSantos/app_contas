const COOKIE_NAME = "app-contas.session-token";
const SESSION_MAX_AGE = 30 * 24 * 60 * 60;

async function getJwt() {
  return import("@auth/core/jwt");
}

function getSecret() {
  if (!process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET não configurado");
  }

  return process.env.AUTH_SECRET;
}

async function createSession(user) {
  const { encode } = await getJwt();
  const token = await encode({
    token: { sub: String(user.id), user },
    secret: getSecret(),
    salt: COOKIE_NAME,
    maxAge: SESSION_MAX_AGE,
  });

  return {
    token,
    cookie: `${COOKIE_NAME}=${encodeURIComponent(token)}; Max-Age=${SESSION_MAX_AGE}; HttpOnly; Path=/; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  };
}

async function getSession(req) {
  const { getToken } = await getJwt();

  return getToken({
    req,
    secret: getSecret(),
    salt: COOKIE_NAME,
    cookieName: COOKIE_NAME,
    secureCookie: process.env.NODE_ENV === "production",
  });
}

module.exports = {
  createSession,
  getSession,
};