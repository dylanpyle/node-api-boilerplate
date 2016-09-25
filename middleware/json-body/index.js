'use strict';

// For requests that could potentially include a JSON body, try to parse it and
// attact to the context for future use.

const parse = require('co-body');

function* jsonBody(next) {
  if (['POST', 'PUT', 'PATCH'].includes(this.method)) {
    try {
      this.state.body = yield parse.json(this);
    } catch (e) {
      // Possibly revisit this choice; if the body wasn't JSON-parsable then
      // reject it immediately.
      this.throw(400, 'Invalid request body');
    }

    if (!this.state.body) { this.state.body = {}; }
  }

  yield next;
}

module.exports = jsonBody;
