const path = require('path');
const fs = require('fs');
const knexConfig = require('../..\/knexfile');
const Knex = require('knex');

async function run() {
  const knex = Knex(knexConfig);

  try {
    // remove knex metadata tables if they exist (cleanup)
    const hasMigrations = await knex.schema.hasTable('knex_migrations');
    if (hasMigrations) {
      try { await knex.schema.dropTable('knex_migrations'); } catch (e) {}
    }
    const hasLock = await knex.schema.hasTable('knex_migrations_lock');
    if (hasLock) {
      try { await knex.schema.dropTable('knex_migrations_lock'); } catch (e) {}
    }

    const migrationsDir = path.join(__dirname, '..', '..', 'migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.js'))
      .sort();

    for (const file of files) {
      const full = path.join(migrationsDir, file);
      console.log('Applying migration', file);
      const mod = require(full);
      if (typeof mod.up === 'function') {
        try {
          await mod.up(knex);
        } catch (err) {
          console.error('Migration failed:', file, err.message || err);
        }
      }
    }

    console.log('Migrations finished');
  } finally {
    await knex.destroy();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
