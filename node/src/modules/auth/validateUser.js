function normalizeUser(value) {
  return String(value ?? "").trim();
}

function normalizePassword(value) {
  return String(value ?? "").trim();
}

function validateUserCredentials({ user, email, password }) {
  const normalizedUser = normalizeUser(user ?? email);
  const normalizedPassword = normalizePassword(password);

  if (!normalizedUser || !normalizedPassword) {
    return false;
  }

  const validUsernames = ["4893", "admin@contasgo.com", "admin@test.com"];
  const validPassword = "adminsenha0";

  return validUsernames.includes(normalizedUser) && normalizedPassword === validPassword;
}

module.exports = {
  validateUserCredentials,
};
