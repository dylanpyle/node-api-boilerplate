'use strict';

const requireProperties = require('../services/require-properties');

class Point {
  constructor(row) {
    requireProperties(row, 'id');

    this.id = row.id;
    this.title = row.title;
    this.description = row.description;

    // row.created_at may be a Date if parsed by Knex already, or a String if
    // returned by a JSON query. To make things easier, support both.
    this.createdAt = new Date(row.created_at);
  }
}

module.exports = Point;
