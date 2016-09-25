'use strict';

const pkg = require('../../package.json');

function* poweredBy(next) {
  this.set('X-Powered-By', [pkg.name, pkg.version].join('@'));
  yield next;
}

module.exports = poweredBy;
