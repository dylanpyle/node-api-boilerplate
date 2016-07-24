'use strict';

const test = require('tape');

const app = require('../index');
const db = require('../services/db');

const port = process.env.TEST_PORT || 5101;

const server = app.listen(port);

// eslint-disable-next-line no-console
console.log(`Running test server on :${port}`);

test.onFinish(() => {
  server.close();
  db.destroy();
});

module.exports = {
  baseUrl: `http://localhost:${port}`
};
