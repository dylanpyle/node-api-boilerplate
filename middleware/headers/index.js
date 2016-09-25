'use strict';

function* headers(next) {
  this.set('Access-Control-Allow-Origin', '*');
  yield next;
}

module.exports = headers;
