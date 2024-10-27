/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable('violations', (tbl) => {
    tbl.increments('violationId');
    tbl.integer('caughtViolatorId').notNullable();
    tbl.text('violationPlace', 256).notNullable();
    tbl.date('violationDate').notNullable();
    tbl.text('violatorType', 20).notNullable();
    tbl.enum('apprehendorType', ['Officer', 'Agent']).notNullable();
    tbl.text('apprehendorName', 50).notNullable();
    tbl.integer('oRNumber').notNullable();
    tbl.boolean('paid').notNullable();

    tbl
      .foreign('caughtViolatorId')
      .references('caughtViolatorId')
      .inTable('caughtViolators');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('violations');
};
