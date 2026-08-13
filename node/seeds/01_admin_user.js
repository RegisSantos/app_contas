const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Deletes ALL existing entries with same email
  await knex('si_users').where('email', 'admin@contasgo.com').del();

  const password = 'adminsenha0';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const now = new Date();

  await knex('si_users').insert({
    name: 'Admin',
    code: 1001,
    email: 'admin@contasgo.com',
    password: hash,
    permission: 'admin',
    status: 1,
    created_at: now,
    updated_at: now
  });
};
