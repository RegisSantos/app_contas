/**
 * Knex migration: create si_users
 */
exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('si_users');
  if (!exists) {
    await knex.schema.createTable('si_users', function(table) {
      table.increments('id').primary();
      table.string('name', 50).notNullable();
      table.integer('code').notNullable().unique();
      table.string('email', 50).notNullable().unique();
      table.string('password', 255).notNullable();
      table.enu('permission', ['admin', 'system', 'user_n1', 'user_n2', 'user_n3']).notNullable();
      table.specificType('status', 'TINYINT(1)').notNullable().defaultTo(1);
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });

    // Add CHECK constraints where supported (MySQL 8+) - use raw SQL
    try {
      await knex.raw(
        `ALTER TABLE si_users
         ADD CONSTRAINT chk_users_code CHECK (code >= 0 AND code <= 999999)`
      );
    } catch (e) {
      // ignore if constraint already exists or not supported
    }

    // status should be 0 or 1
    try {
      await knex.raw(
        `ALTER TABLE si_users
         ADD CONSTRAINT chk_users_status CHECK (status IN (0,1))`
      );
    } catch (e) {
      // ignore
    }
  }
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('si_users');
};
