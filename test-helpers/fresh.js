'use strict';

const tape = require('tape');

const db = require('../services/db');

const TABLES = [
  'points'
];

tape.onFinish(() => {
  db.destroy();
});

function afterEach() {
  // Very naive 'wipe the database' query.
  // Should be expanded to reset sequences, be more efficient, &etc.
  const query = TABLES
    .map((table) => `truncate table ${table} cascade;`)
    .join('\n');

  return db.raw(query);
}

// Run a test in a 'fresh' environment; clear DB and any stubs
module.exports = function freshTest(description, fn) {
  tape(description, (t) => {
    const end = t.end;

    t.plan = null; // eslint-disable-line no-param-reassign
    t.end = null; // eslint-disable-line no-param-reassign

    // For now, all tests must return promises. Can reevaluate this, but it
    // provides a nice safety net for async code.
    fn(t).then(afterEach)
      .then(() => end())
      .catch((err) => {
        t.fail(err);
        end();
      });
  });
};
