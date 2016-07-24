'use strict';

const pkg = require('../../package.json');

module.exports = function* poweredBy(next) {
  this.set('X-Powered-By', [pkg.name, pkg.version].join('@'));
  yield next;
};
