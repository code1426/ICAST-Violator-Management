/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable('caughtViolators', (tbl) => {
    tbl.increments('caughtViolatorId');
    tbl.text('firstName', 50).notNullable();
    tbl.text('lastName', 50).notNullable();
    tbl.date('dateOfBirth').notNullable();
    tbl.enu('sex', ['Male', 'Female']);
    tbl.text('civilStatus', 20).notNullable();
    tbl.text('violatorAdress', 256).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('caughtViolators');
};
