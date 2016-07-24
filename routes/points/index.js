'use strict';

const router = require('koa-router')({
  prefix: '/points'
});

const PointsService = require('../../services/points');

router.get('/', function* listPoints() {
  this.status = 200;
  this.body = yield PointsService.list();
});

router.post('/', function* createPoint() {
  const { title, description } = this.state.body;

  this.assert(title, 400, 'Missing title');
  this.assert(description, 400, 'Missing description');

  const point = yield PointsService.create(title, description);

  this.status = 201;
  this.body = point;
});

module.exports = router.routes();
