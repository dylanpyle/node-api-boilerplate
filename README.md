# node-api-boilerplate

[![CircleCI](https://circleci.com/gh/dylanpyle/node-api-boilerplate.svg?style=svg)](https://circleci.com/gh/dylanpyle/node-api-boilerplate)

A personal starting point for new API services in Node.js / PostgreSQL. Clone
and go.

Principles:

- Small
- Fast
- Few, high-quality dependencies
- No magic (no ORM, no globals, no models...)

Stack:

- node
- postgres
- koa
- knex
- tape
- eslint

## Prerequisites

- node.js (v6+)
- postgresql

The default configuration uses 2 local databases - one for running tests
against, one for serving persistent data. To create these locally:

```bash
$ createdb bp
$ createdb bp-test
```

— or change the configuration in `knexfile.js`.

## Usage

### Local development server

```bash
$ make serve
```

### Testing / Linting

```bash
$ make test
$ make lint
```

### Run a single test file

```bash
$ bin/tt services/points/spec.js
```

### Migrations

See [knexjs.org](http://knexjs.org/#Migrations)

```bash
$ bin/migrate-local   # Migrate local DBs to latest schema
$ $(npm bin)/knex migrate:rollback
$ $(npm bin)/knex migrate:make my-migration-name
```

## License

MIT
