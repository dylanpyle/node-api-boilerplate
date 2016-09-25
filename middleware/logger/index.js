'use strict';

const qs = require('querystring');

// Log timing and status for each incoming request

function stringify(obj) {
  return qs.stringify(obj, ', ', '=', {
    encodeURIComponent: val => val
  });
}

function* logger(next) {
  const start = Date.now();
  yield next;
  const ms = Date.now() - start;

  // eslint-disable-next-line no-console
  console.log(stringify({
    method: this.method,
    url: this.url,
    status: this.status,
    responseTime: ms
  }));
}

module.exports = logger;
