'use strict';

const tape = require('tape');
const sinon = require('sinon');

const db = require('../services/db');

const TABLES = [
  'points'
];


let currentSandbox;

function beforeEach() {
  currentSandbox = sinon.sandbox.create();
}

function afterEach() {
  currentSandbox.restore();

  // Very naive 'wipe the database' query.
  // Should be expanded to reset sequences, be more efficient, &etc.
  const query = TABLES
    .map(table => `truncate table ${table} cascade;`)
    .join('\n');

  return db.raw(query);
}

tape.onFinish(() => {
  db.destroy();
});

// Run a test in a 'fresh' environment; clear DB and any stubs
function freshTest(description, fn) {
  tape(description, (t) => {
    const end = t.end;

    t.plan = null; // eslint-disable-line no-param-reassign
    t.end = null; // eslint-disable-line no-param-reassign

    beforeEach();

    // For now, all tests must return promises. Can reevaluate this, but it
    // provides a nice safety net for async code.
    const result = fn(t);

    if (!result || !result.then) {
      const err = Error(`
        All tests must return promises.

        Try \`const ok = Promise.resolve()\` at the top of your test suite,
        and returning \`ok\` at the end of each synchronous test.
      `);
      t.fail(err);
    }

    result.then(afterEach)
      .then(() => end())
      .catch((err) => {
        t.fail(err);
        end();
      });
  });
}

module.exports = {
  sandbox() { return currentSandbox; },
  test: freshTest
};
