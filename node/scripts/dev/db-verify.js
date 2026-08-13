const Knex = require('knex');
const knexConfig = require('../..\/knexfile');

(async () => {
  const knex = Knex(knexConfig);
  try {
    console.log('Listing knex_* tables and si tables:');
    const rows = await knex.raw("SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema=? AND (TABLE_NAME LIKE 'knex_%' OR TABLE_NAME IN ('si_users','si_session'))", [knexConfig.connection.database]);
    console.log(rows[0]);

    console.log('Dropping knex metadata tables if present...');
    try { await knex.raw('DROP TABLE IF EXISTS ??', ['knex_migrations']); } catch (e) {}
    try { await knex.raw('DROP TABLE IF EXISTS ??', ['knex_migrations_lock']); } catch (e) {}

    console.log('Checking admin user:');
    const admin = await knex('si_users').select('id','code','email').where('email','admin@contasgo.com').first();
    console.log(admin || 'admin not found');
  } catch (err) {
    console.error(err && err.message ? err.message : err);
    process.exitCode = 1;
  } finally {
    await knex.destroy();
  }
})();
