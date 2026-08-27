function normalizeUser(value) {
  return String(value ?? "").trim();
}

const bcrypt = require("bcryptjs");

function normalizePassword(value) {
  return String(value ?? "");
}

async function validateUserCredentials({ user, email, password, knex }) {
  const normalizedUser = normalizeUser(user ?? email);
  const normalizedPassword = normalizePassword(password);

  if (!normalizedUser || !normalizedPassword || !knex) {
    return null;
  }

  const databaseUser = await knex("si_users")
    .select("id", "name", "code", "email", "password", "permission")
    .where({ status: 1 })
    .andWhere((query) => {
      query.where("email", normalizedUser);

      if (/^\d+$/.test(normalizedUser)) {
        query.orWhere("code", Number(normalizedUser));
      }
    })
    .first();

  if (!databaseUser || !(await bcrypt.compare(normalizedPassword, databaseUser.password))) {
    return null;
  }

  const { password: _password, ...safeUser } = databaseUser;
  return safeUser;
}

module.exports = {
  validateUserCredentials,
};
