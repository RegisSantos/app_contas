const test = require("node:test");
const assert = require("node:assert/strict");
const bcrypt = require("bcryptjs");
const { validateUserCredentials } = require("../src/modules/auth/validateUser");

function createFakeKnex(user) {
  return (table) => {
    assert.equal(table, "si_users");

    const query = {
      select() {
        return query;
      },
      where() {
        return query;
      },
      andWhere(callback) {
        callback({
          where() {},
          orWhere() {},
        });
        return query;
      },
      first: async () => user,
    };

    return query;
  };
}

test("valida usuário ativo com senha bcrypt", async () => {
  const password = "adminsenha0";
  const user = {
    id: 1,
    name: "Admin",
    code: 1001,
    email: "admin@contasgo.com",
    password: await bcrypt.hash(password, 4),
    permission: "admin",
  };

  const result = await validateUserCredentials({
    user: "admin@contasgo.com",
    password,
    knex: createFakeKnex(user),
  });

  assert.deepEqual(result, {
    id: user.id,
    name: user.name,
    code: user.code,
    email: user.email,
    permission: user.permission,
  });
});

test("rejeita senha inválida", async () => {
  const user = {
    id: 1,
    email: "admin@contasgo.com",
    password: await bcrypt.hash("senha-correta", 4),
  };

  const result = await validateUserCredentials({
    user: "admin@contasgo.com",
    password: "senha-incorreta",
    knex: createFakeKnex(user),
  });

  assert.equal(result, null);
});