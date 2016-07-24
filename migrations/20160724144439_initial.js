'use strict';

exports.up = function up(knex) {
  return knex.raw(`
CREATE TABLE points (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
  `);
};

exports.down = function up(knex) {
  return knex.schema.dropTable('points');
};
