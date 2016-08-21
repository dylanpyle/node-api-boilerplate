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
- A local database (`$ createdb bp`, or choose a different name in `knexfile.js`)

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
$ $(npm bin)/knex migrate:latest
$ $(npm bin)/knex migrate:rollback
$ $(npm bin)/knex migrate:make my-migration-name
```

## License

MIT
