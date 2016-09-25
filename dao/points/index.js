'use strict';

const uuid = require('node-uuid');
const rethrow = require('pg-rethrow');

const db = require('../../services/db');
const first = require('../../services/first');
const Point = require('../../domain-objects/point');

const instantiate = data => new Point(data);

function create(data) {
  return db('points')
    .insert({
      id: uuid.v4(),
      title: data.title,
      description: data.description
    }, '*')
    .catch(rethrow)
    .then(first)
    .then(instantiate);
}

function list() {
  return db('points').select('*').map(instantiate);
}

module.exports = {
  create,
  list
};
