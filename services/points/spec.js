'use strict';

const { NotNullViolation } = require('pg-rethrow').ERRORS;

const PointsService = require('./index');
const test = require('../../test-helpers/fresh');

test('PointsService.create returns a new point', (t) => {
  return PointsService.create('Point', 'A good one')
    .then((point) => {
      t.equal(point.title, 'Point');
      t.equal(point.description, 'A good one');
      t.equal(point.id.length, 36);
    });
});

test('PointsService.create fails when required data is missing', (t) => {
  return PointsService.create('Point', null)
    .catch((err) => {
      t.ok(err instanceof NotNullViolation);
    });
});
