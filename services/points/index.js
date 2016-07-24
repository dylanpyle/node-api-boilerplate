'use strict';

const uuid = require('node-uuid');
const rethrow = require('pg-rethrow');

const db = require('../db');

class Point {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
  }
}

const instantiate = (data) => new Point(data);

module.exports = {
  create(title, description) {
    return db('points')
      .insert({
        id: uuid.v4(),
        title,
        description
      }, '*')
      .catch(rethrow)
      .then(([data]) => new Point(data));
  },

  list() {
    return db('points').select('*').map(instantiate);
  }
};
