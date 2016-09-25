'use strict';

const { NotNullViolation } = require('pg-rethrow').ERRORS;

const PointsDAO = require('./index');
const { test } = require('../../test-helpers/fresh');

test('PointsDAO.create returns a new point', (t) => {
  return PointsDAO.create({
    title: 'Point',
    description: 'A good one'
  })
    .then((point) => {
      t.equal(point.title, 'Point');
      t.equal(point.description, 'A good one');
      t.equal(point.id.length, 36);
    });
});

test('PointsDAO.create fails when required data is missing', (t) => {
  return PointsDAO.create({ title: 'Point' })
    .catch((err) => {
      t.ok(err instanceof NotNullViolation);
    });
});
