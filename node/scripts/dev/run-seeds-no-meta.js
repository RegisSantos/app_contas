const path = require('path');
const fs = require('fs');
const knexConfig = require('../..\/knexfile');
const Knex = require('knex');

async function run() {
  const knex = Knex(knexConfig);

  try {
    const seedsDir = path.join(__dirname, '..', '..', 'seeds');
    const files = fs.readdirSync(seedsDir)
      .filter(f => f.endsWith('.js'))
      .sort();

    for (const file of files) {
      const full = path.join(seedsDir, file);
      console.log('Running seed', file);
      const mod = require(full);
      if (typeof mod.seed === 'function') {
        try {
          await mod.seed(knex);
        } catch (err) {
          console.error('Seed failed:', file, err.message || err);
        }
      }
    }

    console.log('Seeds finished');
  } finally {
    await knex.destroy();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
