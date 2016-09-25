'use strict';

const koa = require('koa');

const app = module.exports = koa();

const errors = require('./middleware/errors');
const headers = require('./middleware/headers');
const jsonBody = require('./middleware/json-body');
const logger = require('./middleware/logger');
const poweredBy = require('./middleware/powered-by');

const pointsRoutes = require('./routes/points');

// General middleware
app.use(logger);
app.use(errors);
app.use(jsonBody);
app.use(headers);
app.use(poweredBy);

// Route-specific middleware
app.use(pointsRoutes);

if (!module.parent) {
  const port = process.env.PORT || 5100;
  app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Running on :${port}`);
}

module.exports = app;
