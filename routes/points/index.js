'use strict';

const router = require('koa-router')({
  prefix: '/points'
});

const PointsDAO = require('../../dao/points');

router.get('/', function* listPoints() {
  this.status = 200;
  this.body = yield PointsDAO.list();
});

router.post('/', function* createPoint() {
  const { title, description } = this.state.body;

  this.assert(title, 400, 'Missing title');
  this.assert(description, 400, 'Missing description');

  const point = yield PointsDAO.create({ title, description });

  this.status = 201;
  this.body = point;
});

module.exports = router.routes();
