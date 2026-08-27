/**
 * Knex migration: create si_session
 */
exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('si_session');
  if (!exists) {
    await knex.schema.createTable('si_session', function(table) {
      table.increments('id').primary();
      table.integer('id_user').notNullable().unsigned();
      table.specificType('status', 'TINYINT(1)').notNullable().defaultTo(1);
      table.dateTime('session_start').nullable();
      table.dateTime('session_end').nullable();

      table.foreign('id_user').references('si_users.id').onDelete('CASCADE');
      table.index('id_user', 'idx_session_id_user');
    });

    // status check
    try {
      await knex.raw(
        `ALTER TABLE si_session
         ADD CONSTRAINT chk_session_status CHECK (status IN (0,1))`
      );
    } catch (e) {
      // ignore if constraint exists or not supported
    }
  }
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('si_session');
};
