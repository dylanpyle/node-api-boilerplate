'use strict';

// Knex configuration. Used by services/db as well as the Knex CLI

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://localhost/bp'
};
