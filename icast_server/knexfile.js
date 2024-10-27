// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './database/icast-database.sqlite3',
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './databse/seeds',
    },
    useNullAsDefault: true,
  },
};
