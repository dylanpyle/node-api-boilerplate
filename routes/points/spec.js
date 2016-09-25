'use strict';

const PointsDAO = require('../../dao/points');
const { test } = require('../../test-helpers/fresh');
const { get, post } = require('../../test-helpers/http');

test('GET /points returns an empty list if none exist', (t) => {
  return get('/points')
    .then(([response, body]) => {
      t.equal(response.status, 200, 'status=200');
      t.deepEqual(body, []);
    });
});

test('GET /points returns an array of points', (t) => {
  let pointJSON;

  return PointsDAO.create({ title: 'Name', description: 'Description' }).then((point) => {
    pointJSON = JSON.parse(JSON.stringify(point));

    return get('/points');
  }).then(([response, body]) => {
    t.equal(response.status, 200, 'status=200');
    t.deepEqual(body, [pointJSON], 'body is correct');
  });
});

test('POST /points returns a 400 if required data is missing', (t) => {
  return post('/points', { body: {} })
    .then(([response]) => {
      t.equal(response.status, 400, 'status=400');
    });
});

test('POST /points returns new point data', (t) => {
  return post('/points', {
    body: { title: 'Great Point', description: 'Yes' }
  }).then(([response, body]) => {
    t.equal(response.status, 201, 'status=201');
    t.equal(body.title, 'Great Point');
    t.equal(body.description, 'Yes');
  });
});
